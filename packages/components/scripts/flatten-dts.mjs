import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

import { listComponents } from './list-components.mjs'

const rootDir = join(import.meta.dirname, '..')
const srcDir = join(rootDir, 'src')
const distDir = join(rootDir, 'dist')

// tsc emits declarations mirroring src/ (dist/components/<name>/index.d.ts,
// which itself re-exports a sibling dist/components/<name>/<name>.d.ts).
// The package's flat wildcard export ("./*" -> "./dist/*.d.ts") expects a
// copy at dist/<name>.d.ts, matching tsup's flat JS entry output — its
// relative "./<name>.js" re-export then resolves against tsup's flat,
// fully-bundled dist/<name>.js (which really does export everything the
// nested version re-exports, since tsup inlines the whole module graph).
//
// The nested tree is intentionally left in place (not deleted): the root
// dist/index.d.ts generated from src/index.ts still imports through it
// (e.g. "./components/button/index.js"), and rewriting that barrel's
// import specifiers would require a real declaration bundler — which is
// exactly what's broken (see tsup.config.ts). A little redundant output
// in dist/ is the trade-off for both the barrel and the subpaths working.
for (const name of listComponents(srcDir)) {
	copyFileSync(join(distDir, 'components', name, 'index.d.ts'), join(distDir, `${name}.d.ts`))
}
