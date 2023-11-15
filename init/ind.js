const express=require("express");
const mongoose=require("mongoose");
const listning=require("../models_test/listing.js");
let data=require("./data.js");

const app= express();

async function main(){ 
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}


main()
.then(()=>{console.log("established");})
.catch((err)=>{console.log(err);}) 




async function de(){ 
 await listning.deleteMany({});
  data= data.map((obj)=>{ 
    return {...obj,owner:"653be6c60880ea83ea0d08d6"};
  })
 await listning.insertMany(data);
 console.log("data inserted");

}

de();
