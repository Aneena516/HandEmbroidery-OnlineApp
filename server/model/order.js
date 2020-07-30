const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  
    design:String,
    material:String,
    color:String,
    size:Number,
});

module.exports = mongoose.model('order',orderSchema,'orders');