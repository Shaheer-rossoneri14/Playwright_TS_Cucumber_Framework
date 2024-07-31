import { Given, When, Then, Before } from '@cucumber/cucumber';
import PoManager from '../../pageObjects/poManager';
import { CustomWorld } from '../support/hooks'; 

// Store a single instance of PoManager in the world context
Before(async function(this: CustomWorld) {
    this.poManager = new PoManager(this.page);
});

// Given Steps
Given(/^I am on the login page$/, async function(this: CustomWorld) {
    await this.poManager.getLoginPage().goTo();
});

Given(/^I am on the secure page$/, async function (this: CustomWorld) {
    await this,this.poManager.getLoginPage().validateUserIsLoggedIn();
})


// When Steps
When(/^I login with (.+) and (.+)$/, async function(this: CustomWorld, username: string, password: string) {
    await this.poManager.getLoginPage().validLogin(username, password);
});

When(/^I click on the Logout button$/, async function (this: CustomWorld) {
    await this.poManager.getLoginPage().clickLogoutButton();
})


//Then Steps
Then(/^I should see a flash message saying (.*)$/, async function(this: CustomWorld, loginmessage: string) {
    await this.poManager.getLoginPage().verifyLoginMessage(loginmessage);
});

Then(/^I should be navigated to the login page and I should see a flash message saying (.*)$/, async function (this: CustomWorld, logoutmessage: string) {
    await this.poManager.getLoginPage().validateUserIsLoggedOut(logoutmessage);
})
