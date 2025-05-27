"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMisReservas = getMisReservas;
exports.crearReservaUsuario = crearReservaUsuario;
exports.eliminarMiReserva = eliminarMiReserva;
const servicio_reservas_1 = require("../services/servicio_reservas");
function getMisReservas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.session.user) {
                throw new Error('No inició sesión');
            }
            const usuarioId = req.session.user.id;
            const reservas = yield servicio_reservas_1.ServicioReserva.obtener_reservas_usuario(usuarioId);
            res.json(reservas);
        }
        catch (error) {
            console.error('Error al obtener mis reservas:', error);
            res.status(500).json({ mensaje: 'Error al obtener reservas del usuario' });
        }
    });
}
function crearReservaUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.session.user) {
                throw new Error('No inició sesión');
            }
            const usuarioId = req.session.user.id;
            const { mesaId } = req.body;
            if (!mesaId) {
                res.status(400).json({ mensaje: 'Falta el ID de la mesa' });
            }
            const reserva = yield servicio_reservas_1.ServicioReserva.crear_reserva({ mesaId, usuarioId });
            res.status(201).json(reserva);
        }
        catch (error) {
            console.error('Error al crear reserva del usuario:', error);
            res.status(500).json({ mensaje: 'Error al crear reserva' });
        }
    });
}
function eliminarMiReserva(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.session.user) {
                throw new Error('No inició sesión');
            }
            const id = parseInt(req.params.id);
            const usuarioId = req.session.user.id;
            const reserva = yield servicio_reservas_1.ServicioReserva.obtener_reserva_por_id(id);
            if (!reserva) {
                res.status(404).json({ mensaje: 'Reserva no encontrada' });
            }
            if (!reserva || reserva.usuarioId !== usuarioId) {
                res.status(403).json({ mensaje: 'No tenés permiso para eliminar esta reserva' });
            }
            yield servicio_reservas_1.ServicioReserva.eliminar_reserva(id);
            res.json({ mensaje: 'Reserva eliminada correctamente' });
        }
        catch (error) {
            console.error('Error al eliminar reserva del usuario:', error);
            res.status(500).json({ mensaje: 'Error al eliminar reserva' });
        }
    });
}
