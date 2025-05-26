
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { UserInput } from './components/UserInput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Message, Role } from './types';
import { SYSTEM_INSTRUCTION } from './constants';

// Attempt to get API key from environment variables
const API_KEY = process.env.API_KEY;

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [apiKeyAvailable, setApiKeyAvailable] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  }, []);
  
  const initializeChat = useCallback(async () => {
    if (!API_KEY) {
      setError("API Key no encontrada. Asegúrate de que la variable de entorno API_KEY esté configurada.");
      setApiKeyAvailable(false);
      setIsLoading(false);
      return;
    }
    setApiKeyAvailable(true);
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      setChatSession(chat);
      
      const initialResponse: GenerateContentResponse = await chat.sendMessage({ message: "Hola, preséntate." });
      const assistantGreeting: Message = {
        id: Date.now().toString(),
        role: Role.ASSISTANT,
        content: initialResponse.text,
        timestamp: new Date(),
      };
      setMessages([assistantGreeting]);
      speak(initialResponse.text);

    } catch (e) {
      console.error("Error initializing chat:", e);
      if (e instanceof Error) {
         setError(`Error al inicializar: ${e.message}. Verifica la API Key y la conexión.`);
      } else {
         setError("Ocurrió un error desconocido al inicializar el chat. Verifica la API Key y la conexión.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [speak]); // Added all dependencies from the function body

  useEffect(() => {
    if ('speechSynthesis' in window && window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            initializeChat();
        };
    } else {
        initializeChat();
    }
  }, [initializeChat]);


  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !chatSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response: GenerateContentResponse = await chatSession.sendMessage({ message: text });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.ASSISTANT,
        content: response.text,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      speak(response.text);
    } catch (e) {
      console.error("Error sending message to Gemini:", e);
      const errorMessageText = "Lo siento, tuve problemas para procesar tu solicitud. Intenta de nuevo.";
       if (e instanceof Error) {
         setError(`Error del API: ${e.message}. ${errorMessageText}`);
      } else {
         setError(errorMessageText);
      }
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: Role.ASSISTANT,
        content: errorMessageText,
        timestamp: new Date(),
      }]);
      speak(errorMessageText); // Speak the error message
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chatSession, speak]); // Added dependencies

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <Header />
      {!apiKeyAvailable && !isLoading && (
        <div className="p-4 m-4 bg-red-700 text-white rounded-lg text-center">
          {error || "API Key no configurada. El asistente no funcionará."}
        </div>
      )}
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-6 space-y-4"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages.length > 0 && messages[messages.length -1].role === Role.USER && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-3 rounded-lg max-w-xl animate-pulse">
              <LoadingSpinner size="w-5 h-5" />
            </div>
          </div>
        )}
      </div>
      {apiKeyAvailable && (
         <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      )}
      {error && !isLoading && apiKeyAvailable && (
        <div className="p-4 bg-red-600 text-white text-center text-sm">
          {error}
        </div>
      )}
       {isLoading && !chatSession && apiKeyAvailable && (
         <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 z-50">
            <div className="flex flex-col items-center text-white">
                <LoadingSpinner size="w-12 h-12" />
                <p className="mt-2 text-lg">Inicializando asistente...</p>
            </div>
        </div>
       )}
    </div>
  );
};

export default App;
