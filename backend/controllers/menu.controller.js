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
export const getDishImage = async (req, res) => {
    try {
      const { id } = req.params;
      const dish = await Menu.findById(id);
  
      if (!dish || !dish.image || !dish.image.data) {
        return res.status(404).send("Image not found");
      }
  
      res.set("Content-Type", dish.image.contentType);
      res.send(dish.image.data);
    } catch (error) {
      console.error("Error fetching image:", error.message);
      res.status(500).send("Server error");
    }
  };

export const createDish = async (req,res) => {
    try {
        // req.file is populated by multer for file uploads
        // req.body holds text fields
        const { dishName, price, description } = req.body;
    
        // Validate text fields
        if (!dishName || !price || !description) {
          return res
            .status(400)
            .json({ success: false, message: "Provide dishName, price, and description" });
        }
    
        // Validate we actually got a file
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, message: "No image file uploaded" });
        }
    
        // Construct new dish data
        const newDish = new Menu({
          dishName,
          price,
          description,
          image: {
            data: req.file.buffer,        // the raw Buffer
            contentType: req.file.mimetype // e.g. 'image/png'
          }
        });
    
        // Save to DB
        await newDish.save();
    
        return res
          .status(200)
          .json({ success: true, data: newDish });
      } catch (error) {
        console.error("Error creating dish:", error.message);
        return res
          .status(500)
          .json({ success: false, message: "Server Error" });
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
export const getFeaturedDish = async(req, res) => {
    try {
        const dishes = await Menu.find({featured: true}). limit(4);
        res.status(200).json({success:true, data:dishes});
    } catch (error) {
        res.status(400).json({success: false, message: "Error fettching featured dishes", error})
    }
}

export const updateFeaturedDish = async (req,res) => {
    try {
        // Might need to change dishId to dish_id
        const {dishId, featured} = req.body;
        const featuredCount = await Menu.countDocuments({featured: true});
        if(featured && featuredCount >= 4){
            return res.status(400).json({message:"Only four dishes can be featured"})
        }

        const updated = await Menu.findByIdAndUpdate(
            dishId, { featured }, {new: true}
        )
        res.status(200).json({success: true, message: "Dish updated sucessfully", data: updated})
    } catch (error) {
        res.status(500).json({success:false, message: "Internal Server Error: Failure in uploading featured dish", error})
    }
}

