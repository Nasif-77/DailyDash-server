import { User } from "../models/user";
import Express from "express";

export const getUsers = async (req: Express.Request, res: Express.Response) => {
    try {
        const users = await User.find()
        res.status(200).json({ users: users })
    } catch (error) {
        res.json(error)
    }

}

export const getUser = async (req: Express.Request, res: Express.Response) => {
    try {
        console.log('on branch master')
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error: any) {
        res.status(404).json({
            message: 'User not found'
        })
    }

}
 
export const addUser = async (req: Express.Request, res: Express.Response) => {
    try {
        const user = new User(req.body)
        const result = await user.save()
        res.status(201).json(result)
    } catch (error) {
        res.json(error)
    }

}

export const updateUser = async (req: Express.Request, res: Express.Response) => {
    try {
        const {name,mark} = req.body
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