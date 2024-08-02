import { expect, APIRequestContext } from '@playwright/test';
import { assert } from 'chai';

/**
 * A utility library for common API actions using Playwright.
 */
class ApiActionLib {
    private requestContext: APIRequestContext;
    private response: any;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    /** Method for GET request */
    async getRequest(endpoint: string): Promise<void> {
        console.log(`Sending GET request to ${endpoint}`);
        this.response = await this.requestContext.get(endpoint);
        console.log(`Response: ${await this.response.text()}`);
    }

    /** Method for POST request */
    async postRequest(endpoint: string, data: any): Promise<void> {
        console.log(`Sending POST request to ${endpoint}`);
        this.response = await this.requestContext.post(endpoint, {
            data
        });
        console.log(`Response: ${await this.response.text()}`);
    }

    /** Method for PUT request */
    async putRequest(endpoint: string, data: any): Promise<void> {
        console.log(`Sending PUT request to ${endpoint}`);
        this.response = await this.requestContext.put(endpoint, {
            data
        });
        console.log(`Response: ${await this.response.text()}`);
    }

    /** Method for PATCH request */
    async patchRequest(endpoint: string, data: any): Promise<void> {
        console.log(`Sending PATCH request to ${endpoint}`);
        this.response = await this.requestContext.patch(endpoint, {
            data
        });
        console.log(`Response: ${await this.response.text()}`);
    }

    /** Method for DELETE request */
    async deleteRequest(endpoint: string): Promise<void> {
        console.log(`Sending DELETE request to ${endpoint}`);
        this.response = await this.requestContext.delete(endpoint);
        console.log(`Response: ${await this.response.text()}`);
    }

    /** Method for validating response status code.
     * @param expectedStatusCode - Expected Status Code.
    */
    async validateHTTPResponseCode(expectedStatusCode: number): Promise<void> {
        console.log("Validating the HTTP Response Code");
        expect(this.response.status()).toBe(expectedStatusCode);
    }

    /** Method for validating response data.
     * @param expectedData - Expected Response Data.
     */
    async validateResponseData(expectedData: any): Promise<void> {
        console.log("Validating the Response Data");
        const responseData = await this.response.json();
        assert.deepEqual(responseData, expectedData, 'Response data does not match expected data');
    }
}

export default ApiActionLib;
