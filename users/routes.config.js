const UsersController = require('./controllers/Users.controller')
const { Router } = require('express')
const userRoute = Router()

userRoute.post('/', [
        UsersController.insert
])
userRoute.get('/', [
    UsersController.list
]) 
userRoute.get('/:userId', [
        UsersController.getById
    ])
userRoute.put('/:userId', [
        UsersController.updateById
    ])
userRoute.delete('/:userId', [
    UsersController.removeById
])

module.exports = userRoute