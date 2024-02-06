const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const User = require("../../models/userModel");



const postAdminLogin = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const admin = await Admin.findOne({email})
   console.log(req.body);
    if(admin && (await bcrypt.compare(password,admin.password))){
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            token:generateToken(admin._id)
            
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

const getUsersList = asyncHandler(async (req,res)=>{
      
    const users = await User.find({})
    res.status(200).json(users)


})


//generating jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

module.exports={
    postAdminLogin,
    getUsersList
}