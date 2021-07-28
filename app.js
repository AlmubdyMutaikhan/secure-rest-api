const express = require('express')
const app = express()
const dotenv = require('dotenv')
const UserRouter = require('./users/routes.config')
const services = require('./general/services/dbConn.service')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

// configs
dotenv.config()
app.use(express.json()) // convert coming data to req.body
services.connectDB() // connect to the DB 
app.use('/users', UserRouter)
// set up a server
app.listen(3000, ()=> {
    console.log("server is running on PORT 3000")
})