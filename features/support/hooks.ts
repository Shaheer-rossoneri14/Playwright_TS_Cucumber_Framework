import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, chromium } from '@playwright/test';
import PoManager from '../../pageObjects/poManager';

// Define a World Constructor to hold the page, browser instances, and PoManager instance
export class CustomWorld {
    public page!: Page;
    public browser!: Browser;
    public poManager!: PoManager; 
}

// Set the World Constructor
setWorldConstructor(CustomWorld);

// Initialize browser, page and PoManager before each scenario
Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
    this.poManager = new PoManager(this.page);
});

// Close page and browser after each scenario
After(async function (this: CustomWorld) {
    await this.page.close();
    await this.browser.close();
});
