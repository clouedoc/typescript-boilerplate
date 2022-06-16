// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

var isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
	root: true,
	extends: [
		'@rushstack/eslint-config/profile/node',
		'@rushstack/eslint-config/mixins/friendly-locals',
		'@rushstack/eslint-config/mixins/packlets',
	], // <---- put your profile string here
	parser: '@typescript-eslint/parser',
	parserOptions: { tsconfigRootDir: __dirname, project: './tsconfig.json' },
	env: {
		es6: true,
	},
	ignorePatterns: [],
	rules: {
		// This rule reduces performance by 84%, so only enabled during CI.
		'@typescript-eslint/no-floating-promises': isDev ? 'off' : 'error',
		'@typescript-eslint/no-invalid-this': 'error',
		'no-console': 'warn',
	},
	overrides: [
		{
			files: ['src/packlets/scripts/*', '*.spec.ts'],
			rules: {
				'@rushstack/packlets/mechanics': 0,
			},
		},
		{
			files: ['**/schemas/*.ts'],
			rules: {
				'@typescript-eslint/typedef': 0,
			},
		},
		{
			files: ['src/commands/**'],
			rules: {
				'@typescript-eslint/typedef': 0,
				'@typescript-eslint/explicit-member-accessibility': 0,
			},
		},
	],
};

module.exports = config;
