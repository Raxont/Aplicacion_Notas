import createServer from "./infrastructure/server/app.js";
import ConnectToDatabase from "./infrastructure/database/mongodb.js";

process.loadEnvFile();

// Función principal que inicia la aplicación
const startApp = async () => {
  const port = process.env.VITE_PORT_BACKEND;
  const host = process.env.VITE_HOST;

  // Conectar a la base de datos
  const connectToDatabase = new ConnectToDatabase();
  await connectToDatabase.connectOpen();

  // Crear y escuchar el servidor
  const server = createServer();
  server.listen(port, host, () => {
    console.log(`Server corriendo en http://${host}:${port}`);
    console.log(`Documentación Swagger en http://${host}:${port}/api`);
  });
};

// Inicia la aplicación
startApp();
