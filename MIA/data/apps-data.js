/**
 * Datos completos de aplicaciones de IA
 */
const appsData = [
    {
        category: "ChatBots",
        description: "Plataformas de conversación con inteligencia artificial",
        apps: [
            {
                name: "ChatGPT (OpenAI)",
                description: "El referente. Permite interacción por texto, voz, archivos, imagen o vídeo.",
                logo: "https://www.google.com/s2/favicons?domain=chat.openai.com&sz=64",
                link: { type: "web", url: "https://chat.openai.com" }
            },
            {
                name: "Gemini (Google)",
                description: "La gran alternativa de Google con capacidad multimodal.",
                logo: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64",
                link: { type: "web", url: "https://gemini.google.com" }
            },
            {
                name: "Claude (Anthropic)",
                description: "Destaca en comprensión de contexto y razonamiento complejo.",
                logo: "https://www.google.com/s2/favicons?domain=claude.ai&sz=64",
                link: { type: "web", url: "https://claude.ai" }
            },
            {
                name: "Perplexity",
                description: "Buscador con IA que ofrece respuestas precisas citando fuentes.",
                logo: "https://www.google.com/s2/favicons?domain=www.perplexity.ai&sz=64",
                link: { type: "web", url: "https://www.perplexity.ai" }
            },
            {
                name: "LeChat (Mistral)",
                description: "Modelo de IA Europeo con funciones similares a ChatGPT.",
                logo: "https://www.google.com/s2/favicons?domain=mistral.ai&sz=64",
                link: { type: "web", url: "https://mistral.ai" }
            }
        ]
    },
    {
        category: "Imagen",
        description: "Herramientas para generación y edición de imágenes con IA",
        apps: [
            {
                name: "Recraft (RedPanda)",
                description: "Generador y editor de imagen con integración de texto y mockups.",
                logo: "https://www.google.com/s2/favicons?domain=recraft.ai&sz=64",
                link: { type: "web", url: "https://recraft.ai" }
            },
            {
                name: "Imagen 3 (Google)",
                description: "Genera imágenes fotorrealistas a partir de texto con alta calidad.",
                logo: "https://www.google.com/s2/favicons?domain=veo.google&sz=64",
                link: { type: "web", url: "https://deepmind.google/technologies/imagen-3/" }
            },
            {
                name: "Flux (Black Forest Labs)",
                description: "Ofrece calidad y control sin precedentes con resultados fotorrealistas.",
                logo: "https://www.google.com/s2/favicons?domain=flux.ai&sz=64",
                link: { type: "web", url: "https://flux.ai" }
            },
            {
                name: "Ideogram",
                description: "Crea logotipos y diseños con tipografía integrada.",
                logo: "https://www.google.com/s2/favicons?domain=ideogram.ai&sz=64",
                link: { type: "web", url: "https://ideogram.ai" }
            },
            {
                name: "Adobe FireFly",
                description: "Suite de Adobe para generación y edición de imágenes con IA.",
                logo: "https://www.google.com/s2/favicons?domain=adobe.com&sz=64",
                link: { type: "web", url: "https://www.adobe.com/es/products/firefly.html" }
            }
        ]
    },
    {
        category: "Audio",
        description: "Herramientas para generación y procesamiento de audio con IA",
        apps: [
            {
                name: "ElevenLabs",
                description: "El mejor generador de voces a partir de texto con clonación y doblaje.",
                logo: "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=64",
                link: { type: "web", url: "https://elevenlabs.io" }
            },
            {
                name: "Stable Audio",
                description: "Genera música y efectos de sonido de alta calidad a partir de texto.",
                logo: "https://www.google.com/s2/favicons?domain=stableaudio.com&sz=64",
                link: { type: "web", url: "https://stableaudio.com" }
            },
            {
                name: "Suno",
                description: "Crea canciones completas, con letra y música, a partir de una descripción.",
                logo: "https://www.google.com/s2/favicons?domain=suno.com&sz=64",
                link: { type: "web", url: "https://suno.com" }
            },
            {
                name: "Udio",
                description: "La alternativa a Suno con voces realistas y letras coherentes.",
                logo: "https://www.google.com/s2/favicons?domain=udio.com&sz=64",
                link: { type: "web", url: "https://udio.com" }
            },
            {
                name: "Adobe Podcast",
                description: "Mejora la calidad del sonido y elimina ruido de fondo.",
                logo: "https://www.google.com/s2/favicons?domain=podcast.adobe.com&sz=64",
                link: { type: "web", url: "https://podcast.adobe.com" }
            }
        ]
    },
    {
        category: "Video",
        description: "Herramientas para generación y edición de video con IA",
        apps: [
            {
                name: "Runway",
                description: "Suite de generación y edición de vídeo con amplio abanico de herramientas.",
                logo: "https://www.google.com/s2/favicons?domain=runwayml.com&sz=64",
                link: { type: "web", url: "https://runwayml.com" }
            },
            {
                name: "Kling",
                description: "Modelo chino que genera vídeos de alta calidad y realismo.",
                logo: "https://www.google.com/s2/favicons?domain=klingai.com&sz=64",
                link: { type: "web", url: "https://klingai.com" }
            },
            {
                name: "Sora (OpenAI)",
                description: "Modelo de OpenAI para la creación de vídeo con muchas expectativas.",
                logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=64",
                link: { type: "web", url: "https://openai.com/sora" }
            },
            {
                name: "Vidu",
                description: "Generación de vídeo chino útil para animación a partir de imágenes.",
                logo: "https://www.google.com/s2/favicons?domain=vidu.com&sz=64",
                link: { type: "web", url: "https://vidu.com" }
            },
            {
                name: "Invideo",
                description: "Crea videos largos ideales para marketing y redes sociales.",
                logo: "https://www.google.com/s2/favicons?domain=invideo.io&sz=64",
                link: { type: "web", url: "https://invideo.io" }
            }
        ]
    },
    {
        category: "Presentaciones",
        description: "Herramientas para creación de presentaciones con IA",
        apps: [
            {
                name: "Gamma",
                description: "Crea presentaciones, documentos y páginas web en segundos.",
                logo: "https://www.google.com/s2/favicons?domain=gamma.app&sz=64",
                link: { type: "web", url: "https://gamma.app" }
            },
            {
                name: "Heygen",
                description: "Crea avatares virtuales para vídeos con traducción automática.",
                logo: "https://www.google.com/s2/favicons?domain=heygen.com&sz=64",
                link: { type: "web", url: "https://www.heygen.com" }
            },
            {
                name: "Napkin",
                description: "Analiza textos para crear ilustraciones y gráficos espectaculares.",
                logo: "https://www.google.com/s2/favicons?domain=napkin.ai&sz=64",
                link: { type: "web", url: "https://napkin.ai" }
            },
            {
                name: "Synthesia",
                description: "Generación de vídeo con avatares realistas en múltiples idiomas.",
                logo: "https://www.google.com/s2/favicons?domain=synthesia.io&sz=64",
                link: { type: "web", url: "https://www.synthesia.io" }
            },
            {
                name: "Hedra",
                description: "Genera animaciones de personajes en vídeo con sincronización labial.",
                logo: "https://www.google.com/s2/favicons?domain=hedra.com&sz=64",
                link: { type: "web", url: "https://hedra.com" }
            }
        ]
    },
    {
        category: "Productividad",
        description: "Herramientas de IA para mejorar la productividad",
        apps: [
            {
                name: "NotebookLM",
                description: "Organiza y sintetiza información de múltiples fuentes.",
                logo: "https://www.google.com/s2/favicons?domain=notebooklm.google.com&sz=64",
                link: { type: "web", url: "https://notebooklm.google.com" }
            },
            {
                name: "Google AI Studio",
                description: "Plataforma de Google para experimentar con modelos de IA generativa.",
                logo: "https://www.google.com/s2/favicons?domain=aistudio.google.com&sz=64",
                link: { type: "web", url: "https://aistudio.google.com" }
            },
            {
                name: "Copilot 365",
                description: "Asistente de IA integrado en Microsoft 365 para productividad.",
                logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=64",
                link: { type: "web", url: "https://www.microsoft.com/copilot" }
            },
            {
                name: "Limitless",
                description: "Grabación y análisis inteligente de reuniones con resúmenes automáticos.",
                logo: "https://www.google.com/s2/favicons?domain=limitless.ai&sz=64",
                link: { type: "web", url: "https://limitless.ai" }
            },
            {
                name: "Snapdrop",
                description: "Comparte archivos fácilmente entre dispositivos en la misma red.",
                logo: "https://www.google.com/s2/favicons?domain=snapdrop.net&sz=64",
                link: { type: "web", url: "https://snapdrop.net" }
            }
        ]
    },
    {
        category: "Transcripciones",
        description: "Herramientas de IA para transcripción de audio y video",
        apps: [
            {
                name: "Turboscribe",
                description: "Convierte audio y vídeo a texto con precisión en múltiples idiomas.",
                logo: "https://www.google.com/s2/favicons?domain=turboscribe.ai&sz=64",
                link: { type: "web", url: "https://turboscribe.ai" }
            },
            {
                name: "OpusClip",
                description: "Transforma vídeos largos en clips cortos para redes sociales.",
                logo: "https://www.google.com/s2/favicons?domain=opus.pro&sz=64",
                link: { type: "web", url: "https://opus.pro" }
            },
            {
                name: "Riverside",
                description: "Grabación de podcast con transcripción automática y edición sencilla.",
                logo: "https://www.google.com/s2/favicons?domain=riverside.fm&sz=64",
                link: { type: "web", url: "https://riverside.fm" }
            },
            {
                name: "You TLDR",
                description: "Resume videos de YouTube en texto conciso con los puntos clave.",
                logo: "https://www.google.com/s2/favicons?domain=youtldr.com&sz=64",
                link: { type: "web", url: "https://youtldr.com" }
            },
            {
                name: "Tactiq",
                description: "Transcribe en tiempo real reuniones de Google Meet, Zoom y Teams.",
                logo: "https://www.google.com/s2/favicons?domain=tactiq.io&sz=64",
                link: { type: "web", url: "https://tactiq.io" }
            }
        ]
    },
    {
        category: "Miscelánea",
        description: "Otras herramientas diversas de IA",
        apps: [
            {
                name: "Luma AI",
                description: "Captura y crea objetos 3D a partir de vídeos con gran detalle.",
                logo: "https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=64",
                link: { type: "web", url: "https://lumalabs.ai" }
            },
            {
                name: "Polycam",
                description: "Crea modelos 3D con la cámara del móvil y LiDAR.",
                logo: "https://www.google.com/s2/favicons?domain=poly.cam&sz=64",
                link: { type: "web", url: "https://poly.cam" }
            },
            {
                name: "CSM AI",
                description: "Genera modelos 3D a partir de texto o imágenes para juegos.",
                logo: "https://www.google.com/s2/favicons?domain=csm.ai&sz=64",
                link: { type: "web", url: "https://csm.ai" }
            },
            {
                name: "FromSmash",
                description: "Envía archivos grandes de hasta 2Gb sin registro.",
                logo: "https://www.google.com/s2/favicons?domain=fromsmash.com&sz=64",
                link: { type: "web", url: "https://fromsmash.com" }
            },
            {
                name: "I Love PDF",
                description: "Convierte, fusiona, divide y edita PDFs de forma sencilla.",
                logo: "https://www.google.com/s2/favicons?domain=ilovepdf.com&sz=64",
                link: { type: "web", url: "https://www.ilovepdf.com" }
            }
        ]
    }
];