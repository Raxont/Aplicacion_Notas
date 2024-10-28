import { ObjectId } from "mongodb";
import ConnectToDatabase from "../infrastructure/database/mongodb.js";

class Notas {
  /**
   * Obtiene todas las notas.
   * @returns {Promise<Array>} - Lista de todas las notas.
   */
  async getAllNotas() {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("notas"); // Acceder a la colección 'notas'
    const res = await collection.find().toArray(); // Obtener todas las notas
    return res;
  }

  /**
   * Encuentra una nota por su título.
   * @param {string} titulo - Título de la nota a buscar.
   * @returns {Promise<Object>} - La nota encontrada.
   */
  async findByTitulo(titulo) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("notas"); // Acceder a la colección 'notas'
    const [res] = await collection.find({ titulo }).toArray(); // Buscar la nota por título
    return res;
  }

  /**
   * Obtiene una nota específica por su ID.
   * @param {string} id - ID de la nota a buscar.
   * @returns {Promise<Object>} - La nota encontrada.
   */
  async getNotaById(id) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("notas"); // Acceder a la colección 'notas'
    const [res] = await collection.find({ _id: new ObjectId(id) }).toArray(); // Buscar la nota por ID
    return res;
  }

  /**
   * Inserta una nueva nota en la colección.
   * @param {Object} notaData - Datos de la nota a insertar.
   * @returns {Promise<Object>} - Resultado de la operación de inserción.
   */
  async insert(notaData) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("notas"); // Acceder a la colección 'notas'
    const res = await collection.insertOne(notaData); // Insertar la nueva nota
    return res;
  }

  /**
   * Actualiza una nota por su ID.
   * @param {string} id - ID de la nota a actualizar.
   * @param {Object} updateData - Datos a actualizar.
   * @returns {Promise<Object>} - La nota actualizada.
   */
  async findByIdAndUpdate(id, updateData) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("notas"); // Acceder a la colección 'notas'
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { upsert: false }
    );
    return updateData;
  }

  /**
   * Elimina una nota por su ID.
   * @param {string} id - ID de la nota a eliminar.
   * @returns {Promise<string>} - El ID de la nota eliminada.
   */
  async deleteNota(id) {
    let obj = ConnectToDatabase.instanceConnect; // Obtener la instancia de conexión a la base de datos
    const collection = obj.db.collection("notas"); // Acceder a la colección 'notas'
    await collection.deleteOne({ _id: new ObjectId(id) }); // Eliminar la nota
    return id;
  }
}

export default Notas;
