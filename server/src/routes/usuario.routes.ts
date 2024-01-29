import { Router } from "express";
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getUser,
} from "../controllers/usuario.controller";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

export default router;
