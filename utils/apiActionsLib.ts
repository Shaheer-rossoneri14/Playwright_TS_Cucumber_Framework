import { expect, APIRequestContext } from '@playwright/test';
import assert from 'assert';
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
    async getRequest(endpoint: string): Promise<any> {
        console.log(`Sending GET request to ${endpoint}`);
        this.response = await this.requestContext.get(endpoint);
        console.log(`Response: ${await this.response.text()}`);
        return this.response;
    }

    /** Method for POST request */
    async postRequest(endpoint: string, data: any): Promise<any> {
        console.log(`Sending POST request to ${endpoint}`);
        this.response = await this.requestContext.post(endpoint, {
            data
        });
        console.log(`Response: ${await this.response.text()}`);
        return this.response;
    }

    /** Method for PUT request */
    async putRequest(endpoint: string, data: any): Promise<any> {
        console.log(`Sending PUT request to ${endpoint}`);
        this.response = await this.requestContext.put(endpoint, {
            data
        });
        console.log(`Response: ${await this.response.text()}`);
        return this.response;
    }

    /** Method for PATCH request */
    async patchRequest(endpoint: string, data: any): Promise<any> {
        console.log(`Sending PATCH request to ${endpoint}`);
        this.response = await this.requestContext.patch(endpoint, {
            data
        });
        console.log(`Response: ${await this.response.text()}`);
        return this.response;
    }

    /** Method for DELETE request */
    async deleteRequest(endpoint: string): Promise<any> {
        console.log(`Sending DELETE request to ${endpoint}`);
        this.response = await this.requestContext.delete(endpoint);
        console.log(`Response: ${await this.response.text()}`);
        return this.response;
    }

    /** Method for validating response status code.
 * @param expectedStatusCode - Expected Status Code.
*/
    async validateHTTPResponseCode(expectedStatusCode: Number): Promise<void> {
        if (!this.response) {
            throw new Error('No response available for validation.');
        }
        console.log("Validating the HTTP Response Code");
        expect(this.response.status()).toBe(expectedStatusCode);
    }

    /** Method for validating response data.
     * @param expectedData - Expected Response Data.
     */
    async validateResponseData(expectedData: any): Promise<void> {
        if (!this.response) {
            throw new Error('No response available for validation.');
        }
        console.log("Validating the Response Data");
        const responseData = await this.response.json();
        assert.deepEqual(responseData, expectedData, 'Response data does not match expected data');
    }
}

export default ApiActionLib;
