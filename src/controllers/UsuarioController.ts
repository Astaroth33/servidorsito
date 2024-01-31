import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class UsuarioController
{
    public async mostrar_todos_usuarios(req: Request, res: Response ): Promise<void>
    {
        //console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM usuario');
        res.json( respuesta );
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        if(respuesta.length>0)
        {
            res.json(respuesta[0]);
            return ;
        }
    res.status(404).json({'mensaje': 'Usuario no encontrado'});
    }
//aqui va el crud
public async createUsuario(req: Request, res: Response): Promise<void> {
    const parametros = {
        alias: req.body.alias,
        correo: req.body.correo,
        password: req.body.password,
        fecha_ingreso: req.body.fecha_ingreso// Utiliza new Date() para obtener la fecha actual
      };
      
      const consulta = 'INSERT INTO usuario SET ?';
      
      // Realiza la consulta
      const resp = await pool.query(consulta, [parametros]);
      
    res.json(resp);
    //res.json(null);
}
public async actualizarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    //console.log(req.params);
    console.log(id);
    const resp = await pool.query("UPDATE usuario set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    //res.json(null);
}

public async eliminarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    var resp = await pool.query(`DELETE FROM usuario WHERE id = ${id}`);
    resp = await pool.query(`DELETE FROM biblioteca WHERE id_usuario = ${id}`);
    resp = await pool.query(`DELETE FROM carrito WHERE id_usuario = ${id}`);
    res.json(resp);
}

public async ValidarUsuario(req: Request, res: Response): Promise<void> {
    console.log("Consulta");
    const parametros = req.body;
    //console.log('${parametros.correo}');
    var consulta = `SELECT id, alias FROM usuario WHERE correo = '${parametros.correo}' AND password = '${parametros.password}'`;
    const resp = await pool.query(consulta);
    if(resp.length>0)
        res.json(resp[0]);
    else
        res.json({"id":"-1"});
    //res.json(null);
    //console.log(consulta);
} 
/*
public async listarUsuariosRol(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`SELECT nombre, nombre_rol FROM  usuarios LEFT JOIN roles on usuarios.id_rol = roles.id_rol WHERE usuarios.id_Rol = ${id};`);
    res.json(resp);
    //if(resp.length>0){
    //    res.json(resp);
    //    return ;
    //}
    //res.status(404).json({'mensaje': 'No hay usuarios en ese rol'});
    }*/
}
export const usuariosController = new UsuarioController();