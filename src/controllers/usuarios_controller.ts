import { Request, Response } from 'express';
import { ServicioUsuario } from '../services/servicio_usuarios';

export async function getUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await ServicioUsuario.obtener_usuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

export async function eliminarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ mensaje: 'ID inválido' });
      return;
    }

    const usuarioEliminado = await ServicioUsuario.eliminar_usuario(id);
    res.json(usuarioEliminado);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
}