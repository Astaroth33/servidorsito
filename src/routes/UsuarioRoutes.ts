import { Router } from 'express';
import { usuariosController } from '../controllers/UsuarioController';
import { validarToken } from '../middleware/auth';

class UsuarioRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        //this.router.get('/',(req,res) => res.send('probando ruta'));
        this.router.get('/mostrarTodosUsuarios/',usuariosController.mostrar_todos_usuarios);
        this.router.get('/obtenerUsuario/:id',usuariosController.listOne);
        this.router.post('/crearUsuario/',usuariosController.createUsuario);
        this.router.put('/actualizarUsuario/:id',usuariosController.actualizarUsuario);
        this.router.delete('/eliminarUsuario/:id',usuariosController.eliminarUsuario);
        this.router.post('/ValidarUsuario/',usuariosController.ValidarUsuario);
        //this.router.get('/listarUsuariosRol/:id',usuariosController.listarUsuariosRol);
    }
}
const usuarioRoutes= new UsuarioRoutes();
export default usuarioRoutes.router;