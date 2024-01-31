import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class CarritoController
{
    public async mostrar_carritos(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM carrito');
        res.json( respuesta );
    }

    public async carritoUsuario(req: Request, res: Response): Promise <void>
    {
        const {id_usuario} = req.params;
        const respuesta = await pool.query('SELECT * FROM carrito WHERE id_usuario = ?', [id_usuario]);
        if(respuesta.length>0)
        {
            res.json(respuesta);
        }
        else
        {
            res.json({"id_usuario":"-1"});
            
        }
    }
//aqui va el crud

/*
    ==> CREO QUE NO DEBO HACER AQUI EL CREAR EL PRODUCTO EN EL CARRITO, ESO DEBERIA SER EN LA COMPRA
    ==> IGUAL PARA ACTUALIZAR, SE ACTUALIZARA SI SE MODIFICA EL PRECIO O COSAS POR EL ESTILO
*/
public async agregaACarrito(req: Request, res: Response): Promise<void> {
    //console.log(req.body)
    const parametros = req.body;

    var resp = await pool.query("INSERT INTO carrito set ?",[req.body]);
    resp = await pool.query('UPDATE carrito SET precio_juego = (SELECT precio FROM juegos WHERE id_juego = ?) WHERE id_usuario = ? AND id_juego = ?', [parametros.id_juego, parametros.id_usuario, parametros.id_juego]);
    res.json(resp);
    //res.json(null);
}

public async eliminarProducto(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM carrito WHERE id_juego = ${id}`);
    res.json(resp);
}

public async eliminarCarrito(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM carrito WHERE id_usuario = ${id}`);
    res.json(resp);
}

public async totalAPagar(req: Request, res: Response): Promise<void> {
    const { id_usuario } = req.params;
    const resp = await pool.query(`SELECT ROUND(SUM(precio_juego), 2) AS Total FROM carrito WHERE id_usuario = ${id_usuario}`);
    res.json(resp[0]);
}


}
export const carritoController = new CarritoController();