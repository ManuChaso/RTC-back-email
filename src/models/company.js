const mongoose = require('mongoose');

const Schema = mongoose.Schema

const companySchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emails: [String]
})


const companyModel = mongoose.model('company', companySchema, 'company')

module.exports = companyModel