const mongoose = require("mongoose");

const uploadPath = "uploads";

const noteSchema = new mongoose.Schema({
    Proctor_id:{
        type:Number,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    File:{
        type:String,
        required:true
    },
    Path:{
        type:String,
        reuired:true
    },
    Info:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    }
})

const sendnote = new mongoose.model("notes",noteSchema);

module.exports = sendnote;
module.exports.uploadPath = uploadPath;