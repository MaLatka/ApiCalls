
import logger from "../../project/appUtils/logger.js";

export default class BaseElement{
    #name;
    #uniqueLocator;
    constructor(name, uniqueLocator) {
        this.#name = name;
        this.#uniqueLocator = uniqueLocator;
    }

     async getElement() {
        try {
            return $(this.#uniqueLocator);
        } catch (e) {
             logger.error(`Element ${this.#name}, CAN'T be found`);
            throw e;
        }
    }

     async getAllElements() {
         try {
             return $$(this.#uniqueLocator);
         } catch (e) {
              logger.error(`Elements ${this.#name}, CAN'T be found`);
             throw e;
         }
    }

    async isElementPresent() {
        const elem = await this.getElement();
        return elem.isDisplayed();
    }

    async isElementClickable() {
        const elem = await this.getElement();
        return elem.isClickable();
    }

    async isElementEnabled() {
        const elem = await this.getElement();
        return elem.isEnabled();
    }

    async clickElement() {
        try {
            await this.isElementPresent();
            await this.isElementClickable();
            const element = await this.getElement();
            await element.click();
             logger.info(`Element: ${this.name}, clicked`);
        } catch (e) {
             logger.error(`Element: ${this.name}, CAN'T be clicked`);
            throw e;
        }


    }
}