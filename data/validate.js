//function to validate array type field
function validateArray(argument,type="A"){

    if (!argument) throw `One of the sent parameter is missing`;  
    if (!Array.isArray(argument)) throw `Parameter sent ${argument} is not an array`;
    if (!argument.length>0) throw `Parameter sent ${argument} does not contain any element`;
        for(let arg of argument){
            validateString(arg);
        }
    }

//fuunction to validate emailID

function validateEmailId(argument){
   // if(!(argument.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@[a-zA-Z0-9-](?:\.[a-zA-Z0-9-])$/)))
    if(!(argument.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)))
    throw `Sent Parameter format is not correct`;
}

function validateDriverLicenseNumber(licenseNumber,stateCode){
// from https://ntsi.com/drivers-license-format/
// I opted only to set these three variables, because none of the other patterns are repeated
var sevenNumeric = /^[0-9]{7}$/;
var eightNumeric = /^[0-9]{8}$/;
var nineNumeric  = /^[0-9]{9}$/;

if (licenseNumber != 0 && (licenseNumber == "" || licenseNumber == 'null' || licenseNumber == 'undefined' || licenseNumber == false)) {
    throw "This field is required.";
} else if (stateCode == 'AK' || stateCode == 'DE') {
    if (!/^[0-9]{1,7}$/.test(licenseNumber)) {
        throw "Must be 1 to 7 numeric.";
    }
} else if (stateCode == 'AL') {
    if (!/^[0-9]{1,8}$/.test(licenseNumber)) {
        throw "Must be 1 to 8 numeric.";
    }
} else if (stateCode == 'AR') {
  if (!/^([0-9]){4,9}$/.test(licenseNumber)) {
       throw "Must be 4 to 9 numeric.";
  }
} else if (stateCode == 'AZ') { 
    if (!/^[A-Za-z]{1}[0-9]{8}$/.test(licenseNumber) && !nineNumeric.test(licenseNumber)) {
        throw "Must be 1 alphabetic and 8 numeric or 9 numeric.";
    }
} else if (stateCode == 'CA') {
    if (!/^[A-Za-z]{1}[0-9]{7}$/.test(licenseNumber)) {
        throw "Must be 1 alphabetic and 7 numeric.";
    }
} else if (stateCode == 'CO') {
  if (!(nineNumeric.test(licenseNumber)) && !(/^[A-Za-z]{1,2}[0-9]{3,5}$/.test(licenseNumber) && licenseNumber.length >= 4 ) ) {
       throw "Must be 9 numeric, or one alpha and 3 to 5 numeric, or 2 alpha and 2 to 5 numeric.";
  }
  
} else if (stateCode == 'CN' || stateCode == 'CT' || stateCode == 'MS') {
    if (!nineNumeric.test(licenseNumber)) {
        throw "Must be 9 numeric.";
    }
} else if (stateCode == 'DC' || stateCode == 'TN') {
    if (!sevenNumeric.test(licenseNumber) && !nineNumeric.test(licenseNumber)) {
        throw "Must be 7 or 9 numeric.";
    }
} else if (stateCode == 'FL') {
    if (!/^[A-Za-z]{1}[0-9]{12}$/.test(licenseNumber)) {
        throw "Must be 1 alpha, 12 numeric.";
    }
} else if (stateCode == 'GA') {
    if (!/^[0-9]{7,9}$/.test(licenseNumber)) {
        throw "Must be 7 to 9 numeric.";
    }
} else if (stateCode == 'HI') {
    if (!(/[0-9]{8}$/.test(licenseNumber) && licenseNumber.length == 9)) {
        throw "Must have 1 alpha and 8 numeric, or 9 numeric.";
    }
} else if (stateCode == 'ID') {
    if ( !nineNumeric.test(licenseNumber) && !/[A-Za-z]{2}[0-9]{7}[A-Za-z]{1}$/.test(licenseNumber) ) {
        throw "Must have 9 numeric, or 2 alphabetic + 6 numeric + 1 alpha.";
    }
} else if (stateCode == 'IL') {
    if ( !/^[A-Za-z]{1}[0-9]{11,12}$/.test(licenseNumber) ) {
        throw "Must be 1 alphabetic 11 numeric, or 1 alpha and 12 numeric.";
    }
} else if (stateCode == 'IN') {
  if (!(/^[A-Za-z]{0,1}[0-9]{9,10}$/.test(licenseNumber) && licenseNumber.length <= 10)) {
        throw "Must be one alpha and 9 numeric, or 9 to 10 numeric.";
    }
} else if (stateCode == 'IA') {
    if (!nineNumeric.test(licenseNumber) && !/^[0-9]{3}[A-Za-z]{2}[0-9]{4}$/.test(licenseNumber) ) {
        throw "Must be 9 numeric, or 3 numeric + 2 alpha + 4 numeric.";
    }
} else if (stateCode == 'KS') {
    if (!/^[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}$/.test(licenseNumber) && !( /^[A-Za-z]{0,1}[0-9]{8}$/.test(licenseNumber) && licenseNumber.length == 9 )) {
        throw "Must be alpha + number + alpha + number + alpha, or 1 alpha and 8 numeric, or 9 numeric.";
    }
} else if (stateCode == 'KY') {
    if (!/^[A-Za-z]{1}[0-9]{8,9}$/.test(licenseNumber) && !nineNumeric.test(licenseNumber) ) {
        throw "Must be 1 alphabetic and 8 to 9 numeric, or 9 numeric.";
    }
} else if (stateCode == 'LA' || stateCode == 'OR') {
    if (!/^[0-9]{1,9}$/.test(licenseNumber)) {
        throw "Must be 1 to 9 numeric.";
    }
} else if (stateCode == 'ME') {
    if ( !( /^[0-9]{7,8}[A-Za-z]{0,1}$/.test(licenseNumber) && licenseNumber.length <= 8)) {
        throw "Must be 7 numeric, 7 numeric and one alpha, or 8 numeric.";
    }
} else if (stateCode == 'MD' || stateCode == 'MN') {
    if (!/^[A-Za-z]{1}[0-9]{12}$/.test(licenseNumber)) {
        throw "Must be 1 alphabetic and 12 numeric.";
    }
} else if (stateCode == 'MA') {
    if (!(/[0-9]{8}$/.test(licenseNumber) && licenseNumber.length == 9)) {
        throw "Must be 1 alphabetic and 8 numeric, or 9 numeric.";
    }
} else if (stateCode == 'MI') {
   if (!(/^[A-Za-z]{1}[0-9]{10,12}$/.test(licenseNumber) && licenseNumber.length != 12)) {
     throw "Must be 1 alpha and 10 numeric, or 1 alpha and 12 numeric.";
   }
} else if (stateCode == 'MT') {
    if (!/^[A-Za-z]{1}[0-9]{8}$/.test(licenseNumber) && !nineNumeric.test(licenseNumber) && !/^[0-9]{13,14}$/.test(licenseNumber) ) {
        throw "Must have one alpha and 8 numeric, or 9, 13, or 14 numeric.";
    }
} else if (stateCode == 'NE') {
    if (!/^[A-Za-z]{1}[0-9]{6,8}$/.test(licenseNumber)) {
        throw "Must have one alpha and six to eight numeric.";
    }
} else if (stateCode == 'NV') {
    if (!(/^[0-9]{9,12}$/.test(licenseNumber) && licenseNumber.length != 11) && !/^[0-9]{8}[Xx]$/.test(licenseNumber)) {
        throw "Must have 9, 10, or 12 numeric, or eight numeric + X.";
    }
} else if (stateCode == 'NH') {
    if (!/^[0-9]{2}[A-Za-z]{3}[0-9]{5}$/.test(licenseNumber)) {
        throw "Must have 2 numeric + 3 alpha + 5 numeric.";
    }
} else if (stateCode == 'NJ') {
    if (!/^[A-Za-z]{1}[0-9]{14}$/.test(licenseNumber)) {
        throw "Must have one alpha and 14 numeric.";
    }
} else if (stateCode == 'NM') {
    if (!/^[0-9]{8,9}$/.test(licenseNumber)) {
        throw "Must be 8 or 9 numeric.";
    }
} else if (stateCode == 'NY') {
    if (!/^[A-Za-z]{1}[0-9]{7}$/.test(licenseNumber) && !/^[A-Za-z]{1}[0-9]{18}$/.test(licenseNumber) && !eightNumeric.test(licenseNumber) && !nineNumeric.test(licenseNumber) && !/^[A-Za-z]{8}$/.test(licenseNumber) ) {
        throw "Must have one alpha and 7 or 18 numeric, 8 or 9 numeric, or 8 alpha.";
    }    
} else if (stateCode == 'NC') {
    if (!/^[0-9]{1,12}$/.test(licenseNumber)) {
        throw "Must have 1 to 12 numeric.";
    }
} else if (stateCode == 'ND') {
    if (!/^[A-Za-z]{3}[0-9]{6}$/.test(licenseNumber) && !nineNumeric.test(licenseNumber) ) {
        throw "Must have 3 alpha and 6 numeric, or 9 numeric.";
    }
} else if (stateCode == 'OH') {
    if (!(/^[A-Za-z]{1,2}[0-9]{3,8}$/.test(licenseNumber) && licenseNumber.length >= 5 && licenseNumber.length <= 9) && !eightNumeric.test(licenseNumber) ) {
        throw "Must have one alpha and 4 to 8 numeric, 2 alpha and 3 to 7 numeric, or 8 numeric.";
    }
} else if (stateCode == 'OK') {
    if (!/^[A-Za-z]{0,1}[0-9]{9}$/.test(licenseNumber)) {
        throw "Must have one alpha and 9 numeric, or 9 numeric.";
    }
} else if (stateCode == 'PA') {
    if (!eightNumeric.test(licenseNumber)) {
        throw "Must have 8 numeric.";
    }
} else if (stateCode == 'RI') {
    if (!/^[0-9]{7}[A-Za-z]{1}[0-9]{6}$/.test(licenseNumber)) {
        throw "Must have 7 numeric + 1 alpha + 6 numeric.";
    }
} else if (stateCode == 'SC') {
    if (!/(^[0-9]){5,11}$/.test(licenseNumber)) {
        throw "Must have 5 to 11 numeric.";
    }
} else if (stateCode == 'SD') {
    if (!(/(.*[0-9]){6,10}/.test(licenseNumber) && licenseNumber.length != 11) ) {
        throw "Must have 6 to 10 numeric or 12 numeric.";
    }
} else if (stateCode == 'TX') {
    if (!/^[0-9]{7,8}$/.test(licenseNumber)) {
        throw "Must have 7 to 8 numeric.";
    }
} else if (stateCode == 'UT') {
    if (!/(^[0-9]){4,10}$/.test(licenseNumber)) {
        throw "Must have 4 to 10 numeric.";
    }
} else if (stateCode == 'VT') {
    if (!eightNumeric.test(licenseNumber) && ! /^([0-9]{7}[Aa])$/.test(licenseNumber)) {
        throw "Must have 8 numeric or 7 numeric plus 'A'.";
    }
} else if (stateCode == 'VI') {
    if (!/^[A-Za-z]{1}[0-9]{8,11}$/.test(licenseNumber) && !nineNumeric.test(licenseNumber)) {
        throw "Must be 1 alpha and eight to 11 numeric, or 9 numeric.";
    }
} else if (stateCode == 'WA') { //1-7Alpha+any combination of Alpha, Numeric, or * for a total of 12 characters
    if (!(/^[A-Za-z]{1,7}/.test(licenseNumber) && licenseNumber.length == 12)) {
        throw "Must be 1 to 7 alpha and total 12 characters.";
    }
} else if (stateCode == 'WV') {
    if (!sevenNumeric.test(licenseNumber) && !/^[A-Za-z]{1,2}[0-9]{5,6}$/.test(licenseNumber) ) {
        throw "Must be 7 numeric, or 1 to 2 alpha and 5 to 6 numeric.";
    }
} else if (stateCode == 'WI') {
    if (!/^[A-Za-z]{1}[0-9]{13}$/.test(licenseNumber)) {
        throw "Must be 1 alpha and 13 numeric.";
    }
} else if (stateCode == 'WY') {
    if (!/^[0-9]{9,10}$/.test(licenseNumber)) {
        throw "Must be 9 to 10 numeric.";
    }
} else { // if (stateCode == 'MO')
    if (!/^[A-Za-z]{1}[0-9]{5,9}$/.test(licenseNumber) && !(/^[0-9]{8,9}[A-Za-z]{1,2}$/.test(licenseNumber) && licenseNumber.length == 10) && !nineNumeric.test(licenseNumber) && !/^[A-Za-z]{1}[0-9]{6}[Rr]$/.test(licenseNumber)) {
        throw "Must be 1 alphabetic and 5-9 numeric, eight numeric and two alpha, or 9 numeric and one alpha, or 9 numeric, or 1 alpha + 9 numeric + R.";
    }
}
}

//function to validate number type field
function validateNumber(argument,type="N"){
        if(!argument) throw `Sent Parameter is missing`;
        if (typeof argument !== "number") throw `Passed argument ${argument} is not a number`;
        if (!Number.isInteger(argument)) throw `Passed argument ${argument} is not an Integer`;
}

//function to validate object type field
function validateObject(argument,type="O"){
    
    if (!argument) throw `Sent parameter is missing`;    
    if (Array.isArray(argument)) throw `Sent Parameter ${argument} is an array`;
    if (typeof argument !== "object") throw `Sent Parameter ${argument} is not Object`;
    if (argument.hasOwnProperty(undefined)) throw `Sent Parameter Object contains undefined`;
}

/* if (type==="F"){
            if (typeof argument !== "function") throw `Sent Parameter ${argument} is not a function`;} */

//function to validate string type field
function validateString(stringArg){
    if (!stringArg) throw `Sent parameter is missing`;
    if (typeof stringArg !== "string") throw `Parameter sent ${stringArg} is not a string`
    if (stringArg.trim().length == 0) throw `Parameter sent ${stringArg} does not contain any charaters`;
   // if (stringArg.match(/^[0-9!@#\$%\^\&*\)\(+=._-\s]+$/) != null) throw  `Parameter sent ${stringArg} is not a valid string`;

}

//function to validate date type field and converts date from string to date type
function validateDate(argument){

    let daysInMonth = function (m, y) {
        switch (m) {
            case 1 :
                return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
            case 8 : case 3 : case 5 : case 10 :
                return 30;
            default :
                return 31
        }
    };
    
    
    let isValidDate = function (d, m, y) {
        m = parseInt(m, 10) - 1;
        return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
    };

    validateString(argument);
    //if (argument.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) )
    //{
        let today = new Date();
        let parts = argument.split("-");
        let day = parseInt(parts[2], 10);
        let month = parseInt(parts[1], 10);
        let year = parseInt(parts[0], 10);
        if(today.getFullYear()-year<18) throw `You should be 18 years or above to rent a ride`;
        if(today.getFullYear()-year==18 && month-1 > today.getMonth()) throw `You should be 18 years or above to rent a ride`;
        if(today.getFullYear()-year==18 && month-1 == today.getMonth() && day > today.getDate()) throw `You should be 18 years or above to rent a ride`;
        if(!(isValidDate(day,month,year))) throw `Sent Parameter ${argument} is an invalid Date`;
        let returnDate = new Date(year,month-1,day);
        return returnDate;
    //}
    //else throw `Sent Parameter ${argument} is an invalid Date`;
}

//function to format date in yyyy-mm-dd field
function formatDateInString(argument){
    let month = argument.getMonth() + 1;
    let day = argument.getDate();
    if(day<10){
        day = 0 + "" + day;
    }
    if(month<10){
        month = 0 + "" + month;
    }
    let year = argument.getFullYear();
    let formatDate = `${year}-${month}-${day}`;
    return formatDate;
}

function validateGeneralDate(argument){

    let daysInMonth = function (m, y) {
        switch (m) {
            case 1 :
                return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
            case 8 : case 3 : case 5 : case 10 :
                return 30;
            default :
                return 31
        }
    };
    
    
    let isValidDate = function (d, m, y) {
        m = parseInt(m, 10) - 1;
        return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
    };

    validateString(argument);
    //if (argument.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) )
    //{
        let today = new Date();
        let parts = argument.split("-");
        let day = parseInt(parts[2], 10);
        let month = parseInt(parts[1], 10);
        let year = parseInt(parts[0], 10);
        if(!(isValidDate(day,month,year))) throw `Sent Parameter ${argument} is an invalid Date`;
        let returnDate = new Date(year,month-1,day);
        return returnDate;
    //}
    //else throw `Sent Parameter ${argument} is an invalid Date`;
}


module.exports={
    validateArray,
    validateObject,
    validateString,
    validateNumber,
    validateDate,
    formatDateInString,
    validateEmailId,
    validateDriverLicenseNumber,
    validateGeneralDate
}