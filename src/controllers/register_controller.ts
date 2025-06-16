import { Request, Response } from 'express';
import { ServicioUsuario } from '../services/servicio_usuarios';
import { ErrorDB } from '../errores/errores';

export const registrarse = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoUsuario = await ServicioUsuario.crear_usuario(req.body);
    res.status(201).json(nuevoUsuario);
    
  } catch (error: any) {
    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.log("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
};
