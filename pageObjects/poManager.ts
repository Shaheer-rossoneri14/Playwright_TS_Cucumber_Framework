import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";

/**
 * Page Object Manager (PoManager) class.
 * Manages and provides access to different page objects in the application.
 */
class PoManager {
    // Page object model for Playwright
    page: Page;

    // Page object for the login page
    loginPage: LoginPage;

    /**
     * Constructs a new instance of the PoManager class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page; // Assign the Page object
        this.loginPage = new LoginPage(this.page); // Initialize the LoginPage object
    }

    /**
     * Provides access to the LoginPage object.
     * 
     * @returns {LoginPage} - The LoginPage object associated with the current page.
     */
    getLoginPage() {
        return this.loginPage; // Return the LoginPage object
    }
}

export default PoManager;
