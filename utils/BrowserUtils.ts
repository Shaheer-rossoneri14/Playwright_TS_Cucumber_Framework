import { chromium, firefox, webkit, LaunchOptions, Browser, BrowserType } from '@playwright/test';
import BrowserConstants from '../constants/BrowserConstants';

const browserConstants = new BrowserConstants();

const browserOptions: LaunchOptions = {
    slowMo: 50,
    args: ['--start-maximized', '--disable-extensions', '--disable-plugins'],
    headless: false
};

class BrowserUtils {
    async launchBrowser(): Promise<Browser> {
        const browserType = process.env.BROWSER;
        let browser: Browser;
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
