import { CatBig } from './cat-big.js'
import { PawksIconTemplate } from './template.js'

export { PawksIconTemplate } from './template.js'
export { CatBig } from './cat-big.js'

/**
 * Enumerable registry of every Pawks-authored icon (custom + wrapped
 * @lucide/lab), mirroring lucide-react's own `icons` registry shape —
 * lets consumers (e.g. a Storybook gallery) list the whole set without
 * hand-maintaining a separate list elsewhere. Add new icons here (and as
 * a named export above) in the same place they're created.
 */
export const pawksIcons = {
	PawksIconTemplate,
	CatBig,
} as const
