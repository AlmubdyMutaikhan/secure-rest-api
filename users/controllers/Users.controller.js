const UserModel = require('../models/Users.model')
const CryptoJS = require('crypto-js')

const insert = (req, res) => {
    // encode the password
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.HASH_SECRET_KEY)
    req.body.permissionLevel = 1
    UserModel.createUser(req.body)
        .then(user => {
            res.status(201).send({"id" : user._id})
        })
}

const getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then(user => {
            res.status(200).send(user)
        }) 
}

const updateById = (req, res) => {
    UserModel.updateUser(req.params.userId, req.body)
        .then(user => {
            res.status(204).send({})
        })
}

const list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 5
    let page = 0
    if(req.query) {
        if(req.query.page) {
            req.query.page = parseInt(req.query.page)
            page = Number.isInteger(req.query.page) ? req.query.page - 1 : 0    
        }
    }

    UserModel.listUsers(limit, page)
        .then(usersList => {
           
            usersList = usersList.map(user => {
                user = user.toJSON()
                delete user.__v
                delete user.password
                return user
            })

            res.status(200).send(usersList)
        })
}

const removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then(result => {
            res.status(204).send({})
        })
}




module.exports = {
    insert,
    getById,
    updateById,
    list,
    removeById
}

