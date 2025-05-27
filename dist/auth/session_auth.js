"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCheck = void 0;
class SessionCheck {
    static checkUserIsLogged(req, res, next) {
        if (!req.session.user) {
            res.status(401).json({ ok: false, error: "No inició sesión" });
        }
        else if (req.session.user) {
            next();
        }
    }
    static checkUserIsUnlogged(req, res, next) {
        if (req.session.user) {
            res.status(401).json({ ok: false, error: "Ya inició sesión" });
        }
        else if (!req.session.user) {
            next();
        }
    }
    static checkUserIsAdmin(req, res, next) {
        if (!req.session.user) {
            res.status(401).json({ ok: false, error: "No inició sesión" });
        }
        else if (req.session.user.rol != "ADMIN") {
            res.status(401).json({ ok: false, error: "El usuario no es administrador" });
        }
        else {
            next();
        }
    }
}
exports.SessionCheck = SessionCheck;
