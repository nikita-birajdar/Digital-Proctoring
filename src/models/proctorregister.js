const mongoose = require("mongoose");

const proctorSchema = new mongoose.Schema({
    Proctor_id:{
        type:Number,
        required:true,
        unique:true
    },
    Proctor_name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Phonenumber:
    {
        type:Number,
        required:true,
        min:10
    },
    Department:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

const Proctor = new mongoose.model("proctordetails", proctorSchema);

module.exports = Proctor;