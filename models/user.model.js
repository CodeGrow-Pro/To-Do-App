const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    taskId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"task"
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        },
      immutable:true
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now()
        }
    }
})
const userModel = mongoose.model('user',userSchema);
module.exports = userModel