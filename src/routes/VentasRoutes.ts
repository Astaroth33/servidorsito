import { Router } from 'express';
import { ventasController } from '../controllers/VentasController';
import { validarToken } from '../middleware/auth';

class VentasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        //this.router.get('/',(req,res) => res.send('probando ruta'));
        this.router.get('/mostrarVentas/',ventasController.mostrarVentas);
        this.router.get('/ventaUsuario/:id',ventasController.ventaUsuario);
        this.router.get('/totalPagado/:id_usuario',ventasController.totalPagado);//FALTA
        this.router.post('/ingresaVenta/',ventasController.ingresaVenta);
        this.router.delete('/eliminarVenta/:codigo',ventasController.eliminarVenta);

    }
}
const ventasRoutes= new VentasRoutes();
export default ventasRoutes.router;