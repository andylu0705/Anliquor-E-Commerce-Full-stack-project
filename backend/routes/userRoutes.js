import express from 'express'

const router = express.Router();
import { authUser, registerUser ,getUserProfile } from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'


router.post('/login',authUser )

//because userprofile private route need to check token
router.route('/profile').get(protect, getUserProfile)

//router.route('/').post(registerUser)
router.post('/',registerUser)


export default router