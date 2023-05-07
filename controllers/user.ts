import { User } from "../models/user";
import Express from "express";
import bcrypt from 'bcrypt'
import { Conflict } from 'http-errors'
import { sendEmail } from "../helpers/sendEmail";
import jwt from 'jsonwebtoken'



//login
export const loginUser = async (req: Express.Request, res: Express.Response) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user: any = await User.findOne({ email: email })
            if (user) {

                const isPassVerified = await bcrypt.compare(password, user.password)

                if (isPassVerified) {

                    const secret: any = process.env.SECRET_JWT_KEY

                    const token = jwt.sign(JSON.stringify(user), secret)

                    res.cookie('token', token, { httpOnly: true })
                    res.status(200).json({ token: token })

                } else {
                    res.status(401).json({ message: "Password does not match" })
                }
            } else {
                res.status(404).json({ message: "User not found" })
            }
        } else {
            res.status(400).json({ message: "Bad Request" })
        }
    } catch (error) {
        res.status(400).json({ message: "Bad Request" })
    }
}



//signup
export const addUser = async (req: Express.Request, res: Express.Response) => {
    try {
        //otp verification
        if (req.body.otp && req.body.email) {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const otp = parseInt(req.body.otp)
                if (user.otp === otp) {
                    await User.findByIdAndUpdate(user.id, {
                        $unset: {
                            expireAt: '',
                            otp: ''
                        }
                    })
                    res.status(200).json({ message: "succesfully verified" })
                }
                else {
                    res.status(400).json({ message: 'Wrong Otp' })
                }
            } else {
                res.status(400).json({ message: 'User not found' })
            }
        }
        //otp expiritaion after one minute
        else if (req.body.email && req.body.subject) {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const response = await user.updateOne({
                    $unset: {
                        otp: ''
                    }
                })
                if (response) {
                    res.status(200).json({ message: "OTP has been expired" })
                }
            }
        }

        //user signup and otp sending
        else if (req.body.email && req.body.password) {

            const otp = Math.floor(100000 + Math.random() * 900000)
            const { email, password } = req.body
            const checkEmail = await User.findOne({ email: email })
            if (!checkEmail) {
                const hashedPassword = await bcrypt.hash(password, 10)
                req.body.password = hashedPassword
                req.body.otp = otp
                const user = new User(req.body)
                const ttlSeconds = 600;
                user.createdAt = new Date()
                user.expireAt = new Date(user.createdAt.getTime() + ttlSeconds * 1000)
                const result = await user.save()
                await sendEmail(req.body.email, otp)
                res.status(201).json(result)
            } else {
                throw Conflict(`${email} is already in use`)
            }
            //resend otp
        } else if (req.body.email) {
            const otp = Math.floor(100000 + Math.random() * 900000)

            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const result = await user.updateOne({
                    $set: {
                        otp: otp
                    }
                })
                if (result) {
                    sendEmail(req.body.email, otp)
                    res.status(200).json({ message: "Success", otp })
                }
            }
        }

    } catch (error) {
        res.json(error)
    }

}



export const getUsers = async (req: Express.Request, res: Express.Response) => {
    try {
        const users = await User.find()
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(404).json(error)
    }

}



export const getUser = async (req: Express.Request, res: Express.Response) => {
    try {
        console.log('on branch sample1')
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error: any) {
        res.status(404).json({
            message: 'User not found'
        })
    }

}



export const updateUser = async (req: Express.Request, res: Express.Response) => {
    try {
        const { name, mark } = req.body
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name,
                mark
            }
        })
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({
            message: 'User not found'
        })

    }

}

export const deleteUser = async (req: Express.Request, res: Express.Response) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).json({ message: 'User deleted' })

    } catch (error) {
        res.status(404).json({
            message: 'User not found'
        })

    }
}