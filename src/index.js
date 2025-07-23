import express from 'express';
import 'dotenv/config';
import whatsappRoutes from './routes/whatsapp.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/whatsapp', whatsappRoutes); // Nueva ruta para WhatsApp

app.listen(3000, () => {
  console.log('Server running on port 3000');
});