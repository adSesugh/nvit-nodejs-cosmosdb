import nodemailer from 'nodemailer'

const sendEmail = async (email, subject, text) => {
    try {
        console.log(text)
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            service: process.env.MAIL_SERVICE,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: subject,
            text: text
        })
        console.log('Password reset link sent successfully')
    } catch (error) {
        console.log(error, "Error message")
    }
}

export default sendEmail