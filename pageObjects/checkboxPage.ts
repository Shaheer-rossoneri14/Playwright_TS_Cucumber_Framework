import { expect, type Locator, type Page } from '@playwright/test';
import UiActionsLib from '../utils/uiActionsLib';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Represents the checkbox page of the application.
 * Provides methods to interact with and validate the checkbox page elements.
 */
export class CheckBoxPage {
    // Page object model for Playwright
    page: Page;

    // Helper class for UI actions
    UIHelper: UiActionsLib;

    // Locators for page elements
    checkboxOne: Locator;
    checkboxTwo: Locator;

    /**
     * Constructs a new instance of the CheckBoxPage class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page;
        this.UIHelper = new UiActionsLib(); // Initialize the UI action helper
        this.checkboxOne = page.locator("//*[@id='checkboxes']/input[1]"); // Locator for checkbox 1
        this.checkboxTwo = page.locator("//*[@id='checkboxes']/input[2]"); // Locator for checkbox 2

    }

    /**
     * Navigates to the checkbox page and waits for the heading field to be visible.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation and wait are complete.
     */
    async goTo() {
        const baseUrl = process.env.BASE_URL_UI;
        await this.page.goto(`${baseUrl}/checkboxes`);
        await this.page.waitForSelector("//h3[text() = 'Checkboxes']"); // Wait for the heading to be visible
    }

    /**
     * Performs a actions and validations on the checkboxes
     * 
     * @returns {Promise<void>} - A promise that resolves when the action and validation are complete.
     */
    async actionsAndValidationsOnCheckboxes() {
        // Verify if the first checkbox is checked, if not, check it.
        await this.UIHelper.checkUncheckCheckBox(this.checkboxOne, true)

        // Verify if the second checkbox is checked, if yes, uncheck it.
        await this.UIHelper.checkUncheckCheckBox(this.checkboxTwo, false)

        // Validate that the first checkbox is checked
        expect(await this.checkboxOne.isChecked()).toBeTruthy();

        // Validate that the second checkbox is unchecked
        expect(await this.checkboxTwo.isChecked()).toBeFalsy();
    }
}

