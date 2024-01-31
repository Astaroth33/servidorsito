 
 import express, {Application} from 'express';
 import morgan from 'morgan';
 import cors from 'cors';
 import swaggerDocument from './swagger.json';
 import swagger_ui_express from 'swagger-ui-express';
 import indexRoutes from './routes/indexRoutes';
 import UsuarioRoutes from './routes/UsuarioRoutes';
import bibliotecaRoutes from './routes/bibliotecaRoutes';
import JuegosRoutes from './routes/JuegosRoutes';
import CarritoRoutes from './routes/CarritoRoutes';
import VentasRoutes from './routes/VentasRoutes';

/* TENER UNA FUNCION QUE BORRE LOS PRODUCTOS YA COMPRADOS DEL CARRITO*/

 class Server
{
    public app: Application;
    constructor()
    {
        this.app= express();
        this.config();
        this.routes();
        this.app.use ('/documentacion', swagger_ui_express.serve, swagger_ui_express.setup (swaggerDocument));
    }
    config (): void
    {
        this.app.set('port',process.env.PORT|| 3000);
        this.app.use (morgan('dev'));
        this.app.use (cors());
        this.app.use (express.json());
        this.app.use (express.urlencoded({extended: false}));
    }
    routes (): void
    {
        this.app.use(indexRoutes);
        this.app.use ('/api/usuario',UsuarioRoutes);
        this.app.use ('/api/biblioteca',bibliotecaRoutes);
        this.app.use ('/api/juegos',JuegosRoutes);
        this.app.use ('/api/carrito',CarritoRoutes);
        this.app.use ('/api/ventas',VentasRoutes);

    }
    start (): void
    {
        this.app.listen(this.app.get('port'), () =>
        {
        console.log('El servidor se esta ejecutando en el puerto: ',this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();