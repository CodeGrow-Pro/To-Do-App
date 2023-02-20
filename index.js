const express = require('express');
const bodyParser = require('body-parser')
const routers = require('./routes/apis/index')
const morgan = require('morgan')
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
// app.use(morgan('combined'))
// app.use(morgan(':method :url :response-time'))
app.use(morgan('tiny'))
app.get('/',(req,res)=>{
    return res.status(200).send("welcome to Delivery service app!");
})
app.use('/to-do-app',routers);
module.exports = app;

