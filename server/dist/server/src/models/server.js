"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../database/database"));
const usuario_routes_1 = __importDefault(require("../routes/usuario.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.routes();
        console.log("routes", this.routes());
        this.conectarDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server corriendo por el puerto.:: ', this.port);
        });
    }
    conectarDB() {
        database_1.default.connect((err) => {
            if (err)
                throw err;
            console.log('BD Conectada...');
            console.log("routes", usuario_routes_1.default);
        });
    }
    routes() {
        console.log("routes", this.routes());
        console.log("routes", usuario_routes_1.default);
        this.app.use('/api/usuarios', usuario_routes_1.default);
    }
}
exports.default = Server;
