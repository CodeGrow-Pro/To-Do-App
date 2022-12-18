const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    isComplete:{
        type:String,
        default:"FALSE",
        enum:["FALSE","TRUE"]
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
const taskModel = mongoose.model('task',taskSchema);
module.exports = taskModel