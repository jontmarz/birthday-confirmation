'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a 'Stranger Things'-themed thank you message.
 *
 * - generateThankYouMessage - A function that generates a themed thank you message for a guest.
 * - GenerateThankYouMessageInput - The input type for the generateThankYouMessage function.
 * - GenerateThankYouMessageOutput - The return type for the generateThankYouMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThankYouMessageInputSchema = z.object({
  guestName: z.string().optional().describe('The name of the guest to personalize the message.'),
});
export type GenerateThankYouMessageInput = z.infer<typeof GenerateThankYouMessageInputSchema>;

const GenerateThankYouMessageOutputSchema = z.object({
  message: z.string().describe('The Stranger Things-themed thank you message.'),
});
export type GenerateThankYouMessageOutput = z.infer<typeof GenerateThankYouMessageOutputSchema>;

export async function generateThankYouMessage(
  input: GenerateThankYouMessageInput
): Promise<GenerateThankYouMessageOutput> {
  const guestName = input.guestName || 'Friend';
  const fallbackMessage = {
    message: `Welcome to the crew, ${guestName}! You've just stepped into the Upside Down. We're so glad you're joining us for this adventure at Salitre Mágico. Remember: friends don't lie, and this is going to be a day of pura diversión! Stay safe in Hawkins.`
  };

  // Defensive check for API key
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey || apiKey.includes('tu_') || apiKey === 'undefined') {
    return fallbackMessage;
  }

  try {
    return await generateThankYouMessageFlow(input);
  } catch (error) {
    console.error('AI Thank You message generation failed:', error);
    return fallbackMessage;
  }
}

const generateThankYouMessagePrompt = ai.definePrompt({
  name: 'generateThankYouMessagePrompt',
  input: {schema: GenerateThankYouMessageInputSchema},
  output: {schema: GenerateThankYouMessageOutputSchema},
  prompt: `You are a welcoming host for a "Stranger Things" themed birthday party.
  
  Generate a short, enthusiastic thank you message for a guest who has confirmed their attendance.
  
  Make sure to incorporate elements and phrases reminiscent of "Stranger Things" (e.g., Upside Down, Hawkins, Demogorgon, Friends Don't Lie, Eleven, Code Red, etc.) and express excitement for a day of "pura diversión".
  
  If a guest name is provided, personalize the message.
  
  Guest Name: {{{guestName}}}`,
});

const generateThankYouMessageFlow = ai.defineFlow(
  {
    name: 'generateThankYouMessageFlow',
    inputSchema: GenerateThankYouMessageInputSchema,
    outputSchema: GenerateThankYouMessageOutputSchema,
  },
  async input => {
    const {output} = await generateThankYouMessagePrompt(input);
    return output!;
  }
);
