import { expect, type Locator, type Page } from '@playwright/test';
import UiActionsLib from '../utils/uiActionsLib';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Represents the dropdown page of the application.
 * Provides methods to interact with and validate the dropdown page elements.
 */
export class DropDownPage {
    // Page object model for Playwright
    page: Page;

    // Helper class for UI actions
    UIHelper: UiActionsLib;

    // Locators for page elements
    dropdown: Locator;
    
    /**
     * Constructs a new instance of the DropDownPage class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page;
        this.UIHelper = new UiActionsLib(); // Initialize the UI action helper
        this.dropdown = page.locator("#dropdown"); // Locator for dropdown
    }

    /**
     * Navigates to the dropdown page and waits for the heading field to be visible.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation and wait are complete.
     */
    async goTo() {
        const baseUrl = process.env.BASE_URL_UI;
        await this.page.goto(`${baseUrl}/dropdown`);
        await this.page.waitForSelector("//h3[text() = 'Dropdown List']"); // Wait for the heading to be visible
    }

    /**
     * Performs actions and validations on the dropdown
     * 
     * @returns {Promise<void>} - A promise that resolves when the action and validation are complete.
     */
    async actionsAndValidationsOnDropdown() {
        // 1. Select the option by value
        await this.UIHelper.selectDropDownByValue(this.dropdown, '1');
        await this.validateSelection('1');

        // 2. Select the option by label
        await this.UIHelper.selectDropDownByLabel(this.dropdown, 'Option 2');
        await this.validateSelection('2');

        // 3. Select the option by index (assuming index 1 for demonstration)
        await this.UIHelper.selectDropDownByIndex(this.dropdown, 1);
        await this.validateSelection('1'); 
    }

    /**
     * Validates the selected option in the dropdown.
     * 
     * @param expectedValue - The expected value of the selected option.
     * @param expectedText - The expected visible text of the selected option.
     */
    private async validateSelection(expectedValue: string) {
        // Get the selected value
        const selectedValue = await this.dropdown.inputValue();
        expect(selectedValue).toBe(expectedValue);
    }
}
