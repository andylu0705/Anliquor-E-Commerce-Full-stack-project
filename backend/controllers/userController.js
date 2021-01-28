import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @des  Auth user & get token
// @route POST/api/users/login
// @access Public
const authUser = asyncHandler(async(req,res) =>{
    const {email, password} = req.body
//check user post information in the USER collections or not
    const user = await User.findOne ({email})
//check user exist and password is correct response user information
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else{
        res.status(401)
        throw new Error('Invalid email or password')
    }

})


// @des  Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async(req,res) =>{
    
const user = await User.findById(req.user._id)
if(user){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })

}else{
    res.status(404)
    throw new Error('User not found')
}

})

// @des  Register a new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler(async(req,res) =>{
    const {name, email, password} = req.body

    const userExists = await User.findOne ({email})
/*Check userexist or not 
if not create into USER collections */
    if(userExists){
        res.status(400)
        throw new Error ('User already exists')
    }
//name:name, email:email....
   const user = await User.create({
       name,
       email,
       password,
   })
//if creater user 201(user created)
 if (user){
     res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),

     })

 } else{
    res.status(400)
    throw new Error('Invalid user data')

 }



})

export {authUser, getUserProfile,registerUser}