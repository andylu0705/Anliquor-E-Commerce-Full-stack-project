import jwt from 'jsonwebtoken'

//user pass id and create token

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, 
        {expiresIn: '30d'})
        
}

export default generateToken