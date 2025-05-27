import { Usuario } from '@prisma/client';
import { prisma } from '../index';

export class ServicioUsuario {
    // Admin
    static async obtener_usuarios(): Promise<Usuario[]> {
        return await prisma.usuario.findMany();
    }

    // Cliente
    static async crear_usuario(datos: Omit<Usuario, 'id' | 'rol' | 'pedidos' | 'reservas'>): Promise<Usuario> {
        return await prisma.usuario.create({
            data: datos,
        });
    }

    // Admin
    static async eliminar_usuario(id: number): Promise<Usuario> {
        return await prisma.usuario.delete({
            where: { id },
        });
    }

    static async get_usuario_por_nombre(nombre: string): Promise<Usuario> {
        const usuario = await prisma.usuario.findUnique({
            where: { nombre },
        });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        return usuario;
    }

    static comparar_contraseña(contraseña: string, usuario: Usuario): Boolean{
        return contraseña == usuario.contraseña
    }
}
