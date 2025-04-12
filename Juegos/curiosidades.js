// --- START OF FILE curiosidades.js ---

const curiosidadesDivertidas = [
    {
        texto: "Los pulpos tienen ¡tres corazones! y su sangre es de color azul. 🐙💙",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "¿Sabías que las jirafas no tienen cuerdas vocales? ¡Son casi mudas! 🦒🤫",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "El primer programador de computadoras fue una mujer llamada Ada Lovelace, ¡hace casi 200 años! 👩‍💻🕰️",
        categoria: "Tecnología / Historia"
    },
    {
        texto: "En Júpiter y Saturno, ¡llueven diamantes! 💎🪐",
        categoria: "Ciencia / Espacio"
    },
    {
        texto: "La palabra 'reconocer' se lee igual de izquierda a derecha que de derecha a izquierda. ¡Es un palíndromo! ✨",
        categoria: "Lengua"
    },
    {
        texto: "El país más pequeño del mundo es la Ciudad del Vaticano, ¡es más pequeño que algunos parques! 🇻🇦",
        categoria: "Geografía"
    },
    {
        texto: "Las hormigas pueden levantar ¡50 veces su propio peso! Son súper fuertes. 💪🐜",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "Hay un pueblo en Noruega que se llama 'A'. ¡Solo una letra! 🇳🇴🅰️",
        categoria: "Geografía / Lengua"
    },
    {
        texto: "Los teléfonos móviles actuales son ¡millones de veces más potentes! que los ordenadores que llevaron al hombre a la Luna. 📱🚀",
        categoria: "Tecnología"
    },
    {
        texto: "El desierto del Sahara es tan grande como ¡casi todo Estados Unidos! 🏜️🇺🇸",
        categoria: "Geografía"
    },
    {
        texto: "La palabra 'murciélago' tiene las cinco vocales ¡y sin repetir ninguna! 🦇AEIOU",
        categoria: "Lengua"
    },
    {
        texto: "La Catedral de Málaga es conocida como 'la manquita' porque quedó inacabada y carece de la torre sur.",
        categoria: "Arquitectura / Historia"
    },
    {
        texto: "En Málaga, hay diferentes formas específicas de pedir un café, como 'solo', 'largo', 'sombra' o 'nube'.",
        categoria: "Gastronomía / Idioma"
    },
    {
        texto: "El Puente de los Alemanes fue construido por Alemania como agradecimiento por la ayuda de los malagueños en el naufragio de la fragata SMS Gneisenau en 1900.",
        categoria: "Historia"
    },
    {
        texto: "Málaga cuenta con 10 estrellas Michelin repartidas en 7 restaurantes.",
        categoria: "Gastronomía"
    },
    {
        texto: "Málaga disfruta de más de 300 días de sol al año.",
        categoria: "Geografía / Clima"
    },
    {
        texto: "En Málaga hay más de 45 bodegas y 265 denominaciones de origen para los amantes del vino.",
        categoria: "Gastronomía"
    },
    {
        texto: "El centro histórico de Málaga tiene una alta densidad de museos, ¡más de 30!",
        categoria: "Cultura"
    },
    {
        texto: "Algunos platos típicos de la gastronomía malagueña son los espetos, los boquerones fritos, el gazpachuelo o el ajoblanco.",
        categoria: "Gastronomía"
    },
    {
        texto: "El Pasaje de Chinitas es una calle famosa donde se ubicaba un café-cabaret-teatro que aparece en una obra de Federico García Lorca.",
        categoria: "Cultura / Literatura"
    },
    {
        texto: "Existen palabras y expresiones malagueñas como 'esmallao' (hambriento), 'alobao' (atontado) o 'boquerón' (malagueño).",
        categoria: "Idioma"
    },
    {
        texto: "Málaga es una de las ciudades más antiguas del mundo, con asentamientos que datan del siglo VIII a.C.",
        categoria: "Historia"
    },
    {
        texto: "Pablo Picasso nació en Málaga.",
        categoria: "Personajes Ilustres / Arte"
    },
    {
        texto: "La Alcazaba de Málaga es un castillo y palacio árabe del siglo XI.",
        categoria: "Arquitectura / Historia"
    },
    {
        texto: "Málaga es famosa por su vino dulce 'Málaga Dulce', elaborado con uvas Moscatel.",
        categoria: "Gastronomía"
    },
    {
        texto: "La Catedral de Málaga fue construida en el siglo XVI sobre el emplazamiento de una mezquita.",
        categoria: "Arquitectura / Historia"
    },
    {
        texto: "La Feria de Agosto es una de las mayores fiestas de España y se celebra en Málaga.",
        categoria: "Cultura / Tradiciones"
    },
    {
        texto: "El centro histórico de Málaga es un laberinto de calles estrechas con cafés, bares y tiendas.",
        categoria: "Arquitectura"
    },
    {
        texto: "La cocina malagueña es una fusión de sabores tradicionales españoles y especias árabes.",
        categoria: "Gastronomía"
    },
    {
        texto: "El Teatro Romano de Málaga es uno de los más antiguos y mejor conservados de España.",
        categoria: "Arquitectura / Historia"
    },
    {
        texto: "Málaga alberga varios festivales importantes, incluyendo la procesión de Semana Santa.",
        categoria: "Cultura / Tradiciones"
    },
    {
        texto: "Málaga es famosa por su arte callejero con murales y grafitis.",
        categoria: "Arte / Cultura"
    },
    {
        texto: "El Muelle Uno fue un antiguo puerto pesquero reconvertido en complejo comercial y de ocio.",
        categoria: "Arquitectura / Historia"
    },
    {
        texto: "Málaga es un destino popular para los golfistas con campos de nivel de campeonato.",
        categoria: "Deporte"
    },
    {
        texto: "El Castillo de Gibralfaro es un castillo árabe del siglo XIV en Málaga.",
        categoria: "Arquitectura / Historia"
    },
    {
        texto: "El Cementerio Inglés de Málaga es el primer cementerio protestante de España.",
        categoria: "Historia"
    },
    {
        texto: "Durante la Semana Santa, la Cofradía de Jesús El Rico tiene el privilegio de liberar a un preso.",
        categoria: "Tradiciones / Historia"
    },
    {
        texto: "El Festival de Cine Español de Málaga entrega el premio 'Biznaga de Oro'.",
        categoria: "Cultura / Cine"
    },
    {
        texto: "En Málaga se han descubierto dos mezquitas funerarias de época almohade, únicas en el mundo.",
        categoria: "Arquitectura / Historia / Religión"
    },
    {
        texto: "El antiguo apodo de un edificio cerca de la Alcazaba, donde se descubrió el Teatro Romano, fue 'la casa de la incultura'.",
        categoria: "Historia / Curiosidades"
    },
    {
        texto: "Tras una gran inundación en 1907, varios alemanes afincados en Málaga promovieron la reconstrucción de un puente con donaciones de Alemania, conocido como el Puente de los Alemanes.",
        categoria: "Historia"
    },
    {
        texto: "La 'loca' es un pastel típico de Málaga que surgió en la posguerra como dulce quitahambres.",
        categoria: "Gastronomía / Historia"
    },
    {
        texto: "El metro de Málaga tiene relojes que marcan 59 segundos al estilo de los antiguos relojes de ferrocarril británicos.",
        categoria: "Tecnología / Curiosidades"
    },
    {
        texto: "En varios lugares de Málaga, como la Librería Proteo o el MIMA, se pueden encontrar restos de la antigua muralla de la ciudad de la época de Al-Andalus.",
        categoria: "Historia / Arquitectura"
    },
    {
        texto: "Dentro del Aparcamiento Plaza de la Marina se hallan ruinas del Castillo de los Genoveses, construido en época nazarí.",
        categoria: "Historia / Arquitectura"
    },
    {
        texto: "En el sótano de la cafetería del Hotel Tribuna se pueden observar restos de la muralla y la barbacana.",
        categoria: "Historia / Arquitectura"
    },
    {
        texto: "El Cementerio Inglés fue construido en 1821 y es el primer cementerio protestante de España.",
        categoria: "Historia"
    },
    {
        texto: "Cada año, Málaga conmemora el Día de la Independencia de Estados Unidos el 4 de julio, recordando la ayuda de Bernardo de Gálvez.",
        categoria: "Historia / Tradiciones"
    },
    {
        texto: "El escritor danés Hans Christian Andersen se enamoró de Málaga y escribió sobre ella en su libro 'Viaje a España'. Una estatua en su honor se encuentra junto a la calle Larios.",
        categoria: "Personajes Ilustres / Literatura"
    },
    {
        texto: "La Iglesia-Santuario de Nuestra Señora de la Victoria ocupa el lugar del campamento de las tropas de los Reyes Católicos durante la conquista de Málaga en 1487.",
        categoria: "Historia / Religión"
    },
    {
        texto: "El faro de Málaga se llama 'La Farola' y es considerado el único faro femenino de la Península Ibérica.",
        categoria: "Arquitectura / Curiosidades"
    },
    {
        texto: "La taberna más antigua de Málaga es la Antigua Casa de Guardia, abierta desde 1840.",
        categoria: "Gastronomía / Historia"
    },
    {
        texto: "El bar restaurante El Pimpi es uno de los lugares más emblemáticos de Málaga, con una historia que incluye ser un convento y una sala de fiestas.",
        categoria: "Historia / Cultura"
    },
    {
        texto: "El nombre 'El Pimpi' proviene de los jóvenes que ayudaban a los marineros y viajeros que llegaban al puerto de Málaga.",
        categoria: "Historia / Costumbres"
    },
    {
        texto: "La Calle Marqués de Larios es la calle más famosa de Málaga, inaugurada en 1891 e inspirada en la arquitectura de Chicago.",
        categoria: "Arquitectura / Historia"
    },
    {
        texto: "La Calle Larios fue apodada 'el Salón de Baile' por sus aceras de madera en su origen.",
        categoria: "Historia / Curiosidades"
    },
    {
        texto: "La calle Larios figura en el Libro Guinness de los Récords desde 2018 por reunir a miles de personas bailando flamenco.",
        categoria: "Cultura / Curiosidades"
    },
    {
        texto: "En fachadas de casas antiguas de Málaga han aparecido pinturas restauradas del siglo XVIII, que estuvieron ocultas bajo capas de cal.",
        categoria: "Arte / Historia"
    },
    {
        texto: "El arte callejero es visible en distritos como Lagunillas y el Soho de Málaga.",
        categoria: "Arte / Cultura"
    },
    {
        texto: "Málaga es la única capital que tiene grandes hallazgos de las tres principales culturas: judía, árabe y romana.",
        categoria: "Historia / Cultura"
    },
    {
        texto: "En la Plaza de la Constitución de Málaga están grabadas en el suelo las portadas de los principales periódicos con la noticia de la aprobación de la Constitución de 1978.",
        categoria: "Historia / Curiosidades"
    },
    {
        texto: "La biznaga es un símbolo de Málaga, un ramillete de jazmines con el tallo seco.",
        categoria: "Cultura / Tradiciones"
    },
    {
        texto: "A los malagueños se les llama 'boquerones' por la importancia del boquerón frito en su gastronomía.",
        categoria: "Gastronomía / Idioma"
    },
    {
        texto: "El escudo de armas de Málaga fue otorgado por los Reyes Católicos y contiene las iniciales 'TM' que significan 'Tanto Monta'.",
        categoria: "Historia / Símbolos"
    },
    {
        texto: "Durante la Guerra Civil, la huida de miles de malagueños hacia Almería se conoce como 'La Desbandá', una masacre en la carretera de Almería.",
        categoria: "Historia"
    },
    {
        texto: "La Farola de Málaga es uno de los dos únicos faros en España con género femenino.",
        categoria: "Arquitectura / Curiosidades"
    },
    {
        texto: "La forma de pedir café en Málaga es una seña de identidad del malagueño, con denominaciones únicas para las proporciones de café y leche.",
        categoria: "Gastronomía / Idioma"
    },
    {
        texto: "Los espetos de sardina son un manjar y una seña de identidad cultural de Málaga.",
        categoria: "Gastronomía / Cultura"
    },
    {
        texto: "En Málaga se encuentra el Museo Pompidou, la primera sede fuera de Francia del museo parisino.",
        categoria: "Cultura / Arte"
    },
    {
        texto: "La Feria de Málaga se celebra en verano para conmemorar la incorporación de la ciudad a la Corona de Castilla en 1487.",
        categoria: "Historia / Tradiciones"
    },
    {
        texto: "Málaga cuenta con un viento cálido muy común en verano llamado 'terral'.",
        categoria: "Geografía / Clima"
    },
    {
        texto: "Los Verdiales son el cante malagueño más antiguo, un tipo particular de fandango cantado y bailado.",
        categoria: "Cultura / Música / Tradiciones"
    },
    {
        texto: "Durante la Revolución Industrial, Málaga fue una de las regiones españolas más avanzadas, destacando en la fundición y llegando a ser la primera ciudad industrial de la Península Ibérica.",
        categoria: "Historia / Economía"
    },
    {
        texto: "Puerto Banús fue inaugurado con la presencia de numerosas personalidades internacionales.",
        categoria: "Historia / Curiosidades"
    },
    // 100 NUEVAS CURIOSIDADES PARA NIÑOS (9-12 años)
    // --- CIENCIA ---
    {
        texto: "Si pudieras doblar un papel 42 veces, ¡llegaría hasta la Luna! 📄🌕",
        categoria: "Ciencia / Matemáticas"
    },
    {
        texto: "El sonido viaja 4 veces más rápido en el agua que en el aire. 🏊‍♂️🔊",
        categoria: "Ciencia / Física"
    },
    {
        texto: "Tu cuerpo produce suficiente calor en 30 minutos para hervir medio litro de agua. 🔥💧",
        categoria: "Ciencia / Cuerpo humano"
    },
    {
        texto: "Los astronautas crecen hasta 5 cm en el espacio porque sin gravedad su columna se estira. 🚀📏",
        categoria: "Ciencia / Espacio"
    },
    {
        texto: "El animal más ruidoso del mundo es el camarón pistola, cuyo sonido puede romper cristales. 🦐🔊",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "Un rayo es 5 veces más caliente que la superficie del Sol. ⚡🌞",
        categoria: "Ciencia / Meteorología"
    },
    {
        texto: "Los ojos de los avestruces son más grandes que su cerebro. 🦢🧠",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "El 99% del espacio es vacío total. Si quitáramos todo el espacio vacío de los átomos, la humanidad cabría en un terrón de azúcar. 🪐🔬",
        categoria: "Ciencia / Física"
    },
    {
        texto: "Los koalas tienen huellas dactilares casi iguales a las humanas. �👆",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "El corazón de una ballena azul es tan grande que un niño podría nadar por sus arterias. 🐳❤️",
        categoria: "Ciencia / Animales"
    },

    // --- GEOGRAFÍA ---
    {
        texto: "En Islandia hay un glaciar llamado Snaefellsjökull que Julio Verne usó como entrada al centro de la Tierra en su libro. 🇮🇸📖",
        categoria: "Geografía / Literatura"
    },
    {
        texto: "Canadá tiene más lagos que todos los demás países juntos. 🇨🇦🏞️",
        categoria: "Geografía"
    },
    {
        texto: "En Australia hay más canguros que personas. 🇦🇺🦘",
        categoria: "Geografía / Animales"
    },
    {
        texto: "Rusia es tan grande que tiene 11 zonas horarias diferentes. 🇷🇺⏰",
        categoria: "Geografía"
    },
    {
        texto: "El lugar más seco de la Tierra es el Desierto de Atacama en Chile, donde algunas zonas no han visto lluvia en 400 años! 🇨🇱☀️",
        categoria: "Geografía / Clima"
    },
    {
        texto: "En las Filipinas hay una isla dentro de un lago, dentro de una isla, dentro de un lago, dentro de una isla. 🤯🏝️",
        categoria: "Geografía"
    },
    {
        texto: "El país con más idiomas oficiales es Sudáfrica, con 11 lenguas reconocidas. 🇿🇦🗣️",
        categoria: "Geografía / Lengua"
    },
    {
        texto: "En Noruega hay un pueblo llamado 'Å' que solo tiene una letra. 🇳🇴🔠",
        categoria: "Geografía"
    },
    {
        texto: "El río Amazonas libera tanta agua dulce al océano que puedes beber agua no salada a 100 km de la costa. 🌊🚰",
        categoria: "Geografía"
    },
    {
        texto: "En Turquía hay una montaña llamada Monte Nemrut con gigantescas cabezas de piedra de 2000 años en su cima. 🇹🇷🗿",
        categoria: "Geografía / Historia"
    },

    // --- TECNOLOGÍA ---
    {
        texto: "El primer videojuego se creó en 1958 y era un tenis muy simple llamado 'Tennis for Two'. 🎮🕹️",
        categoria: "Tecnología / Videojuegos"
    },
    {
        texto: "El 90% de todos los datos del mundo se han creado en los últimos 2 años. 💾📈",
        categoria: "Tecnología"
    },
    {
        texto: "El primer mensaje de texto decía simplemente 'Feliz Navidad' y se envió en 1992. 📱🎄",
        categoria: "Tecnología"
    },
    {
        texto: "Los códigos QR pueden almacenar hasta 4.296 caracteres, ¡como un cuento corto! 📲🔣",
        categoria: "Tecnología"
    },
    {
        texto: "El primer ordenador pesaba más de 27 toneladas y ocupaba una habitación entera. 💻🏢",
        categoria: "Tecnología / Historia"
    },
    {
        texto: "El 40% de todo el tráfico de Internet son bots, no personas. 🤖🌐",
        categoria: "Tecnología"
    },
    {
        texto: "El ratón de computadora original era de madera y tenía solo un botón. 🖱️🌳",
        categoria: "Tecnología"
    },
    {
        texto: "El primer dominio web registrado fue symbolics.com en 1985. 🌐⏳",
        categoria: "Tecnología"
    },
    {
        texto: "Los smartphones actuales tienen más poder de computación que los ordenadores que llevaron al Apolo 11 a la Luna. 📱🚀",
        categoria: "Tecnología"
    },
    {
        texto: "El término 'bug' (error informático) viene de cuando un insecto real se coló en un ordenador en 1947. 🐛💻",
        categoria: "Tecnología / Historia"
    },

    // --- INTELIGENCIA ARTIFICIAL ---
    {
        texto: "La IA puede componer música que suena como si la hubiera escrito Mozart. 🎵🤖",
        categoria: "Inteligencia Artificial / Música"
    },
    {
        texto: "Existe una IA que puede detectar si una sonrisa es falsa o real con un 90% de precisión. 😊🤖",
        categoria: "Inteligencia Artificial"
    },
    {
        texto: "Los robots con IA pueden aprender a caminar por sí mismos en solo unas horas, como un bebé. 🤖👶",
        categoria: "Inteligencia Artificial / Robótica"
    },
    {
        texto: "Hay IA que puede pintar cuadros que se venden por miles de dólares. 🎨🤖",
        categoria: "Inteligencia Artificial / Arte"
    },
    {
        texto: "Algunas IA pueden predecir terremotos con más precisión que los científicos. 🌍🤖",
        categoria: "Inteligencia Artificial / Ciencia"
    },
    {
        texto: "La IA puede jugar videojuegos y aprender a ser mejor que los humanos en solo unas horas. 🎮🤖",
        categoria: "Inteligencia Artificial / Videojuegos"
    },
    {
        texto: "Existen robots con IA que pueden hacer parkour y saltar obstáculos como atletas. 🤖🏃‍♂️",
        categoria: "Inteligencia Artificial / Robótica"
    },
    {
        texto: "La IA puede escribir historias y poemas, ¡algunos han ganado concursos literarios! 📖🤖",
        categoria: "Inteligencia Artificial / Literatura"
    },
    {
        texto: "Los coches autónomos usan IA para tomar más de 2.000 decisiones por kilómetro. 🚗🤖",
        categoria: "Inteligencia Artificial / Transporte"
    },
    {
        texto: "Hay IA que puede diagnosticar enfermedades mirando fotos mejor que algunos médicos. 🏥🤖",
        categoria: "Inteligencia Artificial / Medicina"
    },

    // --- LENGUA ---
    {
        texto: "La palabra más larga en español tiene 23 letras: 'electroencefalografista'. 📖🔤",
        categoria: "Lengua"
    },
    {
        texto: "El punto sobre la 'i' se llama tilde o virgulilla. 🔤✏️",
        categoria: "Lengua"
    },
    {
        texto: "En español, las palabras más usadas son 'de', 'la' y 'que'. 🗣️📊",
        categoria: "Lengua"
    },
    {
        texto: "La letra 'e' es la más común en español, aparece en el 16% de todas las palabras. 🔠📝",
        categoria: "Lengua"
    },
    {
        texto: "La palabra 'reconocer' se lee igual al derecho y al revés (es un palíndromo). ↔️🔤",
        categoria: "Lengua"
    },
    {
        texto: "El español tiene más de 100,000 palabras, pero normalmente usamos solo 300 en el día a día. 📚🗣️",
        categoria: "Lengua"
    },
    {
        texto: "La 'ñ' es una letra que solo existe en español y en algunas lenguas indígenas de América. 🇪🇸🔡",
        categoria: "Lengua"
    },
    {
        texto: "La palabra 'ojo' es un palíndromo y también un homoífono (suena igual que 'hojo'). 👁️🔊",
        categoria: "Lengua"
    },
    {
        texto: "El signo de exclamación de apertura (¡) solo existe en español. ‼️🇪🇸",
        categoria: "Lengua"
    },
    {
        texto: "La palabra 'argentino' puede escribirse solo con letras redondas: a, e, g, o, etc. ⚽🔠",
        categoria: "Lengua"
    },

    // --- CIENCIA (más) ---
    {
        texto: "Los colibríes son los únicos pájaros que pueden volar hacia atrás. 🐦↩️",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "Los diamantes pueden quemarse si se calientan a 900°C. 💎🔥",
        categoria: "Ciencia / Química"
    },
    {
        texto: "El cerebro humano puede almacenar el equivalente a 2.5 millones de gigabytes. 🧠💾",
        categoria: "Ciencia / Cuerpo humano"
    },
    {
        texto: "Los gatos tienen 32 músculos en cada oreja, por eso las mueven tanto. 🐱👂",
        categoria: "Ciencia / Animales"
    },
    {
        texto: "El ojo humano puede distinguir hasta 10 millones de colores diferentes. 👀🌈",
        categoria: "Ciencia / Cuerpo humano"
    },
    {
        texto: "Los tiburones existen desde antes que los árboles. 🦈🌳",
        categoria: "Ciencia / Animales / Historia"
    },
    {
        texto: "El agua caliente se congela más rápido que la fría (efecto Mpemba). ❄️🔥",
        categoria: "Ciencia / Física"
    },
    {
        texto: "Los humanos comparten el 60% de su ADN con los plátanos. 🧬🍌",
        categoria: "Ciencia / Biología"
    },
    {
        texto: "El Sol tarda 200 millones de años en dar una vuelta completa alrededor de la Vía Láctea. 🌞🌌",
        categoria: "Ciencia / Espacio"
    },
    {
        texto: "Si juntaras todas las bacterias de tu cuerpo, pesarían unos 2 kilos. 🦠⚖️",
        categoria: "Ciencia / Cuerpo humano"
    },

    // --- GEOGRAFÍA (más) ---
    {
        texto: "El país con más husos horarios es Francia, gracias a sus territorios de ultramar (12 zonas). 🇫🇷⏰",
        categoria: "Geografía"
    },
    {
        texto: "La montaña más alta del Sistema Solar es el Monte Olimpo en Marte: ¡3 veces el Everest! 🗻🪐",
        categoria: "Geografía / Espacio"
    },
    {
        texto: "En Venezuela hay un río donde caen relámpagos casi continuos, llamado Relámpago del Catatumbo. ⚡🇻🇪",
        categoria: "Geografía / Meteorología"
    },
    {
        texto: "El lugar habitado más frío del mundo es Oymyakon (Rusia), donde ha llegado a -71°C. ❄️🇷🇺",
        categoria: "Geografía / Clima"
    },
    {
        texto: "El desierto más grande del mundo no es el Sahara, ¡es la Antártida! 🏜️❄️",
        categoria: "Geografía"
    },
    {
        texto: "El país con más volcanes activos es Indonesia, con más de 130. 🇮🇩🌋",
        categoria: "Geografía"
    },
    {
        texto: "En las Maldivas no hay ríos porque las islas son demasiado pequeñas. 🇲🇻🏝️",
        categoria: "Geografía"
    },
    {
        texto: "El lugar más profundo del océano es la Fosa de las Marianas: 11 km bajo el agua. 🌊⬇️",
        categoria: "Geografía"
    },
    {
        texto: "La frontera más larga del mundo es entre Canadá y EE.UU.: 8,891 km. 🇨🇦🇺🇸",
        categoria: "Geografía"
    },
    {
        texto: "En Birmania hay un pueblo donde las mujeres llevan anillos de latón para estirar sus cuellos. 🇲🇲💍",
        categoria: "Geografía / Cultura"
    },

    // --- TECNOLOGÍA (más) ---
    {
        texto: "El primer emoticono fue :-) y se usó en 1982 en un mensaje de universidad. 🙂⏳",
        categoria: "Tecnología"
    },
    {
        texto: "El 80% de las fotos en Internet son de gatos. 😺🌐",
        categoria: "Tecnología / Animales"
    },
    {
        texto: "El primer tweet lo envió el creador de Twitter y decía 'just setting up my twttr'. 🐦⏳",
        categoria: "Tecnología"
    },
    {
        texto: "El video más visto en YouTube es 'Baby Shark' con más de 12 mil millones de visitas. 🦈▶️",
        categoria: "Tecnología / Música"
    },
    {
        texto: "Se estima que el 90% de los empleos del futuro aún no se han inventado. 💼🔮",
        categoria: "Tecnología"
    },
    {
        texto: "El primer video subido a YouTube se llama 'Me at the zoo' y dura 18 segundos. 🎥🦁",
        categoria: "Tecnología"
    },
    {
        texto: "El término 'Wi-Fi' no significa nada, es solo un nombre comercial. 📶🤷‍♂️",
        categoria: "Tecnología"
    },
    {
        texto: "El primer teléfono móvil pesaba 1 kg y su batería duraba solo 30 minutos. 📞⏳",
        categoria: "Tecnología"
    },
    {
        texto: "El 60% de los niños de 3 años ya saben usar un teléfono móvil. 👶📱",
        categoria: "Tecnología"
    },
    {
        texto: "El primer selfie lo tomó un hombre en 1839 usando un espejo. 🤳⏳",
        categoria: "Tecnología / Fotografía"
    },

    // --- INTELIGENCIA ARTIFICIAL (más) ---
    {
        texto: "La IA puede detectar enfermedades en plantas solo mirando fotos de sus hojas. 🌿🤖",
        categoria: "Inteligencia Artificial / Agricultura"
    },
    {
        texto: "Existen robots con IA que pueden hacer pizzas desde cero. 🍕🤖",
        categoria: "Inteligencia Artificial / Gastronomía"
    },
    {
        texto: "La IA puede predecir cómo será tu cara cuando envejezcas. 👴🤖",
        categoria: "Inteligencia Artificial"
    },
    {
        texto: "Algunas IA pueden traducir lo que dicen los delfines. 🐬🤖",
        categoria: "Inteligencia Artificial / Animales"
    },
    {
        texto: "La IA puede identificar a un perro por su nariz, como nuestras huellas dactilares. 🐶👃",
        categoria: "Inteligencia Artificial / Animales"
    },
    {
        texto: "Existen videojuegos donde todos los personajes son controlados por IA y aprenden de tus acciones. 🎮🤖",
        categoria: "Inteligencia Artificial / Videojuegos"
    },
    {
        texto: "La IA puede componer chistes, aunque a veces no tienen mucho sentido. 😂🤖",
        categoria: "Inteligencia Artificial"
    },
    {
        texto: "Algunos robots con IA pueden bailar mejor que muchos humanos. 💃🤖",
        categoria: "Inteligencia Artificial / Robótica"
    },
    {
        texto: "La IA puede identificar emociones humanas por cómo escribes en el teclado. ⌨️🤖",
        categoria: "Inteligencia Artificial"
    },
    {
        texto: "Existen granjas donde robots con IA cultivan lechugas sin ayuda humana. 🤖🥬",
        categoria: "Inteligencia Artificial / Agricultura"
    },

    // --- LENGUA (más) ---
    {
        texto: "La palabra 'ecuación' tiene todas las vocales en orden alfabético. ➕🔤",
        categoria: "Lengua / Matemáticas"
    },
    {
        texto: "La letra más usada en inglés es la 'e', pero en ruso es la 'o'. 🅰️🌍",
        categoria: "Lengua"
    },
    {
        texto: "El español es el idioma con más palabras que empiezan por 'a'. 🇪🇸🔤",
        categoria: "Lengua"
    },
    {
        texto: "La palabra 'cinco' es la única en español que tiene igual número de letras que su valor numérico. 5️⃣✋",
        categoria: "Lengua / Matemáticas"
    },
    {
        texto: "El alfabeto hawaiano solo tiene 12 letras. 🌺🔤",
        categoria: "Lengua"
    },
    {
        texto: "La palabra más difícil de traducir es 'ilunga' del tshiluba (Congo), que significa 'persona que perdona un abuso una vez, lo tolera una segunda, pero nunca una tercera'. 🌍🗣️",
        categoria: "Lengua"
    },
    {
        texto: "En español, la única palabra con cinco erres es 'ferrocarrilero'. 🚂🔤",
        categoria: "Lengua"
    },
    {
        texto: "El esperanto es un idioma inventado en 1887 para que todo el mundo pudiera comunicarse fácilmente. 🌐🗣️",
        categoria: "Lengua"
    },
    {
        texto: "La palabra 'ave' se lee igual al derecho y al revés, y además ¡es un ave! 🐦↔️",
        categoria: "Lengua"
    },
    {
        texto: "El alfabeto camboyano tiene 74 letras, ¡el más largo del mundo! 🇰🇭🔠",
        categoria: "Lengua"
    }
];

// --- END OF FILE curiosidades.js ---
