import { Request, Response } from 'express';

export async function logout(req: Request, res: Response) {
    try {
        if (!req.session.user) {
            res.status(401).json({ error: "No inició sesión" });
            return;
        }

        req.session.destroy((_) => { res.status(200).json({mensaje: 'Logout exitoso'}); });
    
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}