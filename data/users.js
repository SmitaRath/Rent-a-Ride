const mongoCollections = require('../config/mongoCollections');
const usersColl = mongoCollections.users;
const rentingInfoColl = mongoCollections.rentingInfo;
const carsColl = mongoCollections.cars;
const reviewColl = mongoCollections.reviews;
const bcrypt = require("bcrypt");
const saltRounds = 12;
const {ObjectID, ObjectId} = require("mongodb");
const validate = require("./validate");

//fetching user with id
async function getUserById(id){
    let parsedId = ObjectID(id);
    const userCollections = await usersColl();
    const user = await userCollections.findOne({_id:parsedId});
    if(user===null) throw `Could not find any user for id ${id}`;
    user._id = user._id.toString();
    user.dob=validate.formatDateInString(user.dob);
    return user;
}

//fetching user with Emailid
/*async function getUserByEmailId(emailIDParam){
    const userCollections = await users();
    const user = await userCollections.findOne({emailID:emailIDParam});
    if(user===null) throw `Could not find any user for id ${emailIDParam}`;
    user._id = user._id.toString();
    return user;
} */

//getting all the users
async function getAllUsers(){
    const userCollections = await usersColl();
    const users = await userCollections.find({},{ projection: { _id: 0, emailID: 1,driverLicense:1}}).toArray();
    return users; 
}

//login function
async function login(emailIDParam,password){
    let loginResult = false;
    const userCollections = await usersColl();
    const user = await userCollections.findOne({emailID:emailIDParam.toLowerCase()});
    if(user===null) throw `Email Address or password is invalid`;
    user._id=user._id.toString();
    user.dob=validate.formatDateInString(user.dob);
    loginResult = await bcrypt.compare(password,user.hashedPassword);
    if(loginResult) return user;
    else throw `Email address or password is invalid`;
}


async function addProfilePicture(id, profilePicture) {
    const userCollection = await usersColl();
    let parsedId = ObjectID(id);
    let updatedUserData = {};
    updatedUserData.profilePicture = profilePicture;
    const updateInfoUser = await userCollection.updateOne({ _id: parsedId }, { $set: updatedUserData });
    const updatedUser = await getUserById(id);
    return updatedUser;
}

// creating a new user @SmitaRath
async function createUser(userObject){

    validate.validateString(userObject.firstName);
    if(userObject.lastName.trim()){
        validate.validateString(userObject.lastName);
        userObject.lastName=userObject.lastName.trim();
    }
    const userDob = validate.validateDate(userObject.dob);
    validate.validateEmailId(userObject.emailID);
    validate.validateDriverLicenseNumber(userObject.driverLicense,userObject.state);
    validate.validateString(userObject.zip);

    // hashing password @SmitaRath
    const hash = await bcrypt.hash(userObject.password,saltRounds);

    //creating new user object @SmitaRath
    const newUser = {
        firstName : userObject.firstName.trim(),
        lastName : userObject.lastName,
        dob : userDob,
        emailID : userObject.emailID.toLowerCase(),
        driverLicense : userObject.driverLicense.toUpperCase(),
        profilePicture : "",
        city : userObject.city,
        state : userObject.state,
        zip : userObject.zip,
        hashedPassword : hash,
        reviews : [],
        rentedCar : "",
        postedCars : [],
        pastRentedCars : [],
        savedCars : []
    }

    const userCollections = await usersColl();
    const insertedInfo = await userCollections.insertOne(newUser);
    if(insertedInfo.insertedCount===0) throw `New User cannot be added`;

    const addedNewUser = await getUserById(insertedInfo.insertedId.toString());
   // addedNewUser.dob=validate.formatDateInString(addedNewUser.dob);
    return addedNewUser;
}

async function createUserWithoutHash(userObject){
    // hashing password @SmitaRath
    validate.validateString(userObject.firstName);
    if(userObject.lastName.trim()){
        validate.validateString(userObject.lastName);
        userObject.lastName=userObject.lastName.trim();
    }
    const userDob = validate.validateDate(userObject.dob);
    validate.validateEmailId(userObject.emailID);
    validate.validateDriverLicenseNumber(userObject.driverLicense,userObject.state);
    validate.validateString(userObject.zip);
    //const hash = await bcrypt.hash(userObject.password,saltRounds);

    //creating new user object @SmitaRath
    const newUser = {
        firstName : userObject.firstName.trim(),
        lastName : userObject.lastName,
        dob : userDob,
        emailID : userObject.emailID.toLowerCase(),
        driverLicense : userObject.driverLicense.toUpperCase(),
        profilePicture : "",
        city : userObject.city,
        state : userObject.state,
        zip : userObject.zip,
        hashedPassword : userObject.password,
        reviews : [],
        rentedCar : "",
        postedCars : [],
        pastRentedCars : [],
        savedCars : []
    }

    const userCollections = await usersColl();
    const insertedInfo = await userCollections.insertOne(newUser);
    if(insertedInfo.insertedCount===0) throw `New User cannot be added`;

    const addedNewUser = await getUserById(insertedInfo.insertedId.toString());
   // addedNewUser.dob=validate.formatDateInString(addedNewUser.dob);
    return addedNewUser;
}

//updating user
async function updateUser(userObject,id){
    let parsedId = ObjectID(id);

    validate.validateString(userObject.firstName);
    if(userObject.lastName.trim()){
    validate.validateString(userObject.lastName);
    userObject.lastName=userObject.lastName.trim();
    }
    const userDob = validate.validateDate(userObject.dob);
    validate.validateDriverLicenseNumber(userObject.driverLicense,userObject.state);
    validate.validateString(userObject.zip);

    const updatedUser = {
        firstName : userObject.firstName.trim(),
        lastName : userObject.lastName,
        dob : userDob,
        driverLicense:userObject.driverLicense.toUpperCase(),
        city : userObject.city,
        state : userObject.state,
        zip : userObject.zip

    }
    const userCollections = await usersColl();
    const updatedInfo = await userCollections.updateOne({ _id: parsedId },{ $set: updatedUser});

    const modifiedUser = await getUserById(id);
  //  modifiedUser.dob=validate.formatDateInString(modifiedUser.dob);
    return modifiedUser;
}

async function getPastRentedCars(id){
     let pastRentedArray=[];
     let parsedId = ObjectID(id);
     const userCollection = await usersColl();
     const pastRented = await userCollection.findOne({_id:parsedId},{ projection:{_id:0,pastRentedCars:1}});
     const rentingInfoCollection = await rentingInfoColl();
     const carCollection = await carsColl();
     const reviewCollection = await reviewColl();
     for(let arr of pastRented.pastRentedCars){
        const rentedCar = await rentingInfoCollection.findOne({_id:ObjectID(arr)});
        const carInfo= await carCollection.findOne({_id:ObjectID(rentedCar.carId)});
        rentedCar.brand = carInfo.brand;
        rentedCar.model=carInfo.model;
        rentedCar.type=carInfo.type;
        rentedCar._id=rentedCar._id.toString();
        rentedCar.startDate=validate.formatDateInString(rentedCar.startDate);
        rentedCar.endDate=validate.formatDateInString(rentedCar.endDate);
        if(rentedCar.status) 
        { 
            const reviewInfo = await reviewCollection.findOne({rentingId:rentedCar._id});
            if(reviewInfo==null)
            rentedCar.review = true;
            else
            rentedCar.review = false;
        }
        else rentedCar.review=false; 
        pastRentedArray.push(rentedCar);
     }
     //return pastRentedArray;
     let sortData= pastRentedArray.sort((a,b)=>{
        return new Date(b.endDate)-new Date(a.endDate);
    });
    return sortData.slice(0,50);
}

async function getSavedCars(id){
    let savedCars=[];
    let parsedId = ObjectID(id);
    const userCollection = await usersColl();
    const savedCarsVar = await userCollection.findOne({_id:parsedId},{ projection:{_id:0,savedCars:1}});
    const carCollection = await carsColl();
    for(let arr of savedCarsVar.savedCars){
       const carInfo= await carCollection.findOne({_id:ObjectID(arr)});
       carInfo._id=carInfo._id.toString();
       savedCars.push(carInfo);
    }
    return savedCars.slice(0,50);
}

async function getCurrentlyRentedCar(id){
    let parsedId = ObjectID(id);
    const userCollection = await usersColl();
    const rentedCarVar = await userCollection.findOne({_id:parsedId},{projection:{_id:0,rentedCar:1}});
    if(rentedCarVar.rentedCar)
    {
    const rentingInfoCollection = await rentingInfoColl();
    const carCollection = await carsColl();
    const rentedCarInfo = await rentingInfoCollection.findOne({_id:ObjectID(rentedCarVar.rentedCar)});
    const carInfo = await carCollection.findOne({_id:ObjectID(rentedCarInfo.carId)});
    rentedCarInfo.brand = carInfo.brand;
    rentedCarInfo.model=carInfo.model;
    rentedCarInfo.type=carInfo.type;
    rentedCarInfo.startDate=validate.formatDateInString(rentedCarInfo.startDate);
    rentedCarInfo.endDate=validate.formatDateInString(rentedCarInfo.endDate);
    rentedCarInfo._id=rentedCarInfo._id.toString();
    return rentedCarInfo;
    }
    else
    return "";

}

async function getPostedCars(id){
    const carCollection = await carsColl();
    const postedCarsVar = await carCollection.find({ownedBy:id}).toArray();
    let modifiedList = postedCarsVar.map((arr)=> {
        arr._id=arr._id.toString();
        return arr;
    });
    return modifiedList.slice(0,50);
}

async function updatePastRentedCars(){
    const today=new Date();
    const userCollection = await usersColl();
   // const user = await userCollection.findOne({_id:ObjectID(id)});
     const userList = await userCollection.find({}).toArray();
    const rentingInfoCollection = await rentingInfoColl();
    for(let user of userList)
    {
    if(user.rentedCar)
    {
        
        const rentingData = await rentingInfoCollection.findOne({_id:ObjectID(user.rentedCar)});
        if(rentingData.endDate.getDate()<today.getDate()){
            const updatedUserData = await userCollection.updateOne({_id:ObjectID(user._id)},{ $addToSet : { pastRentedCars: user.rentedCar },$set:{rentedCar:""}});
        }
    }

    if(user.postedCars.length!=0){
        for(let arr of user.postedCars)
        {
            const rentingData = await rentingInfoCollection.find({carId:arr}).toArray();
            for(let arr1 of rentingData){
                if(arr1.endDate.getDate()<today.getDate())
                    await rentingInfoCollection.updateOne({_id:arr1._id},{$set:{currentStatus:"C"}});
            }
        }
        
    }
}
}

async function getAllOrders(userId){
    const returnArray=[];
    const postedCars = await getPostedCars(userId);
    const rentingInfoCollection = await rentingInfoColl();
    for(let arr of postedCars){
        const rentingInfo = await rentingInfoCollection.find({carId:arr._id}).toArray();
        for(let arr1 of rentingInfo){
            arr1._id=arr1._id.toString();
            arr1.startDate=validate.formatDateInString(arr1.startDate);
            arr1.endDate=validate.formatDateInString(arr1.endDate);
            arr1.model=arr.model;
            arr1.brand=arr.brand;
            arr1.type=arr.type;
            arr1.licensePlate=arr.licensePlate;
            arr1.pfa=false;
            if(arr1.bookingStatus==="A") arr1.bookingStatus="Approved";
            if(arr1.bookingStatus==="R") arr1.bookingStatus="Rejected";
            if(arr1.bookingStatus==="PFA") 
            {
                arr1.bookingStatus="Pending for Aprroval";
                arr1.pfa=true;
            }
            if(arr1.currentStatus==="C")  arr1.currentStatus="Closed";
            if(arr1.currentStatus==="O")  arr1.currentStatus="Open";
            returnArray.push(arr1);
        }
    }

    //returnArray;
    let sortData= returnArray.sort((a,b)=>{
        return new Date(b.startDate)-new Date(a.startDate);
    });
    return sortData.slice(0,50);
}

//Use this function for replacing the whole column with new sent parameter
async function updatePostedArray(id,postedArray){
    let parsedId=ObjectID(id);
    const updatedUser =
    {
        postedCars : postedArray
    };
    const userCollection = await usersColl();
    const updatedInfo = await userCollection.updateOne({_id:parsedId},{ $set: updatedUser});
}

async function updatePastRentedArray(id,pastRentedArray){
    let parsedId=ObjectID(id);
    const updatedUser =
    {
        pastRentedCars : pastRentedArray
    };
    const userCollection = await usersColl();
    const updatedInfo = await userCollection.updateOne({_id:parsedId},{ $set: updatedUser});
}

async function updateSavedCarsArray(id,savedCarsArray){
    let parsedId=ObjectID(id);
    const updatedUser =
    {
        savedCars : savedCarsArray
    };
    const userCollection = await usersColl();
    const updatedInfo = await userCollection.updateOne({_id:parsedId},{ $set: updatedUser});
}

async function updateReviewsArray(id,reviewsArray){
    let parsedId=ObjectID(id);
    const updatedUser =
    {
        reviews : reviewsArray
    };
    const userCollection = await usersColl();
    const updatedInfo = await userCollection.updateOne({_id:parsedId},{ $set: updatedUser});
}

async function updateRented(id,rentedCarVar){
    let parsedId=ObjectID(id);
    const updatedUser =
    {
        rentedCar : rentedCarVar
    };
    const userCollection = await usersColl();
    const updatedInfo = await userCollection.updateOne({_id:parsedId},{ $set: updatedUser});
}

//Use these functions for pushing single variable to the Array
async function updatePastRentedPatch(id,pastRentedCarVar){
    let parsedId=ObjectID(id);
    const userCollection = await usersColl();
    const updatedUserData = await userCollection.updateOne({_id:parsedId},{ $addToSet : { pastRentedCars: pastRentedCarVar }});
}


async function updatePostedCarPatch(id,postedCarVar){
    let parsedId=ObjectID(id);
    const userCollection = await usersColl();
    const updatedUserData = await userCollection.updateOne({_id:parsedId},{ $addToSet : { postedCars: postedCarVar }});
}

async function updateSavedCarPatch(id,savedCarVar){
    let parsedId=ObjectID(id);
    const userCollection = await usersColl();
    const updatedUserData = await userCollection.updateOne({_id:parsedId},{ $addToSet : { savedCars: savedCarVar }});
    return updatedUserData
}

async function updateReviewPatch(id,reviewVar){
    let parsedId=ObjectID(id);
    const userCollection = await usersColl();
    const updatedUserData = await userCollection.updateOne({_id:parsedId},{ $addToSet : { reviews: reviewVar }});
}

async function checkOldPassword(id,passwordVar){
    let loginResult = false;
    const userCollections = await usersColl();
    const user = await userCollections.findOne({_id:ObjectID(id)});
    if(user===null) throw `User not available`;
    user._id=user._id.toString();
    loginResult = await bcrypt.compare(passwordVar,user.hashedPassword);
    if(loginResult) throw `New password is same as old password`;
    else 
    return;
} 

async function changePassword(id,passwordVar){
    checkOldPassword(id,passwordVar);
    const hash = await bcrypt.hash(passwordVar,saltRounds);
    const userCollections = await usersColl();
    const updatedInfo = await userCollections.updateOne({_id:ObjectID(id)},{$set:{hashedPassword:hash}});
    if(updatedInfo.modifiedCount==0) return false;
    else
    return true;
}

module.exports={
    login,
    createUser,
    createUserWithoutHash,
    updateUser,
    getUserById,
    getAllUsers,
    addProfilePicture,
    getCurrentlyRentedCar,
    getPastRentedCars,
    getSavedCars,
    getPostedCars,
    updatePastRentedCars,
    getAllOrders,
    updatePastRentedArray,
    updatePastRentedPatch,
    updateSavedCarPatch,
    updateSavedCarsArray,
    updateRented,
    updateReviewPatch,
    updateReviewsArray,
    updatePostedArray,
    updatePostedCarPatch,
    checkOldPassword,
    changePassword
}