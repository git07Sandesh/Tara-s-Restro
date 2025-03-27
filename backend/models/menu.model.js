import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        dishName:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            required:true
        },
        image:{
            type: String,
            required:true
        }

    }, 
    {
        timestamps:true
    }
)

const Menu = mongoose.model('Menu',menuSchema);

export default Menu;