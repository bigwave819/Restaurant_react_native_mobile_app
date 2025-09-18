import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import UserRoutes from "./routes/user.route.js"
import CategoryRoutes from "./routes/category.route.js"
import MenuRoute from "./routes/menu.route.js"


const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

//connection to the database
connectDB()

//root routing
app.use("/api/user", UserRoutes);
app.use("/api/category", CategoryRoutes)
app.use("/api/menu", MenuRoute)

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`connected to the port ${port}`);
})