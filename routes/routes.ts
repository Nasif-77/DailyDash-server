import Express from 'express'
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user'

export const router = Express.Router()


router.get('/users',getUsers)
router.get('/users/:id',getUser)
router.post('/users',addUser) 
router.put('/users/:id',updateUser) 
router.delete('/users/:id',deleteUser) 