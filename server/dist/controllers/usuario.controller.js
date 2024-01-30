"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.putUser = exports.postUser = exports.getUsers = void 0;
const database_1 = __importDefault(require("../database/database"));
const getUsers = (req, res) => {
    const consulta = `
            SELECT 
            u.id, 
            u.numero_id, 
            u.nombre, 
            u.apellido, 
            u.usuario, 
            gs.nombre AS grupo_seguridad,
            u.tipo_grupo_seguridad_id, 
            u.area_id, 
            a.nombre AS area_nombre 
            FROM users AS u 
            LEFT JOIN grupos_seguridad AS gs ON gs.id = u.tipo_grupo_seguridad_id 
            LEFT JOIN area AS a ON a.id = u.area_id`;
    database_1.default.query(consulta, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Se produjo un error al obtener datos" });
        }
        else {
            res.json(data);
        }
    });
};
exports.getUsers = getUsers;
const postUser = (req, res) => {
    const { body } = req;
    // se valida si el usuario ya existe en la tabla
    database_1.default.query("SELECT numero_id FROM users WHERE numero_id = ?", body.numero_id, (err, rows) => {
        if (err) {
            console.error(err);
            res
                .status(500)
                .json({ error: "Se produjo un error al buscar el usuario" });
        }
        else {
            // si el usuario ya existe
            if (rows.length > 0) {
                res.json({
                    respuesta: "existe",
                });
            }
            else {
                // si el usuario es nuevo, se inserta en la tabla
                const consultaInsert = "INSERT INTO users SET ? ";
                database_1.default.query(consultaInsert, [body], (err, data) => {
                    if (err) {
                        console.error(err);
                        res
                            .status(500)
                            .json({ error: "Se produjo un error al agregar el usuario" });
                    }
                    else {
                        res.json({
                            respuesta: "success",
                        });
                    }
                });
            }
        }
    });
};
exports.postUser = postUser;
const putUser = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const consulta = "UPDATE users SET ? WHERE id = ? ";
    database_1.default.query(consulta, [body, id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Se produjo un error al actualizar el usuario.' });
        }
        else {
            res.json({
                msg: "Usuario actualizado con éxito",
            });
        }
    });
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    const consulta = "DELETE FROM users WHERE id = ? ";
    database_1.default.query(consulta, id, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Se produjo un error al eliminar el usuario' });
        }
        else {
            res.json({
                respuesta: "success",
            });
        }
    });
};
exports.deleteUser = deleteUser;
const getUser = (req, res) => {
    const { id } = req.params;
    const consulta = "SELECT * FROM users WHERE id = ? ";
    database_1.default.query(consulta, id, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Se produjo un error al recuperar el usuario.' });
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.getUser = getUser;
