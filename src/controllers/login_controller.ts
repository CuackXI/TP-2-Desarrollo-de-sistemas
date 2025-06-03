import { Request, Response } from 'express';
import { ServicioUsuario } from '../services/servicio_usuarios';
import { SessionCheck } from '../auth/session_auth';
import { ErrorDB } from '../errores/errores';

export async function login(req: Request, res: Response) {
  try {
    const { nombre, contraseña } = req.body;

    if (!nombre || !contraseña) {
      res.status(400).json({ mensaje: 'Nombre y contraseña son requeridos' });
    }

    try {
      const usuario = await ServicioUsuario.get_usuario_por_nombre(nombre);
      const contraseñaValida = ServicioUsuario.comparar_contraseña(contraseña, usuario);
      
      if (!contraseñaValida) {
        res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
      
      SessionCheck.loginUser(req, usuario)

      res.status(200).json({mensaje: 'Login exitoso'});

    } catch (error: any) {
      if (error.name == ErrorDB.TIPO) {
        res.status(error.status).json({ mensaje: error.message });

      } else {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: error.message });
      }
    }

  } catch (error: any) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: error.message});
  }
}