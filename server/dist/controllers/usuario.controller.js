"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuarios = void 0;
const database_1 = __importDefault(require("../database/database"));
const getUsuarios = (req, res) => {
    const consulta = `
            SELECT 
            u.id, 
            u.number_id, 
            u.name, 
            u.lastname, 
            u.active, 
            u.username, 
            gs.name AS grupo_seguridad,
            u.tipo_grupo_seguridad_id, 
            u.area_id, 
            a.name AS area_name 
            FROM users AS u 
            LEFT JOIN grupos_seguridad AS gs ON gs.id = u.tipo_grupo_seguridad_id 
            LEFT JOIN area AS a ON a.id = u.area_id`;
    database_1.default.query(consulta, (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.getUsuarios = getUsuarios;
const postUsuario = (req, res) => {
    const { body } = req;
    console.log("body:", body);
    const consulta = "INSERT INTO users SET ? ";
    database_1.default.query(consulta, [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: "Usuario guardado con éxito",
        });
    });
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("body:", body);
    const consulta = "UPDATE users SET ? WHERE id = ? ";
    database_1.default.query(consulta, [body, id], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: "Usuario actualizado con éxito",
        });
    });
};
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    console.log("ID:", id);
    const consulta = "DELETE FROM users WHERE id = ? ";
    database_1.default.query(consulta, id, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: "Usuario eliminado",
        });
    });
};
exports.deleteUsuario = deleteUsuario;
