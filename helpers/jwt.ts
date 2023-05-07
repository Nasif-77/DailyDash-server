// import { NextFunction } from 'express'
// import jwt from 'jsonwebtoken'



// export const signAccesToken = (user: any) => {
//     const payload = user
//     const secret: any = process.env.SECRET_JWT_KEY
//     const options = {
//         expiresIn: '20sec',
//         issuer: '',
//         audience: user.id
//     }
//     console.log('token')
    
//     const token = jwt.sign(payload, secret, options)

// }




// export const verifyAcessToken = (req: Request, res: Response, next: NextFunction) => {
//     if (!req.headers['authorization']) return (next(createError.Unauthorized()))
//     const authHeader = req.headers['authorization']
//     const bearerToken = authHeader.split(' ')
//     const token = bearerToken[1]
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//         if (err) {
//             if (err.name === 'JsonWebTokenError') {
//                 return next(createError.Unauthorized())
//             } else {
//                 return next(createError.Unauthorized(err.message))
//             }
//         }
//         req.payload = payload
//         next()
//     })
// }
// export const signRefreshToken = (user) => {
//     return new Promise((resolve, reject) => {
//         const payload = {

//         }
//         const secret = process.env.REFRESH_TOKEN_SECRET
//         const options = {
//             expiresIn: '1y',
//             issuer: '',
//             audience: user.id
//         }
//         jwt.sign(payload, secret, options, (err, token) => {
//             if (err) return reject(err)
//             resolve(token)
//         })
//     })
// }
