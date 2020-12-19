const rentingInfoData = require('./rentingInfo');
const usersData = require("./users");
const validateData = require("./validate");
const carsData = require('./cars');
const reviewData = require('./reviews')
const homeData = require("./home");
const adminData = require("./admin")

module.exports = {
    rentingInfo: rentingInfoData,
    users: usersData,
    cars: carsData,
    validate: validateData,
    reviews: reviewData,
    home: homeData,
    admin: adminData
};