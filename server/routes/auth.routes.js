import express from "express";
import passport from "passport";
import {
  getMe,
  googleAuthCallback,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuthCallback,
);
router.get("/me", isAuthenticated, getMe);
router.post("/logout", logout);
export default router;
