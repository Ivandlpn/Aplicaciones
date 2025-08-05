// timer-worker.js

let timerInterval;
let timeLeft;

// El worker escucha los mensajes que le envía el script principal.
self.onmessage = function(e) {
    const command = e.data.command;
    const duration = e.data.duration;

    if (command === 'start') {
        timeLeft = duration;
        
        // Limpiamos cualquier intervalo anterior por si acaso.
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeLeft--;

            // Enviamos el tiempo restante de vuelta al script principal.
            self.postMessage({ type: 'tick', timeLeft: timeLeft });

            if (timeLeft <= 0) {
                // Detenemos el intervalo cuando llega a cero.
                clearInterval(timerInterval);
                // Avisamos al script principal que el temporizador ha terminado.
                self.postMessage({ type: 'done' });
            }
        }, 1000);
    } else if (command === 'stop') {
        // Detenemos el intervalo si el script principal lo ordena.
        clearInterval(timerInterval);
        timeLeft = 0;
    }
};