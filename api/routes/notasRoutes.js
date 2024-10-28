import express from 'express';
import NotaController from '../controllers/notasController.js';
import {
  getLimiter,
  postLimiter,
  putLimiter,
  deleteLimiter,
} from '../infrastructure/middlewares/rateLimit.js';
import authenticateToken from '../infrastructure/middlewares/authMiddleware.js'

const router = express.Router();
const notaController = new NotaController();

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
router.get("/search", (req, res) =>
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
router.post('/', postLimiter, (req, res) =>
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
router.put('/:id', putLimiter, (req, res) =>
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
router.delete('/:id', deleteLimiter, (req, res) =>
  notaController.deleteNota(req, res)
);



export default router;
