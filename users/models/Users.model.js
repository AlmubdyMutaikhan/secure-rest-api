const mongoose = require('mongoose') // import needed classes from mongoose

// define 'User' schema
const userSchema = new mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    permissionLevel : {
        type : Number
        /* permissionLevel determines what is allowed to do to user */
    }
})

const User = new mongoose.model('User', userSchema)

const createUser = (userData) => {
    const user = new User(userData)
    return user.save()
}   

const findById = (id) => {
    return User.findById(id)
        .then(user => {
            user = user.toJSON()
            delete user._id
            delete user.__v
            return user
        })
}

const updateUser = (id, userData) => {
    return User.findByIdAndUpdate(id, userData)
}

const listUsers = (perPage, page) => {
    return new Promise((resolve, reject)=>{
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function(err,users) {
                if(err) {
                    reject(err)
                } else {
                    resolve(users)
                }
            })
    })
}

const removeById = (id) => {
    return User.findByIdAndDelete(id)
}


module.exports = {
    createUser,
    findById,
    updateUser,
    listUsers,
    removeById
}




