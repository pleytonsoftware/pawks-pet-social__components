/** @type {import("prettier").Config} */
export default {
	trailingComma: 'all',
	tabWidth: 4,
	semi: false,
	useTabs: true,
	singleQuote: true,
	bracketSpacing: true,
	printWidth: 150,
	plugins: ['prettier-plugin-tailwindcss', '@serverless-guru/prettier-plugin-import-order'],
	importOrderSeparation: true,
	importOrderParserPlugins: ['typescript', 'jsx'],
	importOrderTypeImportsToTop: true,
	importOrderMergeDuplicateImports: true,
	importOrderNamespaceImportsToGroupTop: true,
	jsxSingleQuote: true,
	tailwindFunctions: ['clsx', 'twMerge', 'cn'],
	importOrder: ['^(react|next($|/.*))$', '^[a-zA-Z].*$', '^@[^/]+', '^~', '^#', '^[./]'],
}
