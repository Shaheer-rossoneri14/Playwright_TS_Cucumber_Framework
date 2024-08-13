import { Given, When, Then } from '@cucumber/cucumber';
import PoManager from '../../pageObjects/poManager';
import { CustomWorld } from '../support/hooks';
import * as fs from 'fs';
import * as path from 'path';
import { expect } from '@playwright/test';


/**UI Steps */
// Store a single instance of PoManager in the world context
Given(/^I am on the (.*) page$/, async function (this: CustomWorld, pageName: string) {
    const poManager = this.poManager;

    // Navigate to the correct page based on the value
    switch (pageName.toLowerCase()) {
        case 'login':
            await poManager.getLoginPage().goTo();
            break;
        case 'secure':
            await poManager.getLoginPage().validateUserIsLoggedIn();
            break;
        case 'checkbox':
            await poManager.getCheckBoxPage().goTo();
            break;
        case 'dropdown':
            await poManager.getDropDownPage().goTo();
            break;
        case 'input':
            await poManager.getInputPage().goTo();
            break;
        case 'javascript alerts':
            await poManager.getJsAlertsPage().goTo();
            break;
        default:
            throw new Error(`Page "${pageName}" is not defined in step definitions.`);
    }
});

// When Steps
When(/^I click on the (.*) button$/, async function (this: CustomWorld, buttonName: string) {
    const poManager = this.poManager;
    // console.log(`Button Name: ${buttonName}`); // Log button name for debugging
    switch (buttonName.toLowerCase()) {
        case 'logout':
            await poManager.getLoginPage().clickLogoutButton();
            break;
        default:
            throw new Error(`Button "${buttonName}" is not defined in step definitions.`);
    }
});

When(/^I login with (.+) and (.+)$/, async function (this: CustomWorld, username: string, password: string) {
    await this.poManager.getLoginPage().validLogin(username, password);
});

When(/^I click on (.+) and I (.+) the alert with text (.*)$/, async function (this: CustomWorld, alertBtn: string, alertAction: string, alertText: string) {
    const poManager = this.poManager;
    const actionType = alertAction.toLowerCase();
    console.log(`Alert btn is: ${alertBtn}`);
    await this.page.waitForTimeout(5000);
    if (alertBtn === 'jsalert'){
        console.log(`Inside jsalert`);
        await poManager.getJsAlertsPage().clickOnJsAlertAndHandle(actionType, alertText);
    }
    else if (alertBtn === 'jsconfirm'){
        console.log(`Inside jsconfirm`);
        await poManager.getJsAlertsPage().clickOnJsConfirmAndHandle(actionType, alertText);
    }
    else if (alertBtn === 'jsprompt'){
        console.log(`Inside jsprompt`);
        await poManager.getJsAlertsPage().clickOnJsPromptAndHandle(actionType, alertText);
    }
    else {
        throw new Error(`Unsupported alert button type: ${alertBtn}`);
    }
});

// Then Steps
Then(/^I should see a flash message saying (.*)$/, async function (this: CustomWorld, loginmessage: string) {
    await this.poManager.getLoginPage().verifyLoginMessage(loginmessage);
});

Then(/^I should be navigated to the login page and I should see a flash message saying (.*)$/, async function (this: CustomWorld, logoutmessage: string) {
    await this.poManager.getLoginPage().validateUserIsLoggedOut(logoutmessage);
})

Then(/^I perform actions and validate the checkboxes$/, async function (this: CustomWorld) {
    await this.poManager.getCheckBoxPage().actionsAndValidationsOnCheckboxes();
})

Then(/^I perform actions and validate the dropdown$/, async function (this: CustomWorld) {
    await this.poManager.getDropDownPage().actionsAndValidationsOnDropdown();
})

Then(/^I enter (.+) into input box$/, async function (this: CustomWorld, data: string) {
    await this.poManager.getInputPage().actionsAndValidationsOnInputBox(data);
})

Then(/^I should see the result message as (.*)$/, async function (this: CustomWorld, expectedMessage: string) {
    const actualMessage = await this.poManager.getJsAlertsPage().getResultText();
    console.log(`Actual Text: ${actualMessage}`)
    await expect(actualMessage).toBe(expectedMessage);
});

/**API steps */
let requestData: any;

const loadJSONFile = (filePath: string): any => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
};

Given(/^a valid JSON file (.+)$/, async function (this: CustomWorld, filePath: string) {
    requestData = loadJSONFile(path.resolve('testdata', filePath));
});

When(/^I send a (.+) request to (.+)$/, async function (this: CustomWorld, method: string, endpoint: string) {
    if (!this.apiLib) {
        throw new Error('apiLib is not initialized. Ensure it is set up correctly in the Before hook.');
    }

    switch (method.toUpperCase()) {
        case 'GET':
            this.response = await this.apiLib.getRequest(endpoint);
            console.log("response is:", this.response);
            break;
        case 'POST':
            this.response = await this.apiLib.postRequest(endpoint, requestData);
            break;
        case 'PUT':
            this.response = await this.apiLib.putRequest(endpoint, requestData);
            break;
        case 'PATCH':
            this.response = await this.apiLib.patchRequest(endpoint, requestData);
            break;
        case 'DELETE':
            this.response = await this.apiLib.deleteRequest(endpoint);
            break;
        default:
            throw new Error(`Unsupported request method: ${method}`);
    }
});

Then(/^the response status code should be (.+)$/, async function (this: CustomWorld, expectedStatusCode: string) {
    const expectedCode = parseInt(expectedStatusCode, 10);
    if (!this.response) {
        throw new Error('No response found. Ensure a request was made.');
    }
    await this.apiLib.validateHTTPResponseCode(expectedCode);
});

Then(/^the response data should match the expected data in (.+)$/, async function (this: CustomWorld, expectedDataFile: string) {
    if (!this.response) {
        throw new Error('No response found. Ensure a request was made.');
    }
    const expectedData = loadJSONFile(path.resolve('testdata', expectedDataFile));
    await this.apiLib.validateResponseData(expectedData);
});
