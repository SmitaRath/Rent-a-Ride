const mongoCollections = require('../config/mongoCollections');
const cars = mongoCollections.cars;
const users = mongoCollections.users;
const {ObjectID} = require("mongodb"); 
const validate = require("./validate");

async function getCarById(id) {
    let parsedId = ObjectID(id);
    const carsCollections = await cars();
    const car = await carsCollections.findOne({_id:parsedId});
    if(car===null) throw `Could not find any user for id ${id}`;
    car._id = car._id.toString();
    return car;
}

async function getAllCars() {
    const carsCollection = await cars();
    const carList = await carsCollection.find({}).toArray();
    if (!carList) throw 'No books in system';
    return carList;
}

async function addCarPictures(id, carPictures) {
    const carsCollection = await cars();
    let parsedId = ObjectID(id);
    let updatedCarData = {};
    updatedCarData.images = carPictures;
    const updateInfoCar = await carsCollection.updateOne({ _id: parsedId }, { $set: updatedCarData });
    const updatedCar = await getCarById(id);
    return updatedCar;
}


async function createCar(carObject){
    /*if (userId === undefined) {
        userId=carObject.ownedBy;
    }
    userId = userId.toString();
    console.log(userId);*/

    const newCar = {
        ownedBy : carObject.ownedBy,
        licensePlate : carObject.licensePlate,
        brand : carObject.brand.toLowerCase(),
        model : carObject.model.toLowerCase(),
        makeYear : carObject.makeYear,
        type : carObject.type.toLowerCase(),
        color : carObject.color,
        features : carObject.features,
        noOfPassengers : carObject.noOfPassengers,
        bootSpace : carObject.bootSpace,
        images : "",
        houseNo : carObject.houseNo,
        street : carObject.street,
        city : carObject.city,
        state : carObject.state,
        zip : carObject.zip,
        price : carObject.price,
        reviews : [],
        rating : 0,
        bookingIds : [],
        rented : false
    }

    const carsCollections = await cars();
    const insertedInfo = await carsCollections.insertOne(newCar);
    const usersCollection = await users();
    const addedNewCar = await getCarById(insertedInfo.insertedId.toString());
    //const user = await usersCollection.getUserById(ownedBy);
    let parsedId = ObjectID(carObject.ownedBy);
    const updateInfo = await usersCollection.updateOne(
        {_id: parsedId},
        {$addToSet: {postedCars: insertedInfo.insertedId.toString()}}
    );
    
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update in user posted car failed';

    if(insertedInfo.insertedCount===0) throw `New User cannot be added`;

    //const addedNewCar = await getCarById(insertedInfo.insertedId.toString());
    return addedNewCar;
}

async function deleteCar(id) {
    try{
        car = await getCarById(id);
    } catch(e) {
        console.log(e);
        return;
    }
    let parsedId;
    try {
        parsedId = ObjectID(id);
    }catch(e) {
        throw 'Id is not a valid ObjectID';
    }
    const carsCollection = await cars();
    const deletedInfo = await carsCollection.removeOne({_id: parsedId});
    if (deletedInfo.deletedCount === 0) {
        throw `Could not delete car with id of ${id}`;
    }
    return {"bookID" : id, "deleted" : true};
}

async function addCarPictures(id, carPictures) {
    const carsCollection = await cars();
    let parsedId = ObjectID(id);
    let updatedCarData = {};
    updatedCarData.images = carPictures;
    const updateInfoCar = await carsCollection.updateOne({ _id: parsedId}, { $set: updatedCarData});
    if ( updateInfoCar.modifiedCount === 0 && updateInfoCar.deletedCount === 0) throw "Could not upload car images";
    const updatedCar = await getCarById(id);
    return updatedCar;
}

async function updateCarRating(id, rating) {
    const carsCollection = await cars();
    let parsedId = ObjectID(id);
    let updatedCarData = {};
    
    updatedCarData.rating = rating;
    const updateInfoCar = await carsCollection.updateOne({_id: parsedId}, {$set: updatedCarData});
    if(updateInfoCar.modifiedCount === 0 && updateInfoCar.deletedCount === 0) throw "Could not update rating";
    const updatedCar = await getCarById(id);
    return updatedCar;
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    deleteCar,
    addCarPictures,
    updateCarRating
};