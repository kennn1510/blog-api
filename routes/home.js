import { Router } from "express";

const router = new Router();

router.get("/", (req, res) => {
  res.send("Welcome to get");
});
router.post("/", (req, res) => {
  res.send("Welcome to post");
});

export default router;
