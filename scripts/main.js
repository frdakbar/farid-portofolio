/**
 * Farid Personal Portfolio - Main JavaScript
 * Handles global navigation, mobile menu drawer, scroll active state, and accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  // 1. Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    const toggleMobileMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('is-open');
      navMenu.classList.toggle('is-open', isOpen);
      mobileToggle.classList.toggle('is-open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close mobile menu when clicking any navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        toggleMobileMenu(false);
      }
    });

    // Close mobile menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggleMobileMenu(false);
        mobileToggle.focus();
      }
    });
  }

  // 2. ScrollSpy - Highlight Active Section in Navbar
  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 120; // 76px navbar height + comfortable offset
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    // Special check for bottom of page to reliably activate last section (contact)
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);
    if (isAtBottom && sections.length > 0) {
      currentId = sections[sections.length - 1].getAttribute('id');
    }

    if (!currentId && window.scrollY < 200 && sections.length > 0) {
      currentId = sections[0].getAttribute('id');
    }

    if (currentId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });
  updateActiveSection();

  // 3. Contact Form Handler (FormSubmit Integration)
  const contactForm = document.getElementById('contact-form');
  const formNoticeBanner = document.getElementById('form-notice-banner');

  if (contactForm && formNoticeBanner) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const honeyInput = document.getElementById('contact-honey');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    const btnSubmitText = document.getElementById('btn-submit-text');

    // Clear validation error state on user input
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('is-invalid');
        });
      }
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check: If bot filled this hidden field, abort silently
      if (honeyInput && honeyInput.value.trim() !== '') {
        return;
      }

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      let hasError = false;

      // Validate required inputs
      if (!nameVal) {
        nameInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
        emailInput.classList.add('is-invalid');
        hasError = true;
      }
      if (!messageVal) {
        messageInput.classList.add('is-invalid');
        hasError = true;
      }

      if (hasError) {
        formNoticeBanner.className = 'form-notice-banner notice-error';
        formNoticeBanner.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Mohon lengkapi seluruh kolom yang bertanda bintang (*) dengan format email yang valid sebelum melanjutkan.</span>
        `;
        if (!nameVal) {
          nameInput.focus();
        } else if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
          emailInput.focus();
        } else if (!messageVal) {
          messageInput.focus();
        }
        return;
      }

      // Enter Loading State
      if (contactSubmitBtn) contactSubmitBtn.disabled = true;
      if (btnSubmitText) btnSubmitText.textContent = 'Mengirim Pesan...';

      formNoticeBanner.className = 'form-notice-banner notice-info';
      formNoticeBanner.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>Sedang mengirim pesan Anda ke email Farid, mohon tunggu sebentar...</span>
      `;

      try {
        // Construct FormData to ensure FormSubmit receives all named form fields (name, email, message, _subject)
        const formData = new FormData(contactForm);
        formData.set('name', nameVal);
        formData.set('email', emailVal);
        formData.set('message', messageVal);

        const response = await fetch("https://formsubmit.co/ajax/farid1230akbar@gmail.com", {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: formData
        });

        const data = await response.json().catch(() => null);

        if (response.ok && data && (data.success === "true" || data.success === true || data.message)) {
          // Genuine success confirmed by FormSubmit
          formNoticeBanner.className = 'form-notice-banner notice-success';
          formNoticeBanner.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Terima kasih <strong>${nameVal}</strong>! Pesan Anda berhasil dikirim ke <strong>farid1230akbar@gmail.com</strong>. Farid akan segera membalas melalui email Anda.</span>
          `;
          // Form is reset ONLY when transmission is verified
          contactForm.reset();
        } else {
          const serverMsg = data && data.message ? data.message : 'Server FormSubmit tidak dapat memproses pesan saat ini.';
          throw new Error(serverMsg);
        }
      } catch (err) {
        // Error state: Never reset user inputs so message is not lost!
        formNoticeBanner.className = 'form-notice-banner notice-error';
        formNoticeBanner.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Gagal mengirim pesan (${err.message || 'Kendala jaringan'}). Silakan coba lagi atau hubungi langsung via <a href="mailto:farid1230akbar@gmail.com" style="color:#FCA5A5;text-decoration:underline;font-weight:600;">farid1230akbar@gmail.com</a>.</span>
        `;
      } finally {
        if (contactSubmitBtn) contactSubmitBtn.disabled = false;
        if (btnSubmitText) btnSubmitText.textContent = 'Kirim Pesan';
      }
    });
  }

  // 4. Dynamic Copyright Year Update
  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }

  // 5. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    if (!('IntersectionObserver' in window)) {
      // Fallback: Reveal everything immediately if IntersectionObserver is not supported
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });
    }
  }
});


