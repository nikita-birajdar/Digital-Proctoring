const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    Proctor_id:{
        type:Number,
        required:true
    },
    Student_usn:{
        type:String,
        required:true
    },
    Feedback:{
        type:String,
        required:true
    },
    Rating:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        required:true
    }
})

const Feedback = new mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;