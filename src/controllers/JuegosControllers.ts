import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class JuegosControllers
{
    public async mostrar_juegos(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM juegos');
        res.json( respuesta );
    }

    public async ObetenerJuego(req: Request, res: Response): Promise <void>
    {
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM juegos WHERE id_juego = ?', [id]);
        if(respuesta.length>0)
        {
            res.json(respuesta[0]);
            return ;
        }
    res.status(404).json({'mensaje': 'Juego no encontrado'});
    }

    public async juegos_plataforma(req: Request, res: Response): Promise <void>
    {
        const {plataforma} = req.params;
        const respuesta = await pool.query('SELECT * FROM juegos WHERE plataforma = ?', [plataforma]);
        if(respuesta.length>0)
        {
            res.json(respuesta);
        }
        else
        {
            res.json({"id_juego":"-1"});
        }
    
    }
//aqui va el crud

public async insertaJuego(req: Request, res: Response): Promise<void> {
    //console.log(req.body)
    const resp = await pool.query("INSERT INTO juegos set ?",[req.body]);
    res.json(resp);
    //res.json(null);
}

public async actualizarJuego(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    //console.log(req.params);
    const resp = await pool.query("UPDATE juegos set ? WHERE id_juego = ?", [req.body, id]);
    res.json(resp);
    //res.json(null);
}

public async eliminarJuego(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM juegos WHERE id_juego = ${id}`);
    res.json(resp);
}


}
export const juegosController = new JuegosControllers();