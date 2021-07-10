const mongoose = require("mongoose");

const AdminAddStudentSchema = new mongoose.Schema({
    Student_usn:{
        type:String,
        required:true,
        unique:true
    },
	Proctor_id:{
        type:Number,
        required:true
    },
    Student_name:{
        type:String,
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

const AdminAddStudent = new mongoose.model("AdminAddStudent", AdminAddStudentSchema);

module.exports = AdminAddStudent;