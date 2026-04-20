
import Image from 'next/image';
import { Calendar, Clock, MapPin, Ghost, ChevronDown } from 'lucide-react';
import { RSVPForm } from '@/components/rsvp-form';
import { generateInvitationMessage } from '@/ai/flows/generate-invitation-message';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HeroVideo } from '@/components/hero-video';

export default async function LandingPage() {
  const invitationMessage = await generateInvitationMessage({});
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const parkImage = PlaceHolderImages.find(img => img.id === 'amusement-park');

  return (
    <div className="min-h-screen relative flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b-2 border-primary/30">
        <HeroVideo src={heroImage?.imageUrl || "https://picsum.photos/seed/st1/1200/800"} />
        
        <div className="relative z-10 max-w-4xl space-y-6 mb-10">
          <div className="inline-block px-4 py-1 border border-primary text-white font-headline tracking-[0.3em] text-sm animate-pulse rounded">
            CODE RED: BIRTHDAY ALERT
          </div>
          <h1 className="text-6xl md:text-8xl font-headline tracking-tighter text-gradient-st drop-shadow-[0_5px_15px_rgba(179,31,31,0.5)] [text-shadow:0_0_20px_rgba(255,255,255,0.2)]">
            VALENTINA <br/> CUMPLE 9
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "{invitationMessage.split('.')[0]}."
          </p>
        </div>

        {/* Scroll Indicator */}
        <a href="#details" target="_self" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/80 hover:text-white transition-colors cursor-pointer">
          <ChevronDown className="w-12 h-12" />
        </a>
      </section>

      {/* Details Grid */}
      <section id="details" className="w-full max-w-6xl px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center space-y-4 p-8 bg-card/30 rounded-2xl border border-primary/10 backdrop-blur-sm group hover:border-primary/40 transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-all">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-headline text-xl text-primary">FECHA</h3>
          <p className="text-2xl font-bold">23 de Mayo</p>
          <p className="text-muted-foreground">Hawkins Time</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 p-8 bg-card/30 rounded-2xl border border-primary/10 backdrop-blur-sm group hover:border-primary/40 transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-all">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-headline text-xl text-primary">HORA</h3>
          <p className="text-2xl font-bold">10:30 AM</p>
          <p className="text-muted-foreground">Antes del atardecer</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 p-8 bg-card/30 rounded-2xl border border-primary/10 backdrop-blur-sm group hover:border-primary/40 transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-all">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-headline text-xl text-primary">LUGAR</h3>
          <p className="text-2xl font-bold">Salitre Mágico</p>
          <p className="text-muted-foreground">Parque de Diversiones</p>
        </div>
      </section>

      {/* Main Content / Form Section */}
      <section className="w-full max-w-6xl px-4 py-20 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 aspect-video shadow-2xl">
            <Image 
              src={parkImage?.imageUrl || "https://picsum.photos/seed/park1/800/600"} 
              alt="Salite Mágico Theme" 
              fill 
              className="object-cover"
              data-ai-hint="amusement park neon night"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
          <div className="space-y-4">
            <h2 className="font-headline text-4xl text-primary flex items-center gap-3">
              <Ghost className="w-8 h-8" />
              BIENVENIDOS AL OTRO LADO
            </h2>
            <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              <p>
                Prepárate para una celebración que desafía la realidad. Nos vemos en el Salite Mágico para un día de adrenalina y misterio. No olvides confirmar tu asistencia, porque en Hawkins, <strong>los amigos no mienten</strong>.
              </p>
              <p className="mt-4 p-4 border-l-4 border-secondary bg-secondary/10 text-foreground italic">
                "{invitationMessage}"
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md" id="rsvp">
          <RSVPForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-4 border-t border-border mt-20 text-center text-muted-foreground text-sm space-y-4">
        <p className="font-headline tracking-widest">FRIENDS DON'T LIE</p>
        <p>
          Diseñado y desarrollado por <a href="https://jontmarz.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Jon Marz</a>. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
