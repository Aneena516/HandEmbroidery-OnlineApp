const express = require('express');
const orderRouter = express.Router();
const mongoose = require('mongoose');
const Order = require('../model/order')

const db = 'mongodb+srv://user_aneena:Wem29VFhSd4aQMuy@mycluster.daur6.azure.mongodb.net/eventsdb?retryWrites=true&w=majority'
mongoose.connect(db,function(err){
    if(err){
        console.log("error:"+err);
    }else{
        console.log("connected to mongodb");
    }
})

orderRouter.get('/',(req,res)=>{
    res.header('Access-control-Allow-Origin','*')
    res.header('Access-control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    Order.find()
    .then(function(orders){
        res.send(orders)
    })
})

orderRouter.post('/order',(req,res)=>{
    res.header('Access-control-Allow-Origin','*')
    res.header('Access-control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    let orderData = {
        design:req.body.design,
        material:req.body.material,
        color:req.body.color,
        size:req.body.size
    }
    let order = new Order(orderData);
    order.save((err,orderedData)=>{
        if(err){
            console.log('error:'+err);
        }else{
            res.status(200).send(orderedData);
            console.log(orderedData);
        }
    })
})

orderRouter.delete('/delete/:id',(req,res)=>{
  Order.findByIdAndDelete({_id:req.params.id},(err,order)=>{
      if(err){
          res.status(500).json({errmsg:err})
      }else{
          res.status(200).json({msg:order})
      }
  })
})

orderRouter.put('/update/:id',(req,res)=>{
    res.header('Access-control-Allow-Origin','*')
    res.header('Access-control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    let order = {
        design:req.body.design,
        material:req.body.material,
        color:req.body.color,
        size:req.body.size
    }
    Order.findByIdAndUpdate({_id:req.params.id},{$set:order},{new:true},(err,doc)=>{
        if(err){
            res.status(500).json({errmsg:err})
        }else{
            res.status(200).json({msg:doc})
        }
    })
})

module.exports=orderRouter;