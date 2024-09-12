const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URl)
        console.log('Database connected')
    } catch (error) {
        console.log('Error connecting database', error)
    }
}

module.exports = connectDB