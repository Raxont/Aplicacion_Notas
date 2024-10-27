# Aplicacion de notas

Este proyecto es una plataforma diseñada para facilitar la gestión de notas personales de los usuarios. Su principal objetivo es proporcionar un entorno sencillo y accesible donde los usuarios puedan crear, editar, visualizar y eliminar sus notas de manera eficiente. La aplicación cuenta con funcionalidades como la búsqueda de notas, autenticación de usuario y un historial de cambios, lo que permite a los usuarios organizar sus pensamientos y mantener un registro de sus ideas de forma segura y privada.

La aplicación está desarrollada con una arquitectura que incluye tanto un frontend intuitivo como un backend sencillo, asegurando una experiencia de usuario fluida. Además, el uso de un token JWT para la autenticación garantiza que solo los usuarios autorizados puedan acceder a sus notas, protegiendo así la privacidad y seguridad de la información.
Es necesario tener instalado mongoDB, mongo shell, las herramientas de mongoDB y usar Node,js con la version '23.0.0:

MongoDB:

```http
https://www.mongodb.com/try/download/community
```

Mongo Shell:

```http
https://www.mongodb.com/try/download/shell
```

Herramientas de mongoDB:

```http
https://www.mongodb.com/try/download/database-tools
```

Usar la version **23.0.0** de Node.js:

```bash
nvm install 23.0.0
nvm use 23.0.0
```

## Tecnologías usadas

**Server:** Node.js, Express.js, MongoDB, Passportjs, Swagger, Bcryptjs, Jsonwebtoken,

## Instalación

Clona mi repositorio, instala mi proyecto con npm

```bash
git clone https://github.com/Raxont/Pushup_Backend.git
npm i
```

Importar la base de datos del backup:

```bash
node --run import
```

## Ejecución

Para ejecutar el codigo usa el siguiente comando:

```bash
node --run dev
```

## Variables de entorno

Crea un archivo .env en el archivo principal del proyecto y usa estas variables de entorno

```javascript
SECRET_JWT_KEY = "Everything you want to put here";
NODE_ENV = "false";

VITE_HTTP_BACKEND;
VITE_HTTP_FRONTEND;

VITE_HOST;
VITE_PORT_BACKEND;
VITE_PORT_FRONTEND;

VITE_MONGO_ACCESS;
VITE_MONGO_USER;
VITE_MONGO_PWD;
VITE_MONGO_HOST;
VITE_MONGO_PORT;
VITE_MONGO_DB_NAME;

GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET;
```

## Estructura de carpetas

```bash
│   .env
│   .gitignore
│   app.js
│   package.json
│   README.md
│
├───api
│   │   server.js
│   │
│   ├───controllers
│   │       usuariosController.js
│   │
│   ├───helpers
│   │   └───backup
│   │           activdades.json
│   │           categorias.json
│   │           colaboraciones.json
│   │           estadisticas.json
│   │           etiquetas.json
│   │           hitos.json
│   │           import.js
│   │           objetivos.json
│   │           recordatorios.json
│   │           reportes.json
│   │           usuarios.json
│   │
│   ├───infrastructure
│   │   ├───database
│   │   │       mongodb.js
│   │   │
│   │   └───middlewares
│   │       │   authMiddleware.js
│   │       │   errorHandling.js
│   │       │   googleAuth.js
│   │       │   rateLimit.js
│   │       │
│   │       └───server
│   │               sessionConfig.js
│   │               swagger.js
│   │
│   ├───models
│   │       usuariosModel.js
│   │
│   ├───routes
│   │       usuariosRoutes.js
│   │
│   └───utils
│           jwtUtils.js
```

## Endpoints

Si desea probar los endpoints con swagger usar la URL que se muestra al iniciar mi proyecto y tiene como nombre Documentación Swagger, ejemplo:

```web-idl
http://localhost:3001/api
```

O puede usarlo con otra api rest client de su preferencia con la URL que tiene como nombre Server corriendo, ejemplo:

```web-idl
http://localhost:3001
```

## Usado por:

Este proyecto puede ser usado por:

- Campuslands
