import { Router } from "express";
import { obtenerAreas } from "../controllers/areas.controller";

const router = Router();

router.get("/", obtenerAreas);
export default router;
