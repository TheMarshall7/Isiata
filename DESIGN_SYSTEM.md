# ISIATA Design System

A comprehensive guide to the visual language, components, and patterns used throughout the ISIATA website.

---

## Brand Identity

### Voice & Tone
- **Restrained**: No hype, no shouting
- **Clear**: Direct communication
- **Atmospheric**: Evocative but not verbose
- **Confident**: No need to explain or justify

### Writing Style
- Short sentences
- Active voice
- Present tense
- No genre labels
- No creator "about me" language
- Let the work speak

---

## Visual Language

### Color System

#### Foundation
```
Background:    #020202  - Almost black
Surface:       #0A0A0A  - Slightly lighter black
```

#### Zinc Scale (Neutrals)
```
zinc-950:      #09090b  - Darkest gray
zinc-900:      #18181b  - Very dark gray
zinc-800:      #27272a  - Dark gray
zinc-700:      #3f3f46  - Medium-dark gray
zinc-600:      #52525b  - Medium gray
zinc-500:      #71717a  - Medium-light gray
zinc-400:      #a1a1aa  - Light gray (secondary text)
zinc-300:      #d4d4d8  - Lighter gray
zinc-200:      #e4e4e7  - Very light gray
zinc-100:      #f4f4f5  - Almost white
```

#### Accent Colors
```
Purple:        #a855f7  - Primary accent (purple-500)
Purple Glow:   rgba(168, 85, 247, 0.25)  - Soft glow
```

#### Status Colors
```
Green:         #10b981  - Live/available (green-500)
Amber:         #f59e0b  - Upcoming (amber-500)
Red:           #ef4444  - Sold out (red-500)
Gray:          #6b7280  - Archived (gray-500)
```

#### Opacity Levels
```
/[0.02]:  2%  - Subtle surface
/[0.03]:  3%  - Hover surface
/[0.05]:  5%  - Background overlay
/10:     10%  - Borders, dividers
/20:     20%  - Subtle emphasis
/30:     30%  - Selection background
/40:     40%  - Medium emphasis
/50:     50%  - Disabled state
```

---

## Typography

### Font Families

#### Primary: Plus Jakarta Sans
```css
font-family: 'Plus Jakarta Sans', sans-serif;
```
- **Usage**: Body text, UI elements, captions
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

#### Display: Oswald
```css
font-family: 'Oswald', sans-serif;
text-transform: uppercase;
```
- **Usage**: Large headings only, always uppercase
- **Weights**: 300, 400, 500, 600, 700

#### Monospace: System
```css
font-family: ui-monospace, monospace;
```
- **Usage**: Metadata, technical info, email inputs
- **Example**: "PRODUCER@EMAIL.COM", "VOL. 01 — ARCHIVE"

### Type Scale

| Class       | Size   | Line Height | Usage                          |
|-------------|--------|-------------|--------------------------------|
| `text-xs`   | 12px   | 1.5         | Metadata, captions, tiny labels |
| `text-sm`   | 14px   | 1.5         | Secondary text, UI labels       |
| `text-base` | 16px   | 1.625       | Body text (default)             |
| `text-lg`   | 18px   | 1.625       | Emphasized paragraphs           |
| `text-xl`   | 20px   | 1.5         | Small headings, card titles     |
| `text-2xl`  | 24px   | 1.5         | Section subheadings             |
| `text-3xl`  | 30px   | 1.25        | Section headings                |
| `text-4xl`  | 36px   | 1.25        | Page titles                     |
| `text-5xl`  | 48px   | 1.1         | Hero headings (mobile)          |
| `text-6xl`  | 60px   | 1.1         | Hero headings (tablet)          |
| `text-7xl`  | 72px   | 1.1         | Hero headings (tablet+)         |
| `text-8xl`  | 96px   | 0.9         | Hero headings (desktop)         |

### Font Weights

```css
font-light:    300  - Sparingly, atmospheric tone
font-normal:   400  - Body text default
font-medium:   500  - Emphasis, labels
font-semibold: 600  - Headings
font-bold:     700  - Strong CTAs only
font-extrabold: 800 - Rarely used
```

### Text Treatments

#### Gradient Text (for heroes)
```css
.gradient-text {
  @apply text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500;
}
```

#### Tracking (Letter Spacing)
```css
tracking-tighter:  -0.05em  - Large display text
tracking-tight:    -0.025em - Headings
tracking-normal:    0em     - Body text
tracking-wide:      0.025em - Uppercase labels
tracking-wider:     0.05em  - Small uppercase
tracking-widest:    0.1em   - Tiny uppercase
```

---

## Spacing & Layout

### Spacing Scale (based on 4px)

| Class      | Size   | Usage                              |
|------------|--------|------------------------------------|
| `space-1`  | 4px    | Tight spacing                      |
| `space-2`  | 8px    | Button padding, small gaps         |
| `space-3`  | 12px   | Compact spacing                    |
| `space-4`  | 16px   | Default gap, card padding          |
| `space-6`  | 24px   | Section internal spacing           |
| `space-8`  | 32px   | Component spacing                  |
| `space-12` | 48px   | Between sections (mobile)          |
| `space-16` | 64px   | Between sections (tablet)          |
| `space-24` | 96px   | Between sections (desktop)         |
| `space-32` | 128px  | Large section breaks, hero spacing |

### Container Widths

```css
max-w-2xl:  672px   - Forms, single column content
max-w-4xl:  896px   - Floating navigation
max-w-7xl:  1280px  - Main content container (default)
max-w-full: 100%    - Full width
```

### Grid Layouts

#### Desktop (≥1024px)
- Category grids: 3-4 columns
- Card grids: 3 columns
- Footer links: 4 columns

#### Tablet (≥768px)
- Category grids: 2 columns
- Card grids: 2 columns
- Footer links: 4 columns

#### Mobile (<768px)
- Category grids: 1 column
- Card grids: 1 column
- Footer links: 2 columns

---

## Components

### Buttons

#### Primary (White)
```html
<button class="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
  Explore
</button>
```

#### Secondary (Outlined)
```html
<button class="bg-zinc-900 border border-white/10 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-colors">
  Add to Cart
</button>
```

#### Ghost (Text only)
```html
<a href="#" class="text-sm font-medium text-white hover:text-zinc-300 transition-colors">
  View Contents
</a>
```

### Badges

#### Live (Green)
```html
<div class="inline-flex items-center justify-center px-3 py-1 border border-green-500/30 bg-green-500/20 text-green-200 text-xs font-medium tracking-wide uppercase">
  Available Now
</div>
```

#### Upcoming (Amber)
```html
<div class="inline-flex items-center justify-center px-3 py-1 border border-amber-500/30 bg-amber-500/20 text-amber-200 text-xs font-medium tracking-wide uppercase">
  Coming Soon
</div>
```

#### Archived (Gray)
```html
<div class="inline-flex items-center justify-center px-3 py-1 border border-zinc-500/30 bg-zinc-500/20 text-zinc-300 text-xs font-medium tracking-wide uppercase">
  Archived
</div>
```

### Cards

#### Base Card
```html
<div class="flashlight-card border border-white/10 bg-black/40 p-8 hover:bg-white/[0.03] transition-colors">
  <!-- Card content -->
</div>
```

#### Card with Image
```html
<div class="group block">
  <div class="relative aspect-square overflow-hidden bg-zinc-900 mb-4">
    <img src="..." class="object-cover transition-transform duration-500 group-hover:scale-105" />
  </div>
  <h3 class="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors">
    Title
  </h3>
</div>
```

### Forms

#### Input Field
```html
<input
  type="text"
  class="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors"
/>
```

#### Textarea
```html
<textarea
  rows="8"
  class="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors resize-none"
></textarea>
```

#### Email Capture (Inline)
```html
<form class="flex">
  <input
    type="email"
    placeholder="PRODUCER@EMAIL.COM"
    class="bg-white text-black text-xs font-mono font-medium placeholder:text-black/50 px-5 py-4 w-full uppercase"
  />
  <button class="bg-zinc-900 text-white text-[11px] tracking-wide font-semibold px-8 py-4 border border-zinc-800 hover:bg-zinc-800 uppercase">
    Subscribe
  </button>
</form>
```

---

## Effects & Interactions

### Flashlight Card Effect

Creates a mouse-tracking spotlight on cards.

```css
.flashlight-card {
  position: relative;
  --mouse-x: -999px;
  --mouse-y: -999px;
}

.flashlight-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
  z-index: 10;
  mix-blend-mode: screen;
}

.flashlight-card:hover::after {
  opacity: 1;
}
```

**JavaScript:**
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
})
```

### Reveal Animation

Scroll-triggered fade-in with blur.

```css
.aura-reveal {
  animation: reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-play-state: paused;
}

.aura-reveal.is-visible {
  animation-play-state: running;
}

@keyframes reveal {
  0% {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

**Stagger delays:**
```html
<div class="aura-reveal" style="animation-delay: 0ms">First</div>
<div class="aura-reveal" style="animation-delay: 100ms">Second</div>
<div class="aura-reveal" style="animation-delay: 200ms">Third</div>
```

### Hover States

#### Scale Effect
```css
transition: transform 300ms ease-out;
&:hover {
  transform: scale(1.02);
}
```

#### Image Zoom
```css
.group:hover img {
  transform: scale(1.05);
  transition: transform 500ms ease-out;
}
```

#### Opacity Shift
```css
transition: opacity 300ms ease-out;
&:hover {
  opacity: 0.7;
}
```

---

## Patterns

### Diagonal Stripe Background

```css
.bg-stripes {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 40px,
    rgba(255, 255, 255, 0.015) 40px,
    rgba(255, 255, 255, 0.015) 41px
  );
}
```

### Glassmorphic Elements

```css
backdrop-filter: blur(12px);
background: rgba(0, 0, 0, 0.8);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Gradient Overlays

```css
/* Top fade */
background: linear-gradient(to bottom, transparent, black 80%);

/* Radial glow */
background: radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%);
```

---

## Accessibility

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-white/50
focus:ring-offset-2
focus:ring-offset-black
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### ARIA Labels
Always include:
- `aria-label` on icon-only buttons
- `alt` text on all images
- `aria-hidden="true"` on decorative elements

---

## Best Practices

### DO
✓ Use subtle animations (300-500ms)
✓ Maintain high contrast (white on near-black)
✓ Keep CTAs minimal and clear
✓ Use monospace for technical/metadata text
✓ Let whitespace breathe
✓ Use borders instead of shadows
✓ Stick to the neutral palette

### DON'T
✗ Use bright, saturated colors
✗ Add bouncing or spinning animations
✗ Create busy backgrounds
✗ Use multiple accent colors
✗ Add excessive shadows or glows
✗ Mix too many font families
✗ Use all-caps for body text

---

## Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## Icon System

Using Iconify for all icons:

```html
<iconify-icon icon="solar:music-library-2-linear" width="24" height="24"></iconify-icon>
```

**Icon Set:** Solar Icons (Linear style)
**Common Icons:**
- `solar:music-library-2-linear` - Sound
- `solar:shop-2-linear` - Objects
- `solar:diskette-linear` - Tools
- `solar:key-linear` - Access
- `solar:arrow-right-linear` - Navigation
- `solar:soundwave-linear` - Audio
- `solar:close-circle-linear` - Close

---

## Performance Considerations

- **Images**: Use Next.js Image component with blur placeholders
- **Fonts**: Preload critical fonts, use `font-display: swap`
- **Animations**: Use `will-change` sparingly, prefer `transform` and `opacity`
- **JavaScript**: Lazy load non-critical components
- **CSS**: Avoid expensive operations (backdrop-filter usage is minimal)

---

This design system ensures consistency, accessibility, and premium quality across the entire ISIATA website.
