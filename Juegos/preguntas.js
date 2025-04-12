// --- Archivo: preguntas.js ---
// Contiene las preguntas para el quiz del juego 3 en Raya.
// preguntas de dificultad variada para niños de 9-12 años.
// Estructura de cada pregunta:
// {
//   pregunta: "Texto de la pregunta",
//   opciones: ["Opción A", "Opción B", "Opción C"], // Array de 3 strings
//   respuestaCorrecta: 0 // Índice (0, 1 o 2) de la opción correcta en el array 'opciones'
// }

const preguntasQuiz = [
    // --- Batch 1: Preguntas 1-50 (Dificultad Base) ---
    // Geografía (1-7)
    {
        pregunta: "¿Cuál es el río más largo de España?",
        opciones: ["Ebro", "Tajo", "Amazonas"],
        respuestaCorrecta: 1 // Tajo
    },
    {
        pregunta: "¿En qué continente se encuentra Egipto?",
        opciones: ["Asia", "África", "Oceanía"],
        respuestaCorrecta: 1 // África
    },
    {
        pregunta: "¿Cuál es la capital de Portugal?",
        opciones: ["Oporto", "Lisboa", "Barcelona"],
        respuestaCorrecta: 1 // Lisboa
    },
    {
        pregunta: "¿Qué océano es el más grande del mundo?",
        opciones: ["Atlántico", "Pacífico", "Mediterráneo"],
        respuestaCorrecta: 1 // Pacífico
    },
    {
        pregunta: "¿Cuál de estos países NO tiene costa?",
        opciones: ["Francia", "Bolivia", "Italia"],
        respuestaCorrecta: 1 // Bolivia
    },
     {
        pregunta: "¿Cómo se llama la cordillera más alta del mundo?",
        opciones: ["Andes", "Alpes", "Himalaya"],
        respuestaCorrecta: 2 // Himalaya
    },
    {
        pregunta: "¿Qué país tiene forma de bota?",
        opciones: ["Grecia", "Italia", "Portugal"],
        respuestaCorrecta: 1 // Italia
    },
    // Naturaleza y Ciencia (8-15)
    {
        pregunta: "¿Qué gas necesitan las plantas para hacer la fotosíntesis?",
        opciones: ["Oxígeno", "Dióxido de Carbono", "Nitrógeno"],
        respuestaCorrecta: 1 // Dióxido de Carbono
    },
    {
        pregunta: "¿Cuál es el animal terrestre más grande?",
        opciones: ["Rinoceronte", "Elefante Africano", "Ballena Azul"],
        respuestaCorrecta: 1 // Elefante Africano
    },
    {
        pregunta: "¿Cuántos corazones tiene un pulpo?",
        opciones: ["Uno", "Tres", "Ocho"],
        respuestaCorrecta: 1 // Tres
    },
    {
        pregunta: "¿De qué se alimentan principalmente los koalas?",
        opciones: ["Bambú", "Hojas de eucalipto", "Fruta"],
        respuestaCorrecta: 1 // Hojas de eucalipto
    },
    {
        pregunta: "¿Qué planeta es conocido como el 'Planeta Rojo'?",
        opciones: ["Júpiter", "Marte", "Sol"],
        respuestaCorrecta: 1 // Marte
    },
    {
        pregunta: "El proceso por el cual el agua se convierte en vapor se llama:",
        opciones: ["Condensación", "Evaporación", "Congelación"],
        respuestaCorrecta: 1 // Evaporación
    },
    {
        pregunta: "¿Qué tipo de animal es una ballena?",
        opciones: ["Pez", "Mamífero", "Reptil"],
        respuestaCorrecta: 1 // Mamífero
    },
    {
        pregunta: "¿Cuántas patas tiene una araña?",
        opciones: ["Seis", "Ocho", "Diez"],
        respuestaCorrecta: 1 // Ocho
    },
    // Matemáticas (16-22)
    {
        pregunta: "¿Cuánto es 9 multiplicado por 7?",
        opciones: ["56", "63", "97"],
        respuestaCorrecta: 1 // 63
    },
    {
        pregunta: "Si tienes 5 manzanas y te comes 2, ¿cuántas te quedan?",
        opciones: ["2", "3", "7"],
        respuestaCorrecta: 1 // 3
    },
    {
        pregunta: "¿Cuántos lados tiene un hexágono?",
        opciones: ["Cinco", "Seis", "Ocho"],
        respuestaCorrecta: 1 // Seis
    },
    {
        pregunta: "¿Qué número sigue en esta serie: 2, 4, 6, 8...?",
        opciones: ["9", "10", "12"],
        respuestaCorrecta: 1 // 10
    },
    {
        pregunta: "La mitad de 50 es:",
        opciones: ["100", "25", "30"],
        respuestaCorrecta: 1 // 25
    },
    {
        pregunta: "¿Cuántos minutos hay en una hora y media?",
        opciones: ["60", "90", "150"],
        respuestaCorrecta: 1 // 90
    },
     {
        pregunta: "Si un triángulo tiene todos sus lados iguales, se llama:",
        opciones: ["Isósceles", "Equilátero", "Rectángulo"],
        respuestaCorrecta: 1 // Equilátero
    },
    // Lengua (23-29)
    {
        pregunta: "¿Cuál es el antónimo (lo contrario) de 'rápido'?",
        opciones: ["Veloz", "Lento", "Pequeño"],
        respuestaCorrecta: 1 // Lento
    },
    {
        pregunta: "La palabra 'árbol' es un:",
        opciones: ["Verbo", "Sustantivo (nombre)", "Adjetivo"],
        respuestaCorrecta: 1 // Sustantivo (nombre)
    },
    {
        pregunta: "¿Qué palabra está mal escrita?",
        opciones: ["Jirafa", "Elefante", "Vurro"],
        respuestaCorrecta: 2 // Vurro (es Burro)
    },
    {
        pregunta: "En la frase 'El perro marrón ladra fuerte', ¿cuál es el adjetivo?",
        opciones: ["Perro", "Marrón", "Ladra"],
        respuestaCorrecta: 1 // Marrón
    },
    {
        pregunta: "Un sinónimo (significa lo mismo) de 'contento' es:",
        opciones: ["Triste", "Alegre", "Enfadado"],
        respuestaCorrecta: 1 // Alegre
    },
     {
        pregunta: "¿Cuántas sílabas tiene la palabra 'bicicleta'?",
        opciones: ["Tres", "Cuatro", "Cinco"],
        respuestaCorrecta: 2 // Cinco (bi-ci-cle-ta)
    },
    {
        pregunta: "La letra 'H' en español...",
        opciones: ["Siempre suena fuerte", "Nunca suena (es muda)", "Suena como la 'J'"],
        respuestaCorrecta: 1 // Nunca suena (es muda)
    },
    // Deportes (30-36)
    {
        pregunta: "¿Cuántos jugadores hay en un equipo de baloncesto en la cancha?",
        opciones: ["11", "5", "7"],
        respuestaCorrecta: 1 // 5
    },
    {
        pregunta: "¿Qué deporte practica Rafa Nadal?",
        opciones: ["Fútbol", "Tenis", "Golf"],
        respuestaCorrecta: 1 // Tenis
    },
    {
        pregunta: "¿Cada cuántos años se celebran los Juegos Olímpicos de Verano?",
        opciones: ["Cada 2 años", "Cada 4 años", "Todos los años"],
        respuestaCorrecta: 1 // Cada 4 años
    },
    {
        pregunta: "En fútbol, ¿qué tarjeta significa expulsión directa?",
        opciones: ["Amarilla", "Roja", "Verde"],
        respuestaCorrecta: 1 // Roja
    },
    {
        pregunta: "¿Qué necesitas para jugar al bádminton además de la raqueta?",
        opciones: ["Una pelota", "Un volante (pluma)", "Un disco"],
        respuestaCorrecta: 1 // Un volante (pluma)
    },
    {
        pregunta: "¿Cómo se llama la carrera ciclista más famosa de Francia?",
        opciones: ["Giro de Italia", "Tour de Francia", "Vuelta a España"],
        respuestaCorrecta: 1 // Tour de Francia
    },
    {
        pregunta: "¿Qué país ganó el Mundial de Fútbol de 2010 en Sudáfrica?",
        opciones: ["Brasil", "España", "Argentina"],
        respuestaCorrecta: 1 // España
    },
    // Cultura General e Historia (37-44)
    {
        pregunta: "¿Quién pintó la Mona Lisa?",
        opciones: ["Picasso", "Leonardo da Vinci", "Van Gogh"],
        respuestaCorrecta: 1 // Leonardo da Vinci
    },
    {
        pregunta: "¿En qué ciudad están las pirámides de Giza?",
        opciones: ["Roma", "El Cairo (cerca)", "Atenas"],
        respuestaCorrecta: 1 // El Cairo (cerca)
    },
    {
        pregunta: "¿Qué instrumento musical tiene teclas blancas y negras?",
        opciones: ["Guitarra", "Piano", "Tambor"],
        respuestaCorrecta: 1 // Piano
    },
    {
        pregunta: "Los dinosaurios vivieron hace millones de años, ¿con quién NO convivieron?",
        opciones: ["Otros reptiles", "Primeros mamíferos", "Seres humanos"],
        respuestaCorrecta: 2 // Seres humanos
    },
    {
        pregunta: "¿Cuál de estos es un famoso personaje de cuento?",
        opciones: ["Harry Potter", "Caperucita Roja", "Bob Esponja"],
        respuestaCorrecta: 1 // Caperucita Roja
    },
     {
        pregunta: "¿Qué inventó Thomas Edison que usamos mucho hoy en día?",
        opciones: ["El teléfono", "La bombilla eléctrica (incandescente)", "El coche"],
        respuestaCorrecta: 1 // La bombilla eléctrica (incandescente)
    },
    {
        pregunta: "¿Cómo se llamaban los barcos de Cristóbal Colón en su primer viaje?",
        opciones: ["La Pinta, La Niña y la Santa María", "El Victoria y el Trinidad", "El Mayflower"],
        respuestaCorrecta: 0 // La Pinta, La Niña y la Santa María
    },
     {
        pregunta: "En la mitología griega, ¿quién era el rey de los dioses?",
        opciones: ["Hércules", "Zeus", "Poseidón"],
        respuestaCorrecta: 1 // Zeus
    },
    // Miscelánea (45-50)
    {
        pregunta: "¿Cuál es la comida más famosa de Italia?",
        opciones: ["Paella", "Pizza", "Sushi"],
        respuestaCorrecta: 1 // Pizza
    },
    {
        pregunta: "¿Qué color se obtiene si mezclas azul y amarillo?",
        opciones: ["Rojo", "Verde", "Naranja"],
        respuestaCorrecta: 1 // Verde
    },
    {
        pregunta: "¿Cuántos días tiene un año bisiesto?",
        opciones: ["365", "366", "360"],
        respuestaCorrecta: 1 // 366
    },
    {
        pregunta: "El papel se hace principalmente de...",
        opciones: ["Plástico", "Madera (celulosa)", "Metal"],
        respuestaCorrecta: 1 // Madera (celulosa)
    },
    {
        pregunta: "¿Qué sentido usamos principalmente para escuchar música?",
        opciones: ["La vista", "El oído", "El olfato"],
        respuestaCorrecta: 1 // El oído
    },
    {
        pregunta: "¿En qué año llegó el hombre a la Luna?",
        opciones: ["1965", "1969", "1972"],
        respuestaCorrecta: 1 // 1969
     },

    // --- Batch 2: Preguntas 51-100 (Dificultad similar/ligeramente mayor) ---
    // Ciencia y Naturaleza (Continuación) (51-60)
    {
        pregunta: "¿Qué planeta de nuestro sistema solar es famoso por sus anillos?",
        opciones: ["Júpiter", "Saturno", "Urano"],
        respuestaCorrecta: 1 // Saturno
    },
    {
        pregunta: "¿Cuál es el estado del agua cuando está congelada?",
        opciones: ["Líquido", "Sólido", "Gaseoso"],
        respuestaCorrecta: 1 // Sólido
    },
    {
        pregunta: "Las abejas producen una sustancia dulce llamada...",
        opciones: ["Mermelada", "Miel", "Jarabe"],
        respuestaCorrecta: 1 // Miel
    },
    {
        pregunta: "¿Qué órgano del cuerpo humano bombea la sangre?",
        opciones: ["Pulmón", "Corazón", "Cerebro"],
        respuestaCorrecta: 1 // Corazón
    },
    {
        pregunta: "¿Por qué cambian de color algunos camaleones?",
        opciones: ["Para jugar al escondite", "Para camuflarse o comunicarse", "Porque se manchan"],
        respuestaCorrecta: 1 // Para camuflarse o comunicarse
    },
     {
        pregunta: "Además de en los polos, ¿dónde encontramos grandes masas de hielo?",
        opciones: ["En los desiertos", "En las altas montañas (glaciares)", "En el fondo del mar"],
        respuestaCorrecta: 1 // En las altas montañas (glaciares)
    },
    {
        pregunta: "¿Qué necesitan los coches (la mayoría) para moverse?",
        opciones: ["Agua", "Gasolina o electricidad", "Zumo de naranja"],
        respuestaCorrecta: 1 // Gasolina o electricidad
    },
     {
        pregunta: "¿Cuál de estos animales es un reptil?",
        opciones: ["Rana", "Serpiente", "Delfín"],
        respuestaCorrecta: 1 // Serpiente
    },
    {
        pregunta: "El esqueleto humano está formado por...",
        opciones: ["Músculos", "Huesos", "Piel"],
        respuestaCorrecta: 1 // Huesos
    },
    {
        pregunta: "¿Qué astro nos da luz y calor durante el día?",
        opciones: ["La Luna", "El Sol", "Marte"],
        respuestaCorrecta: 1 // El Sol
    },
    // Geografía (Continuación) (61-66)
    {
        pregunta: "¿En qué país se encuentra la famosa Torre Eiffel?",
        opciones: ["Italia", "Francia", "Alemania"],
        respuestaCorrecta: 1 // Francia
    },
    {
        pregunta: "¿Cuál es la capital de Australia?",
        opciones: ["Sídney", "Canberra", "Melbourne"],
        respuestaCorrecta: 1 // Canberra
    },
    {
        pregunta: "Un conjunto de islas cercanas entre sí se llama...",
        opciones: ["Península", "Archipiélago", "Continente"],
        respuestaCorrecta: 1 // Archipiélago
    },
    {
        pregunta: "¿Dónde viven los pingüinos emperador?",
        opciones: ["En el desierto del Sahara", "En la Antártida", "En el Polo Norte"],
        respuestaCorrecta: 1 // En la Antártida
    },
    {
        pregunta: "El desierto más grande y cálido del mundo es el...",
        opciones: ["Gobi", "Sahara", "Atacama"],
        respuestaCorrecta: 1 // Sahara
    },
    {
        pregunta: "¿Qué país es conocido por tener forma de chile (ají)?",
        opciones: ["México", "Chile", "Perú"],
        respuestaCorrecta: 1 // Chile
    },
    // Historia y Cultura (Continuación) (67-73)
    {
        pregunta: "¿Qué civilización antigua construyó Machu Picchu?",
        opciones: ["Los Romanos", "Los Incas", "Los Egipcios"],
        respuestaCorrecta: 1 // Los Incas
    },
    {
        pregunta: "¿Quién fue el primer presidente de los Estados Unidos?",
        opciones: ["Abraham Lincoln", "George Washington", "Donald Trump"],
        respuestaCorrecta: 1 // George Washington
    },
    {
        pregunta: "¿Qué instrumento tocaba Mozart cuando era niño?",
        opciones: ["La batería", "El violín y el piano", "La flauta"],
        respuestaCorrecta: 1 // El violín y el piano
    },
    {
        pregunta: "Los jeroglíficos eran un sistema de escritura usado por los antiguos...",
        opciones: ["Griegos", "Egipcios", "Vikingos"],
        respuestaCorrecta: 1 // Egipcios
    },
    {
        pregunta: "¿Qué es la 'pizza margarita'?",
        opciones: ["Una pizza con muchas flores", "Una pizza con tomate, mozzarella y albahaca", "Una pizza en forma de estrella"],
        respuestaCorrecta: 1 // Una pizza con tomate, mozzarella y albahaca
    },
    {
        pregunta: "¿Qué se celebra el 31 de octubre en muchos países, con disfraces y dulces?",
        opciones: ["Navidad", "Halloween", "Carnaval"],
        respuestaCorrecta: 1 // Halloween
    },
     {
        pregunta: "La Gran Muralla fue construida en...",
        opciones: ["Japón", "China", "India"],
        respuestaCorrecta: 1 // China
    },
    // Lengua (Continuación) (74-78)
    {
        pregunta: "¿Qué tipo de palabra indica una acción?",
        opciones: ["Adjetivo", "Verbo", "Sustantivo"],
        respuestaCorrecta: 1 // Verbo
    },
    {
        pregunta: "El plural de 'lápiz' es...",
        opciones: ["Lápizs", "Lápices", "Lápizes"],
        respuestaCorrecta: 1 // Lápices
    },
    {
        pregunta: "Si algo es muy, muy grande, podemos decir que es...",
        opciones: ["Diminuto", "Enorme", "Rápido"],
        respuestaCorrecta: 1 // Enorme
    },
    {
        pregunta: "¿Qué signo usamos al final de una pregunta?",
        opciones: ["Un punto (.)", "Un signo de interrogación (?)", "Una coma (,)"],
        respuestaCorrecta: 1 // Un signo de interrogación (?)
    },
    {
        pregunta: "¿Cuál de estas palabras es un nombre propio?",
        opciones: ["Ciudad", "Río", "París"],
        respuestaCorrecta: 2 // París
    },
    // Matemáticas (Continuación) (79-83)
    {
        pregunta: "¿Cuántos lados iguales tiene un cuadrado?",
        opciones: ["Dos", "Cuatro", "Tres"],
        respuestaCorrecta: 1 // Cuatro
    },
    {
        pregunta: "Si tienes 10 galletas y das 3 a un amigo, ¿cuántas te quedan?",
        opciones: ["3", "7", "13"],
        respuestaCorrecta: 1 // 7
    },
    {
        pregunta: "El resultado de 100 dividido entre 10 es...",
        opciones: ["1000", "10", "90"],
        respuestaCorrecta: 1 // 10
    },
    {
        pregunta: "¿Qué forma tiene una pelota de fútbol?",
        opciones: ["Cúbica", "Esférica", "Piramidal"],
        respuestaCorrecta: 1 // Esférica
    },
    {
        pregunta: "¿Cuánto es 5 + 5 x 2?",
        opciones: ["20", "15", "25"],
        respuestaCorrecta: 1 // 15
    },
    // Deportes (Continuación) (84-88)
    {
        pregunta: "¿Qué se usa para golpear la pelota en el béisbol?",
        opciones: ["Una raqueta", "Un bate", "Un palo de golf"],
        respuestaCorrecta: 1 // Un bate
    },
    {
        pregunta: "En natación, ¿qué estilo consiste en mover los brazos hacia atrás por fuera del agua?",
        opciones: ["Braza", "Mariposa", "Espalda"],
        respuestaCorrecta: 1 // Mariposa
    },
    {
        pregunta: "¿Cuál de estos deportes se juega sobre hielo?",
        opciones: ["Baloncesto", "Hockey sobre hielo", "Voleibol"],
        respuestaCorrecta: 1 // Hockey sobre hielo
    },
    {
        pregunta: "¿Qué gimnasta famosa es conocida por sus increíbles saltos y medallas olímpicas?",
        opciones: ["Serena Williams", "Simone Biles", "Megan Rapinoe"],
        respuestaCorrecta: 1 // Simone Biles
    },
    {
        pregunta: "Para ganar un partido de voleibol, necesitas ganar varios...",
        opciones: ["Goles", "Sets", "Puntos de partido"],
        respuestaCorrecta: 1 // Sets
    },
    // Miscelánea y Curiosidades (Continuación) (89-100)
    {
        pregunta: "¿De qué están hechas principalmente las nubes?",
        opciones: ["Algodón de azúcar", "Pequeñas gotas de agua o cristales de hielo", "Humo"],
        respuestaCorrecta: 1 // Pequeñas gotas de agua o cristales de hielo
    },
    {
        pregunta: "¿Qué animal dice 'mu'?",
        opciones: ["El perro", "La vaca", "El gato"],
        respuestaCorrecta: 1 // La vaca
    },
    {
        pregunta: "¿Para qué sirve principalmente un semáforo?",
        opciones: ["Para decorar la calle", "Para controlar el tráfico de coches y peatones", "Para dar sombra"],
        respuestaCorrecta: 1 // Para controlar el tráfico de coches y peatones
    },
    {
        pregunta: "¿Cuál es el ingrediente principal para hacer palomitas de maíz?",
        opciones: ["Arroz", "Maíz especial", "Trigo"],
        respuestaCorrecta: 1 // Maíz especial
    },
    {
        pregunta: "Si tienes mucho frío, ¿qué ropa te pones?",
        opciones: ["Un bañador", "Un abrigo", "Unas gafas de sol"],
        respuestaCorrecta: 1 // Un abrigo
    },
    {
        pregunta: "Los colores primarios son rojo, azul y...",
        opciones: ["Verde", "Amarillo", "Naranja"],
        respuestaCorrecta: 1 // Amarillo
    },
    {
        pregunta: "¿Qué aparato usamos para ver las estrellas y planetas lejanos?",
        opciones: ["Microscopio", "Telescopio", "Lupa"],
        respuestaCorrecta: 1 // Telescopio
    },
    {
        pregunta: "¿Qué profesional nos ayuda cuando nos duele una muela?",
        opciones: ["El panadero", "El dentista", "El bombero"],
        respuestaCorrecta: 1 // El dentista
    },
    {
        pregunta: "El pan se hace principalmente con agua, levadura y...",
        opciones: ["Azúcar", "Harina", "Salchichas"],
        respuestaCorrecta: 1 // Harina
    },
    {
        pregunta: "¿Qué es un 'cómic'?",
        opciones: ["Una película de risa", "Una historia contada con dibujos y texto", "Un tipo de caramelo"],
        respuestaCorrecta: 1 // Una historia contada con dibujos y texto
    },
    {
        pregunta: "¿Qué animal construye diques en los ríos?",
        opciones: ["El oso", "El castor", "El pato"],
        respuestaCorrecta: 1 // El castor
    },
    {
        pregunta: "¿Qué animal es el logo de Ferrari?",
        opciones: ["León", "Toro", "Caballo"],
        respuestaCorrecta: 2 // Caballo
     },

    // --- Batch 3: Preguntas 101-150 (Mayor Dificultad) ---
    // Ciencia y Naturaleza (Más específico) (101-110)
    {
        pregunta: "¿Qué gas compone la mayor parte del aire que respiramos?",
        opciones: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono"],
        respuestaCorrecta: 1 // Nitrógeno
    },
    {
        pregunta: "Las plantas absorben agua principalmente a través de sus...",
        opciones: ["Hojas", "Raíces", "Flores"],
        respuestaCorrecta: 1 // Raíces
    },
    {
        pregunta: "¿Qué tipo de animal es un murciélago?",
        opciones: ["Ave", "Mamífero", "Insecto"],
        respuestaCorrecta: 1 // Mamífero
    },
    {
        pregunta: "La fuerza que atrae los objetos hacia el centro de la Tierra se llama:",
        opciones: ["Magnetismo", "Gravedad", "Electricidad"],
        respuestaCorrecta: 1 // Gravedad
    },
    {
        pregunta: "¿Cuál de estos NO es un planeta de nuestro Sistema Solar?",
        opciones: ["Venus", "Sirio", "Neptuno"],
        respuestaCorrecta: 1 // Sirio (es una estrella)
    },
    {
        pregunta: "El proceso por el cual una oruga se convierte en mariposa se llama:",
        opciones: ["Evolución", "Metamorfosis", "Nacimiento"],
        respuestaCorrecta: 1 // Metamorfosis
    },
    {
        pregunta: "¿Qué animales tienen sangre fría (su temperatura depende del ambiente)?",
        opciones: ["Perros y gatos", "Reptiles y anfibios", "Pájaros y peces"],
        respuestaCorrecta: 1 // Reptiles y anfibios
    },
    {
        pregunta: "¿Qué parte del ojo controla cuánta luz entra?",
        opciones: ["La retina", "La pupila", "El párpado"],
        respuestaCorrecta: 1 // La pupila
    },
    {
        pregunta: "¿Qué metal es líquido a temperatura ambiente?",
        opciones: ["Hierro", "Mercurio", "Aluminio"],
        respuestaCorrecta: 1 // Mercurio
    },
    {
        pregunta: "Un animal que come solo plantas se llama:",
        opciones: ["Carnívoro", "Herbívoro", "Omnívoro"],
        respuestaCorrecta: 1 // Herbívoro
    },
    // Geografía (Más específico) (111-115)
    {
        pregunta: "¿Cuál es el desierto más grande del mundo (incluyendo fríos)?",
        opciones: ["Sahara", "Antártida", "Gobi"],
        respuestaCorrecta: 1 // Antártida
    },
    {
        pregunta: "¿Qué estrecho separa España de África?",
        opciones: ["Canal de la Mancha", "Estrecho de Gibraltar", "Canal de Suez"],
        respuestaCorrecta: 1 // Estrecho de Gibraltar
    },
    {
        pregunta: "¿Qué país ocupa la mayor parte de la Península Ibérica?",
        opciones: ["Portugal", "España", "Andorra"],
        respuestaCorrecta: 1 // España
    },
    {
        pregunta: "El Monte Everest se encuentra en la cordillera del...",
        opciones: ["Himalaya", "Alpes", "Cáucaso"],
        respuestaCorrecta: 0 // Himalaya
    },
    {
        pregunta: "¿Cuál es la capital de Canadá?",
        opciones: ["Toronto", "Ottawa", "Vancouver"],
        respuestaCorrecta: 1 // Ottawa
    },
    // Historia y Cultura (Más específico) (116-122)
    {
        pregunta: "¿Quién escribió la obra de teatro 'Romeo y Julieta'?",
        opciones: ["Cervantes", "Shakespeare", "Lope de Vega"],
        respuestaCorrecta: 1 // Shakespeare
    },
    {
        pregunta: "¿Qué imperio construyó el Coliseo de Roma?",
        opciones: ["El Imperio Griego", "El Imperio Romano", "El Imperio Egipcio"],
        respuestaCorrecta: 1 // El Imperio Romano
    },
    {
        pregunta: "¿Qué evento marcó el inicio de la Revolución Francesa en 1789?",
        opciones: ["La coronación del rey", "La toma de la Bastilla", "La invención de la guillotina"],
        respuestaCorrecta: 1 // La toma de la Bastilla
    },
    {
        pregunta: "Leonardo da Vinci es famoso por pintar la Mona Lisa y también por diseñar...",
        opciones: ["Edificios modernos", "Máquinas voladoras y otros inventos", "Esculturas de animales"],
        respuestaCorrecta: 1 // Máquinas voladoras y otros inventos
    },
    {
        pregunta: "¿Qué significa la palabra 'Democracia'?",
        opciones: ["Gobierno de los ricos", "Gobierno del pueblo", "Gobierno de un rey"],
        respuestaCorrecta: 1 // Gobierno del pueblo
    },
    {
        pregunta: "¿Qué instrumento musical es el símbolo de Irlanda?",
        opciones: ["La gaita", "El arpa", "El violín"],
        respuestaCorrecta: 1 // El arpa
    },
    {
        pregunta: "¿Qué es el 'origami'?",
        opciones: ["Un tipo de comida japonesa", "El arte japonés de doblar papel", "Un arte marcial"],
        respuestaCorrecta: 1 // El arte japonés de doblar papel
    },
    // Lengua (Más específico) (123-127)
    {
        pregunta: "Una palabra que suena igual que otra pero significa algo diferente se llama:",
        opciones: ["Sinónimo", "Homófona", "Antónimo"],
        respuestaCorrecta: 1 // Homófona
    },
    {
        pregunta: "¿Qué es un palíndromo?",
        opciones: ["Una palabra muy larga", "Una palabra o frase que se lee igual al revés", "Un tipo de rima"],
        respuestaCorrecta: 1 // Una palabra o frase que se lee igual al revés
    },
    {
        pregunta: "El conjunto de letras de un idioma ordenadas se llama:",
        opciones: ["Diccionario", "Alfabeto (o Abecedario)", "Gramática"],
        respuestaCorrecta: 1 // Alfabeto (o Abecedario)
    },
    {
        pregunta: "¿Qué significa el prefijo 'sub-' en palabras como 'submarino'?",
        opciones: ["Encima", "Debajo", "Al lado"],
        respuestaCorrecta: 1 // Debajo
    },
    {
        pregunta: "En la frase 'Cantamos alegremente', ¿qué tipo de palabra es 'alegremente'?",
        opciones: ["Adjetivo", "Adverbio", "Verbo"],
        respuestaCorrecta: 1 // Adverbio
    },
    // Matemáticas (Más específico) (128-132)
    {
        pregunta: "¿Cuántos grados tiene un ángulo recto?",
        opciones: ["45 grados", "90 grados", "180 grados"],
        respuestaCorrecta: 1 // 90 grados
    },
    {
        pregunta: "El número romano 'C' representa el número...",
        opciones: ["50", "100", "1000"],
        respuestaCorrecta: 1 // 100
    },
    {
        pregunta: "Si un reloj marca las 3:15 PM, ¿cuántos minutos faltan para las 4:00 PM?",
        opciones: ["15 minutos", "45 minutos", "60 minutos"],
        respuestaCorrecta: 1 // 45 minutos
    },
    {
        pregunta: "¿Qué es un número primo?",
        opciones: ["Un número que es par", "Un número solo divisible por 1 y por sí mismo", "Un número que termina en 5"],
        respuestaCorrecta: 1 // Un número solo divisible por 1 y por sí mismo
    },
    {
        pregunta: "¿Cuál es el perímetro de un cuadrado cuyo lado mide 5 cm?",
        opciones: ["10 cm", "20 cm", "25 cm"],
        respuestaCorrecta: 1 // 20 cm
    },
    // Deportes (Más específico) (133-137)
    {
        pregunta: "En tenis, si el marcador está 40-40, se dice que es...",
        opciones: ["Punto de partido", "Deuce (Iguales)", "Ventaja"],
        respuestaCorrecta: 1 // Deuce (Iguales)
    },
    {
        pregunta: "¿Qué país es famoso por inventar el Judo?",
        opciones: ["China", "Japón", "Corea"],
        respuestaCorrecta: 1 // Japón
    },
    {
        pregunta: "¿Cuántos hoyos tiene un recorrido estándar de golf?",
        opciones: ["9", "18", "27"],
        respuestaCorrecta: 1 // 18
    },
    {
        pregunta: "¿Qué significan las siglas 'NBA' en baloncesto?",
        opciones: ["National Ball Association", "National Basketball Association", "New Basketball Aspirants"],
        respuestaCorrecta: 1 // National Basketball Association
    },
    {
        pregunta: "El 'maillot amarillo' en el Tour de Francia lo lleva...",
        opciones: ["El ciclista más joven", "El líder de la clasificación general", "El ganador de la etapa anterior"],
        respuestaCorrecta: 1 // El líder de la clasificación general
    },
    // Miscelánea y Curiosidades (Más específico) (138-150)
    {
        pregunta: "¿Qué es la 'Vía Láctea'?",
        opciones: ["Una marca de chocolate", "Nuestra galaxia", "Una carretera espacial"],
        respuestaCorrecta: 1 // Nuestra galaxia
    },
    {
        pregunta: "¿Qué significan las siglas 'CPU' en un ordenador?",
        opciones: ["Control Panel Unit", "Central Processing Unit", "Computer Power Unit"],
        respuestaCorrecta: 1 // Central Processing Unit
    },
    {
        pregunta: "¿Qué se mide con un termómetro?",
        opciones: ["La distancia", "La temperatura", "El peso"],
        respuestaCorrecta: 1 // La temperatura
    },
    {
        pregunta: "Un grupo de lobos se llama...",
        opciones: ["Rebaño", "Manada", "Piara"],
        respuestaCorrecta: 1 // Manada
    },
    {
        pregunta: "¿Cuál de estos NO es un instrumento de viento?",
        opciones: ["Flauta", "Trompeta", "Violonchelo"],
        respuestaCorrecta: 2 // Violonchelo
    },
    {
        pregunta: "¿Qué país regaló la Estatua de la Libertad a Estados Unidos?",
        opciones: ["Reino Unido", "Francia", "España"],
        respuestaCorrecta: 1 // Francia
    },
    {
        pregunta: "¿Qué significan las siglas 'SOS' en código Morse?",
        opciones: ["Save Our Ship (Salven nuestro barco)", "Es una señal de auxilio internacional", "Save Our Souls (Salven nuestras almas)"],
        respuestaCorrecta: 1 // Es una señal de auxilio internacional
    },
    {
        pregunta: "¿Cuántos colores tiene el arcoíris tradicionalmente?",
        opciones: ["Cinco", "Siete", "Nueve"],
        respuestaCorrecta: 1 // Siete
    },
    {
        pregunta: "¿Qué es un 'lustro'?",
        opciones: ["Un periodo de 10 años", "Un periodo de 5 años", "Un objeto brillante"],
        respuestaCorrecta: 1 // Un periodo de 5 años
    },
    {
        pregunta: "¿De qué personaje de ficción es la frase 'Elemental, mi querido Watson'?",
        opciones: ["Hercules Poirot", "Sherlock Holmes", "Batman"],
        respuestaCorrecta: 1 // Sherlock Holmes
    },
    {
       pregunta: "¿A qué temperatura en grados Celsius se congela el agua?",
       opciones: ["100 grados", "0 grados", "-10 grados"],
       respuestaCorrecta: 1 // 0 grados
    },
    {
       pregunta: "La parte roja dentro de nuestra sangre que transporta oxígeno se llama:",
       opciones: ["Plasma", "Glóbulos rojos (Hemoglobina)", "Glóbulos blancos"],
       respuestaCorrecta: 1 // Glóbulos rojos
    },
    {
       pregunta: "¿Qué es un 'delta' en geografía?",
       opciones: ["Una letra griega", "La desembocadura de un río con forma de triángulo", "Una montaña muy alta"],
       respuestaCorrecta: 1 // Desembocadura de río
    },
    // ... (tus 150 preguntas anteriores aquí) ...
// Asegúrate de que la última pregunta anterior tenga una coma al final

// --- Bloque de Preguntas Verdadero/Falso ---
    {
        pregunta: "El Sol es una estrella.",
        tipo: 'vf', // Indica que es Verdadero/Falso
        respuestaCorrecta: true
    },
    {
        pregunta: "Los pingüinos pueden volar.",
        tipo: 'vf',
        respuestaCorrecta: false
    },
    {
        pregunta: "El agua hierve a 100 grados Celsius al nivel del mar.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "Los tiburones son mamíferos.",
        tipo: 'vf',
        respuestaCorrecta: false // Son peces cartilaginosos
    },
    {
        pregunta: "La capital de España es Barcelona.",
        tipo: 'vf',
        respuestaCorrecta: false // Es Madrid
    },
    {
        pregunta: "Los humanos tenemos 5 sentidos principales.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "El río Amazonas es más largo que el Nilo.",
        tipo: 'vf',
        respuestaCorrecta: true // Según mediciones más recientes
    },
    {
        pregunta: "Los plátanos crecen en árboles.",
        tipo: 'vf',
        respuestaCorrecta: false // Crecen en plantas herbáceas gigantes
    },
    {
        pregunta: "Júpiter es el planeta más grande de nuestro Sistema Solar.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "Los murciélagos son ciegos.",
        tipo: 'vf',
        respuestaCorrecta: false // Usan ecolocalización, pero no son ciegos
    },
    {
        pregunta: "La Gran Muralla China se puede ver desde la Luna.",
        tipo: 'vf',
        respuestaCorrecta: false // Es un mito popular
    },
    {
        pregunta: "El corazón humano tiene cuatro cámaras.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "Los dinosaurios se extinguieron por un meteorito.",
        tipo: 'vf',
        respuestaCorrecta: true // Es la teoría más aceptada
    },
    {
        pregunta: "El desierto del Sahara está en América del Sur.",
        tipo: 'vf',
        respuestaCorrecta: false // Está en África
    },
    {
        pregunta: "Las arañas son insectos.",
        tipo: 'vf',
        respuestaCorrecta: false // Son arácnidos (8 patas)
    },
    // --- Preguntas sobre Málaga (151-200) ---
    // === Lugares Emblemáticos ===
    {
        pregunta: "¿Cómo se llama el castillo árabe que está en una colina junto a la Alcazaba?",
        opciones: ["Castillo de Colomares", "Castillo de Gibralfaro", "Castillo de Sohail"],
        respuestaCorrecta: 1 // Gibralfaro - Cercana: Sohail (Fuengirola), Lejana: Colomares (Benalmádena)
    },
    {
        pregunta: "A la Catedral de Málaga le falta una torre, por eso la llaman...",
        opciones: ["La Chata", "La Manquita", "La Coja"],
        respuestaCorrecta: 1 // La Manquita - Cercana: La Coja, Lejana: La Chata
    },
    {
        pregunta: "¿Qué famoso pintor malagueño tiene un museo muy importante cerca de la Catedral?",
        opciones: ["Velázquez", "Picasso", "Dalí"],
        respuestaCorrecta: 1 // Picasso - Cercana: Dalí (otro gran pintor español), Lejana: Velázquez
    },
    {
        pregunta: "La calle más famosa y elegante para pasear en el centro de Málaga se llama:",
        opciones: ["Calle Granada", "Calle Marqués de Larios", "Paseo del Parque"],
        respuestaCorrecta: 1 // Calle Larios - Cercana: Calle Granada (también céntrica), Lejana: Paseo del Parque
    },
    {
        pregunta: "¿Qué antiguo teatro se descubrió cerca de la Alcazaba?",
        opciones: ["Teatro Griego", "Teatro Romano", "Teatro Egipcio"],
        respuestaCorrecta: 1 // Teatro Romano - Cercana: Griego (relacionado), Lejana: Egipcio
    },
    {
        pregunta: "¿Cómo se llama el gran parque con muchas plantas y árboles que está junto al puerto?",
        opciones: ["Parque de Huelin", "Parque de Málaga (o Paseo del Parque)", "Jardín Botánico La Concepción"],
        respuestaCorrecta: 1 // Parque de Málaga - Cercana: Jardín Botánico (otro jardín importante), Lejana: Parque de Huelin
    },
    {
        pregunta: "El edificio moderno y colorido con forma de cubo en el Muelle Uno es una sede del museo...",
        opciones: ["Museo Ruso", "Centro Pompidou", "Museo del Automóvil"],
        respuestaCorrecta: 1 // Centro Pompidou - Cercana: Museo Ruso (otro museo internacional en Málaga), Lejana: Museo del Automóvil
    },
    {
        pregunta: "¿Dónde puedes ver muchos coches y vestidos antiguos en Málaga?",
        opciones: ["Museo Carmen Thyssen", "Museo Automovilístico y de la Moda", "CAC Málaga"],
        respuestaCorrecta: 1 // Museo Automovilístico - Cercana: Carmen Thyssen (arte), Lejana: CAC (arte contemporáneo)
    },
     {
        pregunta: "¿Cómo se llama el mercado principal del centro, con una gran puerta de estilo árabe?",
        opciones: ["Mercado de Salamanca", "Mercado de Atarazanas", "Mercado de Huelin"],
        respuestaCorrecta: 1 // Atarazanas - Cercana: Salamanca/Huelin (otros mercados), Lejana: Salamanca elegido
    },
    {
        pregunta: "Verdadero o Falso: La Alcazaba de Málaga es más antigua que la Alhambra de Granada.",
        tipo: 'vf',
        respuestaCorrecta: true // Su construcción principal empezó antes.
    },
    // === Geografía y Naturaleza Local ===
    {
        pregunta: "¿Cómo se llama el río principal que pasa por Málaga?",
        opciones: ["Guadalquivir", "Guadalhorce", "Guadiana"],
        respuestaCorrecta: 1 // Guadalhorce - Cercana: Guadalquivir/Guadiana (ríos andaluces), Lejana: Guadiana elegido
    },
    {
        pregunta: "Málaga es la capital de la famosa costa llamada:",
        opciones: ["Costa Brava", "Costa del Sol", "Costa Blanca"],
        respuestaCorrecta: 1 // Costa del Sol - Cercana: Costa Blanca (Alicante) / Costa Brava (Girona)
    },
    {
        pregunta: "La playa más famosa y céntrica de Málaga se llama:",
        opciones: ["Playa de Pedregalejo", "Playa de la Malagueta", "Playa de los Álamos"],
        respuestaCorrecta: 1 // Malagueta - Cercana: Pedregalejo (cercana y popular), Lejana: Los Álamos (Torremolinos)
    },
    {
        pregunta: "Verdadero o Falso: Málaga tiene montañas muy cerca de la ciudad.",
        tipo: 'vf',
        respuestaCorrecta: true // Los Montes de Málaga
    },
    {
        pregunta: "En verano, en Málaga es típico ver vendedores de una flor hecha con jazmines pinchados, llamada:",
        opciones: ["Farola", "Biznaga", "Espeto"],
        respuestaCorrecta: 1 // Biznaga - Cercana: Farola (símbolo cercano), Lejana: Espeto (comida)
    },
     {
        pregunta: "¿Qué parque natural importante se encuentra en los montes cercanos a Málaga?",
        opciones: ["Parque Nacional de Doñana", "Parque Natural Montes de Málaga", "Parque Natural Sierra Nevada"],
        respuestaCorrecta: 1 // Montes de Málaga - Cercana: Sierra Nevada (relativamente cerca), Lejana: Doñana (Huelva)
    },
    // === Comida Típica ===
    {
        pregunta: "¿Qué pescado pequeño, frito o en vinagre, es tan típico de Málaga que a los malagueños les llaman así?",
        opciones: ["Sardinas", "Boquerones", "Gambas"],
        respuestaCorrecta: 1 // Boquerones - Cercana: Sardinas (también típicas), Lejana: Gambas
    },
    {
        pregunta: "La forma más tradicional de cocinar sardinas en la playa en Málaga es en un...",
        opciones: ["Horno de leña", "Espeto (caña en la arena)", "Sartén gigante"],
        respuestaCorrecta: 1 // Espeto - Cercana: Sartén, Lejana: Horno
    },
    {
        pregunta: "Verdadero o Falso: La 'Porra Antequerana' es una sopa caliente típica de invierno en Málaga.",
        tipo: 'vf',
        respuestaCorrecta: false // Es una sopa fría, similar al salmorejo.
    },
    {
        pregunta: "Un vino dulce muy famoso de Málaga se hace con uva...",
        opciones: ["Tempranillo", "Moscatel", "Verdejo"],
        respuestaCorrecta: 1 // Moscatel - Cercana: Verdejo (uva blanca), Lejana: Tempranillo (uva tinta)
    },
    // === Historia y Curiosidades ===
    {
        pregunta: "¿Qué pueblo antiguo fundó Málaga y le dio el nombre de 'Malaka'?",
        opciones: ["Romanos", "Fenicios", "Griegos"],
        respuestaCorrecta: 1 // Fenicios - Cercana: Griegos/Romanos (también estuvieron), Lejana: Griegos elegido
    },
    {
        pregunta: "Verdadero o Falso: El famoso pintor Picasso nació en la ciudad de Málaga.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Quién conquistó Málaga a los musulmanes en 1487?",
        opciones: ["Napoleón Bonaparte", "Los Reyes Católicos", "Julio César"],
        respuestaCorrecta: 1 // Reyes Católicos - Cercana: Julio César (época romana), Lejana: Napoleón
    },
    {
        pregunta: "El aeropuerto de Málaga lleva el nombre de Málaga y también de...",
        opciones: ["Picasso", "Costa del Sol", "Antonio Banderas"],
        respuestaCorrecta: 1 // Costa del Sol (Aeropuerto de Málaga-Costa del Sol) - Cercana: Picasso, Lejana: Antonio Banderas
    },
     {
        pregunta: "Un actor muy famoso de Hollywood que nació en Málaga es:",
        opciones: ["Javier Bardem", "Antonio Banderas", "Penélope Cruz"],
        respuestaCorrecta: 1 // Antonio Banderas - Cercana: Javier Bardem (actor español famoso), Lejana: Penélope Cruz (actriz)
    },
     {
        pregunta: "Verdadero o Falso: Málaga fue una ciudad muy importante durante la época romana.",
        tipo: 'vf',
        respuestaCorrecta: true // Tuvo teatro, puerto, factorías de salazón...
    },
    {
        pregunta: "¿Qué eran las 'Atarazanas', donde ahora está el mercado?",
        opciones: ["Un palacio árabe", "Unos astilleros (donde se hacían barcos)", "Unas termas romanas"],
        respuestaCorrecta: 1 // Astilleros nazaríes - Cercana: Palacio árabe, Lejana: Termas romanas
    },
    // === Fiestas y Tradiciones ===
    {
        pregunta: "¿En qué mes se celebra la Feria de Málaga?",
        opciones: ["Abril", "Agosto", "Diciembre"],
        respuestaCorrecta: 1 // Agosto - Cercana: Abril (feria de Sevilla), Lejana: Diciembre
    },
    {
        pregunta: "Durante la Semana Santa de Málaga, las imágenes religiosas se llevan en grandes estructuras llamadas...",
        opciones: ["Carrozas", "Tronos", "Pasos"],
        respuestaCorrecta: 1 // Tronos (característica diferencial de Málaga) - Cercana: Pasos (nombre más común en otras ciudades), Lejana: Carrozas
    },
    {
        pregunta: "Verdadero o Falso: En la Feria de Málaga, es típico beber vino Cartojal.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "Los 'Verdiales' son un tipo de...",
        opciones: ["Comida típica de Navidad", "Música y baile folclórico de los Montes de Málaga", "Juego de cartas antiguo"],
        respuestaCorrecta: 1 // Música y baile - Cercana: Comida, Lejana: Juego de cartas
    },
     {
        pregunta: "¿Qué día especial se celebra en Málaga la noche del 23 de junio con hogueras en la playa?",
        opciones: ["Nochevieja", "Noche de San Juan", "Día de Andalucía"],
        respuestaCorrecta: 1 // San Juan - Cercana: Día de Andalucía, Lejana: Nochevieja
    },
    // === Deportes Locales ===
    {
        pregunta: "¿Cómo se llama el principal equipo de fútbol de Málaga?",
        opciones: ["Sevilla FC", "Málaga CF", "Real Betis"],
        respuestaCorrecta: 1 // Málaga CF - Cercana: Sevilla/Betis (equipos andaluces), Lejana: Sevilla FC elegido
    },
    {
        pregunta: "El equipo de baloncesto más importante de Málaga, que juega en un pabellón llamado Carpena, es el...",
        opciones: ["Real Madrid Baloncesto", "Unicaja Baloncesto", "FC Barcelona Bàsquet"],
        respuestaCorrecta: 1 // Unicaja - Cercana: Real Madrid/Barcelona (grandes equipos ACB), Lejana: FC Barcelona elegido
    },
    {
        pregunta: "Verdadero o Falso: El estadio de fútbol del Málaga CF se llama La Rosaleda.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
     {
        pregunta: "¿Qué deporte acuático es muy popular en las playas de Málaga en verano?",
        opciones: ["Esquí alpino", "Surf de remo (Paddle Surf)", "Patinaje sobre hielo"],
        respuestaCorrecta: 1 // Paddle Surf - Cercana: Esquí (si piensan en acuático), Lejana: Patinaje sobre hielo
    },
    // === Más Curiosidades y General ===
    {
        pregunta: "El gentilicio (cómo se llama a la gente) de Málaga es 'malagueño' o también...",
        opciones: ["Malaguita", "Boquerón / Boquerona", "Malagueño del sur"],
        respuestaCorrecta: 1 // Boquerón / Boquerona - Cercana: Malaguita, Lejana: Malagueño del sur
    },
    {
        pregunta: "¿Qué mar baña la costa de Málaga?",
        opciones: ["Mar Cantábrico", "Mar Mediterráneo", "Océano Atlántico"],
        respuestaCorrecta: 1 // Mediterráneo - Cercana: Atlántico (cerca, pasado Gibraltar), Lejana: Cantábrico
    },
    {
        pregunta: "Verdadero o Falso: El Jardín Botánico La Concepción tiene plantas de todo el mundo.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué famoso dulce navideño se dice que tiene origen en la zona de Málaga (Antequera)?",
        opciones: ["Turrón", "Mantecado", "Roscón de Reyes"],
        respuestaCorrecta: 1 // Mantecado - Cercana: Turrón, Lejana: Roscón
    },
    {
        pregunta: "El clima de Málaga, con inviernos suaves y veranos cálidos, es de tipo...",
        opciones: ["Polar", "Mediterráneo", "Tropical lluvioso"],
        respuestaCorrecta: 1 // Mediterráneo - Cercana: Tropical (por el calor), Lejana: Polar
    },
    {
        pregunta: "¿Qué número de teléfono se usa en España para emergencias (policía, bomberos, ambulancia)?",
        opciones: ["091", "112", "080"],
        respuestaCorrecta: 1 // 112 (europeo) - Cercana: 091 (Policía Nacional) / 080 (Bomberos, puede variar), Lejana: 091 elegido
    },
     {
        pregunta: "Verdadero o Falso: En Málaga hay un museo dedicado solo a la música.",
        tipo: 'vf',
        respuestaCorrecta: true // El MIMMA (Museo Interactivo de la Música Málaga)
    },
     {
        pregunta: "¿Cómo se llama el paseo marítimo principal junto a la playa de la Malagueta?",
        opciones: ["Paseo de la Farola", "Paseo Marítimo Pablo Ruiz Picasso", "Muelle Uno"],
        respuestaCorrecta: 1 // Pablo Ruiz Picasso - Cercana: Muelle Uno (está al lado) / Paseo de la Farola (también cercano)
    },
    {
        pregunta: "La noria gigante que a veces instalan cerca del puerto ofrece buenas...",
        opciones: ["Comidas", "Vistas de la ciudad", "Clases de historia"],
        respuestaCorrecta: 1 // Vistas - Cercana: Comidas (puede haber puestos cerca), Lejana: Clases
    },
    {
        pregunta: "Si quieres ir de Málaga a Marruecos en barco, ¿desde qué parte de la ciudad sale el ferry?",
        opciones: ["Desde el aeropuerto", "Desde el Puerto de Málaga", "Desde la estación de tren"],
        respuestaCorrecta: 1 // Puerto - Cercana: Aeropuerto (viajes), Lejana: Estación de tren
    },
    {
        pregunta: "Verdadero o Falso: El Caminito del Rey es un sendero peligroso NO apto para niños.",
        tipo: 'vf',
        respuestaCorrecta: false // Antes era muy peligroso, ahora está rehabilitado y es seguro (con edad mínima, eso sí). Para 9-12 años es apto.
    },
    {
        pregunta: "¿Qué museo malagueño tiene muchas pinturas de artistas andaluces del siglo XIX?",
        opciones: ["Museo Picasso", "Museo Carmen Thyssen", "CAC Málaga"],
        respuestaCorrecta: 1 // Carmen Thyssen - Cercana: Picasso (otro museo de arte), Lejana: CAC (contemporáneo)
    },
    {
        pregunta: "El barrio de pescadores junto a la Malagueta, famoso por sus restaurantes de pescado, se llama:",
        opciones: ["El Palo", "Pedregalejo", "Huelin"],
        respuestaCorrecta: 1 // Pedregalejo - Cercana: El Palo (barrio vecino similar), Lejana: Huelin
    },
    // --- Preguntas Juventud Torremolinos (201-210) ---
    {
        pregunta: "¿Cuál es el color principal de la camiseta del Juventud de Torremolinos?",
        opciones: ["Rojo", "Verde", "Azul"],
        respuestaCorrecta: 1 // Verde
    },
    {
        pregunta: "¿En qué ciudad juega el Juventud de Torremolinos?",
        opciones: ["Málaga", "Benalmádena", "Torremolinos"],
        respuestaCorrecta: 2 // Torremolinos
    },
    {
        pregunta: "¿Cómo se llama el campo de fútbol donde juega el Juventud de Torremolinos?",
        opciones: ["La Rosaleda", "El Pozuelo", "Ciudad de Málaga"],
        respuestaCorrecta: 1 // Estadio Municipal El Pozuelo
    },
    {
        pregunta: "El principal deporte del Juventud de Torremolinos es el...",
        opciones: ["Baloncesto", "Fútbol", "Balonmano"],
        respuestaCorrecta: 1 // Fútbol
    },
    {
        pregunta: "Verdadero o Falso: El Juventud de Torremolinos se fundó hace más de 50 años.",
        tipo: 'vf',
        respuestaCorrecta: true // Se fundó en 1958.
    },
    {
        pregunta: "Verdadero o Falso: El escudo del Juventud de Torremolinos tiene una torre.",
        tipo: 'vf',
        respuestaCorrecta: true // Sí, incluye la Torre de Pimentel o de los Molinos.
    },
    {
        pregunta: "¿Contra qué equipo famoso de Primera División jugó el Juventud de Torremolinos en la Copa del Rey en diciembre de 2022?",
        opciones: ["Real Madrid", "FC Barcelona", "Sevilla FC"],
        respuestaCorrecta: 2 // Sevilla FC
    },
    {
        pregunta: "El Juventud de Torremolinos juega normalmente en categorías como Tercera o Segunda...",
        opciones: ["Champions League", "Federación (RFEF)", "División de Honor Juvenil"],
        respuestaCorrecta: 1 // Tercera Federación / Segunda Federación (RFEF)
    },
    {
        pregunta: "Verdadero o Falso: El Juventud de Torremolinos nunca ha jugado contra el Málaga CF en partido oficial.",
        tipo: 'vf',
        respuestaCorrecta: false // Han coincidido en categorías inferiores o Copa Federación en el pasado.
    },
    {
        pregunta: "Las letras 'CF' en Juventud de Torremolinos CF significan:",
        opciones: ["Campo de Fútbol", "Club de Fútbol", "Ciudad Famosa"],
        respuestaCorrecta: 1 // Club de Fútbol
    },
    // --- Preguntas Policía Nacional (211-220) ---
    {
        pregunta: "¿Cuál es el color principal del uniforme de la Policía Nacional?",
        opciones: ["Verde oscuro", "Azul marino", "Negro"],
        respuestaCorrecta: 1 // Azul marino - Cercana: Negro, Lejana: Verde (Guardia Civil)
    },
    {
        pregunta: "Si necesitas ayuda URGENTE de la Policía Nacional, ¿qué número corto puedes marcar?",
        opciones: ["112", "091", "062"],
        respuestaCorrecta: 1 // 091 - Cercana: 112 (Emergencias generales), Lejana: 062 (Guardia Civil)
    },
    {
        pregunta: "¿Cuál es una de las tareas más importantes de la Policía Nacional?",
        opciones: ["Apagar incendios", "Proteger a los ciudadanos y detener delincuentes", "Enseñar en los colegios"],
        respuestaCorrecta: 1 // Proteger ciudadanos... - Cercana: Enseñar (a veces dan charlas), Lejana: Apagar incendios (Bomberos)
    },
    {
        pregunta: "Además de coches y motos, ¿qué vehículo aéreo utiliza a veces la Policía Nacional?",
        opciones: ["Globos aerostáticos", "Helicópteros", "Aviones caza"],
        respuestaCorrecta: 1 // Helicópteros - Cercana: Aviones (menos común para patrulla), Lejana: Globos
    },
    {
        pregunta: "Verdadero o Falso: La Policía Nacional trabaja principalmente en las ciudades grandes.",
        tipo: 'vf',
        respuestaCorrecta: true // La Guardia Civil suele cubrir más zonas rurales.
    },
    {
        pregunta: "¿Cómo se llama oficialmente el cuerpo de la Policía Nacional?",
        opciones: ["Policía Española", "Cuerpo Nacional de Policía", "Guardia Urbana"],
        respuestaCorrecta: 1 // Cuerpo Nacional de Policía - Cercana: Policía Española (genérico), Lejana: Guardia Urbana (Policía Local)
    },
    {
        pregunta: "¿Qué llevan los policías nacionales en el uniforme para que sepamos quiénes son?",
        opciones: ["Una pegatina de estrella", "Su escudo oficial", "Un dibujo de un coche"],
        respuestaCorrecta: 1 // Escudo oficial - Cercana: Estrella (símbolo policial genérico), Lejana: Dibujo coche
    },
    {
        pregunta: "Verdadero o Falso: La Policía Nacional y la Guardia Civil son exactamente el mismo cuerpo policial.",
        tipo: 'vf',
        respuestaCorrecta: false // Son cuerpos diferentes con funciones a veces distintas.
    },
    {
        pregunta: "¿En qué ciudad está la escuela principal donde se forman los futuros policías nacionales?",
        opciones: ["Madrid", "Ávila", "Sevilla"],
        respuestaCorrecta: 1 // Ávila - Cercana: Madrid (capital), Lejana: Sevilla
    },
    {
        pregunta: "Si ves a la Policía Nacional investigando algo con perros especiales, ¿qué podrían estar buscando?",
        opciones: ["Huellas dactilares", "Drogas o explosivos", "Micrófonos ocultos"],
        respuestaCorrecta: 1 // Drogas o explosivos - Cercana: Huellas (lo hacen personas), Lejana: Micrófonos
    },
    // --- Preguntas Policía Local de Málaga (221-230) ---
    {
        pregunta: "¿Cuál es el color predominante en los coches y uniformes de la Policía Local de Málaga?",
        opciones: ["Verde", "Azul (con blanco)", "Amarillo reflectante"],
        respuestaCorrecta: 1 // Azul y blanco son sus colores característicos. Cercana: Amarillo (chalecos), Lejana: Verde (Guardia Civil)
    },
    {
        pregunta: "Si ves un coche patrulla que pone 'Policía Local' y tiene el escudo de Málaga, ¿quiénes son?",
        opciones: ["La Guardia Civil", "La Policía Local de Málaga", "La Policía Nacional"],
        respuestaCorrecta: 1 // Policía Local - Cercana: Nacional (también policía), Lejana: Guardia Civil
    },
    {
        pregunta: "Una de las tareas MÁS visibles de la Policía Local en Málaga es:",
        opciones: ["Investigar crímenes muy graves", "Dirigir el tráfico y poner multas de aparcamiento", "Controlar los pasaportes en el aeropuerto"],
        respuestaCorrecta: 1 // Tráfico y ordenanzas - Cercana: Investigar (pero Nacional/GC más), Lejana: Pasaportes (Nacional)
    },
    {
        pregunta: "¿A qué número de teléfono corto puedes llamar si necesitas *específicamente* a la Policía Local (en muchas ciudades de España)?",
        opciones: ["091", "092", "112"],
        respuestaCorrecta: 1 // 092 (Número corto tradicional Local) - Cercana: 112 (Emergencias generales, incluye Local), Lejana: 091 (Nacional)
    },
    {
        pregunta: "Verdadero o Falso: La Policía Local de Málaga se encarga principalmente de la seguridad DENTRO de la ciudad de Málaga.",
        tipo: 'vf',
        respuestaCorrecta: true // Su ámbito es municipal.
    },
    {
        pregunta: "¿Qué suelen llevar los Policías Locales en el brazo de su uniforme?",
        opciones: ["Un reloj muy grande", "El escudo de Málaga", "Una linterna"],
        respuestaCorrecta: 1 // Escudo de Málaga - Cercana: Reloj, Lejana: Linterna
    },
    {
        pregunta: "Si hay un problema con el ruido de un vecino por la noche, ¿a quién es más probable que llames?",
        opciones: ["A los Bomberos", "A la Policía Local", "Al Ejército"],
        respuestaCorrecta: 1 // Policía Local (ordenanzas municipales) - Cercana: Bomberos (otro servicio), Lejana: Ejército
    },
    {
        pregunta: "Verdadero o Falso: La Policía Local de Málaga también ayuda a organizar el tráfico durante la Feria o Semana Santa.",
        tipo: 'vf',
        respuestaCorrecta: true // Es una de sus funciones importantes en eventos.
    },
    {
        pregunta: "La oficina principal (Jefatura) de la Policía Local de Málaga está cerca de:",
        opciones: ["La playa de la Malagueta", "El estadio de La Rosaleda", "El aeropuerto"],
        respuestaCorrecta: 1 // Cerca de La Rosaleda (Av. de la Rosaleda) - Cercana: Malagueta, Lejana: Aeropuerto
    },
    {
        pregunta: "Si encuentras una cartera perdida en la calle en Málaga, ¿dónde la podrías llevar?",
        opciones: ["A una tienda de ropa", "A la oficina de objetos perdidos de la Policía Local", "A la estación de autobuses"],
        respuestaCorrecta: 1 // Policía Local (Objetos Perdidos) - Cercana: Estación de autobuses (a veces tienen), Lejana: Tienda
    },
    // --- Bloque Adicional: Preguntas 231-310 ---

    // === Categoría 3: Libros, Arte y Música (Más allá de lo básico) (231-250) ===
    {
        pregunta: "¿Qué famoso museo se encuentra en París y alberga la Mona Lisa?",
        opciones: ["El Prado (Madrid)", "El Louvre", "El British Museum (Londres)"],
        respuestaCorrecta: 1 // Louvre
    },
    {
        pregunta: "En música, ¿qué significa 'forte' (como indicación, no el instrumento)?",
        opciones: ["Tocar muy rápido", "Tocar suavemente", "Tocar fuerte"],
        respuestaCorrecta: 2 // Fuerte
    },
    {
        pregunta: "Verdadero o Falso: Los cómics de superhéroes como Spider-Man o Batman son originarios de Japón.",
        tipo: 'vf',
        respuestaCorrecta: false // Son principalmente de EE.UU. (Manga es el estilo japonés).
    },
    {
        pregunta: "¿Qué instrumento musical grande tiene muchas cuerdas y se toca sentado usando pedales?",
        opciones: ["Violonchelo", "Arpa", "Contrabajo"],
        respuestaCorrecta: 1 // Arpa
    },
    {
        pregunta: "Un cuadro que representa objetos como frutas, flores o cacharros se llama:",
        opciones: ["Retrato", "Bodegón (o Naturaleza muerta)", "Paisaje"],
        respuestaCorrecta: 1 // Bodegón
    },
    {
        pregunta: "¿Qué escritor español creó al personaje 'Capitán Alatriste'?",
        opciones: ["Carlos Ruiz Zafón", "Arturo Pérez-Reverte", "Javier Sierra"],
        respuestaCorrecta: 1 // Pérez-Reverte
    },
    {
        pregunta: "Verdadero o Falso: La 'Sinfonía nº 5' con el famoso 'ta-ta-ta-TAAAN' fue compuesta por Mozart.",
        tipo: 'vf',
        respuestaCorrecta: false // Fue Beethoven.
    },
    {
        pregunta: "¿Qué tipo de arte utiliza arcilla o barro que luego se cuece en un horno?",
        opciones: ["Escultura en madera", "Cerámica", "Pintura al óleo"],
        respuestaCorrecta: 1 // Cerámica
    },
    {
        pregunta: "En un libro, la lista de capítulos al principio se llama:",
        opciones: ["Índice", "Epílogo", "Prólogo"],
        respuestaCorrecta: 0 // Índice
    },
    {
        pregunta: "La guitarra eléctrica necesita conectarse a un... para sonar fuerte.",
        opciones: ["Micrófono", "Altavoz", "Amplificador"],
        respuestaCorrecta: 2 // Amplificador
    },
     {
        pregunta: "¿Quién escribió la serie de libros 'Las Crónicas de Narnia'?",
        opciones: ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling"],
        respuestaCorrecta: 1 // C.S. Lewis
    },
    {
        pregunta: "El estilo de pintura que usa pequeños puntos de color para formar una imagen se llama:",
        opciones: ["Cubismo", "Puntillismo", "Surrealismo"],
        respuestaCorrecta: 1 // Puntillismo
    },
    {
        pregunta: "Verdadero o Falso: El 'tempo' en música se refiere a lo rápido o lento que es.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
     {
        pregunta: "¿Qué instrumento de viento metal tiene varas que se deslizan para cambiar las notas?",
        opciones: ["Trompeta", "Tuba", "Trombón"],
        respuestaCorrecta: 2 // Trombón
    },
    {
        pregunta: "El arte de crear figuras tridimensionales tallando piedra o madera se llama:",
        opciones: ["Pintura", "Escultura", "Grabado"],
        respuestaCorrecta: 1 // Escultura
    },
    {
        pregunta: "El libro 'El Principito' fue escrito por Antoine de...",
        opciones: ["Saint-Exupéry", "Verne", "Dumas"],
        respuestaCorrecta: 0 // Saint-Exupéry
    },
    {
        pregunta: "Verdadero o Falso: Un 'acorde' en música es una sola nota tocada muy fuerte.",
        tipo: 'vf',
        respuestaCorrecta: false // Es un conjunto de notas que suenan a la vez.
    },
     {
        pregunta: "¿Qué famoso artista español es conocido por pintar relojes blandos y paisajes extraños?",
        opciones: ["Miró", "Dalí", "Goya"],
        respuestaCorrecta: 1 // Dalí
    },
    {
        pregunta: "La familia de instrumentos que incluye el tambor, los platillos y el xilófono se llama:",
        opciones: ["Cuerda", "Viento", "Percusión"],
        respuestaCorrecta: 2 // Percusión
    },
    {
        pregunta: "Verdadero o Falso: La 'acuarela' es un tipo de pintura que se mezcla con aceite.",
        tipo: 'vf',
        respuestaCorrecta: false // Se mezcla con agua.
    },

    // === Categoría 4: Tecnología y Ciencia Divertida (251-270) ===
    {
        pregunta: "¿Qué significan las siglas 'GPS' que usamos para saber dónde estamos?",
        opciones: ["Gran Posicionador Satelital", "Sistema de Posicionamiento Global", "Guía Precisa Siempre"],
        respuestaCorrecta: 1 // Sistema de Posicionamiento Global
    },
    {
        pregunta: "Verdadero o Falso: El sonido viaja más rápido que la luz.",
        tipo: 'vf',
        respuestaCorrecta: false // La luz es mucho más rápida.
    },
    {
        pregunta: "¿Cómo se llama la capa de gases que rodea la Tierra y nos protege?",
        opciones: ["Hidrosfera", "Atmósfera", "Litosfera"],
        respuestaCorrecta: 1 // Atmósfera
    },
    {
        pregunta: "La energía que se obtiene del sol se llama energía...",
        opciones: ["Solar", "Eólica", "Geotérmica"],
        respuestaCorrecta: 0 // Solar
    },
    {
        pregunta: "¿Qué parte de la célula contiene la información genética (ADN)?",
        opciones: ["Membrana", "Citoplasma", "Núcleo"],
        respuestaCorrecta: 2 // Núcleo
    },
    {
        pregunta: "Verdadero o Falso: Los imanes atraen objetos de plástico.",
        tipo: 'vf',
        respuestaCorrecta: false // Atraen metales ferromagnéticos.
    },
     {
        pregunta: "Un robot que está diseñado para parecerse y actuar como un humano se llama:",
        opciones: ["Cyborg", "Androide", "Transformer"],
        respuestaCorrecta: 1 // Androide
    },
    {
        pregunta: "¿Qué invento permite comunicarnos con personas al otro lado del mundo casi instantáneamente?",
        opciones: ["El telégrafo", "Internet", "La paloma mensajera"],
        respuestaCorrecta: 1 // Internet
    },
     {
        pregunta: "La fuerza que hace que un globo frotado se pegue a la pared es la electricidad...",
        opciones: ["Corriente", "Estática", "Magnética"],
        respuestaCorrecta: 1 // Estática
    },
    {
        pregunta: "Verdadero o Falso: Todos los planetas de nuestro sistema solar tienen lunas.",
        tipo: 'vf',
        respuestaCorrecta: false // Mercurio y Venus no tienen.
    },
     {
        pregunta: "¿Cómo se llama el proceso de crear objetos capa por capa usando un diseño digital?",
        opciones: ["Fotocopia", "Impresión 3D", "Escaneo"],
        respuestaCorrecta: 1 // Impresión 3D
    },
    {
        pregunta: "El 'combustible' principal que usan nuestras células para obtener energía viene de...",
        opciones: ["El aire", "Los alimentos (glucosa)", "El agua"],
        respuestaCorrecta: 1 // Los alimentos (glucosa)
    },
    {
        pregunta: "¿Qué es un 'algoritmo' en informática?",
        opciones: ["Un virus peligroso", "Un conjunto de instrucciones para resolver un problema", "Un tipo de videojuego"],
        respuestaCorrecta: 1 // Un conjunto de instrucciones
    },
    {
        pregunta: "Verdadero o Falso: La lava de un volcán es roca sólida muy caliente.",
        tipo: 'vf',
        respuestaCorrecta: false // Es roca derretida (líquida).
    },
    {
        pregunta: "¿Qué tipo de energía usamos al encender una linterna con pilas?",
        opciones: ["Energía solar", "Energía química (de las pilas)", "Energía nuclear"],
        respuestaCorrecta: 1 // Energía química
    },
    {
        pregunta: "El sistema que controla nuestros pensamientos, movimientos y sentidos es el sistema...",
        opciones: ["Digestivo", "Nervioso", "Respiratorio"],
        respuestaCorrecta: 1 // Nervioso
    },
    {
        pregunta: "Verdadero o Falso: Los ordenadores solo entienden el lenguaje de ceros y unos (binario).",
        tipo: 'vf',
        respuestaCorrecta: true // A nivel fundamental.
    },
    {
        pregunta: "¿Qué es la 'realidad virtual' (VR)?",
        opciones: ["Ver películas muy antiguas", "Usar unas gafas especiales para sentir que estás en otro lugar", "Hablar con robots"],
        respuestaCorrecta: 1 // Usar unas gafas especiales...
    },
    {
        pregunta: "Verdadero o Falso: Los CDs y DVDs guardan información usando pequeños agujeros leídos por un láser.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué significa 'ADN'?",
        opciones: ["Agua De Naranja", "Las instrucciones que dicen cómo es un ser vivo", "Asociación Deportiva Nacional"],
        respuestaCorrecta: 1 // Las instrucciones... (Ácido Desoxirribonucleico)
    },

    // === Categoría 5: Vida Cotidiana y Curiosidades (271-290) ===
    {
        pregunta: "¿Qué debes hacer antes de cruzar una calle, incluso si el semáforo está en verde para ti?",
        opciones: ["Salir corriendo", "Mirar a ambos lados", "Cerrar los ojos"],
        respuestaCorrecta: 1 // Mirar a ambos lados
    },
    {
        pregunta: "¿Cuál es la moneda oficial que se usa en España?",
        opciones: ["Dólar", "Euro", "Libra"],
        respuestaCorrecta: 1 // Euro
    },
    {
        pregunta: "Verdadero o Falso: Es bueno comer muchas frutas y verduras todos los días.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué significa la señal de tráfico redonda con un borde rojo y el número 50 dentro?",
        opciones: ["Que puedes ir a 50 km/h o más", "Límite máximo de velocidad: 50 km/h", "Que faltan 50 km para llegar"],
        respuestaCorrecta: 1 // Límite máximo de velocidad: 50 km/h
    },
    {
        pregunta: "Si quieres guardar comida fría para que no se estropee, la pones en...",
        opciones: ["El horno", "La nevera (frigorífico)", "El armario"],
        respuestaCorrecta: 1 // Nevera (frigorífico)
    },
    {
        pregunta: "Verdadero o Falso: El agua es esencial para que nuestro cuerpo funcione bien.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué es un 'carné de identidad' (DNI)?",
        opciones: ["Un carné para ir a la biblioteca", "Un documento oficial que dice quién eres", "Una tarjeta para jugar"],
        respuestaCorrecta: 1 // Un documento oficial que dice quién eres
    },
    {
        pregunta: "¿Qué electrodoméstico se usa para lavar la ropa?",
        opciones: ["El microondas", "La lavadora", "La tostadora"],
        respuestaCorrecta: 1 // La lavadora
    },
    {
        pregunta: "Verdadero o Falso: Debemos tirar la basura en las papeleras o contenedores, no al suelo.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "Para saber qué hora es, miras un...",
        opciones: ["Termómetro", "Reloj", "Calendario"],
        respuestaCorrecta: 1 // Reloj
    },
    {
        pregunta: "La Torre de Pisa en Italia es famosa porque está...",
        opciones: ["Hecha de oro", "Inclinada", "Bajo el agua"],
        respuestaCorrecta: 1 // Inclinada
    },
    {
        pregunta: "Verdadero o Falso: Es importante decir 'gracias' cuando alguien te ayuda o te da algo.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué profesión tiene alguien que ayuda a la gente a aprender en el colegio?",
        opciones: ["Médico", "Profesor/a (o Maestro/a)", "Cocinero/a"],
        respuestaCorrecta: 1 // Profesor/a (o Maestro/a)
    },
    {
        pregunta: "Si quieres medir cuánta leche cabe en una botella, usas la unidad llamada...",
        opciones: ["Metro", "Kilo", "Litro"],
        respuestaCorrecta: 2 // Litro
    },
    {
        pregunta: "Verdadero o Falso: Antes de comer, es bueno lavarse las manos.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué recipiente usamos normalmente para beber agua o zumo?",
        opciones: ["Un plato", "Un vaso", "Un tenedor"],
        respuestaCorrecta: 1 // Un vaso
    },
    {
        pregunta: "Si compras algo que cuesta 3 euros y pagas con un billete de 5 euros, ¿cuánto te devuelven?",
        opciones: ["1 euro", "2 euros", "3 euros"],
        respuestaCorrecta: 1 // 2 euros
    },
    {
        pregunta: "Verdadero o Falso: Es bueno dormir las horas suficientes cada noche para descansar.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué usas para escribir en un papel?",
        opciones: ["Una goma de borrar", "Un lápiz o bolígrafo", "Un sacapuntas"],
        respuestaCorrecta: 1 // Un lápiz o bolígrafo
    },
    {
        pregunta: "Cuando conoces a alguien por primera vez, es educado decir...",
        opciones: ["Adiós", "Hola / Encantado/a", "¿Qué hora es?"],
        respuestaCorrecta: 1 // Hola / Encantado/a
    },

    // === Categoría 6: Retos Mentales (Lógica, Adivinanzas) (291-310) ===
    {
        pregunta: "Tiene cuello pero no cabeza, tiene brazos pero no manos. ¿Qué es?",
        opciones: ["Una persona", "Una camisa", "Una botella"],
        respuestaCorrecta: 1 // Una camisa
    },
    {
        pregunta: "Si en una pecera hay 10 peces y 2 se ahogan (¡imposible!), ¿cuántos peces quedan?",
        opciones: ["8", "10", "0"],
        respuestaCorrecta: 1 // 10 (Los peces no se ahogan en agua)
    },
    {
        pregunta: "Verdadero o Falso: Un avión puede volar marcha atrás.",
        tipo: 'vf',
        respuestaCorrecta: false
    },
    {
        pregunta: "¿Qué sube pero nunca baja?",
        opciones: ["La temperatura", "Tu edad", "Un ascensor"],
        respuestaCorrecta: 1 // Tu edad
    },
    {
        pregunta: "Entras en una habitación oscura con una cerilla. Dentro hay una vela, una lámpara de aceite y una estufa de leña. ¿Qué enciendes primero?",
        opciones: ["La vela", "La cerilla", "La estufa"],
        respuestaCorrecta: 1 // La cerilla
    },
    {
        pregunta: "Verdadero o Falso: Puedes estar en dos sitios diferentes exactamente al mismo tiempo.",
        tipo: 'vf',
        respuestaCorrecta: false
    },
    {
        pregunta: "Si un tren eléctrico va hacia el norte, ¿hacia dónde va el humo?",
        opciones: ["Hacia el sur", "Hacia el norte", "Los trenes eléctricos no echan humo"],
        respuestaCorrecta: 2 // Los trenes eléctricos no echan humo
    },
    {
        pregunta: "Dos padres y dos hijos van a pescar. Solo pescan 3 peces. ¿Cómo es posible que cada uno se lleve un pez entero?",
        opciones: ["Uno se queda sin pez", "Son 3 personas: abuelo, padre e hijo", "Comparten los peces"],
        respuestaCorrecta: 1 // Son 3 personas
    },
    {
        pregunta: "¿Qué pesa más: ¿Un kilo de plumas o un kilo de piedras?",
        opciones: ["Las piedras", "Pesan lo mismo", "Las plumas"],
        respuestaCorrecta: 1 // Pesan lo mismo
    },
    {
        pregunta: "¿Qué mes del año tiene 28 días (normalmente)?",
        opciones: ["Mayo", "Febrero", "Septiembre"],
        respuestaCorrecta: 1 // Febrero
    },
    {
        pregunta: "Blanco por dentro, verde por fuera. Si quieres que te lo diga, espera. ¿Qué es?",
        opciones: ["Un coco", "Una pera", "Un aguacate"],
        respuestaCorrecta: 1 // Una pera
    },
    {
        pregunta: "Si 5 gatos cazan 5 ratones en 5 minutos, ¿cuántos minutos tarda un gato en cazar un ratón?",
        opciones: ["1 minuto", "5 minutos", "25 minutos"],
        respuestaCorrecta: 1 // 5 minutos (cada gato va a su ritmo)
    },
    {
        pregunta: "Verdadero o Falso: Puedes adivinar el futuro mirando una bola de cristal.",
        tipo: 'vf',
        respuestaCorrecta: false // Es fantasía.
    },
    {
        pregunta: "¿Qué tiene ciudades pero no casas, ríos pero no agua, y bosques pero no árboles?",
        opciones: ["Un dibujo", "Un mapa", "Un videojuego"],
        respuestaCorrecta: 1 // Un mapa
    },
    {
        pregunta: "¿Cuántos animales de cada especie subió Moisés a su arca?",
        opciones: ["Dos", "Uno", "Moisés no tuvo arca"],
        respuestaCorrecta: 2 // Moisés no tuvo arca, fue Noé.
    },
    {
        pregunta: "Oro parece, plata no es. ¿Qué es?",
        opciones: ["Un tesoro", "El plátano", "Un espejo"],
        respuestaCorrecta: 1 // El plátano
    },
    {
        pregunta: "Verdadero o Falso: Si das una vuelta completa sobre ti mismo, terminas mirando en la misma dirección.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "Tiene ojos y no ve, tiene agua y no la bebe, tiene carne y no la come, tiene barba y no es hombre. ¿Qué es?",
        opciones: ["Un pez", "Un coco", "Un pirata"],
        respuestaCorrecta: 1 // Un coco
    },
    {
        pregunta: "Si estás en una carrera y adelantas al que va último, ¿en qué posición te pones?",
        opciones: ["El penúltimo", "El último", "Eso es imposible"],
        respuestaCorrecta: 2 // Es imposible adelantar al último.
    },
    {
        pregunta: "Verdadero o Falso: Puedes hacer un nudo con los ojos cerrados.",
        tipo: 'vf',
        respuestaCorrecta: true // ¡Inténtalo!
    },

    // --- Bloque Valores y Comunicación Positiva (311-322) ---
// Preguntas inspiradas en valores universales para ser mejores personas.
{
    pregunta: "Si ves a un compañero/a triste en el patio, ¿qué es lo más amable que puedes hacer?",
    opciones: ["Reírte", "Preguntarle qué le pasa y escucharle", "Ignorarle"],
    respuestaCorrecta: 1 // Escucharle
},
{
    pregunta: "Verdadero o Falso: Decir la verdad, aunque a veces sea difícil, ayuda a que los demás confíen en ti.",
    tipo: 'vf',
    respuestaCorrecta: true // Fomenta la honestidad y la confianza.
},
{
    pregunta: "¿Qué significa 'perdonar' a alguien que te ha hecho daño?",
    opciones: ["Seguir enfadado para siempre", "Dejar de sentir rencor y tratar de seguir adelante", "Hacerle tú algo peor"],
    respuestaCorrecta: 1 // Concepto básico de perdón como liberación.
},
{
    pregunta: "Si tienes muchos lápices de colores y un amigo no tiene, ¿qué demuestra generosidad?",
    opciones: ["Esconder los tuyos", "Compartir algunos con él/ella", "Decirle que se compre los suyos"],
    respuestaCorrecta: 1 // Fomenta el compartir.
},
{
    pregunta: "Cuando hablas con alguien que piensa diferente a ti, ¿qué es importante?",
    opciones: ["Gritar para que te escuche", "Escuchar su opinión con respeto, aunque no estés de acuerdo", "No dejarle hablar"],
    respuestaCorrecta: 1 // Fomenta la comunicación respetuosa.
},
{
    pregunta: "Verdadero o Falso: Dar las gracias por las cosas buenas que tenemos o que nos dan es una forma de ser agradecido.",
    tipo: 'vf',
    respuestaCorrecta: true // Fomenta la gratitud.
},
{
    pregunta: "¿Cuál de estas acciones ayuda a construir un ambiente mejor en clase o con amigos?",
    opciones: ["Criticar a los demás", "Ayudar y animar a los compañeros", "Crear rumores"],
    respuestaCorrecta: 1 // Fomenta el apoyo mutuo y la positividad.
},
{
    pregunta: "Para entender bien a alguien cuando habla, lo mejor es...",
    opciones: ["Interrumpirle mucho para dar tu opinión", "Mirarle y escuchar atentamente lo que dice", "Estar pensando en lo que vas a decir tú después"],
    respuestaCorrecta: 1 // Fomenta la escucha activa.
},
{
    pregunta: "Verdadero o Falso: Ser paciente significa saber esperar tu turno o esperar a que algo suceda sin enfadarte enseguida.",
    tipo: 'vf',
    respuestaCorrecta: true // Explica la paciencia de forma simple.
},
{
    pregunta: "Intentar ponerte en el lugar de otra persona para comprender cómo se siente se llama:",
    opciones: ["Egoísmo", "Antipatía", "Empatía"],
    respuestaCorrecta: 2 // Introduce el concepto de empatía.
},
{
    pregunta: "Cuidar tus cosas, hacer tus deberes y ayudar en casa son ejemplos de ser...",
    opciones: ["Despistado/a", "Responsable", "Aburrido/a"],
    respuestaCorrecta: 1 // Fomenta la responsabilidad.
},
{
    pregunta: "Si hay un conflicto o una discusión, ¿qué es mejor intentar hacer?",
    opciones: ["Echar más leña al fuego", "Buscar una solución hablando tranquilamente y en paz", "No volver a hablar nunca más"],
    respuestaCorrecta: 1 // Fomenta la resolución pacífica de conflictos.
},
        // --- Batch 4: Preguntas 323-422 (Nuevas, Variadas y Divertidas) ---

    // === Ciencia y Naturaleza Curiosa (323-337) ===
    {
        pregunta: "¿Qué animal puede regenerar (volver a crecer) partes de su cuerpo, como patas o incluso su corazón?",
        opciones: ["El perro Salchicha", "El Ajolote (Axolotl)", "El Canario"],
        respuestaCorrecta: 1 // Ajolote
    },
    {
        pregunta: "Si un camaleón está enfadado o quiere impresionar, ¿qué suele hacer con su color?",
        opciones: ["Se vuelve invisible", "Se pone de colores muy brillantes", "Se queda gris aburrido"],
        respuestaCorrecta: 1 // Colores brillantes (comunicación)
    },
    {
        pregunta: "¿Qué parte de tu cuerpo NUNCA deja de crecer durante toda tu vida?",
        opciones: ["Los pies", "Las orejas y la nariz", "Las uñas de los meñiques"],
        respuestaCorrecta: 1 // Orejas y nariz (cartílago)
    },
    {
        pregunta: "Verdadero o Falso: Los pulpos tienen la sangre azul porque usan cobre en lugar de hierro para transportar oxígeno.",
        tipo: 'vf',
        respuestaCorrecta: true // Curiosidad científica real.
    },
    {
        pregunta: "¿Qué gas, que a veces huele a huevos podridos, expulsan los volcanes?",
        opciones: ["Oxígeno puro", "Azufre (compuestos de)", "Gas de la risa"],
        respuestaCorrecta: 1 // Azufre
    },
    {
        pregunta: "El 'hueso de la risa' en el codo no es un hueso, es un...",
        opciones: ["Músculo secreto", "Nervio muy sensible", "Cartílago cantante"],
        respuestaCorrecta: 1 // Nervio cubital
    },
    {
        pregunta: "¿Por qué los flamencos son rosas?",
        opciones: ["Porque beben batido de fresa", "Por los pigmentos de los crustáceos que comen", "Porque toman mucho el sol"],
        respuestaCorrecta: 1 // Alimentación (carotenoides)
    },
    {
        pregunta: "Verdadero o Falso: Los astronautas en el espacio son un poco más altos que en la Tierra porque la gravedad no les comprime la columna.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué animal diminuto puede sobrevivir en el espacio exterior, a radiación extrema y temperaturas heladas?",
        opciones: ["La hormiga atómica", "El tardígrado (oso de agua)", "El mosquito espacial"],
        respuestaCorrecta: 1 // Tardígrado
    },
    {
        pregunta: "Si mezclas bicarbonato de sodio con vinagre, ¿qué pasa que parece magia?",
        opciones: ["Se convierte en oro", "Produce burbujas (dióxido de carbono)", "Empieza a cantar ópera"],
        respuestaCorrecta: 1 // Reacción química básica
    },
     {
        pregunta: "¿Qué planta carnívora cierra sus 'bocas' de golpe para atrapar insectos?",
        opciones: ["El Girasol hambriento", "La Venus Atrapamoscas", "El Cactus pinchudo"],
        respuestaCorrecta: 1 // Venus Atrapamoscas
    },
    {
        pregunta: "Verdadero o Falso: Los koalas duermen unas 20 horas al día porque su dieta de eucalipto les da poca energía.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué es un 'géiser'?",
        opciones: ["Un tipo de galleta islandesa", "Una fuente de agua caliente que sale disparada de la tierra", "Un primo lejano del dinosaurio"],
        respuestaCorrecta: 1 // Fenómeno geotérmico
    },
    {
        pregunta: "El fenómeno que hace que veamos los colores separados (como un arcoíris) al pasar la luz por un prisma se llama:",
        opciones: ["Fotosíntesis", "Dispersión de la luz", "Magia potagia"],
        respuestaCorrecta: 1 // Dispersión
    },
     {
        pregunta: "¿Qué animal produce el sonido más fuerte del planeta?",
        opciones: ["El león rugiendo", "El mono aullador", "La ballena azul"],
        respuestaCorrecta: 2 // Ballena azul
    },

    // === Geografía Curiosa y Mundo (338-350) ===
    {
        pregunta: "¿Qué país está completamente DENTRO de Sudáfrica?",
        opciones: ["Madagascar", "Lesoto", "Egipto"],
        respuestaCorrecta: 1 // Lesoto (Enclave)
    },
    {
        pregunta: "Verdadero o Falso: Existe un lago en Australia que es de color rosa chicle.",
        tipo: 'vf',
        respuestaCorrecta: true // Lago Hillier
    },
    {
        pregunta: "¿Cómo se llama la línea imaginaria que divide la Tierra en Hemisferio Norte y Hemisferio Sur?",
        opciones: ["El Trópico de Cáncer", "El Ecuador", "La Línea Discontinua"],
        respuestaCorrecta: 1 // Ecuador
    },
    {
        pregunta: "En qué país encontrarías canguros saltando y koalas durmiendo en los árboles?",
        opciones: ["Canadá", "Australia", "Brasil"],
        respuestaCorrecta: 1 // Australia
    },
    {
        pregunta: "El punto más profundo de todos los océanos se llama:",
        opciones: ["El Triángulo de las Bermudas", "La Fosa de las Marianas", "El Agujero Azul"],
        respuestaCorrecta: 1 // Fosa de las Marianas
    },
    {
        pregunta: "Verdadero o Falso: Islandia es un país con muchos volcanes y glaciares activos.",
        tipo: 'vf',
        respuestaCorrecta: true // La tierra de hielo y fuego
    },
    {
        pregunta: "¿Qué famoso desierto cubre gran parte del norte de África?",
        opciones: ["El Desierto de Atacama", "El Desierto del Sahara", "El Desierto de Gobi"],
        respuestaCorrecta: 1 // Sahara (Repaso, pero enfoque distinto)
    },
    {
        pregunta: "¿Qué país es famoso por sus fiordos (entradas de mar estrechas y profundas entre montañas)?",
        opciones: ["Suiza", "Noruega", "México"],
        respuestaCorrecta: 1 // Noruega
    },
    {
        pregunta: "La Gran Barrera de Coral, el ser vivo más grande del mundo visible desde el espacio, está cerca de la costa de...",
        opciones: ["Japón", "Australia", "Chile"],
        respuestaCorrecta: 1 // Australia
    },
    {
        pregunta: "Verdadero o Falso: Hay más gente viviendo en la ciudad de Tokio que en todo el país de Canadá.",
        tipo: 'vf',
        respuestaCorrecta: true // Curiosidad demográfica.
    },
    {
        pregunta: "¿Qué canal artificial conecta el Mar Mediterráneo con el Mar Rojo, ahorrando un largo viaje alrededor de África?",
        opciones: ["El Canal de Panamá", "El Canal de Suez", "El Canalillo de mi Barrio"],
        respuestaCorrecta: 1 // Canal de Suez
    },
     {
        pregunta: "¿Qué país sudamericano NO tiene costa ni en el Océano Pacífico ni en el Atlántico?",
        opciones: ["Chile", "Paraguay", "Brasil"],
        respuestaCorrecta: 1 // Paraguay (y Bolivia ya estaba)
    },
     {
        pregunta: "El Monte Rushmore en EE.UU. tiene las caras gigantes de cuatro...",
        opciones: ["Estrellas de rock", "Presidentes famosos", "Osos grizzly"],
        respuestaCorrecta: 1 // Presidentes
    },

    // === Matemáticas Divertidas y Lógica (351-362) ===
    {
        pregunta: "Si tienes una pizza gigante con 8 porciones y te comes 3, ¿qué fracción de pizza queda?",
        opciones: ["La mitad", "5/8 (cinco octavos)", "Un triángulo triste"],
        respuestaCorrecta: 1 // Fracciones básicas
    },
    {
        pregunta: "Un caracol quiere subir una pared de 10 metros. Cada día sube 3 metros, pero por la noche resbala y baja 2 metros. ¿Cuántos días tarda en llegar arriba?",
        opciones: ["10 días", "7 días", "8 días"],
        respuestaCorrecta: 2 // Lógica (El día 8 llega arriba y ya no resbala)
    },
    {
        pregunta: "¿Qué número sigue en esta serie: 1, 4, 9, 16, 25...?",
        opciones: ["30", "36", "40"],
        respuestaCorrecta: 1 // Cuadrados perfectos (1x1, 2x2, 3x3...)
    },
    {
        pregunta: "Verdadero o Falso: Un 'googol' es un número real, y es un 1 seguido de 100 ceros.",
        tipo: 'vf',
        respuestaCorrecta: true // Origen del nombre de Google.
    },
    {
        pregunta: "Si lanzas un dado normal de 6 caras, ¿qué es más probable?",
        opciones: ["Que salga un 6", "Que salga un número par (2, 4 o 6)", "Que el dado se convierta en chocolate"],
        respuestaCorrecta: 1 // Probabilidad básica (3/6 vs 1/6)
    },
    {
        pregunta: "¿Cuántos grados suman los ángulos interiores de CUALQUIER triángulo?",
        opciones: ["Depende del triángulo", "Siempre 180 grados", "360 grados"],
        respuestaCorrecta: 1 // Propiedad fundamental de los triángulos.
    },
    {
        pregunta: "Tengo 3 manzanas. Si me das otras 2, pero luego me quitas 4, ¿cuántas manzanas tengo?",
        opciones: ["1 manzana", "Ninguna manzana", "Un lío de manzanas"],
        respuestaCorrecta: 0 // (3+2)-4 = 1
    },
    {
        pregunta: "El número romano 'L' representa el...",
        opciones: ["500", "50", "1000"],
        respuestaCorrecta: 1 // 50
    },
    {
        pregunta: "Verdadero o Falso: Cero es un número par.",
        tipo: 'vf',
        respuestaCorrecta: true // Definición matemática.
    },
    {
        pregunta: "¿Qué forma geométrica tiene una lata de refresco vista desde arriba?",
        opciones: ["Un cuadrado", "Un círculo", "Un triángulo"],
        respuestaCorrecta: 1 // Círculo
    },
    {
        pregunta: "Si necesitas medir algo muy pequeño y preciso, como el grosor de un pelo, usarías...",
        opciones: ["Una regla de clase", "Un metro de costura", "Un micrómetro o calibre (¡herramienta de precisión!)"],
        respuestaCorrecta: 2 // Introduce instrumentos de medida más precisos.
    },
    {
        pregunta: "Hay 7 pájaros en un árbol. Un cazador dispara y caza uno. ¿Cuántos pájaros quedan en el árbol?",
        opciones: ["6 pájaros", "Ninguno (los demás se asustan y vuelan)", "El pájaro cazado, pero triste"],
        respuestaCorrecta: 1 // Lógica/Adivinanza clásica.
    },

    // === Lengua y Palabras Curiosas (363-374) ===
    {
        pregunta: "¿Qué palabra significa 'miedo irracional a las arañas'?",
        opciones: ["Aracnofobia", "Claustrofobia", "Pelofobia (miedo al pelo)"],
        respuestaCorrecta: 0 // Aracnofobia
    },
    {
        pregunta: "Una palabra que se lee igual de izquierda a derecha que de derecha a izquierda (como 'oso' o 'reconocer') se llama:",
        opciones: [" trabalenguas", "Palíndromo", "Anagrama"],
        respuestaCorrecta: 1 // Palíndromo (Repaso conceptual, no ejemplo)
    },
    {
        pregunta: "'Supercalifragilisticoespialidoso' es una palabra famosa de la película...",
        opciones: ["El Rey León", "Mary Poppins", "Shrek"],
        respuestaCorrecta: 1 // Mary Poppins
    },
    {
        pregunta: "Verdadero o Falso: La palabra 'murciélago' es la única en español que contiene las cinco vocales (a, e, i, o, u) una sola vez.",
        tipo: 'vf',
        respuestaCorrecta: false // Hay otras, como 'auténtico', pero es un mito común con 'murciélago'. ¡Aprendizaje!
    },
    {
        pregunta: "Si alguien dice 'Estoy hecho polvo', ¿qué quiere decir?",
        opciones: ["Que se ha caído y ensuciado", "Que está muy cansado", "Que se ha convertido en arena"],
        respuestaCorrecta: 1 // Significado de una frase hecha (idiom).
    },
    {
        pregunta: "¿Qué signo de puntuación usamos para indicar sorpresa o emoción fuerte al final de una frase?",
        opciones: ["El punto final (.)", "El signo de exclamación (!)", "La coma (,)"],
        respuestaCorrecta: 1 // Signo de exclamación
    },
    {
        pregunta: "El prefijo 're-' en palabras como 'rehacer' o 'releer' suele significar:",
        opciones: ["Hacerlo mal", "Volver a hacer", "Hacerlo rápido"],
        respuestaCorrecta: 1 // Significado de prefijo común.
    },
    {
        pregunta: "Verdadero o Falso: Un 'haiku' es un tipo de poema japonés muy corto, con una estructura de sílabas específica (5-7-5).",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué es un 'onomatopeya'?",
        opciones: ["Una palabra inventada sin sentido", "Una palabra que imita un sonido real (ej: 'guau', 'miau', 'tic-tac')", "Un tipo de baile japonés"],
        respuestaCorrecta: 1 // Onomatopeya
    },
    {
        pregunta: "Si juntas las palabras 'agua' y 'fiestas', ¿qué palabra compuesta formas?",
        opciones: ["Aguafuerte", "Aguafiestas", "Fiestagua"],
        respuestaCorrecta: 1 // Palabra compuesta.
    },
    {
        pregunta: "¿Qué palabra está escrita INCORRECTAMENTE?",
        opciones: ["Avión", "Hebilla", "Escrivir"],
        respuestaCorrecta: 2 // Escrivir (es Escribir)
    },
    {
        pregunta: "El conjunto de todas las palabras que existen en un idioma se llama:",
        opciones: ["Gramática", "Vocabulario (o léxico)", "Alfabeto"],
        respuestaCorrecta: 1 // Vocabulario/Léxico
    },

    // === Deportes y Juegos (375-385) ===
    {
        pregunta: "En fútbol, si un jugador marca tres goles en el mismo partido, se dice que ha hecho un...",
        opciones: ["Triple salto mortal", "Hat-trick", "Golazo supremo"],
        respuestaCorrecta: 1 // Hat-trick
    },
    {
        pregunta: "Verdadero o Falso: El surf es un deporte que consiste en deslizarse sobre las olas con una tabla.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué deporte se juega con un disco volador (frisbee) e intentando marcar en la zona del equipo contrario?",
        opciones: ["Rugby playa", "Ultimate Frisbee", "Lanzamiento de plato"],
        respuestaCorrecta: 1 // Ultimate
    },
    {
        pregunta: "¿Cuál de estos NO es un estilo de natación olímpico?",
        opciones: ["Mariposa", "Crol (Libre)", "Estilo perrito"],
        respuestaCorrecta: 2 // Estilo perrito
    },
    {
        pregunta: "Los Juegos Paralímpicos son para atletas con...",
        opciones: ["Superpoderes", "Discapacidades físicas, visuales o intelectuales", "Mucho dinero"],
        respuestaCorrecta: 1 // Definición básica Juegos Paralímpicos.
    },
    {
        pregunta: "Verdadero o Falso: En ajedrez, el Rey es la pieza más importante pero también una de las más débiles para atacar.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué arte marcial japonés es famoso por sus llaves, proyecciones y por usar la fuerza del oponente?",
        opciones: ["Boxeo", "Aikido o Judo", "Esgrima"],
        respuestaCorrecta: 1 // Aikido/Judo (similar concepto para niños)
    },
    {
        pregunta: "En béisbol, si el bateador golpea la pelota fuera del campo y recorre todas las bases, marca un...",
        opciones: ["Strike", "Home Run (Jonrón)", "Foul Ball"],
        respuestaCorrecta: 1 // Home Run
    },
     {
        pregunta: "¿Qué necesitas SÍ o SÍ para jugar al escondite?",
        opciones: ["Una linterna", "Alguien que cuente y lugares para esconderse", "Un mapa del tesoro"],
        respuestaCorrecta: 1 // Lógica de juego.
    },
     {
        pregunta: "Verdadero o Falso: El skateboarding (montar en monopatín) será deporte olímpico.",
        tipo: 'vf',
        respuestaCorrecta: true // Ya lo es.
    },
     {
        pregunta: "El deporte de deslizarse por la nieve sobre una tabla, similar al surf pero en la montaña, se llama:",
        opciones: ["Esquí acuático", "Snowboard", "Patinaje artístico"],
        respuestaCorrecta: 1 // Snowboard
    },

    // === Historia, Cultura y Arte (386-398) ===
    {
        pregunta: "¿Quién fue el famoso científico que desarrolló la teoría de la relatividad (E=mc²)?",
        opciones: ["Isaac Newton", "Albert Einstein", "Galileo Galilei"],
        respuestaCorrecta: 1 // Albert Einstein
    },
    {
        pregunta: "Verdadero o Falso: Los vikingos llevaban cascos con cuernos.",
        tipo: 'vf',
        respuestaCorrecta: false // Es un mito popular, no hay evidencia histórica sólida.
    },
    {
        pregunta: "¿Qué civilización antigua inventó la escritura cuneiforme (marcas en tablillas de arcilla)?",
        opciones: ["Los Griegos", "Los Sumerios (Mesopotamia)", "Los Aztecas"],
        respuestaCorrecta: 1 // Sumerios
    },
    {
        pregunta: "La famosa pintura 'El Grito', con una figura angustiada bajo un cielo rojo, fue pintada por:",
        opciones: ["Vincent van Gogh", "Edvard Munch", "Bob Ross"],
        respuestaCorrecta: 1 // Munch
    },
    {
        pregunta: "¿Qué instrumento musical es típico de Escocia y se toca soplando aire en una bolsa?",
        opciones: ["La flauta travesera", "La Gaita", "El Trombón"],
        respuestaCorrecta: 1 // Gaita
    },
    {
        pregunta: "Verdadero o Falso: El chocolate tiene su origen en América, donde los aztecas y mayas lo tomaban como bebida.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué famoso festival de música rock se celebró en 1969 y fue un símbolo de paz y amor?",
        opciones: ["Eurovisión", "Woodstock", "El festival de la canción del verano"],
        respuestaCorrecta: 1 // Woodstock
    },
    {
        pregunta: "¿Cómo se llaman las famosas estatuas gigantes de piedra con grandes cabezas en la Isla de Pascua?",
        opciones: ["Gárgolas", "Moáis", "Menhires"],
        respuestaCorrecta: 1 // Moáis
    },
    {
        pregunta: "El 'Manga' es un estilo de cómic o novela gráfica originario de...",
        opciones: ["Estados Unidos", "Japón", "Francia"],
        respuestaCorrecta: 1 // Japón
    },
    {
        pregunta: "Verdadero o Falso: Los caballeros medievales llevaban pesadas armaduras de metal para protegerse en batalla.",
        tipo: 'vf',
        respuestaCorrecta: true
    },
    {
        pregunta: "¿Qué tipo de arte consiste en hacer dibujos que parecen moverse cuando se proyectan rápido?",
        opciones: ["Fotografía", "Animación (Dibujos animados)", "Escultura de hielo"],
        respuestaCorrecta: 1 // Animación
    },
    {
        pregunta: "¿Qué famoso compositor se quedó sordo pero siguió componiendo obras maestras como la Novena Sinfonía?",
        opciones: ["Mozart", "Bach", "Beethoven"],
        respuestaCorrecta: 2 // Beethoven (Repaso, enfocando en la sordera)
    },
    {
        pregunta: "¿Qué es el 'Taj Mahal' en la India?",
        opciones: ["Un palacio real", "Un mausoleo (tumba) de mármol blanco construido por amor", "Un parque de atracciones antiguo"],
        respuestaCorrecta: 1 // Mausoleo
    },


    // === Tecnología y Mundo Digital (399-408) ===
    {
        pregunta: "¿Qué significan las siglas 'Wi-Fi' (aproximadamente)?",
        opciones: ["Windows Fidelity", "Wireless Fidelity (Fidelidad Inalámbrica)", "Why Fly?"],
        respuestaCorrecta: 1 // Wireless Fidelity
    },
    {
        pregunta: "Verdadero o Falso: Un 'bug' en informática es un insecto real que se ha metido dentro del ordenador.",
        tipo: 'vf',
        respuestaCorrecta: false // Es un error en el código o programa.
    },
    {
        pregunta: "¿Qué es 'la nube' en internet?",
        opciones: ["Una nube de verdad donde llueven datos", "Servidores remotos donde guardamos información online", "Un programa para dibujar nubes"],
        respuestaCorrecta: 1 // Concepto de Cloud Computing.
    },
    {
        pregunta: "Un código QR (esos cuadrados con puntos negros) sirve para...",
        opciones: ["Decorar las cajas de cereales", "Almacenar información que lees con la cámara del móvil", "Jugar al tres en raya"],
        respuestaCorrecta: 1 // Función del QR code.
    },
    {
        pregunta: "¿Qué tipo de robot está diseñado para realizar tareas domésticas como aspirar el suelo?",
        opciones: ["Un Transformer", "Un robot aspirador", "Un cyborg cocinero"],
        respuestaCorrecta: 1 // Robot aspirador
    },
    {
        pregunta: "Verdadero o Falso: Las 'cookies' de internet son galletas digitales que te puedes comer.",
        tipo: 'vf',
        respuestaCorrecta: false // Son pequeños archivos de seguimiento.
    },
    {
        pregunta: "Si tu móvil se queda sin batería, necesitas...",
        opciones: ["Gritarle muy fuerte", "Conectarlo a un cargador", "Meterlo en el congelador"],
        respuestaCorrecta: 1 // Solución obvia pero fundamental.
    },
    {
        pregunta: "Los emojis (caritas y símbolos del móvil) se usan para...",
        opciones: ["Resolver ecuaciones matemáticas", "Expresar emociones o ideas de forma rápida y visual", "Pedir pizza automáticamente"],
        respuestaCorrecta: 1 // Función de los emojis.
    },
     {
        pregunta: "¿Qué es un 'avatar' en un videojuego o perfil online?",
        opciones: ["Un poder especial secreto", "La representación gráfica (el personaje) que te representa", "El jefe final del juego"],
        respuestaCorrecta: 1 // Avatar
    },
     {
        pregunta: "Verdadero o Falso: Es seguro compartir tu contraseña secreta con desconocidos en internet.",
        tipo: 'vf',
        respuestaCorrecta: false // Seguridad online básica.
    },

    // === Vida Cotidiana, Valores y Curiosidades (409-422) ===
    {
        pregunta: "¿Qué símbolo suelen tener los productos que se pueden reciclar?",
        opciones: ["Una cara sonriente", "Un triángulo hecho con flechas", "Una estrella fugaz"],
        respuestaCorrecta: 1 // Símbolo de reciclaje (Mobius loop).
    },
    {
        pregunta: "Verdadero o Falso: Bostezar es contagioso, si ves a alguien bostezar es probable que tú también lo hagas.",
        tipo: 'vf',
        respuestaCorrecta: true // Curiosidad humana.
    },
    {
        pregunta: "Si quieres enviar una carta por correo tradicional, ¿qué necesitas pegar en el sobre?",
        opciones: ["Una pegatina de tu personaje favorito", "Un sello postal", "Un chicle"],
        respuestaCorrecta: 1 // Sello postal.
    },
    {
        pregunta: "¿Por qué es importante lavarse los dientes después de comer?",
        opciones: ["Para que brillen en la oscuridad", "Para eliminar restos de comida y prevenir caries", "Para entrenar los músculos de la boca"],
        respuestaCorrecta: 1 // Higiene dental.
    },
    {
        pregunta: "Si un amigo te cuenta un secreto y te pide que no lo cuentes, ¿qué demuestras si guardas el secreto?",
        opciones: ["Que eres muy olvidadizo", "Lealtad y que eres de confianza", "Que no te importa tu amigo"],
        respuestaCorrecta: 1 // Valor: Lealtad/Confianza.
    },
    {
        pregunta: "Verdadero o Falso: Aplaudir es una forma común de mostrar que algo te ha gustado o para felicitar a alguien.",
        tipo: 'vf',
        respuestaCorrecta: true // Costumbre social.
    },
    {
        pregunta: "Trabajar juntos en equipo para conseguir algo, como en un deporte o un trabajo de clase, se llama:",
        opciones: ["Competir", "Colaborar", "Ignorarse"],
        respuestaCorrecta: 1 // Valor: Colaboración/Trabajo en equipo.
    },
    {
        pregunta: "¿Qué usas para proteger tus ojos del sol fuerte?",
        opciones: ["Un sombrero en los pies", "Gafas de sol", "Una bufanda en los ojos"],
        respuestaCorrecta: 1 // Gafas de sol.
    },
    {
        pregunta: "Verdadero o Falso: Es importante pedir perdón si has hecho algo mal o has herido a alguien sin querer.",
        tipo: 'vf',
        respuestaCorrecta: true // Valor: Responsabilidad/Disculpa.
    },
     {
        pregunta: "¿Qué palabra es más amable para pedir algo?",
        opciones: ["¡Dámelo ahora!", "Por favor, ¿me lo das?", "¡Quiero eso!"],
        respuestaCorrecta: 1 // Valor: Educación/Cortesía.
    },
    {
        pregunta: "Cuando ves una señal de STOP octogonal roja en la carretera, ¿qué deben hacer los coches?",
        opciones: ["Acelerar mucho", "Detenerse completamente", "Tocar el claxon tres veces"],
        respuestaCorrecta: 1 // Señal de tráfico básica.
    },
    {
        pregunta: "Si ves a alguien intentando llevar muchas cosas y se le caen, ¿qué es una acción amable?",
        opciones: ["Reírte a carcajadas", "Ayudarle a recogerlas", "Hacerle una foto"],
        respuestaCorrecta: 1 // Valor: Ayuda/Empatía.
    },
     {
        pregunta: "¿Qué gets wetter the more it dries? (¿Qué se moja más mientras más seca?)",
        opciones: ["Un charco", "Una toalla", "El desierto"],
        respuestaCorrecta: 1 // Adivinanza clásica en inglés/español.
    },
     {
        pregunta: "Verdadero o Falso: Ser valiente no significa no tener miedo, sino hacer lo correcto aunque tengas miedo.",
        tipo: 'vf',
        respuestaCorrecta: true // Concepto de valentía.
    } // <-- Asegúrate de que la última pregunta que añadas TENGA una coma si vas a añadir más después o si la pegas antes del cierre `];`


]; // Fin del array preguntasQuiz


