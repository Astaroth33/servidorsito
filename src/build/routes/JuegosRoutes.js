"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JuegosControllers_1 = require("../controllers/JuegosControllers");
class JuegosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarJuegos/', JuegosControllers_1.juegosController.mostrar_juegos);
        this.router.get('/obtenerJuego/:id', JuegosControllers_1.juegosController.ObetenerJuego); //DOCUMENTAR
        this.router.get('/juegosPlataforma/:plataforma', JuegosControllers_1.juegosController.juegos_plataforma);
        this.router.post('/insertaJuego/', JuegosControllers_1.juegosController.insertaJuego);
        this.router.put('/actualizarJuego/:id', JuegosControllers_1.juegosController.actualizarJuego);
        this.router.delete('/eliminarJuego/:id', JuegosControllers_1.juegosController.eliminarJuego);
    }
}
const juegosRoutes = new JuegosRoutes();
exports.default = juegosRoutes.router;
