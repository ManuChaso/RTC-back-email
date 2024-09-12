require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/database/connectDB')
const companyRouter = require('./src/routes/company')
const cron = require('node-cron')

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.use('/company', companyRouter)

app.listen(process.env.PORT, () => {
    console.log('Servidor en marcha en el puerto 3000')
})
