# Pawks Design System

> **Status:** Initial design direction  
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

## 8. Color Philosophy

The UI should be **mostly neutral**, with subtle hints of Pawks brand colors.

The initial visual inspiration comes from a **calico cat palette**, but this should be treated as inspiration rather than a literal theme.

Potential conceptual influences:

- Warm cream
- Soft off-white
- Muted orange
- Warm brown
- Charcoal
- Soft natural neutrals

The palette should feel like:

> warm pet photography + modern social UI

rather than:

> an application covered in orange and paw prints.

### Color usage

Most surfaces should remain neutral.

Brand colors should be used selectively for:

- Primary actions
- Selected states
- Highlights
- Important interactive elements
- Small accents
- Brand moments

Semantic colors such as success, warning, destructive and informational states must remain clear and accessible.

Do not use brand colors where semantic meaning would be compromised.

---

## 9. Dark Mode

Pawks supports both light and dark mode.

Both modes should feel like the **same product and same visual identity**.

Dark mode should not simply be a black inversion of light mode.

The warm palette may influence dark mode through:

- Warm charcoal
- Deep brown/neutral surfaces
- Muted warm accents
- Cream/off-white text where appropriate

Dark mode should retain the warmth and personality of Pawks while preserving contrast and readability.

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
- Moderate rounding
- Subtle borders
- Minimal shadows
- Good spacing
- Strong internal hierarchy

Do not make every container look like a floating card.

Use surfaces intentionally to communicate grouping and hierarchy.

---

## 13. Shape Language

The default shape language is **moderately rounded**.

Avoid both extremes:

- Sharp enterprise UI
- Extremely rounded/capsule-heavy UI

Rounded corners should communicate friendliness without becoming decorative.

Radius should be hierarchical.

Different components should not automatically use the same radius.

For example:

```text
Small controls
  → smaller radius

Inputs / buttons
  → moderate radius

Cards / larger surfaces
  → somewhat larger radius

Pills
  → intentionally pill-shaped
```

Concrete radius tokens will be defined during the foundation phase.

---

## 14. Typography

Typography should be clean, neutral and highly readable.

Preferred direction:

> Inter / SF Pro / Geist-like neutral sans-serif

Typography should communicate:

- Modern
- Social
- Clear
- Familiar
- Functional

Avoid highly distinctive display fonts for the core interface.

Brand personality should not depend on typography.

Typography hierarchy should be clear enough that users can scan a feed quickly.

---

## 15. Iconography

Use **Lucide-style icons** as the primary icon language.

Characteristics:

- Outline-first
- Clean
- Consistent stroke weight
- Familiar
- Geometric but friendly

Selected/active states may use filled or visually stronger versions where appropriate.

### Icon principles

Icons should:

- Support meaning
- Improve scanability
- Remain recognizable at small sizes
- Not become decorative noise

Do not introduce custom illustrated icons when a clear Lucide-style semantic icon is sufficient.

Pet-specific species icons are an intentional exception.

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

Motion philosophy:

> **Subtle, fast and purposeful.**

Default interactions should use small transitions rather than theatrical animation.

Good uses:

- Hover/focus transitions
- Press feedback
- Selected state changes
- Small modal/popover transitions
- Reaction selection
- Navigation state changes

Avoid:

- Excessive bouncing
- Large particle effects
- Long transitions
- Animation on every interaction

Motion should never obstruct the user's task.

Respect `prefers-reduced-motion`.

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

Radix UI should be used where it provides accessible behavioral primitives.

Do not visually customize components in ways that break their accessibility behavior.

---

## 21. Responsive Design

The design system should be responsive by default.

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

## 25. Design Tokens

Concrete tokens will be defined separately during the design foundation phase.

Expected token categories include:

```text
Colors
Typography
Spacing
Radius
Borders
Shadows
Z-index
Motion
Icon sizes
Component heights
Breakpoints
```

Tokens should be semantic where possible.

Prefer:

```text
background
foreground
muted
primary
primary-foreground
border
destructive
```

over hardcoding component-specific colors.

The same semantic tokens should work in both light and dark modes.

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
- Support light and dark mode equally

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

---

## 27. Open Design Decisions

The following should intentionally remain open until the foundation phase:

- Exact color palette
- Exact semantic color tokens
- Exact typography family
- Typography scale
- Exact radius values
- Shadow/elevation scale
- Spacing scale
- Component heights
- Breakpoints
- Motion durations/easings
- Exact navigation layout
- Exact reaction iconography
- Detailed pet species icon strategy

These should be decided systematically rather than arbitrarily during individual component implementation.

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

## 29. Design Foundation Before Components

Before implementing the full atom set, establish:

### Color

- Brand palette
- Neutral palette
- Semantic palette
- Light mode
- Dark mode

### Typography

- Font family
- Font weights
- Font sizes
- Line heights
- Letter spacing

### Spacing

- Base unit
- Spacing scale
- Component spacing conventions

### Shape

- Radius scale
- Border widths

### Elevation

- Border strategy
- Shadow strategy
- Surface hierarchy

### Iconography

- Icon size scale
- Stroke conventions
- Alignment conventions

### Motion

- Duration scale
- Easing
- Reduced-motion behavior

These foundations become the contract for the atoms.

---

## 30. Initial Component Roadmap

After the foundations are established, design atoms first.

Suggested initial atoms:

```text
Button
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

Then move into pet-aware molecules:

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

> **Does this make Pawks feel like a polished modern social network for people who love their pets, or does it merely make the interface look “pet-themed”?**

Prefer the former.

The goal is not to make every pixel say **pet**.

The goal is to make users feel:

> **“These are people who understand how much I love my pet.”**
