const fs = require('fs')
const nodemailer = require('nodemailer')
const cron = require('node-cron')

const companyModel = require('../models/company')

const emailTemplate = fs.readFileSync(__dirname +'/template/emailtemplate.html', 'utf-8')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

function sendEmail(email){
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Inpago de factura, PAGA!',
        html: emailTemplate
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log('Error en el envio de email', err)
            return
        }  
        console.log(info)
    })
}

async function scheduleEmail(){
    try {
        const company = await companyModel.findById('66e3292bbaccf1a4dddf022b')

        company.emails.forEach(email => {
            sendEmail(email)
        })

        console.log('Emails enviados')
    } catch (error) {
        console.log('Error enviando emails automaticos', error)
    }
}

cron.schedule('*/2 * * * *', () => {
    console.log('Ejecutando acción')
    scheduleEmail()
})

module.exports = sendEmail