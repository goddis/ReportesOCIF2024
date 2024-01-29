import { Request, Response, query } from "express";
import connection from "../database/database";

export const getGruposSeguridad = (req: Request, res: Response) => {
  const consulta = "SELECT * FROM grupos_seguridad";
  connection.query(consulta, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
};
