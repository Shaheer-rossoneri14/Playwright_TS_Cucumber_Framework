import { Before, After, setWorldConstructor, Status, BeforeAll } from '@cucumber/cucumber';
import { Page, Browser, request, APIRequestContext } from '@playwright/test';
import BrowserUtils from '../../utils/browserUtils';
import PoManager from '../../pageObjects/poManager';
import * as dotenv from 'dotenv';
import ApiActionLib from '../../utils/apiActionsLib';
import { ensureDirectoryExists, sanitizeFilename, createScreenshotPath } from '../../utils/helperUtils';


// Load environment variables from .env file
dotenv.config();

// Set the default timeout for all hooks and steps
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000); // 60 seconds

// Define a World Constructor to hold the page, browser instances, and PoManager instance
export class CustomWorld {
    public page!: Page;
    public browser!: Browser;
    public poManager!: PoManager;
    public apiRequestContext!: APIRequestContext;
    public apiLib!: ApiActionLib; 
    public response: any;
    public responseData: any;
}

// Set the World Constructor
setWorldConstructor(CustomWorld);

// Initialize browser, page, and PoManager before each UI scenario
Before({ tags: '@ui' }, async function (this: CustomWorld) {
    const browserUtils = new BrowserUtils();
    this.browser = await browserUtils.launchBrowser();
    this.page = await this.browser.newPage();
    this.poManager = new PoManager(this.page);
});

// Initialize API request context and ApiActionLib before each API scenario
Before({ tags: '@api' }, async function (this: CustomWorld) {
    console.log('Initializing API context');
    const baseURL = process.env.BASE_URL_API;
    if (!baseURL) {
        throw new Error('BASE_URL environment variable is not set');
    }
    this.apiRequestContext = await request.newContext({ baseURL });
    this.apiLib = new ApiActionLib(this.apiRequestContext);
});

// Save screenshot if UI scenario failed, Close page and browser after each UI scenario
After({ tags: '@ui' }, async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const scenarioName = sanitizeFilename(scenario.pickle.name);
        const screenshotPath = createScreenshotPath(scenarioName);
        ensureDirectoryExists('screenshots');
        await this.page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved at: ${screenshotPath}`);
    }
    await this.page.close();
    await this.browser.close();
});

// Dispose API request context after each API scenario
After({ tags: '@api' }, async function (this: CustomWorld) {
    await this.apiRequestContext.dispose();
});
