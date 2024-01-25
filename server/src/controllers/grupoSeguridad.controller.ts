import { Request, Response, query } from "express";
import connection from "../database/database";

export const obtenerGruposSeguridad = (req: Request, res: Response) => {
  const consulta = "SELECT * FROM grupos_seguridad";
  connection.query(consulta, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
};
