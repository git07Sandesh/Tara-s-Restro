import express from "express";
import { createDish, deleteDish, getDishes, updateDish } from "../controller/menu.controller.js";


const router = express.Router();

router.get("/", getDishes)
router.post("/", createDish)
router.put("/:id", updateDish)
router.delete("/:id", deleteDish);

export default router