import { Reserva, RolUsuario } from '@prisma/client';
import { prisma } from '../index';
import { ServicioMesa } from './servicio_mesas';

export class ServicioReserva {
    // Admin
    static async obtener_reservas(): Promise<Reserva[]> {
        return prisma.reserva.findMany();
    }

    // Cliente
    static async obtener_reservas_usuario(usuarioId: number): Promise<Reserva[]> {
        return prisma.reserva.findMany({
            where: {
                usuarioId: usuarioId,
            },
        });
    }

    // Admin
    static async obtener_reserva_por_id(id: number): Promise<Reserva | null> {
        return prisma.reserva.findUnique({
            where: { id },
        });
    }

    // Cliente
    static async crear_reserva(datos: Omit<Reserva, 'id' | 'usuario' | 'mesa'>, rol: RolUsuario): Promise<Reserva> {
        const mesa = await ServicioMesa.obtener_mesa_por_id(datos.mesaId);
        
        if (!mesa.disponible && rol.toString() === 'CLIENTE') {
            throw new Error('La mesa no está disponible.');
        }
        
        const reserva = await prisma.reserva.create({
            data: datos
        });

        await prisma.mesa.update({
            where: {
                id: reserva.mesaId
            },
            data: {
                disponible: false
            }
        })
    
        return reserva;
    }

    // Admin
    static async eliminar_reserva(id: number) {
        const reserva = await prisma.reserva.findUnique({
            where: { id },
        });

        if (!reserva){
            throw new Error('Reserva no encontrada');
        }

        await prisma.reserva.delete({
            where: { id },
        });

        const mesaId = reserva.mesaId;

        const reservasRestantes = await prisma.reserva.findMany({
            where: { mesaId },
        });

        if (reservasRestantes.length === 0) {
            await prisma.mesa.update({
                where: { id: mesaId },
                data: { disponible: true },
        });
    }

    }
}
