import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class BibliotecaControllers
{
    public async mostrar_biblioteca(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT  u.alias AS alias_usuario, j.nombre AS nombre_juego, b.fecha_compra FROM biblioteca b JOIN usuario u ON b.id_usuario = u.id JOIN juegos j ON b.id_juego = j.id_juego;');
        res.json( respuesta );
    }
    public async usuario_biblioteca(req: Request, res: Response): Promise <void>
    {
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM biblioteca WHERE id_usuario = ?', [id]);
        if(respuesta.length>0)
        {
            res.json(respuesta);
        }
        else
        {
            res.json({"id_usuario":"-1"});
            //res.status(404).json({'mensaje': 'No hay usuarios en biblioteca'});
        }
    
    }
//aqui va el crud


/*public async actualizarDatosBiblioteca(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    //console.log(req.params);
    console.log(id);
    const resp = await pool.query("UPDATE biblioteca set ? WHERE id_usuario = ?", [req.body, id]);
    res.json(resp);
    //res.json(null);
}*/


}
export const bibliotecaController = new BibliotecaControllers();