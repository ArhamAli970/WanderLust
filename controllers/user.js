const User=require("../models_test/user.js");


module.exports.renderSignUp=(req,res)=>{ 
    res.render("./user/signup.ejs");
}


module.exports.signUp=async(req,res,next)=>{ 
    try{
    let {username,email,password}=req.body;
    const newUser= new User({username,email});
    const regUser=await User.register(newUser,password);
    console.log(regUser);
    req.login(regUser,(err)=>{ 
        if(err){
            return next(err);
        }else{ 
            req.flash("success","NEW USER REGISTER");
            res.redirect("/listings");
        }
    })}
    catch(e){ 
        req.flash("failure",e.message);
        res.redirect("/signup");
    }
}


module.exports.renderLogIn=(req,res)=>{ 
    // console.log(res.locals.url);
    // console.log("ds");
    res.render("./user/login.ejs");
}

module.exports.logIn=(req,res)=>{
    req.flash("success","welcome back to wanderlust");
    console.log(res.locals.url);
    let red=res.locals.url || "/listings";
    res.redirect(red);
}

module.exports.logOut=(req,res,next)=>{ 
    req.logout((err)=>{ 
        if(err){ 
           return next(err);
        }
        else{ 
            req.flash("success","succesfully logout");
            res.redirect("/listings");
        }
    })
}