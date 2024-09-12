const express = require('express')
const { createCompany, updateCompany, deleteCompany, sendEmails } = require('../controllers/company')

const companyRouter = express.Router()

companyRouter.post('/', createCompany)
companyRouter.put('/:id', updateCompany)
companyRouter.delete('/:id', deleteCompany)
companyRouter.post('/send-emails/:id', sendEmails)

module.exports = companyRouter