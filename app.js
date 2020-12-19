const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const static = express.static(__dirname + '/public');
app.use('/public', static);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
})) 

app.use("/", async(req,res,next)=>{
 
  
   req.session.accessCount=1;  
  if(!req.session.AuthCookie 
    && req.originalUrl!="/users/login"
    && req.originalUrl!="/users/createUser"
    && req.originalUrl!="/users/logout"
    && req.originalUrl!="/home"
    && req.originalUrl!="/home/welcome"
    && req.originalUrl!="/"
    && req.originalUrl!="/home/search"
    && (!req.originalUrl.match(/carImage/))
    && req.originalUrl!="/admin"
    && req.originalUrl!="/admin/adminLogin"
    && req.originalUrl!="/admin/homePage"
    && req.originalUrl!=="/admin/adminDelete"
    //&& req.originalUrl!="/cars/createCar"
    //&& req.originalUrl!="/cars/profile/:id"
    //&& req.originalUrl!="/cars/carProfile/:id"
    //&& req.originalUrl!="/rentingInfo/test"
  )
  {
    res.status(401);
    res.redirect("/home");
  }
  else if(req.session.AuthCookie && req.originalUrl=="/")
  res.redirect("/home");
  else
  next();
}); 


app.use("/users/login", async(req,res,next)=>{
  if(req.session.AuthCookie)  
    res.redirect("/users/profile");
    else
    next();
});

app.use("/users/createUser", async(req,res,next)=>{
  if(req.session.AuthCookie)  
    res.redirect("/users/profile");
    else
    next();
});



configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});



