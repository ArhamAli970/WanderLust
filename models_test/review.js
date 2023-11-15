// const { number, date } = require('joi');
const mongoose= require('mongoose');


// async function main(){ 
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
//  }
 
//  main()
//  .then(()=>{
//      console.log("connect");
//  })
//  .catch((err)=>{ 
//   console.log(err);
//  })

 const reviewSchema= new mongoose.Schema({ 
    comment:{ 
        type:String
    },
    rating:{ 
        type:Number,
        min:1,
        max:5
    },
    date: {
        type: Date, // Specify the field type as Date
        default: Date.now, // Set the default value to the current date and time
      },
   
      author:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }

 })

 module.exports= mongoose.model('Review',reviewSchema);