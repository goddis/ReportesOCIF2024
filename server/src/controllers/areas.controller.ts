import { Request, Response, query } from "express";
import connection from "../database/database";

export const getAreas = (req: Request, res: Response) => {
  const consulta = "SELECT * FROM area";
  connection.query(consulta, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
};
