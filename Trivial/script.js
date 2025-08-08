// --- VARIABLES GLOBALES Y DE ESTADO ---
let gameData = {};
let players = [];
let currentPlayerIndex = 0;
let currentQuestionIndex = 0;
let questionsPerGame = 0;
let questionsPerPlayer = 5;
let shuffledQuestions = [];
let feedbackTimer = null;
let questionTimer = null;
const TIMER_DURATION = 20;
let timeRemaining = TIMER_DURATION;
let usedRandomNames = new Set();
let usedRandomAvatars = new Set();
let usedRandomColors = new Set();
let currentPlayerAvatarSelectionIndex = -1;

// --- DATOS CONSTANTES ---
const randomRailwayNames = ["Traviesín", "Tunelillo", "Rielín", "Vibración Veloz", "Balasto Boss", "Catenaria Kid", "Señalino", "Durmiente Dinámico", "Fibra Óptica Fan", "Amolador As", "Bateadora Berta", "Inspector Hilario", "Durmiente Ágil", "Biela Veloz", "Trenelito", "Vía Láctea", "Pantógrafo Power", "Señor Señal", "Cat-enaria", "Ingeniero Rieles", "Desvío Divertido", "Terraplén Teo", "Túnelín el Astuto", "Puente Patán", "Balasto Brillante", "Soldador Sergio", "Frenada Fantástica", "Inspector Javier", "Silbato Sonriente", "Vagón Valiente", "El Fantasma de la Estación", "El Conductor Loco", "La Locomotora Lenta", "El Vía-jero", "El Tren Expreso", "Maquinista Malabarista", "Controlador Caótico", "Portero Pato", "Despachador Demente", "El Ferrocarril Fugaz", "Estación Estelar", "Señor Vía", "Tren de la Suerte"];
const avatarIcons = ['fas fa-train', 'fas fa-locomotive', 'fas fa-subway', 'fas fa-tram', 'fas fa-bus', 'fas fa-car-side', 'fas fa-plane', 'fas fa-ship', 'fas fa-bicycle', 'fas fa-truck-ramp-box', 'fas fa-rocket', 'fas fa-motorcycle', 'fas fa-shuttle-space', 'fas fa-helicopter', 'fas fa-bus-simple', 'fas fa-caravan'];
const defaultPlayerColors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2', '#00CED1', '#FF8C00', '#DA70D6', '#ADFF2F', '#DC143C', '#FF4500', '#9932CC', '#20B2AA', '#FF1493', '#00BFFF', '#7FFF00', '#BA55D3', '#F4A460', '#FF69B4', '#00FFFF'];

// --- REFERENCIAS A ELEMENTOS DEL DOM ---
const splashScreen = document.getElementById('splash-screen');
const playerConfigScreen = document.getElementById('player-config-screen');
const roundConfigScreen = document.getElementById('round-config-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startGameBtn = document.getElementById('start-game-btn');
const decreasePlayersBtn = document.getElementById('decrease-players-btn');
const increasePlayersBtn = document.getElementById('increase-players-btn');
const playerCountSpan = document.getElementById('player-count');
const playerInputsDiv = document.getElementById('player-inputs');
const startMatchBtn = document.getElementById('start-match-btn');
const decreaseRoundsBtn = document.getElementById('decrease-rounds-btn');
const increaseRoundsBtn = document.getElementById('increase-rounds-btn');
const roundCountSpan = document.getElementById('round-count');
const startGameFromRoundsBtn = document.getElementById('start-game-from-rounds-btn');
const currentPlayerTurnDisplay = document.getElementById('current-player-turn-display');
const questionTextP = document.getElementById('question-text');
const optionsGridDiv = document.getElementById('options-grid');
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackTextContent = document.getElementById('feedback-text-content');
const closeFeedbackBtn = document.getElementById('close-feedback-btn');
const winnerCardContainer = document.getElementById('winner-announcement-card');
const playAgainBtn = document.getElementById('play-again-btn');
const scoreModal = document.getElementById('score-modal');
const modalScoreList = document.getElementById('modal-score-list');
const showScoreBtn = document.getElementById('show-score-btn');
const confirmExitModal = document.getElementById('confirm-exit-modal');
const confirmExitYesBtn = document.getElementById('confirm-exit-yes');
const confirmExitNoBtn = document.getElementById('confirm-exit-no');
const fiftyFiftyBtn = document.getElementById('fifty-fifty-btn');
const timerBar = document.getElementById('timer-bar');
const avatarSelectionModal = document.getElementById('avatar-selection-modal');
const avatarGrid = document.getElementById('avatar-grid');
const colorPalette = document.getElementById('color-palette');
const exitGameBtn = document.getElementById('exit-game-btn');
let categoryIcon, categoryNameSpan;

// --- FUNCIONES DE UTILIDAD ---
const showScreen = (screenToShow) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screenToShow.classList.add('active');
};
const shuffleArray = (array) => { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[array[i], array[j]] = [array[j], array[i]]; } return array; };
const getRandomItem = (array, usedSet) => {
    if (usedSet.size >= array.length) usedSet.clear();
    let item;
    do { item = array[Math.floor(Math.random() * array.length)]; } while (usedSet.has(item));
    usedSet.add(item);
    return item;
};
const lightenColor = (hex, percent) => {
    var f = parseInt(hex.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = (f >> 8) & 0x00FF, B = (f) & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p / 100) + R) * 0x10000 + (Math.round((t - G) * p / 100) + G) * 0x100 + (Math.round((t - B) * p / 100) + B)).toString(16).slice(1);
};

// --- LÓGICA DE CONFIGURACIÓN DE JUGADORES ---
function updatePlayerInputs() {
    const playerCount = parseInt(playerCountSpan.textContent);
    while (players.length < playerCount) { players.push({ name: `Jugador ${players.length + 1}`, score: 0, hasFiftyFiftyJoker: true, avatar: getRandomItem(avatarIcons, usedRandomAvatars), color: getRandomItem(defaultPlayerColors, usedRandomColors) }); }
    while (players.length > playerCount) { players.pop(); }

    playerInputsDiv.innerHTML = '';
    players.forEach((player, i) => {
        const group = document.createElement('div');
        group.className = 'player-input-group';
        group.innerHTML = `
            <label for="player-name-${i}">Jugador ${i + 1}:</label>
            <div class="player-avatar-container" data-player-index="${i}" style="background-color: ${player.color};">
                <i class="player-avatar ${player.avatar}"></i>
            </div>
            <input type="text" id="player-name-${i}" value="${player.name}">
            <button type="button" class="random-name-btn" data-player-index="${i}"><i class="fas fa-dice"></i></button>
        `;
        playerInputsDiv.appendChild(group);
    });
    addPlayerInputListeners();
}

function addPlayerInputListeners() {
    playerInputsDiv.querySelectorAll('.random-name-btn').forEach(btn => {
        btn.onclick = (e) => {
            const playerIndex = parseInt(e.currentTarget.dataset.playerIndex);
            players[playerIndex] = { ...players[playerIndex], name: getRandomItem(randomRailwayNames, usedRandomNames), avatar: getRandomItem(avatarIcons, usedRandomAvatars), color: getRandomItem(defaultPlayerColors, usedRandomColors) };
            updatePlayerInputs();
        };
    });
    playerInputsDiv.querySelectorAll('.player-avatar-container').forEach(avatarContainer => {
        avatarContainer.onclick = (event) => openAvatarSelectionModal(parseInt(event.currentTarget.dataset.playerIndex));
    });
    playerInputsDiv.querySelectorAll('input[type="text"]').forEach((input, i) => {
        input.onchange = (event) => { players[i].name = event.target.value.trim(); };
    });
}

function openAvatarSelectionModal(playerIndex) {
    currentPlayerAvatarSelectionIndex = playerIndex;
    const player = players[playerIndex];
    
    avatarGrid.innerHTML = '';
    avatarIcons.forEach(iconClass => {
        const option = document.createElement('div');
        option.className = 'avatar-option';
        option.innerHTML = `<i class="${iconClass}"></i>`;
        if (player.avatar === iconClass) option.classList.add('selected');
        option.onclick = () => {
            player.avatar = iconClass;
            updateAvatarSelectionModal();
            updatePlayerDisplay(playerIndex);
        };
        avatarGrid.appendChild(option);
    });

    colorPalette.innerHTML = '';
    defaultPlayerColors.forEach(color => {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.style.backgroundColor = color;
        if (player.color === color) option.classList.add('selected');
        option.onclick = () => {
            player.color = color;
            updateAvatarSelectionModal();
            updatePlayerDisplay(playerIndex);
        };
        colorPalette.appendChild(option);
    });
    
    avatarSelectionModal.classList.add('active');
}



function updateAvatarSelectionModal() {
    const player = players[currentPlayerAvatarSelectionIndex];
    avatarGrid.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.toggle('selected', opt.querySelector('i').className === player.avatar);
    });
    colorPalette.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.toggle('selected', opt.style.backgroundColor === player.color);
    });
}

function updatePlayerDisplay(playerIndex) {
    const player = players[playerIndex];
    const avatarContainer = document.querySelector(`.player-avatar-container[data-player-index="${playerIndex}"]`);
    avatarContainer.style.backgroundColor = player.color;
    avatarContainer.querySelector('.player-avatar').className = `player-avatar ${player.avatar}`;
}

function hideAvatarSelectionModal() { avatarSelectionModal.classList.remove('active'); }

// --- LÓGICA PRINCIPAL DEL JUEGO ---
function startGame() {
    players.forEach(p => { p.score = 0; p.hasFiftyFiftyJoker = true; });
    currentPlayerIndex = 0; currentQuestionIndex = 0;
    const allQuestions = [];
    for (const category in gameData.preguntas) {
        gameData.preguntas[category].forEach(q => allQuestions.push({ ...q, category }));
    }
    questionsPerGame = questionsPerPlayer * players.length;
    shuffledQuestions = shuffleArray(allQuestions).slice(0, questionsPerGame);
    showScreen(gameScreen);
    displayQuestion();
}

function displayQuestion() {
    if (questionTimer) clearInterval(questionTimer);
    if (feedbackTimer) clearTimeout(feedbackTimer);
    feedbackOverlay.classList.remove('show');
    
    const currentPlayer = players[currentPlayerIndex];
    fiftyFiftyBtn.disabled = !currentPlayer.hasFiftyFiftyJoker;

    timeRemaining = TIMER_DURATION;
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    timerBar.style.background = `linear-gradient(90deg, var(--rojo-acento), var(--azul-claro))`;

    setTimeout(() => {
        if (currentQuestionIndex >= shuffledQuestions.length) { endGame(); return; }
        const question = shuffledQuestions[currentQuestionIndex];
        
        categoryIcon = document.getElementById('category-icon');
        categoryNameSpan = document.getElementById('category-name');
        categoryNameSpan.textContent = question.category;
        categoryIcon.classList.remove('animate-category');
        void categoryIcon.offsetWidth;
        switch (question.category) {
            case "Elementos Estructurales de la Vía": categoryIcon.className = 'fas fa-road animate-category'; break;
            case "Maquinaria y Herramientas": categoryIcon.className = 'fas fa-cogs animate-category'; break;
            case "Sistemas y Tecnologías": categoryIcon.className = 'fas fa-lightbulb animate-category'; break;
            default: categoryIcon.className = 'fas fa-question-circle animate-category';
        }

        currentPlayerTurnDisplay.classList.remove('animate-in');
        currentPlayerTurnDisplay.innerHTML = `<div class="player-score-avatar" style="background-color: ${currentPlayer.color};"><i class="${currentPlayer.avatar}"></i></div> <span class="player-name-text">${currentPlayer.name}</span>`;
        currentPlayerTurnDisplay.style.backgroundColor = currentPlayer.color;
        void currentPlayerTurnDisplay.offsetWidth;
        currentPlayerTurnDisplay.classList.add('animate-in');

        questionTextP.textContent = question.pregunta;

        optionsGridDiv.innerHTML = '';
        question.opciones.forEach((opt, i) => {
            const optLetter = String.fromCharCode(65 + i);
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.dataset.option = optLetter;
            button.textContent = opt;
            button.onclick = () => checkAnswer(optLetter);
            optionsGridDiv.appendChild(button);
        });

        timerBar.style.transition = 'width 1s linear, background 1s ease';
        questionTimer = setInterval(updateTimer, 1000);
    }, 500);
}

function updateTimer() {
    timeRemaining--;
    const percentage = (timeRemaining / TIMER_DURATION) * 100;
    timerBar.style.width = `${percentage}%`;
    if (timeRemaining <= 5) { timerBar.style.background = `linear-gradient(90deg, var(--rojo-incorrecto), var(--rojo-acento))`; }
    if (timeRemaining <= 0) { timeUp(); }
}

function checkAnswer(selectedOption) {
    clearInterval(questionTimer);
    const q = shuffledQuestions[currentQuestionIndex];
    const correct = q.respuestaCorrecta;
    
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.option === correct) b.classList.add('correct');
        else if (b.dataset.option === selectedOption) b.classList.add('incorrect');
    });

    if (selectedOption === correct) {
        players[currentPlayerIndex].score++;
        const scoreUpdate = document.createElement('div');
        scoreUpdate.className = 'score-update-plus';
        scoreUpdate.textContent = '+1';
        gameScreen.appendChild(scoreUpdate);
        setTimeout(() => scoreUpdate.remove(), 1000);
    }

    feedbackTextContent.textContent = q.explicacion;
    feedbackOverlay.classList.add('show');
    feedbackTimer = setTimeout(nextTurn, 3000);
}

function timeUp() {
    clearInterval(questionTimer);
    const q = shuffledQuestions[currentQuestionIndex];
    const correct = q.respuestaCorrecta;
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.option === correct) b.classList.add('correct');
    });
    feedbackTextContent.textContent = "¡Se acabó el tiempo! " + q.explicacion;
    feedbackOverlay.classList.add('show');
    feedbackTimer = setTimeout(nextTurn, 3000);
}

function nextTurn() {
    if (feedbackTimer) clearTimeout(feedbackTimer);
    feedbackOverlay.classList.remove('show');
    currentQuestionIndex++;
    if (currentQuestionIndex >= shuffledQuestions.length) { endGame(); return; }
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    displayQuestion();
}

function useFiftyFiftyJoker() {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.hasFiftyFiftyJoker) return;
    currentPlayer.hasFiftyFiftyJoker = false;
    fiftyFiftyBtn.disabled = true;

    const q = shuffledQuestions[currentQuestionIndex];
    const incorrectOptions = ['A', 'B', 'C', 'D'].filter(opt => opt !== q.respuestaCorrecta);
    const optionsToHide = shuffleArray(incorrectOptions).slice(0, 2);
    
    optionsToHide.forEach(opt => {
        const button = optionsGridDiv.querySelector(`[data-option="${opt}"]`);
        if (button) { button.style.visibility = 'hidden'; }
    });
}

// --- PANTALLA DE FIN DE JUEGO Y PUNTUACIONES ---
function endGame() {
    if (questionTimer) clearInterval(questionTimer);
    showScreen(endScreen);
    players.sort((a, b) => b.score - a.score);
    
    const podiumContainer = document.getElementById('podium-container');
    const otherScoresContainer = document.getElementById('other-scores-container');
    podiumContainer.innerHTML = '';
    otherScoresContainer.innerHTML = '';
    winnerCardContainer.innerHTML = '';

    if (players.length > 0) {
        const isTie = players.length > 1 && players[0].score === players[1].score;
        if (isTie) {
            const tiedWinners = players.filter(p => p.score === players[0].score);
            const winnerNamesHTML = tiedWinners.map(p => `<div class="winner-name">${p.name}</div>`).join('');
            winnerCardContainer.innerHTML = `<div class="winner-card animate" style="border-color: var(--silver);"><h3>¡EMPATE!</h3><div class="trophy-icon"><i class="fas fa-handshake"></i></div><div class="winner-names-tie">${winnerNamesHTML}</div><div class="winner-score">Con ${players[0].score} puntos</div></div>`;
        } else {
            const winner = players[0];
            winnerCardContainer.innerHTML = `<div class="winner-card animate" style="border-color: ${winner.color};"><h3>¡GANADOR!</h3><div class="trophy-icon"><i class="fas fa-trophy"></i></div><div class="winner-avatar" style="background-color: ${winner.color};"><i class="${winner.avatar}"></i></div><div class="winner-name">${winner.name}</div><div class="winner-score">Con ${winner.score} puntos</div></div>`;
        }
    }

    const podiumPlayers = players.slice(0, 3);
    const podiumElements = [];
    podiumPlayers.forEach((player, rank) => {
        let rankClass = '';
        if (rank === 0) rankClass = 'gold'; else if (rank === 1) rankClass = 'silver'; else rankClass = 'bronze';

        const place = document.createElement('div');
        place.className = `podium-place ${rankClass}`;
        place.innerHTML = `<div class="podium-rank"><i class="fas fa-medal"></i></div><div class="podium-avatar" style="background-color: ${player.color};"><i class="${player.avatar}"></i></div><div class="podium-name">${player.name}</div><div class="podium-score">${player.score} pts</div>`;
        podiumElements.push(place);
    });
    
    if (podiumElements[1]) podiumContainer.appendChild(podiumElements[1]);
    if (podiumElements[0]) podiumContainer.appendChild(podiumElements[0]);
    if (podiumElements[2]) podiumContainer.appendChild(podiumElements[2]);

    players.slice(3).forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.style.animationDelay = `${1.8 + index * 0.2}s`;
        card.innerHTML = `<span class="rank">#${index + 4}</span><div class="player-score-avatar" style="background-color: ${player.color};"><i class="${player.avatar}"></i></div><span class="name">${player.name}</span><span class="score">${player.score} pts</span>`;
        otherScoresContainer.appendChild(card);
    });
    generateConfetti();
}

function generateConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.animationDelay = `${Math.random() * 2}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(piece);
    }
}

// --- MODALES ---
function showScoreModal() {
    modalScoreList.innerHTML = '';
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const leaderScore = sortedPlayers.length > 0 ? (sortedPlayers[0].score || 1) : 1;
    
    sortedPlayers.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'score-card-modal';
        listItem.style.borderLeftColor = player.color;
        let rankDisplay = `#${index + 1}`;
        if (index === 0 && player.score > 0) { listItem.classList.add('is-leader'); rankDisplay = '<i class="fas fa-crown"></i>'; }
        if (players[currentPlayerIndex] && players[currentPlayerIndex].name === player.name) { listItem.classList.add('is-current-player'); }
        
        const progress = (player.score / leaderScore) * 100;
        listItem.innerHTML = `
            <div class="score-card-rank">${rankDisplay}</div>
            <div class="player-score-avatar" style="background-color: ${player.color};"><i class="${player.avatar}"></i></div>
            <div class="score-card-details">
                <span class="score-card-name">${player.name}</span>
                <div class="score-progress-bar-bg"><div class="score-progress-bar-fg" style="width: ${progress}%; background: ${player.color};"></div></div>
            </div>
            <div class="score-card-score">${player.score}</div>`;
        modalScoreList.appendChild(listItem);
    });
    scoreModal.classList.add('active');
}

function hideScoreModal() { scoreModal.classList.remove('active'); }
function showConfirmExitModal() { confirmExitModal.classList.add('active'); }
function hideConfirmExitModal() { confirmExitModal.classList.remove('active'); }

// --- INICIALIZACIÓN ---
function initializeEventListeners() {
    const maxQuestionsAvailable = Object.values(gameData.preguntas).flat().length;
    startGameBtn.addEventListener('click', () => { showScreen(playerConfigScreen); updatePlayerInputs(); });
    decreasePlayersBtn.addEventListener('click', () => { if (parseInt(playerCountSpan.textContent) > 1) { playerCountSpan.textContent--; updatePlayerInputs(); } });
    increasePlayersBtn.addEventListener('click', () => { if (parseInt(playerCountSpan.textContent) < 10) { playerCountSpan.textContent++; updatePlayerInputs(); } });
    startMatchBtn.addEventListener('click', () => { showScreen(roundConfigScreen); });
    decreaseRoundsBtn.addEventListener('click', () => { let count = parseInt(roundCountSpan.textContent); if (count > 1) roundCountSpan.textContent = --count; });
    increaseRoundsBtn.addEventListener('click', () => { 
        let count = parseInt(roundCountSpan.textContent); 
        const max = players.length > 0 ? Math.floor(maxQuestionsAvailable / players.length) : 50;
        if (count < max) roundCountSpan.textContent = ++count; 
    });
    startGameFromRoundsBtn.addEventListener('click', () => { questionsPerPlayer = parseInt(roundCountSpan.textContent); startGame(); });
    showScoreBtn.addEventListener('click', showScoreModal);
    playAgainBtn.addEventListener('click', () => { showScreen(splashScreen); });
    fiftyFiftyBtn.addEventListener('click', useFiftyFiftyJoker);
    exitGameBtn.addEventListener('click', showConfirmExitModal);

  // ESTE ES EL NUEVO CÓDIGO CORREGIDO
document.querySelectorAll('.close-btn').forEach(b => {
    b.onclick = (e) => {
        const buttonId = e.currentTarget.id;
        const targetScreen = e.currentTarget.dataset.targetScreen;

        // Caso especial para el botón de cierre del feedback
        if (buttonId === 'close-feedback-btn') {
            nextTurn(); // Llama a la función para avanzar y termina
            return;
        }

        // Lógica original para los demás botones de cierre
        if (targetScreen === 'hide-modal') {
            hideScoreModal();
        } else if (targetScreen === 'hide-avatar-modal') {
            hideAvatarSelectionModal();
        } else if (targetScreen) { // Nos aseguramos de que el target exista
            showScreen(document.getElementById(targetScreen));
        }
    };
});

    confirmExitYesBtn.addEventListener('click', () => { if (questionTimer) clearInterval(questionTimer); hideConfirmExitModal(); showScreen(splashScreen); });
    confirmExitNoBtn.addEventListener('click', hideConfirmExitModal);
    closeFeedbackBtn.addEventListener('click', nextTurn);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('preguntas.json')
        .then(response => { 
            if (!response.ok) {
                throw new Error(`Error de red: ${response.statusText}`);
            }
            return response.json(); 
        })
        .then(data => {
            gameData = data;
            // Habilitar el botón de inicio una vez que los datos están listos
            startGameBtn.disabled = false;
        })
        .catch(error => {
            console.error("No se pudo cargar 'preguntas.json'.", error);
            // Mostrar un error al usuario en la pantalla
            const title = document.querySelector('#splash-screen h1');
            title.textContent = 'Error al cargar preguntas';
            startGameBtn.textContent = 'No se puede iniciar';
            startGameBtn.disabled = true;
            startGameBtn.style.backgroundColor = 'var(--gris-oscuro)';
        })
        .finally(() => {
            // Inicializar los listeners independientemente de si la carga fue exitosa o no
            initializeEventListeners();
        });
});