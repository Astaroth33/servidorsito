"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentasController_1 = require("../controllers/VentasController");
class VentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/',(req,res) => res.send('probando ruta'));
        this.router.get('/mostrarVentas/', VentasController_1.ventasController.mostrarVentas);
        this.router.get('/ventaUsuario/:id', VentasController_1.ventasController.ventaUsuario);
        this.router.get('/totalPagado/:id_usuario', VentasController_1.ventasController.totalPagado); //FALTA
        this.router.post('/ingresaVenta/', VentasController_1.ventasController.ingresaVenta);
        this.router.delete('/eliminarVenta/:codigo', VentasController_1.ventasController.eliminarVenta);
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
