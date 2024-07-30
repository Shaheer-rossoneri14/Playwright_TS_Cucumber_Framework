import { Locator } from '@playwright/test';

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
        console.log('Entering text into element:', webElement);
        await webElement.fill(inputText);
    }

    /**
     * Enter text sequentially into an input field or textarea.
     * 
     * @param webElement - The web element to enter text into sequentially.
     * @param inputText - The text to be entered sequentially.
     */
    async enterSequentiallyTextIntoWebElement(webElement: Locator, inputText: string): Promise<void> {
        console.log('Entering text sequentially into element:', webElement);
        await webElement.pressSequentially(inputText);
    }

    /**
     * Perform a single keystroke.
     * 
     * @param webElement - The web element to perform the keystroke on.
     * @param keystroke - The keystroke to be performed.
     */
    async singleKeystroke(webElement: Locator, keystroke: string): Promise<void> {
        console.log('Performing keystroke on element:', keystroke);
        await webElement.press(keystroke);
    }

    /**
     * Check or uncheck a checkbox based on the desired state.
     * 
     * @param checkBox - The checkbox element.
     * @param toCheck - Desired state, true to check and false to uncheck.
     */
    async checkUncheckCheckBox(checkBox: Locator, toCheck: boolean): Promise<void> {
        const isChecked = await checkBox.isChecked();
        if (toCheck !== isChecked) {
            await checkBox.setChecked(toCheck);
            console.log(`Checkbox set to ${toCheck ? 'checked' : 'unchecked'}`);
        } else {
            console.log(`Checkbox was already ${toCheck ? 'checked' : 'unchecked'}`);
        }
    }

    /**
     * Check a radio button if it is not already checked.
     * 
     * @param radioBtn - The radio button element.
     */
    async checkRadioButton(radioBtn: Locator): Promise<void> {
        const isChecked = await radioBtn.isChecked();
        if (!isChecked) {
            await radioBtn.check();
            console.log('Radio button checked');
        } else {
            console.log('Radio button was already checked');
        }
    }

    /**
     * Retrieve the text content of a web element.
     * 
     * @param webElement - The web element to get text from.
     * @returns The text content of the web element.
     */
    async getAllTextOfWebElement(webElement: Locator): Promise<string | null> {
        console.log('Retrieving text content of element:', webElement);
        return await webElement.textContent();
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
        console.log('Clicking on element:', webElement);
        await webElement.click();
    }

    /**
     * Perform a double click on a web element.
     * 
     * @param webElement - The web element to double click on.
     */
    async doubleClickOnWebElement(webElement: Locator): Promise<void> {
        console.log('Double clicking on element:', webElement);
        await webElement.dblclick();
    }

    /**
     * Perform a right click on a web element.
     * 
     * @param webElement - The web element to right click on.
     */
    async rightClickOnWebElement(webElement: Locator): Promise<void> {
        console.log('Right clicking on element:', webElement);
        await webElement.click({ button: 'right' });
    }

    /**
     * Hover over a web element.
     * 
     * @param webElement - The web element to hover over.
     */
    async hoverOnWebElement(webElement: Locator): Promise<void> {
        console.log('Hovering over element:', webElement);
        await webElement.hover();
    }

    /**
     * Perform a force click on a web element.
     * 
     * @param webElement - The web element to force click on.
     */
    async forceClickOnWebElement(webElement: Locator): Promise<void> {
        console.log('Force clicking on element:', webElement);
        await webElement.click({ force: true });
    }
}

export default UiActionsLib;
