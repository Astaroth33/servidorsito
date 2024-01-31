import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class BibliotecaControllers
{
    public async mostrar_biblioteca(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM biblioteca');
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