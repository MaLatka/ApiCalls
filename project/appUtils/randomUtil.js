import {configData, staticTestData} from "../../framework/universalUtils/jsonUtil.js";
import logger from "./logger.js";
import ArrayUtil from "../../framework/universalUtils/arrayUtil.js";

class RandomUtil{
    static generateRandomString() {
        let randomStr;
        try {
            randomStr = Math.random().toString(configData.randomConfig.radix).slice(configData.randomConfig.indexStart);
             logger.info(`Generated a random string: ${randomStr}`)
        } catch(e) {
             logger.error(`Failed to generate random string`);
            throw e;
        }
        return randomStr;
    }

    static getRandomDomain() {
        let randomDomain;
        try {
            const domainList = staticTestData.domainList;
            randomDomain = ArrayUtil.getRandomItemFromArray(domainList);
            logger.info(`Generated a random domain: ${randomDomain}`)
        } catch(e) {
            logger.error(`Failed to generate random domain`);
            throw e;
        }
        return randomDomain;
    }
}

export default RandomUtil;