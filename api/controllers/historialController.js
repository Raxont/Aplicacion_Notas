// Importa los módulos necesarios para la gestión de notas.
import { validationResult } from "express-validator";
import HistorialModel from "../models/historialModel.js";

/**
 * Clase HistorialController que gestiona las peticiones HTTP relacionadas con el historial de cambios de notas.
 */
class HistorialController {
  constructor() {
    this.historialModel = new HistorialModel(); // Inicializa el servicio de historial.
  }

  /**
   * Obtiene el historial de cambios de una nota específica
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getHistorial(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validación de la solicitud",
        });
      }
      
      const historial = await this.historialModel.getHistorialByNotaId(req.params.id);
      if (!historial || historial.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No se encontraron cambios para la nota especificada",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Historial de cambios obtenido correctamente",
        data: historial,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al obtener el historial de cambios",
      });
    }
  }

  /**
   * Guarda una nueva versión de una nota.
   * @param {Object} req - La solicitud HTTP, contiene los datos de la nueva versión de la nota en el body.
   * @param {Object} res - La respuesta HTTP para enviar el resultado de la operación.
   * @returns {Promise<void>}
   */
  async createHistorial(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validación de la creación del historial",
        });
      }

      const { titulo, contenido, accion, usuario_id } = req.body;

      if (!titulo || !contenido || !accion || !usuario_id) {
        return res.status(400).json({
          status: 400,
          message: "Debe ingresar el título, contenido, acción y usuario_id",
        });
      }

      const nuevaVersion = {
        nota_id: req.params.id,
        usuario_id: usuario_id,
        accion: accion,
        fecha: new Date(),
        cambios: accion === "EDICION" ? {
          titulo: req.body.cambios?.titulo,
          contenido: req.body.cambios?.contenido
        } : null,
      };

      await this.historialModel.insert(nuevaVersion);

      res.status(201).json({
        status: 201,
        message: "Historial creado correctamente",
        data: nuevaVersion,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al crear el historial de cambios",
      });
    }
  }
}

// Exporta la clase HistorialController para su uso en otras partes de la aplicación.
export default HistorialController;
