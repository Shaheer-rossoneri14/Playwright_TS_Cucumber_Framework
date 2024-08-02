import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { CheckBoxPage } from "./checkboxPage";
import { DropDownPage } from "./dropdownPage";
import { InputPage } from "./inputPage";

/**
 * Page Object Manager (PoManager) class.
 * Manages and provides access to different page objects in the application.
 */
class PoManager {
    // Page object model for Playwright
    page: Page;

    // Page object for the pages
    loginPage: LoginPage;
    checkboxPage: CheckBoxPage;
    dropdownPage: DropDownPage;
    inputPage: InputPage;

    /**
     * Constructs a new instance of the PoManager class.
     * 
     * @param page - The Playwright Page object representing the current page.
     */
    constructor(page: Page) {
        this.page = page; // Assign the Page object
        this.loginPage = new LoginPage(this.page); // Initialize the LoginPage object
        this.checkboxPage = new CheckBoxPage(this.page); // Initialize the CheckBoxPage object
        this.dropdownPage = new DropDownPage(this.page); // Initialize the DropDownPage object
        this.inputPage = new InputPage(this.page); // Initialize the InputPage object
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

    /**
     * Provides access to the DropDownPage object.
     * 
     * @returns {DropDownPage} - The DropDownPage object associated with the current page.
     */
    getDropDownPage() {
        return this.dropdownPage; // Return the checkboxPage object
    }

    /**
     * Provides access to the InputPage object.
     * 
     * @returns {InputPage} - The InputPage object associated with the current page.
     */
    getInputPage() {
        return this.inputPage; // Return the checkboxPage object
    }
}

export default PoManager;
