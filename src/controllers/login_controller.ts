import { Request, Response } from 'express';
import { ServicioUsuario } from '../services/servicio_usuarios';
import { SessionCheck } from '../auth/session_auth';

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

      res.status(200).json({mensaje: 'Login sucsessful'})

    } catch (error: any) {
      if (error.message === 'Usuario no encontrado') {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
    }

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor al procesar el login' });
  }
}