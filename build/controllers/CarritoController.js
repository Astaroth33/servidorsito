"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class CarritoController {
    mostrar_carritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM carrito');
            res.json(respuesta);
        });
    }
    carritoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carrito WHERE id_usuario = ?', [id_usuario]);
            if (respuesta.length > 0) {
                res.json(respuesta);
            }
            else {
                res.json({ "id_usuario": "-1" });
            }
        });
    }
    //aqui va el crud
    /*
        ==> CREO QUE NO DEBO HACER AQUI EL CREAR EL PRODUCTO EN EL CARRITO, ESO DEBERIA SER EN LA COMPRA
        ==> IGUAL PARA ACTUALIZAR, SE ACTUALIZARA SI SE MODIFICA EL PRECIO O COSAS POR EL ESTILO
    */
    agregaACarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body)
            const parametros = req.body;
            var resp = yield database_1.default.query("INSERT INTO carrito set ?", [req.body]);
            resp = yield database_1.default.query('UPDATE carrito SET precio_juego = (SELECT precio FROM juegos WHERE id_juego = ?) WHERE id_usuario = ? AND id_juego = ?', [parametros.id_juego, parametros.id_usuario, parametros.id_juego]);
            res.json(resp);
            //res.json(null);
        });
    }
    eliminarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carrito WHERE id_juego = ${id}`);
            res.json(resp);
        });
    }
    eliminarCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carrito WHERE id_usuario = ${id}`);
            res.json(resp);
        });
    }
    totalAPagar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const resp = yield database_1.default.query(`SELECT ROUND(SUM(precio_juego), 2) AS Total FROM carrito WHERE id_usuario = ${id_usuario}`);
            res.json(resp[0]);
        });
    }
}
exports.carritoController = new CarritoController();
