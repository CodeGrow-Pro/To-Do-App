const express = require('express');
const bodyParser = require('body-parser')
const routers = require('./routes/apis/index')
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.get('/',(req,res)=>{
    return res.status(200).send("welcome to Delivery service app!");
})
app.use('/to-do-app',routers);
module.exports = app;

