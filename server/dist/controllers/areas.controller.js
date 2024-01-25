"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerAreas = void 0;
const database_1 = __importDefault(require("../database/database"));
const obtenerAreas = (req, res) => {
    const consulta = "SELECT * FROM area";
    database_1.default.query(consulta, (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.obtenerAreas = obtenerAreas;
