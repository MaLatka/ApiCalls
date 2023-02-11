import logger from "../../project/appUtils/logger.js";

class ObjectUtil {

    static async checkOrderOfPropertyValues(data, property, order) {
        const dataToCheck = this.getAllValuesOfAPropertyFromData(data, property);
        return this.checkHowValuesAreSorted(dataToCheck, order);
    }

    static async checkHowValuesAreSorted(array, order) {
        let result;
        try {
            switch(order) {
                case "ascending":
                    result = array.every(function (elem, index) {
                        return index === 0 || elem >= array[index - 1];
                    });
                    break;
                case "descending":
                    result = array.every(function (elem, index) {
                        return index === 0 || elem <= array[index - 1];
                    })
                    break;
                default:
                    result = false;
                    break;
            }
             logger.info(`Successfully checked order of values`);
        } catch (e) {
             logger.error(`Failed to check order of values`);
            throw e;
        }
        return result;
    }

    static getAllValuesOfAPropertyFromData(data, property) {
        let result;
        try {
            if(!Array.isArray(data) && data === Object(data)) {
                result = Object.keys(data).find(key => key === property);
            } else {
                result = [];
                data.map((el) => result.push(el[property]));
            }
             logger.info(`Successfully got all values of ${property} from data`);
        } catch (e) {
             logger.error(`Failed to get all values of ${property} from data`);
            throw e;
        }
        return result;
    }

    static getObjectWithASpecificPropertyValueFromData(data, property, value) {
        let result;
        try {
            if (!Array.isArray(data) && data === Object(data)) {
                result = data;
            } else {
                result = data.find(el => el[property] === value);
            }
             logger.info(`Successfully found object where ${property} : ${value}`);
        } catch (e) {
             logger.error(`Failed to find an object where ${property} : ${value}`);
            throw e;
        }
        return result;
    }
}

export default ObjectUtil;