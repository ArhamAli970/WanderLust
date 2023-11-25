const Listing= require("../models_test/listing.js");


module.exports.index=async(req,res)=>{

    let list=await Listing.find({});
    res.render("listing/index.ejs",{list});
    }

module.exports.renderNewForm=(req,res)=>{ 
    // req.user -> will give undefined if we are not login else give an object with credentials
// use to check wther user login or not
     // if(!req.isAuthenticated()){ 
     //     // console.log(req.originalUrl);
     //  req.session.url=req.originalUrl;
     // //  res.locals.url=req.originalUrl;
     //  req.flash("failure","Log in Please!");
     //   return res.redirect("/login");
     // }

     res.render("listing/new.ejs");
 }

 module.exports.showListing=async(req,res)=>{ 
    // console.log("hei");
    let {id}=req.params;
    const list=await Listing.findById(id).populate({path:"reviews",populate:{
        path :"author"
    }}).populate("owner");
    // console.log(list);
    if(!list){ 
        req.flash("failure","Listing not exist");
        return res.redirect("/login");
    }
    res.render("listing/show.ejs",{list});
}

module.exports.createListing=async(req,res,next)=>{ 
    // let {title,description,image,price,location,country}=req.body;
    // let listing= new Listing({
    //     title:title,
    //     description:description
    // })
     // let l= new Listing(req.body.list);
    //  if(!req.body.list){ 
    //     return next( new ExpressError(404,"send valid data"));
    //  }

  let url=req.file.path;
  let filename=req.file.filename;
//   console.log(url,"----",filename)
    let newListing= new Listing(req.body.list);
    newListing.image={url,filename};
    newListing.owner=req.user._id;
    await newListing.save();

    console.log(req.body,req.file); 

//    console.log("df");
    req.flash("success","Listing add Succesfully");
    // console.log("af");
    res.redirect("/listings");

}


module.exports.renderEditForm=async(req,res,next)=>{ 
    // if(!req.isAuthenticated()){ 
    //     req.session.url=req.originalUrl;
    //     req.flash("failure","Log in Please!");
    //     return res.redirect("/login");
    //    }

    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing){ 
        req.flash("failure","Listing not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
     originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
 
    res.render("listing/edit.ejs",{listing,originalImageUrl});
    }


    module.exports.edited=async(req,res)=>{ 
        // if(!req.isAuthenticated()){ 
        //     req.flash("failure","Log in Please!");
        //     return res.redirect("/login");
        //    }
        let {id}=req.params;// console.log(id,currUser._id,list.owner._id);
    
        let url=req.file.path;
        let filename=req.file.filename;
        if(req.file){
        let list= await Listing.findByIdAndUpdate(id,req.body.list);
        list.image={url,filename};
        await list.save();
        }
        req.flash("success","Listing Updated Succesfully");
        res.redirect(`/listings/${id}`);
    }


    module.exports.deleteListing=async(req,res)=>{ 

        
        let {id}=req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success","Listing Deleted");
        res.redirect("/listings");
    }