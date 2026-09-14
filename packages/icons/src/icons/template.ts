import { createLucideIcon } from 'lucide-react'

/**
 * Template/model for hand-authored custom icons (DESIGN.md §15's "species
 * icon" exception to "no custom icons"). To add a new one: copy this file,
 * rename the icon and its node data, add the export to ./index.ts. The
 * surrounding <svg> wrapper (24x24 viewBox, stroke-based, currentColor,
 * round line caps/joins) is applied automatically by createLucideIcon —
 * every real lucide-react icon gets the same wrapper, so a hand-authored
 * icon following this pattern renders and resizes identically to one of
 * theirs. Only the inner shape nodes need describing here.
 */
export const PawksIconTemplate = createLucideIcon('pawks-icon-template', [['circle', { cx: '12', cy: '12', r: '10' }]])
