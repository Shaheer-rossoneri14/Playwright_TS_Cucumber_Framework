import { Locator } from '@playwright/test';

class UiActionsLib {
    async enterTextIntoWebElement(webElement: Locator, inputText: string): Promise<void> {
        console.log('Entering data into', webElement);
        await webElement.fill(inputText);
    }

    async checkUncheckCheckBox(checkBox: Locator, toCheck: boolean): Promise<void> {
        const isChecked = await checkBox.isChecked();
        if (toCheck !== isChecked) {
            await checkBox.setChecked(toCheck);
            console.log(`Checkbox set to ${toCheck}`);
        } else {
            console.log(`Checkbox was already ${toCheck ? 'checked' : 'unchecked'}`);
        }
    }

    async checkRadioButton(radioBtn: Locator): Promise<void> {
        const isChecked = await radioBtn.isChecked();
        if (!isChecked) {
            await radioBtn.check();
            console.log('Radio button checked');
        } else {
            console.log('Radio button was already checked');
        }
    }

    async clickOnWebElement(webElement: Locator): Promise<void> {
        console.log('Clicking on', webElement);
        await webElement.click();
    }

    async getAllTextOfWebElement(webElement: Locator): Promise<string | null> {
        console.log('Getting entire text of web element', webElement);
        return await webElement.textContent();
    }

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
}

export default UiActionsLib;
