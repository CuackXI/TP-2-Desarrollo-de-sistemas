import { Request, Response } from 'express';
import { ServicioPlato } from '../services/servicio_platos';
import { ErrorDB } from '../errores/errores';
// Admin
export async function crearPlato(req: Request, res: Response) {
  try {
    const { nombre, precio, categoria, descripcion } = req.body;

    if (!nombre || typeof nombre !== 'string' || typeof precio !== 'number' || !categoria) {
        res.status(400).json({ mensaje: 'Datos inválidos' });
    }

    const plato = await ServicioPlato.crear_plato({ nombre, precio, categoria, descripcion });
    res.status(201).json(plato);
  } catch (error: any) {
    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al crear plato:', error);
    res.status(500).json({ mensaje: 'Error al crear plato' });
  }
}

// Admin
export async function eliminarPlato(req: Request, res: Response) {
  try {

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ mensaje: 'ID inválido' });
    }
    const plato = await ServicioPlato.eliminar_plato(id);
    res.json(plato);

  } catch (error: any) {
    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al eliminar plato:', error);
    res.status(500).json({ mensaje: 'Error al eliminar plato' });
  }
}