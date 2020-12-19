const mongoCollections = require('../config/mongoCollections');
const usersColl = mongoCollections.users;
const rentingInfoColl = mongoCollections.rentingInfo;
const carsColl = mongoCollections.cars;
const validate = require("./validate");

async function getTopRatedCars(zipCode){
    const carsCollection = await carsColl();
    const carList = await carsCollection.find({zip:zipCode}).sort({ rating: -1 }).limit(12).toArray();
    let modifiedList = carList.map((arr)=> {
        arr._id=arr._id.toString();
        return arr;
    });
    return modifiedList;
}

async function getSearchResult(searchData){
    let returnArray=[];
    if(searchData.zip)
    vzip = searchData.zip;
    else
    vzip={ $regex: /./ };
    if(searchData.type){
        vtype = new RegExp(searchData.type.toLowerCase());
    }
    else
    vtype={ $regex: /./ };
    if(searchData.brand)
    {
    vbrand=new RegExp(searchData.brand.toLowerCase());
    }
    else
    vbrand={ $regex: /./ };
    if(searchData.model)
    vmodel=new RegExp(searchData.model.toLowerCase());
    else
    vmodel={ $regex: /./ };

    const carCollection = await carsColl();
    const carResult=await carCollection.find({model:vmodel,brand:vbrand,type:vtype,zip:vzip}).limit(50).toArray();
    let modifiedList = carResult.map((arr)=> {
        arr._id=arr._id.toString();
        return arr;
    });

    if(searchData.fromDate && searchData.toDate){
        searchData.fromDate=validate.validateGeneralDate(searchData.fromDate);
        searchData.toDate=validate.validateGeneralDate(searchData.toDate);
        const rentingInfoCollection = await rentingInfoColl();
        for(let arr of modifiedList){
            flag=true;
            const rentingData = await rentingInfoCollection.find({carId:arr._id}).toArray();
            for(let arr1 of rentingData){
                if(arr1.bookingStatus!="R"  && arr1.currentStatus!="C")
                {
                    if(((searchData.fromDate<arr1.startDate && searchData.toDate<arr1.startDate) || 
                    (searchData.fromDate>arr1.endDate && searchData.toDate>arr1.endDate)))
                        flag=true;
                    else
                    {
                        flag=false;
                        break;
                    }
                }
            }
            if(flag)
                returnArray.push(arr);
        }
        return returnArray;
    }
    else
    return modifiedList;

}

module.exports={
    getTopRatedCars,
    getSearchResult
}