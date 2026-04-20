'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Phone, Send } from 'lucide-react';
import { submitRSVP } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full bg-secondary hover:bg-secondary/80 text-white font-headline text-lg flicker-neon transition-all"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
          ENVIANDO...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          CONFIRMAR ASISTENCIA
          <Send className="w-5 h-5" />
        </span>
      )}
    </Button>
  );
}

export function RSVPForm() {
  const [error, setError] = useState<string | null>(null);

  async function clientAction(formData: FormData) {
    try {
      setError(null);
      await submitRSVP(formData);
    } catch (e: any) {
      setError(e.message || 'Error al enviar el formulario');
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-primary bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
      <CardHeader className="text-center bg-primary/10 border-b border-primary/20">
        <CardTitle className="font-headline text-2xl tracking-wider text-primary glitch-text">
          REGISTRO DE INVITADOS
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Ingresa tus datos para confirmar tu lugar en Hawkins.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form action={clientAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground/80 font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Nombre Invitado
            </Label>
            <Input 
              id="name"
              name="name"
              placeholder="Ej. Eleven"
              required
              className="bg-background/50 border-border focus:border-primary focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground/80 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Teléfono / WhatsApp
            </Label>
            <Input 
              id="phone"
              name="phone"
              type="tel"
              placeholder="+57 300 000 0000"
              required
              className="bg-background/50 border-border focus:border-primary focus:ring-primary transition-all"
            />
          </div>
          
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive rounded-md text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
