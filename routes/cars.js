const express = require("express");
const data = require("../data");
const router = express.Router();
const dataInfo = require('../data');
const carsData = dataInfo.cars;
const usersData = dataInfo.users;
const validation = dataInfo.validate;
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'public/uploads'});
const fs = require('fs');
const { default: Axios} = require('axios');
const { cars } = require("../config/mongoCollections");
const { stringify } = require("querystring");
//const data = require('../data');
const reviewsData = data.reviews;

//images
router.post('/upload/carPictures/:id', upload.array('carPictures', 10), async (req, res) => {
    
    const car = await carsData.getCarById(req.params.id);
    var file = req.files;
    let img;
    let encode_image;
    let returnArray=[];
    let finalImg;
    for(let arr of file){
        img = fs.readFileSync(arr.path);
        encode_image = img.toString('base64');
        
        finalImg = {
        contentType: arr.mimetype,
        image: Buffer.from(encode_image, 'base64')
        }
        returnArray.push(finalImg);
    }
    const user = await usersData.getUserById(req.session.AuthCookie);
    const addingCarPictures = await carsData.addCarPictures(req.params.id, returnArray);
    let carReviews = await reviewsData.getreviewsPerCar(req.params.id);
    res.render("cars/carprofile", {
        success: true,
        cars: addingCarPictures,
        user: user,
        carprofileFlag: true,
        editFlag: true,
        message: "Car Images Posted Successfully",
        carId: addingCarPictures._id,
        reviews: carReviews
    });
});

router.get('/carpics/:index', async (req, res) => {
    try{
    const car = await carsData.getCarById(req.session.carImageId);
    const carImages = car.images;
    if(carImages == ""){
      return res.status(400).send({
        message: 'No Profile Pic Found!'
     })
    } else {

        res.contentType('image/jpeg');
        res.send(carImages[req.params.index].image.buffer);

    }
    return;
}
catch(e){
    res.status(500).send();
}
  });

router.get('/createCar', async (req, res) => {
    try {
        res.render('cars/carcreation');
    } catch (error) {
        console.log(error);
        res.statusCode(500).send();
    }
});

router.post('/createCar', async (req, res) => {
    const newCarData = req.body;
    const f1 = req.body.f1;
    const f2 = req.body.f2;
    const f3 = req.body.f3;
    const f4 = req.body.f4;
    console.log(f1, f2, f3, f4);
    const errorList = [];
    let allCars;
    let userId = req.session.AuthCookie;
    let featuesArr = [];
    if(f1!== undefined) featuesArr.push(f1);
    if(f2!== undefined) featuesArr.push(f2);
    if(f3!== undefined) featuesArr.push(f3);
    if(f4!== undefined) featuesArr.push(f4);
    newCarData.features= featuesArr;
    if (userId !== undefined)
        newCarData.ownedBy = userId;
    try {
        allCars = await carsData.getAllCars();
    } catch(error) {
        console.log(error);
    }
//Validation
    try {
        validation.validateString(newCarData.brand);
    } catch(error) {
        errorList.push("Brand: " + error );
    }
    try {
        validation.validateString(newCarData.model);
    } catch(error) {
        errorList.push("Model:" + error);
    }
    //validate makeYear has  to be  done
    try {
        validation.validateString(newCarData.type);
    } catch(error) {
        errorList.push("Type: " + error);
    }
    try {
        validation.validateString(newCarData.color);
    } catch(error) {
        errorList.push("Color: " + error);
    }
    /*try {
        validation.validateArray(newCarData.features);
    } catch(error) {
        errorList.push("Features: " + error);
    }*/
    
    try {
        validation.validateNumber(newCarData.noOfPassengers);
    } catch(error) {
        errorList.push("Features: " + error);
    }
    try {
        validation.validateNumber(newCarData.bootSpace);
    } catch(error) {
        errorList.push("Boot Space: " + error);
    }
    try {
        validation.validateNumber(newCarData.houseNo);
    } catch(error) {
        errorList.push("House No:" + error);
    }
    try {
        validation.validateString(newCarData.street);
    } catch(error) {
        errorList.push("Street: " + error);
    }
    /*try {
        validation.validateString(newCarData.city);
    } catch(error) {
        errorList.push("City: " + error);
    }
    try {
        validation.validateString(newCarData.state);
    } catch(error) {
        errorList.push("State: " + error);
    }*/
    try{
        validation.validateString(newCarData.zip);
        const { data } = await Axios.get("http://ziptasticapi.com/"+newCarData.zip);
        if(data.error) 
        {
        newCarData.city="";
        newCarData.state="";
        throw 'Sent Parameter is invalid';
        }
        else{
        newCarData.city=data.city;
        newCarData.state=data.state;
        }
    }catch(error){
        errorList.push("Zip: " + error);
    }
    /*try {
        validation.validateNumber(newCarData.zip);
    } catch(error) {
        errorList.push("Zip: " + error);
    }*/
    try {
        validation.validateNumber(newCarData.price);
    } catch(error) {
        errorList.push("Price: " + error);
    }
//Validation Ends   

    try {
        const newCar = await carsData.createCar(newCarData);
        let userId = newCar.ownedBy;
        const user = await usersData.getUserById(userId);
        res.render("cars/carprofile", {
            success: true,
            cars: newCar,
            user: user,
            carprofileFlag: true,
            message: "Car Created Successfully",
            carId: newCar._id
        });
    }
    catch(error) {
        console.log(error);
        res.status(400).json({ Error: error });
    }
});

router.get('/profile/:id', async(req, res)=> {
    req.session.carImageId=req.params.id;
    let  userId= req.session.AuthCookie;
    try{
        const car = await carsData.getCarById(req.params.id);
        let owner = car.ownedBy;

    
        //const user = await usersData.getUserById(userId);

        let carReviews = await reviewsData.getreviewsPerCar(req.params.id);

        //res.render("cars/carprofile", {cars: car, carprofileFlag:true, user: user, id: car._id, reviews: carReviews,});
        const user = await usersData.getUserById(owner);
        if (userId === owner)
            res.render("cars/carprofile", {cars: car, carprofileFlag:true, editFlag:true, user: user, id: car._id, reviews: carReviews});
        else 
        res.render("cars/carprofile", {cars: car, carprofileFlag:true, bookFlag:true, user: user, carId: car._id, reviews: carReviews});

    } catch(error){
        res.status(401);
        res.json({message:error});
    }
})


module.exports = router;