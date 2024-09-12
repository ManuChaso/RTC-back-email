const companyModel = require('../models/company')
const sendEmail = require('../utils/sendEmail')

async function createCompany(req, res){
    try {
        const companyData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            emails: [],
        }
        const company = new companyModel(companyData)

        const companySaved = await  company.save()

        res.status(201).send({
            message: 'Compañia creada',
            company: companySaved
        })
    } catch (error) {
        console.log('Error al crear compañia', error);
        res.status(500).send({
            message: 'Error creando compañia'
        })
    }
}

async function updateCompany(req, res){
    try {
        const {id} = req.params
        const { emails } = req.body

        const company = await companyModel.findById(id)

        const newEmails = Array.from(new Set([...emails, ...company.emails]))
        

        const companyUpdated = await companyModel.findByIdAndUpdate(id, {emails: newEmails}, {new: true})

        res.status(200).send({
            message: 'Compañia actualizada correctamente',
            company: companyUpdated
        })
    } catch (error) {
        console.log('Error actualizando compañia', error)
        res.status(500).send({
            message: 'Error al actualizar compañia'
        })
    }
}

async function sendEmails(req, res){
    try {
        const { id } = req.params

        const company = await companyModel.findById(id)

        company.emails.forEach(email => {
            sendEmail(email)
        })

        res.status(200).send({
            message: 'Email enviados'
        })
    } catch (error) {
        console.log('Error enviando los emails', error)
    }
}

async function deleteCompany(req, res){
    try {
        const { id } = req.params

        const companyDeleted = await companyModel.findByIdAndDelete(id)

        res.status(200).send({
            message: 'Compañia eliminada correctamente',
            company: companyDeleted
        })
    } catch (error) {
        console.log('Error borrando la compañia', error)
        res.status(500).send({
            message: 'Error al borrar la compañia'
        })
    }
}



module.exports = {
    createCompany,
    updateCompany,
    deleteCompany,
    sendEmails
}