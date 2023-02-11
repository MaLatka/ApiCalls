import { assert } from "chai";

import ApiUtil from "../appUtils/api/apiUtil.js";
import BrowserUtil from "../../framework/universalUtils/browserUtil.js";
import ObjectUtil from "../../framework/universalUtils/objectUtil.js";
import {apiStaticTestData, statusCode, JsonUtil} from "../../framework/universalUtils/jsonUtil.js";
import dynamicTestData from "../data/dynamicTestData.js";

describe("API Test", function () {

    it("returns the correct response", async function() {
        let response = await BrowserUtil.executeAction(await ApiUtil.getRequest(apiStaticTestData.postsRoute));
        assert.equal(response.status, statusCode.OK, `response status does not equal ${statusCode.OK}`);
        assert.isTrue( JsonUtil.isJsonFormat(response.data), "response data is not of JSON format");
        assert.isTrue(await ObjectUtil.checkOrderOfPropertyValues(response.data, apiStaticTestData.propertyToCheck, apiStaticTestData.expectedValuesOrder),
            `${apiStaticTestData.propertyToCheck} values are not sorted ${apiStaticTestData.expectedValuesOrder}`);

        response = await BrowserUtil.executeAction(await ApiUtil.getRequest(apiStaticTestData.postsRoute, apiStaticTestData.postData.id));
        assert.equal(response.status, statusCode.OK, `response status does not equal ${statusCode.OK}`);
        assert.include(response.data, apiStaticTestData.postData, "id and userID are not as expected");
        assert.exists(response.data.title, "response title is empty");
        assert.exists(response.data.body, "response body is empty");

        response = await BrowserUtil.executeAction(await ApiUtil.getRequest(apiStaticTestData.postsRoute, apiStaticTestData.notExistingPostId));
        assert.equal(response.status, statusCode.notFound, `response status does not equal ${statusCode.notFound}`);
        assert.isEmpty(response.data, "response data is not empty");

        response = await BrowserUtil.executeAction(await ApiUtil.postRequest(apiStaticTestData.postsRoute, dynamicTestData.postData));
        assert.equal(response.status, statusCode.created, `response status does not equal ${statusCode.created}`);
        assert.include(response.data, dynamicTestData.postData, "data from posted user is not as expected");
        assert.exists(response.data.id, "response data does not have an id");

        response = await BrowserUtil.executeAction(await ApiUtil.getRequest(apiStaticTestData.userRoute));
        assert.equal(response.status, statusCode.OK, `response status does not equal ${statusCode.OK}`);
        assert.isTrue( JsonUtil.isJsonFormat(response.data), "response data is not of JSON format");

        const foundUser = ObjectUtil.getObjectWithASpecificPropertyValueFromData(response.data, apiStaticTestData.propertyToCheck, apiStaticTestData.userData.id);
        assert.deepEqual(foundUser, apiStaticTestData.userData, "user data is not as expected");

        response = await BrowserUtil.executeAction(await ApiUtil.getRequest(apiStaticTestData.userRoute, apiStaticTestData.userData.id));
        assert.equal(response.status, statusCode.OK, `response status does not equal ${statusCode.OK}`);
        assert.deepEqual(response.data, apiStaticTestData.userData, "user data is not as expected");
    })
})