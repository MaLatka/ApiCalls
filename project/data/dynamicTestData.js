import RandomUtil from "../appUtils/randomUtil.js";

const randomString =  RandomUtil.generateRandomString();

const dynamicTestData = {
    userCredentials: {
        password: randomString.toUpperCase(),
        email: randomString.slice(0, 5),
        domain:  RandomUtil.getRandomDomain()
    },

    postData: {
        userId: 1,
        title:  RandomUtil.generateRandomString(),
        body:  RandomUtil.generateRandomString()
    }
}

export default dynamicTestData;