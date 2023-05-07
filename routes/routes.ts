import Express, { Router } from 'express'
import { addUser, deleteUser, getUser, getUsers, loginUser, updateUser } from '../controllers/user'
import { authenticateToken } from '../middlewares/jwt_verification'

export const router = Express.Router()

router.route('/user/login')
    .post(loginUser)



router.route('/user')
    .get(authenticateToken, getUsers)
    .post(addUser)

router.route('/user/:id')
    .get(getUser)
    .post(addUser)
    .put(updateUser)
    .delete(deleteUser)

