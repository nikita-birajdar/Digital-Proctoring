const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    }

})

const Admin = new mongoose.model('Admin', adminSchema);

module.exports = Admin;