// eslint-plugin-import-x is a flat-config-first fork of eslint-plugin-import
// (the original reads a `context.parserOptions` property that ESLint 10 has
// removed entirely, and crashes on load). Registered under the "import" key
// so every "import/*" rule name below keeps working unchanged.
import importXPlugin from 'eslint-plugin-import-x'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { config as reactInternalConfig } from './react-internal.js'

/**
 * Shared ESLint configuration for publishable/internal component libraries.
 * Layers TypeScript-aware linting, import hygiene, and Prettier-as-lint-rule
 * on top of the base react-internal preset (which already wires in
 * turbo/no-undeclared-env-vars + eslint-plugin-only-warn + eslint-config-prettier).
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	...reactInternalConfig,
	...tseslint.configs.recommended,
	{
		settings: {
			// eslint-plugin-import-x hardcodes its own settings namespace
			// ("import-x/resolver") regardless of the key it's registered under.
			'import-x/resolver': {
				typescript: true,
			},
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			import: importXPlugin,
			react: reactPlugin,
			prettier: prettierPlugin,
			'unused-imports': unusedImports,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'warn',
			'no-console': 'off',
			'no-restricted-syntax': [
				'error',
				{
					selector: "CallExpression[callee.object.name='console']",
					message: "Do not use console.*. Import and use '@lib/logger' instead.",
				},
				{
					selector: 'ImportDeclaration[source.value=/^@\\/components\\/atoms/]',
					message: "Use '@atoms/...' instead of '@/components/atoms/...'",
				},
			],
			'no-debugger': 'error',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'react-hooks/exhaustive-deps': 'off',
			'import/order': 'off',
			'import/first': 'off',
			'import/newline-after-import': 'off',
			'no-shadow': 'off',

			// Exports
			'import/no-default-export': 'error',

			// Imports
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

			// Cleanse
			'unused-imports/no-unused-imports': 'error',
			// Architecture
			'import/no-cycle': 'error',
			'import/no-unresolved': 'error',

			// Avoid long routes. One level up ("../sibling/sibling.js") is allowed
			// deliberately — a flat `components/<name>/<name>.tsx` layout needs it
			// for atoms composing sibling atoms (e.g. Button using Icon), which
			// DESIGN.md's own composition-over-duplication philosophy expects.
			'no-restricted-imports': ['error', { patterns: ['../../*', '../../../*', '../../../../*'] }],
		},
	},
	{
		files: [
			'src/app/**/page.tsx',
			'src/app/**/layout.tsx',
			'src/app/**/loading.tsx',
			'src/app/**/error.tsx',
			'src/app/**/forbidden.tsx',
			'src/app/**/not-found.tsx',
			'*.config.ts',
			'src/proxy.ts',
			'src/i18n/request.ts',
			'src/emails/*.tsx',
			'**/*.stories.tsx',
			'.storybook/**/*.{ts,tsx}',
		],
		rules: {
			'import/no-default-export': 'off',
		},
	},
	{
		// e2e/ has no path aliases (it isn't part of the src/ architecture the
		// route-length rule targets), so relative imports are the norm here.
		files: ['e2e/**/*.{ts,tsx}'],
		rules: {
			'no-restricted-imports': 'off',
		},
	},
]
