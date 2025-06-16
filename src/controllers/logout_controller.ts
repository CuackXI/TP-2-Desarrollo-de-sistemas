import { Request, Response } from 'express';
import { SessionCheck } from '../auth/session_auth';

export async function logout(req: Request, res: Response) {
    try {
        SessionCheck.logoutUser(req);
        res.status(200).json({mensaje: 'Logout exitoso'});
    
    } catch (error: any) {
        console.log("Error al cerrar sesión:", error);
        res.status(500).json({ mensaje: "Error en cerrar sesión" }); 
    }
}