'use server';

import { redirect } from 'next/navigation';

export async function submitRSVP(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;

  if (!name || !phone) {
    throw new Error('Todos los campos son obligatorios');
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('La configuración de Make Webhook no existe (MAKE_WEBHOOK_URL)');
    redirect(`/thanks?name=${encodeURIComponent(name)}`);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      console.error('Error al enviar datos a Make:', response.statusText);
      throw new Error('No pudimos procesar tu registro. Por favor intenta de nuevo.');
    }
    
    console.log(`Invitado guardado exitosamente: ${name}`);
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('RSVP submission failure:', error);
    throw new Error(error.message || 'Error de conexión con Hawkins');
  }

  redirect(`/thanks?name=${encodeURIComponent(name)}`);
}
