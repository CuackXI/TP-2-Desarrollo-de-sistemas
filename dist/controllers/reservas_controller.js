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
exports.getReservas = getReservas;
exports.getReservasUsuario = getReservasUsuario;
exports.crearReserva = crearReserva;
exports.eliminarReserva = eliminarReserva;
const servicio_reservas_1 = require("../services/servicio_reservas");
function getReservas(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reservas = yield servicio_reservas_1.ServicioReserva.obtener_reservas();
            res.json(reservas);
        }
        catch (error) {
            console.error('Error al obtener reservas:', error);
            res.status(500).json({ mensaje: 'Error al obtener reservas' });
        }
    });
}
function getReservasUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuarioId = parseInt(req.params.usuarioId);
            if (isNaN(usuarioId)) {
                res.status(400).json({ mensaje: 'ID de usuario inválido' });
            }
            const reservas = yield servicio_reservas_1.ServicioReserva.obtener_reservas_usuario(usuarioId);
            res.json(reservas);
        }
        catch (error) {
            console.error('Error al obtener reservas del usuario:', error);
            res.status(500).json({ mensaje: 'Error al obtener reservas del usuario' });
        }
    });
}
function crearReserva(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mesaId, usuarioId } = req.body;
            if (!mesaId || !usuarioId) {
                res.status(400).json({ mensaje: 'Datos incompletos' });
            }
            const reserva = yield servicio_reservas_1.ServicioReserva.crear_reserva({ mesaId, usuarioId, });
            res.status(201).json(reserva);
        }
        catch (error) {
            console.error('Error al crear reserva:', error);
            res.status(500).json({
                mensaje: 'Error al crear reserva',
            });
        }
    });
}
function eliminarReserva(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ mensaje: 'ID inválido' });
            }
            yield servicio_reservas_1.ServicioReserva.eliminar_reserva(id);
            res.json({ mensaje: 'Reserva eliminada correctamente' });
        }
        catch (error) {
            console.error('Error al eliminar reserva:', error);
            if (error instanceof Error && error.message === 'Reserva no encontrada') {
                res.status(404).json({ mensaje: error.message });
            }
            res.status(500).json({
                mensaje: 'Error al eliminar reserva',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    });
}
