const express = require("express");
const router = express.Router();
const dataInfo = require("../data");
const homeInfo = dataInfo.home;
const usersData = dataInfo.users;
const carsData = dataInfo.cars;
const validation = dataInfo.validate;
const xss = require('xss');

let todayDate=new Date();
let today=validation.formatDateInString(todayDate);

router.get("/", async(req,res)=>{
    try{
    await usersData.updatePastRentedCars();
    res.status(200).render("home/welcome",{minDate:today});
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/home", async(req,res)=>{
   try{
   if(!req.session.AuthCookie){
   await usersData.updatePastRentedCars();
   }
   xss(req.body.zip);
   const carList = await homeInfo.getTopRatedCars(req.body.zip);
   if(carList.length!=0){
    if(req.session.AuthCookie){
        req.session.searchData=carList;
    res.status(200).render("home/home",{cars:carList,availFlag:true,login:true,minDate:today,sortFlag:true});
    }
   else 
   res.status(200).render("home/home",{cars:carList,availFlag:true,minDate:today,sortFlag:true});
   }
   else{
    if(req.session.AuthCookie)
    res.render("home/home",{Message:"Cars are not available for the provided  zip code, try different zip code",login:true,minDate:today});
    else
    res.render("home/home",{Message:"Cars are not available for the provided  zip code, try different zip code",minDate:today});
}
    }
    catch(error){
        res.status(500).send();
    }

});

router.get("/home", async(req,res)=>{
    try{
    if(req.session.AuthCookie)
    res.render("home/home",{Message:"Search cars based on your preference",login:true,minDate:today});
    else
    res.render("home/home",{Message:"Search cars based on your preference",minDate:today});
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/home/search", async(req,res)=>{
    try{
    xss(req.body.zip);
    xss(req.body.type);
    xss(req.body.brand);
    xss(req.body.model);
    xss(req.body.fromDate);
    xss(req.body.toDate);

    if(!req.body.sort)
    {
        const carList = await homeInfo.getSearchResult(req.body);
        if(carList.length!=0)
        {
        req.session.searchData=carList;
        if(req.session.AuthCookie)
        res.render("home/home",{cars:carList,availFlag:true,sortFlag:true,login:true,minDate:today});
        else
        res.render("home/home",{cars:carList,availFlag:true,sortFlag:true,minDate:today});
        }
        else{
            if(req.session.AuthCookie)
            res.render("home/home",{Message:"No search result found, try again !",login:true,minDate:today});
            else
            res.render("home/home",{Message:"No search result found, try again !",minDate:today});
        }
    }
    else
    {
        let sortData
        let searchData=req.session.searchData;  
        if(req.body.sort==="rating"){
        sortData= searchData.sort((a,b)=>{
            return b.rating-a.rating;
        });
        }
        else if(req.body.sort==="price"){
            sortData= searchData.sort((a,b)=>{
                return a.price-b.price;
            });
        }
        if(req.session.AuthCookie)
        res.render("home/home",{cars:sortData,availFlag:true,sortFlag:true,login:true,minDate:today});
        else
        res.render("home/home",{cars:sortData,availFlag:true,sortFlag:true,minDate:today});
    }
}
catch(e){
    res.status(500).send();
}
    
});

router.get('/home/carImage/:id', async(req,res)=>{
    try{
        const getCar = await carsData.getCarById(req.params.id);    
        if(getCar.images == ""){
          return res.status(400).send({
            message: 'No Car Pic Found!'
            
         })
        } else {
          const carPicData = getCar.images[0];
          res.contentType('image/jpeg');
          res.send(carPicData.image.buffer);
        }
        return;
    }
    catch(e){
        res.status(500).send();
    }
});

module.exports=router;