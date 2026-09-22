# Pawks Design System

> **Status:** Foundations locked — moving into atoms
> **Purpose:** Source of truth for the Pawks UI/UX design system and implementation guidance.

---

## 1. Product Identity

**Pawks** is a social network for people who are deeply attached to their pets and treat them as family.

The product should feel like:

> **A polished modern social network made by people who genuinely love their pets.**

Pawks is **pet-first**, but not childish or overly themed.

The product should feel:

- Playful
- Warm
- Modern
- Friendly
- Social
- Spontaneous
- Polished

The interface should feel like a modern social product first and a pet product second.

Pet personality should come primarily through:

- Pet identity
- Content
- Language
- Reactions
- Photography
- Subtle visual cues
- Carefully chosen moments of delight

Avoid turning the entire UI into a pet-themed/cartoon interface.

---

## 2. Target Audience

Primary audience:

> People approximately 18–40 who are obsessed with their pets and treat them as family.

The UI should feel contemporary and socially native to this audience.

Reference products for general interaction and visual expectations:

- BeReal
- Instagram
- Facebook

These references are for interaction patterns and product familiarity, not for copying their visual identity.

---

## 3. Core Design Principles

### 3.1 Pet-first

Pets are the primary social identity.

Owners are important, but pets should generally have stronger visual and semantic hierarchy.

Example:

**Preferred**

> 🐶 Luna
> Pablo · 2h ago

Rather than:

> Pablo
> with Luna · 2h ago

Pet identity should be a first-class concept throughout the product.

---

### 3.2 Modern before cute

Pawks should not look like a children's application.

Avoid:

- Excessive paw prints
- Cartoon UI
- Decorative animal illustrations everywhere
- Childish typography
- Excessive rounded shapes
- Overly saturated colors
- Excessive animations

The UI should remain sophisticated and contemporary.

---

### 3.3 Personality through content

Pawks should feel expressive without making every component expressive.

Personality should primarily come from:

- Pet photography
- Pet names
- Pet types
- Pet-specific terminology
- Reactions
- Empty states
- Occasional illustrations
- Brand color accents

Generic primitives should remain relatively neutral.

---

### 3.4 Warmth without visual noise

The UI should feel warm and approachable, but the visual hierarchy must remain clean.

Warmth should come from:

- A warm-neutral palette
- Subtle brand colors
- Photography
- Friendly copy
- Pet identity
- Small moments of personality

Do not solve warmth by adding decoration everywhere.

---

### 3.5 Subtle interaction

Interactions should feel polished and satisfying rather than theatrical.

Default interaction feedback should be:

- Fast
- Subtle
- Predictable
- Accessible

Avoid large or distracting animations for normal interactions.

---

## 4. Pet Identity

Pets are first-class social entities.

The design system must distinguish between:

- Owner
- Pet
- Pet + Owner relationship
- Multiple pets
- Pet species/type

A pet's identity should normally be more visually prominent than its owner's identity.

### Species iconography

Pets should be represented with appropriate Lucide-style icons where useful.

Examples:

- Cat → cat icon
- Dog → dog icon
- Other species → appropriate species icon where available
- Unknown/other → generic pet icon

The species icon should be treated as a semantic UI element, not decorative artwork.

It can appear alongside:

- Pet names
- Pet selectors
- Pet profile headers
- Identity components
- Filters
- Empty states
- Navigation where appropriate

---

## 5. Pet-aware Component Architecture

The design system follows an atomic approach.

### Technical primitives

Low-level components remain generic and reusable:

- Button
- Icon
- Input
- Label
- Checkbox
- Radio
- Switch
- Select
- Dialog
- Popover
- Tooltip
- Avatar
- Badge
- Card
- Separator
- Tabs
- etc.

These components should not inherently know about pets.

### Pet-aware molecules

Pet-specific concepts should be composed from generic primitives.

Examples:

- PetAvatar
- PetIdentity
- PetSelector
- PetSwitcher
- PetReaction
- PetReactionPicker
- PetBadge
- PetStatus
- PetMeta

For example:

```text
Avatar + SpeciesIcon + Name + Metadata
                ↓
           PetIdentity
```

### Organisms

More complex product-level components can combine pet-aware molecules:

- Post
- FeedItem
- CommentThread
- PetProfileHeader
- PetProfile
- PetSelectorPanel
- ActivityFeed
- Navigation

The design system should preserve a clear separation between technical primitives and product concepts.

---

## 6. Atomic Design Layers

The intended hierarchy is:

```text
Atoms
  ↓
Molecules
  ↓
Organisms
  ↓
Templates
  ↓
Pages
```

Example:

```text
Button
Avatar
Icon
    ↓
PetIdentity
PetReaction
    ↓
Post
    ↓
Feed
    ↓
FeedPage
```

Do not create pet-specific versions of generic primitives unless there is a real semantic need.

Prefer composition over duplication.

---

## 7. Visual Personality

### Desired balance

Pawks should sit between:

```text
Modern social product
        +
Pet-loving community
```

The visual language should communicate:

- Contemporary
- Friendly
- Warm
- Social
- Approachable
- Slightly playful

It should not communicate:

- Childish
- Cartoonish
- Veterinary/clinical
- Luxury/premium
- Corporate SaaS
- Gaming UI

---

## 8. Color System — the Coat Themes

Pawks ships **five selectable color themes ("coats")**, each with a full light and dark mode. This replaces the earlier open-ended "calico inspiration" direction — the palette is now locked, generated, and contrast-verified.

### 8.1 Architecture

All components consume a single, fixed set of semantic tokens — they never know which coat is active:

```text
background, foreground
card, card-foreground
popover, popover-foreground
primary, primary-foreground
secondary, secondary-foreground
muted, muted-foreground
accent, accent-foreground
border, input, ring
```

A coat is simply a light-mode and dark-mode value set for those tokens. Switching coats means swapping the CSS variable values — no component code changes.

**Semantic status colors (success / warning / destructive / info) are fixed across every coat.** They do not change when the user picks a different coat, so meaning never depends on which coat is active.

### 8.2 Generation method

Each coat originates from four hand-picked "cat colorimetry" anchor colors. Anchors are used verbatim wherever they fit a token role (they are never recolored). Where a coat's four anchors don't cover an extreme the UI needs — a true near-white page background, a true near-black dark background, or a dark-mode button color light enough to read against a near-black canvas — that value is generated by extending the same hue/saturation family to the needed lightness. Every text/fill pairing below is WCAG AA verified (≥4.5:1 for text, ≥3:1 for input/UI boundaries).

### 8.3 Semantic status colors (fixed, all coats)

| Token | Light | Dark |
|---|---|---|
| success | `#2a7e49` | `#339958` |
| warning | `#976611` | `#b37914` |
| destructive | `#ce372c` | `#da5c52` |
| info | `#2e70b8` | `#4387d0` |
| *-foreground | `#fdfcfc` | `#201c19` |

### 8.4 Coat 1 — Ragdoll

Anchors: `#dbd4cc` `#808a94` `#a18c85` `#7b6363`

| Token | Light | Dark |
|---|---|---|
| background | `#f7f4f3` | `#1a1614` |
| card / popover | `#fdfcfc` | `#25201d` |
| foreground / card-fg / popover-fg | `#271f1b` | `#eae6e1` |
| muted | `#dbd4cc` | `#332c28` |
| muted-foreground | `#63534b` | `#b9aca2` |
| primary | `#7b6363` | `#b09696` |
| primary-foreground | `#fdfcfc` | `#1a1614` |
| secondary | `#808a94` | `#abb2ba` |
| secondary-foreground | `#271f1b` | `#1a1614` |
| accent | `#a18c85` | `#b9a8a2` |
| accent-foreground | `#271f1b` | `#1a1614` |
| border | `#e5dfdc` | `#453b36` |
| input | `#9c887c` | `#716056` |
| ring | `#7b6363` | `#b09696` |

### 8.5 Coat 2 — Abyssinian

Anchors: `#cbb292` `#7d7769` `#baad79` `#95705e`

| Token | Light | Dark |
|---|---|---|
| background | `#f7f5f3` | `#1b1713` |
| card / popover | `#fdfcfc` | `#26221c` |
| foreground / card-fg / popover-fg | `#2c241c` | `#ebe6e0` |
| muted | `#cbb292` | `#342e27` |
| muted-foreground | `#514538` | `#a59583` |
| primary | `#8d6a58` | `#a8765d` |
| primary-foreground | `#fdfcfc` | `#1b1713` |
| secondary | `#7d7769` | `#89806c` |
| secondary-foreground | `#060504` | `#1b1713` |
| accent | `#baad79` | `#8c804f` |
| accent-foreground | `#060504` | `#1b1713` |
| border | `#e5e1dc` | `#463e35` |
| input | `#9f8a6f` | `#706251` |
| ring | `#8d6a58` | `#a8765d` |

### 8.6 Coat 3 — Maine Coon

Anchors: `#827c72` `#554b3f` `#707e74` `#8c7058`

| Token | Light | Dark |
|---|---|---|
| background | `#f6f5f4` | `#1a1714` |
| card / popover | `#fdfcfc` | `#25211d` |
| foreground / card-fg / popover-fg | `#554b3f` | `#e4e1dd` |
| muted | `#827c72` | `#322e29` |
| muted-foreground | `#141210` | `#9f9489` |
| primary | `#8c7058` | `#9d7b5c` |
| primary-foreground | `#fdfcfc` | `#1a1714` |
| secondary | `#707e74` | `#6e8775` |
| secondary-foreground | `#fdfcfc` | `#1a1714` |
| accent | `#eae3dc` | `#96806e` |
| accent-foreground | `#554b3f` | `#1a1714` |
| border | `#e4e1dd` | `#433d37` |
| input | `#9a8b79` | `#6d635a` |
| ring | `#8c7058` | `#9d7b5c` |

### 8.7 Coat 4 — Havana Brown

Anchors: `#322b21` `#705c41` `#9d7246` `#979272`

| Token | Light | Dark |
|---|---|---|
| background | `#f7f5f3` | `#322b21` |
| card / popover | `#fdfcfc` | `#3d3529` |
| foreground / card-fg / popover-fg | `#322b21` | `#ccc3b8` |
| muted | `#979272` | `#473f33` |
| muted-foreground | `#2f2a23` | `#b4aa9c` |
| primary | `#906941` | `#b68c63` |
| primary-foreground | `#fdfcfc` | `#322b21` |
| secondary | `#705c41` | `#a89071` |
| secondary-foreground | `#fdfcfc` | `#322b21` |
| accent | `#b69677` | `#a7917b` |
| accent-foreground | `#322b21` | `#322b21` |
| border | `#e5e1dc` | `#5a4f3f` |
| input | `#9d8b72` | `#82735e` |
| ring | `#906941` | `#b68c63` |

### 8.8 Coat 5 — Bombay

Anchors: `#303032` `#262d33` `#66725c` `#9a875c`

| Token | Light | Dark |
|---|---|---|
| background | `#f3f4f6` | `#262d33` |
| card / popover | `#fcfcfd` | `#303032` |
| foreground / card-fg / popover-fg | `#262d33` | `#e3e5e8` |
| muted | `#e2e4e9` | `#32363e` |
| muted-foreground | `#5e6573` | `#999ea8` |
| primary | `#9a875c` | `#a39166` |
| primary-foreground | `#22201c` | `#262d33` |
| secondary | `#66725c` | `#88987c` |
| secondary-foreground | `#fcfcfd` | `#262d33` |
| accent | `#a79a7b` | `#9f947a` |
| accent-foreground | `#262d33` | `#262d33` |
| border | `#dddfe4` | `#3c4049` |
| input | `#828ca1` | `#6e7687` |
| ring | `#9c895e` | `#a39166` |

### 8.9 Usage rules

Most surfaces should remain neutral (`background`, `card`, `muted`, `border`). Brand colors (`primary`, `secondary`, `accent`) are used selectively for primary actions, selected states, highlights, and small accents — not to paint entire surfaces. Semantic colors must never be substituted with a coat color where meaning depends on being recognizably success/warning/destructive/info.

---

## 9. Dark Mode

Pawks supports both light and dark mode, for every coat.

Both modes of a given coat should feel like the **same coat, same product**, not a black inversion and not a different brand. Dark-mode values are derived from the same hue family as their light-mode counterpart — the anchors are kept where the luminance allows, and only lightened/darkened along the same hue when the mode genuinely requires it (e.g. a button fill needs to be lighter on a near-black canvas to stay legible).

Dark mode retains each coat's warmth and identity while preserving contrast and readability, per the AA-verified token tables in section 8.

---

## 10. Feed Design

The feed combines the density of Facebook with the spontaneity of BeReal.

The intended direction is:

- Information-rich enough for social interaction
- More intimate and spontaneous than traditional feeds
- Photography remains important
- UI remains clearly present
- Content should not be buried beneath decoration

### Feed cards

Use clearly separated cards.

Cards should have:

- Strong but restrained separation
- Clear content hierarchy
- Moderate corner radius
- Subtle borders and/or surface contrast
- Comfortable internal spacing

The feed background should be **slightly warm**, with neutral/white cards above it in light mode.

Conceptually:

```text
Warm neutral page background
        ↓
Neutral content card
        ↓
Pet identity
        ↓
Pet content
        ↓
Social actions
```

---

## 11. Photography

Pet photography is important but should coexist with the interface.

Target direction:

> Photography and UI have roughly equal visual presence.

Photography should feel natural and prominent without making the product look like a pure photo gallery.

Images should generally be given enough space to remain emotionally meaningful.

Avoid excessive UI overlays on top of photography.

---

## 12. Cards and Surfaces

Cards are a meaningful part of the visual language.

Default direction:

- Clearly identifiable cards
- Moderate rounding (`xl` — see §25.3)
- Subtle borders
- Minimal shadows (`shadow-sm`/`md` only, see §25.5)
- Good spacing
- Strong internal hierarchy

Do not make every container look like a floating card.

Use surfaces intentionally to communicate grouping and hierarchy.

---

## 13. Shape Language

The default shape language is **moderately rounded**. See §25.3 for the locked radius scale.

Avoid both extremes:

- Sharp enterprise UI
- Extremely rounded/capsule-heavy UI

Rounded corners should communicate friendliness without becoming decorative.

Radius is hierarchical — components do not all default to the same value:

```text
Small controls (checkbox, tag)  → sm  (4px)
Inputs / buttons                → md  (8px)
Popover / dropdown / small card → lg  (12px)
Card / dialog                   → xl  (16px)
Avatar / pill / badge           → full
```

---

## 14. Typography

Typeface: **Inter**.

Philosophy: Pawks types **compact, crisp, and information-dense** — not "comfortable large modern UI." Default UI text is 14px, not 15–17px; proportions sit closer to shadcn's than to a spacious editorial layout. Personality comes from the visual system (color, pet identity, photography), not from oversized type or oversized controls (see §25.4).

| Style | Size | Weight | Line height |
|---|---|---|---|
| Display | 28px | 700 | 1.15 |
| H1 | 24px | 700 | 1.2 |
| H2 | 20px | 650 | 1.25 |
| H3 | 16px | 600 | 1.3 |
| Body | 14px | 400 | 1.45 |
| Body Small | 13px | 400 | 1.4 |
| Label | 13px | 500 | 1.3 |
| Caption | 12px | 400 | 1.3 |

Weights in use: 400 (regular), 500 (medium), 600 (semibold), 650 (H2 only), 700 (bold, Display/H1 only). The 650 cut renders exactly only with Inter Variable loaded; a static-weights-only Inter (400/500/600/700) degrades gracefully to the browser's nearest match. Loading the actual Inter font files is the consuming application's responsibility either way — this package only names the family.

Display/H1/H2 use −0.01em to −0.02em letter-spacing (tapering — the largest style gets the most negative tracking); all other styles use normal tracking.

Typography should communicate modern, social, clear, familiar, functional. Avoid distinctive display fonts — brand personality should not depend on typography. Hierarchy should be clear enough that users can scan a feed quickly.

---

## 15. Iconography

Use **Lucide-style icons**, stroke width **1.75px**.

Size scale: 12, 14, 16, 18, 20, 24, 32 — with 16/20/24 doing most of the UI work. Icon size should generally follow the text/control size rather than being arbitrarily selected.

Outline by default → filled/emphasized when active (navigation, reactions, notifications, bookmarks, follows, profile actions).

Icons should support meaning, improve scanability, remain recognizable at small sizes, and not become decorative noise. Pet-specific species icons are an intentional exception to "no custom icons."

---

## 16. Reactions

Reactions are an important part of Pawks' personality.

The product should support pet-oriented reactions such as:

- Patita
- Premio
- Mimos
- Good boy
- Let's play

These are not simply renamed standard emoji reactions. They represent the vocabulary and culture of pet owners.

The reaction system should remain visually lightweight.

Example conceptual representation:

```text
🐾 124    🫶 86    🎁 31
```

Reactions should feel like native social interactions rather than decorative stickers.

### Reaction interaction

Default animation should be subtle:

- Small scale change
- Small state transition
- Immediate visual confirmation

Avoid large bursts or elaborate animations by default.

---

## 17. Motion

Motion philosophy: **subtle, fast and purposeful.**

| Token | Duration |
|---|---|
| instant | 0ms |
| fast | 100ms |
| base | 150ms |
| emphasis | 200ms |
| slow | 300ms (rare — page-level transitions only) |

Easing: `ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) for entrances, `ease-in-out` (cubic-bezier(0.4, 0, 0.2, 1)) for toggles/state changes.

Good uses: hover/focus transitions, press feedback, selected-state changes, small modal/popover transitions, reaction selection, navigation state changes.

Avoid: excessive bouncing, large particle effects, long transitions, animation on every interaction.

Motion should never obstruct the user's task. Respect `prefers-reduced-motion`.

---

## 18. Navigation

Primary navigation is conceptually:

```text
Home
Search
+
Activity
Profile
```

The `+` action is the primary creation entry point.

Pets should have a **dedicated navigation destination** because pets are first-class entities.

The exact placement and information architecture of the Pets destination will be refined during product-level navigation design.

Navigation should remain familiar to users of modern social networks.

---

## 19. Social Interaction Principles

Pawks should feel socially familiar.

Users should quickly understand:

- Who posted
- Which pet posted
- Who owns the pet
- When the content was posted
- How to react
- How to comment
- How to follow/interact
- How to discover pets

Use familiar interaction patterns wherever possible.

Novelty should primarily exist in the pet-specific semantics rather than basic interaction mechanics.

---

## 20. Accessibility

Accessibility is part of the foundation, not a later feature.

All components should consider:

- Keyboard navigation
- Focus visibility
- Screen readers
- Semantic HTML
- Color contrast
- Reduced motion
- Touch target sizing
- Disabled states
- Loading states
- Error states

Every coat's token pairs (§8.4–8.8) are WCAG AA verified: ≥4.5:1 for text/fill pairs, ≥3:1 for input/UI boundaries. Default control sizing (§25.4) prioritizes density over guaranteed touch-target compliance — use the `lg` size (40px) for primary mobile/touch actions, or ensure adequate surrounding tap-area spacing around a default-sized control, rather than assuming the default height alone satisfies the 44px minimum.

Radix UI should be used where it provides accessible behavioral primitives.

Do not visually customize components in ways that break their accessibility behavior.

---

## 21. Responsive Design

The design system should be responsive by default.

Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.

Prioritize:

1. Mobile
2. Tablet
3. Desktop

Pawks is a social product, so mobile interaction is particularly important.

Components should adapt to available space rather than simply shrinking.

Avoid unnecessary desktop-only interaction patterns.

---

## 22. States

Every interactive component should explicitly consider:

- Default
- Hover
- Focus
- Active/pressed
- Selected
- Disabled
- Loading
- Error
- Success where relevant
- Empty where relevant

States should use a combination of:

- Color
- Iconography
- Typography
- Shape
- Position
- Motion

Never rely exclusively on color to communicate state.

Reference treatment (see `Button`, §30): hover = ~7% lightness shift toward darker (light mode) / lighter (dark mode) on the same hue; focus = `ring` token as a 3px offset shadow; disabled = 40% opacity, not a separate color; an `outline`-appearance control's resting background is a neutral `input` tint (e.g. `bg-input/20`), never fully transparent — it should read as a raised control, not a hole in the page — with a full tone fill on hover.

---

## 23. Radix UI + Tailwind

The technical foundation uses:

- Radix UI for accessible behavioral primitives
- Tailwind CSS for styling
- TypeScript
- Atomic component architecture

The implementation should follow the philosophy of shadcn/ui:

> Components are owned and composed by the application rather than treated as an opaque external UI package.

Radix provides behavior and accessibility.

Tailwind provides styling and design-token application.

Pawks provides the visual and product-level design language.

---

## 24. Component API Philosophy

Component APIs should favor:

- Composition
- Explicit variants
- Predictable props
- Type safety
- Native HTML behavior where possible
- Radix conventions where applicable

Avoid overly abstract APIs that hide important behavior.

Prefer:

```tsx
<Button variant='primary' size='md'>
	Create post
</Button>
```

over APIs that require deeply nested configuration objects for simple components.

Product-level components can be more opinionated.

---

## 25. Design Tokens (locked)

### 25.1 Color

See §8 — five coats × light/dark, plus fixed semantic colors. All CSS custom properties (`--background`, `--primary`, etc.) are theme-scoped and swap per active coat + mode.

### 25.2 Spacing

Base unit 4px: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80`.

### 25.3 Radius

`sm 4px` · `md 8px` · `lg 12px` · `xl 16px` · `full 9999px`

### 25.4 Component sizing

Controls are compact by default — a control's size tracks its own content; it does not grow just because it shares the type scale with larger text (see §14).

Heights: `sm 32px` · `md 36px` · `lg 40px`. `md` is the default control height. This
shared 3-step scale is what Input/Select/NativeSelect follow; **Button has its own
4-tier scale** (below) sized for a denser range of UI chrome, from inline icon-buttons
up through primary actions.

Per-component convention (extend this pattern to future controls rather than inventing new ratios per component):

| Component | Font size | Height | Padding-x | Padding-y |
|---|---|---|---|---|
| Button — xs | 12px | 24px | 8px | — |
| Button — sm | 13px | 28px | 10px | — |
| Button — md (default) | 14px | 32px | 10px | — |
| Button — lg | 14px | 36px | 10px | — |
| Badge | 12px | 24px | 8px | — |
| Input | 14px | 36px | 10px | — |

Button has no `padding-y` at any size — its base layout is already `items-center`, so a
fixed height plus flex centering places content correctly without vertical padding.

`lg` (36px) is the Button size to reach for when touch-target size matters more than density (primary mobile actions). The default (`md`, 32px) does not by itself meet the 44px touch-target minimum — where tap accuracy matters, pair it with adequate surrounding tap-area spacing rather than inflating the control itself (see §20).

### 25.5 Borders & elevation

Border width: `1px` default (hairline), `1.5px` for emphasis/error states.

Shadows (used only for floating surfaces — popovers, menus, dialogs, tooltips; cards stay border-led):

| Token | Value | Use |
|---|---|---|
| shadow-sm | `0 1px 2px rgba(0,0,0,0.06)` | Tooltip |
| shadow-md | `0 4px 12px rgba(0,0,0,0.10)` | Popover / dropdown |
| shadow-lg | `0 12px 32px rgba(0,0,0,0.14)` | Dialog / sheet |

### 25.6 Iconography

Size scale: `12, 14, 16, 18, 20, 24, 32`. Stroke width `1.75px`.

### 25.7 Motion

See §17 — duration scale + easing curves.

### 25.8 Breakpoints

`sm 640px` · `md 768px` · `lg 1024px` · `xl 1280px`

### 25.9 Z-index

`base 0` · `dropdown 10` · `sticky 20` · `overlay 30` · `modal 40` · `popover 50` · `tooltip 60` · `toast 70`

---

## 26. Do / Don't

### Do

- Keep the UI modern
- Let pets be first-class identities
- Use warm neutrals
- Use subtle brand color
- Use photography prominently
- Use familiar social interaction patterns
- Use Lucide-style icons
- Keep motion subtle
- Build generic primitives
- Compose pet-aware molecules
- Make pet identity stronger than owner identity
- Preserve accessibility
- Support light and dark mode equally, for every coat
- Keep the semantic token contract identical across all 5 coats

### Don't

- Make everything cute
- Put paw prints everywhere
- Use childish typography
- Overuse orange/brown
- Over-round every component
- Animate every interaction
- Make pet decoration compete with pet content
- Duplicate generic primitives for pet-specific use without a semantic reason
- Make dark mode feel like a separate brand
- Sacrifice accessibility for visual customization
- Let a coat's brand colors leak into semantic (success/warning/destructive/info) meaning

---

## 27. Open Design Decisions

The following remain genuinely open — to be decided per-component as we build atoms:

- Exact reaction iconography (final icon choice per reaction type)
- Detailed pet species icon set (which species get dedicated icons vs. the generic fallback)
- Exact navigation destination order/placement for "Pets"
- Loading and skeleton treatment specifics
- Empty-state illustration style, if any
- Whether additional coats get added post-launch, and how the picker UI is exposed to users

Color, typography, spacing, radius, elevation, motion, iconography sizing, breakpoints, component heights, and semantic status colors are now locked (§8, §14–§17, §25) and should not be re-litigated per component.

---

## 28. Design Decision Process

Before designing each component:

1. Define its purpose.
2. Identify its anatomy.
3. Identify variants.
4. Identify interaction states.
5. Identify accessibility requirements.
6. Define responsive behavior.
7. Define visual hierarchy.
8. Determine whether it belongs to the generic UI layer or product/pet layer.
9. Define the component API.
10. Implement using the established tokens and primitives.

Do not introduce component-specific visual rules when an existing design token or system rule can solve the problem.

---

## 29. Design Foundations — status

All foundation categories are locked:

- ✅ Color (§8)
- ✅ Typography (§14)
- ✅ Spacing (§25.2)
- ✅ Shape / radius (§25.3)
- ✅ Elevation (§25.5)
- ✅ Iconography (§25.6)
- ✅ Motion (§25.7)
- ✅ Breakpoints, component heights, z-index (§25.4, §25.8, §25.9)

These foundations are the contract for every atom going forward.

---

## 30. Component Roadmap

**Atoms:**

```text
Button          ← in progress, spec sheet built (variants/sizes/states, Ragdoll coat)
Icon
IconButton
Avatar
Badge
Text
Heading
Label
Input
Textarea
Checkbox
Radio
Switch
Select
Separator
Spinner
Skeleton
Tooltip
Card
Link
```

Then pet-aware molecules:

```text
PetAvatar
PetIdentity
PetBadge
PetSelector
PetSwitcher
PetReaction
PetReactionPicker
PetMeta
```

Then social organisms:

```text
Post
Comment
CommentThread
FeedItem
PetProfileHeader
ActivityItem
Navigation
```

This roadmap can change as the product architecture evolves.

---

## 31. North Star

When making a design decision that is not explicitly covered by this document, ask:

> **Does this make Pawks feel like a polished modern social network for people who love their pets, or does it merely make the interface look "pet-themed"?**

Prefer the former.

The goal is not to make every pixel say **pet**.

The goal is to make users feel:

> **"These are people who understand how much I love my pet."**