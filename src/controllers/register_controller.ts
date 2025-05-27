import { Request, Response } from 'express';
import { ServicioUsuario } from '../services/servicio_usuarios';

export const registrarse = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoUsuario = await ServicioUsuario.crear_usuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.log("Error:", error)
    res.status(500).json({ mensaje: `Error al registrar usuario` });
  }
};
