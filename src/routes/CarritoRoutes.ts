import { Router } from 'express';
import { carritoController } from '../controllers/CarritoController';
import { validarToken } from '../middleware/auth';

class CarritoRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/mostrarCarritos/',carritoController.mostrar_carritos);
        this.router.get('/carritoUsuario/:id_usuario',carritoController.carritoUsuario);
        this.router.post('/agregaACarrito/',carritoController.agregaACarrito);
        this.router.get('/totalAPagar/:id_usuario',carritoController.totalAPagar);
        this.router.delete('/eliminarProducto/:id',carritoController.eliminarProducto);
        this.router.delete('/eliminarCarrito/:id',carritoController.eliminarCarrito);
    }
}
const carritoRoutes= new CarritoRoutes();
export default carritoRoutes.router;