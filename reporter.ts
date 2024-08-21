import { generate } from 'multiple-cucumber-html-reporter';

generate({
    jsonDir: 'reports/',
    reportPath: 'reports',
    reportName: 'Cucumber-Playwright report',
    pageTitle: "Internet Heroku Page Test Report",
    displayDuration: true,
    metadata: {
        browser: {
            name: 'Browser Name',
            version: 'Version Number',
        },
        device: 'Device Name',
        platform: {
            name: 'Platform Name',
            version: 'Version Number',
        },
    },
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: 'Your Project Name' },
            { label: 'Release', value: 'Release Number' },
            { label: 'Cycle', value: 'Test Cycle Number' },
            { label: 'Execution End Time', value: new Date().toTimeString() },
        ],
    },
});