import express from "express"
import { createMenu, getMenu } from "../controller/menu.controller.js"

const router = express.Router()


router.post("/create", createMenu)
router.get('/get', getMenu)

export default router