document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const trainNumberInput = document.getElementById('trainNumberInput');
    const submitButton = document.getElementById('submitButton');
    const resultArea = document.getElementById('resultArea');
    const operatorLogo = document.getElementById('operatorLogo');
    const trainInfo = document.getElementById('trainInfo');
    const routeInfoSpan = document.getElementById('routeInfo');
    const serviceTypeP = document.getElementById('serviceType');
    const errorMessageDiv = document.getElementById('errorMessage');
    const exploreMoreButton = document.getElementById('exploreMoreButton');
    const rangeInfoSection = document.getElementById('rangeInfoSection');
    const closeRangeInfoButton = document.getElementById('closeRangeInfoButton');

    // --- Event Listeners ---
    submitButton.addEventListener('click', findTrainInfo);
    trainNumberInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') findTrainInfo(); });
    exploreMoreButton.addEventListener('click', () => { rangeInfoSection.style.display = 'block'; rangeInfoSection.scrollIntoView({ behavior: 'smooth' }); });
    closeRangeInfoButton.addEventListener('click', () => { rangeInfoSection.style.display = 'none'; });

    // --- Core Logic Function ---
    function findTrainInfo() {
        const trainNumberStr = trainNumberInput.value.trim();
        hideError();
        hideResult();

        if (!/^\d{5}$/.test(trainNumberStr)) {
            showError("¡Ups! El número debe tener exactamente 5 dígitos.");
            return;
        }
        const trainNumber = parseInt(trainNumberStr, 10);

        let service = "";           // "AVE", "Avant", "Alvia", "Iryo", "Ouigo"
        let route = "Ruta desconocida";
        let logo = "";
        let bgColorClass = "";
        let operatorDisplay = "";

        // --- Detailed Range Logic with Avant/Alvia ---

        // 1. Renfe Avant (08xxx) - Logo específico Avant
        if (trainNumber >= 8000 && trainNumber <= 8999) {
            service = "Avant";
            operatorDisplay = "Renfe Avant (Media Distancia AV)";
            logo = "img/avant-logo.png"; // <<< LOGO AVANT
            bgColorClass = "info-box--avant";
            // Copiar/pegar lógica detallada de rutas Avant del script anterior si se desea
            if ([8172, 8312, 8072, 8102, 8192, 8212, 8082, 8292, 8322, 8182].includes(trainNumber)) route = "Probable: Madrid → Toledo (MD AV)";
            else if ([8183, 8273, 8173, 8133, 8153, 8103, 8213, 8283, 33063].includes(trainNumber)) route = "Probable: Toledo → Madrid (MD AV)";
            else if ([8178, 8208, 8058, 8068, 8078, 8278, 8158, 8118, 8168, 8198, 33158, 33198].includes(trainNumber)) route = "Probable: Valladolid → Madrid (MD AV)";
            else if ([8219, 8069, 8079, 8189, 8199, 8209, 8389, 8109, 8129, 8139, 8159, 8169, 8179, 8359].includes(trainNumber)) route = "Probable: Madrid → Valladolid (MD AV)";
             else if ([8190, 8130, 8170, 8180, 8200, 8220, 8140, 8150, 33260].includes(trainNumber)) route = "Probable: Madrid → Puertollano (MD AV)";
             else if ([8191, 8111, 8101, 8161, 8081, 8151, 8211, 8471, 33271].includes(trainNumber)) route = "Probable: Puertollano → Madrid (MD AV)";
             else if ([8075, 8085, 8125, 8155, 8175, 8195, 33155].includes(trainNumber)) route = "Probable: Sevilla → Málaga (MD AV)";
             else if ([8665, 8695, 8705, 8745, 8765, 8785, 33745].includes(trainNumber)) route = "Probable: Málaga → Sevilla (MD AV)";
             else if ([8275, 8295, 8335, 8395, 33275].includes(trainNumber)) route = "Probable: Sevilla → Granada (MD AV)";
             else if ([8475, 8505, 8525, 8575, 34075, 34475].includes(trainNumber)) route = "Probable: Granada → Sevilla (MD AV)";
             else if ([8815, 8835, 8855].includes(trainNumber)) route = "Probable: Málaga → Granada (MD AV)";
             else if ([8915, 8935, 8955].includes(trainNumber)) route = "Probable: Granada → Málaga (MD AV)";
             else if ([8215, 33215].includes(trainNumber)) route = "Probable: Sevilla → Córdoba (MD AV)";
             else if ([8654, 33654].includes(trainNumber)) route = "Probable: Córdoba → Sevilla (MD AV)";
             else if ([33084].includes(trainNumber)) route = "Probable: Antequera → Málaga (MD AV)";
             else if ([8077, 8087, 8187, 8207].includes(trainNumber)) route = "Probable: Lleida → Barcelona (MD AV)";
             else if ([8166, 8186, 8206, 8216].includes(trainNumber)) route = "Probable: Barcelona → Lleida (MD AV)";
             else if ([8287, 8297, 8339, 8377, 8381, 8385, 8387, 8389, 8497, 10111].includes(trainNumber)) route = "Probable: Barcelona → Figueres (MD AV)";
             else if ([8316, 8380, 8382, 8396, 10114, 3290, 3292].includes(trainNumber)) route = "Probable: Figueres → Barcelona (MD AV)";
             else if ([33869].includes(trainNumber)) route = "Probable: Camp Tarragona → Barcelona (MD AV)";
             else if ([33968].includes(trainNumber)) route = "Probable: Barcelona → Camp Tarragona (MD AV)";
             else { route = "Ruta Avant (Media Distancia AV)"; }
        }
        // 2. Renfe Avant - East/South (090xx-093xx) - Logo específico Avant
        else if (trainNumber >= 9000 && trainNumber <= 9399) {
             service = "Avant";
             operatorDisplay = "Renfe Avant (Media Distancia AV)";
             logo = "img/avant-logo.png"; // <<< LOGO AVANT
             bgColorClass = "info-box--avant";
             if (trainNumber >= 9000 && trainNumber <= 9299) { // V14: Alicante-Murcia
                 route = (trainNumber % 2 !== 0) ? "Probable: Murcia → Alicante (MD AV)" : "Probable: Alicante → Murcia (MD AV)";
             } else if (trainNumber === 9374 || trainNumber === 33374) { // Madrid-Albacete
                  route = "Probable: Madrid ↔ Albacete (MD AV)";
             } else { route = "Ruta Avant Este/Sur (Media Distancia AV)"; }
        }
        // 3. Renfe Avant - Specific/Less Common (33xxx, 34xxx) - Logo específico Avant
        else if ((trainNumber >= 33000 && trainNumber <= 33999) || (trainNumber >= 34000 && trainNumber <= 34999)) {
             service = "Avant";
             operatorDisplay = "Renfe Avant (Media Distancia AV)";
             logo = "img/avant-logo.png"; // <<< LOGO AVANT
             bgColorClass = "info-box--avant";
             // Copiar/pegar lógica detallada de rutas Avant del script anterior si se desea
             if ([33063, 33271].includes(trainNumber)) route = "Probable: Toledo → Madrid (MD AV)";
             else if ([33292].includes(trainNumber)) route = "Probable: Madrid → Toledo (MD AV)";
             else if ([33260, 33200].includes(trainNumber)) route = "Probable: Madrid → Puertollano (MD AV)";
             else if ([33271].includes(trainNumber)) route = "Probable: Puertollano → Madrid (MD AV)";
             else if ([33654].includes(trainNumber)) route = "Probable: Córdoba → Sevilla (MD AV)";
             else if ([33155].includes(trainNumber)) route = "Probable: Sevilla → Málaga (MD AV)";
             else if ([33745].includes(trainNumber)) route = "Probable: Málaga → Sevilla (MD AV)";
             else if ([33084].includes(trainNumber)) route = "Probable: Antequera → Málaga (MD AV)";
             else if ([33275].includes(trainNumber)) route = "Probable: Sevilla → Granada (MD AV)";
             else if ([34075, 34475].includes(trainNumber)) route = "Probable: Granada → Sevilla (MD AV)"; // Incluye 34xxx aquí
             else if ([33158, 33088, 33198].includes(trainNumber)) route = "Probable: Valladolid → Madrid (MD AV)";
             else if ([33869].includes(trainNumber)) route = "Probable: Camp Tarragona → Barcelona (MD AV)";
             else if ([33968].includes(trainNumber)) route = "Probable: Barcelona → Camp Tarragona (MD AV)";
             else if ([33067].includes(trainNumber)) route = "Probable: Murcia → Alicante (MD AV)"; // Levante
             else if ([34085].includes(trainNumber)) route = "Probable: Alicante → Murcia (MD AV)"; // Levante 34xxx
             else { route = "Ruta Avant Específica (Media Distancia AV)"; }
        }
        // 4. Renfe AVE South Radial (02xxx)
        else if (trainNumber >= 2000 && trainNumber <= 2999) {
            service = "AVE";
            operatorDisplay = "Renfe AVE (Alta Velocidad)";
            logo = "img/ave-logo.png"; // <<< LOGO AVE
            bgColorClass = "info-box--ave";
            if ([2692, 2783].includes(trainNumber)) route = "Probable ruta transversal (BCN ↔ AGP)";
            else if ([2711, 2761].includes(trainNumber)) route = "Probable ruta transversal (HUE ↔ SVQ)";
            else route = (trainNumber % 2 === 0) ? "Probable: Madrid → Andalucía (AV)" : "Probable: Andalucía → Madrid (AV)";
        }
        // 5. Renfe AVE Northeast Radial/Intra (03xxx)
        else if (trainNumber >= 3000 && trainNumber <= 3999) {
            service = "AVE";
            operatorDisplay = "Renfe AVE (Alta Velocidad)";
            logo = "img/ave-logo.png"; // <<< LOGO AVE
            bgColorClass = "info-box--ave";
             // (Mantener lógica detallada para Figueres/Huesca/Lleida si se desea o simplificar)
            if ([3381, 3385, 3387, 3389, 10111].includes(trainNumber)) route = "Probable: Barcelona → Figueres (AV)";
            else if ([3290, 3292, 3380, 3382, 10114].includes(trainNumber)) route = "Probable: Figueres → Barcelona (AV)";
            else if ([3793].includes(trainNumber)) route = "Probable: Madrid → Huesca (AV)";
            else if ([2711, 3883, 10711].includes(trainNumber)) route = "Probable: Huesca → Madrid/Sur (AV)";
            else route = (trainNumber % 2 !== 0) ? "Probable: Madrid → Noreste (AV)" : "Probable: Noreste → Madrid (AV)";
        }
        // 6. Renfe AVE/Alvia Northwest Radial (04xxx) - Posible Alvia
        else if (trainNumber >= 4000 && trainNumber <= 4999) {
            service = "AVE/Alvia"; // Indicar ambos
            operatorDisplay = "Renfe (AV / Alvia Noroeste)"; // Texto actualizado
            logo = "img/ave-logo.png"; // <<< LOGO AVE (mantener por falta de rango exclusivo Alvia)
            // logo = "img/alvia-logo.png"; // Si se prefiere mostrar logo Alvia aquí
            bgColorClass = "info-box--ave"; // O info-box--alvia si se crea y quiere otro color
            route = (trainNumber % 2 !== 0) ? "Probable: Madrid → Noroeste (AV/Alvia)" : "Probable: Noroeste → Madrid (AV/Alvia)";
        }
         // 7. Renfe AVE/Alvia East/NW/Transversal (05xxx) - Posible Alvia
        else if (trainNumber >= 5000 && trainNumber <= 5999) {
            service = "AVE/Alvia"; // Indicar ambos
            operatorDisplay = "Renfe (AV / Alvia Este/Norte/Transv.)"; // Texto actualizado
            logo = "img/ave-logo.png"; // <<< LOGO AVE (mantener por falta de rango exclusivo Alvia)
             // logo = "img/alvia-logo.png"; // Si se prefiere mostrar logo Alvia aquí
            bgColorClass = "info-box--ave"; // O info-box--alvia
             if ([5183, 5273, 5383].includes(trainNumber)) route = "Probable ruta transversal (Levante ↔ Noroeste) (Alvia?)";
             else if ([5101, 5170, 5200, 5210, 5312].includes(trainNumber)) route = "Probable ruta transversal (Levante ↔ Norte) (Alvia?)";
             else if ([5280, 5371, 5792, 5763].includes(trainNumber)) route = "Probable ruta transversal (Levante ↔ Burgos/Norte) (Alvia?)";
             else if (trainNumber >= 5000 && trainNumber <= 5499 || [5668, 5742, 5817, 5843, 5863, 5903, 5912, 5913, 5962].includes(trainNumber)) route = "Probable: Madrid ↔ Levante (AV/Alvia)";
             else route = "Probable: Madrid ↔ Norte/Noroeste (AV/Alvia)";
        }
        // 8. Renfe AVE Transversal/Short (000xx) - Logo AVE
         else if (trainNumber >= 40 && trainNumber <= 99) { // Reubicado por especificidad
            service = "AVE";
            operatorDisplay = "Renfe AVE (Alta Velocidad)";
            logo = "img/ave-logo.png"; // <<< LOGO AVE
            bgColorClass = "info-box--ave";
            if (trainNumber >= 90) { route = "Probable ruta corta Sur (Ej: Málaga ↔ Córdoba)"; }
            else {
                 if ([40, 41, 42, 43, 50, 51].includes(trainNumber)) route = "Probable ruta transversal (Ej: BCN ↔ SVQ/GRN)";
                 else if ([81, 83].includes(trainNumber)) route = "Probable ruta transversal (Ej: SVQ ↔ VLC)";
                 else route = "Probable ruta transversal AVE";
            }
        }
        // 9. Iryo (06000-06399 y 38xxx)
        else if ((trainNumber >= 6000 && trainNumber <= 6399) || trainNumber == 6400 || (trainNumber >= 38000 && trainNumber <= 38999) ) {
            service = "Iryo";
            operatorDisplay = "Iryo (Alta Velocidad)";
            logo = "img/iryo-logo.png"; // <<< LOGO IRYO
            bgColorClass = "info-box--iryo";
             // Simplificar rutas Iryo ya que los números son menos predecibles
             if ([6010, 6012, 6014, 38136, 38178].includes(trainNumber)) route = "Ruta Iryo (Eje Sur / Transv.)"; // Ejemplos BCN-SVQ, MAD-SVQ/AGP
             else if ([6011, 6013, 6015, 38011, 38860].includes(trainNumber)) route = "Ruta Iryo (Eje Noreste / Transv.)"; // Ejemplos SVQ-BCN, BCN-MAD
             else if ([6062, 6063, 6074, 6082, 6102, 6103, 6122, 6123, 6125, 6142, 6143, 6154, 6162, 6163, 6164, 6182, 6183, 6195, 6202, 6203, 6205, 6223].includes(trainNumber)) route = "Ruta Iryo (Eje Este)"; // Madrid-Levante
             else route = "Ruta Iryo (AV)"; // Genérico
        }
        // 10. Ouigo (06400-06999 y 097xx Int.) - Excluyendo 6400 si Iryo lo tiene
        else if ((trainNumber > 6400 && trainNumber <= 6999) || (trainNumber >= 9700 && trainNumber <= 9719)){ // Incluye 9709, 9710, 9712, 9714, 9716...
             service = "Ouigo";
             operatorDisplay = "Ouigo (Alta Velocidad)";
             logo = "img/ouigo-logo.png"; // <<< LOGO OUIGO
             bgColorClass = "info-box--ouigo";
             if (trainNumber >= 9700) route = "Ruta Ouigo Internacional (BCN ↔ Francia)";
             else if ([6875, 6912, 6924, 6943, 6944, 6904, 6985].includes(trainNumber)) route = "Ruta Ouigo Transversal (VLL ↔ Levante)";
             else if (trainNumber >= 6472 && trainNumber <= 6615) route = "Ruta Ouigo Eje Este (MAD ↔ Levante)"; // Grupo más grande
             else route = "Ruta Ouigo Eje Noreste (MAD ↔ BCN)"; // El resto
        }
        // 11. Renfe AVE International/Special (097xx resto)
        else if (trainNumber >= 9720 && trainNumber <= 9799) { // Rango restante 097xx para Renfe
            service = "AVE";
            operatorDisplay = "Renfe AVE (Internacional/Especial AV)";
            logo = "img/ave-logo.png";
            bgColorClass = "info-box--ave";
            route = "Probable: Madrid/BCN ↔ Frontera Francia (AV)";
        }
         // 12. Special/Reinforcement Range (1xxxx) - Potencialmente AVE/Alvia/Iryo
        else if (trainNumber >= 10000 && trainNumber <= 11999) {
             if ([11814, 11836, 11866, 11890, 11893].includes(trainNumber)) { // Iryo Sur?
                 service = "Iryo";
                 operatorDisplay = "Iryo (Especial Sur AV?)";
                 logo = "img/iryo-logo.png";
                 bgColorClass = "info-box--iryo";
                 route = "Servicio especial Iryo Eje Sur (?)";
             } else { // Asumir Renfe AVE/Alvia por defecto para 1xxxx
                 service = "AVE/Alvia";
                 operatorDisplay = "Renfe (Especial AV/Alvia)";
                 logo = "img/ave-logo.png"; // O alvia-logo.png si se prefiere
                 bgColorClass = "info-box--ave"; // O --alvia
                 if ([10711, 10761].includes(trainNumber)) route = "Probable: Huesca ↔ Sevilla (AV/Alvia)";
                 else route = "Ruta especial o de refuerzo Renfe (AV/Alvia)";
             }
        }

        // --- No Match Found ---
        else {
            showError("¡Ups! Ese número no coincide con un tren conocido. ¡Prueba otro!");
            return;
        }

        // --- Display Results ---
        serviceTypeP.textContent = operatorDisplay;
        routeInfoSpan.textContent = route;
        operatorLogo.src = logo;
        operatorLogo.alt = `Logo de ${service}`;

        trainInfo.className = 'info-box';
        void trainInfo.offsetWidth;
        trainInfo.classList.add(bgColorClass);

        operatorLogo.style.animation = 'none';
        operatorLogo.offsetHeight;
        operatorLogo.style.animation = 'bounceIn 0.6s ease-out';

        resultArea.style.display = 'flex';
    }

    // --- Helper Functions (sin cambios) ---
    function showError(message) { errorMessageDiv.textContent = message; errorMessageDiv.style.display = 'block'; }
    function hideError() { errorMessageDiv.style.display = 'none'; }
    function hideResult() {
        resultArea.style.display = 'none';
        operatorLogo.src = ""; operatorLogo.alt = "";
        routeInfoSpan.textContent = ""; serviceTypeP.textContent = "";
    }
});
