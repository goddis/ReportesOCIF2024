"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grupoSeguridad_controller_1 = require("../controllers/grupoSeguridad.controller");
const router = (0, express_1.Router)();
router.get("/", grupoSeguridad_controller_1.obtenerGruposSeguridad);
exports.default = router;
