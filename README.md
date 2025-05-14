# TP-2-Desarrollo-de-sistemas
Repositorio de la api web backend para la materia desarrollo de sistemas.

## Integrantes
- *Kiara Micaela Koo*
- *Santino Nicolas Andreatta*

## Cómo compilar y correr el proyecto
Se deben ejecutar los siguientes comandos en este orden:
- **npm install** (para las dependencias)
- **npm run build** (para traspilar el código a js)
- **npm run start** (para levantar la api) 

## Cómo migrar la base de datos
- **npx prisma migrate dev --name init**

## Cómo importar las requests para testear con postman
En el archivo **postman.json** se guarda la información de todos los requests. Desde la app de postman se puede importar este archivo y usarlo para testear la api.