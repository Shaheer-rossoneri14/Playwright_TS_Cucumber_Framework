import { readFileSync } from 'fs';
import { extname } from 'path';
import { generate } from 'multiple-cucumber-html-reporter';

async function attachFile(filePath: string, attachmentName: string): Promise<void> {
    const fileContent = readFileSync(filePath);
    const mimeType = getFileMimeType(filePath);
    const attachment = { data: fileContent, media: { mimeType, name: attachmentName } };
    this.attach(attachment);
}

function getFileMimeType(filePath: string): string {
    const ext = extname(filePath).toLowerCase();
    switch (ext) {
        case '.txt':
            return 'text/plain';
        case '.pdf':
            return 'application/pdf';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.json':
            return 'application/json';
        default:
            return 'application/octet-stream';
    }
}

generate({
    jsonDir: 'reports/',
    reportPath: 'reports',
    reportName: 'Cucumber-Playwright report',
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
