//IMPORT
import express from "express";
import * as authController from "../controllers/authController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route('/signup').post(authController.createUser); 
router.route('/login').post(authController.loginUser); 
router.route('/logout').get(authController.logoutUser); 
router.route('/dashboard').get(authMiddleware.accessControl ,authController.getDashboardPage); 

//EXPORT
export default router;


