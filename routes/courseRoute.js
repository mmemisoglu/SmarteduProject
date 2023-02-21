//IMPORT
import express from "express";
import * as courseController from "../controllers/courseController.js";
import * as roleMiddleware from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.route('/').post(roleMiddleware.roleCheck(["teacher","admin"]) ,courseController.createCourse);
router.route('/').get(courseController.getAllCourse);
router.route('/:slug').get(courseController.getCourse);

//EXPORT
export default router;

