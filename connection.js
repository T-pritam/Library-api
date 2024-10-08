const mongoose = require('mongoose')

function connectMongo() {
    return mongoose.connect(process.env.MONGO_URI)
}

module.exports = connectMongo