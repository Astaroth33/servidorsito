import { Request, Response } from 'express';
import pool from '../database'; //acceso a la base de datos
class VentasController {
    public async mostrarVentas(req: Request, res: Response): Promise<void> {
        const respuesta = await pool.query('SELECT v.codigo, u.alias AS alias_usuario, j.nombre AS nombre_juego, v.precio_juego, v.fecha_compra FROM ventas v JOIN usuario u ON v.id_usuario = u.id JOIN juegos j ON v.id_juego = j.id_juego;');
        res.json(respuesta);
    }

    public async mostrarVentasFecha(req: Request, res: Response): Promise<void> {
        const parametros = req.body;
        //console.log (req.body);
        const respuesta = await pool.query('SELECT v.codigo, u.alias AS alias_usuario, j.nombre AS nombre_juego, v.precio_juego, v.fecha_compra FROM ventas v JOIN usuario u ON v.id_usuario = u.id JOIN juegos j ON v.id_juego = j.id_juego WHERE v.fecha_compra >= ? AND v.fecha_compra<= ? GROUP BY v.fecha_compra;', [parametros.fecha_compra, parametros.fecha_compra_f]);
        //console.log(respuesta)

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

    public async ventaUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT v.codigo, j.nombre AS nombre_juego, v.precio_juego, v.fecha_compra FROM ventas v JOIN juegos j ON v.id_juego = j.id_juego WHERE id_usuario = ?', [id]);
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
    public async ingresaVenta(req: Request, res: Response): Promise<void> {

        const parametross = {
            id_usuario: req.body.id_usuario,
            id_juego: req.body.id_juego,
            fecha_compra: req.body.fecha_compra // Utiliza new Date() para obtener la fecha actual
          };
          
          const consulta = 'INSERT INTO ventas SET ?';

        var resp = await pool.query(consulta, [parametross]);
        const parametros = req.body;
        resp = await pool.query('UPDATE ventas SET precio_juego = (SELECT precio FROM juegos WHERE id_juego = ?) WHERE id_usuario = ? AND id_juego = ?', [parametros.id_juego, parametros.id_usuario, parametros.id_juego]);
        const parametrosBiblio = {
            id_usuario: parametros.id_usuario,
            id_juego: parametros.id_juego,
            fecha_compra: parametros.fecha_compra
        }
        resp = await pool.query("INSERT INTO biblioteca set ?", [parametrosBiblio])
        //resp = await pool.query('UPDATE biblioteca SET precio_juego = (SELECT precio FROM juegos WHERE id_juego = ?) WHERE id_usuario = ? AND id_juego = ?', [parametros.id_juego, parametros.id_usuario, parametros.id_juego]);
        res.json(resp);

        //res.json(null);
    }
    /*public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE usuario set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }*/

    public async eliminarVenta(req: Request, res: Response): Promise<void> {
        const { codigo } = req.params;
        const resp = await pool.query(`DELETE FROM ventas WHERE codigo = ${codigo}`);
        res.json(resp);
    }

    public async totalPagado(req: Request, res: Response): Promise<void> {
        const parametros = req.body;
        console.log ("FECHASPAGADO: ",req.body);
        const resp = await pool.query('SELECT ROUND(SUM(precio_juego), 2) AS Total FROM ventas  WHERE DATE(fecha_compra) >= ? AND DATE(fecha_compra)<= ? GROUP BY DATE(fecha_compra);', [parametros.fecha_compra, parametros.fecha_compra_f]);
        
    }

}
export const ventasController = new VentasController();