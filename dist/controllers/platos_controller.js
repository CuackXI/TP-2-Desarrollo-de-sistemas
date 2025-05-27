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
exports.crearPlato = crearPlato;
exports.eliminarPlato = eliminarPlato;
const servicio_platos_1 = require("../services/servicio_platos");
function crearPlato(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, precio, categoria, descripcion } = req.body;
            if (!nombre || typeof nombre !== 'string' || typeof precio !== 'number' || !categoria) {
                res.status(400).json({ mensaje: 'Datos inválidos' });
            }
            const plato = yield servicio_platos_1.ServicioPlato.crear_plato({ nombre, precio, categoria, descripcion });
            res.status(201).json(plato);
        }
        catch (error) {
            console.error('Error al crear plato:', error);
            res.status(500).json({ mensaje: 'Error al crear plato' });
        }
    });
}
function eliminarPlato(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ mensaje: 'ID inválido' });
            }
            const plato = yield servicio_platos_1.ServicioPlato.eliminar_plato(id);
            res.json(plato);
        }
        catch (error) {
            console.error('Error al eliminar plato:', error);
            res.status(500).json({ mensaje: 'Error al eliminar plato' });
        }
    });
}
