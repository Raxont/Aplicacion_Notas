// app.js
import express from "express";
import http from "http";
import path from "path";
import passport from "passport";
import { jsonParseErrorHandler } from "../middlewares/errorHandling.js";
import sessionConfig from "../middlewares/server/sessionConfig.js";
import corsConfig from "../middlewares/server/corsConfig.js";
import { swaggerDocs, swaggerUi } from "../middlewares/server/swagger.js";

import usuariosRoutes from "../../routes/usuariosRoutes.js";
import notasRoutes from "../../routes/notasRoutes.js";

// Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express();

  // Configuración del servidor
  app.use(express.static(path.join(process.cwd(), "public")));

  // Middlewares
  app.use(corsConfig);
  app.use(express.json());
  app.use(sessionConfig);
  app.use(jsonParseErrorHandler);
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Rutas
  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/usuarios", usuariosRoutes);
  app.use("/notas", notasRoutes);

  return http.createServer(app);
};

export default createServer;
