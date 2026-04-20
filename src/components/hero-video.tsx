'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function HeroVideo({ src }: { src: string }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      <video 
        ref={videoRef}
        src={src} 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover opacity-70 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <button 
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-50 p-3 bg-black/40 hover:bg-primary/20 backdrop-blur-md rounded-full border border-primary/50 text-white transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(179,31,31,0.3)] hover:shadow-[0_0_20px_rgba(179,31,31,0.6)]"
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
