import express from "express";
const router = express.Router();

import { signInController, signUpController } from "../controller/auth.js";

router.route("/sign-up").post(signUpController);
router.route("/sign-in").post(signInController);

export default router;
