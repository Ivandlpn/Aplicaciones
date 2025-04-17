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
    }
}

// --- Variables Globales ---
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

const CARTAS_IMAGENES = [
    'andalucia.png',
    'barca.png',
    'españa.png',
    'local.png',
    'malaga.png',
    'nacional.png',
    'pinar.png',
    'torremolinos.png'
];

let jugador1Seleccionado = null;
let jugador2Seleccionado = null;
let jugadorActual = null;
let cartasVolteadas = [];
let parejasEncontradas = 0;
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;
let tableroActivo = true;

// --- Elementos del DOM ---
const seleccionContenedor = document.getElementById('seleccion-contenedor');
const seleccionFeedback = document.getElementById('seleccion-feedback');
const botonConfirmarSeleccion = document.getElementById('boton-confirmar-seleccion');
const memocartasContenedor = document.getElementById('memocartas-contenedor');
const tableroMemocartas = document.getElementById('tablero-memocartas');
const infoTurno = document.getElementById('info-turno');
const pantallaGanador = document.getElementById('pantalla-ganador');

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    establecerFondoAleatorio();
    mostrarPantallaSeleccion();
    document.getElementById('boton-volver-inicio').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    document.getElementById('boton-volver-a-elegir').addEventListener('click', volverAElegirJugadores);
    document.getElementById('boton-salir-a-seleccion').addEventListener('click', volverAElegirJugadores);
});

// --- Funciones de Selección de Jugadores ---
function mostrarPantallaSeleccion() {
    seleccionContenedor.innerHTML = '';
    JUGADORES_DISPONIBLES.forEach(jugador => {
        const card = document.createElement('div');
        card.className = 'seleccion-card';
        card.innerHTML = `
            <img src="${jugador.imagen}" alt="${jugador.nombre}">
            <span>${jugador.nombre}</span>
        `;
        card.addEventListener('click', () => manejarClickSeleccionJugador(jugador));
        seleccionContenedor.appendChild(card);
    });
}

function manejarClickSeleccionJugador(jugador) {
    const cards = document.querySelectorAll('.seleccion-card');
    
    if (!jugador1Seleccionado) {
        jugador1Seleccionado = jugador;
        cards.forEach(card => {
            if (card.querySelector('span').textContent === jugador.nombre) {
                card.classList.add('seleccionado');
            }
        });
    } else if (!jugador2Seleccionado && jugador.nombre !== jugador1Seleccionado.nombre) {
        jugador2Seleccionado = jugador;
        cards.forEach(card => {
            if (card.querySelector('span').textContent === jugador.nombre) {
                card.classList.add('seleccionado');
            }
        });
    }

    actualizarEstadoBotonConfirmar();
}

function actualizarEstadoBotonConfirmar() {
    if (jugador1Seleccionado && jugador2Seleccionado) {
        botonConfirmarSeleccion.disabled = false;
        botonConfirmarSeleccion.addEventListener('click', iniciarJuegoConSeleccionados);
        seleccionFeedback.classList.add('oculto');
    } else {
        botonConfirmarSeleccion.disabled = true;
    }
}

// --- Funciones del Juego ---
function iniciarJuegoConSeleccionados() {
    document.getElementById('pantalla-seleccion-jugador').classList.add('oculto');
    memocartasContenedor.classList.remove('oculto');
    
    // Configurar jugadores
    jugadorActual = jugador1Seleccionado;
    actualizarMarcadorDisplay();
    actualizarInfoTurno();
    
    // Iniciar juego
    iniciarJuego();
}

function iniciarJuego() {
    tableroMemocartas.innerHTML = '';
    cartasVolteadas = [];
    parejasEncontradas = 0;
    puntajeJugador1 = 0;
    puntajeJugador2 = 0;
    tableroActivo = true;

    // Crear array de pares de cartas
    const todasLasCartas = [...CARTAS_IMAGENES, ...CARTAS_IMAGENES];
    
    // Mezclar cartas
    for (let i = todasLasCartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todasLasCartas[i], todasLasCartas[j]] = [todasLasCartas[j], todasLasCartas[i]];
    }

    // Crear elementos de cartas
    todasLasCartas.forEach((imagen, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.imagen = imagen;
        carta.innerHTML = `
            <div class="carta-frente">
                <img src="img/memocartas/${imagen}" alt="Carta">
            </div>
            <div class="carta-dorso"></div>
        `;
        carta.addEventListener('click', () => voltearCarta(carta));
        tableroMemocartas.appendChild(carta);
    });

    actualizarMarcadorDisplay();
}

function voltearCarta(carta) {
    if (!tableroActivo || carta.classList.contains('volteada') || 
        carta.classList.contains('encontrada') || cartasVolteadas.length >= 2) {
        return;
    }

    carta.classList.add('volteada');
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
        tableroActivo = false;
        setTimeout(verificarPareja, 1000);
    }
}

function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;
    const sonPareja = carta1.dataset.imagen === carta2.dataset.imagen;

    if (sonPareja) {
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        parejasEncontradas++;

        // Sumar punto al jugador actual
        if (jugadorActual === jugador1Seleccionado) {
            puntajeJugador1++;
        } else {
            puntajeJugador2++;
        }

        actualizarMarcadorDisplay();

        // Verificar si el juego ha terminado
        if (parejasEncontradas === CARTAS_IMAGENES.length) {
            setTimeout(finalizarJuego, 500);
        }
    } else {
        // Voltear las cartas de nuevo
        carta1.classList.remove('volteada');
        carta2.classList.remove('volteada');
        // Cambiar turno
        cambiarTurno();
    }

    cartasVolteadas = [];
    tableroActivo = true;
}

function cambiarTurno() {
    jugadorActual = jugadorActual === jugador1Seleccionado ? jugador2Seleccionado : jugador1Seleccionado;
    actualizarInfoTurno();
}

function actualizarInfoTurno() {
    infoTurno.textContent = `Turno de: ${jugadorActual.nombre}`;
    actualizarResaltadoFoto();
}

function actualizarResaltadoFoto() {
    const foto1 = document.getElementById('foto-jugador1');
    const foto2 = document.getElementById('foto-jugador2');
    
    foto1.classList.toggle('activa', jugadorActual === jugador1Seleccionado);
    foto2.classList.toggle('activa', jugadorActual === jugador2Seleccionado);
}

function actualizarMarcadorDisplay() {
    const nombreJugador1Elem = document.getElementById('nombre-jugador1');
    const nombreJugador2Elem = document.getElementById('nombre-jugador2');
    const puntajeJugador1Elem = document.getElementById('puntaje-jugador1');
    const puntajeJugador2Elem = document.getElementById('puntaje-jugador2');
    const fotoJugador1Elem = document.getElementById('foto-jugador1');
    const fotoJugador2Elem = document.getElementById('foto-jugador2');

    nombreJugador1Elem.textContent = jugador1Seleccionado.nombre;
    nombreJugador2Elem.textContent = jugador2Seleccionado.nombre;
    puntajeJugador1Elem.textContent = puntajeJugador1;
    puntajeJugador2Elem.textContent = puntajeJugador2;
    fotoJugador1Elem.src = jugador1Seleccionado.imagen;
    fotoJugador2Elem.src = jugador2Seleccionado.imagen;
}

function finalizarJuego() {
    const ganador = puntajeJugador1 > puntajeJugador2 ? jugador1Seleccionado : jugador2Seleccionado;
    mostrarGanadorDelJuego(ganador);
}

function mostrarGanadorDelJuego(ganador) {
    memocartasContenedor.classList.add('oculto');
    pantallaGanador.classList.remove('oculto');
    
    const fotoGanador = document.getElementById('foto-ganador');
    const nombreGanador = document.getElementById('nombre-ganador');
    
    fotoGanador.src = ganador.imagen;
    fotoGanador.onload = () => {
        fotoGanador.classList.add('mostrar');
    };
    fotoGanador.onerror = () => {
        console.error('Error al cargar la imagen del ganador');
        fotoGanador.src = 'img/default-winner.png';
    };
    
    nombreGanador.textContent = `¡${ganador.nombre}!`;
    nombreGanador.classList.add('mostrar');
    
    document.getElementById('boton-volver-a-elegir').classList.remove('oculto');
    document.getElementById('boton-salir-a-seleccion').classList.remove('oculto');
}

function volverAElegirJugadores() {
    location.reload();
}
