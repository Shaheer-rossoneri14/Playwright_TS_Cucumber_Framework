import { expect, request } from '@playwright/test';
import { assert } from 'chai';

let response;
/**
 * A utility library for common API actions using Playwright.
 */
class apiActionLib{
    /**Method for GET request */

    /**Method for POST request */

    /**Method for PUT request */

    /**Method for PATCH request */

    /**Method for DELETE request */

    /**Method for validating response status code.
     * @param expectedStatusCode - Expected Status Code. 
    */
    async validateHTTPResponseCode(expectedStatusCode: Number): Promise<void>{
        console.log("Validating the HTTP Response Code");
        expect (response.status()).toBe(expectedStatusCode);
    }

    /**Method for validating response data.*/
}

export default apiActionLib;