import express from "express";
import { createDish, deleteDish, getDishes, updateDish, updateFeaturedDish, getDishImage, getFeaturedDish } from "../controllers/menu.controller.js";
import multer from "multer";
import { protectAdmin } from "../middleware/protectAdmin.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});


router.get("/", getDishes)
router.get("/featured", getFeaturedDish)
router.get("/:id/image", getDishImage);


router.post("/", protectAdmin, upload.single("image"), createDish)
router.put("/:id", protectAdmin, updateDish)
router.delete("/:id", protectAdmin, deleteDish);
router.post("/feature", protectAdmin, updateFeaturedDish);


export default router