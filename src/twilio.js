import twilio from 'twilio';
import 'dotenv/config';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendWhatsAppMessage(sender, message) {
  try {
    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message,
      to: `whatsapp:+${sender}`
    });
    console.log('Mensaje enviado a:', sender);
  } catch (error) {
    console.error('Error enviando mensaje:', error);
    throw error;
  }
}