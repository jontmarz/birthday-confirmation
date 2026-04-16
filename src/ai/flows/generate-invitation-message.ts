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

export async function generateInvitationMessage(input: GenerateInvitationMessageInput): Promise<GenerateInvitationMessageOutput> {
  try {
    return await generateInvitationMessageFlow(input);
  } catch (error) {
    console.error('AI Invitation generation failed:', error);
    return "Something is coming. Something hungry for blood. A shadow grows on the wall behind you, swallowing you in darkness. Join us for a 'Stranger Things' birthday adventure at Salitre Mágico on May 23rd at 10:00 AM. It's going to be a day of pura diversión! Friends don't lie, so don't miss out.";
  }
}

const prompt = ai.definePrompt({
  name: 'strangerThingsInvitationPrompt',
  input: {schema: GenerateInvitationMessageInputSchema},
  output: {schema: GenerateInvitationMessageOutputSchema},
  prompt: `You are an expert copywriter specializing in creating fun and mysterious birthday party invitations.
Your task is to generate a compelling and engaging invitation message for a "Stranger Things"-themed birthday party.

The party details are as follows:
- Date: May 23
- Time: 10:00 AM
- Location: Salite Mágico amusement park
- Theme: Stranger Things

Craft a message that captures the eerie, retro-futuristic, and adventurous spirit of "Stranger Things." Encourage guests to join the celebration for a day of fun and excitement, referencing elements from the show without being too explicit or requiring prior knowledge to understand. The message should be friendly and inviting, suitable for a birthday party landing page.

Make sure the message clearly states the date, time, and location. Keep it to a concise paragraph or two.
`,
});

const generateInvitationMessageFlow = ai.defineFlow(
  {
    name: 'generateInvitationMessageFlow',
    inputSchema: GenerateInvitationMessageInputSchema,
    outputSchema: GenerateInvitationMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
