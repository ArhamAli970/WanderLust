const express= require("express");
const router= express.Router({mergeParams:true});
// const Review= require("../models_test/review.js");
const asyncWrap=require("../utils/asyncWrap.js");
// const Listing= require("../models_test/listing.js");
const {validateReview, logIn, Revowner}=require("../middleware.js");

const reviewControllers=require("../controllers/review.js");







//post review
router.post("/",logIn,validateReview ,asyncWrap(reviewControllers.createReview));
    
    
    // delete review
router.delete("/:rid",logIn,Revowner,asyncWrap(reviewControllers.destroyReview));


    module.exports=router