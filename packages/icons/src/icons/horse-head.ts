import { createLucideIcon } from 'lucide-react'

import { horseHead } from '@lucide/lab'

/**
 * @lucide/lab icon, wrapped the exact same way as a hand-authored custom
 * icon (see ./template.ts) — @lucide/lab ships icons as the same
 * LucideIconNode[] shape lucide-react's own icons use internally, it just
 * doesn't publish them as ready-made components. Add more lab icons the
 * same way, one file each, as they're actually needed. Most pet species
 * (cat, dog, rabbit, bird, fish, turtle) already exist as real
 * lucide-react components — no wrapping needed for those, see
 * DESIGN.md §27. Horse specifically only exists in @lucide/lab.
 */
export const HorseHead = createLucideIcon('horse-head', horseHead)
