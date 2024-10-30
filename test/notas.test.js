// notas.test.js
import request from 'supertest';
import createServer from '../api/infrastructure/server/app.js';
process.loadEnvFile();

const app = createServer();

// Genera un token de autenticación de prueba
const authToken = 'your_test_token'; 

describe('Notas Routes', () => {
  
  // Prueba para el endpoint GET /notas
  describe('GET /notas/', () => {
    test('Should respond with a 200 status code and return all notas', async () => {
      const response = await request(app)
        .get('/notas/')
        .set('Authorization', `${authToken}`); // Autenticación
      console.log("🚀 ~ test ~ response:", response.statusCode)

      expect(response.statusCode).toBe(200);
      // expect(response.body).toBeInstanceOf(Array);
    });
  });

//   // Prueba para el endpoint GET /notas/:id
//   describe('GET /notas/:id', () => {
//     test('Should respond with a 200 status code and return the requested nota', async () => {
//       const response = await request(app)
//         .get('/notas/6720ceb175d4c951aa7d5405')
//         .set('Authorization', `Bearer ${authToken}`);
//       expect(response.statusCode).toBe(200);
//       expect(response.body).toHaveProperty('id', 6720ceb175d4c951aa7d5405);
//     });

//     test('Should respond with a 404 if nota is not found', async () => {
//       const response = await request(app)
//         .get('/notas/nonexistent_id')
//         .set('Authorization', `Bearer ${authToken}`);
//       expect(response.statusCode).toBe(404);
//     });
//   });

//   // Prueba para el endpoint POST /notas
//   describe('POST /notas', () => {
//     test('Should create a new nota and respond with a 201 status code', async () => {
//       const newNota = { title: 'New Note', content: 'This is a new note' };
//       const response = await request(app)
//         .post('/notas')
//         .set('Authorization', `Bearer ${authToken}`)
//         .send(newNota);
//       expect(response.statusCode).toBe(201);
//       expect(response.body).toHaveProperty('_id');
//     });

//     test('Should respond with a 400 status code if data is invalid', async () => {
//       const invalidNota = { title: '' }; // Datos incompletos o inválidos
//       const response = await request(app)
//         .post('/notas')
//         .set('Authorization', `Bearer ${authToken}`)
//         .send(invalidNota);
//       expect(response.statusCode).toBe(400);
//     });
//   });

//   // Prueba para el endpoint PUT /notas/:id
//   describe('PUT /notas/:id', () => {
//     test('Should update a nota and respond with a 200 status code', async () => {
//       const updatedNota = { title: 'Updated Note', content: 'Updated content' };
//       const response = await request(app)
//         .put('/notas/6720ceb175d4c951aa7d5405') 
//         .set('Authorization', `Bearer ${authToken}`)
//         .send(updatedNota);
//       expect(response.statusCode).toBe(200);
//     });

//     test('Should respond with a 404 if nota is not found', async () => {
//       const response = await request(app)
//         .put('/notas/nonexistent_id')
//         .set('Authorization', `Bearer ${authToken}`)
//         .send({ title: 'Updated Note' });
//       expect(response.statusCode).toBe(404);
//     });
//   });

//   // Prueba para el endpoint DELETE /notas/:id
//   describe('DELETE /notas/:id', () => {
//     test('Should delete a nota and respond with a 200 status code', async () => {
//       const response = await request(app)
//         .delete('/notas/6720ceb175d4c951aa7d5405') 
//         .set('Authorization', `Bearer ${authToken}`);
//       expect(response.statusCode).toBe(200);
//     });

//     test('Should respond with a 404 if nota is not found', async () => {
//       const response = await request(app)
//         .delete('/notas/nonexistent_id')
//         .set('Authorization', `Bearer ${authToken}`);
//       expect(response.statusCode).toBe(404);
//     });
//   });

//   // Prueba para el endpoint GET /notas/:id/history
//   describe('GET /notas/:id/history', () => {
//     test('Should return the history of a nota and respond with a 200 status code', async () => {
//       const response = await request(app)
//         .get('/notas/6720ceb175d4c951aa7d5405/history') 
//         .set('Authorization', `Bearer ${authToken}`);
//       expect(response.statusCode).toBe(200);
//     });

//     test('Should respond with a 404 if nota is not found', async () => {
//       const response = await request(app)
//         .get('/notas/nonexistent_id/history')
//         .set('Authorization', `Bearer ${authToken}`);
//       expect(response.statusCode).toBe(404);
//     });
//   });
});
