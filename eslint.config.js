export default [
    {
        // We can set the globally here as the first object, or inside some object with specific rules
        ignores: ['**/node_modules', '**/build', '**/bin', '**/dist'],
    },
    {
        // Instead of cli command --ext, not we specify which files to scan with this "files" property
        // The reason we use this pattern with "**" is because of a library called minimatch that is used for this "glob pattern style"
        files: ['**/*.js', '**/*.tsx'],
        rules: {
            semi: 'error',
            'prefer-const': 'error',
            camelcase: 'error',
        },
    },

    // Here we specify another set of rules for typescript files only
    {
        files: ['**/*.ts'],
        rules: {
            semi: 'never',
            'prefer-const': 'warn',
        },
    },
];
