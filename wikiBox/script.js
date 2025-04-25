/* --- START OF FILE script.js (Español) --- */

// El objeto principal que contiene toda la lógica y el estado de la aplicación
const App = {
    // --- Propiedades para almacenar datos y referencias ---

    // Almacena la lista completa de términos cargados de data.json
    crossfitTerms: [],

    // Objeto para guardar referencias a los elementos clave del DOM
    domElements: {
        searchInput: null,
        searchButton: null,
        searchResults: null,
        resultsList: null,
        resultsCount: null,
        browseAll: null,
        termDetail: null,
        termTitle: null,
        termCategory: null,
        termDefinition: null,
        termExample: null,
        termVideo: null,
        musclesWorked: null,
        termVariations: null,
        relatedTerms: null,
        backButton: null,
        categoryTabs: null,
        sortSelect: null,
        browseGridContainer: null, // Contenedor para las tarjetas de la vista de exploración
        paginationNav: null, // Contenedor para los controles de paginación
        // TODO: Añadir más referencias DOM si son necesarias (ej. para mensajes de error de carga)
    },

    // --- Estado de la aplicación ---
    // Contiene toda la información que define la UI actual en un momento dado
    state: {
        view: 'browse', // La vista actual: 'browse', 'detail', 'search'
        selectedTermId: null, // El ID del término mostrado en la vista 'detail'
        searchTerm: '', // El texto actual en el campo de búsqueda
        activeCategory: 'all', // El filtro de categoría activo ('all' o el nombre de la categoría)
        activeLetter: 'All', // El filtro por letra activo ('All' o una letra del alfabeto)
        sortBy: 'name-asc', // El criterio de ordenación activo ('name-asc', 'name-desc', 'category', 'popularity')
        // --- Propiedades de Paginación ---
        currentPage: 1, // La página actual mostrada en la vista 'browse'
        termsPerPage: 12, // Número de términos a mostrar por página en la vista 'browse' (ajústalo según necesites)
        // totalPages y totalItems se calculan al vuelo en getFilteredAndSortedTermsIncludingPaginationInfo
    },


    // --- Métodos de inicialización y configuración ---

    // Punto de entrada principal para iniciar la aplicación
    // Se llama una vez cuando el DOM está listo.
    init: function() {
        console.log("App initialized.");
        this.getDOMElements(); // Paso 1: Obtener referencias a los elementos del DOM

        // Paso 2: Leer el estado de la URL INICIAL para configurar el estado de la App
        // Esto debe hacerse antes de cargar los datos para que loadTerms pueda usar el estado inicial si es necesario
        // (aunque en este caso loadTerms solo lo usa para la ordenación por defecto, es una buena práctica).
        this.updateStateFromUrl();

        // Paso 3: Cargar los datos. bindEvents y renderUI se llaman después de la carga exitosa.
        this.loadTerms();

        // NOTA: Los event listeners para popstate se añaden en bindEvents, que es llamado después de loadTerms.
        // Esto asegura que App.state y this.crossfitTerms estén disponibles cuando popstate se dispare.
    },

    // Obtiene referencias a los elementos del DOM y las almacena en this.domElements
    // Esto se hace al inicio para no tener que buscarlos repetidamente.
    getDOMElements: function() {
        // Usamos console.error si algún elemento crítico no se encuentra
        // para ayudar en la depuración.
        this.domElements.searchInput = document.getElementById('searchInput');
         if (!this.domElements.searchInput) console.error("DOM Element #searchInput not found!");

        this.domElements.searchButton = document.getElementById('searchButton');
         if (!this.domElements.searchButton) console.error("DOM Element #searchButton not found!");

        this.domElements.searchResults = document.getElementById('searchResults');
         if (!this.domElements.searchResults) console.error("DOM Element #searchResults not found!");

        this.domElements.resultsList = document.getElementById('resultsList');
         if (!this.domElements.resultsList) console.error("DOM Element #resultsList not found!");

        this.domElements.resultsCount = document.getElementById('resultsCount');
         if (!this.domElements.resultsCount) console.error("DOM Element #resultsCount not found!");

        this.domElements.browseAll = document.getElementById('browseAll');
         if (!this.domElements.browseAll) console.error("DOM Element #browseAll not found!");

        this.domElements.termDetail = document.getElementById('termDetail');
         if (!this.domElements.termDetail) console.error("DOM Element #termDetail not found!");

        this.domElements.termTitle = document.getElementById('termTitle');
         if (!this.domElements.termTitle) console.error("DOM Element #termTitle not found!");

        this.domElements.termCategory = document.getElementById('termCategory');
         if (!this.domElements.termCategory) console.error("DOM Element #termCategory not found!");

        this.domElements.termDefinition = document.getElementById('termDefinition');
         if (!this.domElements.termDefinition) console.error("DOM Element #termDefinition not found!");

        this.domElements.termExample = document.getElementById('termExample');
         if (!this.domElements.termExample) console.error("DOM Element #termExample not found!");

        this.domElements.termVideo = document.getElementById('termVideo');
         if (!this.domElements.termVideo) console.error("DOM Element #termVideo not found!");

        this.domElements.musclesWorked = document.getElementById('musclesWorked');
         if (!this.domElements.musclesWorked) console.error("DOM Element #musclesWorked not found!");

        this.domElements.termVariations = document.getElementById('termVariations');
         if (!this.domElements.termVariations) console.error("DOM Element #termVariations not found!");

        this.domElements.relatedTerms = document.getElementById('relatedTerms');
         if (!this.domElements.relatedTerms) console.error("DOM Element #relatedTerms not found!");

        this.domElements.backButton = document.getElementById('backButton');
         if (!this.domElements.backButton) console.error("DOM Element #backButton not found!");

        // Usar querySelectorAll para colecciones
        this.domElements.categoryTabs = document.querySelectorAll('.category-tab');
         if (this.domElements.categoryTabs.length === 0) console.warn("DOM Elements .category-tab not found!");

        this.domElements.sortSelect = document.getElementById('sortSelect');
         if (!this.domElements.sortSelect) console.error("DOM Element #sortSelect not found!");

        // Asegúrate de que este selector apunte al contenedor correcto en index.html
        this.domElements.browseGridContainer = document.querySelector('#browseAll .grid');
         if (!this.domElements.browseGridContainer) console.error("DOM Element #browseAll .grid not found!");

        // Asegúrate de que este selector apunte a la navegación de paginación
        this.domElements.paginationNav = document.querySelector('#browseAll .mt-8 nav');
         if (!this.domElements.paginationNav) console.error("DOM Element #browseAll .mt-8 nav not found!");
    },

    // Asigna todos los event listeners a los elementos interactivos del DOM
    // Estos listeners llaman a métodos que actualizan el estado.
    bindEvents: function() {
        // Búsqueda: Llama a performSearch al hacer click o presionar Enter
        if (this.domElements.searchButton) this.domElements.searchButton.addEventListener('click', () => this.performSearch());
        if (this.domElements.searchInput) {
            this.domElements.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
        }

        // Botón de retroceso/cerrar en la vista de detalle: Llama a showBrowseView
        if (this.domElements.backButton) this.domElements.backButton.addEventListener('click', () => this.showBrowseView());

        // Pestañas de categoría: Llama a updateStateForCategoryFilter
        if (this.domElements.categoryTabs) {
            this.domElements.categoryTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // 'this' dentro de addEventListener se refiere al elemento que disparó el evento (el botón)
                    // Usamos App para llamar al método del objeto App desde aquí
                    App.updateStateForCategoryFilter(this.dataset.category);
                });
            });
        }

        // Selector de ordenación: Llama a updateStateForSort
        if (this.domElements.sortSelect) {
            this.domElements.sortSelect.addEventListener('change', () => {
                // 'this' dentro de la arrow function mantiene el contexto del objeto App
                this.updateStateForSort(this.domElements.sortSelect.value);
            });
        }

        // Navegación alfabética: Llama a updateStateForLetterFilter
        document.querySelectorAll('.alphabet-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
                // 'this' dentro de addEventListener se refiere al enlace que disparó el evento
                App.updateStateForLetterFilter(this.textContent.trim()); // Llama al método del objeto App
            });
        });

        // Escucha los cambios en el historial del navegador (botones atrás/adelante)
        window.addEventListener('popstate', (event) => {
            console.log("Popstate event triggered. State from history:", event.state);
             // Reconstruye el estado de la App a partir de la URL actual y el estado guardado (event.state si se usó)
             // Es más robusto leer siempre la URL, ya que event.state podría ser null en algunos casos.
            this.updateStateFromUrl();
            this.renderUI(); // Dispara un renderizado para reflejar el estado cargado del historial
        });

        // Los listeners para la paginación se añaden dinámicamente en renderPaginationControls
    },

    // Carga los datos de los términos de CrossFit desde el archivo JSON
    // Este es un método asíncrono.
    loadTerms: async function() {
        try {
            // Realiza la petición para obtener data.json
            const response = await fetch('data.json');
            // Verifica si la respuesta fue exitosa (código 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parsea la respuesta JSON y la asigna a la propiedad crossfitTerms del objeto App
            this.crossfitTerms = await response.json();
            console.log("Datos cargados:", this.crossfitTerms.length, "términos.");

            // Una vez que los datos estén cargados, podemos enlazar eventos (si dependen de los datos)
            // y asegurar que el estado inicial es consistente y renderizamos.
             this.bindEvents(); // <-- Asegúrate de llamar a bindEvents aquí

            // Si el estado inicial ya fue cargado de la URL en init(),
            // validamos si el selectedTermId para la vista 'detail' es válido.
             if (this.state.view === 'detail' && this.state.selectedTermId !== null) {
                 const termExists = this.crossfitTerms.some(term => term.id === this.state.selectedTermId);
                 if (!termExists) {
                     console.warn(`Term with ID ${this.state.selectedTermId} not found. Changing view to browse.`);
                     this.state.view = 'browse'; // Redirige a browse si el ID no existe
                     this.state.selectedTermId = null;
                      // No llamamos a updateUrlFromState aquí porque renderUI lo hará, y no queremos un pushState extra por un ID inválido.
                 }
             }

             // Si el estado inicial de ordenación leído de la URL es inválido, ajustarlo al por defecto
             const validSorts = ['name-asc', 'name-desc', 'category', 'popularity']; // Define tus criterios válidos
             if (!validSorts.includes(this.state.sortBy)) {
                  console.warn(`Invalid sort key "${this.state.sortBy}" in URL. Defaulting to "name-asc".`);
                  this.state.sortBy = 'name-asc';
             }
              // Si el elemento sortSelect existe, asegúrate de que su valor coincida con el estado
              if (this.domElements.sortSelect) {
                   this.domElements.sortSelect.value = this.state.sortBy;
              }

            // Validar la página actual del estado si el número total de páginas cambia por un filtro o es inválida
             if (this.state.view === 'browse') {
                 const { totalPages } = this.getFilteredAndSortedTermsIncludingPaginationInfo();
                 if (this.state.currentPage > totalPages && totalPages > 0) {
                      console.warn(`Current page ${this.state.currentPage} is out of bounds (total pages ${totalPages}). Adjusting to page ${totalPages}.`);
                      this.state.currentPage = totalPages;
                 } else if (totalPages === 0) {
                      this.state.currentPage = 1; // Si no hay términos filtrados, ir a la página 1 (vacía)
                 }
             }


            // Una vez que el estado inicial está definido (posiblemente actualizado desde la URL en init y validado aquí),
            // asegura que la URL coincide con este estado SIN añadir una entrada extra al historial para la carga inicial.
            this.updateUrlFromState(true); // Usa history.replaceState para la carga inicial

            // Llama al método central de renderizado para mostrar la UI inicial basada en el estado.
            this.renderUI();

        } catch (error) {
            console.error("Error al cargar los términos:", error); // Mensaje traducido
            // Muestra un mensaje de error visible en la interfaz si falla la carga
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.innerHTML = '<p class="text-center text-red-600 text-xl py-8">Error al cargar los términos. Consulta la consola para más detalles.</p>'; // Mensaje traducido
            }
            // Deshabilita los controles de interacción si los datos no se cargaron correctamente
             if (this.domElements.searchInput) this.domElements.searchInput.disabled = true;
             if (this.domElements.searchButton) this.domElements.searchButton.disabled = true;
             if (this.domElements.categoryTabs) this.domElements.categoryTabs.forEach(tab => tab.disabled = true);
             if (this.domElements.sortSelect) this.domElements.sortSelect.disabled = true;
             document.querySelectorAll('.alphabet-nav a').forEach(link => {
                  link.classList.add('pointer-events-none', 'opacity-50');
             });
             if (this.domElements.paginationNav) this.domElements.paginationNav.classList.add('hidden'); // Oculta paginación si no hay datos
        }
    },

     // --- Métodos para leer y escribir el estado desde/hacia la URL ---

     // Lee la URL actual y actualiza el estado de la aplicación para que coincida
     // Se llama al cargar la página (en init) y en el evento popstate.
     updateStateFromUrl: function() {
         const params = new URLSearchParams(window.location.search);

         // Leer el parámetro 'view' o usar 'browse' por defecto
         const view = params.get('view') || 'browse';
         this.state.view = view;

         // Leer otros parámetros relevantes basados en la vista
         if (view === 'browse') {
             this.state.activeCategory = params.get('cat') || 'all';
             this.state.activeLetter = params.get('letter') || 'All';
             this.state.currentPage = parseInt(params.get('page') || '1', 10); // Parsea a entero, por defecto 1
             // Valida que pageNumber sea un número válido > 0; si no, usa 1.
             if (isNaN(this.state.currentPage) || this.state.currentPage < 1) {
                 this.state.currentPage = 1;
             }
             this.state.sortBy = params.get('sort') || 'name-asc'; // Lee el criterio de ordenación o usa el por defecto

             // Limpiar estados no relacionados con browse
             this.state.selectedTermId = null;
             this.state.searchTerm = '';

         } else if (view === 'detail') {
             const id = parseInt(params.get('id'), 10); // Parsea el ID a entero
             // Valida que el ID sea un número válido; si no, usa null. La verificación de si el ID existe en data se hace en loadTerms o renderUI.
             this.state.selectedTermId = !isNaN(id) ? id : null;

             // Limpiar estados no relacionados con detail
             this.state.searchTerm = '';
             this.state.activeCategory = 'all';
             this.state.activeLetter = 'All';
             this.state.currentPage = 1;
             this.state.sortBy = 'name-asc';


         } else if (view === 'search') {
             this.state.searchTerm = params.get('q') || ''; // Lee el término de búsqueda o usa cadena vacía

             // Limpiar estados no relacionados con search
             this.state.selectedTermId = null;
             this.state.activeCategory = 'all';
             this.state.activeLetter = 'All';
             this.state.currentPage = 1;
             this.state.sortBy = 'name-asc';

         } else {
              // Si la vista en la URL no es reconocida, por defecto vamos a browse y resetea todo lo demás.
              console.warn("Vista no reconocida en la URL:", view, "Por defecto 'browse'."); // Mensaje traducido
              this.state.view = 'browse';
              this.state.selectedTermId = null;
              this.state.searchTerm = '';
              this.state.activeCategory = 'all';
              this.state.activeLetter = 'All';
              this.state.currentPage = 1;
              this.state.sortBy = 'name-asc';
         }

         console.log("Estado actualizado desde la URL:", this.state); // Mensaje traducido

         // NOTA: Después de actualizar el estado desde la URL, la función que llamó a updateStateFromUrl
         // (ya sea init o el listener popstate) DEBE llamar a renderUI() para actualizar la interfaz.
         // Esto se maneja en init y en el listener popstate.
     },

     // Actualiza la URL del navegador para reflejar el estado actual de la aplicación
     // Usa history.pushState por defecto para añadir al historial, pero history.replaceState si replace = true.
     updateUrlFromState: function(replace = false) {
         // Solo actualizamos la URL si la data está cargada (evita URLs extrañas antes de loadTerms)
         if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, omitiendo actualización de URL."); // Mensaje traducido
             return;
         }

         const url = new URL(window.location.origin + window.location.pathname); // Crea una nueva URL con la base actual

         // Añade parámetros de URL según la vista activa y otros estados relevantes
         // Solo añade 'view=browse' si no es la vista por defecto para URLs más limpias
         if (this.state.view !== 'browse') {
            url.searchParams.set('view', this.state.view);
         }


         if (this.state.view === 'browse') {
             // Añade parámetros solo si son diferentes de los valores por defecto de la vista browse
             if (this.state.activeCategory !== 'all') {
                 url.searchParams.set('cat', this.state.activeCategory);
             }
             if (this.state.activeLetter !== 'All') {
                 url.searchParams.set('letter', this.state.activeLetter);
             }
              // Solo añade 'page' si no es la página 1
             if (this.state.currentPage !== 1) {
                 url.searchParams.set('page', this.state.currentPage);
             }
              // Solo añade 'sort' si no es el por defecto 'name-asc'
             if (this.state.sortBy !== 'name-asc') {
                 url.searchParams.set('sort', this.state.sortBy);
             }

         } else if (this.state.view === 'detail') {
             if (this.state.selectedTermId !== null) {
                 url.searchParams.set('id', this.state.selectedTermId);
             } else {
                  console.warn("El estado indica vista de detalle pero selectedTermId es null. La URL estará incompleta."); // Mensaje traducido
                  // En este caso, la URL solo tendrá ?view=detail sin ID, que updateStateFromUrl manejaría volviendo a browse.
             }

         } else if (this.state.view === 'search') {
             if (this.state.searchTerm !== '') {
                 url.searchParams.set('q', this.state.searchTerm);
             } else {
                 console.warn("El estado indica vista de búsqueda pero searchTerm está vacío. La URL estará incompleta."); // Mensaje traducido
                 // En este caso, la URL solo tendrá ?view=search sin 'q', que updateStateFromUrl manejaría con searchTerm=''
                 // Una búsqueda vacía en performSearch ya redirige a browse, por lo que este caso debería ser raro si la lógica se sigue bien.
             }
         }

         // Decide si usar pushState (añadir al historial) o replaceState (reemplazar la entrada actual)
         if (replace) {
             history.replaceState(this.state, '', url.toString()); // Reemplaza la entrada actual del historial
         } else {
             history.pushState(this.state, '', url.toString()); // Añade una nueva entrada al historial
         }
          console.log(`${replace ? 'Reemplazado' : 'Pulsado'} estado a la URL:`, url.toString()); // Mensaje traducido
     },

    // --- Lógica para obtener términos filtrados/ordenados/paginados basada en el estado ---

     // Obtiene la lista de términos aplicando los filtros, ordenación Y paginación del estado.
     // Esta función es llamada por renderBrowseView para obtener los términos exactos a mostrar.
    getFilteredAndSortedAndPagedTerms: function() {
         // Verifica que los datos estén cargados
        if (this.crossfitTerms.length === 0) {
             return [];
        }

        // 1. Obtener la lista completa filtrada y ordenada (sin paginar)
        const allFilteredSortedTerms = this.getFilteredAndSortedTermsIncludingPaginationInfo().terms; // Usamos el helper para esto

        // 2. Aplicar lógica de paginación (corte)
        const startIndex = (this.state.currentPage - 1) * this.state.termsPerPage;
        const endIndex = startIndex + this.state.termsPerPage;
        const termsOnPage = allFilteredSortedTerms.slice(startIndex, endIndex); // Obtiene solo los términos de la página actual

        return termsOnPage; // Retorna solo los términos de la página actual
    },

    // Helper: Obtiene la lista completa de términos después de aplicar filtros y ordenación (sin paginar),
    // y también devuelve el total de items y total de páginas.
    // Esto es necesario para renderizar correctamente los controles de paginación y mensajes.
    getFilteredAndSortedTermsIncludingPaginationInfo: function() {
         if (this.crossfitTerms.length === 0) {
              return { terms: [], totalItems: 0, totalPages: 0 };
         }

         let terms = [...this.crossfitTerms]; // Clona el array original

         // 1. Aplicar filtros del estado (Categoría y Letra)
         if (this.state.activeCategory !== 'all') {
             terms = terms.filter(term => term.category === this.state.activeCategory);
         }
         if (this.state.activeLetter !== 'All') {
              terms = terms.filter(term => term.name.startsWith(this.state.activeLetter));
         }

         const totalItems = terms.length; // Total de items después de filtrar
         const totalPages = Math.ceil(totalItems / this.state.termsPerPage); // Total de páginas

         // 2. Aplicar ordenación del estado
         switch(this.state.sortBy) {
             case 'name-asc':
                 terms.sort((a, b) => a.name.localeCompare(b.name));
                 break;
             case 'name-desc':
                 terms.sort((a, b) => b.name.localeCompare(a.name));
                 break;
             case 'category':
                 terms.sort((a, b) => {
                    // Ordena primero por categoría, luego alfabéticamente dentro de la categoría
                    if (a.category < b.category) return -1;
                    if (a.category > b.category) return 1;
                    return a.name.localeCompare(b.name);
                });
                 break;
             case 'popularity':
                 // Implementación de ejemplo: orden aleatorio.
                 terms = terms.sort(() => Math.random() - 0.5);
                 break;
             default:
                 // Ordenación por defecto si el valor no es reconocido (A-Z)
                 terms.sort((a, b) => a.name.localeCompare(b.name));
                 break;
         }

         // Devolver la lista completa filtrada/ordenada, total de items y total de páginas
         return {
             terms: terms, // La lista completa después de filtrar y ordenar (sin paginar)
             totalItems: totalItems,
             totalPages: totalPages
         };
    },


    // --- Métodos para actualizar el estado y disparar el renderizado ---
    // Estos métodos son los "controladores" que reaccionan a las acciones del usuario
    // y actualizan el estado (this.state), luego SIEMPRE llaman a this.updateUrlFromState() y this.renderUI().

    // Maneja la acción de búsqueda: actualiza el estado con el término de búsqueda
    performSearch: function() {
        const query = this.domElements.searchInput ? this.domElements.searchInput.value.trim() : '';
         // Si la búsqueda está vacía, volver a browse
        if (query === '') {
            // Llama directamente a showBrowseView que ya maneja la actualización de estado y URL
            this.showBrowseView();
            return;
        }
         // Verifica si los datos están cargados antes de proceder con la búsqueda real
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede realizar la búsqueda."); // Mensaje traducido
             // Podrías mostrar un mensaje temporal al usuario
             return;
        }
        this.updateStateForSearch(query); // Llama al método que actualiza el estado de búsqueda y dispara renderUI
    },

     // Maneja la acción de ir a la vista de exploración: actualiza el estado a 'browse'
    showBrowseView: function() {
         // La lógica de ocultar/mostrar secciones y limpiar input se hace en renderUI
         this.updateStateForBrowse(); // Llama al método que actualiza el estado a 'browse' y dispara renderUI
    },

     // Maneja la acción de ir a la vista de detalle para un término: actualiza el estado con el ID del término
    showTermDetail: function(term) {
        // Verifica el término y su ID antes de actualizar el estado
         if (!term || term.id === undefined || term.id === null) {
             console.error("Término inválido pasado a showTermDetail"); // Mensaje traducido
             // Opcional: Mostrar error al usuario o redirigir a browse
             return;
         }
         // La lógica de ocultar/mostrar secciones y renderizar contenido se hace en renderUI
         this.updateStateForDetail(term.id); // Llama al método que actualiza el estado a 'detail' y dispara renderUI
    },

     // Actualiza el estado cuando se aplica un filtro de categoría
    updateStateForCategoryFilter: function(category) {
         // Verifica que los datos estén cargados
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado del filtro de categoría."); // Mensaje traducido
             return;
        }
        // Actualiza las propiedades relevantes del estado
        this.state.activeCategory = category;
        this.state.activeLetter = 'All'; // Resetea el filtro de letra al cambiar categoría
        this.state.view = 'browse'; // Asegura que estamos en la vista 'browse'
        this.state.currentPage = 1; // Resetea la paginación a la página 1 al cambiar filtro
        this.updateUrlFromState(); // Actualiza la URL antes de renderizar
        this.renderUI(); // Dispara el renderizado para reflejar el nuevo estado
    },

     // Actualiza el estado cuando se aplica un filtro por letra
    updateStateForLetterFilter: function(letter) {
         // Verifica que los datos estén cargados
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado del filtro por letra."); // Mensaje traducido
             return;
        }
        // Actualiza las propiedades relevantes del estado
        this.state.activeLetter = letter;
        this.state.activeCategory = 'all'; // Resetea el filtro de categoría al cambiar letra
        this.state.view = 'browse'; // Asegura que estamos en la vista 'browse'
        this.state.currentPage = 1; // Resetea la paginación a la página 1 al cambiar filtro
        this.updateUrlFromState(); // Actualiza la URL antes de renderizar
        this.renderUI(); // Dispara el renderizado para reflejar el nuevo estado
    },

     // Actualiza el estado cuando se aplica una ordenación
    updateStateForSort: function(sortBy) {
         // Verifica que los datos estén cargados
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado de ordenación."); // Mensaje traducido
             return;
        }
        // Actualiza la propiedad relevante del estado
        this.state.sortBy = sortBy;
        this.state.view = 'browse'; // Asegura que estamos en la vista 'browse'
        this.state.currentPage = 1; // Resetea la paginación a la página 1 al cambiar ordenación
        this.updateUrlFromState(); // Actualiza la URL antes de renderizar
        this.renderUI(); // Dispara el renderizado para reflejar el nuevo estado
    },

     // Actualiza el estado cuando se cambia de página en la paginación
    updateStateForPagination: function(pageNumber) {
         // Verifica que los datos estén cargados
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado de paginación."); // Mensaje traducido
             return;
        }

        // Calcula el número total de páginas para validar el pageNumber
        const { totalPages } = this.getFilteredAndSortedTermsIncludingPaginationInfo();

        // Valida que el número de página sea válido
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            // Actualiza la propiedad de página actual en el estado
            this.state.currentPage = pageNumber;
            this.state.view = 'browse'; // Asegura que estamos en la vista 'browse'
            // No es necesario resetear filtros/ordenación/búsqueda aquí, ya están en el estado.
            this.updateUrlFromState(); // Actualiza la URL antes de renderizar
            this.renderUI(); // Dispara el renderizado para mostrar la nueva página
        } else {
            console.warn("Número de página inválido:", pageNumber, "Páginas totales:", totalPages); // Mensaje traducido
            // Opcional: Mostrar mensaje al usuario o simplemente no hacer nada
        }
    },

    // Actualiza el estado con el término de búsqueda
     updateStateForSearch: function(query) {
         // Verifica que los datos estén cargados
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado de búsqueda."); // Mensaje traducido
             return;
        }
         // Actualiza las propiedades relevantes del estado
        this.state.view = 'search'; // La búsqueda lleva a la vista 'search'
        this.state.searchTerm = query.trim().toLowerCase();
         // Los otros estados de filtro/ordenación/paginación se mantienen para cuando vuelvas a la vista browse
         // this.state.activeCategory = 'all'; // Podrías resetearlos aquí si quieres que la búsqueda sea independiente de browse
         // this.state.activeLetter = 'All';
         // this.state.currentPage = 1;
         // this.state.sortBy = 'name-asc';
         this.updateUrlFromState(); // Actualiza la URL antes de renderizar
         this.renderUI(); // Dispara el renderizado para mostrar los resultados de búsqueda
     },

    // Actualiza el estado para la vista de detalle con un ID específico
     updateStateForDetail: function(termId) {
          if (this.crossfitTerms.length === 0 || termId === null || termId === undefined) {
               console.warn("Datos no cargados o ID de término inválido, no se puede actualizar el estado de detalle."); // Mensaje traducido
               // Podrías redirigir a browse aquí si no hay datos cargados
               // this.updateStateForBrowse();
               return;
          }
          const term = this.crossfitTerms.find(t => t.id === termId);
           if (!term) {
                console.warn("Término no encontrado para el ID:", termId, "Cambiando vista a browse."); // Mensaje traducido
                // Si el término no se encuentra, redirige a la vista browse
                this.updateStateForBrowse(); // Esto actualizará el estado y la URL y renderizará browse
                return; // Sal de esta función
           }

          this.state.view = 'detail';
          this.state.selectedTermId = termId;
          // Limpiar estados no relacionados con detail (opcional, ya se hace en updateStateFromUrl)
          // this.state.searchTerm = ''; this.state.activeCategory = 'all'; ...etc

          this.updateUrlFromState(); // Actualiza la URL antes de renderizar
          this.renderUI(); // Dispara el renderizado
     },


    // --- Método central para renderizar la UI ---
    // Este método lee el estado actual (this.state) y actualiza la interfaz de usuario para reflejarlo.
    // Es el único lugar que debe modificar directamente la visibilidad de las secciones principales.
    renderUI: function() {
        console.log("Renderizando UI basada en el estado:", this.state); // Mensaje traducido

        // Oculta todas las secciones principales primero para asegurar que solo se muestre la correcta
        // Usamos las referencias domElements obtenidas en init
        if (this.domElements.browseAll) this.domElements.browseAll.classList.add('hidden');
        if (this.domElements.termDetail) this.domElements.termDetail.classList.add('hidden');
        if (this.domElements.searchResults) this.domElements.searchResults.classList.add('hidden');

        // Decide qué sección mostrar y qué contenido renderizar basado en el estado de la vista (this.state.view)
        if (this.state.view === 'browse') {
            // Si la vista es 'browse', muestra la sección Browse All
            if (this.domElements.browseAll) this.domElements.browseAll.classList.remove('hidden');

            // Obtiene los términos aplicando los filtros, ordenación Y paginación del estado
            const termsOnCurrentPage = this.getFilteredAndSortedAndPagedTerms();
            // Renderiza la cuadrícula de tarjetas con los términos obtenidos (solo los de la página actual)
            this.renderBrowseView(termsOnCurrentPage);

            // Actualiza el estado visual (clases 'active', valor del select, paginación) de los controles
            this.updateFilterControlsUI();

        } else if (this.state.view === 'search') {
            // Si la vista es 'search', muestra la sección Search Results
             if (this.domElements.searchResults) this.domElements.searchResults.classList.remove('hidden');
            // Recalcula y renderiza la lista de resultados de búsqueda basada en el término de búsqueda del estado
            const query = this.state.searchTerm;
             // Filtra los términos basándose solo en la query (la vista search no usa los otros filtros de browse)
            const results = this.crossfitTerms.filter(term =>
                term.name.toLowerCase().includes(query) ||
                term.definition.toLowerCase().includes(query) ||
                (term.example && term.example.toLowerCase().includes(query)) ||
                (term.category && term.category.toLowerCase().includes(query))
                // Puedes añadir más campos de búsqueda aquí
            );
            this.renderSearchResultsList(results, query); // Renderiza la lista de resultados

             // Actualiza el estado visual de los controles que SÍ están visibles en esta vista (ej. campo de búsqueda)
             this.updateFilterControlsUI(); // Reutilizamos esta función aunque no todos los controles se actualicen/muestren

        } else if (this.state.view === 'detail') {
            // Si la vista es 'detail', muestra la sección Term Detail
             if (this.domElements.termDetail) this.domElements.termDetail.classList.remove('hidden');
            // Encuentra el término correspondiente al selectedTermId en el estado
            const term = this.crossfitTerms.find(t => t.id === this.state.selectedTermId);
            // Ya verificamos si el término existe en updateStateForDetail.
            // Aquí simplemente renderizamos si se encontró.
            if (term) {
                this.renderTermDetailContent(term); // Renderiza el contenido del detalle
                 // Opcional: Desplazarse suavemente al inicio de la sección de detalle si está visible
                if (this.domElements.termDetail && !this.domElements.termDetail.classList.contains('hidden')) {
                     this.domElements.termDetail.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Si el término no se encuentra, ya updateStateForDetail nos redirigió a browse.
                // Si llegamos aquí es por un error lógico, o si el DOM no se encontró.
                 console.error("renderUI: Término no encontrado para el estado de vista de detalle, pero no fue redirigido. ID:", this.state.selectedTermId); // Mensaje traducido
                 // Podríamos mostrar un mensaje de error genérico aquí si la sección de detalle está vacía
                 if (this.domElements.termDetail && this.domElements.termDetail.innerHTML === '') {
                      this.domElements.termDetail.innerHTML = '<p class="text-center text-red-600 text-xl py-8">Error al renderizar el detalle del término.</p>'; // Mensaje traducido
                 }
            }

             // Actualiza el estado visual de los controles que SÍ están visibles en esta vista (ej. campo de búsqueda)
             this.updateFilterControlsUI(); // Reutilizamos esta función
        }

        // TODO: Podrías añadir un estado 'loading' o 'error' y manejarlos aquí (mostrar spinners, mensajes, etc.)
    },

    // Helper: Actualiza el estado visual de los controles (pestañas, alfabeto, select, paginación, campo búsqueda)
    // para que coincidan con el estado actual (state.activeCategory, state.activeLetter, state.sortBy, state.currentPage)
    updateFilterControlsUI: function() {
        // Actualiza el campo de búsqueda para reflejar el estado, solo si la vista NO es detail
        if (this.domElements.searchInput && this.state.view !== 'detail') {
             this.domElements.searchInput.value = this.state.searchTerm;
        } else if (this.domElements.searchInput && this.state.view === 'detail') {
             // Limpiar el campo de búsqueda si la vista es detail
             this.domElements.searchInput.value = '';
        }


        // Actualiza la clase 'active' para las pestañas de categoría
        if (this.domElements.categoryTabs && this.state.view === 'browse') { // Solo actualiza si la vista es browse
            this.domElements.categoryTabs.forEach(tab => {
                if (tab.dataset.category === this.state.activeCategory) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        } else if (this.domElements.categoryTabs) { // Si no es vista browse, desactiva todas (opcional)
             this.domElements.categoryTabs.forEach(tab => tab.classList.remove('active'));
             // Podrías habilitar/deshabilitar los botones aquí si quieres (pointer-events-none opacity-50)
        }


        // Actualiza la clase 'active' para la navegación alfabética
        const alphabetLinks = document.querySelectorAll('.alphabet-nav a');
         if (alphabetLinks.length > 0 && this.state.view === 'browse') { // Solo actualiza si la vista es browse
             alphabetLinks.forEach(link => {
                 if (link.textContent.trim() === this.state.activeLetter) {
                     link.classList.add('active');
                 } else {
                     link.classList.remove('active');
                 }
             });
         } else if (alphabetLinks.length > 0) { // Si no es vista browse, desactiva todas (opcional)
              alphabetLinks.forEach(link => link.classList.remove('active'));
              // Podrías habilitar/deshabilitar los enlaces aquí
         }


        // Actualiza el valor seleccionado en el select de ordenación
         if (this.domElements.sortSelect && this.state.view === 'browse') { // Solo actualiza si la vista es browse
              this.domElements.sortSelect.value = this.state.sortBy;
              this.domElements.sortSelect.disabled = false; // Habilitar si es vista browse
         } else if (this.domElements.sortSelect) {
              // Si no es vista browse, deshabilitar el select (opcional)
              this.domElements.sortSelect.value = 'name-asc'; // O el valor que quieras mostrar
              this.domElements.sortSelect.disabled = true;
         }


         // Si estamos en la vista browse, renderiza los controles de paginación
         if (this.state.view === 'browse') {
             const { totalItems } = this.getFilteredAndSortedTermsIncludingPaginationInfo();
             this.renderPaginationControls(totalItems);
         } else {
             // Si no estamos en la vista browse, oculta la paginación
              if (this.domElements.paginationNav) this.domElements.paginationNav.classList.add('hidden');
         }
    },


    // --- Métodos de renderizado (llenan el contenido de las secciones, NO controlan visibilidad) ---
    // Son llamados por renderUI para actualizar partes específicas de la interfaz.

    // Renderiza la cuadrícula de tarjetas en la sección "Browse All"
    // Recibe solo los términos de la página actual (ya paginados por getFilteredAndSortedAndPagedTerms)
    renderBrowseView: function(termsOnCurrentPage) {
        // Asegúrate de que el contenedor de la cuadrícula exista
        if (!this.domElements.browseGridContainer) {
             console.error("Browse grid container not found, cannot render browse view!");
             return;
        }

        this.domElements.browseGridContainer.innerHTML = ''; // Limpia el contenido actual

        // Obtiene información de paginación completa para mostrar mensajes correctos si no hay términos
        const { totalItems } = this.getFilteredAndSortedTermsIncludingPaginationInfo();


        if (termsOnCurrentPage.length === 0 && totalItems > 0) {
            // No hay términos en la página actual, pero sí hay en total (página fuera de rango, etc.)
             this.domElements.browseGridContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 py-8">No se encontraron términos en la página ${this.state.currentPage}. Por favor, regresa a la <button onclick="App.updateStateForPagination(1)" class="text-blue-600 hover:underline">primera página</button>.</p>`; // Mensaje traducido
        } else if (termsOnCurrentPage.length === 0 && totalItems === 0) {
             // No hay términos después de aplicar filtros (totalItems es 0)
            this.domElements.browseGridContainer.innerHTML = '<p class="col-span-full text-center text-gray-500 py-8">No se encontraron términos con el filtro actual.</p>'; // Mensaje traducido
        } else {
            // Renderiza las tarjetas para los términos de la página actual
            termsOnCurrentPage.forEach(term => {
                const card = this.createTermCard(term); // Crea la tarjeta usando el helper
                this.domElements.browseGridContainer.appendChild(card); // Añade la tarjeta al DOM
            });
        }
        // Nota: renderPaginationControls es llamado por updateFilterControlsUI, que a su vez es llamada por renderUI si la vista es 'browse'.
        // Por lo tanto, no necesitamos llamarla aquí directamente.
    },

    // Renderiza la lista de resultados en la sección "Search Results"
     renderSearchResultsList: function(results, query = '') {
         // Asegúrate de que los elementos existan
         if (!this.domElements.resultsList || !this.domElements.resultsCount) {
              console.error("Search results list elements not found, cannot render search results!");
              return;
         }

         this.domElements.resultsList.innerHTML = ''; // Limpia la lista actual
         this.domElements.resultsCount.textContent = `${results.length} resultados encontrados para "${query}"`; // Mensaje traducido

         if (results.length === 0) {
             this.domElements.resultsList.innerHTML = '<li class="p-4 text-center text-gray-500">No se encontraron resultados. Intenta otro término de búsqueda.</li>'; // Mensaje traducido
             return;
         }

         // Renderiza los elementos de la lista de resultados
         results.forEach(term => {
             const item = this.createSearchResultItem(term, query); // Usa el método helper
             this.domElements.resultsList.appendChild(item); // Añade el item a la lista
         });
     },

    // Renderiza el contenido detallado de un término en la sección "Term Detail"
    renderTermDetailContent: function(term) {
         // Verifica que todos los elementos de detalle existen antes de intentar llenarlos
         if (!this.domElements.termTitle || !this.domElements.termDefinition || !this.domElements.termExample ||
             !this.domElements.termVideo || !this.domElements.musclesWorked || !this.domElements.termVariations ||
             !this.domElements.relatedTerms || !this.domElements.termCategory) {
              console.error("One or more Term detail DOM elements not found, cannot render detail content!");
              // TODO: Mostrar un mensaje de error en la sección de detalle si es necesario
              return;
         }

        this.domElements.termTitle.textContent = term.name;
        this.domElements.termDefinition.textContent = term.definition;
        this.domElements.termExample.textContent = term.example || "No hay ejemplo disponible."; // Mensaje traducido

        // Configura la insignia de categoría
        this.domElements.termCategory.textContent = this.formatCategory(term.category);
        this.domElements.termCategory.className = 'inline-block mt-2 text-sm px-3 py-1 rounded-full ' + this.getCategoryClass(term.category);

        // Configura el video si está disponible
        const videoContainer = this.domElements.termVideo.parentElement;
        if (term.video) {
            this.domElements.termVideo.src = term.video;
            videoContainer.style.display = 'block';
        } else {
            this.domElements.termVideo.src = ''; // Limpia el src si no hay video
            videoContainer.style.display = 'none';
        }

        // Configura la lista de músculos trabajados
        this.domElements.musclesWorked.innerHTML = ''; // Limpia el contenido actual
        if (term.muscles && term.muscles.length > 0) {
            term.muscles.forEach(muscle => {
                const muscleEl = document.createElement('div');
                muscleEl.className = 'muscle-group bg-blue-50 p-3 rounded-lg text-center';
                muscleEl.innerHTML = `
                    <i class="fas fa-running text-blue-500 text-2xl mb-1"></i>
                    <div class="text-sm font-medium">${muscle}</div>
                `;
                this.domElements.musclesWorked.appendChild(muscleEl);
            });
        } else {
            // Muestra un mensaje si no hay músculos listados, usando col-span-full para ocupar todo el ancho
            this.domElements.musclesWorked.innerHTML = '<p class="col-span-full text-gray-500 text-center text-sm">No hay músculos específicos listados.</p>'; // Mensaje traducido
        }

        // Configura la lista de variaciones
        this.domElements.termVariations.innerHTML = ''; // Limpia el contenido actual
        if (term.variations && term.variations.length > 0) {
            term.variations.forEach(variation => {
                const li = document.createElement('li');
                li.className = 'flex items-center text-gray-700 text-sm'; // Añade clases para estilo
                li.innerHTML = `
                    <i class="fas fa-arrow-right text-blue-500 mr-2"></i>
                    <span>${variation}</span>
                `;
                this.domElements.termVariations.appendChild(li);
            });
        } else {
            this.domElements.termVariations.innerHTML = '<li class="text-gray-500 text-sm">No hay variaciones disponibles.</li>'; // Mensaje traducido
        }

        // Configura los términos relacionados
        this.domElements.relatedTerms.innerHTML = ''; // Limpia el contenido actual
        if (term.related && term.related.length > 0) {
            term.related.forEach(relatedTermName => {
                 // Intenta encontrar el término relacionado en los datos cargados
                const relatedTerm = this.crossfitTerms.find(t => t.name === relatedTermName);
                const a = document.createElement('a');
                a.href = '#'; // Usamos '#' ya que la navegación es manejada por JS
                a.className = 'bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer';
                a.textContent = relatedTermName;

                 // Añade un event listener solo si el término relacionado fue encontrado
                 if(relatedTerm) {
                      a.addEventListener('click', (e) => {
                           e.preventDefault(); // Previene el comportamiento por defecto del enlace
                           // Llama al método que actualiza el estado a 'detail' para el término relacionado
                           this.showTermDetail(relatedTerm);
                      });
                 } else {
                      // Si el término relacionado no existe en los datos, lo marca como no clicable
                      a.classList.add('pointer-events-none', 'opacity-70');
                      console.warn(`Término relacionado "${relatedTermName}" no encontrado en los datos.`); // Mensaje traducido
                 }
                this.domElements.relatedTerms.appendChild(a);
            });
        } else {
            this.domElements.relatedTerms.innerHTML = '<p class="text-gray-500 text-sm">No hay términos relacionados.</p>'; // Mensaje traducido
        }

        // TODO: Podrías añadir más lógica aquí si necesitas renderizar otros datos del término
    },

    // Renderiza los controles de paginación (Previous, números de página, Next)
    renderPaginationControls: function(totalItems) {
        const paginationNav = this.domElements.paginationNav;
        if (!paginationNav) {
             console.error("Pagination navigation element not found!");
             return;
        }

        // Calcula el número total de páginas
        const totalPages = Math.ceil(totalItems / this.state.termsPerPage);
        const currentPage = this.state.currentPage; // La página actual del estado

        paginationNav.innerHTML = ''; // Limpia los controles de paginación actuales

        if (totalPages <= 1) {
            paginationNav.classList.add('hidden'); // Oculta la paginación si solo hay 1 página o menos
            return;
        }

        paginationNav.classList.remove('hidden'); // Asegúrate de que la paginación esté visible

        // --- Botón "Previous" ---
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.className = `px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`;
        prevButton.setAttribute('aria-label', 'Página anterior'); // Añadir accesibilidad traducida
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        if (currentPage > 1) {
             // Añade listener solo si no está en la primera página
             prevButton.addEventListener('click', (e) => {
                 e.preventDefault();
                 this.updateStateForPagination(currentPage - 1); // Llama al método para ir a la página anterior
             });
        }
        paginationNav.appendChild(prevButton);

        // --- Botones de número de página ---
        // Lógica para mostrar un rango de páginas (ej. página actual, 2 antes, 2 después)
        const maxPageButtons = 5; // Número máximo de botones de página a mostrar
        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        // Ajustar el rango si estamos cerca del final (para mantener maxPageButtons visible si es posible)
        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }
        // Asegurarse de que endPage no supere totalPages después del ajuste
        endPage = Math.min(totalPages, endPage);


        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('a');
            pageButton.href = '#';
             // Clases dinámicas: borde, color, fuente según si es la página actual
            pageButton.className = `px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ${i === currentPage ? 'active text-blue-600 font-medium border-blue-300 z-10' : ''}`;
             // Añade borde izquierdo a partir del segundo botón en el rango VISIBLE
             if (i > startPage) pageButton.classList.add('border-l');

            pageButton.textContent = i;
             pageButton.setAttribute('aria-label', `Página ${i}`); // Añadir accesibilidad traducida

            if (i !== currentPage) {
                 // Añade listener solo si no es la página actual
                 pageButton.addEventListener('click', (e) => {
                     e.preventDefault();
                     this.updateStateForPagination(i); // Llama al método para ir a la página i
                 });
            } else {
                 // Si es la página actual, hacerlo no clicable visualmente y con aria-current
                 pageButton.classList.add('pointer-events-none');
                 pageButton.setAttribute('aria-current', 'page');
            }
            paginationNav.appendChild(pageButton);
        }

         // --- Botón "Next" ---
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.className = `px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`;
        nextButton.setAttribute('aria-label', 'Página siguiente'); // Añadir accesibilidad traducida
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        if (currentPage < totalPages) {
            // Añade listener solo si no está en la última página
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateStateForPagination(currentPage + 1); // Llama al método para ir a la página siguiente
            });
        }
        paginationNav.appendChild(nextButton);
    },


    // --- Métodos Helper para crear elementos DOM o lógica de visualización ---

    // Crea un elemento DOM de tarjeta de término para la vista de exploración
    createTermCard: function(term) {
        const card = document.createElement('div');
        // Añade clases para estilo y comportamiento (cursor-pointer)
        card.className = 'exercise-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer';

        // Usa template literals para construir el HTML interno de la tarjeta
        card.innerHTML = `
            <div class="h-40 ${this.getCategoryBgClass(term.category)} flex items-center justify-center">
                <i class="${this.getCategoryIcon(term.category)} text-5xl ${this.getCategoryIconColor(term.category)}"></i>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start">
                    <h4 class="text-lg font-bold text-gray-800">${term.name}</h4>
                    <span class="text-xs px-2 py-1 rounded-full ${this.getCategoryClass(term.category)}">${this.formatCategory(term.category)}</span>
                </div>
                <p class="text-gray-600 mt-2 text-sm">${term.definition.substring(0, 80)}${term.definition.length > 80 ? '...' : ''}</p>
            </div>
        `;

        // Añade un event listener a la tarjeta completa para mostrar el detalle del término
        card.addEventListener('click', () => this.showTermDetail(term)); // Llama al controlador showTermDetail

        return card; // Retorna el elemento DOM div creado
    },

    // Crea un elemento DOM de lista para los resultados de búsqueda
    createSearchResultItem: function(term, query) {
        const li = document.createElement('li');
        li.className = 'p-4 hover:bg-gray-50 cursor-pointer'; // Clases para estilo y hover

        // Construye el HTML interno del item de lista, resaltando el texto de búsqueda
        li.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-medium text-gray-800">${this.highlightText(term.name, query)}</h4>
                    <p class="text-sm text-gray-600 mt-1">${this.highlightText(term.definition.substring(0, 150) + (term.definition.length > 150 ? '...' : ''), query)}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded-full ${this.getCategoryClass(term.category)}">${this.formatCategory(term.category)}</span>
            </div>
        `;

        // Añade un event listener al item de lista para mostrar el detalle del término
        li.addEventListener('click', () => this.showTermDetail(term)); // Llama al controlador showTermDetail

        return li; // Retorna el elemento DOM li creado
    },


    // Helper: Resalta las ocurrencias de la query dentro de un texto
    highlightText: function(text, query) {
        if (!query) return text; // No resaltar si no hay query
        const regex = new RegExp(`(${query})`, 'gi'); // Crea una expresión regular global e insensible a mayúsculas
        // Evita reemplazar dentro de etiquetas HTML existentes (simple).
        // Una implementación más robusta podría requerir parsear el HTML o usar una biblioteca.
        const safeText = text.replace(/</g, '<').replace(/>/g, '>'); // Escapa HTML básico
        return safeText.replace(regex, '<span class="search-highlight">$1</span>'); // Reemplaza las ocurrencias con la etiqueta de resaltado
    },

    // Helper: Formatea la cadena de categoría devolviendo el nombre traducido
    formatCategory: function(category) {
        if (!category) return '';
        const translations = {
             'all': 'Todos los Términos',
             'exercises': 'Ejercicios',
             'wods': 'WODs',
             'equipment': 'Equipamiento',
             'acronyms': 'Acrónimos',
             'gymnastics': 'Gimnásticos',
             'concepts': 'Conceptos'
        };
        // Devuelve la traducción si existe, de lo contrario formatea la clave (por si hay nuevas categorías no traducidas)
        return translations[category] || category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },

    // Helper: Obtiene las clases CSS de fondo y texto para una categoría (usan las claves en inglés)
    getCategoryClass: function(category) {
        const classes = {
            'exercises': 'bg-green-100 text-green-800',
            'wods': 'bg-blue-100 text-blue-800',
            'equipment': 'bg-yellow-100 text-yellow-800',
            'acronyms': 'bg-purple-100 text-purple-800',
            'gymnastics': 'bg-red-100 text-red-800',
            'concepts': 'bg-indigo-100 text-indigo-800',
            // Añadir más si hay nuevas categorías
        };
        return classes[category] || 'bg-gray-100 text-gray-800'; // Clase por defecto
    },

    // Helper: Obtiene la clase CSS de fondo para una categoría (usada en la tarjeta, usan las claves en inglés)
    getCategoryBgClass: function(category) {
        const classes = {
            'exercises': 'bg-green-100',
            'wods': 'bg-blue-100',
            'equipment': 'bg-yellow-100',
            'acronyms': 'bg-purple-100',
            'gymnastics': 'bg-red-100',
            'concepts': 'bg-indigo-100',
             // Añadir más si hay nuevas categorías
        };
        return classes[category] || 'bg-gray-100'; // Clase por defecto
    },

    // Helper: Obtiene el icono Font Awesome para una categoría (usan las claves en inglés)
    getCategoryIcon: function(category) {
        const icons = {
            'exercises': 'fas fa-running',
            'wods': 'fas fa-fire-alt',
            'equipment': 'fas fa-dumbbell',
            'acronyms': 'fas fa-trophy',
            'gymnastics': 'fas fa-grip-lines', // Icono de barras de gimnasia
            'concepts': 'fas fa-lightbulb',
             // Añadir más si hay nuevas categorías
        };
        return icons[category] || 'fas fa-question-circle'; // Icono por defecto
    },

    // Helper: Obtiene el color CSS para el icono de una categoría (usan las claves en inglés)
    getCategoryIconColor: function(category) {
         const colors = {
            'exercises': 'text-green-600',
            'wods': 'text-blue-600',
            'equipment': 'text-yellow-600',
            'acronyms': 'text-purple-600',
            'gymnastics': 'text-red-600',
            'concepts': 'text-indigo-600',
             // Añadir más si hay nuevas categorías
        };
        return colors[category] || 'text-gray-600'; // Color por defecto
    }

    // TODO: Podrías añadir más métodos helper aquí si son necesarios
}; // Fin del objeto App

// --- Inicio de la aplicación ---
// Espera a que todo el DOM esté cargado antes de iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    App.init(); // Llama al método de inicialización del objeto App
});

/* --- END OF FILE script.js --- */