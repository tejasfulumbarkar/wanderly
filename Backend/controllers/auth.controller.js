import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"

export const signUp=  async(req,res)=>{

    try {

        let {name,email,password} = req.body
        let existedUser = await User.findOne({email})
        if(existedUser){
            return res.status(400).json({message:"user already exist , please login"})
        }

        let hashPassword = await bcrypt.hash(password,10)
        let user = await User.create({name, email , password:hashPassword})
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure :process.env.NODE_ENVIRONMENT === "production",
            sameSite:"strict",
            maxAge: 7*24*60*60*1000
        })
        return res.status(201).json({user})
    } catch (error) {
        res.status(500).json({message:`signup error  ${error}` })
        
    }

}


// login controller 

export const logIn = async(req,res)=>{

     try {

        let {email,password} = req.body
        let loginUser = await User.findOne({email})
        if(!loginUser){
            return res.status(400).json({message:"user does not exist , please Signup"})
        }
        // compare userentered pass with mongo stored pass 
        let matchPass = await bcrypt.compare(password,loginUser.password)
        
        
        if(!matchPass){
            return res.status(400).json({message:"Email or password Incorrect"})
        }

        let token = await genToken(loginUser._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure :process.env.NODE_ENVIRONMENT === "production",
            sameSite:"strict",
            maxAge: 7*24*60*60*1000
        })

         return res.status(201).json({loginUser})
        
        
        
    } catch (error) {
        res.status(500).json({message:`Login error  ${error}` })
        
    }
    
}


//logOut controller 

export const logOut = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"User logged out"})


    } catch (error) {

        return res.status(200).json({message:"Logout error"})
        
    }
}