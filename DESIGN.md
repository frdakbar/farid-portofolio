# Farid — Personal Portfolio
## Design & Implementation Specification

> This document is the primary design reference for the portfolio website. Read it before changing or creating UI code. Follow it unless the user explicitly requests a change.

## 1. Project Goal

Build a responsive, one-page personal portfolio for **Muhamad Farid Akbar Maulana (Farid)**, an Information Systems student at STMIK IKMI Cirebon.

The site should support both:
- **Career goals:** internship applications, job opportunities, and professional networking.
- **Personal branding:** showing Farid's interests in technology, data, photography, videography, and railways.

Design direction: **Dark Tech + Creative Editorial**. The site should feel modern, polished, personal, slightly cinematic, and easy to scan—not like a generic template.

## 2. Source-of-Truth Rules

1. This file is the primary written specification for visual style, content, page structure, and interactions.
2. Inspect the existing workspace and preserve its current stack and conventions when possible.
3. Do not rebuild the project from scratch if a working project already exists.
4. Do not invent personal details, credentials, project results, awards, clients, or URLs.
5. Treat project descriptions and skill lists as editable content. Only present skills and project statuses that Farid can substantiate.
6. Use available real assets from the project. Never present a generated or stock portrait as Farid's actual photo.
7. If a visual decision is not specified here, choose the simplest option that fits the design system and existing implementation.
8. Avoid unnecessary dependencies, speculative features, and repeated large redesigns.

## 3. Visual Design System

### Colors

| Token | Hex | Intended use |
|---|---|---|
| `--color-bg` | `#0B1020` | Main page background |
| `--color-surface` | `#111C30` | Secondary sections and panels |
| `--color-card` | `#172338` | Cards and elevated surfaces |
| `--color-primary` | `#3B82F6` | Primary buttons, links, active states |
| `--color-accent` | `#22D3EE` | Occasional highlights only |
| `--color-text` | `#E2E8F0` | Main text |
| `--color-muted` | `#94A3B8` | Secondary text and labels |
| `--color-border` | `#334155` | Subtle borders |

Use blue intentionally and cyan sparingly. Maintain accessible contrast. Avoid excessive neon, strong glows, and gradients that compete with content.

### Typography

- Headings: **Poppins**, bold or semibold.
- Body: **Inter**, regular or medium.
- Use a clear hierarchy: large hero headline, strong section headings, readable body copy, subtle uppercase section labels.
- Load fonts efficiently; provide system fallbacks.

### Layout and shape

- Center page content in a responsive container, approximately `1120–1200px` maximum width on desktop.
- Desktop section spacing: approximately `80–120px`.
- Card radius: `12–20px`.
- Use consistent spacing, alignment, and image ratios.
- Thin borders and restrained shadows are preferred over heavy effects.
- Mobile page padding: approximately `20–24px`.
- Prevent horizontal overflow at all supported screen widths.

## 4. Page Structure

Build these sections in this order as a **single scrolling page**:

1. Sticky Navbar
2. Hero
3. About Me
4. Skills & Tools
5. Featured Projects
6. Experience & Journey
7. Beyond the Screen
8. Contact
9. Footer

Use section IDs that match the navigation links. Smooth scrolling is desirable, while respecting reduced-motion preferences.

## 5. Section Specifications

### 5.1 Navbar

- Wordmark: `farid.`
- Navigation: Home, About, Skills, Projects, Experience, Interests, Contact.
- CTA: `Download CV`.
- Sticky on desktop, compact hamburger navigation on mobile.
- Active/hover/focus states must be visible.
- Do not create a fake CV download. If no CV file exists, use a clearly marked placeholder or omit/disable the action until a real file is supplied.

### 5.2 Hero

Purpose: communicate identity and focus quickly.

Content:
- Eyebrow: `HELLO, I'M`
- Name: `Muhamad Farid Akbar Maulana`
- Headline: `I Build, Analyze, and Create.`
- Role: `Information Systems Student | Aspiring Data Analyst | Tech & Visual Enthusiast`
- Short copy: `I'm passionate about technology, web development, and data analysis. I also enjoy photography, videography, and exploring the world of railways.`
- Primary CTA: `Explore My Work` → projects section.
- Secondary CTA: `Contact Me` → contact section.
- Social links: GitHub, LinkedIn, Instagram only when actual URLs are configured.

Layout:
- Desktop: two-column composition, text on the left and prominent visual on the right.
- Mobile: stack content with text first and image after or alongside it, depending on available space.
- Use a real portrait supplied by Farid when available. Railway or cinematic photography can be supporting imagery, not a substitute for his identity.
- Keep the text readable and the CTA buttons visually distinct.

### 5.3 About Me

Section label: `GET TO KNOW ME`  
Heading: `A Little About Me`

Suggested copy:
`Hi, I'm Farid, an Information Systems student at STMIK IKMI Cirebon. I enjoy learning new technologies, developing web applications, exploring data analysis, and designing user interfaces. Beyond technology, I love photography, videography, and railways. I'm continuously learning, building projects, and preparing myself for future professional opportunities.`

Layout:
- Desktop: two columns, biography and a framed portrait.
- Mobile: one column.
- Supporting info cards:
  - Education — Information Systems, STMIK IKMI Cirebon.
  - Experience — Online Shop Administrator, 2023–2024.
  - Interests — Web Development, Data Analysis, Photography.

Do not add unnecessary private personal information.

### 5.4 Skills & Tools

Section label: `WHAT I WORK WITH`  
Heading: `Skills & Tools`

Use four compact cards:
- **Web Development:** HTML, CSS, PHP, Laravel, MySQL.
- **UI/UX Design:** Figma, Wireframing, Prototyping.
- **Data Analysis:** Excel, SQL, Data Visualization.
- **Creative Skills:** Photography, Videography, Content Creation.

Use consistent icons and concise labels. Do not use arbitrary percentage bars or claim expert proficiency without evidence. Keep skills easy to edit.

### 5.5 Featured Projects

Section label: `SELECTED WORK`  
Heading: `Projects I've Worked On`

Create a responsive project-card grid. Each card should contain a thumbnail, project name, short description, category/technology tags, and a `View Project` action.

Initial editable project content:
1. **My Burger GW** — Food Ordering Website / UI/UX. A food-ordering concept for browsing a menu and following a streamlined ordering flow.
2. **Car Rental Web Application** — Web Development. A car-rental website concept featuring vehicle information, rental workflows, and data management.
3. **Student Data Analysis** — Data Analysis / Data Mining. A learning project exploring K-Means clustering and the CRISP-DM methodology.
4. **Public Complaint System** — Web Application / UI/UX. A concept for residents to submit complaints and administrators to manage reports.

Important:
- Confirm project status before describing a project as completed.
- Do not invent outcomes, metrics, clients, or repository links.
- If a real project URL is not available, use a non-misleading placeholder or omit the link.
- Project content should be stored in a maintainable data structure if appropriate for the chosen stack.
- Use consistent thumbnail proportions and restrained hover states.

### 5.6 Experience & Journey

Section label: `MY JOURNEY`  
Heading: `Experience & Learning`

Use a clean vertical timeline with subtle connecting lines and blue nodes.

Entries:
- **Online Shop Administrator | 2023–2024:** customer communication, order handling, stock checks, and daily online-shop operations, only to the extent these accurately describe the experience.
- **Academic Journey | Information Systems:** learning web development, databases, data analysis, and UI/UX.
- **Personal Projects:** practice projects and coursework.

Clearly distinguish work experience from academic work and personal projects.

### 5.7 Beyond the Screen

Section label: `LIFE OUTSIDE CODE`  
Heading: `Beyond the Screen`

Create three visual cards:
- **Photography:** `Finding stories in everyday moments.`
- **Videography:** `Capturing moments through moving visuals.`
- **Railways:** `An enduring interest in trains and the railway world.`

Use cinematic photos, dark overlays, consistent crop ratios, and subtle hover effects. Make it easy to replace sample images with Farid's own photos. Never imply stock imagery is Farid's original work.

### 5.8 Contact

Section label: `LET'S CONNECT`  
Heading: `Have a Project in Mind? Let's Connect.`

- Short invitation for internships, collaboration, and networking.
- Email, GitHub, LinkedIn, and Instagram, using real configured links only.
- Form fields: Full Name, Email Address, Message.
- Include labels, input validation, keyboard focus, and helpful error states.

If no backend or form service is configured, clearly treat the form as a prototype. Do not show a false success message or claim that a message was sent. A mailto link can be used as a simple alternative if an actual email address is supplied.

### 5.9 Footer

- `© 2026 Farid. Designed & Built with Curiosity.`
- Social links only when configured.
- `Back to Top` link.

## 6. Interaction Requirements

- Navbar links scroll to the correct section.
- Hero CTAs navigate to Projects and Contact.
- Mobile menu opens, closes, and navigates correctly.
- Buttons and links have hover, focus, and active states.
- Project links must lead somewhere valid or be clearly marked as unavailable.
- Contact form validates inputs; never fake successful delivery.
- Optional reveal-on-scroll animations should be subtle and should respect `prefers-reduced-motion`.
- All interactive controls should work with a keyboard and have accessible names.

## 7. Responsive Requirements

- Desktop: spacious two-column hero and multi-column project/skill grids.
- Tablet: reduce spacing and grid columns appropriately.
- Mobile: single-column content, compact navigation, readable typography, comfortable tap targets.
- Images must crop intentionally with appropriate `object-fit`.
- No horizontal scrolling or overlapping content.
- Test at approximately 1440px, 1024px, 768px, and 390px widths.

## 8. Technical Implementation Rules

1. First inspect the current project files and identify the framework/build tools.
2. Keep the existing stack if it is already configured and working.
3. If no project exists, use semantic HTML, CSS, and minimal JavaScript for a straightforward static site.
4. Separate content, styling, and behavior where practical.
5. Use reusable components and design tokens rather than repeated hard-coded styling.
6. Keep dependencies minimal.
7. Use local assets where available and descriptive filenames.
8. Add meaningful alt text to informative images; use empty alt text for purely decorative images.
9. Do not expose secrets, API keys, or private credentials.
10. Do not add a backend or external service unless required and configured.

## 9. Implementation Workflow

Work in small, verifiable phases:

### Phase 1 — Inspect
- Inspect the workspace, framework, assets, and existing code.
- Summarize the existing structure briefly.
- Identify missing assets and real URLs needed.
- Do not make destructive changes.

### Phase 2 — Build the visual foundation
- Define CSS variables/design tokens.
- Implement typography, container widths, navbar, buttons, cards, and responsive layout.

### Phase 3 — Implement all sections
- Build sections in the order defined above.
- Use the specified content and preserve the design direction.
- Use clearly identified replaceable placeholders for missing photos and links.

### Phase 4 — Interactions and responsive behavior
- Wire navigation, CTA links, mobile menu, project actions, and form validation.
- Test mobile layout and keyboard focus.

### Phase 5 — Verify and report
- Run the project using the existing project's correct command.
- Check browser/runtime errors where tools permit.
- Test section links, buttons, images, form behavior, and responsive layouts.
- Fix issues found.
- Report which checks were actually performed and list any remaining placeholders.

## 10. Definition of Done

The first implementation is complete when:
- All nine page sections exist in the specified order.
- Visual design consistently follows the Dark Tech system.
- Desktop and mobile layouts work without horizontal overflow.
- Navigation and CTA links work.
- No broken images or knowingly fake links remain.
- No fake form-submission success is shown.
- The project runs using its documented command.
- Remaining placeholder assets or links are clearly identified.

## 11. Instructions for Future Changes

Before implementing a new request:
1. Read this file and inspect the relevant existing code.
2. Make the smallest coherent change that meets the request.
3. Preserve unrelated sections and working behavior.
4. Update this file if the user explicitly changes a lasting design decision.
5. Verify the affected behavior and report what changed.

Start with Phase 1: inspect the workspace and report the current project structure before implementing.
