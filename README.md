# Restaurante lo de Migue
Repositorio de la api web backend para la materia desarrollo de sistemas. Consta de una API para un sistema de reservas, pedidos y acceso a información de un restaurante ficticio.

## Integrantes
- *Kiara Micaela Koo*
- *Santino Nicolas Andreatta*

## Cómo compilar y correr el proyecto
Se deben ejecutar los siguientes comandos en este orden:
```bash
npm install
npx prisma migrate dev --name init
npm run build
npm run start
``` 

## Cómo migrar la base de datos
```bash
npx prisma migrate dev --name init
```

## Cómo importar las requests para testear con postman
En el archivo **postman.json** se guarda la información de todos los requests. Desde la app de postman se puede importar este archivo y usarlo para testear la api.

## Usuario admin
Además, es importante utilizar el usuario con rol de administrador para poder testear todas las funcionalidades. Acá dejo los datos de la misma:
- nombre: "Nico"
- contraseña: "123"
