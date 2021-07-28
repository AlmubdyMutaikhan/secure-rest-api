const mongoose = require('mongoose')
const options = {
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify : false
}

exports.connectDB = () => { 
    mongoose.connect(process.env.DB_URI, options)
        .then(() => {
            console.log("succesfully connected to DB")
        })
        .catch(err => {
            console.log(err)
        })
}
