import mongoose from "mongoose";
import User from "../models/auth.model.js";
import bcrypt from "bcryptjs" ;
import { generateToken } from "../lib/utils.js";

export const register = async(req,res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) 
        return res.status(404).json({success:false, message: "Enter all the fields"})
    try{
        
        if(password.length < 8)
            return res.status(404).json({success: false, message: "Password must me at least 8 character short"})
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        });

        if(newUser){
            //generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email:newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message: "Invalid User data"});
        }
        }
        catch(error){
            console.log("error in signup controller", error.message);
            res.status(500).json({success:false, message:"Internal server error"});
        }

};

export const login = async (req,res) => {
    const {email, password} = req.body;
    try{
//checking
        if(!email || !password) 
           return res.status(404).json({success:false, message: "Email and password are required"})
        
// Create a new user    
        const user = await User.findOne({email});
//checking if user is in the system
        if(!user){
            return res.status(400).json({ message:"Invalid Credentials" });
        }
//comparing password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message:"Invalid Credentials" });
        }
//Login Successfull. Generate a token.
        generateToken(user._id, res);
// Just status message.
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        });
    }
    catch(error){
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        //Just reset the cookies and it will automatically logout.
        res.cookies("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged Out Successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"})
    }
    
}

export const checkAuth = (req, res) => {
    try {
        //Check if user is present
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth conttroller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}
