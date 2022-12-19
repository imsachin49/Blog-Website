import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllUser=async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(400).json({message:"No Users Found"});
    }
    return res.status(200).json({ users });
}

export const signup=async(req,res,next)=>{
    const{name,email,password}=req.body;
    console.log(req.body);
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return console.log("Error on signup",err);
    }
    if(existingUser){
        return res.status(404).json({message:"User Already Exist! Login Instead"});
    }
    const hashedPassword=bcrypt.hashSync(password)
    
    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[],
    });
    
    try{
        await user.save();
    }catch(err){
        return console.log(err);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(201).json({user,token})

}

export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return console.log("Error on signup",err);
    }
    if(!existingUser){
        return res.status(404).json({message:"Could not find user by this email"});
    }

    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"});
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    return res.status(200).json({message:"Login successfull",user:existingUser,token});
}
