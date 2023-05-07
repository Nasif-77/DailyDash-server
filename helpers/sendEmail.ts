import nodemailer from 'nodemailer'
import { Request } from 'express'


export const sendEmail = async (email: string, otp: number) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
        requireTLS: true,
        logger: true
    })

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: `OTP for Daily Dash`,
        text: 'Hello nasif?',
        html: `<strong>Your OTP is ${otp}<strong>`,
        headers: { 'x-myheader': 'test header' }
    })

    console.log("Message sent: %s", info.response)

}

