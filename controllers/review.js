const Review= require("../models_test/review.js");
const Listing= require("../models_test/listing.js");

module.exports.createReview=async(req,res)=>{ 
    let {id}= req.params;
    // console.log(id);
    let list=await Listing.findById(id);
    let newRev=new Review(req.body.review);
    newRev.author=req.user._id;
    console.log(newRev);

    list.reviews.push(newRev);
    
    
    await list.save();
    await newRev.save();
    req.flash("success","Review add Succesfully");
    res.redirect(`/listings/${id}`)
    }

module.exports.destroyReview=async(req,res)=>{ 
    let{id,rid}=req.params;
    // console.log(id,rid);
    
    await Listing.findByIdAndUpdate(id, {$pull: { reviews:rid}});
    await Review.findByIdAndDelete(rid);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`)
}