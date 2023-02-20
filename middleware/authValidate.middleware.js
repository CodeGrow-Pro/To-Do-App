const jwt = require('jsonwebtoken')
const key = require('../configs/scretKey')
exports.isValieduser = (req,res,next)=>{
  if(!req.headers.authorization){
    return res.status(400).send({
      message:"bad request"
  })
  }
       const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token,key.scretKey,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            })
        }
        req.userId = decoded.userId;
        next()
      })
}