import { Request, Response, NextFunction } from "express";

export class SessionCheck {
    static checkUserIsLogged(req: Request, res: Response, next: NextFunction) {
        if (!req.session.user) {
            res.status(401).json({ ok: false, error: "No inició sesión" });
        } else
        if (req.session.user) {
            next();
        }
    }

    static checkUserIsUnlogged(req: Request, res: Response, next: NextFunction) {
        if (req.session.user) {
            res.status(401).json({ ok: false, error: "Ya inició sesión" });
        } else
        if (!req.session.user) {
            next();
        }
    }

    static checkUserIsAdmin(req: Request, res: Response, next: NextFunction) {
        if (!req.session.user) {
            res.status(401).json({ ok: false, error: "No inició sesión" });

        } else if (req.session.user.rol != "ADMIN") {
            res.status(401).json({ ok: false, error: "El usuario no es administrador" });

        } else {
            next();
        }
    }
}
