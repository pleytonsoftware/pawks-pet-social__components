import { defineConfig } from 'tsup'

import { listComponents } from './scripts/list-components.mjs'

const componentEntries = Object.fromEntries(
	listComponents(new URL('./src', import.meta.url).pathname).map((name: string) => [name, `src/components/${name}/index.ts`]),
)

export default defineConfig({
	entry: { index: 'src/index.ts', ...componentEntries },
	format: ['esm', 'cjs'],
	// Declarations are generated separately via `tsc --emitDeclarationOnly` +
	// scripts/flatten-dts.mjs — tsup's built-in `dts` option (rollup-plugin-dts)
	// crashes at module-load time under this repo's TypeScript 7 pin.
	dts: false,
	sourcemap: true,
	clean: true,
	splitting: false,
	minify: false,
	external: ['react', 'react-dom'],
})
