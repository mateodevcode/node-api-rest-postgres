import { Router } from "express";
const router = Router();

router.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

export default router;
