import Menu from '../models/menuModel.js'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function UploadImage(req, res) {
    try {
        const { timestamp } = await req.json();
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder: "food-react-native"
            },
            process.env.CLOUDINARY_API_SECRET
        );

        return res.json({
            signature, 
            timestamp, 
            apiKey: process.env.CLOUDINARY_API_KEY
        })
    } catch (error) {
        console.error("error while generating the cloudinary signature");
        return res.json(
            {
                error: "failed to generate the signature"
            },
            { status: 500 }
        );
    }
}


export const createMenu = async (req, res) => {
    try {
        const { name, description, price, calories, proteins, category, imageUrl } = req.body

        if ( !name || !description || !price || !calories || !proteins || !category || !imageUrl) {
            return res.status(400).json({ message: "All fields must be filled in" })
        }

        const existingMenu = await Menu.findOne({ name })

        if (!existingMenu) {
            return res.status(400).json({ message: "The menu already exists" })
        }

        const fileUrl = UploadImage()

        const menu = await Menu.create({
            name,
            description,
            price,
            calories,
            proteins,
            category,
            imageUrl
        })

        return res.status(201).json({
            message: "Created Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: `error is ${error.message}`
        })
    }
}

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find()

        if (menu.lenght == 0) {
            return res.status(404).json({ message: "All fields are required" })
        }

        return res.status(200).json({
            message: "Here is Your menu",
            menu
        })
    } catch (error) {
        return res.status(500).json({
            message: `error is ${error.message}`
        })
    }
}
