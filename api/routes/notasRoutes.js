import express from 'express';
import NotaController from '../controllers/notasController.js';
import HistorialController from '../controllers/historialController.js';
import {
  getLimiter,
  postLimiter,
  putLimiter,
  deleteLimiter,
} from '../infrastructure/middlewares/rateLimit.js';
import authenticateToken from '../infrastructure/middlewares/authMiddleware.js'

const router = express.Router();
const notaController = new NotaController();
const historialController = new HistorialController();


/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: API para la gestión de notas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Nota:
 *       type: object
 *       required:
 *         - titulo
 *         - contenido
 *       properties:
 *         _id:
 *           type: string
 *           example: "671acc1934a4276b56b01011"
 *         titulo:
 *           type: string
 *           example: "Mi primera nota"
 *         contenido:
 *           type: string
 *           example: "Este es el contenido de la nota."
 *         fecha_de_creacion:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T01:00:00Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Nota2:
 *       type: object
 *       required:
 *         - titulo
 *         - contenido
 *       properties:
 *         titulo:
 *           type: string
 *           example: "Mi primera nota"
 *         contenido:
 *           type: string
 *           example: "Este es el contenido de la nota."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Historial:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "671acc1934a4276b56b01011"
 *         nota_id:
 *           type: string
 *           example: "671acc1934a4276b56b01011"
 *         usuario_id:
 *           type: string
 *           example: "1234567890"
 *         accion:
 *           type: string
 *           example: "ELIMINACION || EDICION || CREACION"
 *         fecha:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T01:00:00Z"
 *         cambios:
 *           type: object
 *           properties:
 *            titulo:
 *             type: string
 *             example: "Titulo"
 *            contenido:
 *             type: string
 *             example: "Contenido"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Historial2:
 *       type: object
 *       required:
 *         - nota_id
 *         - usuario_id
 *         - accion
 *       properties:
 *         nota_id:
 *           type: string
 *           example: "671acc1934a4276b56b01011"
 *         usuario_id:
 *           type: string
 *           example: "1234567890"
 *         accion:
 *           type: string
 *           example: "CREACION"
 *         cambios:
 *           type: object
 *           properties:
 *            titulo:
 *             type: string
 *             example: "Titulo"
 *            contenido:
 *             type: string
 *             example: "Contenido"
 */

/**
 * @swagger
 * /notas/search:
 *   get:
 *     summary: Realiza una búsqueda de las notas
 *     tags: [Notas]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: La cadena de búsqueda para las notas
 *     responses:
 *       200:
 *         description: Nota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nota'
 *       400:
 *         description: Nota no encontrada
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al obtener la nota
 */
router.get("/search",authenticateToken, (req, res) =>
  notaController.searchNotas(req, res)
);

/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Obtiene una nota por ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la nota
 *     responses:
 *       200:
 *         description: Nota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nota'
 *       400:
 *         description: Nota no encontrada
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al obtener la nota
 */
router.get('/:id', authenticateToken, getLimiter, (req, res) =>
  notaController.getNota(req, res)
);

/**
 * @swagger
 * /notas/{id}/history:
 *   get:
 *     summary: Obtiene el historial de una nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la nota
 *     responses:
 *       200:
 *         description: Historial encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historial'
 *       400:
 *         description: Historial no encontrado
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al obtener el historial
 */
router.get('/:id/history', authenticateToken, getLimiter, (req, res) =>
  historialController.getHistorial(req, res)
);

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Obtiene todas las notas
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Notas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nota'
 *       400:
 *         description: No se encontró ninguna nota
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al obtener las notas
 */
router.get('/', authenticateToken, getLimiter, (req, res) =>
  notaController.getNotas(req, res)
);

/**
 * @swagger
 * /notas/{id}/history:
 *   post:
 *     summary: Crea un nuevo historial
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Historial2'
 *     responses:
 *       201:
 *         description: Historial creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historial'
 *       400:
 *         description: No se pudo crear el historial
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al crear el historial
 */
router.post('/:id/history', authenticateToken, getLimiter, (req, res) =>
  historialController.createHistorial(req, res)
);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Crea una nueva nota
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Nota2'
 *     responses:
 *       200:
 *         description: Nota creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nota'
 *       400:
 *         description: No se pudo crear la nota
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al crear la nota
 */
router.post('/', authenticateToken, postLimiter, (req, res) =>
  notaController.createNota(req, res)
);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Actualiza una nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Nota2'
 *     responses:
 *       200:
 *         description: Nota actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nota'
 *       400:
 *         description: Nota no encontrada
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al actualizar la nota
 */
router.put('/:id', authenticateToken, putLimiter, (req, res) =>
  notaController.updateNota(req, res)
);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Elimina una nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la nota
 *     responses:
 *       200:
 *         description: Nota eliminada correctamente
 *       400:
 *         description: Nota no encontrada
 *       401:
 *         description: Sesión no autorizada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error al eliminar la nota
 */
router.delete('/:id', authenticateToken,  deleteLimiter, (req, res) =>
  notaController.deleteNota(req, res)
);



export default router;
