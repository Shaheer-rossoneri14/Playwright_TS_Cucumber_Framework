import { chromium, firefox, webkit, LaunchOptions, Browser } from '@playwright/test';
import BrowserConstants from '../constants/BrowserConstants';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const browserConstants = new BrowserConstants();

/** slowMo: Adds a specified delay(in milliseconds) after each browser action. */
const browserOptions: LaunchOptions = {
    slowMo: 50,
    args: ['--start-maximized', '--disable-extensions', '--disable-plugins'],
    headless: false
};

/**
 * Utility class for browser-related operations using Playwright.
 */
class BrowserUtils {

    /**
     * Launch a browser based on the BROWSER environment variable.
     * 
     * @returns A Promise that resolves to the launched Browser instance.
     */
    async launchBrowser(): Promise<Browser> {
        const browserType = process.env.BROWSER || "chromium";
        console.log(`Launching browser: ${browserType}`);
        let browser: Browser;

        // Launch the appropriate browser based on the environment variable
        if (browserType === browserConstants.getFirefox()) {
            browser = await firefox.launch(browserOptions);
        } else if (browserType === browserConstants.getWebkit()) {
            browser = await webkit.launch(browserOptions);
        } else {
            browser = await chromium.launch(browserOptions);
        }

        return browser;
    }
}

export default BrowserUtils;
