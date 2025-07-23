
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from "@langchain/openai";
import { bookAppointmentTool, listServicesTool } from './tools.js';

export async function createSpaAgent() {
  const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo"
  });

  const tools = [bookAppointmentTool, listServicesTool];

  return await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "openai-functions",
    verbose: true,
    agentArgs: {
      prefix: "Eres 'Luna', asistente virtual de Spa Harmony. Sé amable y profesional. Responde en español."
    }
  });
}