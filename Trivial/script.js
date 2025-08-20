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
const TIMER_DURATION = 10;
let timeRemaining = TIMER_DURATION;
let isGamePaused = false; 
let usedRandomNames = new Set();
let usedRandomAvatars = new Set();
let usedRandomColors = new Set();
let currentPlayerAvatarSelectionIndex = -1;
let maxQuestionsAvailable = 0;
let selectedCategories = [];


// --- DATOS CONSTANTES ---
const MAX_PLAYERS = 8;
const randomRailwayNames = ["Traviesín", "Tunelillo", "Rielín", "Vibración Veloz", "Balasto Boss", "Catenaria Kid", "Señalino", "Durmiente Dinámico", "Fibra Óptica Fan", "Amolador As", "Bateadora Berta", "Inspector Hilario", "Durmiente Ágil", "Biela Veloz", "Trenelito", "Vía Láctea", "Pantógrafo Power", "Señor Señal", "Cat-enaria", "Ingeniero Rieles", "Desvío Divertido", "Terraplén Teo", "Túnelín el Astuto", "Puente Patán", "Balasto Brillante", "Soldador Sergio", "Frenada Fantástica", "Inspector Javier", "Silbato Sonriente", "Vagón Valiente", "El Fantasma de la Estación", "El Conductor Loco", "La Locomotora Lenta", "El Vía-jero", "El Tren Expreso", "Maquinista Malabarista", "Controlador Caótico", "Portero Pato", "Despachador Demente", "El Ferrocarril Fugaz", "Estación Estelar", "Señor Vía", "Tren de la Suerte", "Conde de la Convergencia", "Profesor Peralte", "El Mago del Gálibo", "Barón Von Balasto", "Sir Tirafondo", "Voltio Veloz", "El Cometa de la Catenaria", "Pantógrafo Supersónico", "Centella de Cercanías", "El Relámpago de la Recta", "El Maquinista Místico", "La Guardagujas Galáctica", "El Fantasma del Furgón de Cola", "Capitán Cambiador de Ancho", "El Susurrador de Traviesas", "La Croqueta de la Cuneta", "Yeti del Intercity", "Pepinillo en Bi-bloque", "El Ninja de la Nivelación", "Zombie de Zona Neutra"];
const avatarIcons = ['fas fa-train', 'fas fa-tram', 'fas fa-bus', 'fas fa-car-side', 'fas fa-plane', 'fas fa-ship', 'fas fa-bicycle', 'fas fa-truck-ramp-box', 'fas fa-rocket', 'fas fa-motorcycle', 'fas fa-shuttle-space', 'fas fa-helicopter', 'fas fa-bus-simple', 'fas fa-caravan'];
const defaultPlayerColors = [
    '#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2', '#00CED1', 
    '#FF8C00', '#DA70D6', '#ADFF2F', '#DC143C', '#FF4500', '#9932CC', 
    '#20B2AA', '#FF1493', '#00BFFF', '#7FFF00', '#BA55D3', '#F4A460', 
    '#FF69B4', '#00FFFF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'
  ];
const CATEGORY_ICONS = {
    "Elementos Estructurales de la Vía": "fas fa-layer-group",
    "Sistemas y Tecnologías": "fas fa-microchip",
    "Historia Ferroviaria": "fas fa-landmark",
    "Infraestructura y Vía de Alta Velocidad": "fas fa-road",
    "Seguridad y Normativa": "fas fa-shield-alt",
    "Maquinaria Pesada de Vía": "fas fa-tractor",
    "Energía y Catenaria": "fas fa-bolt",
    "Comunicaciones": "fas fa-tower-broadcast",
    "Material Rodante": "fas fa-train-subway",
    "Operación y Circulación": "fas fa-route", 
    "Instalaciones de Seguridad": "fas fa-traffic-light",
    "default": "fas fa-question-circle"
};

// --- REFERENCIAS A ELEMENTOS DEL DOM ---
const splashScreen = document.getElementById('splash-screen');
const playerConfigScreen = document.getElementById('player-config-screen');
const categoryConfigScreen = document.getElementById('category-config-screen');
const categoryGrid = document.getElementById('category-grid');
const selectAllCategoriesBtn = document.getElementById('select-all-categories-btn');
const startGameFromCategoriesBtn = document.getElementById('start-game-from-categories-btn');
const roundConfigScreen = document.getElementById('round-config-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startGameBtn = document.getElementById('start-game-btn');
const playerCardsGrid = document.getElementById('player-cards-grid');
const startMatchBtn = document.getElementById('start-match-btn');
const backToPlayersBtn = document.getElementById('back-to-players-btn');
const backToCategoriesBtn = document.getElementById('back-to-categories-btn');
const decreaseRoundsBtn = document.getElementById('decrease-rounds-btn');
const increaseRoundsBtn = document.getElementById('increase-rounds-btn');
const roundCountSpan = document.getElementById('round-count');
const startGameFromRoundsBtn = document.getElementById('start-game-from-rounds-btn');
const currentPlayerTurnDisplay = document.getElementById('current-player-turn-display');
const questionTextP = document.getElementById('question-text');
const optionsGridDiv = document.getElementById('options-grid');
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackCard = document.getElementById('feedback-card');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackTextContent = document.getElementById('feedback-text-content');
const closeFeedbackBtn = document.getElementById('close-feedback-btn');
const winnerCardContainer = document.getElementById('winner-announcement-card');
const playAgainBtn = document.getElementById('play-again-btn');
const scoreModal = document.getElementById('score-modal');
const modalScoreList = document.getElementById('modal-score-list');
const highScoresBtn = document.getElementById('high-scores-btn');
const highScoresModal = document.getElementById('high-scores-modal');
const highScoresList = document.getElementById('high-scores-list');
const showScoreBtn = document.getElementById('show-score-btn');
const confirmExitModal = document.getElementById('confirm-exit-modal');
const confirmExitYesBtn = document.getElementById('confirm-exit-yes');
const confirmExitNoBtn = document.getElementById('confirm-exit-no');
const fiftyFiftyBtn = document.getElementById('fifty-fifty-btn');
const addTimeBtn = document.getElementById('add-time-btn');
const passQuestionBtn = document.getElementById('pass-question-btn');
const timerBar = document.getElementById('timer-bar');
const timerText = document.getElementById('timer-text');
const timerClock = document.getElementById('timer-clock');
const avatarSelectionModal = document.getElementById('avatar-selection-modal');
const avatarGrid = document.getElementById('avatar-grid');
const colorPalette = document.getElementById('color-palette');
const exitGameBtn = document.getElementById('exit-game-btn');
const turnTransitionModal = document.getElementById('turn-transition-modal');
const turnPlayerName = document.getElementById('turn-player-name');
const turnPlayerAvatar = document.getElementById('turn-player-avatar');
const progressText = document.getElementById('progress-text');
const progressTrainIcon = document.getElementById('progress-train-icon');
const progressStationsContainer = document.getElementById('progress-stations-container');
let categoryIcon, categoryNameSpan;
const questionImageContainer = document.getElementById('question-image-container');
const questionImage = document.getElementById('question-image');
const saveAvatarBtn = document.getElementById('save-avatar-btn');
// /* CAMBIO INICIA: Referencias para el nuevo menú de comodines */
const toggleJokersBtn = document.getElementById('toggle-jokers-btn');
const jokersDropdown = document.getElementById('jokers-dropdown');
// /* CAMBIO TERMINA */


// --- FUNCIONES DE UTILIDAD ---
const showScreen = (screenToShow) => {
    if (!screenToShow) return;
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen) {
        currentScreen.classList.add('is-exiting');
        currentScreen.addEventListener('transitionend', () => {
            currentScreen.classList.remove('active', 'is-exiting');
        }, { once: true });
    }
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

// --- LÓGICA DE CONFIGURACIÓN DE JUGADORES ---
function initPlayerConfigScreen() {
    if (players.length === 0) {
        players.push({ 
            name: getRandomItem(randomRailwayNames, usedRandomNames), 
            score: 0, 
            hasFiftyFiftyJoker: true, 
            hasAddTimeJoker: true, 
            hasPassJoker: true,
            avatar: getRandomItem(avatarIcons, usedRandomAvatars), 
            color: getRandomItem(defaultPlayerColors, usedRandomColors) 
        });
    }
    renderPlayerCards();
}

function renderPlayerCards() {
    playerCardsGrid.innerHTML = '';
    
    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className = 'player-card-config';
        card.style.animationDelay = `${index * 50}ms`;
        card.innerHTML = `
            <button class="remove-player-btn" data-player-index="${index}">×</button>
            <div class="player-avatar-config" data-player-index="${index}" style="background-color: ${player.color};">
                <i class="${player.avatar}"></i>
            </div>
            <input type="text" value="${player.name}" data-player-index="${index}">
            <div class="card-actions">
                <button class="random-name-btn" data-player-index="${index}"><i class="fas fa-dice"></i></button>
            </div>
        `;
        playerCardsGrid.appendChild(card);
    });

    if (players.length < MAX_PLAYERS) {
        const addCard = document.createElement('div');
        addCard.className = 'add-player-card';
        addCard.style.animationDelay = `${players.length * 50}ms`;
        addCard.innerHTML = `<i class="fas fa-plus"></i>`;
        addCard.onclick = () => {
            if (players.length < MAX_PLAYERS) {
                players.push({
                    name: getRandomItem(randomRailwayNames, usedRandomNames),
                    score: 0, 
                    hasFiftyFiftyJoker: true, 
                    hasAddTimeJoker: true, 
                    hasPassJoker: true,
                    avatar: getRandomItem(avatarIcons, usedRandomAvatars), 
                    color: getRandomItem(defaultPlayerColors, usedRandomColors)
                });
                renderPlayerCards();
            }
        };
        playerCardsGrid.appendChild(addCard);
    }
    
    addCardListeners();
}
function addCardListeners() {
    document.querySelectorAll('.player-avatar-config').forEach(avatar => {
        avatar.onclick = (e) => openAvatarSelectionModal(parseInt(e.currentTarget.dataset.playerIndex));
    });
    document.querySelectorAll('.player-card-config input').forEach(input => {
        input.onchange = (e) => {
            const index = parseInt(e.currentTarget.dataset.playerIndex);
            players[index].name = e.target.value.trim();
        };
    });
    document.querySelectorAll('.random-name-btn').forEach(btn => {
        btn.onclick = (e) => {
            const index = parseInt(e.currentTarget.dataset.playerIndex);
            players[index].name = getRandomItem(randomRailwayNames, usedRandomNames);
            players[index].avatar = getRandomItem(avatarIcons, usedRandomAvatars);
            players[index].color = getRandomItem(defaultPlayerColors, usedRandomColors);
            renderPlayerCards();
        };
    });
    document.querySelectorAll('.remove-player-btn').forEach(btn => {
        btn.onclick = (e) => {
            if (players.length > 1) {
                const index = parseInt(e.currentTarget.dataset.playerIndex);
                players.splice(index, 1);
                renderPlayerCards();
            }
        };
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
            renderPlayerCards();
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
            renderPlayerCards();
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
function hideAvatarSelectionModal() { avatarSelectionModal.classList.remove('active'); }

// --- LÓGICA PARA LA PANTALLA DE CATEGORÍAS ---
function initCategoryConfigScreen() {
    categoryGrid.innerHTML = '';
    const allCategories = Object.keys(gameData.preguntas);

    allCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.dataset.category = category;
        const iconClass = CATEGORY_ICONS[category] || CATEGORY_ICONS.default;

        button.innerHTML = `
            <i class="${iconClass}"></i>
            <span class="category-name">${category}</span>
            <i class="fas fa-check-circle check-icon"></i>
        `;
        
        if (selectedCategories.includes(category)) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => {
            button.classList.toggle('selected');
            const categoryName = button.dataset.category;
            if (selectedCategories.includes(categoryName)) {
                selectedCategories = selectedCategories.filter(c => c !== categoryName);
            } else {
                selectedCategories.push(categoryName);
            }
            updateMaxQuestionsAvailable();
            updateCategoryNextButtonState(); 
        });

        categoryGrid.appendChild(button);
    });

    updateMaxQuestionsAvailable();
    updateCategoryNextButtonState();
}

function selectAllCategories() {
    const allCategories = Object.keys(gameData.preguntas);
    selectedCategories = [...allCategories];
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.add('selected'));
    updateMaxQuestionsAvailable();
    updateCategoryNextButtonState();
}

function deselectAllCategories() {
    selectedCategories = [];
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('selected'));
    updateMaxQuestionsAvailable();
    updateCategoryNextButtonState();
}

function updateMaxQuestionsAvailable() {
    maxQuestionsAvailable = selectedCategories.reduce((total, categoryName) => {
        return total + (gameData.preguntas[categoryName] ? gameData.preguntas[categoryName].length : 0);
    }, 0);
}

function updateCategoryNextButtonState() {
    startGameFromCategoriesBtn.disabled = selectedCategories.length === 0;
}


// ================== INICIO MEJORA ==================
// --- FUNCIONES DE PAUSA Y REANUDACIÓN DEL JUEGO ---
function pauseGame() {
    if (!isGamePaused && questionTimer) {
        isGamePaused = true;
        clearInterval(questionTimer);
    }
}

function resumeGame() {
    if (isGamePaused && gameScreen.classList.contains('active')) {
        isGamePaused = false;
        if (timeRemaining > 0) {
            questionTimer = setInterval(updateTimer, 1000);
        }
    }
}
// =================== FIN MEJORA ====================


// --- LÓGICA PRINCIPAL DEL JUEGO ---
function startGame() {
    players.forEach(p => { 
        p.score = 0; 
        p.hasFiftyFiftyJoker = true;
        p.hasAddTimeJoker = true;
        p.hasPassJoker = true;
    });
    currentPlayerIndex = 0; currentQuestionIndex = 0;

    const allQuestions = [];
    selectedCategories.forEach(categoryName => {
        const questionsInCategory = gameData.preguntas[categoryName];
        if (questionsInCategory && Array.isArray(questionsInCategory)) {
            questionsInCategory.forEach(q => {
                allQuestions.push({ ...q, category: categoryName });
            });
        }
    });

    questionsPerGame = questionsPerPlayer * players.length;
    if(questionsPerGame > allQuestions.length) {
        questionsPerGame = allQuestions.length;
    }

    shuffledQuestions = shuffleArray(allQuestions).slice(0, questionsPerGame);
    
    if(shuffledQuestions.length === 0){
        alert("No hay preguntas disponibles para las categorías seleccionadas. Volviendo al inicio.");
        showScreen(splashScreen);
        return;
    }

    progressStationsContainer.innerHTML = '';
    for (let i = 0; i < questionsPerGame; i++) {
        const station = document.createElement('div');
        station.className = 'progress-station';
        progressStationsContainer.appendChild(station);
    }

    showScreen(gameScreen);
    updateGameProgress();
    displayQuestion();
}

function displayQuestion() {
    if (questionTimer) clearInterval(questionTimer);
    if (feedbackTimer) clearTimeout(feedbackTimer);
    feedbackOverlay.classList.remove('show');
    feedbackCard.classList.remove('correct-feedback', 'incorrect-feedback');
    isGamePaused = false; 
    jokersDropdown.classList.remove('active');
    
    const currentPlayer = players[currentPlayerIndex];
    fiftyFiftyBtn.disabled = !currentPlayer.hasFiftyFiftyJoker;
    addTimeBtn.disabled = !currentPlayer.hasAddTimeJoker;
    passQuestionBtn.disabled = !currentPlayer.hasPassJoker;
    
    [fiftyFiftyBtn, addTimeBtn, passQuestionBtn].forEach(btn => btn.classList.remove('used'));
    
    toggleJokersBtn.disabled = !currentPlayer.hasFiftyFiftyJoker && !currentPlayer.hasAddTimeJoker && !currentPlayer.hasPassJoker;

    timeRemaining = TIMER_DURATION;
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    timerBar.style.background = `linear-gradient(90deg, var(--rojo-acento), var(--azul-claro), var(--rojo-acento))`;
    
    timerClock.style.backgroundColor = 'var(--azul-principal)';
    timerClock.classList.remove('pulsing');
    timerText.textContent = TIMER_DURATION;

    setTimeout(() => {
        if (currentQuestionIndex >= shuffledQuestions.length) { endGame(); return; }
        const question = shuffledQuestions[currentQuestionIndex];
        
        categoryIcon = document.getElementById('category-icon');
        categoryNameSpan = document.getElementById('category-name');
        categoryNameSpan.textContent = question.category;
        
        categoryIcon.classList.remove('animate-category');
        void categoryIcon.offsetWidth;
        let iconClass = CATEGORY_ICONS[question.category] || CATEGORY_ICONS.default;
        categoryIcon.className = `${iconClass} animate-category`;

        currentPlayerTurnDisplay.classList.remove('animate-in');
        currentPlayerTurnDisplay.innerHTML = `<div class="player-score-avatar" style="background-color: ${currentPlayer.color};"><i class="${currentPlayer.avatar}"></i></div> <span class="player-name-text">${currentPlayer.name}</span>`;
        currentPlayerTurnDisplay.style.backgroundColor = currentPlayer.color;
        void currentPlayerTurnDisplay.offsetWidth;
        currentPlayerTurnDisplay.classList.add('animate-in');

        if (question.imagen && question.imagen.trim() !== '') {
            questionImage.src = question.imagen;
            questionImageContainer.classList.remove('hidden');
        } else {
            questionImageContainer.classList.add('hidden');
            questionImage.src = '';
        }

        questionTextP.textContent = question.pregunta;

        optionsGridDiv.innerHTML = '';
        question.opciones.forEach((opt, i) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.dataset.index = i;
            button.innerHTML = `<span class="option-text">${opt.replace(/^[A-D]\)\s*/, '')}</span>`;
            button.onclick = () => checkAnswer(i);
            button.classList.add('fade-in');
            button.style.animationDelay = `${i * 100}ms`;
            optionsGridDiv.appendChild(button);
        });
        
        // MEJORA: Revelar el área de la pregunta una vez que el contenido nuevo está listo.
        const questionArea = document.getElementById('question-area');
        questionArea.classList.remove('is-hidden');

        timerBar.style.transition = 'width 1s linear, background 1s ease';
        questionTimer = setInterval(updateTimer, 1000);
    }, 300); // Reducimos ligeramente el delay para que sea más ágil
}
function updateTimer() {
    timeRemaining--;
    timerText.textContent = timeRemaining;
    const percentage = (timeRemaining / TIMER_DURATION) * 100;
    timerBar.style.width = `${percentage}%`;
    if (timeRemaining <= 3) {
        timerBar.style.background = `linear-gradient(90deg, var(--rojo-incorrecto), var(--rojo-acento))`; 
        timerClock.style.backgroundColor = 'var(--rojo-acento)';
        timerClock.classList.add('pulsing');
    }
    if (timeRemaining <= 0) { timeUp(); }
}

function checkAnswer(selectedIndex) {
    clearInterval(questionTimer);
    timerClock.classList.remove('pulsing');
    const q = shuffledQuestions[currentQuestionIndex];
    const correctIndex = q.respuestaCorrecta.charCodeAt(0) - 'A'.charCodeAt(0);
    
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        const buttonIndex = parseInt(b.dataset.index);
        const isCorrect = buttonIndex === correctIndex;
        const isSelected = buttonIndex === selectedIndex;

        if (!isCorrect && !isSelected) {
            b.classList.add('faded');
        }

        if (isCorrect || isSelected) {
            const icon = document.createElement('i');
            icon.className = 'answer-icon fas';
            if (isCorrect) {
                icon.classList.add('fa-check');
            } else {
                icon.classList.add('fa-times');
            }
            b.appendChild(icon);
            void icon.offsetWidth;
            icon.classList.add('visible');
        }

        if (isCorrect) b.classList.add('correct');
        else if (isSelected) b.classList.add('incorrect');
    });

    if (selectedIndex === correctIndex) {
        const points = 10 + Math.floor(timeRemaining * 0.5);
        players[currentPlayerIndex].score += points;
        const scoreUpdate = document.createElement('div');
        scoreUpdate.className = 'score-update-plus';
        scoreUpdate.textContent = `+${points}`;
        gameScreen.appendChild(scoreUpdate);
        setTimeout(() => scoreUpdate.remove(), 1000);
        
        feedbackCard.classList.add('correct-feedback');
        feedbackTitle.className = 'correct-feedback';
        feedbackTitle.textContent = "CORRECTO";
    } else {
        feedbackCard.classList.add('incorrect-feedback');
        feedbackTitle.className = 'incorrect-feedback';
        feedbackTitle.textContent = "ERROR";
    }
    
    setTimeout(() => {
        feedbackTextContent.textContent = q.explicacion;
        feedbackOverlay.classList.add('show');
        feedbackTimer = setTimeout(() => goToNextQuestion(true), 5000);
    }, 800);
}

function timeUp() {
    clearInterval(questionTimer);
    timerClock.classList.remove('pulsing');
    const q = shuffledQuestions[currentQuestionIndex];
    const correctIndex = q.respuestaCorrecta.charCodeAt(0) - 'A'.charCodeAt(0);
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (parseInt(b.dataset.index) === correctIndex) {
            b.classList.add('correct');
            const icon = document.createElement('i');
            icon.className = 'answer-icon fas fa-check';
            b.appendChild(icon);
            void icon.offsetWidth;
            icon.classList.add('visible');
        } else {
            b.classList.add('faded');
        }
    });

    feedbackCard.classList.add('incorrect-feedback');
    feedbackTitle.className = 'incorrect-feedback';
    feedbackTitle.textContent = "SE ACABÓ EL TIEMPO";
    
    setTimeout(() => {
        feedbackTextContent.textContent = q.explicacion;
        feedbackOverlay.classList.add('show');
        feedbackTimer = setTimeout(() => goToNextQuestion(true), 5000);
    }, 800);
}

function goToNextQuestion(advancePlayer) {
    if (feedbackTimer) clearTimeout(feedbackTimer);
    feedbackOverlay.classList.remove('show');
    
    // MEJORA: Ocultar el área de la pregunta ANTES de la transición.
    const questionArea = document.getElementById('question-area');
    questionArea.classList.add('is-hidden');
    
    currentQuestionIndex++;
    updateGameProgress();
    
    if (currentQuestionIndex >= shuffledQuestions.length) {
        // Añadimos un pequeño delay para que la animación de ocultar termine antes de ir a la pantalla final
        setTimeout(endGame, 500);
        return;
    }
    
    if (advancePlayer) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        // El delay de la transición de turno da tiempo a que la animación 'is-hidden' termine
        showTurnTransition(displayQuestion);
    } else {
        // Si no hay transición de turno, esperamos un poco antes de mostrar la nueva pregunta
        setTimeout(displayQuestion, 500);
    }
}

function updateGameProgress() {
    if (!progressTrainIcon || !progressText) return;
    const currentDisplayQuestion = Math.min(currentQuestionIndex + 1, questionsPerGame);
    progressText.textContent = `Pregunta ${currentDisplayQuestion} de ${questionsPerGame}`;

    const totalSteps = questionsPerGame > 1 ? questionsPerGame - 1 : 1;
    let progressPercentage = (currentQuestionIndex / totalSteps) * 100;
    if (currentQuestionIndex >= questionsPerGame -1) progressPercentage = 100;

    progressTrainIcon.style.left = `${progressPercentage}%`;
    
    const stations = progressStationsContainer.querySelectorAll('.progress-station');
    stations.forEach((station, index) => {
        station.classList.remove('current', 'visited');
        if (index < currentQuestionIndex) {
            station.classList.add('visited');
        } else if (index === currentQuestionIndex) {
            station.classList.add('current');
        }
    });
}

function useFiftyFiftyJoker() {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.hasFiftyFiftyJoker) return;
    fiftyFiftyBtn.classList.add('used');
    currentPlayer.hasFiftyFiftyJoker = false;
    fiftyFiftyBtn.disabled = true;

    const q = shuffledQuestions[currentQuestionIndex];
    const correctIndex = q.respuestaCorrecta.charCodeAt(0) - 'A'.charCodeAt(0);
    const incorrectIndices = [0, 1, 2, 3].filter(index => index !== correctIndex);
    const indicesToHide = shuffleArray(incorrectIndices).slice(0, 2);
    
    indicesToHide.forEach(index => {
        const button = optionsGridDiv.querySelector(`[data-index="${index}"]`);
        if (button) { button.style.visibility = 'hidden'; }
    });
    jokersDropdown.classList.remove('active');
}
function useAddTimeJoker() {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.hasAddTimeJoker) return;
    addTimeBtn.classList.add('used');
    currentPlayer.hasAddTimeJoker = false;
    addTimeBtn.disabled = true;

    timeRemaining += 5;
    if (timeRemaining > TIMER_DURATION) {
        timeRemaining = TIMER_DURATION;
    }
    timerText.textContent = timeRemaining;

    timerBar.classList.add('time-added-flash');
    setTimeout(() => {
        timerBar.classList.remove('time-added-flash');
    }, 500);
    
    const percentage = (timeRemaining / TIMER_DURATION) * 100;
    timerBar.style.width = `${percentage}%`;
    if (timeRemaining > 3) {
        timerBar.style.background = `linear-gradient(90deg, var(--rojo-acento), var(--azul-claro), var(--rojo-acento))`;
        timerClock.style.backgroundColor = 'var(--azul-principal)';
        timerClock.classList.remove('pulsing');
    }
    jokersDropdown.classList.remove('active');
}

function usePassJoker() {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer.hasPassJoker) return;
    clearInterval(questionTimer);
    passQuestionBtn.classList.add('used');
    currentPlayer.hasPassJoker = false;
    passQuestionBtn.disabled = true;
    jokersDropdown.classList.remove('active');
    goToNextQuestion(false);
}

// --- PANTALLA DE FIN DE JUEGO Y PUNTUACIONES ---
function endGame() {
    if (questionTimer) clearInterval(questionTimer);
    players.forEach(player => saveHighScore(player.name, player.score));
    showScreen(endScreen);
    players.sort((a, b) => b.score - a.score);
    
    const podiumContainer = document.getElementById('podium-container');
    const otherScoresContainer = document.getElementById('other-scores-container');
    podiumContainer.innerHTML = '';
    otherScoresContainer.innerHTML = '';
    winnerCardContainer.innerHTML = '';

    if (players.length > 0) {
        const isTie = players.length > 1 && players[0].score === players[1].score && players[0].score > 0;
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
        if (player.score === 0 && players.filter(p => p.score > 0).length > 0) return;
        let rankClass = '';
        if (rank === 0) rankClass = 'gold'; else if (rank === 1) rankClass = 'silver'; else if (rank === 2) rankClass = 'bronze';
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

// --- MODALES Y RÉCORDS ---
function showScoreModal() {
    pauseGame();
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

function showTurnTransition(callback) {
    const player = players[currentPlayerIndex];
    turnPlayerName.textContent = player.name;
    turnPlayerAvatar.innerHTML = `<i class="${player.avatar}"></i>`;
    turnPlayerAvatar.style.backgroundColor = player.color;

    turnTransitionModal.classList.add('active');

    setTimeout(() => {
        turnTransitionModal.classList.remove('active');
        setTimeout(callback, 300); 
    }, 1500);
}

function hideScoreModal() { 
    scoreModal.classList.remove('active');
    resumeGame();
}

function showConfirmExitModal() { 
    pauseGame(); 
    confirmExitModal.classList.add('active'); 
}

function hideConfirmExitModal() { 
    confirmExitModal.classList.remove('active');
    resumeGame();
}

function saveHighScore(name, score) {
    if (score === 0) return;
    const highScores = JSON.parse(localStorage.getItem('ferroviarioHighScores')) || [];
    highScores.push({ name, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('ferroviarioHighScores', JSON.stringify(highScores.slice(0, 10)));
}

function showHighScoresModal() {
    const highScores = JSON.parse(localStorage.getItem('ferroviarioHighScores')) || [];
    highScoresList.innerHTML = '';
    if (highScores.length === 0) {
        highScoresList.innerHTML = '<li>Aún no hay récords. ¡Sé el primero!</li>';
    } else {
        highScores.forEach((score, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="rank">#${index + 1}</span><span class="name">${score.name}</span><span class="score">${score.score}</span>`;
            highScoresList.appendChild(li);
        });
    }
    highScoresModal.classList.add('active');
}
function hideHighScoresModal() { highScoresModal.classList.remove('active'); }

function initializeEventListeners() {
    startGameBtn.addEventListener('click', () => { showScreen(playerConfigScreen); initPlayerConfigScreen(); });
    startMatchBtn.addEventListener('click', () => { showScreen(categoryConfigScreen); initCategoryConfigScreen(); });
    
    selectAllCategoriesBtn.addEventListener('click', () => {
        const totalCategories = categoryGrid.children.length;
        if (selectedCategories.length < totalCategories) {
            selectAllCategories();
        } else {
            deselectAllCategories();
        }
    });

    startGameFromCategoriesBtn.addEventListener('click', () => {
        if (startGameFromCategoriesBtn.disabled) return;
        showScreen(roundConfigScreen);
    });
    
    backToPlayersBtn.addEventListener('click', () => showScreen(playerConfigScreen));
    backToCategoriesBtn.addEventListener('click', () => showScreen(categoryConfigScreen));

    decreaseRoundsBtn.addEventListener('click', () => { let count = parseInt(roundCountSpan.textContent); if (count > 1) roundCountSpan.textContent = --count; });
    
    increaseRoundsBtn.addEventListener('click', () => { 
        let count = parseInt(roundCountSpan.textContent); 
        const max = players.length > 0 ? Math.floor(maxQuestionsAvailable / players.length) : 50;
        if (count < max) roundCountSpan.textContent = ++count; 
    });

    startGameFromRoundsBtn.addEventListener('click', () => { questionsPerPlayer = parseInt(roundCountSpan.textContent); startGame(); });
    showScoreBtn.addEventListener('click', showScoreModal);
    highScoresBtn.addEventListener('click', showHighScoresModal);
    playAgainBtn.addEventListener('click', () => { players = []; selectedCategories = []; showScreen(splashScreen); });
    fiftyFiftyBtn.addEventListener('click', useFiftyFiftyJoker);
    addTimeBtn.addEventListener('click', useAddTimeJoker);
    passQuestionBtn.addEventListener('click', usePassJoker);
    exitGameBtn.addEventListener('click', showConfirmExitModal);
    saveAvatarBtn.addEventListener('click', hideAvatarSelectionModal);
    
    // /* CAMBIO INICIA: Lógica para el menú de comodines */
    toggleJokersBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el clic se propague al 'document' y cierre el menú inmediatamente
        jokersDropdown.classList.toggle('active');
    });

    // Cierra el menú si se hace clic en cualquier otro lugar
    document.addEventListener('click', (e) => {
        if (!jokersDropdown.contains(e.target) && !toggleJokersBtn.contains(e.target)) {
            jokersDropdown.classList.remove('active');
        }
    });
    // /* CAMBIO TERMINA */


    document.querySelectorAll('.close-btn').forEach(b => {
        b.onclick = (e) => {
            const buttonId = e.currentTarget.id;
            const targetScreen = e.currentTarget.dataset.targetScreen;

            if (buttonId === 'close-feedback-btn') {
                goToNextQuestion(true); return;
            }
            if (targetScreen === 'hide-modal') {
                hideScoreModal();
            } else if (targetScreen === 'hide-avatar-modal') {
                hideAvatarSelectionModal();
            } else if (targetScreen === 'hide-high-scores-modal') {
                hideHighScoresModal();
            } else if (targetScreen) {
                const target = document.getElementById(targetScreen);
                if (target) showScreen(target);
            }
        };
    });
    
    confirmExitYesBtn.addEventListener('click', () => { if (questionTimer) clearInterval(questionTimer); isGamePaused = false; players = []; selectedCategories = []; hideConfirmExitModal(); showScreen(splashScreen); });
    confirmExitNoBtn.addEventListener('click', hideConfirmExitModal);
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
            startGameBtn.disabled = false;
        })
        .catch(error => {
            console.error("No se pudo cargar 'preguntas.json'.", error);
            const title = document.querySelector('#splash-screen h1');
            if (title) {
                title.textContent = 'Error al cargar preguntas';
            }
            if (startGameBtn) {
                startGameBtn.textContent = 'No se puede iniciar';
                startGameBtn.disabled = true;
                startGameBtn.style.backgroundColor = 'var(--gris-oscuro)';
            }
        })
        .finally(() => {
            initializeEventListeners();
        });
});