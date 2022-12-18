const TASK = require('../models/task.model');
exports.createTask = async (req,res)=>{
       const body = req.body
       if(!body.title){
        return res.status(400).send({
            message:"bad request!"
        })
       }
       const reqData = {
        title:body.title
       }
       if(body.description){
             reqData.description = body.description
       }
       try{
                 const task = await TASK.create(reqData)
                 return res.status(201).send({
                    message:"Task created successfully!",
                    Task:task
                 })
       }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"internal server error!"
        })
       }
}
exports.updateTaskStatus = async (req,res)=>{
          const id  = req.params.id;
          try{
            const task = await TASK.findOne({_id:id});
                 if(!task){
                    return res.status(404).send({
                        message:"Task does not exists!"
                    })
                 }
                 if(req.query.iscomplete){
                    task.isComplete = req.query.iscomplete
                }
                await task.save();
                return res.status(200).send({
                    message:"update successfully",
                    updated_task : task
                })
          }catch(err){
            console.log(err.message)
            return res.status(500).send({
                message:"internal server error!"
            })
           }
}
exports.taskFilter = async (req,res)=>{
    const query = req.query;
    const reqData = {}
    if(query.id){
        reqData._id = query.id;
    }
    if(query.title){
        reqData.title = {
            $regex :query.title
        }
    }
    try{
        const task = await TASK.find(reqData);
        return res.status(200).send({
            Tasks:task
         })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"internal server error!"
        })
       }
}