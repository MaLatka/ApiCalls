import * as fs from "fs";
import logger from "../../project/appUtils/logger.js";

export class JsonUtil{
    static readJsonFile(filePath) {
        let jsonData = fs.readFileSync(filePath,  (err) => {
            if (err) {
                 logger.error(`Can't read json file: ${filePath}`);
                throw err;
            } else {
                 logger.info(`Read json file successfully: ${filePath}`);
            }
        });
        return JSON.parse(jsonData);
    }

    static  isJsonFormat(data) {
        try {
            JSON.stringify(data);
             logger.info(`Successfully stringified data`);
        } catch (e) {
             logger.error(`Failed to stringify data`);
            return false;
        }
        return true;
    }
}

export const configData = JsonUtil.readJsonFile("project/configData.json");
export const staticTestData = JsonUtil.readJsonFile(configData.paths.testDataFilePath);
export const apiStaticTestData = JsonUtil.readJsonFile(configData.paths.apiTestDataFilePath);
export const statusCode = JsonUtil.readJsonFile(configData.paths.statusCodeFilePath);