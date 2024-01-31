import { Router } from "express";
import { getGruposSeguridad } from "../controllers/grupoSeguridad.controller";

const router = Router();

router.get("/", getGruposSeguridad);
export default router;
