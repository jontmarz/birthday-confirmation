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

const InvitationMessageFlowOutputSchema = z.object({
  message: z.string().describe('The generated Stranger Things-themed invitation message.'),
});
export type GenerateInvitationMessageOutput = string;

const DEFAULT_INVITATION = "Algo se acerca. Algo sediento de diversión. Una sombra se cierne sobre la pared detrás de ti, envolviéndote de emoción. Acompáñanos en una aventura de cumpleaños al estilo «Stranger Things» en Salitre Mágico el 23 de mayo desde las 10:30 de la mañana. ¡Va a ser un día de pura diversión! Los amigos no mienten, así que no te lo pierdas.";

// Simple in-memory cache for development to avoid hitting rate limits
let cachedInvitation: string | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export async function generateInvitationMessage(input: GenerateInvitationMessageInput): Promise<GenerateInvitationMessageOutput> {
  // Return cached message in development if it's not expired
  if (process.env.NODE_ENV === 'development' && cachedInvitation && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    console.log('AI_FLOW_DEBUG: Returning cached invitation message.');
    return cachedInvitation;
  }

  // Defensive check for API key
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey || apiKey.includes('tu_') || apiKey.includes('your_') || apiKey === 'undefined') {
    console.error('AI_FLOW_DEBUG: GEMINI_API_KEY is not configured or is invalid. Returning default invitation message.');
    return DEFAULT_INVITATION;
  }

  const MAX_RETRIES = 3;
  let retries = 0;
  let delay = 1000; // 1 second initial delay

  while (retries < MAX_RETRIES) {
    try {
      const result = await generateInvitationMessageFlow(input);
      const message = result.message;
      console.log('AI_FLOW_DEBUG: Successfully generated AI invitation message.');

      // Cache the result in development
      if (process.env.NODE_ENV === 'development') {
        cachedInvitation = message;
        cacheTimestamp = Date.now();
      }
      return message;
    } catch (error: any) {
      console.error(`AI_FLOW_DEBUG: AI Invitation generation failed (attempt ${retries + 1}/${MAX_RETRIES}):`, error.message);
      // Check for transient or rate-limiting errors that are worth retrying
      const isRetryable =
        error.status === 'UNAVAILABLE' ||
        error.status === 503 ||
        error.message?.includes('503 Service Unavailable') ||
        error.status === 'RESOURCE_EXHAUSTED' || // From your error log
        error.message?.includes('429'); // From your error log

      if (isRetryable) {
        retries++;
        if (retries < MAX_RETRIES) {
          console.log(`AI_FLOW_DEBUG: Retrying in ${delay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      } else {
        // If it's not a transient error, log and return default
        console.error('AI_FLOW_DEBUG: Non-transient error encountered. Returning default invitation.');
        return DEFAULT_INVITATION;
      }
    }
  }
  // If all retries fail
  console.error('AI_FLOW_DEBUG: All AI Invitation generation retries failed. Returning default invitation.');
  return DEFAULT_INVITATION;
}

const invitationPrompt = ai.definePrompt({
  name: 'strangerThingsInvitationPrompt',
  input: {schema: GenerateInvitationMessageInputSchema},
  output: {schema: InvitationMessageFlowOutputSchema},
  prompt: `You are an expert copywriter specializing in creating fun and mysterious birthday party invitations.
Your task is to generate a compelling and engaging invitation message for a "Stranger Things"-themed birthday party.

The party details are as follows:
- Date: May 23
- Time: starting at 10:00 AM
- Location: Salitre Mágico, Parque de Diversiones
- Theme: Stranger Things
- Special Message: "¡RECUERDA! Lleva capa impermeable y/o ropa de cambio."

Craft a message that captures the eerie, retro-futuristic, and adventurous spirit of "Stranger Things." Encourage guests to join the celebration for a day of fun and excitement, referencing elements from the show without being too explicit or requiring prior knowledge to understand. The message should be friendly and inviting, suitable for a birthday party landing page.

Make sure the message clearly states the date, time, and location. Keep it to a concise paragraph or two and please write the message entirely in Spanish language.
`,
});

const generateInvitationMessageFlow = ai.defineFlow(
  {
    name: 'generateInvitationMessageFlow',
    inputSchema: GenerateInvitationMessageInputSchema,
    outputSchema: InvitationMessageFlowOutputSchema,
  },
  async input => {
    const {output} = await invitationPrompt(input);
    return output!;
  }
);
