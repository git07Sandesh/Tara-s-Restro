import mongoose from "mongoose";
import Menu from "../models/menu.model.js";

export const getDishes = async(req,res) => {

    try {
        const dishes = await Menu.find({});
        res.status(200).json({success:true, data: dishes})
        
    } catch (error) {
        console.log("Error getting the menu:", error.message)
        res.status(500).json({success:false, message:"Server Error"})
    }

}

export const createDish = async (req,res) => {
    const dish = req.body
    if(!dish.dishName || !dish.price || !dish.description || !dish.image)
    {
        return res.status(400).json({success:false, message:"Provide all the fields"})
    }
    const newDish = new Menu(dish)
    try {
        await newDish.save();
        res.status(200).json({success:true, data:newDish})
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const updateDish = async (req,res) => {
    const {id} = req.params
    const dish = req.body

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success:false, message:"Invalid dish ID"})
    }
    try {
        const updatedDish = await Menu.findByIdAndUpdate(id, dish, {new:true})
        res.status(200).json({success:true, data:updatedDish})
        
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
    
}

export const deleteDish = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid Dish ID"})
    };
    try {
        await Menu.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Dish deleted successfully"})

    } catch (error) {
        res.status(500).json({success:false, message:"Server Error" })
    }    
}