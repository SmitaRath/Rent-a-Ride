const express = require('express');
const router = express.Router();
const data = require("../data");
const rentingInfoData = data.rentingInfo;
const carData = data.cars;
const userData = data.users;

const xss = require('xss');

router.get('/', async (req, res) => {
    try{
        const renting_list = await rentingInfoData.getAllRenting();
        res.status(200).json(renting_list);
    } catch(e){
        res.status(404).json({message:e})
    }
})

router.get('/find_date/:id', async (req, res) => {
    try{
        
        let user_id = req.session.AuthCookie
        let user_info = await userData.getUserById(req.session.AuthCookie)
        let user_name = user_info.emailID
        //test
        //req.session.car = '5fd69741f72d5d06dcb70f9a'
        req.session.car = req.params.id;
        let booked_date_arr = await rentingInfoData.getrentByCarId(req.session.car);
        let out_arr = []
        for(let i in booked_date_arr){
            out_arr.push([booked_date_arr[i].startDate.toISOString().split('T')[0], booked_date_arr[i].endDate.toISOString().split('T')[0]])
        }
        //console.log(out_arr)
        let car_info = await carData.getCarById(req.session.car)
        let car_name = car_info.brand + " " + car_info.model
        let price = car_info.price
        res.status(200).render("rentingInfo/create_renting", { user_id: user_name, car_id: car_name, carId:req.session.car, price: price, booked_date_arr: out_arr});
    } catch(e){
        console.log(e)
        res.status(404).render("rentingInfo/create_renting", {error_flag: true, message: e})
    }
})

router.post('/find_date', async (req, res) => {
    try{
        if(!req.body || !req.body.start_date || !req.body.end_date){
            res.status(401).render('rentingInfo/create_renting', {error_flag: true, message: "Missing dates"})
        }
        xss(req.body.start_date)
        xss(req.body.end_date)
        let startDate = req.body.start_date
        let endDate = req.body.end_date
        let calculate_start = new Date(startDate)
        let calculate_end = new Date(endDate)
        
        let carId = req.session.car;
        let difference_in_time = calculate_end.getTime() - calculate_start.getTime()
        let difference_in_day = difference_in_time / (1000 * 3600 * 24);
       // let car_info = await carData.getCarById(carID)
        let car_info = await carData.getCarById(carId.toString())
        let totalPrice = car_info.price * (difference_in_day + 1)
        let new_rent = await rentingInfoData.create(startDate, endDate, false,"PFA","O", totalPrice, req.session.AuthCookie, carId)

        res.redirect("/rentingInfo/confirm/" + new_rent._id)
    } catch(e){
        console.log(e)
        res.status(404).render("rentingInfo/create_renting", {error_flag: true, message: e})
    }
})

router.get('/confirm/:id', async (req, res) => {
    try{
        let rent_info = await rentingInfoData.getrentById(req.params.id)
        let user_info = await userData.getUserById(rent_info.userId)
        let user_name = user_info.emailID

        let car_info = await carData.getCarById(rent_info.carId)
        let car_name = car_info.brand + " " + car_info.model
        let car_owner = car_info.ownedBy;

        let link_user = `/users/customerProfile/${rent_info.userId}`
        let link_car_owner = `/users/customerProfile/${car_owner}`

        if(car_owner !== req.session.AuthCookie){
            res.status(200).render("rentingInfo/confirm", {new_rent: rent_info, user_name: user_name, link_user: link_user, link_car_owner: link_car_owner, car_name: car_name, is_login: false})
        } else res.status(200).render("rentingInfo/confirm", {new_rent: rent_info, user_name: user_name, link_user: link_user, link_car_owner: link_car_owner, car_name: car_name, is_login: true})
    } catch(e){
        res.status(404).render("rentingInfo/confirm", {error_flag: true, message: e})
    }
    
})

router.post('/confirm/approve/:id', async(req, res) => {
    try{
        let input_id = req.params.id
        await rentingInfoData.approve(input_id)
        res.json({success: true, message: "You got approved!"})
    } catch(e){
        res.status(404).json({message: "Error"})
    }
})

router.post('/confirm/reject/:id', async(req, res) => {
    try{
        let input_id = req.params.id
        let renting_info = await rentingInfoData.reject(input_id)
        res.json({success: true, message: "You got rejected :("})
    } catch(e){
        res.status(404).json({message: "Error"})
    }
})




module.exports = router;