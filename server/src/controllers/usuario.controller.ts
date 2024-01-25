import { Request, Response, query } from "express";
import connection from "../database/database";

export const getUsuarios = (req: Request, res: Response) => {
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
    if (err) throw err;
    res.json(data);
  });
};

export const postUsuario = (req: Request, res: Response) => {
  const { body } = req;
  console.log("body:", body);

  const consulta = "INSERT INTO users SET ? ";
  connection.query(consulta, [body], (err, data) => {
    if (err) throw err;
    res.json({
      msg: "Usuario guardado con éxito",
    });
  });
};

export const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  console.log("body:", body);

  const consulta = "UPDATE users SET ? WHERE id = ? ";
  connection.query(consulta, [body, id], (err, data) => {
    if (err) throw err;
    res.json({
      msg: "Usuario actualizado con éxito",
    });
  });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("ID:", id);

  const consulta = "DELETE FROM users WHERE id = ? ";
  connection.query(consulta, id, (err, data) => {
    if (err) throw err;
    res.json({
      msg: "Usuario eliminado",
    });
  });
};
