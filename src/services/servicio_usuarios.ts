import { Usuario } from '@prisma/client';
import { prisma } from '../index';

export class ServicioUsuario {
    static async obtener_usuarios(): Promise<Usuario[]> {
        return await prisma.usuario.findMany();
    }

    static async crear_usuario(datos: Omit<Usuario, 'id' | 'pedidos' | 'reservas'>): Promise<Usuario> {
        return await prisma.usuario.create({
            data: datos,
        });
    }

    static async eliminar_usuario(id: number): Promise<Usuario> {
        return await prisma.usuario.delete({
            where: { id },
        });
    }
}
