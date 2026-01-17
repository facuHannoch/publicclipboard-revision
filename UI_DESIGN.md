# Public Clipboard - Design System

*Last Updated: January 17, 2026*

## Design Philosophy

Public Clipboard uses a **pure grayscale monochrome aesthetic** with the Zinc palette to create a clean, professional, and timeless interface. The light theme emphasizes airiness and softness with white backgrounds and subtle borders, while the dark theme provides comfortable nighttime viewing.

## Color Palette

### Primary Colors (Pure Grayscale - Zinc)
The design uses the Zinc palette for pure neutral grays without blue undertones:

**Light Theme (Lighter & Airier):**
- Background: `white` (`#ffffff`)
- Secondary Background: `zinc-50` (`#fafafa`)
- Borders: `zinc-100` (`#f4f4f5`), `zinc-200` (`#e4e4e7`)
- Text Primary: `zinc-800` (`#27272a`)
- Text Secondary: `zinc-500` (`#71717a`)
- Decorative Blur: `zinc-100/60` (10% opacity)
- Grid Lines: `zinc-500/8` (8% opacity)

**Dark Theme:**
- Background: `zinc-900` (`#18181b`)
- Secondary Background: `zinc-950` (`#09090b`)
- Borders: `zinc-700` (`#3f3f46`), `zinc-800` (`#27272a`)
- Text Primary: `zinc-50` (`#fafafa`)
- Text Secondary: `zinc-400` (`#a1a1aa`)
- Decorative Blur: `zinc-800/40` (40% opacity)
- Grid Lines: `zinc-500/15` (15% opacity)

**Interactive Elements:**
- Primary CTA (Light): `zinc-800` → hover: `zinc-700`
- Primary CTA (Dark): `zinc-100` → hover: `zinc-200`
- Number Badges: `zinc-800`, `zinc-700`, `zinc-600` (varying hierarchy)

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, sans-serif;
```

### Scale
- **Hero Title**: `text-5xl` to `text-7xl` (48px - 72px) — Bold
- **Section Heading**: `text-3xl` to `text-4xl` (30px - 36px) — Bold
- **Feature Title**: `text-xl` (20px) — Semibold
- **Body Text**: `text-sm` to `text-lg` (14px - 18px) — Regular/Medium
- **Badge Text**: `text-xs` (12px) — Medium

### Weights
- **Bold**: 700 (Headings)
- **Semibold**: 600 (Subheadings, CTAs)
- **Medium**: 500 (Labels, Links)
- **Regular**: 400 (Body text)

## Layout

### Container Widths
- Hero Section: `max-w-6xl` (1152px)
- Features Section: `max-w-6xl` (1152px)
- How It Works Section: `max-w-4xl` (896px)
- CTA Section: `max-w-2xl` (672px)

### Spacing
- Section Padding: `py-20` (80px vertical)
- Card Padding: `p-6` to `p-8` (24px - 32px)
- Gap Between Cards: `gap-6` (24px)
- Element Spacing: `mb-4`, `mb-6`, `mb-12` (16px, 24px, 48px)

### Board Canvas
- Fixed Dimensions: **1920×1080px**
- Grid Size: **40px × 40px**
- Grid Color (Light): `zinc-500` at 8% opacity
- Grid Color (Dark): `zinc-500` at 15% opacity

## Components

### Navbar
```tsx
- Height: Auto (content-based)
- Background: white/80 with backdrop-blur-md (glassmorphism)
- Border: border-b border-zinc-100
- Logo: text-xl font-bold text-zinc-800
- Links: text-sm font-medium text-zinc-500 → hover:text-zinc-800
- CTA Button: rounded-full bg-zinc-800 px-6 py-2
```

### Feature Cards
```tsx
- Layout: 3-column grid (md:grid-cols-3)
- Border: border border-zinc-100
- Background: bg-gradient-to-br from-white to-zinc-50
- Shadow: shadow-sm → hover:shadow-lg
- Padding: p-8
- Hover Effect: hover:-translate-y-1 (lift)
- Emoji Watermark: text-6xl opacity-5 → hover:opacity-10
```

### Step Cards (How It Works)
```tsx
- Layout: Vertical stack (space-y-4)
- Border: border border-zinc-100 → hover:border-zinc-200
- Background: bg-white
- Shadow: shadow-sm → hover:shadow-md
- Padding: p-6
- Number Badge: h-12 w-12 rounded-full (bg-zinc-800/700/600)
- Badge Hover: scale-110
```

### Board Number Input (Fused Design)
```tsx
- Input: rounded-l-full border-2 border-r-0 border-zinc-100
- Button: rounded-r-full border-2 border-zinc-100
- Height: h-14 (56px)
- Input Width: w-32 (128px)
- Button Width: w-14 (56px)
- Focus: border-zinc-300
- Hover: hover:bg-zinc-700 (button)
```

### Text Objects (Board Canvas)
```tsx
- Border: border-2 border-zinc-200
- Background: bg-white
- Shadow: shadow-sm → hover:shadow-lg
- Padding: p-4
- Cursor: cursor-move
- Border Radius: rounded-lg
```

### CTA Buttons
**Primary:**
```tsx
- Size: px-8 py-4 (large), px-6 py-2 (small)
- Shape: rounded-full
- Background (Light): bg-zinc-800 → hover:bg-zinc-700
- Background (Dark): bg-zinc-100 → hover:bg-zinc-200
- Text (Light): text-white
- Text (Dark): text-zinc-900
- Shadow: shadow-md shadow-zinc-800/10 → hover:shadow-lg
- Hover: scale-105
```

### Floating Action Button (FAB)
```tsx
- Size: h-14 w-14
- Shape: rounded-full
- Background (Light): bg-zinc-800 → hover:bg-zinc-700
- Background (Dark): bg-zinc-100 → hover:bg-zinc-200
- Shadow: shadow-lg
- Hover: scale-110
- Position: fixed bottom-8 left-8
```

## Interactions

### Hover States
- **Cards**: Lift effect (`hover:-translate-y-1`) + shadow increase
- **Buttons**: Scale effect (`hover:scale-105` or `hover:scale-110`)
- **Links**: Color transition (`hover:text-zinc-800`)
- **Text Objects**: Shadow increase (`hover:shadow-lg`)

### Transitions
- Default: `transition-all` (smooth all properties)
- Colors: `transition-colors` (color changes only)
- Transform: `transition-transform` (scale/translate only)
- Shadow: `transition-shadow` (shadow changes only)

### Animations
- **Ping Animation**: Used on "200 boards" badge
  ```tsx
  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-zinc-600" />
  ```

## Dark Mode

### Implementation
All components support dark mode via Tailwind's `dark:` prefix:
```tsx
className="bg-white dark:bg-zinc-900"
```

### Key Differences
- **Backgrounds**: Inverted (white ↔ zinc-900)
- **Text**: Inverted (zinc-800 ↔ zinc-50)
- **Borders**: Adjusted (zinc-100/200 ↔ zinc-700/800)
- **Interactive Elements**: White buttons become zinc-100 in dark mode

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Primary text (zinc-800 on white): 12.63:1 contrast ratio
- Secondary text (zinc-500 on white): 4.61:1 contrast ratio

### Focus States
- All interactive elements have visible focus states
- Focus rings use `focus:outline-none` with `focus:border-zinc-300`

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic nav, section, and button elements
- Alt text for decorative elements handled via emoji

## Background Elements

### Decorative Blurs
```tsx
- Size: h-96 w-96 (384px × 384px)
- Shape: rounded-full
- Background: bg-zinc-100/60 (light), bg-zinc-800/40 (dark)
- Blur: blur-3xl
- Position: absolute with top/bottom/left/right positioning
- Purpose: Add subtle depth without distracting from content
```

### Device Mockups
**Desktop Board:**
```tsx
- Size: h-48 w-80 (192px × 320px)
- Transform: rotate-6
- Border: border-2 border-zinc-200
- Background: bg-zinc-50/90
- Shadow: shadow-xl
- Backdrop: backdrop-blur-sm
```

**Mobile Board:**
```tsx
- Size: h-64 w-32 (256px × 128px)
- Transform: -rotate-3
- Border: border-2 border-zinc-200
- Background: bg-zinc-50/90
- Shadow: shadow-xl
- Backdrop: backdrop-blur-sm
```

### "Copied!" Speech Bubble
```tsx
- Background: bg-zinc-700 (light), bg-zinc-300 (dark)
- Text: text-white (light), text-zinc-900 (dark)
- Border Radius: rounded-2xl
- Padding: px-4 py-2
- Shadow: shadow-lg
- Position: Relative positioned with triangle pointer
```

## Responsive Design

### Breakpoints
- **sm**: 640px (Small tablets)
- **md**: 768px (Tablets, feature grid switches to 3 columns)
- **lg**: 1024px (Desktops)

### Mobile Optimizations
- Hero title scales from `text-5xl` to `text-7xl`
- Section headings scale from `text-3xl` to `text-4xl`
- Feature grid: 1 column on mobile, 3 columns on `md` and up
- Padding adjusts: `px-6` (24px horizontal) maintained on all sizes

## Grid System

### Landing Page
- Features: `grid gap-6 md:grid-cols-3`
- Steps: `space-y-4` (vertical stack)

### Board Canvas
- Grid Pattern: CSS gradient lines every 40px
- Line Color: `rgb(113 113 122 / 0.08)` (light mode)
- Line Color: `rgb(113 113 122 / 0.15)` (dark mode)
- Implementation:
  ```css
  background-image: 
    linear-gradient(to right, rgb(113 113 122 / 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(113 113 122 / 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
  ```

## Notes

- **Why Zinc over Slate?** Slate has a blue undertone. Zinc is pure neutral gray.
- **Light Theme Philosophy**: White backgrounds with subtle zinc-50/100 accents create an airy, spacious feel. Softer shadows (sm→lg) reduce visual weight.
- **Emoji Usage**: Emojis provide visual interest in a monochrome design without introducing color complexity.
- **Glassmorphism**: Used sparingly on navbar for modern, layered effect.
- **Shadow Hierarchy**: `shadow-sm` (subtle) → `shadow-md` (standard) → `shadow-lg` (prominent) → `shadow-xl` (dramatic).
