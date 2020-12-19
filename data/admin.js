let { ObjectID } = require("mongodb"); 
const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;

const carInfo = require('./cars');
const userInfo = require('./users');
const reviewsInfo = require('./reviews')

let exportedMethods = {
    async getAllData(){
        return await reviewsInfo.getAllReviews();
        /*let data = {thelength : allReviews.length}
        var countLender = 0;
        data.forEach((val) => {
            if(val.lenderReply === ""){
                countLender = countLender + 1;
            }
        })
        data.reviewsNoLender = countLender;*/

        
    },

    async removeReview(id) {
        if(!id) throw 'Provide ID to search a review';
        id = id.toString();
        if(typeof id !== 'string' || id.length === 0) throw 'Id should be a non empty string';
        if(id.length !== 24) throw 'Not a valid ID';
        let parsedID = ObjectID(id);
    
        var review = await this.getReviewById(id);
    
        const reviewCollection = await reviews();
        const deleteInfo = await reviewCollection.removeOne({_id: parsedID});
        if(deleteInfo.deletedCount === 0) throw `Could not delete review with id of ${parsedID}`;

        let user = await usersCollection();
        let userUpdate = await user.updateOne({_id:ObjectID(review.userId)},{ $pull: { reviews: (review._id).toString()}});


        let car = await carsCollection();
        let carUpdate = await user.updateOne({_id:ObjectID(review.carId)},{ $pull: { reviews: (review._id).toString()}});

    
        return {reviewID: id, deleted: true};   
    }
}


module.exports = exportedMethods;