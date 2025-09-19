import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String 
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categoryModel)

export default Category