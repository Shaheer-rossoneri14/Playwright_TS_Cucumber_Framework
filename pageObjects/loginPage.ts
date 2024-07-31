import { expect, type Locator, type Page } from '@playwright/test';
import UiActionsLib from '../utils/uiActionsLib';

/**
 * Represents the login page of the application.
 * Provides methods to interact with and validate the login page elements.
 */
export class LoginPage {
    // Page object model for Playwright
    page: Page;

    // Helper class for UI actions
    UIHelper: UiActionsLib;

    // Locators for page elements
    loginBtn: Locator;
    userName: Locator;
    password: Locator;
    loginFlashAlert: Locator;
    logoutFlashAlert: Locator;
    logoutBtn: Locator;

    /**
     * Constructs a new instance of the LoginPage class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page;
        this.UIHelper = new UiActionsLib(); // Initialize the UI action helper
        this.userName = page.locator("[id='username']"); // Locator for username input field
        this.password = page.locator("[id='password']"); // Locator for password input field
        this.loginBtn = page.locator("button:has-text('Login')"); // Locator for login button
        this.logoutBtn = page.locator("a:has-text('Logout')"); // Locator for logout button
        this.loginFlashAlert = page.locator("div[id='flash']"); // Locator for login flash alert message
        this.logoutFlashAlert = page.locator("div[id='flash']"); // Locator for logout flash alert message
    }

    /**
     * Navigates to the login page and waits for the username field to be visible.
     * 
     * @returns {Promise<void>} - A promise that resolves when the navigation and wait are complete.
     */
    async goTo() {
        await this.page.goto('https://the-internet.herokuapp.com/login'); // Navigate to the login page
        await this.page.waitForSelector("#username"); // Wait for the username field to be visible
    }

    /**
     * Performs a login action with the provided username and password.
     * 
     * @param username - The username to be entered.
     * @param userpassword - The password to be entered.
     * 
     * @returns {Promise<void>} - A promise that resolves when the login action is complete.
     */
    async validLogin(username: string, userpassword: string) {
        await this.UIHelper.enterTextIntoWebElement(this.userName, username); // Enter username
        await this.UIHelper.enterTextIntoWebElement(this.password, userpassword); // Enter password
        await this.UIHelper.singleClickOnWebElement(this.loginBtn); // Click the login button
    }

    /**
     * Verifies that the login flash alert message contains the expected text.
     * 
     * @param expectedMessage - The message expected to be contained in the flash alert.
     * 
     * @returns {Promise<void>} - A promise that resolves when the verification is complete.
     */
    async verifyLoginMessage(expectedMessage: string) {
        const loginMessage = await this.loginFlashAlert.textContent(); // Get the text content of the flash alert
        await expect(loginMessage).toContain(expectedMessage); // Verify that the flash alert contains the expected message
    }

    /**
 * Validates that the user is logged in by checking if the current URL ends with 'secure'.
 * 
 * @returns {Promise<void>} - A promise that resolves when the URL validation is complete.
 */
    async validateUserIsLoggedIn() {
        const currentUrl = this.page.url(); // Get the current URL
        await expect(currentUrl).toMatch(/secure$/); // Verify that the URL ends with 'secure'
    }

    /**
     * Validates that the user is logged out by checking the flash alert message and if the current URL ends with 'login'.
     * 
     * @param expectedMessage - The message expected to be contained in the flash alert.
     * 
     * @returns {Promise<void>} - A promise that resolves when the validation is complete.
     */
    async validateUserIsLoggedOut(expectedMessage: string) {
        const logoutMessage = await this.logoutFlashAlert.textContent(); // Get the text content of the flash alert
        await expect(logoutMessage).toContain(expectedMessage); // Verify that the flash alert contains the expected message
        const currentUrl = this.page.url(); // Get the current URL
        await expect(currentUrl).toMatch(/login$/); // Verify that the URL ends with 'login'
    }

    /**
     * Clicks the logout button.
     * 
     * @returns {Promise<void>} - A promise that resolves when the logout button is clicked.
     */
    async clickLogoutButton() {
        await this.UIHelper.singleClickOnWebElement(this.logoutBtn); // Click the logout button
    }

}
