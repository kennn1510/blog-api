import { Router } from "express";
import passport from "../config/passport-config.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.js";
import bcrypt from "bcryptjs";

const router = new Router();
const prisma = new PrismaClient();

router.post("/signup", async (req, res) => {
  const user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
    jwt.sign(
      { id: createdUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        console.log(token);
      }
    );
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Login successful");
  }
);

export default router;
