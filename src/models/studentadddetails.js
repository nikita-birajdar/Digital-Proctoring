const mongoose = require("mongoose")

const fileBasePath = "uploads";

const studentdetailsSchema = new mongoose.Schema({
    Student_usn:{
        type:String,
        required:true,
        unique:true
    },
    Student_name:{
        type:String,
        required:true
    },
    Proctor_id:{
        type:Number,
        required:true
    },
    Proctor_name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
     File:{
        type:String,
        required:true
     },
     Path:{
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
    Semester:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Tength:{
        type:Number,
        required:true
    },
    Twelfth:{
        type:Number,
        required:true
    },
    CGPA:{
        type:Number,//mongoose.Schema.Types.Double,//schemaTypes.Double, work on this
        required:true
    }


})

const StudentPD = new mongoose.model("studentpersonaldetails", studentdetailsSchema);

module.exports = StudentPD;
module.exports.fileBasePath = fileBasePath;