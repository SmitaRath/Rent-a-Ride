const mongoCollections = require('../config/mongoCollections');
const { validateDate } = require('./validate');
const validateData = require("./validate");
const rentingInfo = mongoCollections.rentingInfo;
const user_db = mongoCollections.users;
const user_data_func = require("./users");


async function create(startDate, endDate, status, bookingStatus, currentStatus, totalPrice, userId, carId){
    if (!startDate || !endDate || !bookingStatus || !currentStatus || !totalPrice || !userId || !carId) throw "Error: missing input";
    if (typeof(startDate) !== "string" || typeof(endDate) !== "string" || 
        typeof(status) !== "boolean" || typeof(totalPrice) !== "number" || 
        typeof(bookingStatus) !== "string" || typeof(currentStatus) !== "string" ||
        typeof(userId) !== "string" || typeof(carId) !== "string") throw "Error: input format is wrong"
    
    date_form_start = new Date(startDate)
    date_form_end = new Date(endDate)
    /*
    if (!date_form_end || !date_form_start) throw "Error: date format is not correct";
    arr_start = startDate.split("-")
    arr_end = endDate.split("-")
    if (arr_start.length !== 3 || arr_end.length !== 3) throw "Error: date format is not correnct";
    [month, date, year] = arr_start
    console.log(date_form_start.getFullYear(), date_form_start.getMonth(), date_form_start.getDate(), arr_start)
    if (date_form_start.getFullYear() != year || 
        date_form_start.getMonth() + 1 != month ||
        date_form_start.getDate() != date) throw "Error: startDate is not correct";
    [month, date, year] = arr_end
    if (date_form_end.getFullYear() != year || 
        date_form_end.getMonth() + 1 != month ||
        date_form_end.getDate() != date) throw "Error: endDate is not correct";
    */
    //if(!validateData.validateDate(startDate) || !validateDate(endDate)) throw "Error: date is not correct"
    if (totalPrice <= 0) throw "Error: price should be bigger then 0";
    userId_obj = myDBfunction(userId)
    carId_obj = myDBfunction(carId)
    const renting_db_func = await rentingInfo();
    
    let newRenting = {
        "startDate": date_form_start,
        "endDate": date_form_end,
        status,
        bookingStatus,
        currentStatus,
        totalPrice,
        userId,
        carId
    }
    let insertInfo = await renting_db_func.insertOne(newRenting)
    if(insertInfo.insertCount === 0) throw "Error: counld not add renting info";
    const newId = insertInfo.insertedId;
    const new_rented = await getrentById(newId.toString());

    let user_db_func = await user_db()

    let user_info = await user_data_func.getUserById(userId);

    if(currentStatus === "C"){
        let past_list = user_info.pastRentedCars
        past_list.push(newId.toString())
        await user_db_func.updateOne({_id: userId_obj}, {$set: {pastRentedCars: past_list}});
        return new_rented
    }

    if(user_info.rentedCar === "") {
        await user_db_func.updateOne({_id: userId_obj}, {$set: {rentedCar: newId.toString()}});
        return new_rented;
    }
    else return new_rented;
    
}


async function getAllRenting(){
    const renting_db_func = await rentingInfo()
    const renting_list = await renting_db_func.find().toArray();

    return renting_list.slice(0,20)
}




async function getrentById(input_id){
    if(!input_id) throw "Error: No input";
    if(typeof(input_id) !== "string") throw "Error: input is not a string";
    obj_id = myDBfunction(input_id);

    const renting_db_func = await rentingInfo()
    const rent_info = await renting_db_func.findOne({_id: obj_id});

    if(rent_info === null) throw "No renting info with that id";
    return rent_info
}

async function getrentByCarId(input_id){
    if(!input_id) throw "Error: No input";
    if(typeof(input_id) !== "string") throw "Error: input is not a string";
    obj_id = myDBfunction(input_id);

    const renting_db_func = await rentingInfo()
    const rent_info = await renting_db_func.find({'carId': input_id, 'bookingStatus': 'A', 'currentStatus': 'O'}, {projection: {_id: 0, startDate: 1, endDate: 1}}).toArray();

    return rent_info
}


async function getrentByUserId(input_id){
    if(!input_id) throw "Error: No input";
    if(typeof(input_id) !== "string") throw "Error: input is not a string"
    obj_id = myDBfunction(input_id);

    const renting_db_func = await rentingInfo()
    const rent_info = await renting_db_func.find({'userId': input_id}).toArray();
    
    return rent_info
}

async function patchrentingInfo(input_id, patch_obj){
    if(!input_id || !patch_obj) throw "Error: input_id is missing"
    if(typeof(input_id) !== "string") throw "Error: input_id is not string"
    let obj_id = myDBfunction(input_id)

    const renting_db_func = await rentingInfo()
    const rent_info = await renting_db_func.findOne({_id: obj_id});
    let patch_info = {}

    if(patch_obj.startDate) patch_info.startDate = patch_obj.startDate
    if(patch_obj.endDate) patch_info.endDate = patch_obj.endDate
    if(patch_obj.bookingStatus) patch_info.bookingStatus = patch_obj.bookingStatus
    if(patch_obj.currentStatus) patch_info.currentStatus = patch_obj.currentStatus
    if(patch_obj.status) patch_info.status = patch_obj.status
    if(patch_obj.totalPrice) patch_info.totalPrice = patch_obj.totalPrice

    await renting_db_func.updateOne({_id: obj_id}, {$set: patch_info})

    return await this.getrentById(input_id)
}

async function approve(input_id){
    if(!input_id) throw "Error: input_id is missing"
    if(typeof(input_id) !== "string") throw "Error: input_id is not string"
    let obj_id = myDBfunction(input_id)
    let patch_info = {
        bookingStatus: "A",
        currentStatus: "O",
        status: true
    }
    let output = await this.patchrentingInfo(input_id, patch_info)
    return output
}

async function reject(input_id){
    if(!input_id) throw "Error: input_id is missing"
    if(typeof(input_id) !== "string") throw "Error: input_id is not string"
    let obj_id = myDBfunction(input_id)

    let user_db_func = await user_db()

    let renting_info = await this.getrentById(input_id)
    let user_info = await user_data_func.getUserById(renting_info.userId)
    
    
    let list_postedCars = user_info.pastRentedCars
    list_postedCars.push(user_info.rentedCar)
    console.log(list_postedCars)
    let user_patch = {
        pastRentedCars: list_postedCars,
        rentedCar: ""
    }
    let rentingInfo_patch = {
        bookingStatus: "R",
        currentStatus: "C"
    }
    await user_db_func.updateOne({_id: myDBfunction(renting_info.userId)}, {$set: user_patch})
    return await this.patchrentingInfo(input_id, rentingInfo_patch)
}


function myDBfunction(id) {
    let { ObjectId } = require('mongodb');

    //check to make sure we have input at all
    if (!id) throw 'Id parameter must be supplied';
  
  
    //check to make sure it's a string
    if (typeof id !== 'string') throw "Id must be a string";
  
    
    //Now we check if it's a valid ObjectId so we attempt to convert a value to a valid object ID,
    //if it fails, it will throw an error (you do not have to throw the error, it does it automatically and the catch where you call the function will catch the error just as it catches your other errors).

    let parsedId = ObjectId(id);

    //this console.log will not get executed if Object(id) fails, as it will throw an error
    return parsedId;
  }


  module.exports = {
      create, getAllRenting, getrentById, 
      getrentByCarId, getrentByUserId, patchrentingInfo, 
      approve, reject
  }