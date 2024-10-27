import cors from 'cors'// Importa el middleware CORS para gestionar las solicitudes de origen cruzado
process.loadEnvFile();

//* Configuración de CORS (Cross-Origin Resource Sharing)
/**
 * Configuración del middleware CORS para permitir solicitudes desde un origen específico.
 * La URL de origen se construye en base a la variable de entorno VITE_USE_TUNNEL.
 * Si está en true, se usa VITE_TUNNEL_URL_FRONTEND, de lo contrario, VITE_HTTP_FRONTEND.
 */
const corsConfig = cors({
origin: process.env.VITE_HTTP_FRONTEND, // Permitir solicitudes solo desde este origen específico
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos para las solicitudes
  allowedHeaders: ["Content-Type", "Authorization", "x-version"], // Cabeceras permitidas en las solicitudes
  credentials: true, // Permitir el envío de cookies y credenciales con solicitudes CORS
});

export default corsConfig; // Exporta la configuración de CORS para su uso en otros módulos