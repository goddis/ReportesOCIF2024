import { Router } from "express";
import { obtenerGruposSeguridad } from "../controllers/grupoSeguridad.controller";

const router = Router();

router.get("/", obtenerGruposSeguridad);
export default router;
