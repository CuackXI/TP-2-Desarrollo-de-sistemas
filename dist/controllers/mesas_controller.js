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
exports.getMesas = getMesas;
exports.crearMesa = crearMesa;
exports.eliminarMesa = eliminarMesa;
exports.verificarDisponibilidadMesa = verificarDisponibilidadMesa;
const servicio_mesas_1 = require("../services/servicio_mesas");
function getMesas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mesas = yield servicio_mesas_1.ServicioMesa.obtener_mesas();
            res.json(mesas);
        }
        catch (error) {
            console.error('Error al obtener mesas:', error);
            res.status(500).json({ mensaje: 'Error al obtener mesas' });
        }
    });
}
function crearMesa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { numero, disponible } = req.body;
            if (typeof numero !== 'number' || typeof disponible !== 'boolean') {
                return res.status(400).json({ mensaje: 'Datos inválidos' });
            }
            const mesa = yield servicio_mesas_1.ServicioMesa.crear_mesa({ numero, disponible });
            res.status(201).json(mesa);
        }
        catch (error) {
            console.error('Error al crear mesa:', error);
            res.status(500).json({ mensaje: 'Error al crear mesa' });
        }
    });
}
function eliminarMesa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ mensaje: 'ID inválido' });
            }
            const mesa = yield servicio_mesas_1.ServicioMesa.eliminar_mesa(id);
            res.json(mesa);
        }
        catch (error) {
            console.error('Error al eliminar mesa:', error);
            res.status(500).json({ mensaje: 'Error al eliminar mesa' });
        }
    });
}
function verificarDisponibilidadMesa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idMesa = parseInt(req.params.idMesa);
            const { fecha } = req.query;
            if (isNaN(idMesa) || typeof fecha !== 'string') {
                return res.status(400).json({ mensaje: 'Parámetros inválidos' });
            }
            const fechaDate = new Date(fecha);
            const disponible = yield servicio_mesas_1.ServicioMesa.esta_mesa_disponible(idMesa, fechaDate);
            res.json({ disponible });
        }
        catch (error) {
            console.error('Error al verificar disponibilidad de mesa:', error);
            res.status(500).json({ mensaje: 'Error al verificar disponibilidad de mesa' });
        }
    });
}
