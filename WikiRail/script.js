// script.js

// --- Variables globales ---
let dictionaryData = []; // Almacena todos los datos del diccionario
let currentTermDetail = null; // Almacena el término que se muestra actualmente en el modal

// Mapeo de nombres de categorías (JSON -> Display)
const categoryDisplayNames = {
    "Materials": "Materiales",
    "Machines & Tools": "Máquinas y Herramientas",
    "Components": "Componentes",
    "Techniques": "Técnicas",
    "Personnel": "Personal",
    "Infrastructure": "Infraestructura",
    "Default": "Sin Categoría"
};

// Mapeo simple de categorías (JSON) a iconos
const categoryIcons = {
    "Materials": "fas fa-cubes",
    "Machines & Tools": "fas fa-tools",
    "Components": "fas fa-cog",
    "Techniques": "fas fa-clipboard-check",
    "Personnel": "fas fa-users", // Ícono más representativo para Personal
    "Infrastructure": "fas fa-road",
    "Default": "fas fa-file-alt"
};

// Iconos para los títulos de sección en el modal
const sectionIcons = {
    "Definición": "fas fa-book-open",
    "Componentes Clave": "fas fa-cogs",
    "Funciones": "fas fa-wrench",
    "Consideraciones de Mantenimiento": "fas fa-tools",
    "Términos Relacionados": "fas fa-link",
    "Documentos": "fas fa-file-pdf" // Usamos este icono para la sección de documentos
};


// Función para obtener el icono principal para la tarjeta basado en la categoría
function getCategoryIcon(category) {
    return categoryIcons[category] || categoryIcons["Default"];
}

// Función para obtener el nombre de la categoría para mostrar
function getDisplayCategoryName(category) {
    return categoryDisplayNames[category] || categoryDisplayNames["Default"];
}


// Función para generar el HTML de una sola tarjeta de término
function renderTermCard(term) {
    const hasImage = term.media && term.media.images && term.media.images.length > 0;
    const hasVideo = term.media && term.media.videos && term.media.videos.length > 0;
    const hasPdf = term.media && term.media.pdfs && term.media.pdfs.length > 0;

    const mediaIconsHtml = `
        ${hasImage ? '<i class="fas fa-image" title="Incluye imágenes"></i>' : '<i class="fas fa-image text-gray-300 opacity-50" title="No hay imágenes"></i>'}
        ${hasVideo ? '<i class="fas fa-film" title="Incluye vídeos"></i>' : '<i class="fas fa-film text-gray-300 opacity-50" title="No hay vídeos"></i>'}
        ${hasPdf ? '<i class="fas fa-file-pdf" title="Incluye PDFs"></i>' : '<i class="fas fa-file-pdf text-gray-300 opacity-50" title="No hay PDFs"></i>'}
    `;

    const mainIconClass = getCategoryIcon(term.category);
    const displayCategory = getDisplayCategoryName(term.category); // Obtener nombre traducido
    const hasMainImage = term.media && term.media.images && term.media.images.length > 0;
    const mainImagePath = hasMainImage ? term.media.images[0] : '';

    return `
        <div class="term-card bg-white rounded-xl overflow-hidden shadow-md" data-term-id="${term.id}">
            <div class="h-48 bg-gradient-to-r from-primary to-secondary">
                ${hasMainImage ? `
                    <img src="${mainImagePath}" alt="${term.term}" class="w-full h-full object-cover" aria-hidden="true">
                ` : `
                    <div class="flex items-center justify-center h-full">
                        <i class="${mainIconClass} text-white text-6xl opacity-70" aria-hidden="true"></i>
                    </div>
                `}
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-bold text-gray-800">${term.term}</h3>
                    <span class="bg-primary bg-opacity-10 text-primary text-xs font-medium px-3 py-1 rounded-full">${displayCategory}</span> <!-- Usar nombre traducido -->
                </div>
                <p class="text-gray-600 mb-4">${term.definition}</p>
                <div class="flex justify-between items-center">
                    <span class="text-primary font-medium hover:underline cursor-pointer">Ver detalles</span>
                    <div class="flex space-x-1 text-gray-400">
                        ${mediaIconsHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar un array de términos en el contenedor principal
function displayTerms(termsToDisplay, title = "") {
    const termsListContainer = document.getElementById('terms-list-container');
    const termsListTitle = document.getElementById('terms-list-title');
    const showAllTermsButton = document.getElementById('show-all-terms-button');
    const initialEmptyMessageContainer = document.getElementById('initial-empty-message');

    if (!termsListContainer || !termsListTitle || !showAllTermsButton || !initialEmptyMessageContainer) {
        console.error("Faltan elementos del DOM para mostrar términos.");
        return;
    }

    termsListContainer.innerHTML = ''; // Limpiar contenido existente

    termsListTitle.textContent = title;

    if (title.trim() === '') {
        termsListTitle.classList.add('hidden');
    } else {
        termsListTitle.classList.remove('hidden');
    }

    if (!termsToDisplay || termsToDisplay.length === 0) {
        if (title.trim() !== '') {
             termsListContainer.innerHTML = '<p class="text-center text-gray-600 text-lg">No se encontraron términos que coincidan con tus criterios.</p>';
             initialEmptyMessageContainer.classList.add('hidden');
        } else {
             termsListContainer.innerHTML = '';
             initialEmptyMessageContainer.classList.remove('hidden');
        }

         if (title.trim() !== '' && title !== "Todos los Términos") {
             showAllTermsButton.classList.remove('hidden');
         } else {
             showAllTermsButton.classList.add('hidden');
         }
        return;
    }

    termsToDisplay.forEach(term => {
        const termHtml = renderTermCard(term);
        termsListContainer.innerHTML += termHtml;
    });

    initialEmptyMessageContainer.classList.add('hidden');

     if (title !== "Todos los Términos" && title.trim() !== '') {
         showAllTermsButton.classList.remove('hidden');
     } else {
         showAllTermsButton.classList.add('hidden');
     }
}

// --- Search Functionality ---
function performSearch(query) {
    const lowerCaseQuery = query.toLowerCase().trim();
    const searchInput = document.getElementById('search-input');

    resetFilters();

    if (lowerCaseQuery.length === 0) {
         // Cuando la búsqueda está vacía, puedes mostrar los términos destacados de nuevo
         const randomTerms = [];
         const dataLength = dictionaryData.length;
         if (dataLength > 0) {
             const selectedIndices = new Set();
             while (selectedIndices.size < 3 && selectedIndices.size < dataLength) {
                 const randomIndex = Math.floor(Math.random() * dataLength);
                 if (!selectedIndices.has(randomIndex)) {
                     selectedIndices.add(randomIndex);
                     randomTerms.push(dictionaryData[randomIndex]);
                 }
             }
         }
         displayTerms(randomTerms, "Términos Destacados"); // Muestra los términos aleatorios si hay datos
         if (dataLength === 0) { // If no data loaded at all
              displayTerms([], ""); // Show initial empty message
         }
        return;
    }

    const filteredTerms = dictionaryData.filter(term => {
        const searchFields = [
            term.term,
            term.definition,
            getDisplayCategoryName(term.category), // Search also in displayed category name
            term.category, // Search in raw category name
            ...(term.key_components || []),
            ...(term.functions || []),
            term.maintenance_considerations
        ];
        return searchFields.some(field =>
            field && typeof field === 'string' && field.toLowerCase().includes(lowerCaseQuery)
        );
    });

    // Ordenar los términos filtrados por relevancia
    filteredTerms.sort((a, b) => {
        const aMatchesTerm = a.term.toLowerCase().includes(lowerCaseQuery);
        const bMatchesTerm = b.term.toLowerCase().includes(lowerCaseQuery);

        if (aMatchesTerm && !bMatchesTerm) return -1; // a va primero si coincide en term y b no
        if (!aMatchesTerm && bMatchesTerm) return 1;  // b va primero si coincide en term y a no

        // Si ambos o ninguno coinciden en term, verificar definition
        const aMatchesDefinition = a.definition.toLowerCase().includes(lowerCaseQuery);
        const bMatchesDefinition = b.definition.toLowerCase().includes(lowerCaseQuery);

        if (aMatchesDefinition && !bMatchesDefinition) return -1;
        if (!aMatchesDefinition && bMatchesDefinition) return 1;

        // Si ambos o ninguno coinciden en definition, verificar functions
        const aMatchesFunctions = (a.functions || []).some(f => f.toLowerCase().includes(lowerCaseQuery));
        const bMatchesFunctions = (b.functions || []).some(f => f.toLowerCase().includes(lowerCaseQuery));

        if (aMatchesFunctions && !bMatchesFunctions) return -1;
        if (!aMatchesFunctions && bMatchesFunctions) return 1;

        // Si la coincidencia es igual en todos los campos prioritarios, verificar maintenance_considerations
        const aMatchesMaintenance = (a.maintenance_considerations || '').toLowerCase().includes(lowerCaseQuery);
        const bMatchesMaintenance = (b.maintenance_considerations || '').toLowerCase().includes(lowerCaseQuery);

        if (aMatchesMaintenance && !bMatchesMaintenance) return -1;
        if (!aMatchesMaintenance && bMatchesMaintenance) return 1;

         // Si la coincidencia es igual en todos los campos prioritarios, verificar key_components
        const aMatchesComponents = (a.key_components || []).some(c => c.toLowerCase().includes(lowerCaseQuery));
        const bMatchesComponents = (b.key_components || []).some(c => c.toLowerCase().includes(lowerCaseQuery));

        if (aMatchesComponents && !bMatchesComponents) return -1;
        if (!aMatchesComponents && bMatchesComponents) return 1;


        // Si la coincidencia es igual en todos los campos relevantes, ordenar alfabéticamente por term
        return a.term.localeCompare(b.term);
    });

    displayTerms(filteredTerms, `Resultados de búsqueda para "${query}"`);
}

// --- Filter Functionality ---
function filterTermsByCategory(category) {
    const searchInput = document.getElementById('search-input');

    if (searchInput) searchInput.value = '';
    resetFilters();

    if (!category || category === "All") {
         displayTerms(dictionaryData, "Todos los Términos");
         return;
    }

    const filteredTerms = dictionaryData.filter(term => term.category === category);

    displayTerms(filteredTerms, `Términos en la Categoría: ${getDisplayCategoryName(category)}`);
}

// Helper function to reset active states on filters/categories
function resetFilters() {
     const filterLinks = document.querySelectorAll('.filter-link');
     const categoryCards = document.querySelectorAll('.category-card'); // No category cards in HTML yet
     filterLinks.forEach(link => link.classList.remove('bg-opacity-20'));
     // categoryCards.forEach(card => card.classList.remove('ring-2', 'ring-primary')); // Uncomment if category cards are added
}

// Helper function to set active state on a specific filter/category link
function setActiveFilter(element) {
    resetFilters();
    if (element) {
        element.classList.add('bg-opacity-20');
    }
}


// --- Modal Detail Functions (Actualizada para mostrar placeholder de imagen si no hay) ---
function renderTermDetail(term) {
    console.log("Renderizando detalles para el término:", term);

    // Almacenar el término actual globalmente para usarlo en compartir
    currentTermDetail = term;

    // --- Referencias de elementos del modal ---
    const termDetail = document.getElementById('term-detail');
    const detailTitle = document.getElementById('term-detail-title');
    const detailCategory = document.getElementById('term-detail-category'); // Reference to the category span
    const detailDefinition = document.getElementById('term-detail-definition').querySelector('p');

    // Column containers
    const leftColumn = document.getElementById('term-detail-left-column');
    const rightColumn = document.getElementById('term-detail-right-column');

    // Media related elements
    const mainMediaContainer = document.getElementById('term-detail-main-media');
    const galleryContainer = document.getElementById('term-detail-gallery');
    const documentsContainer = document.getElementById('term-detail-documents');
    const documentList = document.getElementById('term-detail-document-list');

    // Text content sections
    const definitionContainer = document.getElementById('term-detail-definition'); // Reference to the definition div
    const componentsContainer = document.getElementById('term-detail-components');
    const componentList = document.getElementById('term-detail-component-list');
    const functionsContainer = document.getElementById('term-detail-functions');
    const functionList = document.getElementById('term-detail-function-list');
    const maintenanceContainer = document.getElementById('term-detail-maintenance');
    const maintenanceText = maintenanceContainer ? maintenanceContainer.querySelector('p') : null;
    const relatedTermsContainer = document.getElementById('term-detail-related');
    const relatedTermsList = document.getElementById('term-detail-related-list');

    // --- Poblar Título y Categoría ---
    if (detailTitle) detailTitle.textContent = term.term;
    if (detailCategory) detailCategory.textContent = getDisplayCategoryName(term.category);


    // --- Manejar la visibilidad de las columnas y el área de medios ---
    const hasImages = term.media && term.media.images && term.media.images.length > 0;
    const hasVideos = term.media && term.media.videos && term.media.videos.length > 0;
    const hasPdfs = term.media && term.media.pdfs && term.media.pdfs.length > 0;

    // La columna izquierda se muestra si hay imágenes O vídeos O PDFs
    const showLeftColumn = hasImages || hasVideos || hasPdfs;

    if (showLeftColumn) {
        // Mostrar ambas columnas en pantallas grandes
        leftColumn.classList.remove('lg:w-full', 'hidden');
        leftColumn.classList.add('lg:w-1/2');
        rightColumn.classList.remove('lg:w-full');
        rightColumn.classList.add('lg:w-1/2');

        // Asegurarse de que el contenedor principal de medios está visible en esta disposición
        if (mainMediaContainer) {
             mainMediaContainer.classList.remove('hidden');
             mainMediaContainer.className = 'bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4'; // Reset styles for the area

             if (hasImages) {
                 // Si hay imágenes, mostrar la primera imagen
                 updateMainMedia(term.media.images[0], `Imagen principal de ${term.term}`);
             } else if (hasVideos) {
                 // Si no hay imágenes pero sí hay vídeos, mostrar placeholder de vídeo
                 mainMediaContainer.className = 'bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center mb-4 text-primary opacity-30 text-8xl';
                 mainMediaContainer.innerHTML = '<i class="fas fa-film mb-2" aria-hidden="true"></i><span class="text-sm text-gray-500">Vídeo disponible (no implementado)</span>';
             } else {
                 // Si no hay imágenes ni vídeos, pero sí PDFs, mostrar placeholder de 'sin imagen' con icono de categoría
                 mainMediaContainer.className = 'bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center mb-4 text-primary opacity-30 text-8xl';
                 const mainIcon = getCategoryIcon(term.category); // Usar icono de categoría como placeholder
                 mainMediaContainer.innerHTML = `<i class="${mainIcon} mb-2" aria-hidden="true"></i><span class="text-sm text-gray-500">${getDisplayCategoryName(term.category)} - Sin imagen disponible</span>`;
             }
         }


         // Handle Gallery visibility
         if (galleryContainer) {
             galleryContainer.innerHTML = ''; // Limpiar galería
             if (hasImages && term.media.images.length > 1) {
                  galleryContainer.classList.remove('hidden');
                  term.media.images.slice(1).forEach((imgSrc, index) => { // slice(1) gets all images from the second onwards
                     const imgElement = document.createElement('img');
                     imgElement.src = imgSrc;
                     imgElement.alt = `Miniatura ${index + 2} de ${term.term}`; // Adjusted index for alt text
                     imgElement.classList.add('object-cover', 'w-full', 'h-32', 'rounded-lg', 'cursor-pointer', 'transition', 'hover:opacity-75'); // Added hover effect

                     // Add click listener to gallery images
                     imgElement.addEventListener('click', () => {
                         updateMainMedia(imgSrc, imgElement.alt); // Change the main image to the clicked thumbnail
                         // Visually indicate the newly selected main image in the gallery (Optional)
                         galleryContainer.querySelectorAll('img').forEach(img => img.classList.remove('ring-2', 'ring-primary'));
                         imgElement.classList.add('ring-2', 'ring-primary');
                     });

                     galleryContainer.appendChild(imgElement);
                 });
                 // Highlight the first thumbnail initially if there are gallery images
                 const firstThumbnail = galleryContainer.querySelector('img');
                 if(firstThumbnail) firstThumbnail.classList.add('ring-2', 'ring-primary');

             } else {
                  galleryContainer.classList.add('hidden'); // Hide gallery if only one or no images
             }
         }


    } else {
        // Si NO hay imágenes, ni vídeos, ni PDFs, ocultar la columna izquierda
        leftColumn.classList.add('hidden');
        rightColumn.classList.remove('lg:w-1/2');
        rightColumn.classList.add('lg:w-full'); // Hacer que la columna derecha ocupe todo el ancho

         // Mostrar el placeholder de "sin medios ni documentos" en la columna derecha si la izquierda está oculta
         if (mainMediaContainer) {
             mainMediaContainer.classList.remove('hidden');
             mainMediaContainer.className = 'bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center mb-4 text-primary opacity-30 text-8xl'; // Set placeholder styles
             const mainIcon = getCategoryIcon(term.category); // Usar icono de categoría como placeholder
             mainMediaContainer.innerHTML = `<i class="${mainIcon} mb-2" aria-hidden="true"></i><span class="text-sm text-gray-500">${getDisplayCategoryName(term.category)} - Sin medios visuales ni documentos disponibles</span>`;
         }

         // Ocultar la galería y documentos si la columna izquierda está oculta
         if (galleryContainer) galleryContainer.classList.add('hidden');
          if (documentsContainer) documentsContainer.classList.add('hidden');
    }


    // --- Poblar Definición ---
    // Add icon to title - Check if definitionContainer exists before querying its h3
     if (definitionContainer) {
         const definitionTitle = definitionContainer.querySelector('h3');
         if (definitionTitle) {
             const iconClass = sectionIcons["Definición"] || 'fas fa-info-circle'; // Default icon if not found
             definitionTitle.innerHTML = `<i class="${iconClass} mr-2 text-secondary" aria-hidden="true"></i>Definición`;
         }
         if (detailDefinition) detailDefinition.textContent = term.definition;
     } else {
         console.warn("Elemento #term-detail-definition no encontrado.");
     }


    // --- Poblar Medios (Imagen Principal y Galería con interactividad) ---
    // Helper function to update the main media area
    // This function should be defined *inside* renderTermDetail scope
    // or ensure mainMediaContainer is globally accessible or passed.
    // It's already defined inside, so this is fine.
    function updateMainMedia(src, altText = `Imagen de ${term.term}`) {
        if (mainMediaContainer) {
             mainMediaContainer.innerHTML = ''; // Clear existing content
             // Reset classes for the placeholder first
             mainMediaContainer.className = 'bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4';

            if (src && hasImages) { // Only attempt to load image if src is provided AND there are images in data
                const mainImage = document.createElement('img');
                mainImage.src = src;
                mainImage.alt = altText;
                // Asegurarse de que la imagen se adapte manteniendo la proporción y cubriendo el área
                mainImage.classList.add('object-cover', 'w-full', 'h-full', 'rounded-lg');
                // Eliminar clases de placeholder si se muestra una imagen real
                mainMediaContainer.classList.remove('items-center', 'justify-center', 'text-primary', 'opacity-30', 'text-8xl', 'flex-col'); // Remove flex-col and text styles
                 mainMediaContainer.innerHTML = ''; // Clear the placeholder HTML/icon/text
                mainMediaContainer.appendChild(mainImage);
            } else {
                 // This else case now primarily covers showing the placeholder when NO images exist
                 mainMediaContainer.classList.add('flex-col', 'items-center', 'justify-center', 'text-primary', 'opacity-30', 'text-8xl');
                 const mainIcon = getCategoryIcon(term.category); // Usar icono de categoría como placeholder
                 let placeholderText = `${getDisplayCategoryName(term.category)} - Sin imagen disponible`;
                 if(hasVideos) placeholderText += ' (Vídeo disponible)'; // Optional: hint if videos exist
                 if(hasPdfs) placeholderText += ' (Documento(s) disponible(s))'; // Optional: hint if PDFs exist

                 mainMediaContainer.innerHTML = `<i class="${mainIcon} mb-2" aria-hidden="true"></i><span class="text-sm text-gray-500 text-center">${placeholderText}</span>`;

            }
        }
    }

    // Populate Images if they exist (this block only runs if hasImages is true)
    // This call is now made within the main showLeftColumn block above
    // if (hasImages) {
    //      updateMainMedia(term.media.images[0], `Imagen principal de ${term.term}`);
    // }


    // --- Poblar Documentos (PDFs) ---
    // This block now runs regardless of hasVisualMedia, but only affects visibility if showLeftColumn is true
    if (documentsContainer && documentList) {
         documentList.innerHTML = ''; // Limpiar documentos existentes
          const documentsTitle = documentsContainer.querySelector('h3');
          if (documentsTitle) {
               const iconClass = sectionIcons["Documentos"] || 'fas fa-file'; // Default icon
              documentsTitle.innerHTML = `<i class="${iconClass} mr-2 text-secondary" aria-hidden="true"></i>Documentos`;
          }
         if (hasPdfs) { // Check if PDFs exist
             documentsContainer.classList.remove('hidden');
             term.media.pdfs.forEach(pdfSrc => {
                 const listItem = document.createElement('li');
                 const link = document.createElement('a');
                 link.href = pdfSrc;
                 link.target = "_blank";
                 link.classList.add('text-primary', 'hover:underline', 'flex', 'items-center');
                 // Extract filename from URL, handle potential query parameters or hashes
                 try {
                     const url = new URL(pdfSrc, window.location.origin); // Use window.location.origin as base for relative paths
                     const filename = url.pathname.split('/').pop() || 'Documento sin nombre';
                     link.innerHTML = `<i class="fas fa-file-pdf mr-1" aria-hidden="true"></i> ${decodeURIComponent(filename)}`; // Decode filename
                 } catch (e) {
                      console.error("Error parsing PDF URL:", pdfSrc, e);
                      link.innerHTML = `<i class="fas fa-exclamation-triangle mr-1 text-red-500" aria-hidden="true"></i> Enlace inválido`;
                 }

                 listItem.appendChild(link);
                 documentList.appendChild(listItem);
             });
         } else {
             documentsContainer.classList.add('hidden');
         }
    } else if (documentsContainer) { // Ensure document container is hidden if list is missing
         documentsContainer.classList.add('hidden');
    }


    // --- Poblar Componentes Clave ---
     if (componentsContainer && componentList) {
         componentList.innerHTML = ''; // Limpiar lista
          const componentsTitle = componentsContainer.querySelector('h3');
          if (componentsTitle) {
               const iconClass = sectionIcons["Componentes Clave"] || 'fas fa-list'; // Default icon
              componentsTitle.innerHTML = `<i class="${iconClass} mr-2 text-secondary" aria-hidden="true"></i>Componentes Clave`;
          }
         if (term.key_components && term.key_components.length > 0) {
             componentsContainer.classList.remove('hidden'); // Mostrar la sección
             term.key_components.forEach(item => {
                 const li = document.createElement('li');
                 li.textContent = item;
                 componentList.appendChild(li); // Use the new CSS for list items
             });
         } else {
             componentsContainer.classList.add('hidden'); // Ocultar la sección
         }
     } else if (componentsContainer) { // Ensure components container is hidden if list is missing
         componentsContainer.classList.add('hidden');
     }


    // --- Poblar Funciones ---
    if (functionsContainer && functionList) {
        functionList.innerHTML = ''; // Limpiar lista
         const functionsTitle = functionsContainer.querySelector('h3');
          if (functionsTitle) {
               const iconClass = sectionIcons["Funciones"] || 'fas fa-list'; // Default icon
              functionsTitle.innerHTML = `<i class="${iconClass} mr-2 text-secondary" aria-hidden="true"></i>Funciones`;
          }
         if (term.functions && term.functions.length > 0) {
             functionsContainer.classList.remove('hidden'); // Mostrar la sección
             term.functions.forEach(item => {
                 const li = document.createElement('li');
                 li.textContent = item;
                 functionList.appendChild(li); // Use the new CSS for list items
             });
         } else {
             functionsContainer.classList.add('hidden'); // Ocultar la sección
         }
     } else if (functionsContainer) { // Ensure functions container is hidden if list is missing
         functionsContainer.classList.add('hidden');
     }


    // --- Poblar Consideraciones de Mantenimiento ---
    if (maintenanceContainer && maintenanceText) {
         const maintenanceTitle = maintenanceContainer.querySelector('h3');
          if (maintenanceTitle) {
               const iconClass = sectionIcons["Consideraciones de Mantenimiento"] || 'fas fa-clipboard'; // Default icon
              maintenanceTitle.innerHTML = `<i class="${iconClass} mr-2 text-secondary" aria-hidden="true"></i>Consideraciones de Mantenimiento`;
          }
        if (term.maintenance_considerations && term.maintenance_considerations.trim() !== '') {
            maintenanceContainer.classList.remove('hidden'); // Mostrar la sección
            maintenanceText.textContent = term.maintenance_considerations;
        } else {
            maintenanceContainer.classList.add('hidden'); // Ocultar la sección
            maintenanceText.textContent = ''; // Limpiar texto cuando se oculta
        }
    } else if (maintenanceContainer) { // Ensure maintenance container is hidden if text element is missing
         maintenanceContainer.classList.add('hidden');
         if (maintenanceText) maintenanceText.textContent = '';
    }


    // --- Poblar Términos Relacionados (con interactividad) ---
     if (relatedTermsContainer && relatedTermsList) {
         relatedTermsList.innerHTML = '';
         const relatedTitle = relatedTermsContainer.querySelector('h3');
          if (relatedTitle) {
               const iconClass = sectionIcons["Términos Relacionados"] || 'fas fa-tags'; // Default icon
              relatedTitle.innerHTML = `<i class="${iconClass} mr-2 text-secondary" aria-hidden="true"></i>Términos Relacionados`;
          }
         if (term.related_terms && term.related_terms.length > 0) {
             relatedTermsContainer.classList.remove('hidden'); // Mostrar la sección
             term.related_terms.forEach(relatedTermId => {
                 const relatedTerm = dictionaryData.find(t => t.id === relatedTermId);
                 if (relatedTerm) {
                      const link = document.createElement('a');
                      // link.href = `#${relatedTerm.id}`; // Use a hash link for modal navigation (removed for direct call)
                      link.textContent = relatedTerm.term;
                      link.classList.add('px-3', 'py-1', 'bg-primary', 'bg-opacity-10', 'text-primary', 'rounded-full', 'hover:bg-opacity-20', 'text-sm', 'transition', 'cursor-pointer');
                       link.addEventListener('click', (e) => {
                           e.preventDefault(); // Prevenir comportamiento por defecto
                           renderTermDetail(relatedTerm); // Renderizar el término relacionado en el modal
                           // Optional: Scroll modal content to top when navigating related terms
                           const modalContent = termDetail.querySelector('.max-h-\\[90vh\\]');
                           if (modalContent) modalContent.scrollTop = 0;
                       });
                      relatedTermsList.appendChild(link);
                 } else {
                     console.warn(`ID de término relacionado "${relatedTermId}" no encontrado en los datos del diccionario.`);
                 }
             });
         } else {
             relatedTermsContainer.classList.add('hidden');
         }
     } else if (relatedTermsContainer) { // Ensure related terms container is hidden if list is missing
         relatedTermsContainer.classList.add('hidden');
     }

     // Final adjustment for left column width if it's shown but has minimal content
     // This is complex CSS/JS interaction, simplifying: if left column is visible, it's 1/2
     // If it's hidden, right is full. The content (main media, gallery, docs) visibility
     // is handled inside the left column check.

}


// --- Event Listeners y Carga de Datos ---

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // --- Referencias del DOM ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const filterLinks = document.querySelectorAll('.filter-link');
    const categoryCards = document.querySelectorAll('.category-card');
    const showAllTermsButton = document.getElementById('show-all-terms-button');
    const termsListContainer = document.getElementById('terms-list-container');
    const termsListTitle = document.getElementById('terms-list-title');
    const termDetail = document.getElementById('term-detail');
    const closeDetailButton = document.getElementById('close-detail');
    // Referencias a los botones del modal
    const printButton = document.getElementById('print-button');
    const shareButton = document.getElementById('share-button');
    // Referencia al mensaje inicial vacío
    const initialEmptyMessageContainer = document.getElementById('initial-empty-message');


    // --- Smooth Mobile Menu Toggle ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 mobileMenu.classList.add('hidden');
                 mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Close modal event listeners
    if (closeDetailButton && termDetail) {
         closeDetailButton.addEventListener('click', function() {
            termDetail.classList.add('hidden');
            document.body.style.overflow = 'auto';
         });

        termDetail.addEventListener('click', function(e) {
            if (e.target === termDetail) {
                termDetail.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', function(e) {
             if (e.key === 'Escape' && !termDetail.classList.contains('hidden')) {
                 termDetail.classList.add('hidden');
                 document.body.style.overflow = 'auto';
             }
        });
    }

    // --- Load Dictionary Data ---
    fetch('./terms.json')
        .then(response => {
            if (!response.ok) {
                 if (response.status === 404) {
                     throw new Error('Error: terms.json not found. Asegúrate de que el archivo está en el directorio correcto y tu servidor está funcionando.');
                 }
                 console.error("Respuesta del servidor no OK:", response);
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }
             console.log("Fetch exitoso, leyendo cuerpo de respuesta como JSON...");
            return response.json();
        })
        .then(data => {
             console.log("JSON parseado correctamente. Datos recibidos:", data);
             if (!Array.isArray(data)) {
                  throw new Error('Error: Los datos no están en el formato de array esperado.');
             }
            dictionaryData = data;
            console.log('✅ Datos del diccionario cargados y almacenados:', dictionaryData);

            // --- Initial Display ---
            // Mostrar 3 términos aleatorios al cargar
            const randomTerms = [];
            const dataLength = dictionaryData.length;
            if (dataLength > 0) {
                const selectedIndices = new Set();
                while (selectedIndices.size < 3 && selectedIndices.size < dataLength) {
                    const randomIndex = Math.floor(Math.random() * dataLength);
                    if (!selectedIndices.has(randomIndex)) {
                        selectedIndices.add(randomIndex);
                        randomTerms.push(dictionaryData[randomIndex]);
                    }
                }
            }
            if (randomTerms.length > 0) {
                 displayTerms(randomTerms, "Términos Destacados"); // Muestra los términos aleatorios
            } else {
                 // If no data loaded at all, show the initial message
                 initialEmptyMessageContainer.classList.remove('hidden');
                  termsListTitle.classList.add('hidden');
                  termsListContainer.innerHTML = '';
                  showAllTermsButton.classList.add('hidden');
            }


            // --- Event Delegation for Term Card Clicks ---
            if (termsListContainer) {
                termsListContainer.addEventListener('click', function(event) {
                    const termCard = event.target.closest('.term-card');
                    if (termCard) {
                        const termId = termCard.dataset.termId;
                        const selectedTerm = dictionaryData.find(term => term.id === termId);
                        if (selectedTerm) {
                            renderTermDetail(selectedTerm); // Populate the modal
                            termDetail.classList.remove('hidden'); // Show the modal
                            document.body.style.overflow = 'hidden'; // Prevent background scroll

                            // Ensure event listeners for modal buttons are added *after* the modal is likely in the DOM
                            // It's better to add these listeners once to the buttons when the DOM is loaded,
                            // but ensure the `currentTermDetail` variable is correctly set inside renderTermDetail
                            // so the share function has access to the term's data.
                            // The print button just calls window.print() which works directly on the modal content.

                             // Removed adding listeners here, relying on DOMContentLoaded setup

                        } else {
                            console.error(`Término con ID "${termId}" no encontrado en los datos del diccionario. Posible desincronización entre HTML y JSON.`);
                        }
                    }
                });
            }

            // --- Add Modal Button Listeners (once) ---
            // These listeners are added here once when the DOM is ready.
            // The share button logic will use the global `currentTermDetail` variable.
            const printButton = document.getElementById('print-button');
            if (printButton) {
                 printButton.addEventListener('click', function() {
                     console.log('Botón Imprimir clickeado - Ejecutando window.print()');
                     window.print();
                 });
             } else {
                 console.warn("No se encontró el elemento con ID 'print-button' al cargar el DOM.");
             }

             const shareButton = document.getElementById('share-button');
             if (shareButton) {
                 shareButton.addEventListener('click', function() {
                     console.log('Botón Compartir clickeado');
                     // Use Web Share API if available
                     if (navigator.share && currentTermDetail) {
                         // Define the URL to share - currently it's just the main page
                         // If you implement routing (Step 9), you would build a unique URL like /term/bogie
                         const shareUrl = window.location.href; // Shares the current page URL

                         navigator.share({
                             title: `WikiRail: ${currentTermDetail.term}`, // Use current term name
                             text: `${currentTermDetail.term}: ${currentTermDetail.definition.substring(0, 150)}...`, // Use current term definition (truncated)
                             url: shareUrl
                         }).then(() => {
                             console.log('Contenido compartido con éxito');
                         }).catch((error) => {
                             if (error.name !== 'AbortError') {
                                 console.error('Error al compartir:', error);
                             } else {
                                 console.log('Compartir cancelado por el usuario');
                             }
                         });
                     } else if (currentTermDetail) {
                         // Fallback for browsers/devices that do not support Web Share API
                         const shareText = `${currentTermDetail.term}: ${currentTermDetail.definition}`;
                         console.log('Web Share API no disponible. Texto para compartir:', shareText);
                         alert(`Tu navegador no soporta la opción de compartir nativa. Puedes copiar el siguiente texto:\n\n"${shareText}"`);
                     } else {
                         console.warn("No hay término seleccionado para compartir.");
                         alert("Por favor, selecciona un término para compartir.");
                     }
                 });
             } else {
                  console.warn("No se encontró el elemento con ID 'share-button' al cargar el DOM.");
             }


            // --- Search Event Listeners ---
            if (searchInput && searchButton) {
                searchInput.addEventListener('input', function() {
                     performSearch(searchInput.value);
                });
                searchButton.addEventListener('click', function(event) { event.preventDefault(); performSearch(searchInput.value); });
                searchInput.addEventListener('keypress', function(event) { if (event.key === 'Enter') { event.preventDefault(); performSearch(searchInput.value); } });
            }

            // --- Filter Event Listeners ---
            if (filterLinks.length > 0) {
                 filterLinks.forEach(link => {
                     link.addEventListener('click', function(event) {
                         event.preventDefault();
                         const category = event.target.dataset.filter;
                         console.log('Filtro rápido clickeado. Categoría:', category);
                         setActiveFilter(event.target);
                         filterTermsByCategory(category);
                         const termsSection = document.querySelector('.featured-terms-section');
                          if (termsSection) {
                              termsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                     });
                 });
             } else {
                 console.warn("No se encontraron elementos con clase 'filter-link' para adjuntar listeners.");
             }


            // Show All Terms Button Listener
            if (showAllTermsButton) {
                showAllTermsButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    console.log('Botón Mostrar Todos los Términos clickeado');
                    if (searchInput) searchInput.value = '';
                    resetFilters();
                    displayTerms(dictionaryData, "Todos los Términos");
                     const termsSection = document.querySelector('.featured-terms-section');
                     if (termsSection) {
                         termsSection.scrollIntoView({ behavior: 'smooth' });
                     }
                });
            } else {
                 console.warn("No se encontró el elemento con ID 'show-all-terms-button'.");
            }

             // --- Handle click events on gallery images within the modal ---
             // Listener attached to the modal content area which is scrollable
             const modalContentArea = termDetail ? termDetail.querySelector('.max-h-\\[90vh\\]') : null;
             const mainMediaArea = document.getElementById('term-detail-main-media');

             if (modalContentArea && mainMediaArea) {
                 modalContentArea.addEventListener('click', function(event) {
                     const galleryImage = event.target.closest('#term-detail-gallery img');

                     if (galleryImage) {
                         const imageUrl = galleryImage.src;
                         const imageAlt = galleryImage.alt;
                         console.log('Miniatura de galería clickeada:', imageUrl);

                         // Update the main media area using the helper function
                         updateMainMedia(imageUrl, imageAlt);

                         // Visually indicate the selected thumbnail
                         const galleryContainer = document.getElementById('term-detail-gallery');
                          if(galleryContainer) {
                              galleryContainer.querySelectorAll('img').forEach(img => img.classList.remove('ring-2', 'ring-primary'));
                              galleryImage.classList.add('ring-2', 'ring-primary');
                          }

                         // TODO: Add handling for video thumbnails if you implement them
                     }
                 });
             } else {
                 console.warn("Elementos del modal (modalContentArea o mainMediaArea) no encontrados para la interactividad de medios.");
             }


         })
         .catch(error => {
             console.error('❌ Error crítico al cargar o procesar los datos del diccionario:', error);

             // Asegurarse de que el mensaje inicial se oculte en caso de error
             const initialEmptyMessageContainer = document.getElementById('initial-empty-message');
              if (initialEmptyMessageContainer) {
                  initialEmptyMessageContainer.classList.add('hidden');
              }

             if (termsListContainer) {
                 termsListContainer.innerHTML = '<p class="text-center text-red-500 text-lg">Error al cargar los términos del diccionario. Por favor, asegúrate de que el archivo de datos está disponible y es correcto.</p>';
             }
              if (termsListTitle) {
                  termsListTitle.textContent = "Error al Cargar Términos";
                  termsListTitle.classList.remove('hidden');
              }
               const showAllTermsButton = document.getElementById('show-all-terms-button');
               if (showAllTermsButton) {
                   showAllTermsButton.classList.add('hidden');
               }
         });

}); // End of DOMContentLoaded