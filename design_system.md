# Subhash Rana Portfolio Design System

## 1. Design Direction

A refined developer portfolio with a restrained glassmorphism language:

- Soft neutral surfaces in light mode
- Near-black surfaces in dark mode
- Indigo as the primary interaction color
- Outfit headings, Inter body text, and Fira Code technical metadata
- Rounded cards, compact labels, and subtle borders
- Motion-led reveals instead of heavy visual effects
- Developer-oriented motifs such as code windows, contribution heatmaps, and timeline layouts

The interface should feel technical, calm, intentional, and easy to scan.

## 2. Color System

### Core tokens

| Token              | Light     | Dark      | Usage                                        |
| ------------------ | --------- | --------- | -------------------------------------------- |
| `--bg`             | `#f5f7f9` | `#0d0d0d` | Page background                              |
| `--bg-elevated`    | `#ffffff` | `#161616` | Cards, panels, inputs                        |
| `--border-subtle`  | `#e5e9eb` | `#2a2a2a` | Dividers and card borders                    |
| `--text-accent`    | `#1a1d1f` | `#e2e4e6` | Primary text and headings                    |
| `--text-secondary` | `#595c5e` | `#a0a3a5` | Body copy and secondary content              |
| `--text-muted`     | `#71717a` | `#a1a1aa` | Captions, metadata, supporting text          |
| `--accent`         | `#4647d3` | `#8083ff` | Links, active states, focus, primary actions |

### Status colors

- Success and availability: emerald/green
- Error: red
- Warning or attention: amber
- Informational category: sky
- Frontend skill category: violet
- Database skill category: emerald
- Tooling skill category: amber

Status colors should communicate meaning and should not replace the primary indigo interaction color.

### Color usage

- Use `--bg` for the page and large section surfaces.
- Use `--bg-elevated` for cards, forms, and navigation panels.
- Use `--border-subtle` for quiet separation.
- Use `--accent` for interactive emphasis, not large decorative fills.
- Keep body text neutral; reserve accent color for links, labels, metrics, and active controls.
- Maintain clear contrast in both themes.

## 3. Typography

### Font families

| Role                        | Font      |
| --------------------------- | --------- |
| Body                        | Inter     |
| Headings                    | Outfit    |
| Code and technical metadata | Fira Code |

These fonts are loaded through `next/font/google` in `src/app/layout.tsx`.

### Type scale

| Name           |                                    Size | Line height | Typical usage                    |
| -------------- | --------------------------------------: | ----------: | -------------------------------- |
| `text-h1`      |       `clamp(2.5rem, 5vw + 1rem, 4rem)` |       `1.1` | Hero name                        |
| `text-h2`      |         `clamp(2rem, 4vw + 1rem, 3rem)` |       `1.2` | Section titles                   |
| `text-h3`      |  `clamp(1.75rem, 3vw + 0.5rem, 2.5rem)` |       `1.2` | Major subsection titles          |
| `text-h4`      |   `clamp(1.5rem, 2.5vw + 0.5rem, 2rem)` |       `1.3` | Project titles                   |
| `text-h5`      | `clamp(1.25rem, 2vw + 0.25rem, 1.5rem)` |       `1.4` | Experience titles                |
| `text-body`    |   `clamp(1rem, 1vw + 0.5rem, 1.125rem)` |       `1.6` | Main body copy                   |
| `text-small`   |                             `0.9375rem` |       `1.5` | Compact descriptions and buttons |
| `text-caption` |                               `0.75rem` |       `1.5` | Labels, tags, metadata           |

### Typographic rules

- Headings use Outfit and a bold or extrabold weight.
- Body copy uses Inter with generous line height.
- Technical labels use Fira Code where a code-oriented feel is useful.
- Section labels are uppercase, accent-colored, and widely tracked.
- Avoid unnecessary decorative type treatments.

## 4. Layout

### Container

The home page uses a centered `max-w-7xl` content container with responsive horizontal padding:

- Mobile: `px-6`
- Small screens: `sm:px-12`
- Medium screens: `md:px-16`
- Large screens: `lg:px-24`

### Section structure

The page follows this order:

1. Hero
2. About and skills
3. Experience
4. GitHub activity
5. Selected projects
6. Contact
7. Footer

Sections should use generous vertical rhythm and should not feel like unrelated dashboard panels.

### Grid rules

- Hero: stacked on mobile, two columns from `md` upward.
- Skills: responsive icon grid.
- Experience: vertical timeline on desktop, simplified stacked cards on mobile.
- Projects: one column on mobile, three columns from `md` upward.
- Contact: stacked on mobile, two columns from `lg` upward.
- GitHub heatmap: horizontally scrollable on narrow screens.

## 5. Shape, Surfaces, and Elevation

### Radius scale

- `rounded-lg`: buttons and compact controls
- `rounded-xl`: standard cards, inputs, navigation controls
- `rounded-2xl`: major panels and project cards
- `rounded-3xl`: decorative floating glass panels
- `rounded-full`: status indicators, tags, and avatar treatments

### Surface patterns

Standard cards use:

- Elevated background
- Subtle border
- Small shadow
- Optional backdrop blur
- Small upward translation on hover

Glass surfaces use:

- Semi-transparent white in light mode
- Semi-transparent dark neutral in dark mode
- `backdrop-filter: blur(...)`
- Low-contrast translucent borders

Avoid excessive shadows or nested cards. Cards should clarify grouping, not decorate every section.

## 6. Component Patterns

### Section heading

The shared section heading contains:

- Optional uppercase accent label
- Large Outfit title
- Optional muted subtitle with a constrained width

Use this pattern consistently for major sections.

### Buttons

Buttons should:

- Have a minimum touch target of `44px`
- Use semibold text
- Use `rounded-lg` or `rounded-xl`
- Include a clear hover state
- Use indigo for primary actions
- Use a transparent or glass surface for secondary actions
- Provide a visible keyboard focus state

Prefer the shared `Button` component over recreating button styles locally.

### Badges and tags

Use badges for:

- Availability
- Project category
- Featured status
- Technology tags
- Timeline indexes
- Filter states

Badge text should be compact and semibold. Uppercase tracking is appropriate for metadata, but should not be used for paragraph content.

### Cards

Cards should maintain consistent internal spacing and use clear visual hierarchy:

1. Label or metadata
2. Heading
3. Description
4. Supporting data or tags
5. Action row

Project cards may include image previews, technology pills, impact details, and GitHub/live links.

### Forms

Inputs use:

- Elevated or semi-transparent surfaces
- Subtle borders
- `rounded-xl`
- Generous vertical padding
- Accent focus rings
- Uppercase, tracked labels

Validation and submission feedback should use semantic success and error colors.

## 7. Iconography

The project uses `lucide-react`, `react-icons`, and a small number of inline SVG icons.

Guidelines:

- Use simple line icons for actions and navigation.
- Keep action icons around `16px-20px`.
- Use larger icons only for skill or feature identity.
- Preserve the existing code-window control dots: red, amber, and emerald.
- Interactive icon-only buttons need accessible labels and tooltips where the purpose is not obvious.

## 8. Motion

Motion is powered by Framer Motion.

### Standard transitions

- Fade up: opacity plus approximately `30px` vertical movement
- Fade in: opacity only
- Stagger: `0.1s-0.15s` between children
- Standard duration: `0.5s-0.6s`
- Main easing: `[0.22, 1, 0.36, 1]`

### Interaction motion

- Cards lift slightly on hover.
- Project images scale subtly on hover.
- Active navigation state uses a small animated indicator.
- Theme icon transitions rotate and scale.
- Floating code panels move slowly and continuously.
- Availability indicators use a restrained pulse.

Motion should support hierarchy and feedback. Avoid animating every element independently.

## 9. Accessibility and Interaction

- Preserve visible `:focus-visible` outlines using the accent color.
- Use minimum `44px` interactive targets.
- Keep text contrast high in both themes.
- Provide accessible names for icon-only controls.
- Use semantic headings and landmarks.
- Keep hover states available through focus states where appropriate.
- Do not rely on color alone to communicate status.

## 10. Responsive Behavior

- Navigation becomes a slide-out menu below `md`.
- Hero actions become full-width stacked buttons on mobile.
- Timeline metadata moves above each experience card on mobile.
- Project filters wrap when needed.
- Heatmap data remains usable through horizontal scrolling.
- Contact information and form stack vertically below `lg`.
- Text must wrap without causing horizontal overflow.

## 11. Implementation Rules

Prefer semantic tokens over hard-coded color values:

```tsx
className = "bg-surface-elevated text-primary border-subtle";
```

Prefer shared components for repeated patterns:

- `Button`
- `SectionHeading`
- `StatCard`
- `ProjectCard`
- `ContactForm`

Keep page-specific layout in section components and keep reusable visual behavior in shared components.

## 12. Current Token Cleanup

The codebase currently mixes the established token names with undefined Material-style names. These should be consolidated before adding new UI.

Undefined or inconsistent names currently include:

- `text-on-surface`
- `text-on-surface-variant`
- `text-inverse-on-surface`
- `bg-inverse-surface`
- `bg-surface-container`
- `bg-surface-container-low`
- `bg-surface-container-lowest`
- `border-outline-variant`
- `text-tertiary`
- `--color-primary-container`
- `--color-outline-variant`
- `--color-outline`

Recommended mapping:

| Existing usage              | Preferred token                                        |
| --------------------------- | ------------------------------------------------------ |
| `text-on-surface`           | `text-primary`                                         |
| `text-on-surface-variant`   | `text-secondary`                                       |
| `bg-inverse-surface`        | Explicit dark surface token                            |
| `bg-surface-container*`     | `bg-surface-elevated` or a new documented surface tier |
| `border-outline-variant`    | `border-subtle`                                        |
| `text-tertiary`             | `text-muted` or a documented status token              |
| `--color-primary-container` | A documented accent-container token                    |
| `--color-outline-variant`   | `--border-subtle`                                      |

Also consolidate hard-coded `bg-indigo-500` and `bg-indigo-600` actions around `--accent` so light and dark themes remain centrally controlled.

## 13. Design Principle

The interface should communicate:

> A thoughtful full-stack developer who values clarity, performance, measurable impact, and clean engineering.

Every visual decision should reinforce that impression rather than compete with the content.
