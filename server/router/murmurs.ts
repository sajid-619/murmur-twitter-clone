import { Router } from "express";
import {
  createMurmurs,
  getMurmurs,
  deleteMurmurs,
  likeOrDislikeMurmurs,
  getMurmursDetails
} from "../controller/murmurs";

import { auth_check } from '../middleware/auth_check';

const router = Router();

// type = list all, type = creators
router.get("/:type", auth_check, getMurmurs);
router.get("/details/:murmurId", auth_check, getMurmursDetails);

router.post("/", auth_check, createMurmurs);
router.post("/like/:murmurId", auth_check, likeOrDislikeMurmurs);

router.delete("/:murmurId", auth_check, deleteMurmurs);

export default router;
