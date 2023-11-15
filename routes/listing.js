const express= require("express");
const router= express.Router();
// const mongoose=require("mongoose");

const Listing= require("../models_test/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudAnalogy.js")
const upload = multer({ storage })
const asyncWrap=require("../utils/asyncWrap.js");
const {logIn,owner,validateListing}=require("../middleware.js");
const { index, renderNewForm, showListing, createListing, renderEditForm, edited, deleteListing } = require("../controllers/listing.js");



//  we can use now router.route to combine multiple routes of same path 

router.route("/")
.get(asyncWrap(index))
.post(logIn,upload.single('list[image]'),validateListing,asyncWrap(createListing));


 // Create new Route
 router.get("/new",logIn,renderNewForm);

//  router.get(":/id",showListing);

router.route("/:id")
.get(asyncWrap(showListing))
.put(logIn,owner,upload.single('list[image]'), validateListing,asyncWrap(edited))
.delete(logIn,
owner,asyncWrap(deleteListing));




      

    //show route
    
router.get("/:id/edit",logIn,owner,asyncWrap(renderEditForm));
    


module.exports=router
    