// --- Configuración Inicial: Fondo de Portada Aleatorio ---
const imagenesPortadaDisponibles = [
    'portada1.png',
    'portada2.png',
    'portada3.png'
];

function establecerFondoAleatorio() {
    if (imagenesPortadaDisponibles.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * imagenesPortadaDisponibles.length);
        const nombreImagenSeleccionada = imagenesPortadaDisponibles[indiceAleatorio];
        const rutaCompletaImagen = `img/portada/${nombreImagenSeleccionada}`;
        document.body.style.backgroundImage = `url('${rutaCompletaImagen}')`;
        console.log(`Fondo de portada establecido: ${rutaCompletaImagen}`);
    } else {
        console.warn("No hay imágenes de portada definidas.");
    }
}

// --- DATOS DE JUGADORES DISPONIBLES ---
const JUGADORES_DISPONIBLES = [
    { nombre: 'Hugo', imagen: 'img/jugadores/hugo.png' },
    { nombre: 'Saúl', imagen: 'img/jugadores/saul.png' },
    { nombre: 'Papá', imagen: 'img/jugadores/papa.png' },
    { nombre: 'Mamá', imagen: 'img/jugadores/mama.png' },
    { nombre: 'Yoyo', imagen: 'img/jugadores/yoyo.png' },
    { nombre: 'Yaya', imagen: 'img/jugadores/yaya.png' },
    { nombre: 'Abuelo Quiri', imagen: 'img/jugadores/abueloquiri.png' },
    { nombre: 'Abuela Ana', imagen: 'img/jugadores/abuelaana.png' },
    { nombre: 'Tito Iván', imagen: 'img/jugadores/titoivan.png' },
    { nombre: 'Tito Samu', imagen: 'img/jugadores/titosamu.png' },
    { nombre: 'Tita Lidia', imagen: 'img/jugadores/titalidia.png' },
    { nombre: 'Prima Gema', imagen: 'img/jugadores/primagema.png' },
    { nombre: 'Tita Tere', imagen: 'img/jugadores/titatere.png' },
    { nombre: 'Tito Freek', imagen: 'img/jugadores/titofreek.png' },
    { nombre: 'Primo Oliver', imagen: 'img/jugadores/primooliver.png' },
];

// --- Referencias a Elementos del DOM ---
const pantallaSeleccion = document.getElementById('pantalla-seleccion-jugador');
const seleccionContenedor = document.getElementById('seleccion-contenedor');
const seleccionFeedback = document.getElementById('seleccion-feedback');
const botonConfirmarSeleccion = document.getElementById('boton-confirmar-seleccion');
const pantallaInicial = document.getElementById('pantalla-inicial');
const juegoContenedor = document.getElementById('juego-contenedor');
const infoTurno = document.getElementById('info-turno');
const botonReiniciar = document.getElementById('boton-reiniciar');
const nombreJugador1Elem = document.getElementById('nombre-jugador1');
const puntajeJugador1Elem = document.getElementById('puntaje-jugador1');
const fotoJugador1Elem = document.getElementById('foto-jugador1');
const nombreJugador2Elem = document.getElementById('nombre-jugador2');
const puntajeJugador2Elem = document.getElementById('puntaje-jugador2');
const fotoJugador2Elem = document.getElementById('foto-jugador2');
const pantallaGanador = document.getElementById('pantalla-ganador');
const textoGanadorElem = document.getElementById('texto-ganador');
const fotoGanadorElem = document.getElementById('foto-ganador');
const nombreGanadorElem = document.getElementById('nombre-ganador');
const botonVolverAElegir = document.getElementById('boton-volver-a-elegir');
const botonSalirASeleccion = document.getElementById('boton-salir-a-seleccion');
const pantallaPregunta = document.getElementById('pantalla-pregunta');
const tituloPreguntaElem = document.getElementById('titulo-pregunta');
const textoPreguntaElem = document.getElementById('texto-pregunta');
const opcionesPreguntaContenedor = document.getElementById('opciones-pregunta');
const feedbackPreguntaElem = document.getElementById('feedback-pregunta');
const pantallaEjercicio = document.getElementById('pantalla-ejercicio');
const nombreEjercicioElem = document.getElementById('nombre-ejercicio');
const contadorEjercicioElem = document.getElementById('contador-ejercicio');
const categoriaCuriosidadElem = document.getElementById('categoria-curiosidad');
const botonAbrirMensaje = document.getElementById('boton-abrir-mensaje');
const modalMensaje = document.getElementById('modal-mensaje');
const botonCerrarMensaje = document.getElementById('boton-cerrar-mensaje');
const formMensaje = document.getElementById('form-mensaje');
const mensajeFeedback = document.getElementById('mensaje-feedback');
const botonMostrarReglas = document.getElementById('boton-mostrar-reglas');
const modalReglas = document.getElementById('modal-reglas');
const botonCerrarReglas = document.getElementById('boton-cerrar-reglas');

// --- Constantes y Variables del Juego ---
const MARCA_J1 = 'X';
const MARCA_J2 = 'O';
const PUNTOS_PARA_GANAR = 3;
const TIEMPO_CURIOSIDAD = 8; // 8 segundos para leer la curiosidad

let jugador1Seleccionado = null;
let jugador2Seleccionado = null;
let jugadorActual = null;
let jugadorQueRespondioPregunta = null;
let juegoActivo = false;
let estadoTablero = ['', '', '', '', '', '', '', '', ''];
const COMBINACIONES_GANADORAS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;
let listaPreguntasDisponibles = [];
let respuestaCorrectaActual = null;
let tipoPreguntaActual = null;
let intervaloContadorEjercicio = null;

// --- Funciones Principales ---

function mostrarPantallaSeleccion() {
    console.log("Mostrando pantalla de selección...");
    establecerFondoAleatorio();

    // Ocultar todas las demás pantallas
    pantallaInicial.classList.add('oculto');
    juegoContenedor.classList.add('oculto');
    pantallaGanador.classList.add('oculto');
    pantallaPregunta.classList.add('oculto');
    pantallaEjercicio.classList.add('oculto');
    modalMensaje.classList.add('oculto');
    modalReglas.classList.add('oculto');

    // Resetear selección y puntajes
    jugador1Seleccionado = null;
    jugador2Seleccionado = null;
    puntajeJugador1 = 0;
    puntajeJugador2 = 0;
    jugadorActual = null;
    jugadorQueRespondioPregunta = null;
    juegoActivo = false;

    // Limpiar contenedor y feedback
    seleccionContenedor.innerHTML = '';
    seleccionFeedback.classList.add('oculto');
    seleccionFeedback.textContent = '';
    botonConfirmarSeleccion.disabled = true;

    // Crear tarjetas de jugador
    JUGADORES_DISPONIBLES.forEach(jugador => {
        const card = document.createElement('div');
        card.classList.add('seleccion-card');
        card.dataset.nombre = jugador.nombre;

        const img = document.createElement('img');
        img.src = jugador.imagen;
        img.alt = `Foto de ${jugador.nombre}`;
        img.onerror = () => { img.src = 'img/jugadores/default.png'; };

        const nameSpan = document.createElement('span');
        nameSpan.textContent = jugador.nombre;

        card.appendChild(img);
        card.appendChild(nameSpan);

        card.addEventListener('click', manejarClickSeleccionJugador);
        seleccionContenedor.appendChild(card);
    });

    // Mostrar pantalla de selección
    pantallaSeleccion.classList.remove('oculto');
}

function manejarClickSeleccionJugador(evento) {
    const cardClicada = evento.currentTarget;
    const nombreClicado = cardClicada.dataset.nombre;
    const jugadorClicado = JUGADORES_DISPONIBLES.find(j => j.nombre === nombreClicado);

    if (!jugadorClicado) return;

    seleccionFeedback.classList.add('oculto');

    // Comprobar si ya está seleccionado
    const esJugador1 = jugador1Seleccionado && jugador1Seleccionado.nombre === nombreClicado;
    const esJugador2 = jugador2Seleccionado && jugador2Seleccionado.nombre === nombreClicado;

    if (esJugador1) {
        // Deseleccionar Jugador 1
        jugador1Seleccionado = null;
        cardClicada.classList.remove('seleccionado');
    } else if (esJugador2) {
        // Deseleccionar Jugador 2
        jugador2Seleccionado = null;
        cardClicada.classList.remove('seleccionado');
    } else {
        // Intentar seleccionar
        if (!jugador1Seleccionado) {
            jugador1Seleccionado = jugadorClicado;
            cardClicada.classList.add('seleccionado');
        } else if (!jugador2Seleccionado) {
            jugador2Seleccionado = jugadorClicado;
            cardClicada.classList.add('seleccionado');
        } else {
            // Ya hay dos seleccionados, mostrar mensaje
            seleccionFeedback.textContent = "¡Ya has elegido 2 jugadores!";
            seleccionFeedback.classList.remove('oculto');
        }
    }

    actualizarEstadoBotonConfirmar();
}

function actualizarEstadoBotonConfirmar() {
    if (jugador1Seleccionado && jugador2Seleccionado) {
        botonConfirmarSeleccion.disabled = false;
    } else {
        botonConfirmarSeleccion.disabled = true;
    }
}

function iniciarJuegoConSeleccionados() {
    if (!jugador1Seleccionado || !jugador2Seleccionado) {
        console.error("Intento de iniciar juego sin 2 jugadores seleccionados.");
        return;
    }

    console.log(`Iniciando juego con: ${jugador1Seleccionado.nombre} (X) vs ${jugador2Seleccionado.nombre} (O)`);

    // Cargar recursos del juego
    cargarPreguntas();

    // Ocultar pantalla de selección
    pantallaSeleccion.classList.add('oculto');

    // Actualizar nombres en el marcador
    nombreJugador1Elem.textContent = jugador1Seleccionado.nombre.toUpperCase();
    fotoJugador1Elem.src = jugador1Seleccionado.imagen;
    fotoJugador1Elem.alt = `Foto ${jugador1Seleccionado.nombre}`;
    puntajeJugador1Elem.textContent = puntajeJugador1;
    puntajeJugador1Elem.dataset.lastScore = 0;

    nombreJugador2Elem.textContent = jugador2Seleccionado.nombre.toUpperCase();
    fotoJugador2Elem.src = jugador2Seleccionado.imagen;
    fotoJugador2Elem.alt = `Foto ${jugador2Seleccionado.nombre}`;
    puntajeJugador2Elem.textContent = puntajeJugador2;
    puntajeJugador2Elem.dataset.lastScore = 0;

    // Iniciar la primera ronda
    iniciarRonda();
}

function cargarPreguntas() {
    if (typeof preguntasQuiz !== 'undefined' && Array.isArray(preguntasQuiz)) {
         listaPreguntasDisponibles = JSON.parse(JSON.stringify(preguntasQuiz));
         console.log("Preguntas cargadas:", listaPreguntasDisponibles.length);
    } else {
        console.error("Error: 'preguntasQuiz' no definido o no es un array.");
        listaPreguntasDisponibles = [];
    }
}

function actualizarMarcadorDisplay() {
    puntajeJugador1Elem.textContent = puntajeJugador1;
    puntajeJugador2Elem.textContent = puntajeJugador2;

    const lastScoreJ1 = parseInt(puntajeJugador1Elem.dataset.lastScore || 0);
    const lastScoreJ2 = parseInt(puntajeJugador2Elem.dataset.lastScore || 0);

    if (puntajeJugador1 > lastScoreJ1) {
        puntajeJugador1Elem.classList.add('actualizado');
        setTimeout(() => puntajeJugador1Elem.classList.remove('actualizado'), 300);
    }
    if (puntajeJugador2 > lastScoreJ2) {
        puntajeJugador2Elem.classList.add('actualizado');
        setTimeout(() => puntajeJugador2Elem.classList.remove('actualizado'), 300);
    }
    puntajeJugador1Elem.dataset.lastScore = puntajeJugador1;
    puntajeJugador2Elem.dataset.lastScore = puntajeJugador2;
}

function actualizarResaltadoFoto() {
    const pantallaPreguntaVisible = !pantallaPregunta.classList.contains('oculto');
    const pantallaEjercicioVisible = !pantallaEjercicio.classList.contains('oculto');

    if (!jugador1Seleccionado || !jugador2Seleccionado) return;

    const jugadorActivoONo = jugadorQueRespondioPregunta || jugadorActual;

    if (!juegoActivo && (pantallaPreguntaVisible || pantallaEjercicioVisible) && jugadorActivoONo) {
         if (jugadorActivoONo.nombre === jugador1Seleccionado.nombre) {
             fotoJugador1Elem.classList.add('activa');
             fotoJugador2Elem.classList.remove('activa');
         } else if (jugadorActivoONo.nombre === jugador2Seleccionado.nombre) {
             fotoJugador2Elem.classList.add('activa');
             fotoJugador1Elem.classList.remove('activa');
         } else {
             fotoJugador1Elem.classList.remove('activa');
             fotoJugador2Elem.classList.remove('activa');
         }
         return;
    }

    if (!juegoActivo) {
        fotoJugador1Elem.classList.remove('activa');
        fotoJugador2Elem.classList.remove('activa');
        return;
    }

    if (jugadorActual && jugadorActual.nombre === jugador1Seleccionado.nombre) {
        fotoJugador1Elem.classList.add('activa');
        fotoJugador2Elem.classList.remove('activa');
    } else if (jugadorActual && jugadorActual.nombre === jugador2Seleccionado.nombre) {
        fotoJugador2Elem.classList.add('activa');
        fotoJugador1Elem.classList.remove('activa');
    } else {
         fotoJugador1Elem.classList.remove('activa');
         fotoJugador2Elem.classList.remove('activa');
    }
}

function iniciarRonda() {
    if (!jugador1Seleccionado || !jugador2Seleccionado) {
        console.error("Intento de iniciar ronda sin jugadores seleccionados.");
        mostrarPantallaSeleccion();
        return;
    }

    estadoTablero = ['', '', '', '', '', '', '', '', ''];
    juegoActivo = true;
    respuestaCorrectaActual = null;
    tipoPreguntaActual = null;
    jugadorQueRespondioPregunta = null;
    if (intervaloContadorEjercicio) clearInterval(intervaloContadorEjercicio);

    // Determinar jugador inicial aleatoriamente
    jugadorActual = (Math.random() < 0.5) ? jugador1Seleccionado : jugador2Seleccionado;

    // Ocultar pantallas y mostrar juego
    pantallaSeleccion.classList.add('oculto');
    pantallaGanador.classList.add('oculto');
    pantallaPregunta.classList.add('oculto');
    pantallaEjercicio.classList.add('oculto');
    modalMensaje.classList.add('oculto');
    modalReglas.classList.add('oculto');
    juegoContenedor.classList.remove('oculto');

    // Ocultar botones que no aplican al inicio de ronda
    botonReiniciar.classList.add('oculto');
    botonVolverAElegir.classList.add('oculto');
    botonSalirASeleccion.classList.add('oculto');

    actualizarMarcadorDisplay();
    actualizarResaltadoFoto();

    // Determinar la marca del jugador actual
    const marcaInicial = (jugadorActual.nombre === jugador1Seleccionado.nombre) ? MARCA_J1 : MARCA_J2;
    infoTurno.textContent = `¡Turno de ${jugadorActual.nombre}! (${marcaInicial})`;

    // Limpiar y preparar tablero
    const tablero = document.getElementById('tablero');
    const celdasActuales = tablero.querySelectorAll('.celda');
    celdasActuales.forEach(celda => {
        celda.innerHTML = '';
        celda.classList.remove('ganadora', 'x', 'o');
        celda.style.cursor = 'pointer';
        const celdaClonada = celda.cloneNode(true);
        celda.replaceWith(celdaClonada);
        celdaClonada.addEventListener('click', manejarClickCelda, { once: true });
    });
    console.log(`Ronda iniciada. Empieza: ${jugadorActual.nombre}. Marcador: ${jugador1Seleccionado.nombre} ${puntajeJugador1} - ${jugador2Seleccionado.nombre} ${puntajeJugador2}`);
}

function manejarClickCelda(evento) {
    if (!juegoActivo || !jugadorActual) return;

    const celdaTarget = evento.target.closest('.celda');
    if (!celdaTarget || !celdaTarget.hasAttribute('data-index')) return;

    const indiceCelda = parseInt(celdaTarget.dataset.index);

    if (estadoTablero[indiceCelda] !== '') return;

    // Determinar marca y clase CSS según quién sea el jugador actual
    const marcaActual = (jugadorActual.nombre === jugador1Seleccionado.nombre) ? MARCA_J1 : MARCA_J2;
    const claseMarca = (marcaActual === MARCA_J1) ? 'x' : 'o';

    estadoTablero[indiceCelda] = marcaActual;
    celdaTarget.innerHTML = `<span class="marca-animada ${claseMarca}">${marcaActual}</span>`;
    celdaTarget.style.cursor = 'default';

    console.log(`Celda ${indiceCelda} clickeada por ${jugadorActual.nombre}. Marca: ${marcaActual}`);

    if (comprobarVictoria(marcaActual)) {
        finalizarJuego(false);
        return;
    }
    if (comprobarEmpate()) {
        finalizarJuego(true);
        return;
    }

    cambiarTurno();
}

function comprobarVictoria(marca) {
    const celdasDOM = document.querySelectorAll('.celda');
    for (const combinacion of COMBINACIONES_GANADORAS) {
        const [a, b, c] = combinacion;
        if (estadoTablero[a] === marca && estadoTablero[b] === marca && estadoTablero[c] === marca) {
             resaltarCeldasGanadoras(combinacion, celdasDOM);
            return true;
        }
    }
    return false;
}

function comprobarEmpate() {
    return estadoTablero.every(celda => celda !== '');
}

function cambiarTurno() {
    // Cambiar al otro jugador
    jugadorActual = (jugadorActual.nombre === jugador1Seleccionado.nombre) ? jugador2Seleccionado : jugador1Seleccionado;

    const marcaSiguiente = (jugadorActual.nombre === jugador1Seleccionado.nombre) ? MARCA_J1 : MARCA_J2;
    infoTurno.textContent = `¡Turno de ${jugadorActual.nombre}! (${marcaSiguiente})`;
    actualizarResaltadoFoto();
    console.log(`Turno cambiado a: ${jugadorActual.nombre}`);
}

function finalizarJuego(esEmpate) {
    juegoActivo = false;
    const celdasFinalizadas = document.querySelectorAll('.celda');
    celdasFinalizadas.forEach(celda => {
         celda.style.cursor = 'default';
    });

    if (esEmpate) {
        infoTurno.textContent = "¡Oh! ¡Empate! 🤝 ¡Aquí tienes una curiosidad divertida!";
        console.log("Ronda finalizada: Empate.");
        jugadorActual = null;
        actualizarResaltadoFoto();
        setTimeout(mostrarCuriosidad, 1500);
    } else {
        // Ganador de la ronda es jugadorActual antes de cambiar turno
        infoTurno.textContent = `¡Bien hecho ${jugadorActual.nombre}! 👍 Responde para ganar el punto...`;
        console.log(`Ronda finalizada: Ganador ${jugadorActual.nombre}. Esperando pregunta.`);
        jugadorQueRespondioPregunta = jugadorActual;
        setTimeout(mostrarPregunta, 1800);
    }
}

function mostrarCuriosidad() {
    if (curiosidadesDivertidas.length === 0) {
        console.log("No quedan curiosidades, recargando...");
        if(curiosidadesDivertidas.length === 0) {
             console.error("¡Fallo crítico al cargar curiosidades!");
             botonReiniciar.classList.remove('oculto');
             infoTurno.textContent = "¡Empate! Hubo un problema mostrando la curiosidad...";
             actualizarResaltadoFoto();
             return;
        }
    }
    
    // Seleccionar una curiosidad aleatoria
    const indiceCuriosidad = Math.floor(Math.random() * curiosidadesDivertidas.length);
    const curiosidad = curiosidadesDivertidas[indiceCuriosidad];
    
    // Configurar la pantalla de curiosidad
    nombreEjercicioElem.textContent = curiosidad.texto;
    contadorEjercicioElem.textContent = "🤔";
    
    // Mostrar categoría si existe
    if (categoriaCuriosidadElem) {
        categoriaCuriosidadElem.textContent = `Categoría: ${curiosidad.categoria || 'General'}`;
    }
    
    // Cambiar el título
    const tituloEjercicio = document.querySelector('#pantalla-ejercicio h2');
    if (tituloEjercicio) {
        tituloEjercicio.textContent = "¡Curiosidad Divertida!";
    }
    
    // Añadir clase especial para estilos de curiosidad
    document.querySelector('.ejercicio-contenido').classList.add('curiosidad');
    
    pantallaEjercicio.classList.remove('oculto');
    
    // Configurar temporizador más corto (8 segundos)
    iniciarContadorEjercicio(TIEMPO_CURIOSIDAD);
}

function iniciarContadorEjercicio(segundos) {
    let tiempoRestante = segundos;
    if (intervaloContadorEjercicio) clearInterval(intervaloContadorEjercicio);
    contadorEjercicioElem.textContent = tiempoRestante;
    intervaloContadorEjercicio = setInterval(() => {
        tiempoRestante--;
        contadorEjercicioElem.textContent = tiempoRestante > 0 ? tiempoRestante : "🎉";
        if (tiempoRestante <= 0) {
            clearInterval(intervaloContadorEjercicio);
            intervaloContadorEjercicio = null;
            pantallaEjercicio.classList.add('oculto');
            infoTurno.textContent = "¡Siguiente ronda! ¿Listos?";
            botonReiniciar.classList.remove('oculto');
            console.log("Curiosidad mostrada.");
            // No debería haber nadie resaltado tras curiosidad
            jugadorActual = null;
            actualizarResaltadoFoto();
        }
    }, 1000);
}

function mostrarPregunta() {
     if (!jugadorQueRespondioPregunta) {
        console.error("Error: Intentando mostrar pregunta sin saber quién respondió.");
        botonReiniciar.classList.remove('oculto');
        infoTurno.textContent = "Error inesperado. Pulsa para siguiente ronda.";
        return;
    }

    if (listaPreguntasDisponibles.length === 0) {
        console.warn("Se agotaron las preguntas.");
        cargarPreguntas();
        if (listaPreguntasDisponibles.length === 0) {
            infoTurno.textContent = "¡Vaya! Se acabaron las preguntas. ¡Ronda de descanso!";
            pantallaPregunta.classList.remove('oculto');
            tituloPreguntaElem.textContent = "¡Fin de las Preguntas!";
            textoPreguntaElem.textContent = "Se han usado todas las preguntas.";
            opcionesPreguntaContenedor.innerHTML = '';
            feedbackPreguntaElem.classList.add('oculto');
            setTimeout(() => {
                pantallaPregunta.classList.add('oculto');
                botonReiniciar.classList.remove('oculto');
                jugadorQueRespondioPregunta = null;
                actualizarResaltadoFoto();
            }, 3000);
            return;
        }
         console.log("Preguntas recargadas.");
    }

    const indicePregunta = Math.floor(Math.random() * listaPreguntasDisponibles.length);
    const preguntaData = listaPreguntasDisponibles.splice(indicePregunta, 1)[0];
    respuestaCorrectaActual = preguntaData.respuestaCorrecta;
    tipoPreguntaActual = preguntaData.tipo || 'multiple';

    tituloPreguntaElem.textContent = `🧠 ¡Pregunta para ${jugadorQueRespondioPregunta.nombre}! 🧠`;
    textoPreguntaElem.textContent = preguntaData.pregunta;
    feedbackPreguntaElem.classList.add('oculto');
    opcionesPreguntaContenedor.innerHTML = '';

    // Crear botones
    if (tipoPreguntaActual === 'vf') {
        const botonVerdadero = document.createElement('button');
        botonVerdadero.textContent = 'Verdadero 👍';
        botonVerdadero.className = 'opcion-btn opcion-vf';
        botonVerdadero.dataset.valor = 'true';
        botonVerdadero.addEventListener('click', manejarRespuestaPregunta);
        opcionesPreguntaContenedor.appendChild(botonVerdadero);

        const botonFalso = document.createElement('button');
        botonFalso.textContent = 'Falso 👎';
        botonFalso.className = 'opcion-btn opcion-vf';
        botonFalso.dataset.valor = 'false';
        botonFalso.addEventListener('click', manejarRespuestaPregunta);
        opcionesPreguntaContenedor.appendChild(botonFalso);
    } else {
        preguntaData.opciones.forEach((opcionTexto, index) => {
            const botonOpcion = document.createElement('button');
            botonOpcion.textContent = opcionTexto;
            botonOpcion.className = 'opcion-btn opcion-multiple';
            botonOpcion.dataset.index = index;
            botonOpcion.addEventListener('click', manejarRespuestaPregunta);
            opcionesPreguntaContenedor.appendChild(botonOpcion);
        });
    }

    pantallaPregunta.classList.remove('oculto');
}

function manejarRespuestaPregunta(evento) {
    const botonClickeado = evento.target;
    const botonesOpcionActuales = Array.from(opcionesPreguntaContenedor.querySelectorAll('.opcion-btn'));
    botonesOpcionActuales.forEach(boton => boton.disabled = true);

    let esCorrecta = false;
    let valorSeleccionado;
    let textoRespuestaCorrecta = '?';

    if (tipoPreguntaActual === 'vf') {
        valorSeleccionado = (botonClickeado.dataset.valor === 'true');
        esCorrecta = (valorSeleccionado === respuestaCorrectaActual);
        const botonCorrectoVF = botonesOpcionActuales.find(btn => (btn.dataset.valor === 'true') === respuestaCorrectaActual);
        if (botonCorrectoVF) textoRespuestaCorrecta = botonCorrectoVF.textContent;
    } else {
        valorSeleccionado = parseInt(botonClickeado.dataset.index);
        esCorrecta = (valorSeleccionado === respuestaCorrectaActual);
        const botonCorrectoMultiple = botonesOpcionActuales.find(btn => parseInt(btn.dataset.index) === respuestaCorrectaActual);
        if (botonCorrectoMultiple) textoRespuestaCorrecta = botonCorrectoMultiple.textContent;
    }

    if (esCorrecta) {
        botonClickeado.classList.add('correcta');
        feedbackPreguntaElem.textContent = "✅ ¡Correctísimo! +1 Punto ✨";
        feedbackPreguntaElem.className = 'feedback-quiz correcto';
    } else {
        botonClickeado.classList.add('incorrecta');
        const botonCorrecto = (tipoPreguntaActual === 'vf')
            ? botonesOpcionActuales.find(btn => (btn.dataset.valor === 'true') === respuestaCorrectaActual)
            : botonesOpcionActuales.find(btn => parseInt(btn.dataset.index) === respuestaCorrectaActual);
        if (botonCorrecto) {
            botonCorrecto.classList.add('correcta');
        }
        feedbackPreguntaElem.textContent = `❌ ¡Ohh! La correcta era: "${textoRespuestaCorrecta}"`;
        feedbackPreguntaElem.className = 'feedback-quiz incorrecto';
    }
    feedbackPreguntaElem.classList.remove('oculto');

    setTimeout(() => {
        procesarResultadoPregunta(esCorrecta);
    }, 2000);
}

function procesarResultadoPregunta(fueCorrecta) {
    pantallaPregunta.classList.add('oculto');

    let mensajeResultado = "";
    const ganadorDeRonda = jugadorQueRespondioPregunta;

    if (!ganadorDeRonda) {
         console.error("Error crítico: No se sabe quién respondió la pregunta.");
         mostrarPantallaSeleccion();
         return;
    }

    if (fueCorrecta) {
        // Incrementar puntaje del jugador correspondiente
        if (ganadorDeRonda.nombre === jugador1Seleccionado.nombre) {
            puntajeJugador1++;
            mensajeResultado = `¡Punto para ${jugador1Seleccionado.nombre}! 💪`;
        } else if (ganadorDeRonda.nombre === jugador2Seleccionado.nombre) {
            puntajeJugador2++;
            mensajeResultado = `¡Punto para ${jugador2Seleccionado.nombre}! 🎉`;
        }
        actualizarMarcadorDisplay();
        console.log(`Respuesta correcta. Marcador: ${jugador1Seleccionado.nombre} ${puntajeJugador1} - ${jugador2Seleccionado.nombre} ${puntajeJugador2}`);

        // Comprobar si alguien ganó el juego completo
        if (puntajeJugador1 >= PUNTOS_PARA_GANAR || puntajeJugador2 >= PUNTOS_PARA_GANAR) {
            infoTurno.textContent = mensajeResultado;
             setTimeout(() => {
                const campeon = (puntajeJugador1 >= PUNTOS_PARA_GANAR) ? jugador1Seleccionado : jugador2Seleccionado;
                console.log(`¡JUEGO TERMINADO! Ganador: ${campeon.nombre}`);
                mostrarGanadorDelJuego(campeon);
            }, 500);
        } else {
            // El juego continúa
            infoTurno.textContent = mensajeResultado;
            setTimeout(() => {
                  botonReiniciar.classList.remove('oculto');
                  jugadorQueRespondioPregunta = null;
                  actualizarResaltadoFoto();
             }, 1500);
            respuestaCorrectaActual = null;
            tipoPreguntaActual = null;
        }
    } else {
        // Respuesta Incorrecta
        mensajeResultado = `¡Ups! ${ganadorDeRonda.nombre} no sumó el punto. 😅`;
        infoTurno.textContent = mensajeResultado;
        console.log("Respuesta incorrecta.");
        setTimeout(() => {
             botonReiniciar.classList.remove('oculto');
             jugadorQueRespondioPregunta = null;
             actualizarResaltadoFoto();
         }, 1500);
         respuestaCorrectaActual = null;
         tipoPreguntaActual = null;
    }
}

function mostrarGanadorDelJuego(ganador) {
    juegoContenedor.classList.add('oculto');
    pantallaPregunta.classList.add('oculto');
    pantallaEjercicio.classList.add('oculto');

    pantallaGanador.classList.remove('oculto');
    textoGanadorElem.textContent = `🏆 ¡EL CAMPEÓN ES ${ganador.nombre.toUpperCase()}! 🏆`;
    nombreGanadorElem.textContent = ganador.nombre.toUpperCase();
    fotoGanadorElem.src = ganador.imagen;
    fotoGanadorElem.alt = `Foto ${ganador.nombre}`;
    fotoGanadorElem.onerror = () => { fotoGanadorElem.src = 'img/jugadores/default.png'; };

    botonReiniciar.classList.add('oculto');
    botonVolverAElegir.classList.remove('oculto');
    botonSalirASeleccion.classList.remove('oculto');

    fotoJugador1Elem.classList.remove('activa');
    fotoJugador2Elem.classList.remove('activa');
}

function volverAElegirJugadores() {
    console.log("Volviendo a la pantalla de selección de jugadores...");
    pantallaGanador.classList.add('oculto');
    jugador1Seleccionado = null;
    jugador2Seleccionado = null;
    puntajeJugador1 = 0;
    puntajeJugador2 = 0;
    jugadorActual = null;
    juegoActivo = false;
    mostrarPantallaSeleccion();
}

function resaltarCeldasGanadoras(combinacion, celdasDOM) {
    combinacion.forEach(indice => {
        if(celdasDOM && celdasDOM[indice]) {
            celdasDOM[indice].classList.add('ganadora');
        } else {
            console.error("Error al resaltar celda ganadora:", indice);
        }
    });
}

// --- Funciones para Modales ---
function abrirModalMensaje() {
    juegoContenedor.classList.add('oculto');
    pantallaSeleccion.classList.add('oculto');
    pantallaGanador.classList.add('oculto');
    pantallaPregunta.classList.add('oculto');
    pantallaEjercicio.classList.add('oculto');
    modalReglas.classList.add('oculto');

    formMensaje.reset();
    mensajeFeedback.classList.add('oculto');
    mensajeFeedback.className = 'mensaje-estado oculto';
    const submitButton = formMensaje.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = false;
    modalMensaje.classList.remove('oculto');
}

function cerrarModalMensaje() {
    modalMensaje.classList.add('oculto');
    if (juegoContenedor.classList.contains('oculto') && pantallaGanador.classList.contains('oculto')) {
         mostrarPantallaSeleccion();
    } else if (!juegoContenedor.classList.contains('oculto')) {
         // Si el juego estaba activo, no hacemos nada
    } else if (!pantallaGanador.classList.contains('oculto')) {
        pantallaGanador.classList.remove('oculto');
    }
}

async function manejarEnvioMensaje(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    mensajeFeedback.textContent = 'Enviando mensaje... ⏳';
    mensajeFeedback.className = 'mensaje-estado';
    mensajeFeedback.classList.remove('oculto');
    if (submitButton) submitButton.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            mensajeFeedback.textContent = '¡Mensaje enviado con éxito! 😊';
            mensajeFeedback.classList.add('exito');
            form.reset();
            setTimeout(cerrarModalMensaje, 2500);
        } else {
            const data = await response.json().catch(() => ({}));
            let errorMsg = '¡Uy! Hubo un problema al enviar el mensaje.';
            if (data && data.errors) {
                errorMsg = 'Error: ' + data.errors.map(error => error.message).join(', ');
            } else if (response.statusText) {
                 errorMsg = `Error: ${response.statusText}`;
            }
            mensajeFeedback.textContent = errorMsg;
            mensajeFeedback.classList.add('error');
            if (submitButton) submitButton.disabled = false;
        }
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        mensajeFeedback.textContent = 'Error de red. Revisa tu conexión.';
        mensajeFeedback.classList.add('error');
        if (submitButton) submitButton.disabled = false;
    }
}

function abrirModalReglas() {
    juegoContenedor.classList.add('oculto');
    pantallaSeleccion.classList.add('oculto');
    pantallaGanador.classList.add('oculto');
    pantallaPregunta.classList.add('oculto');
    pantallaEjercicio.classList.add('oculto');
    modalMensaje.classList.add('oculto');
    modalReglas.classList.remove('oculto');
}

function cerrarModalReglas() {
    modalReglas.classList.add('oculto');
    if (juegoContenedor.classList.contains('oculto') && pantallaGanador.classList.contains('oculto')) {
         mostrarPantallaSeleccion();
    } else if (!juegoContenedor.classList.contains('oculto')) {
         // Si el juego estaba activo, no hacemos nada
    } else if (!pantallaGanador.classList.contains('oculto')) {
         pantallaGanador.classList.remove('oculto');
    }
}

// --- Event Listeners Iniciales ---
document.addEventListener('DOMContentLoaded', mostrarPantallaSeleccion);

botonConfirmarSeleccion.addEventListener('click', iniciarJuegoConSeleccionados);
botonReiniciar.addEventListener('click', iniciarRonda);
botonVolverAElegir.addEventListener('click', volverAElegirJugadores);
botonSalirASeleccion.addEventListener('click', volverAElegirJugadores);

botonAbrirMensaje.addEventListener('click', abrirModalMensaje);
botonCerrarMensaje.addEventListener('click', cerrarModalMensaje);
formMensaje.addEventListener('submit', manejarEnvioMensaje);

botonMostrarReglas.addEventListener('click', abrirModalReglas);
botonCerrarReglas.addEventListener('click', cerrarModalReglas);

// --- Fin del script ---
console.log("Script del juego (con curiosidades) cargado y listo.");
