import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface customRequest extends Request {
    user?: { id: string };
}

export const authenticateToken = async (req: customRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token: any = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.status(401);

    const jwtKey: any = process.env.SECRET_JWT_KEY

    jwt.verify(token, jwtKey, (err: any, user: any) => {
        if (err) return res.status(401).json({ message: "Unauthorized" })

        req.user = user
        next()
    })
}