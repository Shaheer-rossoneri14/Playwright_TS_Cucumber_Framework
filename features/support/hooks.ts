import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { Page, Browser } from '@playwright/test';
import BrowserUtils from '../../utils/browserUtils'; // Adjust path as necessary
import PoManager from '../../pageObjects/poManager';

// Set the default timeout for all hooks and steps
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000); // 60 seconds

// Define a World Constructor to hold the page, browser instances, and PoManager instance
export class CustomWorld {
    public page!: Page;
    public browser!: Browser;
    public poManager!: PoManager; 
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

// Close page and browser after each scenario
After(async function (this: CustomWorld) {
    await this.page.close();
    await this.browser.close();
});
