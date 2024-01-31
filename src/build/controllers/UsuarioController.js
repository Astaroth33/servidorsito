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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos
class UsuarioController {
    mostrar_todos_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("YA ESTAMOS AQUI");
            const respuesta = yield database_1.default.query('SELECT * FROM usuario');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM usuario WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
        });
    }
    //aqui va el crud
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametros = {
                alias: req.body.alias,
                correo: req.body.correo,
                password: req.body.password,
                fecha_ingreso: req.body.fecha_ingreso // Utiliza new Date() para obtener la fecha actual
            };
            const consulta = 'INSERT INTO usuario SET ?';
            // Realiza la consulta
            const resp = yield database_1.default.query(consulta, [parametros]);
            res.json(resp);
            //res.json(null);
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(req.params);
            console.log(id);
            const resp = yield database_1.default.query("UPDATE usuario set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
            //res.json(null);
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var resp = yield database_1.default.query(`DELETE FROM usuario WHERE id = ${id}`);
            resp = yield database_1.default.query(`DELETE FROM biblioteca WHERE id_usuario = ${id}`);
            resp = yield database_1.default.query(`DELETE FROM carrito WHERE id_usuario = ${id}`);
            res.json(resp);
        });
    }
    ValidarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Consulta");
            const parametros = req.body;
            //console.log('${parametros.correo}');
            var consulta = `SELECT id, alias FROM usuario WHERE correo = '${parametros.correo}' AND password = '${parametros.password}'`;
            const resp = yield database_1.default.query(consulta);
            if (resp.length > 0)
                res.json(resp[0]);
            else
                res.json({ "id": "-1" });
            //res.json(null);
            //console.log(consulta);
        });
    }
}
exports.usuariosController = new UsuarioController();
