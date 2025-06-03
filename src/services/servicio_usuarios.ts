import { Usuario } from '@prisma/client';
import { prisma } from '../index';
import { ErrorDB } from '../errores/errores';

export class ServicioUsuario {
    static ERROR_NO_USUARIO = 'Usuario no encontrado';
    static ERROR_ENCONTRANDO_USUARIO = 'Error al encontrar usuario';
    static ERROR_OBTENER_USUARIOS = 'Error al obtener usuarios';
    static ERROR_EN_CREAR_USUARIO = 'Error al crear usuario';
    static ERROR_ELIMINANDO_USUARIO = 'Error al eliminar usuario';

    // Admin
    static async obtener_usuarios(): Promise<Usuario[]> {
        try {
            return await prisma.usuario.findMany();

        } catch (error: any) {

            console.log(error.message)
            throw new ErrorDB(ServicioUsuario.ERROR_OBTENER_USUARIOS, 500);
        }
    }

    // Cliente
    static async crear_usuario(datos: Omit<Usuario, 'id' | 'rol' | 'pedidos' | 'reservas'>): Promise<Usuario> {
        try {
            return await prisma.usuario.create({
                data: datos,
            });

        } catch (error: any) {
            console.log(error.message)
            throw new ErrorDB(ServicioUsuario.ERROR_EN_CREAR_USUARIO, 400);
        }
    }

    // Admin
    static async eliminar_usuario(id: number): Promise<Usuario> {
        try {
            return await prisma.usuario.delete({
                where: { id },
            });

        } catch (error: any) {
            console.log(error.message)
            throw new ErrorDB(ServicioUsuario.ERROR_ELIMINANDO_USUARIO, 404);
        }
    }

    static async get_usuario_por_nombre(nombre: string): Promise<Usuario> {
        let usuario;
        try {
            usuario = await prisma.usuario.findUnique({
                where: { nombre },
            });
            
        } catch (error: any) {
            console.log(error.message)
            throw new ErrorDB(ServicioUsuario.ERROR_ENCONTRANDO_USUARIO, 500);
        }

        if (!usuario) {
            throw new ErrorDB(ServicioUsuario.ERROR_NO_USUARIO, 404);
        }
        
        return usuario;
    }

    static comparar_contraseña(contraseña: string, usuario: Usuario): Boolean{
        return contraseña == usuario.contraseña
    }
}
