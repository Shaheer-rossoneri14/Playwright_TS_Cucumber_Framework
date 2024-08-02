import { Given, When, Then, Before } from '@cucumber/cucumber';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { APIRequestContext, request } from '@playwright/test';
import ApiActionLib from '../../utils/apiActionsLib';

// Load environment variables from .env file
dotenv.config();

let apiLib: ApiActionLib;
let requestContext: APIRequestContext;

// Function to load JSON file
function loadJSONFile(filePath: string): any {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

// Initialize the API library before all tests
Before(async () => {
    const baseURL = process.env.BASE_URL_API;
    if (!baseURL) {
        throw new Error('BASE_URL environment variable is not set');
    }

    requestContext = await request.newContext({ baseURL });
    apiLib = new ApiActionLib(requestContext);
});

Given('a valid JSON file {string}', function (filePath: string) {
    this.requestData = loadJSONFile(path.resolve('testData', filePath));
});

When('I send a {string} request to {string}', async function (method: string, endpoint: string) {
    const { requestData } = this;

    switch (method.toUpperCase()) {
        case 'GET':
            await apiLib.getRequest(endpoint);
            break;
        case 'POST':
            await apiLib.postRequest(endpoint, requestData);
            break;
        case 'PUT':
            await apiLib.putRequest(endpoint, requestData);
            break;
        case 'PATCH':
            await apiLib.patchRequest(endpoint, requestData);
            break;
        case 'DELETE':
            await apiLib.deleteRequest(endpoint);
            break;
        default:
            throw new Error(`Unsupported request method: ${method}`);
    }
});

Then('the response status code should be {int}', async function (expectedStatusCode: number) {
    await apiLib.validateHTTPResponseCode(expectedStatusCode);
});

Then('the response data should match the expected data in {string}', async function (expectedDataFile: string) {
    const expectedData = loadJSONFile(path.resolve('testData', expectedDataFile));
    await apiLib.validateResponseData(expectedData);
});
