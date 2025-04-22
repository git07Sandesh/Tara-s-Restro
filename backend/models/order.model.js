import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            dishName: String,
            price: Number,
            quantity: Number,
            image: {
                data: Buffer,
                contentType: String
            },
        },
    ],
    total: Number,
    status:{
        type: String,
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("Order", orderSchema);