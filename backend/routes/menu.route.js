import express from "express";
import { createDish, deleteDish, getDishes, updateDish, updateFeaturedDish, getDishImage, getFeaturedDish } from "../controller/menu.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});


router.get("/", getDishes)
router.post("/", upload.single("image"), createDish)
router.put("/:id", updateDish)
router.delete("/:id", deleteDish);

router.get("/:id/image", getDishImage);
router.post("/feature", updateFeaturedDish);
router.get("/featured", getFeaturedDish)

export default router