import { Request, Response } from 'express';

export async function logout(req: Request, res: Response) {
    try {
        if (!req.session.user) {
            res.status(401).json({ ok: false, error: "No inició sesión" });
            return;
        }

        req.session.destroy((_) => { res.status(200).json({ ok: true }); });
    } catch (error) {
        res.status(500).json({ ok: false, error: (error as any).message })
    }
}