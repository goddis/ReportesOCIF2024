import Server from "./models/server";
import dotenv from 'dotenv';

//Configuración .env
dotenv.config();

const server = new Server();

server.listen();