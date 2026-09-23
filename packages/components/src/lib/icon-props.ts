/**
 * Default props for `@pawks/icons` icons used as fixed internal chrome
 * (chevrons, check, X, minus) — never swapped by the consumer, unlike
 * `Button`'s own `icon` prop. Locks stroke width to 1.75px per DESIGN
 * §15/§25.6 (lucide's own default is 2px) and hides them from assistive
 * tech, since the parent control owns the actual semantics.
 */
export const CHROME_ICON_PROPS = { 'aria-hidden': true, strokeWidth: 1.75 } as const
