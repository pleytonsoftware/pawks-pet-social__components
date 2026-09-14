import { defineConfig } from 'tsup'

export default defineConfig({
	entry: { index: 'src/index.ts' },
	format: ['esm', 'cjs'],
	// See packages/components/tsup.config.ts — declarations are generated
	// separately via `tsc --emitDeclarationOnly`; tsup's built-in `dts`
	// option (rollup-plugin-dts) crashes under this repo's TypeScript 7 pin.
	dts: false,
	sourcemap: true,
	clean: true,
	splitting: false,
	minify: false,
	external: ['react'],
})
