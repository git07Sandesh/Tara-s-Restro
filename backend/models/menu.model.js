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
        image: {
            data: Buffer,       // <-- store the raw binary
            contentType: String // <-- store 'image/png', 'image/jpeg', etc.
          },
        featured:{
            type: Boolean,
            default: false
        },
    }, 
    {
        timestamps:true
    }
)

const Menu = mongoose.model('Menu',menuSchema);

export default Menu;