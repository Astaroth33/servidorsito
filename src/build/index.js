"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const UsuarioRoutes_1 = __importDefault(require("./routes/UsuarioRoutes"));
const bibliotecaRoutes_1 = __importDefault(require("./routes/bibliotecaRoutes"));
const JuegosRoutes_1 = __importDefault(require("./routes/JuegosRoutes"));
const CarritoRoutes_1 = __importDefault(require("./routes/CarritoRoutes"));
const VentasRoutes_1 = __importDefault(require("./routes/VentasRoutes"));
/* TENER UNA FUNCION QUE BORRE LOS PRODUCTOS YA COMPRADOS DEL CARRITO*/
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/usuario', UsuarioRoutes_1.default);
        this.app.use('/api/biblioteca', bibliotecaRoutes_1.default);
        this.app.use('/api/juegos', JuegosRoutes_1.default);
        this.app.use('/api/carrito', CarritoRoutes_1.default);
        this.app.use('/api/ventas', VentasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor se esta ejecutando en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
