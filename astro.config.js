import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import fs from "fs";

process.loadEnvFile();

// Leer variables de entorno de process.env
const port = Number(import.meta.env.VITE_PORT_FRONTEND) || 1234;

// https://astro.build/config
export default defineConfig({
  
  integrations: [react(), tailwind()],
  server: {
    host: 'localhost',
    port: port
  }
});