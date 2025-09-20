import mongoose from "mongoose";

const menuModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Menu = mongoose.model('Menu', menuModel)

export default Menu;