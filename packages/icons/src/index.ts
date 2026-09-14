export * from 'lucide-react'
export * from './icons/index.js'

// Explicit named re-export of lucide-react's own icon registry — `export *`
// alone doesn't reliably survive Rollup's production tree-shaking through
// two layers of barrel re-export for an object this large (confirmed: works
// in dev, breaks specific entries in a production Storybook/Vite build).
export { icons as lucideIcons } from 'lucide-react'
