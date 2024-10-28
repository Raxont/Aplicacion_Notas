// Importa los módulos necesarios para la gestión de notas.
import { validationResult } from "express-validator";
import NotaModel from "../models/notasModel.js";

/**
 * Clase NotasController que gestiona las peticiones HTTP relacionadas con notas.
 */
class NotasController {
  constructor() {
    this.notaModel = new NotaModel(); // Inicializa el servicio de notas.
  }

  /**
   * Obtiene todas las notas.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getNotas(req, res) {
    try {
      const notas = await this.notaModel.getAllNotas();
      if (!notas) {
        return res.status(404).json({
          status: 404,
          message: "No se encontró ninguna nota",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Notas obtenidas correctamente",
        data: notas,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en la obtención de notas",
      });
    }
  }

  /**
   * Obtiene una nota específica por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getNota(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validación de la solicitud",
        });
      }
      const nota = await this.notaModel.getNotaById(req.params.id);
      if (!nota) {
        return res.status(404).json({
          status: 404,
          message: "Nota no encontrada",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Nota encontrada",
        data: nota,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al obtener la nota",
      });
    }
      
  }

  /**
   * Crea una nueva nota en la base de datos.
   * @param {Object} req - La solicitud HTTP, contiene los datos de la nueva nota en el body.
   * @param {Object} res - La respuesta HTTP para enviar el resultado de la operación.
   * @returns {Promise<void>}
   */
  async createNota(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validación de la creación de la nota",
        });
      }

      const { titulo, contenido } = req.body;
      if (!titulo || !contenido) {
        return res.status(400).json({
          status: 400,
          message: "Debe ingresar el título y el contenido de la nota",
        });
      }

      const nuevaNota = {
        titulo,
        contenido,
        fecha_de_creacion: new Date(),
      };

      await this.notaModel.insert(nuevaNota);

      res.status(201).json({
        status: 201,
        message: "Nota creada correctamente",
        data: nuevaNota,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al crear la nota",
      });
    }
  }

  /**
   * Actualiza una nota específica por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async updateNota(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validación de la actualización de la nota",
        });
      }

      const notaActualizada = await this.notaModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!notaActualizada) {
        return res.status(404).json({
          status: 404,
          message: "Nota no encontrada",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Nota actualizada correctamente",
        data: notaActualizada,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al actualizar la nota",
      });
    }
  }

  /**
   * Elimina una nota específica por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async deleteNota(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validación de la eliminación de la nota",
        });
      }

      const notaEliminada = await this.notaModel.deleteNota(req.params.id);
      if (!notaEliminada) {
        return res.status(404).json({
          status: 404,
          message: "Nota no encontrada",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Nota eliminada correctamente",
        data: notaEliminada,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al eliminar la nota",
      });
    }
  }
}

// Exporta la clase NotasController para su uso en otras partes de la aplicación.
export default NotasController;
