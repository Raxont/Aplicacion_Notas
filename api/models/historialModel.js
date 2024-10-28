import { ObjectId } from "mongodb";
import ConnectToDatabase from "../infrastructure/database/mongodb.js";

class Historial {
  /**
   * Obtiene el historial de cambios de una nota específica por su ID.
   * @param {string} notaId - ID de la nota para la cual se desea obtener el historial.
   * @returns {Promise<Array>} - Lista de todos los cambios registrados para la nota.
   */
  async getHistorialByNotaId(notaId) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("historial"); // Acceder a la colección 'historial'
    const historial = await collection.find({ nota_id: new ObjectId(notaId) }).toArray(); // Buscar el historial por nota_id
    return historial;
  }

  /**
   * Inserta una nueva entrada en el historial de cambios de una nota.
   * @param {Object} historialData - Datos del cambio a registrar en el historial.
   * @returns {Promise<Object>} - Resultado de la operación de inserción.
   */
  async insert(historialData) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("historial"); // Acceder a la colección 'historial'
    const res = await collection.insertOne(historialData); // Insertar la nueva entrada en el historial
    return res;
  }
}

export default Historial;
