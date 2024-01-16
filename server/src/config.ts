import { config } from "dotenv";

//Pone a disposción las variables de entorno configuradas en el .env
config();

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || ""
};