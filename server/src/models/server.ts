import express, { Application } from "express";
import connection from "../database/database";
import routesUsuarios from "../routes/usuario.routes";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.middlewares();
    this.routes();
    this.conectarDB();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo por el puerto: ", this.port);
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      next();
    });
   
    // parse del body
    this.app.use(express.json());
  }

  conectarDB() {
    connection.connect((err) => {
      if (err) throw err;
      console.log("BD Conectada...");
    });
  }

  routes() {
    this.app.use("/api/usuarios", routesUsuarios);
  }
}

export default Server;
