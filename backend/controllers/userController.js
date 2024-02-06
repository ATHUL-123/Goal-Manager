const asyncHandler =require('express-async-handler')
const User   = require('../models/userModel')
const jwt    =require('jsonwebtoken')
const bcrypt =require('bcryptjs')
require('dotenv').config();


const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body

    //checking all the credentials
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //checking user already exist
    const useExist = await User.findOne({email})
    if(useExist){
        res.status(400)
        throw new Error('User already exist')
    }
    
    //hash the password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //creating the user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
      
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            profileUrl:user.profileUrl
        })
    }else{
        res.status(400)
        throw new Error('Invalid user Data')
    }

})

const loginUser =asyncHandler(async (req,res)=>{
    
    const {email,password} = req.body

    //checking for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            profileUrl:user.profileUrl
            
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
})

const getMe = asyncHandler(async (req,res)=>{
   

   res.status(200).json(req.user)
})

const profileUpdate = asyncHandler(async(req,res)=>{
    console.log('here=======');
    const liveuser = req.body.liveUser
    const url  = req.body.url
    const user=await User.findByIdAndUpdate(liveuser._id,{
        profileUrl: url
    });
    res.status(200).json(user);
})



//generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}



module.exports={
    registerUser,
    loginUser,
    getMe,
    profileUpdate
}