import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import path from 'path';

/**
 * A utility library for common UI actions using Playwright.
 */
class UiActionsLib {

    /**
     * Enter text into an input field or textarea.
     * 
     * @param webElement - The web element to enter text into.
     * @param inputText - The text to be entered.
     */
    async enterTextIntoWebElement(webElement: Locator, inputText: string): Promise<void> {
        try {
            console.log('Entering text into element:', webElement);
            await webElement.fill(inputText);
        } catch (error) {
            console.error('Error entering text into element:', error);
            throw error;
        }
    }

    /**
     * Enter text sequentially into an input field or textarea.
     * 
     * @param webElement - The web element to enter text into sequentially.
     * @param inputText - The text to be entered sequentially.
     */
    async enterSequentiallyTextIntoWebElement(webElement: Locator, inputText: string): Promise<void> {
        try {
            console.log('Entering text sequentially into element:', webElement);
            await webElement.pressSequentially(inputText);
        } catch (error) {
            console.error('Error entering text sequentially into element:', error);
            throw error;
        }
    }

    /**
      * Clear text from an input field.
      * 
      * @param webElement - The web element to clear text from.
      */
    async clearTextFromInput(webElement: Locator): Promise<void> {
        try {
            console.log('Clearing text from input element:', webElement);
            await webElement.fill('');
        } catch (error) {
            console.error('Error clearing text from input element:', error);
            throw error;
        }
    }

    /**
     * Perform a single keystroke.
     * 
     * @param webElement - The web element to perform the keystroke on.
     * @param keystroke - The keystroke to be performed. It can be shortcuts as well.
     */
    async singleKeystroke(webElement: Locator, keystroke: string): Promise<void> {
        try {
            console.log('Performing keystroke on element:', keystroke);
            await webElement.press(keystroke);
        } catch (error) {
            console.error('Error performing keystroke on element:', error);
            throw error;
        }
    }

    /**
     * Check or uncheck a checkbox based on the desired state.
     * 
     * @param checkBox - The checkbox element.
     * @param toCheck - Desired state, true to check and false to uncheck.
     */
    async checkUncheckCheckBox(checkBox: Locator, toCheck: boolean): Promise<void> {
        try {
            const isChecked = await checkBox.isChecked();
            if (toCheck !== isChecked) {
                await checkBox.setChecked(toCheck);
                console.log(`Checkbox set to ${toCheck ? 'checked' : 'unchecked'}`);
            } else {
                console.log(`Checkbox was already ${toCheck ? 'checked' : 'unchecked'}`);
            }
        } catch (error) {
            console.error('Error checking/unchecking checkbox:', error);
            throw error;
        }
    }

    /**
     * Check a radio button if it is not already checked.
     * 
     * @param radioBtn - The radio button element.
     */
    async checkRadioButton(radioBtn: Locator): Promise<void> {
        try {
            const isChecked = await radioBtn.isChecked();
            if (!isChecked) {
                await radioBtn.check();
                console.log('Radio button checked');
            } else {
                console.log('Radio button was already checked');
            }
        } catch (error) {
            console.error('Error checking radio button:', error);
            throw error;
        }
    }

    /**
     * Retrieve the text content of a web element.
     * 
     * @param webElement - The web element to get text from.
     * @returns The text content of the web element.
     */
    async getAllTextOfWebElement(webElement: Locator): Promise<string | null> {
        try {
            console.log('Retrieving text content of element:', webElement);
            return await webElement.textContent();
        } catch (error) {
            console.error('Error retrieving text content of element:', error);
            throw error;
        }
    }

    /**
     * Retrieve the text content of a input element.
     * 
     * @param webElement - The web element to get text from.
     * @returns The text content of the web element.
     */
    async getAllTextOfInputElement(webElement: Locator): Promise<string | null> {
        try {
            console.log('Retrieving text content of element:', webElement);
            return await webElement.inputValue();
        } catch (error) {
            console.error('Error retrieving text content of element:', error);
            throw error;
        }
    }

    /**
     * Select a dropdown option by its value attribute.
     * 
     * @param webElement - The dropdown element.
     * @param value - The value to select.
     */
    async selectDropDownByValue(webElement: Locator, value: string): Promise<void> {
        console.log('Selecting dropdown option by value:', value);
        try {
            await webElement.selectOption({ value: value });
            console.log(`Option with value "${value}" selected successfully.`);
        } catch (error) {
            console.error(`Failed to select option with value "${value}":`, error);
            throw error;
        }
    }


    /**
     * Select a dropdown option by its visible label.
     * 
     * @param webElement - The dropdown element.
     * @param label - The label to select.
     */
    async selectDropDownByLabel(webElement: Locator, label: string): Promise<void> {
        console.log('Selecting dropdown option by label:', label);
        try {
            await webElement.selectOption({ label: label });
            console.log(`Option with label "${label}" selected successfully.`);
        } catch (error) {
            console.error(`Failed to select option with label "${label}":`, error);
            throw error;
        }
    }

    /**
     * Select a dropdown option by its index.
     * 
     * @param webElement - The dropdown element.
     * @param index - The index to select.
     */
    async selectDropDownByIndex(webElement: Locator, index: number): Promise<void> {
        console.log('Selecting dropdown option by index:', index);
        try {
            await webElement.selectOption({ index: index });
            console.log(`Option at index "${index}" selected successfully.`);
        } catch (error) {
            console.error(`Failed to select option at index "${index}":`, error);
            throw error;
        }
    }

    /**
     * Perform a single click on a web element.
     * 
     * @param webElement - The web element to click on.
     */
    async singleClickOnWebElement(webElement: Locator): Promise<void> {
        try {
            console.log('Clicking on element:', webElement);
            await webElement.click();
        } catch (error) {
            console.error('Error clicking on element:', error);
            throw error;
        }
    }

    /**
     * Perform a double click on a web element.
     * 
     * @param webElement - The web element to double click on.
     */
    async doubleClickOnWebElement(webElement: Locator): Promise<void> {
        try {
            console.log('Double clicking on element:', webElement);
            await webElement.dblclick();
        } catch (error) {
            console.error('Error double clicking on element:', error);
            throw error;
        }
    }

    /**
     * Perform a right click on a web element.
     * 
     * @param webElement - The web element to right click on.
     */
    async rightClickOnWebElement(webElement: Locator): Promise<void> {
        try {
            console.log('Right clicking on element:', webElement);
            await webElement.click({ button: 'right' });
        } catch (error) {
            console.error('Error right clicking on element:', error);
            throw error;
        }
    }

    /**
     * Hover over a web element.
     * 
     * @param webElement - The web element to hover over.
     */
    async hoverOnWebElement(webElement: Locator): Promise<void> {
        try {
            console.log('Hovering over element:', webElement);
            await webElement.hover();
        } catch (error) {
            console.error('Error hovering over element:', error);
            throw error;
        }
    }

    /**
     * Perform a force click on a web element.
     * 
     * @param webElement - The web element to force click on.
     */
    async forceClickOnWebElement(webElement: Locator): Promise<void> {
        try {
            console.log('Force clicking on element:', webElement);
            await webElement.click({ force: true });
        } catch (error) {
            console.error('Error force clicking on element:', error);
            throw error;
        }
    }

    /**
     * Upload a file to an input element.
     * 
     * @param webElement - The Locator of the input element.
     * @param filePath - The path of the file to be uploaded.
     */
    async uploadSingleFile(webElement: Locator, filePath: string): Promise<void> {
        console.log('Uploading the file:', filePath);
        const absoluteFilePath = path.join(__dirname, filePath);
        try {
            await webElement.setInputFiles(absoluteFilePath);
            console.log(`File "${absoluteFilePath}" uploaded successfully.`);
        } catch (error) {
            console.error(`Failed to upload file "${absoluteFilePath}":`, error);
            throw error;
        }
    }

    /**
     * Upload multiple files to an input element.
     * 
     * @param webElement - The Locator of the input element.
     * @param filePaths - An array of file paths to be uploaded.
     */
    async uploadMultipleFiles(webElement: Locator, filePaths: string[]): Promise<void> {
        console.log('Uploading multiple files to input element:', webElement);
        const absoluteFilePaths = filePaths.map(filePath => path.join(__dirname, filePath));
        try {
            await webElement.setInputFiles(absoluteFilePaths);
            console.log(`Files "${absoluteFilePaths.join(', ')}" uploaded successfully.`);
        } catch (error) {
            console.error(`Failed to upload files "${absoluteFilePaths.join(', ')}":`, error);
            throw error;
        }
    }


    /**
     * Upload a directory to an input element.
     * 
     * @param webElement - The Locator of the input element.
     * @param directoryPath - The path of the directory to be uploaded.
     */
    async uploadDirectory(webElement: Locator, directoryPath: string): Promise<void> {
        console.log('Uploading directory to input element:', webElement);
        const absoluteDirectoryPath = path.join(__dirname, directoryPath);
        try {
            await webElement.setInputFiles(absoluteDirectoryPath);
            console.log(`Directory "${absoluteDirectoryPath}" uploaded successfully.`);
        } catch (error) {
            console.error(`Failed to upload directory "${absoluteDirectoryPath}":`, error);
            throw error;
        }
    }

    /**
     * Drag an item and drop it onto another element.
     * 
     * @param sourceLocator - The Locator of the item to be dragged.
     * @param targetLocator - The Locator of the element where the item will be dropped.
     */
    async dragAndDrop(sourceLocator: Locator, targetLocator: Locator): Promise<void> {
        console.log('Dragging item from:', sourceLocator, 'to:', targetLocator);
        try {
            await sourceLocator.dragTo(targetLocator);
            console.log('Item dragged and dropped successfully.');
        } catch (error) {
            console.error('Failed to drag and drop item:', error);
            throw error;
        }
    }

    /**
     * Waiting for the element to be visible.
     * 
     * @param webElement - The Locator of the element to be waited for.
     */
    async waitForElementToBeVisible(webElement: Locator, timeout: number = 30000): Promise<void> {
        console.log('Waiting for element to be visible:', webElement);
        try {
            await webElement.waitFor({ state: 'visible', timeout });
        } catch (error) {
            console.error(`Error waiting for element to be visible:`, error);
            throw new Error(`Element did not become visible within ${timeout} ms`);
        }
    }

    /**
     * Waiting for the element to be hidden.
     * 
     * @param webElement - The Locator of the element to be hidden.
     */
    async waitForElementToBeHidden(webElement: Locator, timeout: number = 30000): Promise<void> {
        console.log('Waiting for element to be hidden:', webElement);
        try {
            await webElement.waitFor({ state: 'hidden', timeout });
        } catch (error) {
            console.error(`Error waiting for element to be hidden:`, error);
            throw new Error(`Element did not become hidden within ${timeout} ms`);
        }
    }

    /**
     * Scroll to an element on the page.
     * 
     * @param webElement - The web element to scroll to.
     */
    async scrollToWebElement(webElement: Locator): Promise<void> {
        console.log('Scrolling to element:', webElement);
        try {
            await webElement.scrollIntoViewIfNeeded();
        } catch (error) {
            console.error('Error scrolling to element:', error);
            throw new Error('Failed to scroll to the element.');
        }
    }

    /**
     * Retrieve the value of a specified attribute from an element.
     * 
     * @param webElement - The web element from which to get the attribute value.
     * @param attribute - The name of the attribute to retrieve.
     * @returns The value of the specified attribute.
     */
    async getAttributeValue(webElement: Locator, attribute: string): Promise<string | null> {
        console.log('Getting attribute value:', attribute, 'from element:', webElement);
        try {
            return await webElement.getAttribute(attribute);
        } catch (error) {
            console.error('Error getting attribute value:', error);
            throw new Error(`Failed to retrieve the value of attribute "${attribute}"`);
        }
    }

    /**
     * Assert that the text content of an element matches the expected text.
     * 
     * @param webElement - The web element to check the text of.
     * @param expectedText - The expected text content.
     * @throws An error if the actual text does not match the expected text.
     */
    async assertElementText(webElement: Locator, expectedText: string): Promise<void> {
        console.log('Asserting text of element:', webElement);
        try {
            const actualText = await this.getAllTextOfInputElement(webElement);
            if (actualText !== expectedText) {
                throw new Error(`Expected text: "${expectedText}", but got: "${actualText}"`);
            }
        } catch (error) {
            console.error('Error asserting element text:', error);
            throw error;
        }
    }

    /**
     * Handle JavaScript alerts or prompts.
     * 
     * This method listens for a dialog event on the page and performs the specified action
     * (accept or dismiss) on the alert or prompt. It can also provide a text response if
     * accepting a prompt.
     * 
     * @param page - The Playwright Page object on which the dialog event is triggered.
     * @param action - The action to perform on the dialog. It can be 'accept' to accept the dialog or 'dismiss' to dismiss it.
     * @param text - The text to send in response to the prompt. Defaults to an empty string if not provided.
     * @throws An error if the action cannot be performed or if the dialog event is not fired.
     */
    async handleAlert(page: Page, action: string, text: string): Promise<void> {
        console.log(`Handling alert with action and text: ${action} and ${text}`);
        try {
            page.on('dialog', async dialog => {
                if (action === 'accept') {
                    console.log(`Entering text: ${text}`)
                    await dialog.accept(text);
                } else if (action === 'dismiss') {
                    console.log(`Dismissing alert`)
                    await dialog.dismiss();
                } else {
                    throw new Error(`Unsupported action: ${action}`);
                }
            });
        } catch (error){
            console.error('Error handling alert:', error);
            throw new Error(`Failed to handle alert with action: ${action}`);
        }
    }
}

export default UiActionsLib;
