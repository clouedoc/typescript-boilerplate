/**
 * Parse normal files.
 */
module.exports = {
	process(src) {
		return { code: `module.exports = \`${src}\`;` };
	},
};
