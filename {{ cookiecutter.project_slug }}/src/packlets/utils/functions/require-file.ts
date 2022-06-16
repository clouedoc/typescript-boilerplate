import fs from 'fs';

/**
 * Make require work with the given extension (it will return a string)
 * @param extension extension INCLUDING dot (e.g. '.txt')
 */
export function enableFileRequirement(extension: string): void {
	if (!require.extensions[extension]) {
		require.extensions[extension] = function (
			module: NodeJS.Module,
			filename: string,
		) {
			module.exports = fs.readFileSync(filename, 'utf8');
		};
	}
}
