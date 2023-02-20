const express = require('express');
const userController = require('../../../controllers/user.controller')
const authMiddleware = require('../../../middleware/authValidate.middleware')
const taskController = require('../../../controllers/task.controller')
const route = express.Router();
//-------------------------------signup routes || login routes----------------
route.post('/signup',userController.sigup)
route.post('/login',userController.login);
route.get('/user/filter',authMiddleware.isValieduser,userController.filter)
route.put('/user/update',authMiddleware.isValieduser,userController.updateUser)
//---------------------------------to do task-------------
route.post('/task/create',authMiddleware.isValieduser,taskController.createTask)
route.put('/task/update/:id',authMiddleware.isValieduser,taskController.updateTaskStatus)
route.get('/tasks',authMiddleware.isValieduser,taskController.taskFilter)
route.delete('/task/delete',authMiddleware.isValieduser,taskController.deleteTask)
module.exports = route;