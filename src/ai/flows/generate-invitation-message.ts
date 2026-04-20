'use server';
/**
 * @fileOverview A Genkit flow to generate a Stranger Things-themed birthday party invitation message.
 *
 * - generateInvitationMessage - A function that generates the invitation message.
 * - GenerateInvitationMessageInput - The input type for the generateInvitationMessage function.
 * - GenerateInvitationMessageOutput - The return type for the generateInvitationMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInvitationMessageInputSchema = z.object({}).describe('Input for generating a Stranger Things-themed invitation message. No specific parameters are needed as event details are fixed.');
export type GenerateInvitationMessageInput = z.infer<typeof GenerateInvitationMessageInputSchema>;

const GenerateInvitationMessageOutputSchema = z.string().describe('The generated Stranger Things-themed invitation message.');
export type GenerateInvitationMessageOutput = z.infer<typeof GenerateInvitationMessageOutputSchema>;

const DEFAULT_INVITATION = "Algo se acerca. Algo sediento de diversión. Una sombra se cierne sobre la pared detrás de ti, envolviéndote de emoción. Acompáñanos en una aventura de cumpleaños al estilo «Stranger Things» en Salitre Mágico el 23 de mayo desde las 10:30 de la mañana. ¡Va a ser un día de pura diversión! Los amigos no mienten, así que no te lo pierdas.";

export async function generateInvitationMessage(input: GenerateInvitationMessageInput): Promise<GenerateInvitationMessageOutput> {
  // Defensive check for API key
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey || apiKey.includes('tu_') || apiKey.includes('your_') || apiKey === 'undefined') {
    return DEFAULT_INVITATION;
  }

  const MAX_RETRIES = 3;
  let retries = 0;
  let delay = 1000; // 1 second initial delay

  while (retries < MAX_RETRIES) {
    try {
      return await generateInvitationMessageFlow(input);
    } catch (error: any) {
      console.error(`AI Invitation generation failed (attempt ${retries + 1}/${MAX_RETRIES}):`, error);
      // Check if it's a 503 or similar transient error
      if (error.status === 'UNAVAILABLE' || error.status === 503 || error.message?.includes('503 Service Unavailable')) {
        retries++;
        if (retries < MAX_RETRIES) {
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      } else {
        // If it's not a transient error, re-throw or return default immediately
        return DEFAULT_INVITATION;
      }
    }
  }
  // If all retries fail
  console.error('All AI Invitation generation retries failed.');
  return DEFAULT_INVITATION;
}

const prompt = ai.definePrompt({
  name: 'strangerThingsInvitationPrompt',
  input: {schema: GenerateInvitationMessageInputSchema},
  prompt: `You are an expert copywriter specializing in creating fun and mysterious birthday party invitations.
Your task is to generate a compelling and engaging invitation message for a "Stranger Things"-themed birthday party.

The party details are as follows:
- Date: May 23
- Time: starting at 10:30 AM
- Location: Salitre Mágico, Parque de Diversiones
- Theme: Stranger Things

Craft a message that captures the eerie, retro-futuristic, and adventurous spirit of "Stranger Things." Encourage guests to join the celebration for a day of fun and excitement, referencing elements from the show without being too explicit or requiring prior knowledge to understand. The message should be friendly and inviting, suitable for a birthday party landing page.

Make sure the message clearly states the date, time, and location. Keep it to a concise paragraph or two and please write the message entirely in Spanish language.
`,
});

const generateInvitationMessageFlow = ai.defineFlow(
  {
    name: 'generateInvitationMessageFlow',
    inputSchema: GenerateInvitationMessageInputSchema,
    outputSchema: GenerateInvitationMessageOutputSchema,
  },
  async input => {
    const {text} = await prompt(input);
    return text;
  }
);
