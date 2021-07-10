const express = require("express");
const session = require('express-session');
const path = require("path");
const app = express();
const validator = require('validator');


//const mongo 
require("./db/conn");

const Student = require("./models/studentregister");
const Admins = require("./models/adminlogin");
const Proctor = require("./models/proctorregister");
const AdminAddStudent = require("./models/adminaddstudent");
const AddStudentDetails = require("./models/studentadddetails");
const Addnote = require("./models/sendnote");
const upload = require("./models/upload");
const Feedback = require("./models/feedback");
const { json, response } = require("express");
const { Mongoose } = require("mongoose");
const { request } = require("http");
//const Admin = require("./models/adminlogin");

const port = process.env.PORT || 4000;

const static_path = path.join(__dirname, "..")
//console.log(path.join(__dirname, ".."));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", static_path);

//upload files in the specified path which is mentioned in models/AddStudentDetails.js
const uploadpath = AddStudentDetails.fileBasePath;


// Session Setup
app.use(session({
  
    // It holds the secret key for session
    secret: 'Your_Secret_Key',
  
    // Forces the session to be saved
    // back to the session store
    resave: true,
  
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}))

//index pag
app.get("/", (req, res)=>{

    req.session.proctorId = null;
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.render("index");
    });

});

//adminlogin

app.post("/adminlogin", async(req, res) => {
   
    try{

        const adminname = req.body.user;
        const adminpassword = req.body.pass;
        
        const name = await Admins.findOne({name:adminname});
        if(name.password == adminpassword){
            res.status(200).render("addstudent",{EP:''});
        }else{
            res.status(400),send("invalid login details1");
        }
      }catch(err){
        res.status(400).send(`invalid login details`);
        }
});

//To Create API Through Postman
app.get("/addadmin", async(req, res) =>{
    res.render("addadmin",{success:''});
});

app.post("/addadmin", async(req, res) => {
   
    //To create API of Admins
        const Admin = new Admins(req.body);
        Admin.save().then(() => {
            res.status(201).render("adminlogin");
        }).catch((e) => {
            res.status(400).send(e);
        });
});


//Student details
app.get("/student", async(req, res) =>{
    res.render("student",{success:'',message:''});
});

app.post("/adminaddstudentdetails", async(req, res) =>{
      
    try{
        if(validator.isStrongPassword(req.body.password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          }))
    {
       const AdminAddStudents = new AdminAddStudent({
        Student_usn: req.body.studentid,
        Student_name: req.body.studentname,
        Proctor_id: req.body.proctorid,
        Proctor_name: req.body.proctorname,
        Email:req.body.email,
        Class: req.body.class,
        Department: req.body.department,
        Password: req.body.password

       })
 
       const registered = await AdminAddStudents.save();
        res.render("addstudent", {success:'',EP:''})
    }
    else{
        res.render("addstudent", {success:'',EP:'Password is not Strong'})
    }
    }catch(e){
        res.send(`something went wrong ${e}`);
    }


});

//sendfeedback
app.post("/sendfeedback", async(req, res) =>{
      
    try{

       const Feedbacks = new Feedback({
        Student_usn: req.body.studentid,
        Proctor_id: req.body.proctorid,
        Feedback: req.body.feedback,
        Rating: req.body.rating,
        Date:req.body.DOB

       })
 
       const registered = await Feedbacks.save();
        res.render("sendfeedback", {success:'',records:req.session.proctorId,feed:'Feedback Sent'})
    }catch(e){
        res.send(`something went wrong ${e}`);
    }


});

//
app.post("/studentdetails", async(req, res) =>{
      
    try{
        if(validator.isEmail(req.body.email) && validator.isStrongPassword(req.body.password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          }))
        {
       const AdminAddStudents = new AdminAddStudent({
        Student_usn: req.body.studentid,
        Student_name: req.body.studentname,
        Email:req.body.email,
        Proctor_id: req.body.proctorid,
        Proctor_name: req.body.proctorname,
        Class: req.body.class,
        Department: req.body.department,
        Password: req.body.password

       })
 
       const registered = await AdminAddStudents.save();
        res.render("addstudent", {success:'',EP:''})
    }
    else
    {
        res.render("addstudent", {success:'',EP:'Check Email and Password Matching the criteria'})
    }
    }catch(e){
        res.send(`something went wrong ${e}`);
    }


});

//Proctor details
app.get("/addproctordetails", async(req, res) =>{
    res.render("addproctor",{success:''});
});

app.post("/addproctordetails", async(req, res) =>{
      
    try{
        if(validator.isEmail(req.body.email) && validator.isStrongPassword(req.body.password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          }))
    {
       const proctordetails = new Proctor({
        Proctor_id: req.body.proctorid,
        Proctor_name: req.body.proctorname,
        Gender: req.body.gender,
        Email: req.body.email,
        Phonenumber: req.body.phonenumber,
        Department: req.body.department,
        Password: req.body.password

       })

       const registered = await proctordetails.save();
        res.render("addstudent", {success:'',EP:''});
    }
    else
    {
        res.render("addstudent", {success:'',EP:'Email or Password Not Matching with the criteria'});
    }
    }catch(e){
        res.send(`something went wrong${e}`);
    }


});

//Student Login
app.get("/studentlogin", async(req, res) => {
        res.redirect("/viewnotes");
});

app.post("/studenttlogin", async(req, res) => {
        
        try{
    
            const studentname = req.body.username;
            const studentpassword = req.body.password;
            
            const name = await AdminAddStudent.findOne({Email:studentname});

            req.session.studentId = name.Student_usn;
            req.session.studentName = name.Student_name;
            req.session.proctorsId = name.Proctor_id;
            req.session.proctorsName = name.Proctor_name;
            const pd = await AddStudentDetails.findOne({Student_usn:req.session.studentId});

            if(pd != null)
            {
            req.session.sdepartment = pd.Department;
            }
            else{
                req.session.sdepartment = name.Department;
            }
            

            if(name.Password == studentpassword){
                res.status(200).redirect("/viewnotes");
            }else{
                res.status(400).send("invalid login details1");
            }
        
        }catch(err){
            res.status(400).send(`invalid login details ${err}`);
        }
 });


 //Proctor Login
app.get("/proctorlogin", async(req, res) => {
    res.render("proctorlogin",{message:'',note:''});
});

app.post("/proctorlogin", async(req, res) => {

    try{

        const proctorname = req.body.username;
        const proctorpassword = req.body.password;
        
        //console.log(proctorname,proctorpassword);
        const name = await Proctor.findOne({Email:proctorname});
        
        req.session.proctorId = name.Proctor_id;
        //console.log(name.Password);
    if(proctorpassword != "undefined"){
        
        if(name.Password == proctorpassword){
            res.status(200).render("addnotes",{title:"Proctor Id", records:req.session.proctorId,note:''});
        }else{
            res.status(400).send("invalid login details1");
        }

    }else{
        res.status(400).send("invalid login details2");
    }
    
    }catch(err){
        res.status(400).send(`invalid login details ${err}`);
    }
});

app.post("/forgotpassword", async(req, res) =>{
    console.log("call");
    try{
        const Student_usn = req.body.studentid;
        const password = req.body.password; 
        console.log(`${Student_usn} ${password}`);
        const getid = await AdminAddStudent.findOne({Student_usn});

        console.log(`${getid._id}`);
        const _id = getid._id;
        //const updatepassword = await Student.findByIdAndUpdate(_id,Password=password,{new:true});
        const updatepassword = await AdminAddStudent.updateOne({_id},{Password:password});
        //console.log(`${updatepassword}`);
        res.render("student",{message:'Password Changed Successfully'});

    }catch(e){
        res.status(400).send(`invalid login details ${e}`);
    }
});

app.post("/proctorforgotpassword", async(req, res) =>{
    console.log("call");
    try{
        const Proctor_id = req.body.proctorid;
        const password = req.body.password; 
        console.log(`${Proctor_id} ${password}`);
        const getid = await Proctor.findOne({Proctor_id});

        console.log(`${getid._id}`);
        const _id = getid._id;
        //const updatepassword = await Student.findByIdAndUpdate(_id,Password=password,{new:true});
        const updatepassword = await Proctor.updateOne({_id},{Password:password});
        //console.log(`${updatepassword}`);
        res.render("proctorlogin",{message:'Password Changed Successfully'});

    }catch(e){
        res.status(400).send(`invalid login details ${e}`);
    }
});

//addstudentpersonalinfo
app.post("/addstudentpersonalinfo",upload.single("resume"),async(req, res) => {
    try{
        // console.log(upload.single(req.body.resume));

        const filename = req.file != null ? req.file.originalname : null;
        const downloadpath = req.file != null ? req.file.path:null;

       const StudentPD = new AddStudentDetails({
        Student_usn:req.body.studentid,
        Student_name:req.body.studentname,
        Proctor_id:req.body.proctorid,
        Proctor_name:req.body.proctorname,
        Email:req.body.email,
        File:filename,//req.file.uploadpath ,//req.body.resume,
        Path:downloadpath,
        Gender:req.body.gender,
        Phonenumber:req.body.phonenumber,
        Semester:req.body.semester,
        Department:req.body.department,
        DOB:req.body.DOB,
        Address:req.body.address,
        Tength:req.body.tength,
        Twelfth:req.body.twelfth,
        CGPA:req.body.cgpa
        })
      const registered =  StudentPD.save();
      res.render("addstudentpersonalinfo",{title:"Student Id", records:req.session.studentId, sn:req.session.studentName, pi:req.session.proctorsId, pn:req.session.proctorsName})

    }catch(err){
        res.status(400).send(`not successfull ${err}`);
    }

});

//send note with files
app.post("/addnotes",upload.single("file"),async(req, res) => {
    try{
        // console.log(upload.single(req.body.resume));

        const filename = req.file != null ? req.file.originalname : null;
        const downloadpath = req.file != null ? req.file.path:null;

       const sendnote = new Addnote({
        Proctor_id:req.body.proctorid,
        File:filename,//req.file.uploadpath ,//req.body.resume,
        Path:downloadpath,
        Department:req.body.department,
        Info:req.body.info,
        Date:req.body.date
        })
      const registered =  sendnote.save();
      res.render("addnotes",{title:"Proctor Id", records:req.session.proctorId,note:'Note Added Successfully'})

    }catch(err){
        res.status(400).send(`not successfull ${err}`);
    }

});

//to render pages when you click on links
app.get("/addstudentpersonalinfo", async(req, res) =>{
    
    res.render('addstudentpersonalinfo', { title: 'Student Records', records:req.session.studentId, sn:req.session.studentName, pi:req.session.proctorsId, pn:req.session.proctorsName });
          
});

app.get("/forgotpassword", async(req, res) =>{
    res.render("forgotpassword");
});

app.get("/proctorforgotpassword", async(req, res) =>{
    res.render("proctorforgotpassword");
});

app.get("/addnotes", async(req, res) =>{
        res.render("addnotes",{title:"Proctor Id", records:req.session.proctorId,note:''});
});

app.get("/addproctor", async(req, res) =>{
    res.render("addproctor");
});

app.get("/addstudent", async(req, res) =>{
    res.render("addstudent",{EP:''});
});

app.get("/adminlogin", async(req, res) =>{
    res.render("adminlogin");
});

app.get("/proctorlogin", async(req, res) =>{
    res.render("proctorlogin",{message:''});
});

app.get("/sendfeedback", async(req, res) =>{
    res.render("sendfeedback",{title: 'Proctor Id', records:req.session.proctorId,feed:''});
});

app.get("/student", async(req, res) =>{
    res.render("student",{message:''});
});

app.get("/viewfeedback", function(req, res, next) {
    Feedback.find({Student_usn:req.session.studentId},function(err,data){
  if(err) throw err;
  res.render('viewfeedback', { title: 'feedback Records', records:data });
    });
});

app.get("/viewnotes", function(req, res, next) {
    Addnote.find({Department:req.session.sdepartment},function(err,data){
  if(err) throw err;
  res.render('viewnotes', { title: 'Notes Records', records:data });
    });
});

app.get('/viewproctor', function(req, res, next) {
    
    Proctor.find(function(err,data){
  if(err) throw err;
  res.render('viewproctor', { title: 'Proctor Records', records:data });
    });
  });

app.get('/viewstudent', function(req, res, next) {
    AdminAddStudent.find(function(err,data){
  if(err) throw err;
  res.render('viewstudent', { title: 'Student Records', records:data });
    });  
  });

app.get('/viewstudentproctor', function(req, res, next) {
   //const filteredData =  AdminAddStudent.find({Proctor_id:req.session.proctorId});
    AdminAddStudent.find({Proctor_id:req.session.proctorId},function(err,data){
  if(err) throw err;
  //data = data.find({Proctor_id:req.session.proctorId});
  //console.log(req.session.proctorId);
  res.render('viewstudentproctor', { title: 'Student Records', records:data });
    });  
  });

  app.get('/viewstudentpersonalinfoproctor', function(req, res, next) {
    //const filteredData =  AdminAddStudent.find({Proctor_id:req.session.proctorId});
    AddStudentDetails.find({Proctor_id:req.session.proctorId},function(err,data){
   if(err) throw err;
   //data = data.find({Proctor_id:req.session.proctorId});
   //console.log(req.session.proctorId);
   res.render('viewstudentpersonalinfoproctor', { title: 'Student Records', records:data });
     });  
   });

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});


