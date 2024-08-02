import { Given, When, Then, Before } from '@cucumber/cucumber';
import PoManager from '../../pageObjects/poManager';
import { CustomWorld } from '../support/hooks'; 
import * as fs from 'fs';
import * as path from 'path';
import ApiActionLib from '../../utils/apiActionsLib';


/**UI Steps */
// Store a single instance of PoManager in the world context
Before(async function(this: CustomWorld) {
    this.poManager = new PoManager(this.page);
});

// Given Steps
Given(/^I am on the (.*) page$/, async function(this: CustomWorld, pageName: string) {
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
        default:
            throw new Error(`Page "${pageName}" is not defined in step definitions.`);
    }
});

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

Then(/^I perform actions and validate the checkboxes$/, async function (this: CustomWorld) {
    await this.poManager.getCheckBoxPage().actionsAndValidationsOnCheckboxes();
})

Then(/^I perform actions and validate the dropdown$/, async function (this: CustomWorld) {
    await this.poManager.getDropDownPage().actionsAndValidationsOnDropdown();
})

Then(/^I enter (.+) into input box$/, async function (this: CustomWorld, data: string) {
    await this.poManager.getInputPage().actionsAndValidationsOnInputBox(data);
    
})

/**API steps */
// Define a variable to store the API library instance
let apiLib: ApiActionLib;
let requestData: any;
let response: any;

// Function to load JSON file
const loadJSONFile = (filePath: string): any => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
};

// Initialize the API library before all tests
Given(/^a valid JSON file (.+)$/, async function (filePath: string) {
    requestData = loadJSONFile(path.resolve('testdata', filePath));
});

// Perform API request based on the method and endpoint
When(/^I send a (.+) request to (.+)$/, async function (method: string, endpoint: string) {
    switch (method.toUpperCase()) {
        case 'GET':
            response = await apiLib.getRequest(endpoint);
            break;
        case 'POST':
            response = await apiLib.postRequest(endpoint, requestData);
            break;
        case 'PUT':
            response = await apiLib.putRequest(endpoint, requestData);
            break;
        case 'PATCH':
            response = await apiLib.patchRequest(endpoint, requestData);
            break;
        case 'DELETE':
            response = await apiLib.deleteRequest(endpoint);
            break;
        default:
            throw new Error(`Unsupported request method: ${method}`);
    }
});

// Validate the response status code
Then(/^the response status code should be (.+)$/, async function (expectedStatusCode: number) {
    if (!response) {
        throw new Error('No response found. Ensure a request was made.');
    }
    await apiLib.validateHTTPResponseCode(expectedStatusCode);
});

// Validate the response data
Then(/^the response data should match the expected data in (.+)$/, async function (expectedDataFile: string) {
    if (!response) {
        throw new Error('No response found. Ensure a request was made.');
    }
    const expectedData = loadJSONFile(path.resolve('testdata', expectedDataFile));
    await apiLib.validateResponseData(expectedData);
});
