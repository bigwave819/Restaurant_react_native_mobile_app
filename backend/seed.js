// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import dummyData from "./dummyData.js";
import Category from "./models/categoryModel.js";
import Menu from "./models/menuModel.js";

dotenv.config();

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // Clear old data
    await Category.deleteMany();
    await Menu.deleteMany();

    // Insert categories
    const insertedCategories = await Category.insertMany(dummyData.categories);
    console.log("✅ Categories seeded");

    // Map category name → _id
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Insert menu items with category references
    const menuWithCategory = dummyData.menu.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.price,
      calories: item.calories,
      protein: item.protein,
      rating: item.rating,
      category: categoryMap[item.category_name], // link by name
      imageUrl: item.image_url, // match schema
      customizations: item.customizations,
    }));

    await Menu.insertMany(menuWithCategory);
    console.log("✅ Menu seeded");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDB();
