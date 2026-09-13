import storybook from 'eslint-plugin-storybook'

import { config } from '@config/eslint-config/library'

/** @type {import("eslint").Linter.Config[]} */
export default [...config, ...storybook.configs['flat/recommended']]
