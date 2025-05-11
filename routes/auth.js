import { Router } from "express";
import passport from "../config/passport-config.js";

const router = new Router();

router.post("/signup", async (req, res) => {});

router.post("/login", async (req, res) => {
  // So I don't need to send a form, I can just directly send the login data with the request.
});

export default router;