# @pawks/components

## 0.2.0

### Minor Changes

- f863d83: Add `PawLoader` — a pet-aware loading indicator built on lucide's `paw-print`
  geometry. Each toe scale-pops in sequence down the arc, the pad lands last,
  then the paw rests briefly before looping (~1.2s cycle, DESIGN §17 easing).
  Same contract as `Spinner`: presence represents the loading state, sizing and
  color via `className`. Honors `prefers-reduced-motion` by rendering a static,
  fully opaque paw.

    **New required peer dependency: `motion` (^13.0.0).** Existing consumers must
    install it (`pnpm add motion`) even if they never import `PawLoader`, because
    the package's root barrel re-exports every component. Importing the subpath
    (`@pawks/components/button`) rather than the barrel avoids pulling it in at
    runtime, but the peer is still declared package-wide.
