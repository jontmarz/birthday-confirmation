import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('La configuración de Make Webhook no existe (MAKE_WEBHOOK_URL)');
      return NextResponse.json({ success: true, redirectUrl: `/thanks?name=${encodeURIComponent(name)}` });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      console.error('Error al enviar datos a Make:', response.statusText);
      return NextResponse.json({ error: 'No pudimos procesar tu registro. Por favor intenta de nuevo.' }, { status: 500 });
    }
    
    console.log(`Invitado guardado exitosamente: ${name}`);
    return NextResponse.json({ success: true, redirectUrl: `/thanks?name=${encodeURIComponent(name)}` });

  } catch (error: any) {
    console.error('RSVP submission failure:', error);
    return NextResponse.json({ error: error.message || 'Error de conexión con Hawkins' }, { status: 500 });
  }
}
