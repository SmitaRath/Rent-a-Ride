const express = require("express");
const router = express.Router();
const dataInfo = require("../data");
const usersData = dataInfo.users;
const validation = dataInfo.validate;
const multer = require("multer");
const path = require('path');
const upload = multer({ dest: 'public/uploads' });
const fs = require('fs');
const { default: Axios } = require("axios");
const validate = require("../data/validate");
const xss = require('xss');
let todayDate=new Date();
let today=validation.formatDateInString(todayDate);


router.post('/upload/profilepic', upload.single('profilePicture'), async (req, res) => {
  
    let userId = req.session.AuthCookie; 
  try{ 
  let str = req.file.originalname;
  let index = str.indexOf(".");
  let extension = str.substr(index+1,str.length-1);
  if(extension.toLowerCase()!="png" && extension.toLowerCase()!="jpg" && extension.toLowerCase()!="jpeg")
     throw "Kindly upload png, jpg or jpeg file";
  let img = fs.readFileSync(req.file.path);
  let encode_image = img.toString('base64');
  
  var finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, 'base64')
}

  const addingProfilePicture = await usersData.addProfilePicture(userId, finalImg);
  res.redirect('/users/editUser');
}
catch(e){
    const user = await usersData.getUserById(userId);
    res.status(400);
    res.render("users/userProfile",{users:user,editFlag:true,id:userId,error:e});
}
});

router.get('/profilepic/:id', async (req, res) => {
    try{
    const getUser = await usersData.getUserById(req.params.id);
    const profilepicData = getUser.profilePicture;
    if(profilepicData == ""){
      return res.status(400).send({
        message: 'No Profile Pic Found!'
     })
    } else {
      res.contentType('image/jpeg');
      res.send(profilepicData.image.buffer);
    }
    return;
}
catch(e){
    res.status(500).send();
}
  });

router.get("/createUser", async(req,res)=>{
    try{
        res.status(200).render("users/usercreation")
    }
    catch(error){
        console.log(error);
        res.status(500).send();
    }
});

router.post("/createUser", async(req,res)=>{
    xss(req.body.firstName);
    xss(req.body.lastName);
    xss(req.body.dob);
    xss(req.body.emailID);
    xss(req.body.password);
    xss(req.body.confirm);
    xss(req.body.zip);
    xss(req.body.driverLicense);
    const newUserData = req.body;
    const errorList=[];
    let allUsers;
    try{
    allUsers = await usersData.getAllUsers();
    }
    catch(error){
        console.log(error);
    }
    try{
        validation.validateString(newUserData.firstName);
    }
    catch(error){
        errorList.push("First Name: " + error);
    }
    if(newUserData.lastName.trim())
    {
        try{
            validation.validateString(newUserData.lastName);
        }
        catch(error){
            errorList.push("Last Name: " + error);
        }
    }
    try{
        validation.validateDate(newUserData.dob);
    }
    catch(error){
        errorList.push("Date Of Birth: " + error);
    }

    let existingUsername;
    try{
         existingUsername = allUsers.find( obj => {
            return obj.emailID === newUserData.emailID.toLowerCase()
            });
        if(existingUsername) throw 'Sent Parameter already present, use some other email address';
        validation.validateEmailId(newUserData.emailID);
    }
    catch(error){
        
        errorList.push("Email Address: "+error);
    }
 
    try{
        validation.validateString(newUserData.password);
        validation.validateString(newUserData.confirm);
        if(newUserData.password!=newUserData.confirm)
            throw `Password and confirm password are not same`;
    }
    catch(error){
        errorList.push(error);
    }

    try{
        validation.validateString(newUserData.zip);
        const { data } = await Axios.get("http://ziptasticapi.com/"+newUserData.zip);
        if(data.error) 
        {
        newUserData.city="";
        newUserData.state="";
        throw 'Sent Parameter is invalid';
        }
        else{
            newUserData.city=data.city;
        newUserData.state=data.state;
        }
    }
    catch(error){
        errorList.push("Zip: " + error);
    }

    try{
        let existingDriverLicense = allUsers.find( obj => {
            return obj.driverLicense === newUserData.driverLicense.toUpperCase()
            });
        if(existingDriverLicense) throw "Sent Parameter already present, use some other Driver license no.";
        if(newUserData.state)       
        validation.validateDriverLicenseNumber(newUserData.driverLicense,newUserData.state);
    }
    catch(error){
        errorList.push("Driver's License: " + error);
    }

    if(errorList.length>0){
        res.status(400);
        res.render("users/usercreation",{
            hasErrors:true,
            errors:errorList,
            users:newUserData
        });
        return;
    }
    
    try{
        const newUser = await usersData.createUser(newUserData);
        req.session.AuthCookie=newUser._id;
        res.status(200).render("users/userProfile",{
            success:true,
            users:newUser,
            profileFlag:true,
            message:"Profile created successfully",
            id:newUser._id
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({Error : error});
    }
});

router.get("/login", async(req,res)=>{
    try{
        res.status(200).render("users/login");
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/login", async(req,res)=>{
    xss(req.body.emailID);
    xss(req.body.password);
    const userData=req.body;
    try{
    validation.validateEmailId(userData.emailID);
    }
    catch(error){
        res.status(400).send({message:"Email Id: " + error});
        return;
    }
    try{
        const user = await usersData.login(userData.emailID, userData.password);
        req.session.AuthCookie=user._id;
        res.status(200).render("users/userProfile",{layout:null,profileFlag:true,users:user,id:user._id});
    }
    catch(error){
        res.status(401).send({message:error});
    }
});

router.get("/profile", async(req,res)=>{
    let userId = req.session.AuthCookie;
    try{
        const user = await usersData.getUserById(userId);
        res.status(200).render("users/userProfile",{users:user,profileFlag:true,id:userId});
    }
    catch(error){
        res.status(500).send();
    }
});

router.get("/editUser", async(req,res)=>{
    
    let userId = req.session.AuthCookie;
    try{
        const user = await usersData.getUserById(userId);
        res.status(200).render("users/userProfile",{users:user,editFlag:true,id:userId});
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/editUser", async(req,res)=>{
    xss(req.body.firstName);
    xss(req.body.lastName);
    xss(req.body.dob);
    xss(req.body.zip);
    xss(req.body.driverLicense);
    let userId = req.session.AuthCookie;
    const newUserData = req.body;
    const errorList=[];
    let allUsers;
    let changeLog=0;
    try{
    allUsers = await usersData.getAllUsers();
    existingUser = await usersData.getUserById(userId);
    }
    catch(error){
        console.log(error);
    }

    


    try{
        validation.validateString(newUserData.firstName);
        if(existingUser.firstName!=newUserData.firstName.trim())
            changeLog=changeLog+1;
    }
    catch(error){
        errorList.push("First Name: " + error);
    }
    if(newUserData.lastName.trim())
    {
        try{
            validation.validateString(newUserData.lastName);
            if(existingUser.lastName!=newUserData.lastName.trim())
            changeLog=changeLog+1;
        }
        catch(error){
            errorList.push("Last Name: " + error);
        }
    }
    try{
        validation.validateDate(newUserData.dob);
        if(existingUser.dob!=newUserData.dob)
            changeLog=changeLog+1;
    }
    catch(error){
        errorList.push("Date Of Birth: " + error);
    }

    try{

        if(existingUser.zip!=newUserData.zip)
        {
            changeLog=changeLog+1;
            validation.validateString(newUserData.zip);
            const { data } = await Axios.get("http://ziptasticapi.com/"+newUserData.zip);
            if(data.error) {
            newUserData.city="";
            newUserData.state="";
            throw `Sent parameter is invalid`;
            }
            else{
                newUserData.city=data.city;
                newUserData.state=data.state;  
            }
        }
        else{
        newUserData.city=existingUser.city;
        newUserData.state=existingUser.state;
        }
    }
    catch(error){
        errorList.push("Zip: " + error);
    }

    if(newUserData.state!==existingUser.state && newUserData.driverLicense.toUpperCase()===existingUser.driverLicense){
        {
          errorList.push("Driver's License: " + "Should be changed if your address state is changed" );
        }
    }

    if(newUserData.driverLicense.toUpperCase()!=existingUser.driverLicense)
    {
        changeLog=changeLog+1;
    try{
        let existingDriverLicense = allUsers.find( obj => {
            return obj.driverLicense === newUserData.driverLicense.toUpperCase()
            });
        if(existingDriverLicense) throw "Sent Parameter already present, use some other Driver license no.";
        if (newUserData.state)
        validation.validateDriverLicenseNumber(newUserData.driverLicense,newUserData.state);
    }
    catch(error){
        errorList.push("Driver's License: " + error);
    }
}


    if(changeLog===0)
        errorList.push("Kindly provide new details to update");

    if(errorList.length>0){
        res.status(400);
        res.render("users/userProfile",{
            hasErrors:true,
            errors:errorList,
            users:newUserData,
            editFlag:true,
            id:existingUser._id
        });
        return;
    }

    try{
        const user = await usersData.updateUser(newUserData,userId);
        res.status(200).render("users/userProfile",{
            profileFlag:true,
            users:user,
            success:true,
            message:"Updated Successfully",
            id:user._id
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send();
    }
});

router.get("/logout", async(req,res)=>{
    try{
    req.session.destroy();
    res.status(200).render("home/home",{Message:"Search cars based on your preference",minDate:today});
}
catch(e){
    res.status(500).send();
}
})

router.get("/saveCar/:id", async(req, res)=>{
    const carId = req.params.id;
    try{
        const saveCar = await usersData.updateSavedCarPatch(req.session.AuthCookie, carId);
        //const savedInfo = await usersData.getSavedCars(req.session.AuthCookie);
        //res.render("users/userdashboard", {cars:savedInfo, heading:"Saved Cars", postedsavedFlag: true});
        res.redirect("/users/saved");
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});


router.get("/saved", async(req,res)=>{
    try{
    const savedInfo = await usersData.getSavedCars(req.session.AuthCookie);
    if(savedInfo.length!=0)
    res.status(200).render("users/userdashboard",{cars:savedInfo,heading:"Saved Cars",savedFlag:true});
    else
    res.render("users/userdashboard",{Message:"You have not added any car to your saved list",heading:"Saved Cars"});
}
catch(e){
    res.status(500).send();
}
})

router.get("/rented", async(req,res)=>{
    try{
    const rentedInfo = await usersData.getCurrentlyRentedCar(req.session.AuthCookie);
    if(rentedInfo)
    res.status(200).render("users/userdashboard",{cars:rentedInfo,heading:"Booked Car",rentedFlag:true});
    else
    res.render("users/userdashboard",{Message:"You have not booked any Car",heading:"Booked Car"});
}
catch(e){
    res.status(500).send();
}
})

router.get("/posted", async(req,res)=>{
    try{
    const postedCarsInfo = await usersData.getPostedCars(req.session.AuthCookie);
    if(postedCarsInfo.length!=0)
    res.status(200).render("users/userdashboard",{cars:postedCarsInfo,heading:"Posted Cars",postedFlag:true});
    else
    res.render("users/userdashboard",{Message:"You have not posted any car",heading:"Posted Cars"});
}
catch(e){
    res.status(500).send();
}
})

router.get("/history", async(req,res)=>{
    try{
    const pastCarsInfo = await usersData.getPastRentedCars(req.session.AuthCookie);
    if(pastCarsInfo.length!=0)
    res.status(200).render("users/userdashboard",{cars:pastCarsInfo,heading:"Past Rented Cars",pastRentedFlag:true});
    else
    res.render("users/userdashboard",{Message:"You have not booked any car in the past",heading:"Past Rented Cars"});
}
catch(e){
    res.status(500).send();
}
});

router.get("/orders",async(req,res)=>{
    try{
    const allOrders = await usersData.getAllOrders(req.session.AuthCookie);
    
    if(allOrders.length!=0)
    res.status(200).render("users/userdashboard",{cars:allOrders,heading:"All orders for your posted cars",orderFlag:true});
    else
    res.render("users/userdashboard",{Message:"Your posted cars are not booked yet",heading:"All orders for your posted cars"});
    }
    catch(e){
        res.status(500).send();
    }
});

router.get("/customerProfile/:id",async(req,res)=>{
    try{
        const user = await usersData.getUserById(req.params.id);
        res.status(200).render("users/customerProfile",{users:user,id:user._id});

    }
    catch(error){
        res.status(500).send();
    }
});


router.post("/changePassword", async(req,res)=>{
    let errorList=[];
    xss(req.body.password);
    xss(req.body.confirm);
    let newUserData = req.body;
    let userId=req.session.AuthCookie;


    try{
        validation.validateString(newUserData.password);
        validation.validateString(newUserData.confirm);
        if(newUserData.password!=newUserData.confirm)
            throw `Password and confirm password are not same`;
    }
    catch(error){
        errorList.push(error);
    }

    
    try{
        const checkPassword = await usersData.checkOldPassword(userId,newUserData.password);
    }
    catch(error){
        errorList.push(error);
    }
   const user = await usersData.getUserById(userId);
    if(errorList.length>0){
        res.status(400);
        res.render("users/userProfile",{
            hasErrorsPass:true,
            errorsPass:errorList,
            users:user,
            editFlag:true,
            id:userId
        });
        return;
    }

    try{
        const changePassword = await usersData.changePassword(userId,newUserData.password);
        res.status(200).render("users/userProfile",{
            editFlag:true,
            users:user,
            successPass:true,
            message:"Password Changed Successfully",
            id:user._id
        });
    }
    catch(error){
        res.status(500).send();
    }

}); 

module.exports = router;