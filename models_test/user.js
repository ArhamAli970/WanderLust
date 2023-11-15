const mongoose= require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema=new mongoose.Schema({ 
    email:{ 
        type:String,
        required:true
    }

})

//In summary, "plugin" in this context means extending or enhancing a Mongoose schema with additional features or methods provided by a separate module or library, such as passportLocalMongoose. This allows you to reuse common functionality and keep your code more modular and organized.
// 1)passport Local mongoose will provide the hashing username ,salt ,password .
// 2) in addition it provide the methods for authentication , change password, set password

userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User",userSchema);

