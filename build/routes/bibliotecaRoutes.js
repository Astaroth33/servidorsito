"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BibliotecaControllers_1 = require("../controllers/BibliotecaControllers");
class BibliotecaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',(req,res) => res.send('probando ruta'));
        this.router.get('/mostrarbiblioteca/', BibliotecaControllers_1.bibliotecaController.mostrar_biblioteca);
        this.router.get('/usuariobiblioteca/:id', BibliotecaControllers_1.bibliotecaController.usuario_biblioteca);
        //this.router.post('/actualizarbiblioteca/:id',bibliotecaController.actualizarDatosBiblioteca);//checar si se tiene que actualizar
        //Eliminar algun juego
    }
}
const bibliotecaRoutes = new BibliotecaRoutes();
exports.default = bibliotecaRoutes.router;
