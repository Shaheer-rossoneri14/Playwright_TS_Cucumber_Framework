import { expect, type Locator, type Page } from '@playwright/test';
import UiActionsLib from '../utils/uiActionsLib';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Represents the js-alert page of the application.
 * Provides methods to interact with js-alerts elements.
 */
export class JsAlertsPage {
    // Page object model for Playwright
    page: Page;

    // Helper class for UI actions
    UIHelper: UiActionsLib;

    // Locators for page elements
    jsAlertBtn: Locator;
    jsConfirmBtn: Locator;
    jsPromptBtn: Locator;

    /**
     * Constructs a new instance of the JsAlertsPage class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page;
        this.UIHelper = new UiActionsLib(); // Initialize the UI action helper
        this.jsAlertBtn = page.locator("button:has-text('Click for JS Alert')"); 
        this.jsConfirmBtn = page.locator("button:has-text('Click for JS Confirm')");
        this.jsPromptBtn = page.locator("button:has-text('Click for JS Prompt')");
    }

    /**
     * Navigates to the js-alert page and waits for the page to be ready.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation and wait are complete.
     */
    async goTo() {
        const baseUrl = process.env.BASE_URL_UI;
        await this.page.goto(`${baseUrl}/javascript_alerts`);
    }

    /**
     * Clicks the js-alert button and handles the alert.
     * 
     * @param action - The action to perform on the alert ('accept' or 'dismiss').
     * @param text - The text to send in response to the prompt. Defaults to an empty string if not provided.
     * @returns {Promise<void>} - A promise that resolves when the alert handling is complete.
     */
    async clickOnJsAlertAndHandle(action: string, text: string = ''): Promise<void> {
        await this.UIHelper.handleAlert(this.page, action, text); // Handle the alert
        await this.UIHelper.singleClickOnWebElement(this.jsAlertBtn); // Click the JsAlert button
    }

    /**
     * Clicks the js-confirm button and handles the alert.
     * 
     * @param action - The action to perform on the alert ('accept' or 'dismiss').
     * @returns {Promise<void>} - A promise that resolves when the alert handling is complete.
     */
    async clickOnJsConfirmAndHandle(action: string, text: string): Promise<void> {
        await this.UIHelper.handleAlert(this.page, action, text); // Handle the alert
        await this.UIHelper.singleClickOnWebElement(this.jsConfirmBtn); // Click the JsConfirm button        
    }

    /**
     * Clicks the js-prompt button and handles the alert.
     * 
     * @param action - The action to perform on the alert ('accept' or 'dismiss').
     * @param text - The text to send in response to the prompt. Defaults to an empty string if not provided.
     * @returns {Promise<void>} - A promise that resolves when the alert handling is complete.
     */
    async clickOnJsPromptAndHandle(action: string, text: string): Promise<void> {
        await this.UIHelper.handleAlert(this.page, action, text); // Handle the alert
        await this.UIHelper.singleClickOnWebElement(this.jsPromptBtn); // Click the JsPrompt button
    }

    /**
     * Get the result text displayed on the page after handling the alert.
     * 
     * @returns {Promise<string>} - The result text displayed on the page.
     */
    async getResultText(): Promise<string> {
        const result = await this.page.textContent('#result');
        return result ? result.trim() : ''; // Return an empty string if result is null
    }
}
