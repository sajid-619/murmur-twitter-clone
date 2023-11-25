import { Router } from "express";
import {
  signup,
  login,
  userProfile,
  otherUsers,
  followUsers
} from "../controller/user";

import { auth_check } from '../middleware/auth_check';

const router = Router();

router.get("/profile", auth_check, userProfile);
router.get("/users", auth_check, otherUsers);

router.post("/signup", signup);
router.post("/login", login);

router.post("/follow/:followed_to", auth_check, followUsers);

export default router;
