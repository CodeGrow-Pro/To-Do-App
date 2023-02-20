const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const key = require('../configs/scretKey')
const jwt = require('jsonwebtoken')
const {workerKilling} = require('../cluster')
const {
    sigup
} = require('../helpers/user.helper')
exports.sigup = async (req, res) => {
    if (!sigup.isValiedBody(req.body)) {
        return res.status(400).send({
            message: "bad request"
        })
    }
    const data = {
        userId: parseInt(Math.random() * 1000),
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 9),
    };
    try {
        const user = await userModel.create(data);
        return res.status(201).send({
            message: "Signup successfully!"
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.login = async (req, res) => {
     const data = req.body;
     try{
        const user = await userModel.findOne({email:data.email});
        if(!user){
            return res.status(404).send({
                message:"user does not exists!"
            })
        }
        const isValied = bcrypt.compareSync(data.password,user.password);
        if(!isValied){
            return res.status(401).send({
                message:"login failed due to invalied password"
            })
        }
        const token  = jwt.sign({userId:user.userId},key.scretKey,{
            expiresIn:'1d'
        })
        return res.status(200).send({
            message:"login successfully",
            userId:user.userId,
            name:user.name,
            email:user.email,
            accessToken:token
        })
     }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"Internal server error!"
        })
     }
}
exports.filter = async (req,res)=>{
    const query = req.query;
    const reqData = {}
    if(query.id){
        reqData._id = query.id;
    }
    if(query.name){
        reqData.name = {
            $regex :query.name
        }
    }
    if(query.email){
        reqData.email = query.email
    }
    try{
        const user = await userModel.find(reqData);
        return res.status(200).send({
            Users : user
         })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"internal server error!"
        })
       }
}
exports.updateUser = async (req,res)=>{
    try{
      const user = await userModel.findOne({userId:req.userId});
           if(!user){
              return res.status(404).send({
                  message:"user does not exists!"
              })
           }
          if(req.body.name){
              user.name = req.body.name
          }
          if(req.body.email){
              user.email = req.body.email
          }
          await user.save();
          return res.status(200).send({
              message:"user update successfully",
              updated_user : user
          })
    }catch(err){
      console.log(err.message)
      return res.status(500).send({
          message:"internal server error!"
      })
     }
}