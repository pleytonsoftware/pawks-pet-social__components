import type { StorybookConfig } from '@storybook/react-vite'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * Resolves the absolute path of a package — needed in monorepos where
 * Storybook's addons must be resolved relative to this config file rather
 * than the process cwd.
 */
function getAbsolutePath(value: string) {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
	framework: getAbsolutePath('@storybook/react-vite'),
}

export default config
