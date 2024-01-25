"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areas_controller_1 = require("../controllers/areas.controller");
const router = (0, express_1.Router)();
router.get("/", areas_controller_1.obtenerAreas);
exports.default = router;
