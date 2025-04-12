/**
 * Script principal de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    const categoriesContainer = document.getElementById('categories-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // Mostrar todas las categorías al cargar la página
    displayCategories(appsData);
    
    // Función para mostrar categorías en el DOM
    function displayCategories(categories) {
        categoriesContainer.innerHTML = '';
        
        categories.forEach(category => {
            const categoryElement = createCategoryElement(category);
            categoriesContainer.appendChild(categoryElement);
        });
    }
    
    // Función para crear el elemento HTML de una categoría
    function createCategoryElement(category) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `
            <h2>${category.category}</h2>
            <i class="fas fa-chevron-down"></i>
        `;
        
        const categoryContent = document.createElement('div');
        categoryContent.className = 'category-content';
        
        // Agregar descripción de la categoría
        const categoryDesc = document.createElement('p');
        categoryDesc.textContent = category.description;
        categoryDesc.style.gridColumn = '1 / -1';
        categoryDesc.style.marginBottom = '1rem';
        categoryDesc.style.fontStyle = 'italic';
        categoryContent.appendChild(categoryDesc);
        
        // Crear tarjetas para cada aplicación
        category.apps.forEach(app => {
            const appCard = createAppCard(app);
            categoryContent.appendChild(appCard);
        });
        
        // Evento para mostrar/ocultar contenido
        categoryHeader.addEventListener('click', function() {
            categoryContent.style.display = categoryContent.style.display === 'none' ? 'grid' : 'none';
            const icon = this.querySelector('i');
            icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
        });
        
        categoryDiv.appendChild(categoryHeader);
        categoryDiv.appendChild(categoryContent);
        
        return categoryDiv;
    }
    
    // Función para crear la tarjeta de una aplicación
    function createAppCard(app) {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        
        appCard.innerHTML = `
            <img src="${app.logo}" alt="${app.name}" class="app-logo">
            <div class="app-content">
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <a href="${app.link.url}" class="app-link" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Visitar sitio
                </a>
            </div>
        `;
        
        return appCard;
    }
    
    // Función para filtrar aplicaciones
    function filterApps(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        if (!searchTerm) {
            displayCategories(appsData);
            return;
        }
        
        const filteredData = appsData.map(category => {
            const filteredApps = category.apps.filter(app => 
                app.name.toLowerCase().includes(searchTerm) || 
                app.description.toLowerCase().includes(searchTerm)
            );
            
            return {
                ...category,
                apps: filteredApps
            };
        }).filter(category => category.apps.length > 0);
        
        displayCategories(filteredData);
    }
    
    // Eventos de búsqueda
    searchBtn.addEventListener('click', function() {
        filterApps(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterApps(searchInput.value);
        }
    });
});