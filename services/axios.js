const axios = require("axios")

const api = axios.create({
    baseURL: 'http://localhost:3002',
});

module.exports = api;