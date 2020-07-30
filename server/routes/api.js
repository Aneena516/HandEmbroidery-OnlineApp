const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../model/order')
const User = require('../model/user');
const db = 'mongodb+srv://user_aneena:Wem29VFhSd4aQMuy@mycluster.daur6.azure.mongodb.net/eventsdb?retryWrites=true&w=majority'

mongoose.connect(db,function(err){
    if(err){
        console.log("error:"+err);
    }else{
        console.log("connected to mongodb");
    }
})
router.get('/',(req,res)=>{
    res.send("From API");
});

router.post('/signup',(req,res)=>{
   
    let userData = req.body;
    let user = new User(userData);
    user.save((err,registeredUser)=>{
        if(err){
            console.log('error:'+err);
        }else{
            res.status(200).send(registeredUser);
            console.log(registeredUser);
        }
    })
})

router.post('/login',(req,res)=>{

    let userData = req.body;
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log('error:'+err)
        }else
        if(!user){
             res.status(401).send('Invalid email');
        }else
        if(user.password!==userData.password){
            res.status(401).send('Invalid Password');
        }else{
            res.status(200).send(user);
           
        }
    })
})


module.exports= router;