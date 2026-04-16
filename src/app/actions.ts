
'use server';

import { redirect } from 'next/navigation';

export async function submitRSVP(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;

  if (!name || !phone) {
    throw new Error('Name and Phone are required');
  }

  // Simulation of MailerLite integration
  // In a real scenario, you would use their SDK or API endpoint here:
  // await fetch('https://api.mailerlite.com/api/v2/subscribers', { ... })
  console.log(`Submitting guest to MailerLite: ${name} (${phone})`);

  // Artificial delay to feel real
  await new Promise(resolve => setTimeout(resolve, 800));

  // Successful submission, redirect to themed thank you page with the guest name as a query param
  redirect(`/thanks?name=${encodeURIComponent(name)}`);
}
