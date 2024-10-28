// Importaciones necesarias
import express from "express";
import http from "http";
import path from 'path';
import passport from "passport";
import ConnectToDatabase from "../database/mongodb.js";
import { jsonParseErrorHandler } from "../middlewares/errorHandling.js";
import sessionConfig from "../middlewares/server/sessionConfig.js";
import corsConfig from "../middlewares/server/corsConfig.js";
import { swaggerDocs, swaggerUi } from "../middlewares/server/swagger.js";


import usuariosRoutes from "../../routes/usuariosRoutes.js";
import notasRoutes from "../../routes/notasRoutes.js";

process.loadEnvFile();

// Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express();

  app.use(express.static(path.join(process.cwd(), 'public')));

  // Middlewares
  app.use(corsConfig); // Middleware para configurar CORS
  app.use(express.json());
  app.use(sessionConfig);
  app.use(jsonParseErrorHandler);
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.use("/usuarios", usuariosRoutes);
  app.use("/notas", notasRoutes);

  const server = http.createServer(app);

  return server;
};

// Función principal que inicia la aplicación
const startApp = async () => {
  const port = process.env.VITE_PORT_BACKEND;
  const host = process.env.VITE_HOST;
  let connectToDatabase = new ConnectToDatabase();
  await connectToDatabase.connectOpen();
  const server = createServer();

  server.listen(port, host, () => {
    console.log(`Server corriendo en http://${host}:${port}`);
    console.log(`Documentación Swagger en http://${host}:${port}/api`);
  });
};

// Llama a la función para iniciar la aplicación
startApp();
