import { Given, When, Then, Before } from '@cucumber/cucumber';
import PoManager from '../../pageObjects/poManager';
import { CustomWorld } from '../support/hooks'; 

// Store a single instance of PoManager in the world context
Before(async function(this: CustomWorld) {
    this.poManager = new PoManager(this.page);
});

Given(/^I am on the login page$/, async function(this: CustomWorld) {
    // Use the single instance of PoManager to access the LoginPage and navigate to it
    await this.poManager.getLoginPage().goTo();
});

When(/^I login with (.+) and (.+)$/, async function(this: CustomWorld, username: string, password: string) {
    // Use the single instance of PoManager to access the LoginPage and perform login
    await this.poManager.getLoginPage().validLogin(username, password);
});

Then(/^I should see a flash message saying (.*)$/, async function(this: CustomWorld, expectedMessage: string) {
    // Use the single instance of PoManager to access the LoginPage and verify the flash message
    await this.poManager.getLoginPage().verifyLoginMessage(expectedMessage);
});
