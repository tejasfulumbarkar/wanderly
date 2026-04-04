import jwt from 'jsonwebtoken'

const isAuth = async (req,res,next)=>{
try {

    let {token} = req.cookies

    if(!token){
        res.status(400).json({message:"User does not have a token"})
    }

    let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

    if(!verifyToken){
        res.status(400).json({message:"User does not have a VALID token"})
    }

    req.userId = verifyToken.userId
    next()
    
} catch (error) {

    res.status(401).json({message:`isAuth Error ${error}`})
    
}
}

export default isAuth