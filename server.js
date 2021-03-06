require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const url = process.env.MONGO_URI;

mongoose.connect(url , {useNewUrlParser:true , useUnifiedTopology:true,useCreateIndex:true});

const clemSchema = new mongoose.Schema({
key:String,
firstname:String,
lastname:String,
email:String,
dob:String,
bio:String
});

const Clem = mongoose.model("Clem" , clemSchema);

app.use("/users/" , require("./routes/usersRouter"));
app.use(cors());


app.post("/user/" , (req , res)=>{
    const data = req.body;
    console.log(data.firstname,data.lastname,data.email,data.dob,data.bio);
    let randomnumber = Math.floor(Math.random() * 1000);
    const User1 = new Clem({
        key:randomnumber,
        firstname:data.firstname,
        lastname:data.lastname,
        email:data.email,
        dob:data.dob,
        bio:data.bio
    });

    Clem.find({}, (err , foundUsers)=>{
        if(foundUsers.length === 0){
            User1.save((err)=>{
                if(!err){
                    console.log("First user saved");
                }
            })
        }else{
            User1.save((err)=>{
                console.log("User saved");
            });
        }
    });
});

app.get("/clem" , (req , res)=>{
    Clem.find({}, (err , foundUsers)=>{
        res.send({data : foundUsers});
    });
});

app.post("/delete" , (req , res)=>{
    let id = req.body.key;
    console.log(req.body.key);
    Clem.deleteOne({key : id} , (err,foundId)=>{
        if(!err){
            console.log("Successfully deleted");
        }else{
            console.log("Not found");
        }
    });
});

app.post("/edit" , (req , res)=>{
    let id = req.body;
    console.log(req.body);
    Clem.updateMany({key : id} , (err,foundId)=>{
        if(!err){
            console.log("Successfully Updated");
        }else{
            console.log("Not found");
        }
    });
});

app.listen(4000 , ()=>{
    console.log("Server has started at port 4000");
});