"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CarritoController_1 = require("../controllers/CarritoController");
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarCarritos/', CarritoController_1.carritoController.mostrar_carritos);
        this.router.get('/carritoUsuario/:id_usuario', CarritoController_1.carritoController.carritoUsuario);
        this.router.post('/agregaACarrito/', CarritoController_1.carritoController.agregaACarrito);
        this.router.get('/totalAPagar/:id_usuario', CarritoController_1.carritoController.totalAPagar);
        this.router.delete('/eliminarProducto/:id', CarritoController_1.carritoController.eliminarProducto);
        this.router.delete('/eliminarCarrito/:id', CarritoController_1.carritoController.eliminarCarrito);
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
