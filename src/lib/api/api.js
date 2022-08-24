const axios = require("axios");
const instance = axios.create({
    baseURL: "https://restcountries.com/v3.1/all",
    timeout: 3000,
});
module.exports = function api() {
    return new Promise((resolve, reject) => {
        instance.get("").then((e) => {
            resolve(e);
        });
    });
};
