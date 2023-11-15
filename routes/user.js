const express= require("express");
const router= express.Router();
// const mongoose=require("mongoose");

const asyncWrap = require("../utils/asyncWrap.js");
const passport = require("passport");
const {mid}=require("../middleware.js");
const userController=require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignUp)
.post(asyncWrap(userController.signUp));


router.route("/login")
.get(userController.renderLogIn)
.post(mid,
passport.authenticate("local", 
{
    failureRedirect:"/login",
    failureFlash:true,
}) 
,userController.logIn);




router.get("/logout",userController.logOut);

module.exports=router

