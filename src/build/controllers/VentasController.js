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
exports.ventasController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class VentasController {
    mostrarVentas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM ventas');
            res.json(respuesta);
        });
    }
    ventaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM ventas WHERE id_usuario = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
            }
            else {
                res.json({ "id_usuario": "-1" });
                //res.status(404).json({'mensaje': 'No hay usuarios en biblioteca'});
            }
        });
    }
    //aqui va el crud
    ingresaVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametross = {
                id_usuario: req.body.id_usuario,
                id_juego: req.body.id_juego,
                fecha_compra: req.body.fecha_compra // Utiliza new Date() para obtener la fecha actual
            };
            const consulta = 'INSERT INTO ventas SET ?';
            var resp = yield database_1.default.query(consulta, [parametross]);
            const parametros = req.body;
            resp = yield database_1.default.query('UPDATE ventas SET precio_juego = (SELECT precio FROM juegos WHERE id_juego = ?) WHERE id_usuario = ? AND id_juego = ?', [parametros.id_juego, parametros.id_usuario, parametros.id_juego]);
            const parametrosBiblio = {
                id_usuario: parametros.id_usuario,
                id_juego: parametros.id_juego,
                fecha_compra: parametros.fecha_compra
            };
            resp = yield database_1.default.query("INSERT INTO biblioteca set ?", [parametrosBiblio]);
            //resp = await pool.query('UPDATE biblioteca SET precio_juego = (SELECT precio FROM juegos WHERE id_juego = ?) WHERE id_usuario = ? AND id_juego = ?', [parametros.id_juego, parametros.id_usuario, parametros.id_juego]);
            res.json(resp);
            //res.json(null);
        });
    }
    /*public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE usuario set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }*/
    eliminarVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigo } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM ventas WHERE codigo = ${codigo}`);
            res.json(resp);
        });
    }
    totalPagado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const resp = yield database_1.default.query(`SELECT ROUND(SUM(precio_juego), 2) AS Total FROM ventas WHERE id_usuario = ${id_usuario}`);
            res.json(resp[0]);
        });
    }
}
exports.ventasController = new VentasController();
