const mongoose  = require('mongoose');
const {logger} = require('./configs/logger')
const winston = require('winston')
const app = require('./index')
require('dotenv').config()
const clusterUseInApp = require('./cluster')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI+process.env.DB_NAME,{family:4},(err)=>{
          if(!err){
            console.log('Node envirnment : ', process.env.NODE_ENV)
            console.log("database connected successfully DataBaseName : ", process.env.DB_NAME);
           clusterUseInApp.appListeningWithCluster(app)
          }
})