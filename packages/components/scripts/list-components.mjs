import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export function listComponents(srcDir) {
	return readdirSync(join(srcDir, 'components'), { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name)
		.sort()
}
