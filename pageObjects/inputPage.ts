import { expect, type Locator, type Page } from '@playwright/test';
import UiActionsLib from '../utils/uiActionsLib';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Represents the input page of the application.
 * Provides methods to interact with and validate the input page elements.
 */
export class InputPage {
    // Page object model for Playwright
    page: Page;

    // Helper class for UI actions
    UIHelper: UiActionsLib;

    // Locators for page elements
    inputbox: Locator;
    
    /**
     * Constructs a new instance of the InputPage class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page;
        this.UIHelper = new UiActionsLib(); // Initialize the UI action helper
        this.inputbox = page.locator("//input[@type='number']"); // Locator for input box
    }

    /**
     * Navigates to the input page and waits for the heading field to be visible.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation and wait are complete.
     */
    async goTo() {
        const baseUrl = process.env.BASE_URL_UI;
        await this.page.goto(`${baseUrl}/inputs`);
        await this.page.waitForSelector("//h3[text() = 'Inputs']"); // Wait for the heading to be visible
    }

    /**
     * Performs actions and validations on the input box
     * 
     * @returns {Promise<void>} - A promise that resolves when the action and validation are complete.
     */
    async actionsAndValidationsOnInputBox(data: string) {
        // Method 1 to fill data into input box
        await this.UIHelper.enterTextIntoWebElement(this.inputbox, data);
        
        // Get all text from the input box
        const valueEntered1 = await this.UIHelper.getAllTextOfInputElement(this.inputbox);
        console.log(valueEntered1);

        //Validate data entered is same as expected data
        await expect(valueEntered1).toBe(data);
        
        // Clear the input box
        await this.inputbox.fill(''); 

        // Method 2 to fill data into input box
        await this.UIHelper.enterSequentiallyTextIntoWebElement(this.inputbox, data);
        
        // Get all text from the input box
        const valueEntered2 = await this.UIHelper.getAllTextOfInputElement(this.inputbox);
        console.log(valueEntered2);

        //Validate data entered is same as expected data
        await expect(valueEntered2).toBe(data);

        
    }
}
