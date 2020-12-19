const express = require('express');
const { reviews } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const dataInfo = require("../data");
const validation = dataInfo.validate;
const rentingData = data.rentingInfo;
const carInfo = require('../data/cars')
const xss = require('xss');


router.get('/postReview/:id', async (req, res) => {
    try {
        let rentId = req.params.id;
        const oneRenting = await rentingData.getrentById(rentId);
        req.session.ids = {userId : oneRenting.userId, carId : oneRenting.carId, rentId : rentId}
        const car = await carInfo.getCarById((oneRenting.carId).toString())
        res.render('reviews/createReview', {carName: car.brand + " " + car.model});
    } catch (error) {
        console.log(error);
        res.statusCode(500).send();
    }
});


router.get('/reply/:id', async (req, res) => {
    //car id
    try {
        let carId = req.params.id;
        //req.session.ids = {userId : rentId.userId, carId : rentId.carId, rentId : rentId}
        let carsWithNoReply = [];
        const carsWithReviews = await reviewsData.getreviewsPerCar(carId);
        /*for(let i = 0; i < carsWithReviews.length; i++){
            console.log(carsWithReviews[i].lenderReply);
            if(carsWithReviews[i].lenderReply == ""){
                carsWithNoReply.push(carsWithNoReply[i]);
            }
        }*/

        carsWithReviews.forEach((val) => {
            if(val.lenderReply === "") {
                carsWithNoReply.push(val);
            }
        });
        
        res.render('reviews/ownerReplies', {reviews : carsWithNoReply});
    } catch (error) {
        console.log(error);
        res.statusCode(500).send();
    }
});


router.post('/submitReview', async (req, res) => {
    var reviewPostData = req.body;
    xss(req.body.rating);
    xss(req.body.comment);
    xss(req.body.carCondition);
    xss(req.body.ownerService);
    xss(req.body.carPickUp);
     xss(req.body.cleanliness)
    const errorList=[];

    if(!reviewPostData){
        //res.status(400).json({ error: 'You must provide review data' });
        //validation
        return;
    }
    /*
    if(!reviewPostData.rating){
        res.status(400).json({ error: 'You must provide review rating' });
        return;
    }
    if(!reviewPostData.comments){
        res.status(400).json({ error: 'You must provide review comment' });
        return;
    }
    */

    try {
        validation.validateNumber(Number.parseInt(reviewPostData.rating));
    } catch (e) {
        errorList.push(`Rating: ${e}`);
    }

    try {
        validation.validateString(reviewPostData.comment);
    } catch (e) {
        errorList.push(`comments: ${e}`);
    }


    if(errorList.length>0){
        res.status(400);
        res.render("reviews/createReview",{
            hasErrors:true,
            errors:errorList,
            reviews: reviewPostData
        });
        
    }



    try {
        let {rating, carCondition, ownerService, carPickUp, cleanliness,comment} = reviewPostData;
        rating = parseInt(rating);
        carCondition = parseInt(carCondition);
        ownerService = parseInt(ownerService);
        carPickUp = parseInt(carPickUp);
        cleanliness = parseInt(cleanliness);

        let averageRating = parseFloat((rating + carCondition + ownerService + carPickUp + cleanliness) / 5);
        
        rating = averageRating;

        let lenderReply = "";
        let userId = req.session.ids.userId;
        let dateOfReview = Date()
        let carId = req.session.ids.carId;
        let rentId = req.session.ids.rentId;
        const newReview = await reviewsData.createReview(rating, comment, lenderReply, dateOfReview, userId, carId, rentId);
        
        const car = await carInfo.getCarById(carId);
        //await carInfo.updateCarRating((car._id).toString(), averageRating)
        //let isLender = false;
        /*if(userId === (car.ownedBy).toString()){
            isLender = true;
        }*/

        userReviews = await reviewsData.getReviewsPerUser(userId)
        res.render("reviews/userReviews", {
            success: true,
            reviews: userReviews,
            message: "Review Created Successfully"
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});




router.post('/reply/:id', async (req, res) => {
    const requestReviewData = req.body;
    //review id
    xss(req.body.lenderReply)
    if(Object.keys(requestReviewData).length !== 0){
        try {
            const updatedReview = await reviewsData.updateReview(req.params.id, requestReviewData.lenderReply);
            let carsWithNoReply = [];
        const carsWithReviews = await reviewsData.getreviewsPerCar(updatedReview.carId);
        carsWithReviews.forEach((val) => {
            if(val.lenderReply === "") {
                carsWithNoReply.push(val);
            }
        });
        
        res.render('reviews/ownerReplies', {
            success: true,
            reviews : carsWithNoReply,
            message: "Review Created Successfully"
        });

        } catch (e) {
            res.status(500).json({ error: e });
        }
    } else {
        res.status(400).json({error: 'No fields have been changed from their inital values, so no update has occurred'});
    }

});




router.post('/delete/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).json({ error: 'You must Supply an ID to delete' });
        return;
    }

    try {
        await reviewsData.getReviewById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Review not found' });
        return;
    }

    try {
        const deletedReview = await reviewsData.removeReview(req.params.id);

        userReviews = await reviewsData.getReviewsPerUser(req.session.ids.userId)
        res.render("reviews/userReviews", {
            success: true,
            reviews: userReviews,
            message: "Review Created Successfully"
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


module.exports = router;