//IMPORT
import express from "express";
import * as pageController from "../controllers/pageController.js";
import * as redirectMiddleware from "../middlewares/redirectMiddleware.js";

const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(redirectMiddleware.accessControl ,pageController.getRegisterPage);
router.route("/login").get(redirectMiddleware.accessControl ,pageController.getLoginPage);
router.route("/contact").get(pageController.getContactPage);
router.route("/contact").post(pageController.sendEmail);

//EXPORT
export default router;
