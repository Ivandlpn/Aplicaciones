
import React from 'react';
import { PHRASES } from './constants';
import { Phrase } from './types';
import PhraseCard from './components/PhraseCard';
import { VietnameseFlagIcon } from './components/icons';

const App: React.FC = () => {

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any previous speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta la síntesis de voz.');
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex items-center justify-center gap-4">
          <VietnameseFlagIcon className="h-10 w-16" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-700 tracking-tight">
            10 Frases en Vietnamita
          </h1>
          <VietnameseFlagIcon className="h-10 w-16" />
        </div>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          ¡Aprende estas expresiones básicas para tu viaje a Vietnam! Haz clic en el altavoz para escuchar la pronunciación.
        </p>
      </header>

      <main className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {PHRASES.map((phrase: Phrase) => (
            <PhraseCard 
              key={phrase.id} 
              phrase={phrase} 
              onSpeak={handleSpeak}
            />
          ))}
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center mt-12 text-slate-500 text-sm">
        <p>Un recurso de aprendizaje inspirado en el material de AventurasConAlberto.com</p>
      </footer>
    </div>
  );
};

export default App;
