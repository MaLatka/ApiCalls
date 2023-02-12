import axios from "axios";
import logger from "../logger.js";
import {configData} from "../../../framework/universalUtils/jsonUtil.js";

export default class ApiUtil {
    static async getRequest(route, routeId) {
        let response;
        try {
            routeId = routeId || "";
            response =  await axios.get(`${configData.apiUrl}/${route}/${routeId}`);
        } catch (e) {
            response = e.response;
        }
         logger.info(`Successfully fetched respone from: ${configData.apiUrl} with status code: ${response.status}`);
        return {
            status: response.status,
            data: response.data
        }
    }

    static async postRequest(path, data) {
        let response;
        try {
            response = await axios.post(`${configData.apiUrl}/${path}`, data);
             logger.info(`Successfully made a post request with status code: ${response.status}`);
        } catch(e) {
            response = e.response;
             logger.error(`Error while making a post request with status code: ${response.status}`);
            throw e;
        }
        return response;
    }
}