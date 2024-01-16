import { Router } from "express";
import {postUsuario, deleteUsuario, getUsuarios, putUsuario } from "../controllers/usuario.controller";

const router = Router();

router.get("/", getUsuarios);
router.post("/", postUsuario);
router.put("/:id", putUsuario);
router.delete("/:id", deleteUsuario);

export default router;