import { Before, After, setWorldConstructor, Status } from '@cucumber/cucumber';
import { Page, Browser } from '@playwright/test';
import BrowserUtils from '../../utils/browserUtils'; // Adjust path as necessary
import PoManager from '../../pageObjects/poManager';
import path from 'path';
import fs from 'fs';

// Set the default timeout for all hooks and steps
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000); // 60 seconds

// Define a World Constructor to hold the page, browser instances, and PoManager instance
export class CustomWorld {
    public page!: Page;
    public browser!: Browser;
    public poManager!: PoManager; 
    static result: any;
}

// Set the World Constructor
setWorldConstructor(CustomWorld);

// Initialize browser, page, and PoManager before each scenario
Before(async function (this: CustomWorld) {
    const browserUtils = new BrowserUtils();
    this.browser = await browserUtils.launchBrowser();
    this.page = await this.browser.newPage();
    this.poManager = new PoManager(this.page);
});

// Save screenshot if scenario failed, Close page and browser after each scenario
After(async function (this: CustomWorld, scenario) {
    // Check if the scenario has failed
    if (scenario.result?.status === Status.FAILED) {
        // Create a unique file name for the screenshot
        const screenshotPath = path.join('screenshots', `screenshot-${Date.now()}.png`);
        // Ensure the screenshots directory exists
        if (!fs.existsSync('screenshots')) {
            fs.mkdirSync('screenshots');
        }
        // Capture and save the screenshot
        await this.page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved at: ${screenshotPath}`);
    }

    // Close the page and browser
    await this.page.close();
    await this.browser.close();
});
