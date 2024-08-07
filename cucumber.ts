import defineConfig from '@cucumber/cucumber';

export default defineConfig({
    // Define the feature files and step definitions location
    features: ['./features/**/*.feature'],
    stepDefinitions: ['./features/step_definitions/**/*.ts'],

    // Define the output formats for the reports
    format: [
        'html:reports/cucumber-report.html',
        'json:reports/cucumber_report.json',
    ],
    // Configure other settings if needed
});