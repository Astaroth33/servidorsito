import { Router } from 'express';
import { bibliotecaController } from '../controllers/BibliotecaControllers';
import { validarToken } from '../middleware/auth';

class BibliotecaRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        //this.router.get('/',(req,res) => res.send('probando ruta'));
        this.router.get('/mostrarbiblioteca/',bibliotecaController.mostrar_biblioteca);
        this.router.get('/usuariobiblioteca/:id',bibliotecaController.usuario_biblioteca);
        //this.router.post('/actualizarbiblioteca/:id',bibliotecaController.actualizarDatosBiblioteca);//checar si se tiene que actualizar
        //Eliminar algun juego
    }
}
const bibliotecaRoutes= new BibliotecaRoutes();
export default bibliotecaRoutes.router;

