import express from 'express'

const router = express.Router();
import { authUser, registerUser ,getUserProfile,updateUserProfile,getUsers,deleteUser,getUserById,updateUser } from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.post('/login',authUser )

//because userprofile private route need to check token
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)

//router.route('/').post(registerUser)
router.route('/').post(registerUser).get(protect, admin,getUsers)

router
.route('/:id')
.delete(protect,admin,deleteUser)
.get(protect,admin,getUserById)
.put(protect,admin,updateUser)


export default router