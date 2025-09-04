document.addEventListener('DOMContentLoaded', () => {

    // --- Definición del Catálogo de Defectos (Basado en el anexo de Adif) ---
    const defectCatalog = {
        "Carril": {
            "Estado general (impacto, patinazos)": "IAL",
            "Bache en soldadura": "IAL"
        },
        "Traviesas (Hormigón o Madera)": {
            "Mal estado general (rotura, mala colocación)": "IAL"
        },
        "Balasto": {
            "Contaminación - Gran afloramiento de barro": "IAL",
            "Contaminación - Acumulación de agua": "IL",
            "Insuficiencia de balasto": "IAL",
            "Exceso de balasto sobre traviesas": "IAL"
        },
        "Geometría de Vía": {
            "Alineación - Defecto grave (garrotes, ripados)": "IAL",
            "Alineación - Defecto leve": "IL",
            "Nivelación - Defecto grave (bache)": "IAL",
            "Nivelación - Defecto leve": "IL"
        },
        "Cerramientos": {
            "Mal estado general (grandes tramos)": "IAL",
            "Mal estado puntual": "IL"
        },
        "Drenajes": {
            "Cunetas aterradas totalmente": "IAL",
            "Cunetas aterradas parcialmente": "IL"
        },
        "Otros": {
            "Obstáculos en zona de peligro (gálibo)": "IAL",
            "Señalización en mal estado": "IAL",
            "Desprendimientos en desmonte/túnel": "IAL"
        }
    };

    // --- Estado de la Aplicación ---
    let db = {
        inspections: []
    };
    let currentInspectionId = null;

    // --- Elementos del DOM ---
    const pages = document.querySelectorAll('.page');
    const homePage = document.getElementById('page-home');
    const inspectionDetailPage = document.getElementById('page-inspection-detail');
    const addAnomalyPage = document.getElementById('page-add-anomaly');
    const inspectionsList = document.getElementById('inspections-list');
    const anomaliesList = document.getElementById('anomalies-list');
    const anomalyForm = document.getElementById('anomaly-form');
    const anomalyElementSelect = document.getElementById('anomaly-element');

    // --- Navegación ---
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });
    }

    // --- Lógica de Datos (LocalStorage) ---
    function loadDB() {
        const data = localStorage.getItem('inspectionsDB');
        if (data) {
            db = JSON.parse(data);
        }
    }

    function saveDB() {
        localStorage.setItem('inspectionsDB', JSON.stringify(db));
    }

    // --- Renderizado de Vistas ---
    function renderHomePage() {
        inspectionsList.innerHTML = '';
        if (db.inspections.length === 0) {
            inspectionsList.innerHTML = '<p>No hay inspecciones. Pulse + para crear una nueva.</p>';
            return;
        }
        db.inspections.forEach(insp => {
            const itemCount = insp.anomalies.length;
            const item = document.createElement('div');
            item.className = 'list-item';
            item.dataset.id = insp.id;
            item.innerHTML = `
                <div class="item-header">
                    <span>${insp.linea}</span>
                    <span>${new Date(insp.date).toLocaleDateString()}</span>
                </div>
                <div class="item-details">
                    Tramo: PK ${insp.pkInicio} a ${insp.pkFin} - ${itemCount} anomalías
                </div>
            `;
            item.addEventListener('click', () => {
                currentInspectionId = insp.id;
                renderInspectionDetailPage();
                showPage('page-inspection-detail');
            });
            inspectionsList.appendChild(item);
        });
    }

    function renderInspectionDetailPage() {
        const inspection = db.inspections.find(i => i.id === currentInspectionId);
        if (!inspection) return;

        document.getElementById('inspection-title').textContent = inspection.linea;
        anomaliesList.innerHTML = '';

        if (inspection.anomalies.length === 0) {
            anomaliesList.innerHTML = '<p>No se han registrado anomalías en esta inspección.</p>';
        }

        inspection.anomalies.sort((a,b) => parseFloat(a.pk) - parseFloat(b.pk)).forEach(anomaly => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="item-header">
                    <span>PK ${anomaly.pk} - ${anomaly.element.split(' - ')[0]}</span>
                    <span class="severity-badge severity-${anomaly.severity.toLowerCase()}">${anomaly.severity}</span>
                </div>
                <div class="item-details">
                    ${anomaly.element.split(' - ')[1]}
                </div>
            `;
            anomaliesList.appendChild(item);
        });
    }

    function populateDefectSelect() {
        for (const category in defectCatalog) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = category;
            for (const defect in defectCatalog[category]) {
                const option = document.createElement('option');
                const severity = defectCatalog[category][defect];
                option.value = `${category} - ${defect}`;
                option.textContent = defect;
                option.dataset.severity = severity;
                optgroup.appendChild(option);
            }
            anomalyElementSelect.appendChild(optgroup);
        }
    }
    
    // --- LÓGICA DE GEOLOCALIZACIÓN REFACTORIZADA ---
    function captureGeolocation() {
        if ('geolocation' in navigator) {
            const display = document.getElementById('location-display');
            display.textContent = "Obteniendo coordenadas...";
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                display.textContent = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            }, error => {
                display.textContent = "Error al obtener ubicación.";
                console.error(error);
            }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
        } else {
            alert('La geolocalización no es compatible con tu navegador.');
            document.getElementById('location-display').textContent = 'Geolocalización no disponible.';
        }
    }


    // --- Event Handlers ---
    document.getElementById('btn-new-inspection').addEventListener('click', () => {
        const linea = prompt("Introduce el nombre de la línea:", "LAV Madrid - Barcelona");
        if (!linea) return;
        const pkInicio = prompt("PK de inicio:", "0.000");
        const pkFin = prompt("PK de fin:", "621.000");

        const newInspection = {
            id: `insp_${Date.now()}`,
            linea,
            pkInicio,
            pkFin,
            date: new Date().toISOString(),
            anomalies: []
        };
        db.inspections.unshift(newInspection);
        saveDB();
        renderHomePage();
    });

    // --- MODIFICADO: Captura la ubicación al pulsar el botón ---
    document.getElementById('btn-add-anomaly').addEventListener('click', () => {
        anomalyForm.reset();
        document.getElementById('photo-preview').classList.remove('visible');
        showPage('page-add-anomaly');
        captureGeolocation(); // Llama a la función de geolocalización inmediatamente
    });

    document.querySelectorAll('.back-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetPage = e.target.dataset.target || 'page-inspection-detail';
            if (targetPage === 'page-inspection-detail') {
                 renderInspectionDetailPage();
            }
            showPage(targetPage);
        });
    });
    
    anomalyElementSelect.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const severity = selectedOption.dataset.severity;
        if (severity) {
            document.getElementById('anomaly-severity').value = severity;
        }
    });

    anomalyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inspection = db.inspections.find(i => i.id === currentInspectionId);
        if (!inspection) return;

        const photoPreview = document.getElementById('photo-preview');

        const newAnomaly = {
            id: `anom_${Date.now()}`,
            pk: document.getElementById('anomaly-pk').value,
            element: document.getElementById('anomaly-element').value,
            severity: document.getElementById('anomaly-severity').value,
            notes: document.getElementById('anomaly-notes').value,
            location: document.getElementById('location-display').textContent,
            photo: photoPreview.src.startsWith('data:image') ? photoPreview.src : null
        };

        inspection.anomalies.push(newAnomaly);
        saveDB();
        renderInspectionDetailPage();
        showPage('page-inspection-detail');
    });
    
    // El botón de "Obtener de Nuevo" ahora solo llama a la función
    document.getElementById('btn-get-location').addEventListener('click', captureGeolocation);
    
    // --- NUEVO: Evento para el botón de borrar ubicación ---
    document.getElementById('btn-clear-location').addEventListener('click', () => {
        document.getElementById('location-display').textContent = 'Ubicación no capturada.';
    });

    document.getElementById('anomaly-photo').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            const preview = document.getElementById('photo-preview');
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.classList.add('visible');
            }
            reader.readAsDataURL(file);
        }
    });


    // --- Inicialización ---
    function init() {
        populateDefectSelect();
        loadDB();
        renderHomePage();
        showPage('page-home');
        // Registrar el Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker registrado', reg))
                .catch(err => console.error('Error registrando Service Worker', err));
        }
    }

    init();
});