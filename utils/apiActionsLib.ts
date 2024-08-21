import { expect, APIRequestContext } from '@playwright/test';
import assert from 'assert';

/**
 * A utility library for common API actions using Playwright.
 */
class ApiActionLib {
    private requestContext: APIRequestContext;
    private response: any;

    /**
     * Constructs an instance of ApiActionLib.
     * 
     * @param {APIRequestContext} requestContext - The Playwright API request context.
     */
    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    /**
     * Sends a GET request to the specified endpoint.
     * 
     * @param {string} endpoint - The API endpoint to send the GET request to.
     * @returns {Promise<any>} The response data as a JSON object.
     * @throws Will throw an error if the GET request fails.
     */
    async getRequest(endpoint: string): Promise<any> {
        try {
            console.log(`Sending GET request to ${endpoint}`);
            this.response = await this.requestContext.get(endpoint);
            console.log(`Response Status: ${this.response.status()}`);
            console.log(`Response Body: ${await this.response.text()}`);
            return await this.response.json();
        } catch (error) {
            console.error(`Error during GET request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends a POST request to the specified endpoint with the provided data.
     * 
     * @param {string} endpoint - The API endpoint to send the POST request to.
     * @param {any} data - The data to send in the POST request body.
     * @returns {Promise<any>} The response data as a JSON object.
     * @throws Will throw an error if the POST request fails.
     */
    async postRequest(endpoint: string, data: any): Promise<any> {
        try {
            console.log(`Sending POST request to ${endpoint} with data:`, JSON.stringify(data));
            this.response = await this.requestContext.post(endpoint, { data });
            console.log(`Response Status: ${this.response.status()}`);
            console.log(`Response Body: ${await this.response.text()}`);
            return await this.response.json();
        } catch (error) {
            console.error(`Error during POST request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends a PUT request to the specified endpoint with the provided data.
     * 
     * @param {string} endpoint - The API endpoint to send the PUT request to.
     * @param {any} data - The data to send in the PUT request body.
     * @returns {Promise<any>} The response data as a JSON object.
     * @throws Will throw an error if the PUT request fails.
     */
    async putRequest(endpoint: string, data: any): Promise<any> {
        try {
            console.log(`Sending PUT request to ${endpoint} with data:`, JSON.stringify(data));
            this.response = await this.requestContext.put(endpoint, { data });
            console.log(`Response Status: ${this.response.status()}`);
            console.log(`Response Body: ${await this.response.text()}`);
            return await this.response.json();
        } catch (error) {
            console.error(`Error during PUT request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends a PATCH request to the specified endpoint with the provided data.
     * 
     * @param {string} endpoint - The API endpoint to send the PATCH request to.
     * @param {any} data - The data to send in the PATCH request body.
     * @returns {Promise<any>} The response data as a JSON object.
     * @throws Will throw an error if the PATCH request fails.
     */
    async patchRequest(endpoint: string, data: any): Promise<any> {
        try {
            console.log(`Sending PATCH request to ${endpoint} with data:`, JSON.stringify(data));
            this.response = await this.requestContext.patch(endpoint, { data });
            console.log(`Response Status: ${this.response.status()}`);
            console.log(`Response Body: ${await this.response.text()}`);
            return await this.response.json();
        } catch (error) {
            console.error(`Error during PATCH request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Sends a DELETE request to the specified endpoint.
     * 
     * @param {string} endpoint - The API endpoint to send the DELETE request to.
     * @returns {Promise<any>} The response data as a JSON object.
     * @throws Will throw an error if the DELETE request fails.
     */
    async deleteRequest(endpoint: string): Promise<any> {
        try {
            console.log(`Sending DELETE request to ${endpoint}`);
            this.response = await this.requestContext.delete(endpoint);
            console.log(`Response Status: ${this.response.status()}`);
            console.log(`Response Body: ${await this.response.text()}`);
            return await this.response.json();
        } catch (error) {
            console.error(`Error during DELETE request to ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Validates the HTTP response status code against the expected status code.
     * 
     * @param {number} expectedStatusCode - The expected HTTP status code.
     * @returns {Promise<void>} Resolves if the status code matches; otherwise, throws an error.
     * @throws Will throw an error if the status code does not match the expected status code.
     */
    async validateHTTPResponseCode(expectedStatusCode: number): Promise<void> {
        if (!this.response) {
            throw new Error('No response available for validation.');
        }
        console.log("Validating the HTTP Response Code");
        try {
            expect(this.response.status()).toBe(expectedStatusCode);
        } catch (error) {
            console.error(`Expected status ${expectedStatusCode} but got ${this.response.status()}`);
            throw error;
        }
    }

    /**
     * Validates the response data against the expected data.
     * 
     * @param {any} expectedData - The expected response data.
     * @returns {Promise<void>} Resolves if the response data matches; otherwise, throws an error.
     * @throws Will throw an error if the response data does not match the expected data.
     */
    async validateResponseData(expectedData: any): Promise<void> {
        if (!this.response) {
            throw new Error('No response available for validation.');
        }
        console.log("Validating the Response Data");
        try {
            const responseData = await this.response.json();
            assert.deepEqual(responseData, expectedData, 'Response data does not match expected data');
        } catch (error) {
            console.error('Response data validation failed:', error);
            throw error;
        }
    }
}

export default ApiActionLib;
