import jwt from "jsonwebtoken"

const genToken = async (userId)=>{

    try {
        let JWT_SECRET = process.env.JWT_SECRET

        let token = await jwt.sign({userId},JWT_SECRET, {expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("Token error see token js file ")
    }
}

export default genToken