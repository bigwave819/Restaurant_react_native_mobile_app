import express from "express"
import { createMenu, getMenu, getMenuById } from "../controller/menu.controller.js"

const router = express.Router()


router.post("/create", createMenu)
router.get('/get', getMenu)
router.get("/:id", getMenuById)

export default router