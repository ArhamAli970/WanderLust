
if(process.env.NODE_ENV!="production"){ 
    require("dotenv").config();
}
// console.log(process.env) 

let link=process.env.ATLASDB_URL;

const express= require("express");
const app= express();
const mongoose=require("mongoose");
const path= require("path")
const methodOverride= require("method-override");
const flash= require("connect-flash");
// const multer=require("multer");
// const {storage}=require("./cloudAnalogy.js")
// const upload=multer({storage})

const ejsM= require("ejs-mate");



app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

const passport=require("passport");

//This module lets you authenticate using a username and password in your Node.js applications.
const LocalStrategy= require("passport-local");
const User=require("./models_test/user.js")


app.engine("ejs",ejsM);

//routers
const listings= require("./routes/listing.js");
const review= require("./routes/review.js");
const user= require("./routes/user.js");


// const Listing= require("./models_test/listing.js");
const ExpressError=require("./utils/expressError.js")

const { error } = require("console");
const err = require("./utils/expressError.js");

// const { lstat } = require("fs");

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));

async function main(){ 
    await mongoose.connect(link);
 }
 
 main()
 .then(()=>{
     console.log("connect");
 })
 .catch((err)=>{ 
  console.log(err);
 })
 

const session =require("express-session");
const MongoStore = require('connect-mongo');
const { url } = require("inspector");

const store = MongoStore.create({
    mongoUrl: link,
    crypto: {
      secret: process.env.SECRET,
    },
    touchAfter:24*3600
  })


  store.on("error",()=>{console.log("error in session")})

  // cookie is used to store the small chunk of data send by the server to user browser
app.use(session({ 
    store:store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,   
    cookie:{ 
    expires:Date.now()+ 7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true  // use for prevent from cross scripting attack
    }
}))



app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{ 
// we can access res or req object in ejs so we use res.locals
    res.locals.message=req.flash("success");
    res.locals.err=req.flash("failure");
    res.locals.currUser=req.user;
    // console.log(res.locals.err);
    next();
})

// console.log("hello");

app.use("/listings",listings);
app.use("/listings/:id/reviews",review)
app.use("/",user);


//Server Side Validations

//Server Side Validations





app.all("*",(req,res,next)=>{ 
    next( new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{ 
    // console.log("yes");
    // console.log(err.message);
    // res.send("something wrong")
    // console.log(err.statusCode);
    let {statusCode=500,message="went wrong"}=err;

    res.status(statusCode).render("error.ejs",{message});
})

app.listen(8080,()=>{ 
    console.log("app listening");
})

//  joi is a module use to validate schema