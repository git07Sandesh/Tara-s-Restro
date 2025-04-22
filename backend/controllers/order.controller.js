import mongoose from "mongoose";
import Order from "../models/order.model.js";


export const createOrder = async(req, res) => {
    try{
        const {items, total} = req.body;
        if(!items || !total){
            return res.status(400).json({success:false, message:"Provide items and total"});
        }
        const newOrder = await Order.create({items, total});
        res.status(200).json({success:true, data:newOrder});
    }
    catch(error){
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const getOrders = async(req, res) => {
    try{
        const orders = await Order.find({});
        res.status(200).json({success:true, data: orders})
    }
    catch(error){
        res.status(500).json({success:false, message: "Server Error"})
    }
}
