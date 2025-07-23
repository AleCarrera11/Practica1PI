// whatsapp.routes.js
import { Router } from 'express';
import { sendWhatsAppMessage } from '../twilio.js';
import { createSpaAgent } from '../agent/agent.js';

const router = Router();

router.post('/webhook', async (req, res) => {
  try {
    const incomingMsg = req.body.Body;
    const sender = req.body.From.replace('whatsapp:+', '');

    // Procesar con LangChain
    const agent = await createSpaAgent();
    const response = await agent.call({ input: incomingMsg });

    // Enviar respuesta a WhatsApp
    await sendWhatsAppMessage(sender, response.output);

    res.status(200).end();
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).send('Error interno');
  }
});

export default router;