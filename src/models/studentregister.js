const mongoose = require("mongoose");

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
    Class:{
        type:String,
        required:true
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

const Student = new mongoose.model("StudentLogin", studentSchema);

module.exports = Student;