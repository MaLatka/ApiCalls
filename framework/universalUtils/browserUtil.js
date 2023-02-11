import logger from "../../project/appUtils/logger.js";

class BrowserUtil {
     static async open(path) {
         try {
             await browser.url(path);
             await logger.info(`Successfully NAVIGATED to ${path}`);
         } catch(e) {
             await logger.error(`CAN'T navigate to ${path}`);
             throw e;
         }
    }

    static async maximize() {
         try {
             await browser.maximizeWindow();
             await logger.info(`Successfully MAXIMIZED browser window`);
         } catch (e) {
             await logger.error(`CAN'T maximize browser window`);
         }
    }

    static async executeAction(action) {
         try {
             return await browser.call(async() => {
                 return action;
             });
         } catch (e) {
             await logger.error(`Can't execute action: ${action}`);
         }
    }
}

export default BrowserUtil;