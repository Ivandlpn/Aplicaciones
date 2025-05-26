
import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, MicrophoneIcon, StopIcon } from '../constants';
import { IconButton } from './IconButton';

interface UserInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1; // Only need the top alternative
}

export const UserInput: React.FC<UserInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!recognition) {
      setSpeechError("El reconocimiento de voz no es compatible con este navegador.");
      return;
    }

    const handleRecognitionStart = () => {
      setIsListening(true);
      setSpeechError(null); // Clear error when recognition successfully starts
    };

    const handleRecognitionResult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      // setIsListening(false); // Let onend handle this
      if (transcript.trim()) {
        onSendMessage(transcript.trim());
        setInputValue(''); 
      }
    };

    const handleRecognitionError = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === 'no-speech') {
        setSpeechError("No se detectó voz. Inténtalo de nuevo.");
      } else if (event.error === 'audio-capture') {
        setSpeechError("Problema con el micrófono. Asegúrate de que está permitido y funcionando.");
      } else if (event.error === 'not-allowed') {
        setSpeechError("Permiso para usar el micrófono denegado. Revisa la configuración de tu navegador.");
      } else if (event.error === 'network') {
        setSpeechError("Error de red durante el reconocimiento de voz. Revisa tu conexión.");
      } else {
        setSpeechError(`Error de reconocimiento: ${event.error}`);
      }
      // setIsListening(false); // Let onend handle this
    };
    
    const handleRecognitionEnd = () => {
      setIsListening(false);
    };

    recognition.addEventListener('start', handleRecognitionStart);
    recognition.addEventListener('result', handleRecognitionResult);
    recognition.addEventListener('error', handleRecognitionError);
    recognition.addEventListener('end', handleRecognitionEnd);
    
    return () => {
        recognition.removeEventListener('start', handleRecognitionStart);
        recognition.removeEventListener('result', handleRecognitionResult);
        recognition.removeEventListener('error', handleRecognitionError);
        recognition.removeEventListener('end', handleRecognitionEnd);
        if (isListening) { // Check isListening before aborting
            recognition.abort();
        }
    }
  }, [onSendMessage, isListening]); // isListening added to cleanup dependency to ensure abort is called correctly

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const toggleListen = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      setInputValue(''); 
      setSpeechError(null); // Clear previous error message immediately
      try {
        recognition.start();
      } catch (error) {
          console.error("Error starting speech recognition:", error);
          setSpeechError("No se pudo iniciar el reconocimiento de voz.");
          setIsListening(false); 
      }
    }
  };

  return (
    <div className="bg-slate-800 p-4 border-t border-slate-700">
      {speechError && <p className="text-red-400 text-sm mb-2 text-center">{speechError}</p>}
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        {recognition && (
          <IconButton
            onClick={toggleListen}
            disabled={isLoading && !isListening} // Allow stopping if loading but was listening
            aria-label={isListening ? "Detener grabación" : "Grabar voz"}
            className={`p-2 rounded-full transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-sky-500 hover:bg-sky-600 text-white'
            } disabled:bg-slate-600 disabled:cursor-not-allowed`}
          >
            {isListening ? <StopIcon className="w-5 h-5" /> : <MicrophoneIcon className="w-5 h-5" />}
          </IconButton>
        )}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isListening ? "Escuchando..." : "Escribe tu pregunta aquí..."}
          className="flex-grow p-3 bg-slate-700 text-slate-100 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none placeholder-slate-400"
          disabled={isLoading || (isListening && inputValue === '')} // Keep enabled if listening and there's interim text
        />
        <IconButton
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          aria-label="Enviar mensaje"
          className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          <SendIcon className="w-5 h-5" />
        </IconButton>
      </form>
    </div>
  );
};
