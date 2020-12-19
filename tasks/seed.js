const dbConnnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;
const cars = data.cars;
const reviews = data.reviews;
const rentingInfo = data.rentingInfo;
const saltRounds = 12;
const bcrypt = require("bcrypt");


async function main() {
    const db = await dbConnnection();
    
    await db.dropDatabase();
    
    let newUser1 = {
        firstName : "Kristain",
        lastName : "Parker",
        password: "mydognameistom",
        dob : "1995-11-23",
        emailID : "KristainParker@gmail.com",
        driverLicense : "A12345678900986",
        profilePicture : "",
        city : "Union City",
        state : "NJ",
        zip : "07087",

    }

    let newUser2 = {
        firstName : "Hanna",
        lastName : "Dom",
        password: "iloveyou3000",
        dob : "1988-10-01",
        emailID : "Hanna123@yahoo.com",
        driverLicense : "X99997777766666",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07037",
        
    }

    let newUser3 = {
        firstName : "Peter",
        lastName : "Parker",
        password: "spiderman2002",
        dob : "1978-05-20",
        emailID : "spiderman@gmail.com",
        driverLicense : "Z12340987654321",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07112",
       
    }

    let newUser4 = {
        firstName : "James",
        lastName : "Bond",
        password: "ikill7",
        dob : "1985-11-20",
        emailID : "iloveM@gmail.com",
        driverLicense : "J12341234512345",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07303",
        
    }

    let newUser5 = {
        firstName : "Jane",
        lastName : "Watson",
        password: "peterparker",
        dob : "1990-01-26",
        emailID : "janewatson@gmail.com",
        driverLicense : "J12341234512345",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07303",
        
    }

    let newUser6 = {
        firstName : "Tasmania",
        lastName : "Loko",
        password: "jimmy12345",
        dob : "1982-04-01",
        emailID : "tloko@gmail.com",
        driverLicense : "N12349876012345",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07108",
        
    }

    let newUser7 = {
        firstName : "James",
        lastName : "Mac",
        password: "mypc1234@#",
        dob : "1972-02-11",
        emailID : "jamesmac1234@gmail.com",
        driverLicense : "F12349876009876",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07086",
        
    }

    let newUser8 = {
        firstName : "Tylor",
        lastName : "Bailey",
        password: "holdon0997",
        dob : "1975-06-19",
        emailID : "tylorBailey789@gmail.com",
        driverLicense : "E12345432109876",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07188",
        
    }


    let newUser9 = {
        firstName : "Anthony",
        lastName : "Marchi",
        password: "boston9898",
        dob : "1985-09-29",
        emailID : "AnthonyMarchi@gmail.com",
        driverLicense : "Q45675432109876",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        
    }

    let newUser10 = {
        firstName : "Jessica",
        lastName : "Kuptchik",
        password: "lambo12345678",
        dob : "1993-10-21",
        emailID : "mynameisJessica@gmail.com",
        driverLicense : "Z45674567845678",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07806"
    }

    let newUser11 = {
        firstName : "Natalie",
        lastName : "Todaro",
        password: "hellothere12345",
        dob : "1991-11-05",
        emailID : "NatalieTodaro@stevens.com",
        driverLicense : "K09871098710987",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07198",
        
        
    }

    let newUser12 = {
        firstName : "Erick",
        lastName : "Cardy",
        password: "senorita56789",
        dob : "1981-01-25",
        emailID : "ErickCardy@yahoo.com",
        driverLicense : "C34561230912309",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07087",
        
    }

    let newUser13 = {
        firstName : "Roma",
        lastName : "Rothwell",
        password: "lasvegas2020",
        dob : "1985-07-27",
        emailID : "romarothwell@yahoo.com",
        driverLicense : "A94728374638274",
        profilePicture : "",
        city : "Union City",
        state : "NJ",
        zip : "07087",
        
    }

    let newUser14 = {
        firstName : "Henry",
        lastName : "Mane",
        password: "ghostrider",
        dob : "1979-06-20",
        emailID : "Henry5678@gmail.com",
        driverLicense : "O90288374682746",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07175",
        
    }
    
    let newUser15 = {
        firstName : "Todd",
        lastName : "Gilmore",
        password: "torrymyname",
        dob : "1992-07-15",
        emailID : "toddpodd1234@hotmail.com",
        driverLicense : "V29858901287395",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07030",
        
    }

    //the people who are renting the cars
    let newUser16 = {
        firstName : "Aolanie",
        lastName : "Salloum",
        password: "aolanie1234",
        dob : "1987-08-05",
        emailID : "aolanie.salloum@hotmail.com",
        driverLicense : "V29987301287395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07307",
        
    }


    let newUser17 = {
        firstName : "Pamela",
        lastName : "Schaber",
        password: "pamela3456",
        dob : "1987-09-23",
        emailID : "pamela0987@hotmail.com",
        driverLicense : "V29858987687395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07097",
        
    }

    let newUser18 = {
        firstName : "Eric",
        lastName : "Truong",
        password: "lambo1234",
        dob : "1982-08-20",
        emailID : "erictruong12345@gmail.com",
        driverLicense : "K73645901287395",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07107",
        
    }

    let newUser19 = {
        firstName : "Kaitlyn",
        lastName : "Murtagh",
        password: "myWorld1234",
        dob : "1987-04-20",
        emailID : "kaitlynmurtagh@yahoo.com",
        driverLicense : "G26773901287395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07304",
        
    }

    let newUser20 = {
        firstName : "Joe",
        lastName : "Mattern",
        password: "ironman789",
        dob : "1974-05-23",
        emailID : "joe12345@gmail.com",
        driverLicense : "L29988901287395",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07175",
        
    }

    let newUser21 = {
        firstName : "Lyla",
        lastName : "Lehman",
        password: "computer@123",
        dob : "1990-10-22",
        emailID : "lyla.lehman@wemail.com",
        driverLicense : "V29858900987395",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        
    }

    let newUser22 = {
        firstName : "Sparsh",
        lastName : "Pandey",
        password: "sparch#0987",
        dob : "1996-06-01",
        emailID : "sparsh.pandey@rutgers.com",
        driverLicense : "B29858901209875",
        profilePicture : "",
        city : "Jersey City",
        state : "NJ",
        zip : "07311",
        
    }

    let newUser23 = {
        firstName : "Lily",
        lastName : "Cupp",
        password: "iamlily12345",
        dob : "1992-07-15",
        emailID : "Lilycupp1992@gmail.com",
        driverLicense : "R29858963547395",
        profilePicture : "",
        city : "Hoboken",
        state : "NJ",
        zip : "07030",
        
    }

    let newUser24 = {
        firstName : "Hannah",
        lastName : "Veloce",
        password: "jimmy@0987",
        dob : "1996-12-12",
        emailID : "hannahveloce112@gmail.com",
        driverLicense : "V29858901278335",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07198",
        
    }

    let newUser25 = {
        firstName : "Alexis",
        lastName : "Kates",
        password: "alexis@12345",
        dob : "1985-02-10",
        emailID : "alexiskate@nyu.com",
        driverLicense : "V29858901287395",
        profilePicture : "",
        city : "Newark",
        state : "NJ",
        zip : "07198",
        
    }

    let user1 = await users.createUser(newUser1);
    let user2 = await users.createUser(newUser2);
    let user3 = await users.createUser(newUser3);
    let user4 = await users.createUser(newUser4);
    let user5 = await users.createUser(newUser5);
    let user6 = await users.createUser(newUser6);
    let user7 = await users.createUser(newUser7);
    let user8 = await users.createUser(newUser8);
    let user9 = await users.createUser(newUser9);
    let user10 = await users.createUser(newUser10);
    let user11 = await users.createUser(newUser11);
    let user12 = await users.createUser(newUser12);
    let user13 = await users.createUser(newUser13);
    let user14 = await users.createUser(newUser14);
    let user15 = await users.createUser(newUser15);
    let user16 = await users.createUser(newUser16);
    let user17 = await users.createUser(newUser17);
    let user18 = await users.createUser(newUser18);
    let user19 = await users.createUser(newUser19);
    let user20 = await users.createUser(newUser20);
    let user21 = await users.createUser(newUser21);
    let user22 = await users.createUser(newUser22);
    let user23 = await users.createUser(newUser23);
    let user24 = await users.createUser(newUser24);
    let user25 = await users.createUser(newUser25);
/*
    let user1 = await users.createUserWithoutHash(newUser1);
    let user2 = await users.createUserWithoutHash(newUser2);
    let user3 = await users.createUserWithoutHash(newUser3);
    let user4 = await users.createUserWithoutHash(newUser4);
    let user5 = await users.createUserWithoutHash(newUser5);
    let user6 = await users.createUserWithoutHash(newUser6);
    let user7 = await users.createUserWithoutHash(newUser7);
    let user8 = await users.createUserWithoutHash(newUser8);
    let user9 = await users.createUserWithoutHash(newUser9);
    let user10 = await users.createUserWithoutHash(newUser10);
    let user11 = await users.createUserWithoutHash(newUser11);
    let user12 = await users.createUserWithoutHash(newUser12);
    let user13 = await users.createUserWithoutHash(newUser13);
    let user14 = await users.createUserWithoutHash(newUser14);
    let user15 = await users.createUserWithoutHash(newUser15);
    let user16 = await users.createUserWithoutHash(newUser16);
    let user17 = await users.createUserWithoutHash(newUser17);
    let user18 = await users.createUserWithoutHash(newUser18);
    let user19 = await users.createUserWithoutHash(newUser19);
    let user20 = await users.createUserWithoutHash(newUser20);
    let user21 = await users.createUserWithoutHash(newUser21);
    let user22 = await users.createUserWithoutHash(newUser22);
    let user23 = await users.createUserWithoutHash(newUser23);
    let user24 = await users.createUserWithoutHash(newUser24);
    let user25 = await users.createUserWithoutHash(newUser25);
*/

    let newCar1 = {
        ownedBy : (user1._id).toString(),
        licensePlate : "C90ELE",
        brand : "Volkeswagon",
        model : "Jetta",
        makeYear : 2013,
        type : "Medium",
        color : "Black",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", "Anti-Lock Brakes", "AM/FM Stereo"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "3715",
        street : "John F Kennedy Blvd",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        price : 6.11,
    }

    let newCar2 = {
        ownedBy : (user1._id).toString(),
        licensePlate : "FKR3QG",
        brand : "Nissan",
        model : "Versa",
        makeYear : 2015,
        type : "Compact",
        color : "Red",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "110",
        street : "1St St",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        price : 25,
    }

    let newCar3 = {
        ownedBy : (user2._id).toString(),
        licensePlate : "CWF2RG",
        brand : "Ford",
        model : "Fiesta",
        makeYear : 2013,
        type : "Economy",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 4,
        bootSpace : 1,
        images : "",
        houseNo : "49",
        street : "Mall Drive West",
        city : "Jersey City",
        state : "NJ",
        zip : "07307",
        price : 30,
    }
    

    let newCar4 = {
        ownedBy : (user3._id).toString(),
        licensePlate : "624HDT",
        brand : "Ford",
        model : "Focus",
        makeYear : 2010,
        type : "Compact",
        color : "Gray",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 5,
        bootSpace : 1,
        images : "",
        houseNo : "129 Montgomery Street",
        street : "Montgomery Street",
        city : "Jersey City",
        state : "NJ",
        zip : "07032",
        price : 32,
    }
    


    let newCar5 = {
        ownedBy : (user4._id).toString(),
        licensePlate : "ZZC209",
        brand : "Ford",
        model : "F-150",
        makeYear : 2010,
        type : "Pick up truck",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "3715",
        street : "John F Kennedy Blvd",
        city : "Jersey City",
        state : "NJ",
        zip : "07307",
        price : 61,
    }
    


    let newCar6 = {
        ownedBy : (user4._id).toString(),
        licensePlate : "SE994G",
        brand : "Volkswagen",
        model : "Atlas",
        makeYear : 2015,
        type : "Large",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth'],
        noOfPassengers : 7,
        bootSpace : 3,
        images : "",
        houseNo : "703",
        street : "Washington St",
        city : "Hoboken",
        state : "NJ",
        zip : "07037",
        price : 61,
    }
    

    let newCar7 = {
        ownedBy : (user5._id).toString(),
        licensePlate : "895BDE",
        brand : "Toyota",
        model : "RAV4",
        makeYear : 2017,
        type : "SUV",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "145",
        street : "W Kinney St",
        city : "Newark",
        state : "NJ",
        zip : "07103",
        price : 62,
    }
    


    let newCar8 = {
        ownedBy : (user6._id).toString(),
        licensePlate : "PDE344",
        brand : "Chevrolet",
        model : "Suburban",
        makeYear : 2014,
        type : "SUV",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 8,
        bootSpace : 2,
        images : "",
        houseNo : "2160",
        street : "Central Avenue",
        city : "Jersey City",
        state : "NJ",
        zip : "07087",
        price : 80,
    }
    


    let newCar9 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "PID789",
        brand : "Ford",
        model : "EcoSport",
        makeYear : 2019,
        type : "SUV",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "1496",
        street : "6th St",
        city : "North Bergen",
        state : "NJ",
        zip : "07047",
        price : 85,
    }



    let newCar10 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "E67343",
        brand : "Hyundai",
        model : "Santa Fe",
        makeYear : 2017,
        type : "SUV",
        color : "White",
        features : ["Cruise Control",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors"],
        noOfPassengers : 5,
        bootSpace : 5,
        images : "",
        houseNo : "1026",
        street : "Summit Ave",
        city : "Jersey City",
        state : "NJ",
        zip : "07307",
        price : 78,
    }
    



    let newCar11 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "UUS264",
        brand : "Kia",
        model : "Soul",
        makeYear : 2012,
        type : "Medium",
        color : "Blue",
        features : ["Cruise Control",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "301",
        street : "W Kinney St",
        city : "Newark",
        state : "NJ",
        zip : "07103",
        price : 68,
    }
    



    let newCar12 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "DUUUUDE",
        brand : "Hyundai",
        model : "Elantra",
        makeYear : 2009,
        type : "Medium",
        color : "Orange",
        features : ["Cruise Control","Unlimited miles",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "425",
        street : "15th Ave",
        city : "Newark",
        state : "NJ",
        zip : "07103",
        price : 65,
    }
    


    let newCar13 = {
        ownedBy : (user7._id).toString(),
        licensePlate : "HAPPY9",
        brand : "Chrysler",
        model : "Pacifica",
        makeYear : 2016,
        type : "Van",
        color : "White",
        features : ["Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 7,
        bootSpace : 3,
        images : "",
        houseNo : "291",
        street : "Orange St",
        city : "Newark",
        state : "NJ",
        zip : "07103",
        price : 80,
    }
    


    let newCar14 = {
        ownedBy : (user8._id).toString(),
        licensePlate : "NED883",
        brand : "Ford",
        model : "Transit",
        makeYear : 2015,
        type : "Van",
        color : "Black",
        features : ["Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Mirrors"],
        noOfPassengers : 7,
        bootSpace : 3,
        images : "",
        houseNo : "162",
        street : "Linden Ave",
        city : "Jersey City",
        state : "NJ",
        zip : "07305",
        price : 80,
    }
    

    let newCar15 = {
        ownedBy : (user9._id).toString(),
        licensePlate : "YYJ738",
        brand : "Toyota",
        model : "Sienna",
        makeYear : 2004,
        type : "Van",
        color : "Grey",
        features : ["Power Steering", "Air Conditioning", "Air Bags", "Power Mirrors"],
        noOfPassengers : 8,
        bootSpace : 5,
        images : "",
        houseNo : "5",
        street : "Delmar Rd",
        city : "Jersey City",
        state : "NJ",
        zip : "07305",
        price : 100,
    }


    let newCar16 = {
        ownedBy : (user9._id).toString(),
        licensePlate : "IIJ783",
        brand : "Ford",
        model : "Super Duty",
        makeYear : 2017,
        type : "Van",
        color : "White",
        features : ["Cruise Control","Unlimited miles",  "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 10,
        bootSpace : 2,
        images : "",
        houseNo : "17",
        street : "West St",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        price : 85,
    }
    


    let newCar17 = {
        ownedBy : (user10._id).toString(),
        licensePlate : "HIW837",
        brand : "Nissan",
        model : "Frontier",
        makeYear : 2014,
        type : " Pickup truck",
        color : "White",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 4,
        bootSpace : 3,
        images : "",
        houseNo : "17",
        street : "West St",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        price : 85,
    }
    


    let newCar18 = {
        ownedBy : (user10._id).toString(),
        licensePlate : "HHE738",
        brand : "Nissan",
        model : "Frontier",
        makeYear : 2014,
        type : "Pickup truck",
        color : "White",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 4,
        bootSpace : 3,
        images : "",
        houseNo : "102",
        street : "County Rd 643",
        city : "Jersey City",
        state : "NJ",
        zip : "07306",
        price : 45,
    }
    


    let newCar19 = {
        ownedBy : (user10._id).toString(),
        licensePlate : "KJB789",
        brand : "Class",
        model : "Full-size Truck",
        makeYear : 2018,
        type : "Pickup truck",
        color : "Maroon",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 3,
        images : "",
        houseNo : "592",
        street : "37th St",
        city : "Union City",
        state : "NJ",
        zip : "07087",
        price : 45,
    }
    


    let newCar20 = {
        ownedBy : (user11._id).toString(),
        licensePlate : "YUE679",
        brand : "Ford",
        model : "Mustang Convertible",
        makeYear : 2019,
        type : "Convertible",
        color : "Red",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", "Power Mirrors", "10-Speed Automatic", "2.3-liter Turbo Inline-4 Gas", "RWD", "Rear wheel drive", "Daytime Running Lights", "Stability Control"],
        noOfPassengers : 4,
        bootSpace : 1,
        images : "",
        houseNo : "590",
        street : "Washington St",
        city : "Hoboken",
        state : "NJ",
        zip : "07030" ,
        price : 105,
    }
    


    let newCar21 = {
        ownedBy : (user12._id).toString(),
        licensePlate : "YIE803",
        brand : "BMW",
        model : "X1",
        makeYear : 2015,
        type : "Convertible",
        color : "Grey",
        features : ["Cruise Control","Unlimited miles", "Air Conditioning", "Air Bags", "Power Mirrors", "10-Speed Automatic", "2.3-liter Turbo Inline-4 Gas", "RWD", "Rear wheel drive", "Daytime Running Lights", "Stability Control"],
        noOfPassengers : 4,
        bootSpace : 1,
        images : "",
        houseNo : "140",
        street : "Madison Ave",
        city : "Hoboken",
        state : "NJ",
        zip : "07108",
        price : 80,
    }
    


    let newCar22 = {
        ownedBy : (user13._id).toString(),
        licensePlate : "BHJ783",
        brand : "Chevrolet",
        model : "Spark",
        makeYear : 2013,
        type : "Compact",
        color : "White",
        features : ["Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags"],
        noOfPassengers : 4,
        bootSpace : 2,
        images : "",
        houseNo : "112",
        street : "River St",
        city : "Hoboken",
        state : "NJ",
        zip : "07037",
        price : 61,
    }
    


    let newCar23 = {
        ownedBy : (user14._id).toString(),
        licensePlate : "HKJ098",
        brand : "Cadillac",
        model : "XTS",
        makeYear : 2013,
        type : "Luxury",
        color : "Black",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "400",
        street : "Newport Pkwy",
        city : "Jersey City",
        state : "NJ",
        zip : "07310",
        price : 62,
    }
    



    let newCar24 = {
        ownedBy : (user15._id).toString(),
        licensePlate : "YUI908",
        brand : "Cadillac",
        model : "XTS",
        makeYear : 2013,
        type : "Luxury",
        color : "Black",
        features : ["Cruise Control","Unlimited miles",  "Automatic Transmission", "Power Steering", "Air Conditioning", "Air Bags", 'Bluetooth', "Power Lock Doors", "Power Mirrors"],
        noOfPassengers : 5,
        bootSpace : 4,
        images : "",
        houseNo : "400",
        street : "Newport Pkwy",
        city : "Jersey City",
        state : "NJ",
        zip : "07310",
        price : 70,
    }
    


    let car1 = await cars.createCar(newCar1);
    let car2 = await cars.createCar(newCar2);
    let car3 = await cars.createCar(newCar3);
    let car4 = await cars.createCar(newCar4);
    let car5 = await cars.createCar(newCar5);
    let car6 = await cars.createCar(newCar6);
    let car7 = await cars.createCar(newCar7);
    let car8 = await cars.createCar(newCar8);
    let car9 = await cars.createCar(newCar9);
    let car10 = await cars.createCar(newCar10);
    let car11 = await cars.createCar(newCar11);
    let car12 = await cars.createCar(newCar12);
    let car13 = await cars.createCar(newCar13);
    let car14 = await cars.createCar(newCar14);
    let car15 = await cars.createCar(newCar15);
    let car16 = await cars.createCar(newCar16);
    let car17 = await cars.createCar(newCar17);
    let car18 = await cars.createCar(newCar18);
    let car19 = await cars.createCar(newCar19);
    let car20 = await cars.createCar(newCar20);
    let car21 = await cars.createCar(newCar21);
    let car22 = await cars.createCar(newCar22);
    let car23 = await cars.createCar(newCar23);
    let car24 = await cars.createCar(newCar24);
    

   
    //past cars
    let rentInfo1 = await rentingInfo.create("12/11/2018", "12/15/2018", true, "A", "C", 5*car3.price, (user16._id).toString(), (car3._id).toString());
    await users.updatePastRentedPatch((user16._id).toString(),(rentInfo1._id).toString());
    let review1 = await reviews.createReview(5, "Good Car", "", Date(), (rentInfo1.userId).toString(), (rentInfo1.carId).toString(), (rentInfo1._id).toString());

    await users.updateSavedCarsArray((user16._id).toString(),[(car3._id).toString(),(car4._id).toString(), (car10._id).toString(), (car14._id).toString()]);
    let rentInfo2 = await rentingInfo.create("12/20/2020", "12/25/2020", true, "A", "O", 5*car4.price, (user16._id).toString(), (car4._id).toString());
    await users.updateRented((user16._id).toString(),(rentInfo2._id).toString());
    
    let rentInfo3 = await rentingInfo.create("12/13/2018", "12/17/2018", true, "A", "C", 5*car4.price, (user18._id).toString(), (car4._id).toString());
    let review3 = await reviews.createReview(5, "Good Car", "", Date(), (rentInfo2.userId).toString(), (rentInfo2.carId).toString(), (rentInfo2._id).toString());
    await users.updatePastRentedPatch((user18._id).toString(),(rentInfo1._id).toString());
    
    
    let rentInfo4 = await rentingInfo.create("15/1/2017", "21/1/2017", false, "R", "C", 5*car7.price, (user25._id).toString(), (car7._id).toString());
    let review4 = await reviews.createReview(5, "Good Car", "", Date(), (rentInfo4.userId).toString(), (rentInfo4.carId).toString(), (rentInfo4._id).toString());
    await users.updatePastRentedPatch((user25._id).toString(),(rentInfo4._id).toString());

    let rentInfo5 = await rentingInfo.create("2/25/2017", "2/27/2017", false, "R", "C", 2*car12.price, (user25._id).toString(), (car11._id).toString());
    let review5 = await reviews.createReview(5, "Good Car", "", Date(), (rentInfo5.userId).toString(), (rentInfo5.carId).toString(), (rentInfo5._id).toString());
    await users.updatePastRentedPatch((user25._id).toString(),(rentInfo5._id).toString());

    let rentInfo6 = await rentingInfo.create("3/25/2017", "3/27/2017", false, "R", "C", 2*car13.price, (user25._id).toString(), (car13._id).toString());
    let review6 = await reviews.createReview(1, "No good Car", "", Date(), (rentInfo6.userId).toString(), (rentInfo6.carId).toString(), (rentInfo6._id).toString());
    await users.updatePastRentedPatch((user25._id).toString(),(rentInfo6._id).toString());

    let rentInfo7 = await rentingInfo.create("2/25/2020", "2/27/2020", true, "A", "C", 2*car15.price, (user25._id).toString(), (car15._id).toString());
    let review7 = await reviews.createReview(5, "Okay Car", "", Date(), (rentInfo7.userId).toString(), (rentInfo7.carId).toString(), (rentInfo7._id).toString());
    await users.updatePastRentedPatch((user25._id).toString(),(rentInfo7._id).toString());

    let rentInfo8 = await rentingInfo.create("5/15/2020", "5/17/2020", true, "A", "C", 2*car15.price, (user20._id).toString(), (car15._id).toString());
    let review8 = await reviews.createReview(5, "Okay Car", "", Date(), (rentInfo8.userId).toString(), (rentInfo8.carId).toString(), (rentInfo8._id).toString());
    await users.updatePastRentedPatch((user20._id).toString(),(rentInfo8._id).toString());

    let rentInfo9 = await rentingInfo.create("6/15/2020", "6/17/2020", true, "A", "C", 2*car15.price, (user19._id).toString(), (car15._id).toString());
    let review9 = await reviews.createReview(5, "Good Car", "", Date(), (rentInfo9.userId).toString(), (rentInfo9.carId).toString(), (rentInfo9._id).toString());
    await users.updatePastRentedPatch((user19._id).toString(),(rentInfo9._id).toString());

    let rentInfo10 = await rentingInfo.create("7/15/2020", "7/25/2020", true, "A", "C", 10*car15.price, (user18._id).toString(), (car15._id).toString());
    let review10 = await reviews.createReview(4, "Good Car", "", Date(), (rentInfo10.userId).toString(), (rentInfo10.carId).toString(), (rentInfo10._id).toString());
    await users.updatePastRentedPatch((user18._id).toString(),(rentInfo10._id).toString());

    let rentInfo11 = await rentingInfo.create("7/15/2019", "7/15/2019", true, "A", "C", 10*car12.price, (user18._id).toString(), (car12._id).toString());
    let review11 = await reviews.createReview(2, "No good", "", Date(), (rentInfo11.userId).toString(), (rentInfo11.carId).toString(), (rentInfo11._id).toString());
    await users.updatePastRentedPatch((user18._id).toString(),(rentInfo11._id).toString());

    let rentInfo12 = await rentingInfo.create("7/15/2018", "7/25/2018", true, "A", "C", 10*car12.price, (user18._id).toString(), (car12._id).toString());
    let review12 = await reviews.createReview(5, "Good Car", "", Date(), (rentInfo12.userId).toString(), (rentInfo12.carId).toString(), (rentInfo12._id).toString());
    await users.updatePastRentedPatch((user18._id).toString(),(rentInfo12._id).toString());

    let rentInfo13 = await rentingInfo.create("7/15/2018", "7/25/2018", true, "A", "C", 10*car16.price, (user20._id).toString(), (car14._id).toString());
    let review13 = await reviews.createReview(3, "Good Car", "", Date(), (rentInfo13.userId).toString(), (rentInfo13.carId).toString(), (rentInfo13._id).toString());
    await users.updatePastRentedPatch((user20._id).toString(),(rentInfo13._id).toString());
    //-----------------------------------------------------------------------------------_________-----__----_--_----_--_-__-_-___
    
    
    let rentInfo14 = await rentingInfo.create("8/15/2018", "7/24/2018", false, "R", "C", 9*car15.price, (user23._id).toString(), (car14._id).toString());
    let review14 = await reviews.createReview(3, "Good Car", "", Date(), (rentInfo14.userId).toString(), (rentInfo14.carId).toString(), (rentInfo14._id).toString());
    await users.updatePastRentedPatch((user23._id).toString(),(rentInfo14._id).toString());

    let rentInfo15 = await rentingInfo.create("7/15/2018", "7/23/2018", false, "R", "C", 8*car20.price, (user20._id).toString(), (car14._id).toString());
    let review15 = await reviews.createReview(2, "Not good", "", Date(), (rentInfo15.userId).toString(), (rentInfo15.carId).toString(), (rentInfo15._id).toString());
    await users.updatePastRentedPatch((user20._id).toString(),(rentInfo15._id).toString());

    let rentInfo16 = await rentingInfo.create("3/11/2018", "3/25/2018", false, "R", "C", 14*car11.price, (user20._id).toString(), (car11._id).toString());
    let review16 = await reviews.createReview(3, "Good Car", "", Date(), (rentInfo16.userId).toString(), (rentInfo16.carId).toString(), (rentInfo16._id).toString());
    await users.updatePastRentedPatch((user20._id).toString(),(rentInfo16._id).toString());

    let rentInfo17 = await rentingInfo.create("7/10/2020", "7/25/2020", false, "R", "C", 15*car19.price, (user24._id).toString(), (car19._id).toString());
    let review17 = await reviews.createReview(4, "Good Car", "", Date(), (rentInfo17.userId).toString(), (rentInfo17.carId).toString(), (rentInfo17._id).toString());
    await users.updatePastRentedPatch((user24._id).toString(),(rentInfo17._id).toString());

    let rentInfo18 = await rentingInfo.create("8/15/2018", "8/25/2018", false, "R", "C", 10*car12.price, (user19._id).toString(), (car12._id).toString());
    let review18 = await reviews.createReview(1, "Bad services", "", Date(), (rentInfo18.userId).toString(), (rentInfo18.carId).toString(), (rentInfo18._id).toString());
    await users.updatePastRentedPatch((user19._id).toString(),(rentInfo18._id).toString());

    let rentInfo19 = await rentingInfo.create("7/20/2018", "7/25/2018", false, "R", "C", 5*car1.price, (user25._id).toString(), (car14._id).toString());
    let review19 = await reviews.createReview(3, "Good Car", "", Date(), (rentInfo19.userId).toString(), (rentInfo19.carId).toString(), (rentInfo19._id).toString());
    await users.updatePastRentedPatch((user25._id).toString(),(rentInfo19._id).toString());

    let rentInfo20 = await rentingInfo.create("7/15/2019", "7/25/2019", true, "A", "C", 10*car8.price, (user20._id).toString(), (car8._id).toString());
    let review20 = await reviews.createReview(4, "Good Car", "", Date(), (rentInfo20.userId).toString(), (rentInfo20.carId).toString(), (rentInfo20._id).toString());
    await users.updatePastRentedPatch((user20._id).toString(),(rentInfo20._id).toString());
    
    let rentInfo21 = await rentingInfo.create("7/1/2018", "7/25/2018", true, "A", "C", 25*car2.price, (user23._id).toString(), (car2._id).toString());
    let review21 = await reviews.createReview(5, "Good Car", "", Date(), (rentInfo21.userId).toString(), (rentInfo21.carId).toString(), (rentInfo21._id).toString());
    await users.updatePastRentedPatch((user23._id).toString(),(rentInfo21._id).toString());

    let rentInfo22 = await rentingInfo.create("7/5/2020", "7/25/2020", true, "A", "C", 20*car1.price, (user16._id).toString(), (car1._id).toString());
    let review22 = await reviews.createReview(3, "Good Car", "", Date(), (rentInfo22.userId).toString(), (rentInfo22.carId).toString(), (rentInfo22._id).toString());
    await users.updatePastRentedPatch((user16._id).toString(),(rentInfo22._id).toString());

    /////-------------------------__--_--_----_-_-_--_-_________-----_-_--_--_-_--_--_--_--_--_----_----_--_--_-_-

    

    ///--------__--_--_--_--__-__-_--_--______--_--_--_--_-_--_--_-

    review1 = await reviews.updateReview((review1._id).toString(), "Thank you");
    review9 = await reviews.updateReview((review9._id).toString(), "It my pleasure");
    review11 = await reviews.updateReview((review11._id).toString(), "We will make it more better");
    review19 = await reviews.updateReview((review19._id).toString(), "It my pleasure");
    review17 = await reviews.updateReview((review17._id).toString(), "Thank you");
    review22 = await reviews.updateReview((review22._id).toString(), "It my pleasure");
    review15 = await reviews.updateReview((review15._id).toString(), "It my pleasure");
    
    review4 = await reviews.updateReview((review4._id).toString(), "It my pleasure");
    review14 = await reviews.updateReview((review14._id).toString(), "We will make it more better");
    review21 = await reviews.updateReview((review21._id).toString(), "It my pleasure");
    review20 = await reviews.updateReview((review20._id).toString(), "It my pleasure");
    
    
    
    await users.updatePostedArray((user1._id).toString(),[(car1._id).toString(), (car2._id).toString()]);
    await users.updatePostedCarPatch((user2._id).toString(),(car3._id).toString());
    await users.updatePostedCarPatch((user3._id).toString(),(car4._id).toString());
    await users.updatePostedCarPatch((user4._id).toString(),(car5._id).toString());
    await users.updatePostedCarPatch((user4._id).toString(),(car6._id).toString());
    await users.updatePostedCarPatch((user5._id).toString(),(car7._id).toString());
    await users.updatePostedCarPatch((user6._id).toString(),(car8._id).toString());
    await users.updatePostedCarPatch((user7._id).toString(),(car9._id).toString());
    await users.updatePostedCarPatch((user7._id).toString(),(car10._id).toString());
    await users.updatePostedCarPatch((user7._id).toString(),(car11._id).toString());
    await users.updatePostedCarPatch((user7._id).toString(),(car12._id).toString());
    await users.updatePostedCarPatch((user7._id).toString(),(car13._id).toString());
    await users.updatePostedCarPatch((user8._id).toString(),(car14._id).toString());
    await users.updatePostedCarPatch((user9._id).toString(),(car15._id).toString());
    await users.updatePostedCarPatch((user9._id).toString(),(car16._id).toString());
    await users.updatePostedCarPatch((user10._id).toString(),(car17._id).toString());
    await users.updatePostedCarPatch((user10._id).toString(),(car18._id).toString());
    await users.updatePostedCarPatch((user10._id).toString(),(car19._id).toString());
    await users.updatePostedCarPatch((user11._id).toString(),(car20._id).toString());
    await users.updatePostedCarPatch((user12._id).toString(),(car21._id).toString());
    await users.updatePostedCarPatch((user13._id).toString(),(car22._id).toString());
    await users.updatePostedCarPatch((user14._id).toString(),(car23._id).toString());
    await users.updatePostedCarPatch((user15._id).toString(),(car24._id).toString());
    

    await users.updateSavedCarsArray((user16._id).toString(),[(car3._id).toString(),(car1._id).toString(), (car17._id).toString()]);
    await users.updateSavedCarsArray((user17._id).toString(),[(car12._id).toString(),(car14._id).toString(), (car15._id).toString()]);
    await users.updateSavedCarsArray((user18._id).toString(),[(car13._id).toString(),(car24._id).toString(), (car17._id).toString()]);
    await users.updateSavedCarsArray((user19._id).toString(),[(car14._id).toString(),(car14._id).toString(), (car11._id).toString(), (car10._id).toString()]);
    await users.updateSavedCarsArray((user20._id).toString(),[(car23._id).toString(),(car21._id).toString()]);
    await users.updateSavedCarsArray((user21._id).toString(),[(car12._id).toString()]);
    await users.updateSavedCarsArray((user22._id).toString(),[(car1._id).toString(),(car8._id).toString(), (car11._id).toString()]);
    await users.updateSavedCarsArray((user23._id).toString(),[(car3._id).toString(),(car6._id).toString(), (car19._id).toString()]);
    await users.updateSavedCarsArray((user24._id).toString(),[(car4._id).toString(),(car5._id).toString(), (car20._id).toString()]);
    await users.updateSavedCarsArray((user25._id).toString(),[(car7._id).toString(),(car10._id).toString()]);


    await db.serverConfig.close();

    console.log('Done!');
}

main().catch((e) => {
    console.log(e);
})