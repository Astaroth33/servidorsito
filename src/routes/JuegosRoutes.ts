import { Router } from 'express';
import { juegosController } from '../controllers/JuegosControllers';
import { validarToken } from '../middleware/auth';

class JuegosRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/mostrarJuegos/',juegosController.mostrar_juegos);
        this.router.get('/obtenerJuego/:id',juegosController.ObetenerJuego); //DOCUMENTAR
        this.router.get('/juegosPlataforma/:plataforma',juegosController.juegos_plataforma);
        this.router.post('/insertaJuego/',juegosController.insertaJuego);
        this.router.put('/actualizarJuego/:id',juegosController.actualizarJuego);
        this.router.delete('/eliminarJuego/:id',juegosController.eliminarJuego);
    }
}
const juegosRoutes= new JuegosRoutes();
export default juegosRoutes.router;