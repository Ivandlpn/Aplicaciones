document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN ---
    const API_KEY = 'e84ff906e340479416a5dc273280afcc';
    const LATITUDE = 38.2618;
    const LONGITUDE = -0.5284;
    const LANG = 'es';
    const UNITS = 'metric';

    // --- VARIABLES GLOBALES ---
    let fullForecastData = null;
    let dailyForecasts = [];
    let weatherChart = null;

    // --- ELEMENTOS DEL DOM ---
    const greetingEl = document.getElementById('greeting');
    const generationTimestampEl = document.getElementById('generation-timestamp');
    const tabsContainerEl = document.getElementById('day-tabs-container');
    const chartCanvas = document.getElementById('weatherChart');
    const tableHeadEl = document.getElementById('table-head');
    const tableBodyEl = document.getElementById('table-body');
    const tablePlaceholderEl = document.getElementById('table-placeholder');


    // --- INICIALIZACIÓN ---
    const init = async () => {
        updateHeader();
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`);
            if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);
            fullForecastData = await response.json();
            
            processForecastData();
            renderDayTabs();
            updateUIForDay(0); // Mostrar el primer día por defecto
            
        } catch (error) {
            console.error("No se pudo obtener el pronóstico del tiempo", error);
            tabsContainerEl.innerHTML = `<p class="error-message">❌ Error al cargar los datos.</p>`;
            tablePlaceholderEl.textContent = 'No se pudieron cargar los datos del clima.';
        }
    };

    // --- PROCESAMIENTO DE DATOS ---
    const processForecastData = () => {
        const groupedByDay = {};
        fullForecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString(LANG, { day: '2-digit', month: '2-digit', year: 'numeric' });
            if (!groupedByDay[date]) {
                groupedByDay[date] = [];
            }
            groupedByDay[date].push(item);
        });
        dailyForecasts = Object.values(groupedByDay);
    };

    // --- RENDERIZADO DE LA INTERFAZ ---
    const updateHeader = () => {
        const hour = new Date().getHours();
        greetingEl.textContent = hour < 12 ? 'Buenos Días' : hour < 20 ? 'Buenas Tardes' : 'Buenas Noches';
        generationTimestampEl.textContent = new Date().toLocaleString(LANG, {
            day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const renderDayTabs = () => {
        tabsContainerEl.innerHTML = '';
        dailyForecasts.slice(0, 6).forEach((dayData, index) => {
            const date = new Date(dayData[0].dt * 1000);
            const tab = document.createElement('button');
            tab.classList.add('day-tab');
            tab.dataset.dayIndex = index;
            
            let dayName;
            if (index === 0) dayName = 'Hoy';
            else if (index === 1) dayName = 'Mañana';
            else dayName = date.toLocaleDateString(LANG, { weekday: 'long' });

            const dateString = date.toLocaleDateString(LANG, { day: 'numeric', month: 'short' });
            tab.textContent = `${capitalizeFirstLetter(dayName)}, ${dateString}`;
            
            if (index === 0) tab.classList.add('active');
            
            tab.addEventListener('click', () => {
                document.querySelector('.day-tab.active').classList.remove('active');
                tab.classList.add('active');
                updateUIForDay(index);
            });
            tabsContainerEl.appendChild(tab);
        });
    };
    
    const updateUIForDay = (dayIndex) => {
        const dayData = dailyForecasts[dayIndex];
        if (!dayData) return;
        
        tablePlaceholderEl.style.display = 'none';
        renderWeatherChart(dayData);
        renderParametersTable(dayData);
    };

    // --- RENDERIZADO DEL GRÁFICO (Chart.js) ---
    const renderWeatherChart = (dayData) => {
        if (weatherChart) {
            weatherChart.destroy(); // Destruir gráfico anterior para evitar solapamientos
        }
        
        const ctx = chartCanvas.getContext('2d');
        
        const labels = dayData.map(item => new Date(item.dt * 1000).getHours() + 'h');
        const temperatures = dayData.map(item => item.main.temp);
        const feelsLike = dayData.map(item => item.main.feels_like);
        const windSpeeds = dayData.map(item => item.wind.speed * 3.6); // Convertir m/s a km/h

        weatherChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperatura',
                        data: temperatures,
                        borderColor: 'rgba(255, 152, 0, 1)',
                        backgroundColor: 'rgba(255, 152, 0, 0.2)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Sensación',
                        data: feelsLike,
                        borderColor: 'rgba(244, 67, 54, 1)',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Viento (km/h)',
                        data: windSpeeds,
                        borderColor: 'rgba(0, 188, 212, 1)',
                        backgroundColor: 'rgba(0, 188, 212, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y1',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { 
                        type: 'linear', 
                        display: true, 
                        position: 'left',
                        title: { display: true, text: '°C' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'km/h' },
                        grid: { drawOnChartArea: false }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    const unit = context.dataset.yAxisID === 'y1' ? ' km/h' : '°C';
                                    label += context.parsed.y.toFixed(1) + unit;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    };

    // --- RENDERIZADO DE LA TABLA DE PARÁMETROS ---
    const renderParametersTable = (dayData) => {
        // Encabezado con horas
        tableHeadEl.innerHTML = `<tr><th>Parámetro</th>${dayData.map(item => `<th>${new Date(item.dt * 1000).getHours()}h</th>`).join('')}</tr>`;
        
        // Filas de datos
        tableBodyEl.innerHTML = `
            <tr>
                <td class="param-name">Clima</td>
                ${dayData.map(item => `<td><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}" class="weather-icon-small"></td>`).join('')}
            </tr>
            <tr>
                <td class="param-name">Temperatura</td>
                ${dayData.map(item => `<td><span class="bg-value bg-temp">${Math.round(item.main.temp)}°</span></td>`).join('')}
            </tr>
            <tr>
                <td class="param-name">Sensación</td>
                ${dayData.map(item => `<td><span class="bg-value bg-feels-like">${Math.round(item.main.feels_like)}°</span></td>`).join('')}
            </tr>
            <tr>
                <td class="param-name">Nubosidad</td>
                ${dayData.map(item => `<td><span class="bg-value bg-cloud">${item.clouds.all}%</span></td>`).join('')}
            </tr>
            <tr>
                <td class="param-name">Viento (km/h)</td>
                ${dayData.map(item => `<td><span class="bg-value bg-wind">${(item.wind.speed * 3.6).toFixed(1)}</span></td>`).join('')}
            </tr>
             <tr>
                <td class="param-name">Dirección</td>
                ${dayData.map(item => `<td><span class="wind-direction-arrow" style="transform: rotate(${item.wind.deg}deg);" title="${item.wind.deg}°">⬆</span></td>`).join('')}
            </tr>
        `;
    };

    // --- FUNCIONES AUXILIARES ---
    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    // --- EJECUTAR LA APLICACIÓN ---
    init();
});