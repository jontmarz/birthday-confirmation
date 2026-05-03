
import Link from 'next/link';
import { CheckCircle2, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateThankYouMessage } from '@/ai/flows/generate-thank-you-message';

interface ThanksPageProps {
  searchParams: Promise<{ name?: string }>;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const params = await searchParams;
  const guestName = params.name || 'Invitado';
  const { message } = await generateThankYouMessage({ guestName });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-card/40 backdrop-blur-xl border border-primary/30 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(179,31,31,0.2)] text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center flicker-neon border border-secondary/50">
            <CheckCircle2 className="w-12 h-12 text-secondary" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-headline text-4xl md:text-5xl text-primary tracking-tight glitch-text">
            ¡CONFIRMACIÓN RECIBIDA!
          </h1>
          <p className="text-xl font-medium text-foreground/90">
            Será un día de <span className="text-secondary font-bold">pura diversión</span>.
          </p>
          <p className="text-xl font-medium text-foreground/90">
            <b>¡RECUERDA!</b> Lleva capa impermeable y/o ropa de cambio.
          </p>
        </div>

        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <p className="text-lg text-muted-foreground italic leading-relaxed">
            "{message}"
          </p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="border-primary/40 hover:bg-primary/10">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              VOLVER AL INICIO
            </Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/80">
            <Link href="https://maps.google.com/?q=Salitre+Mágico" target="_blank" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              CÓMO LLEGAR
            </Link>
          </Button>
        </div>

        <div className="pt-6">
          <p className="text-lg text-muted-foreground italic leading-relaxed">
            ¡Te esperamos en la entrada principal, por la calle 63!
          </p>
          <p className="text-lg text-muted-foreground italic leading-relaxed">
            Llega puntual para disfrutar de las atracciones y no perderte de la diversión.
          </p>
        </div>

        <div className="pt-6">
          <div className="flex justify-center items-center gap-4 grayscale opacity-50">
            <div className="h-px w-12 bg-muted" />
            <span className="font-headline text-xs tracking-widest uppercase">Hawkins Division</span>
            <div className="h-px w-12 bg-muted" />
          </div>
        </div>
        
        <div className="pt-4 text-center text-muted-foreground text-xs sm:text-sm">
          <p>
            Diseñado y desarrollado por <a href="https://jontmarz.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Jon Marz</a>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
