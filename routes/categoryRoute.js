//IMPORT
import express from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

router.route('/').post(categoryController.createCategory);

//EXPORT
export default router;

