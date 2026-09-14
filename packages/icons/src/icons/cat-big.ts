import { createLucideIcon } from 'lucide-react'

import { catBig } from '@lucide/lab'

/**
 * Example @lucide/lab icon, wrapped the exact same way as a hand-authored
 * custom icon (see ./template.ts) — @lucide/lab ships icons as the same
 * LucideIconNode[] shape lucide-react's own icons use internally, it just
 * doesn't publish them as ready-made components. Add more lab icons the
 * same way, one file each, as they're actually needed.
 */
export const CatBig = createLucideIcon('cat-big', catBig)
