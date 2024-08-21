require('dotenv').config();

module.exports = {
    default: {
        paths: ['./features/**/*.feature'],  // Path to feature files
        require: [
            './features/support/hooks.ts',  // Path to hooks
            './features/step_definitions/**/*.ts'  // Path to step definitions
        ],
        format: [
            'html:reports/cucumber-report.html',
            'json:reports/cucumber_report.json',
        ],
        tags: '@api or @ui',
        defaultTimeout: 60 * 1000,  // 60 seconds
        parallel: 2,  // Run 2 scenarios in parallel
        requireModule: ['ts-node/register'],  // Ensure TypeScript support
    }
};