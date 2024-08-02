import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { CheckBoxPage } from "./checkboxPage";

/**
 * Page Object Manager (PoManager) class.
 * Manages and provides access to different page objects in the application.
 */
class PoManager {
    // Page object model for Playwright
    page: Page;

    // Page object for the pages
    loginPage: LoginPage;
    checkboxPage: CheckBoxPage

    /**
     * Constructs a new instance of the PoManager class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page; // Assign the Page object
        this.loginPage = new LoginPage(this.page); // Initialize the LoginPage object
        this.checkboxPage = new CheckBoxPage(this.page); // Initialize the CheckBoxPage object
    }

    /**
     * Provides access to the LoginPage object.
     * 
     * @returns {LoginPage} - The LoginPage object associated with the current page.
     */
    getLoginPage() {
        return this.loginPage; // Return the LoginPage object
    }

    /**
     * Provides access to the CheckBoxPage object.
     * 
     * @returns {CheckBoxPage} - The CheckBoxPage object associated with the current page.
     */
    getCheckBoxPage() {
        return this.checkboxPage; // Return the checkboxPage object
    }

}

export default PoManager;
