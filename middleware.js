const Listing=require("./models_test/listing.js");
const Review=require("./models_test/review.js");
const {listingSchema}= require("./schema_server.js");
const ExpressError=require("./utils/expressError.js");
// const ExpressError=require("./utils/expressError.js");
const {reviewSchema}= require("./schema_server.js");


let logIn=(req,res,next)=>{ 

    if(!req.isAuthenticated()){ 
        // req.session.url=req.originalUrl
        req.flash("failure","Log in Please!");
        return res.redirect("/login");
       }
       next();
}

let mid=(req,res,next)=>{
    
    if(req.session.url){ 
    res.locals.url=req.session.url;
    }
    next();

}

let owner=async(req,res,next)=>{ 
    let {id}=req.params;
    let list= await Listing.findById(id);
    // console.log(list);
        
    if(!list.owner._id.equals(res.locals.currUser._id)){ 
      req.flash("failure","You don't have any permission");
      return res.redirect(`/listings/${id}`);
    }
    next();
}


const validateListing=((req,res,next)=>{ 
    let result=listingSchema.validate(req.body);
    // console.log(result);
    if(result.error){ 
        throw new ExpressError(404,result.error);
    }
    else{ 
        next();
    }
    
 })


 const validateReview=((req,res,next)=>{  
    // console.log(req.body);
    let result=reviewSchema.validate(req.body);
    // console.log(result);
    let {error}=result;
    // console.log(error);
    if(error){ 
        // console.log("yes error");
        next(new ExpressError(404,result.error));
    }
    else{ 
        console.log("no");
        next();
    }
 })



 
let Revowner=async(req,res,next)=>{ 
    let {id,rid}=req.params;
    let list= await Review.findById(rid);
    // console.log(list);
        
    if(!list.author._id.equals(res.locals.currUser._id)){ 
      req.flash("failure","You don't have any permission");
      return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports={logIn,mid,owner,validateListing,validateReview,Revowner};