const mongoose =require ("mongoose");


const urlSchema =new mongoose.Schema({
   redirectURL: {
      type: String,
      required: true,
      unique: true,
 },
 shortID: {  
      type: String,
      required: true,
 },

     visitHistory: [{timestamps:{type:Number}}],

    }, 
    {timestamps: true}
);
const URL =mongoose.model("URL", urlSchema);

module.exports =URL ;
