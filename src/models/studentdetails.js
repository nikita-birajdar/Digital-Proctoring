const mongoose = require("mongoose")

const schemaTypes = mongoose.Schema.Type;

const studentSchema = new mongoose.Schema({
    Student_usn:{
        type:String,
        required:true,
        unique:true
    },
    Student_name:{
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
        type:Number,//schemaTypes.Double, work on this
        required:true
    }


})

const Student = new mongoose.model("studentdetails", studentSchema);

module.exports = Student;