import { Router } from "express";

const router = new Router();

router.get("/", (req, res) => {
  res.json({ message: "Should get all posts." });
});

router.get("/:postId", (req, res) => {
  // Right now, postId can be anything. So make sure to do validation.
  // And then we will fetch the data from the database (prisma find)
  res.json({ message: `Do something with post ${req.params.postId}` });
});

router.post("/", (req, res) => {
  // For creating a new post, only by admin users
  // Admin users need to login through auth
});

export default router;