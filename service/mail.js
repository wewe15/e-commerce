const nodemailer = require('nodemailer');
const dotenv = require('dotenv')

dotenv.config()

const sendEmail = async ({from=process.env.MAIL, to, subject, text}) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASSWORD
    }
    });
    await transporter.sendMail({ from, to, subject, text });
}

module.exports = sendEmail;