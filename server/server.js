const express = require('express');
const bodyparser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');
const orderRouter = require('../server/routes/orderroute');

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/api',api);
app.use('/orders',orderRouter)


app.get('/',(req,res)=>{
    res.send("Hello from Server");
})




app.listen(port,function(){
    console.log("Server running on localhost:"+port);
})