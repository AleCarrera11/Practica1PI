// spaTools.js
import { DynamicStructuredTool } from 'langchain/tools';
import { z } from 'zod';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});


export const bookAppointmentTool = new DynamicStructuredTool({
  name: "book_appointment",
  description: "Reserva una cita en el spa. Requiere nombre, servicio, fecha y hora.",
  schema: z.object({
    nombre: z.string(),
    servicio: z.string(),
    fecha: z.string().describe("Formato YYYY-MM-DD"),
    hora: z.string().describe("Formato HH:MM")
  }),
  func: async ({ nombre, servicio, fecha, hora }) => {
    const { rows } = await pool.query(
      'INSERT INTO citas (nombre, servicio, fecha, hora) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, servicio, fecha, hora]
    );
    return `✅ Cita reservada para ${nombre}: ${servicio} el ${fecha} a las ${hora}`;
  }
});

export const listServicesTool = new DynamicStructuredTool({
  name: "list_services",
  description: "Lista los servicios disponibles en el spa.",
  schema: z.object({}),
  func: async () => {
    return "Servicios disponibles: Masaje relajante, Facial de limpieza, Depilación láser";
  }
});