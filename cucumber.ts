/**
 * Common Cucumber options used across different configurations.
 */
const commonOptions = `
    --require features/support/hooks.ts
    --require features/step_definitions/**/*.steps.ts
`;

/**
 * Export Cucumber configurations.
 */
module.exports = {
    /**
     * Default configuration that includes common options and all feature files.
     */
    default: `${commonOptions} features/**/*.feature`,
};
