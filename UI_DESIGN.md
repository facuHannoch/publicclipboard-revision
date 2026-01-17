# UI_DESIGN.md
**Visual & Interaction Constraints for Public Clipboard**

*Last Updated: January 17, 2026*

---

## Authority Levels

This document contains three types of information:

- **Rules**: Non-negotiable constraints. Agents MUST follow these.
- **Defaults**: Recommended patterns. Agents SHOULD follow these unless instructed otherwise.
- **Examples**: Concrete implementations. Agents MAY adapt these as needed.

Each section is labeled accordingly.

---

## RULES (Non-Negotiable)

### Color Palette
**MUST use Zinc palette only. NO other color palettes.**

Decision rationale: Zinc chosen over Slate because Slate has blue undertone (`#64748b`). Zinc is pure neutral gray (`#71717a`).

Light mode tokens:
```
white (#ffffff)
zinc-50 (#fafafa)
zinc-100 (#f4f4f5)
zinc-200 (#e4e4e7)
zinc-500 (#71717a)
zinc-800 (#27272a)
```

Dark mode tokens:
```
zinc-50 (#fafafa)
zinc-400 (#a1a1aa)
zinc-700 (#3f3f46)
zinc-800 (#27272a)
zinc-900 (#18181b)
zinc-950 (#09090b)
```

**MUST NOT use:**
- Slate, Gray, Stone, or Neutral palettes
- Any color accents (blue, green, red, purple, etc.)
- Gradients except `bg-gradient-to-br from-white to-zinc-50` on feature cards

### Typography
**MUST use system font stack only:**
```css
font-family: system-ui, -apple-system, sans-serif;
```

**MUST NOT use:**
- Custom fonts
- Web fonts (Google Fonts, Adobe Fonts, etc.)
- Font files (woff, woff2, ttf)

### Shadow Hierarchy
**MUST use only these Tailwind shadow tokens:**
- `shadow-sm` (smallest)
- `shadow-md`
- `shadow-lg`
- `shadow-xl` (largest)

**MUST NOT use:**
- `shadow-2xl`
- Custom shadow values
- Shadows exceeding `shadow-xl`

### Button Shapes
**Primary CTAs MUST use `rounded-full`.**

Decision rationale: Creates clear visual hierarchy. Secondary buttons may use `rounded-lg` or `rounded-xl`.

### Dark Mode Inversion
**MUST follow these inversion rules:**

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | `bg-white` | `bg-zinc-900` |
| Secondary bg | `bg-zinc-50` | `bg-zinc-950` |
| Text primary | `text-zinc-800` | `text-zinc-50` |
| Text secondary | `text-zinc-500` | `text-zinc-400` |
| Border light | `border-zinc-100` | `border-zinc-800` |
| Border medium | `border-zinc-200` | `border-zinc-700` |
| CTA bg | `bg-zinc-800` | `bg-zinc-100` |
| CTA text | `text-white` | `text-zinc-900` |

### Board Canvas
**MUST use these exact values:**
- Canvas dimensions: `1920px × 1080px`
- Grid size: `40px × 40px`
- Grid implementation: CSS gradient (not SVG, not canvas)

### Accessibility
**MUST meet WCAG AA contrast requirements:**
- Primary text (zinc-800 on white): ≥ 4.5:1
- Secondary text (zinc-500 on white): ≥ 4.5:1
- All interactive elements must have visible focus states

**MUST use:**
- Semantic HTML (`<nav>`, `<section>`, `<button>`)
- Proper heading hierarchy (h1 → h2 → h3, no skips)

---

## Explicit Non-Goals

**DO NOT:**
- Introduce color accents
- Add gradients outside feature cards and decorative blurs
- Use custom fonts or icon fonts
- Add shadows heavier than `shadow-xl`
- Redesign components unless explicitly instructed
- Use animations other than `animate-ping` and CSS transitions
- Add images (except user-generated content)
- Use border-radius other than `rounded-{sm|md|lg|xl|2xl|full}`

---

## DEFAULTS (Recommended Patterns)

These are strong conventions. Follow unless instructed otherwise.

### Color Application Defaults

**Backgrounds:**
```tsx
// Landing page
className="bg-white dark:bg-zinc-900"

// Feature section
className="bg-white dark:bg-zinc-900"

// Board canvas
className="bg-white dark:bg-zinc-950"

// CTA section (intentionally inverted)
className="bg-zinc-900 dark:bg-zinc-950"
```

**Borders:**
```tsx
// Subtle: navbar, cards
border-zinc-100 dark:border-zinc-800

// Standard: inputs, buttons
border-zinc-200 dark:border-zinc-700

// Text objects on canvas
border-zinc-200 dark:border-zinc-700
```

**Text:**
```tsx
// Headings
text-zinc-800 dark:text-zinc-50

// Body / descriptions
text-zinc-500 dark:text-zinc-400

// Links
text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50
```

### Typography Scale (Defaults)
```tsx
// Page title / hero
text-5xl sm:text-6xl md:text-7xl font-bold

// Section headings
text-3xl sm:text-4xl font-bold

// Card titles
text-xl font-semibold

// Body text
text-sm leading-relaxed

// Labels / badges
text-xs font-medium
```

### Spacing Scale (Defaults)
```tsx
// Section vertical padding
py-20

// Card padding
p-6  // standard
p-8  // large cards

// Gap between cards
gap-6

// Vertical spacing
mb-4   // small
mb-6   // medium
mb-12  // large
```

### Component: Navbar
```tsx
<nav className="border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
  <div className="flex items-center justify-between px-6 py-4">
    {/* Logo */}
    <div className="text-xl font-bold text-zinc-800 dark:text-zinc-50">
      Public Clipboard
    </div>
    
    {/* Links */}
    <a className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-50">
      Features
    </a>
    
    {/* CTA */}
    <button className="rounded-full bg-zinc-800 px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900">
      Get Started
    </button>
  </div>
</nav>
```

### Component: Feature Card
```tsx
<div className="group rounded-2xl border border-zinc-100 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
  {/* Icon */}
  <div className="mb-4 text-4xl">⚡</div>
  
  {/* Title */}
  <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
    Feature Title
  </h3>
  
  {/* Description */}
  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
    Feature description text
  </p>
</div>
```

### Component: Step Card
```tsx
<div className="group flex gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
  {/* Badge */}
  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xl font-bold text-white group-hover:scale-110 dark:bg-zinc-100 dark:text-zinc-900">
    1
  </div>
  
  {/* Content */}
  <div className="flex-1">
    <h3 className="mb-2 text-xl font-semibold text-zinc-800 dark:text-zinc-50">
      Step Title
    </h3>
    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
      Step description
    </p>
  </div>
</div>
```

### Component: Primary CTA
```tsx
<button className="rounded-full bg-zinc-800 px-8 py-4 text-lg font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-zinc-700 hover:shadow-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
  Button Text
</button>
```

### Component: Floating Action Button (FAB)
```tsx
<button className="fixed bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-2xl text-white shadow-lg transition-all hover:scale-110 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
  +
</button>
```

### Component: Text Object (Board Canvas)
```tsx
<div className="absolute cursor-move rounded-lg border-2 border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
  <div className="text-sm text-zinc-800 dark:text-zinc-50">
    Text content
  </div>
</div>
```

### Component: Fused Input (Board Number)
```tsx
<div className="flex">
  <input
    type="number"
    className="h-14 w-32 rounded-l-full border-2 border-r-0 border-zinc-100 bg-white px-4 text-center text-lg font-medium text-zinc-800 focus:border-zinc-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
  />
  <button className="flex h-14 w-14 items-center justify-center rounded-r-full border-2 border-zinc-100 bg-white text-2xl text-zinc-500 transition-all hover:bg-zinc-700 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
    →
  </button>
</div>
```

### Hover Patterns (Defaults)
```tsx
// Cards: lift + shadow increase
hover:-translate-y-1 hover:shadow-lg

// Buttons: scale
hover:scale-105  // standard
hover:scale-110  // FAB / accent

// Links: color transition
hover:text-zinc-800 dark:hover:text-zinc-50

// Badges: scale
group-hover:scale-110
```

### Transition Classes (Defaults)
```tsx
transition-all        // for combined effects (scale + shadow)
transition-colors     // for text/bg color changes
transition-transform  // for scale/translate only
transition-shadow     // for shadow changes only
```

### Container Widths (Defaults)
```tsx
max-w-6xl  // hero, features (1152px)
max-w-4xl  // steps (896px)
max-w-2xl  // CTA (672px)
```

### Responsive Grid (Defaults)
```tsx
// Feature cards
grid gap-6 md:grid-cols-3

// Step cards
space-y-4  // stacked vertically

// Typography responsive
text-5xl sm:text-6xl md:text-7xl
text-3xl sm:text-4xl
```

---

## EXAMPLES (Reference Implementations)

These are concrete implementations from the current codebase. Agents MAY adapt as needed.

### Example: Decorative Background Blur
```tsx
<div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-zinc-100/60 blur-3xl dark:bg-zinc-800/40" />
```

Values used here:
- Size: `h-96 w-96` (384px)
- Opacity: `zinc-100/60` (light), `zinc-800/40` (dark)
- Blur: `blur-3xl`
- Positioning: `absolute -right-32 top-32`

This is ONE way to implement decorative depth. Adapt positioning and size as needed.

### Example: Device Mockup (Desktop)
```tsx
<div className="h-48 w-80 rotate-6 rounded-lg border-2 border-zinc-200 bg-zinc-50/90 p-3 shadow-xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/90">
  {/* Board content preview */}
</div>
```

Values:
- Size: `h-48 w-80` (192×320px)
- Rotation: `rotate-6`
- Background: `bg-zinc-50/90`

This shows how the landing page implements board previews. Not a required pattern.

### Example: Device Mockup (Mobile)
```tsx
<div className="h-64 w-32 -rotate-3 rounded-2xl border-2 border-zinc-200 bg-zinc-50/90 p-2 shadow-xl backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/90">
  {/* Mobile board preview */}
</div>
```

Values:
- Size: `h-64 w-32` (256×128px)
- Rotation: `-rotate-3`

### Example: "Copied!" Speech Bubble
```tsx
<div className="relative rounded-2xl bg-zinc-700 px-4 py-2 text-xs font-semibold text-white shadow-lg dark:bg-zinc-300 dark:text-zinc-900">
  Copied!
  <div className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 bg-zinc-700 dark:bg-zinc-300" />
</div>
```

Implementation detail for landing page mockup. Not a reusable component pattern.

### Example: Emoji Watermark Pattern
```tsx
<div className="absolute right-4 top-4 text-6xl opacity-5 transition-opacity group-hover:opacity-10">
  ⚡
</div>
```

Values:
- Size: `text-6xl`
- Opacity: `opacity-5` → `group-hover:opacity-10`

Used on feature cards. This is a decorative pattern, not a requirement.

### Example: Grid CSS Implementation
```css
background-image: 
  linear-gradient(to right, rgb(113 113 122 / 0.08) 1px, transparent 1px),
  linear-gradient(to bottom, rgb(113 113 122 / 0.08) 1px, transparent 1px);
background-size: 40px 40px;
```

This is the current implementation for board canvas grid. Grid size (40px) is a RULE. Implementation method is flexible.

### Example: Ping Animation
```tsx
<span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-zinc-600 dark:bg-zinc-400" />
```

Used on "200 boards available" badge. This is the only approved animation besides CSS transitions.

### Example: Number Badge Hierarchy
```tsx
// Step 1
bg-zinc-800 dark:bg-zinc-100

// Step 2
bg-zinc-700 dark:bg-zinc-200

// Step 3
bg-zinc-600 dark:bg-zinc-300
```

Progressive lightening creates visual hierarchy for sequential steps. This is one approach, not the only approach.

---

## Decision Log

### Why Zinc over Slate?
**Slate** (`#64748b`) has blue undertone.  
**Zinc** (`#71717a`) is pure neutral gray.  
Decision: Use Zinc for true monochrome aesthetic.

### Why no color accents?
Color introduces visual complexity and brand assumptions. Pure grayscale is:
- Timeless
- Professional
- Flexible (no color conflicts)

### Why system fonts only?
- Zero latency (no web font loading)
- Native OS rendering (better legibility)
- Consistent with system UI
- Zero external dependencies

### Why rounded-full for CTAs?
- Maximum visual distinction from content cards
- Clear affordance (this is a button)
- Matches modern UI conventions

### Why white backgrounds in light mode?
Previous version used `zinc-50` (#fafafa). Changed to pure white (#ffffff) for:
- Maximum contrast
- Airier feel
- More paper-like

### Why lighter shadows?
Reduced from `shadow-xl` to `shadow-lg` max for:
- Less visual weight
- Softer appearance
- Better for light backgrounds

---

## Visual Vocabulary

| Token | Value | Usage |
|-------|-------|-------|
| `white` | `#ffffff` | Primary bg (light) |
| `zinc-50` | `#fafafa` | Feature section bg, secondary bg |
| `zinc-100` | `#f4f4f5` | Subtle borders (light) |
| `zinc-200` | `#e4e4e7` | Standard borders (light) |
| `zinc-500` | `#71717a` | Secondary text (light) |
| `zinc-800` | `#27272a` | Primary text (light), CTA bg (light) |
| `zinc-900` | `#18181b` | Primary bg (dark) |
| `shadow-sm` | - | Subtle depth |
| `shadow-md` | - | Standard depth |
| `shadow-lg` | - | Prominent depth (max for most UI) |
| `shadow-xl` | - | Dramatic depth (decorative mockups only) |
| `rounded-full` | `9999px` | Primary CTAs |
| `rounded-2xl` | `16px` | Cards |
| `rounded-lg` | `8px` | Text objects, secondary elements |

---

## Anti-Patterns

**DO NOT DO THIS:**

```tsx
// ❌ Using color accents
className="bg-blue-500 text-white"

// ❌ Using non-Zinc grays
className="bg-slate-100 text-gray-900"

// ❌ Custom shadows
style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}

// ❌ Custom fonts
style={{ fontFamily: 'Inter, sans-serif' }}

// ❌ Heavy gradients
className="bg-gradient-to-r from-purple-500 to-pink-500"

// ❌ Skipping dark mode
className="bg-white text-black"  // no dark: variant

// ❌ Non-semantic HTML
<div onClick={...}>Click me</div>  // should be <button>
```

---

## When to Break Rules

**Rules** (section 1) are non-negotiable unless:
1. User explicitly instructs violation
2. Accessibility requires it (e.g., error states may need red)

**Defaults** (section 2) can be adapted when:
1. User requests variant
2. New component type requires it
3. Context demands it (e.g., tighter spacing)

**Examples** (section 3) are reference only:
1. Do not cargo-cult exact values
2. Adapt to context
3. Maintain visual consistency with defaults
