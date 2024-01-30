import { Request, Response, query } from "express";
import connection from "../database/database";

export const getUsers = (req: Request, res: Response) => {
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

  connection.query(consulta, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Se produjo un error al obtener datos" });
    } else {
      res.json(data);
    }
  });
};

export const postUser = (req: Request, res: Response) => {
  const { body } = req;
  const consulta = "INSERT INTO users SET ? ";
  connection.query(consulta, [body], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Se produjo un error al agregar el usuario" });
    } else {
      res.json({
        respuesta: "success",
      });
    }
  });
};

export const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  const consulta = "UPDATE users SET ? WHERE id = ? ";
  connection.query(consulta, [body, id], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Se produjo un error al actualizar el usuario",
      });
    } else {
      res.json({
        respuesta: "success",
      });
    }
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const consulta = "DELETE FROM users WHERE id = ? ";
  connection.query(consulta, id, (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Se produjo un error al eliminar el usuario" });
    } else {
      res.json({
        msg: "Usuario eliminado",
      });
    }
  });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const consulta = "SELECT * FROM users WHERE id = ? ";
  connection.query(consulta, id, (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Se produjo un error al recuperar el usuario." });
    } else {
      res.json(data[0]);
    }
  });
};
