import fs from 'fs';
import path from 'path';

/**
 * Ensures that the specified directory exists.
 * If the directory does not exist, it creates it.
 * 
 * @param {string} dirPath - The path of the directory to check or create.
 */
export function ensureDirectoryExists(dirPath: string) {
    // Check if the directory exists
    if (!fs.existsSync(dirPath)) {
        // Create the directory if it doesn't exist
        fs.mkdirSync(dirPath);
    }
}

/**
 * Sanitizes a filename by replacing non-alphanumeric characters with underscores
 * and converting it to lowercase.
 * This helps ensure that the filename is safe to use across different file systems.
 * 
 * @param {string} filename - The original filename to sanitize.
 * @returns {string} - The sanitized filename.
 */
export function sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

/**
 * Creates a screenshot file path using the scenario name and the current date.
 * The format of the path is: `screenshots/screenshot-{scenarioName}-{currentDate}.png`.
 * 
 * @param {string} scenarioName - The name of the scenario, which will be part of the file name.
 * @returns {string} - The full file path for the screenshot.
 */
export function createScreenshotPath(scenarioName: string): string {
    // Get the current date in YYYYMMDD format
    const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
    // Create and return the full path for the screenshot
    return path.join('screenshots', `screenshot-${scenarioName}-${currentDate}.png`);
}
