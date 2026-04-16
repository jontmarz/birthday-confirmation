'use server';

import { redirect } from 'next/navigation';

export async function submitRSVP(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!name || !email || !phone) {
    throw new Error('Todos los campos son obligatorios');
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  // Si no hay configuración, registramos el error pero permitimos avanzar en desarrollo
  // En producción deberías asegurar que estas variables existan.
  if (!apiKey || !groupId) {
    console.error('MailerLite configuration is missing (API Key or Group ID)');
    // Redirección de respaldo para no bloquear al usuario si la API no está lista
    redirect(`/thanks?name=${encodeURIComponent(name)}`);
  }

  try {
    const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        fields: {
          phone: phone,
        },
        resubscribe: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MailerLite API error details:', errorData);
      throw new Error('No pudimos procesar tu registro. Por favor intenta de nuevo.');
    }
    
    console.log(`Guest successfully added to MailerLite: ${name}`);
  } catch (error: any) {
    // Si es un error de redirección de Next.js, debemos dejar que pase
    if (error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('RSVP submission failure:', error);
    throw new Error(error.message || 'Error de conexión con Hawkins');
  }

  // Éxito: redirección a la página de agradecimiento
  redirect(`/thanks?name=${encodeURIComponent(name)}`);
}
