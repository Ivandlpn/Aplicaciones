// El objeto principal que contiene toda la lógica y el estado de la aplicación
const App = {
    // --- Propiedades para almacenar datos y referencias ---

    crossfitTerms: [],
    termMapByName: null,
    termMapById: null, // Añadido para búsqueda rápida por ID

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
        definitionTitle: null, // Referencia para el título de la definición
        termExample: null,
        termExampleContainer: null,
        exampleTitle: null, // Referencia para el título del ejemplo
        termVideo: null, // Referencia al iframe
        termImage: null, // Referencia al img
        termVideoContainer: null, // Contenedor que ahora albergará video O imagen
        videoTitle: null,
        musclesWorked: null,
        musclesWorkedContainer: null,
        termVariations: null,
        termVariationsContainer: null,
        relatedTerms: null,
        backButton: null,
        categoryTabs: null,
        sortSelect: null,
        browseGridContainer: null,
        paginationNav: null,
        athleteStatsContainer: null,
        athleteStats: null,
    },

    // --- Estado de la aplicación ---
    state: {
        view: 'browse',
        selectedTermId: null,
        searchTerm: '',
        activeCategory: 'all',
        activeLetter: 'All',
        sortBy: 'name-asc',
        currentPage: 1,
        termsPerPage: 12,
    },


    // --- Métodos de inicialización y configuración ---

    init: function() {
        console.log("App initialized.");
        this.getDOMElements();
        this.updateStateFromUrl();
        this.loadTerms();
    },

    getDOMElements: function() {
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

        this.domElements.definitionTitle = document.getElementById('definitionTitle');
         if (!this.domElements.definitionTitle) console.error("DOM Element #definitionTitle not found!");
        this.domElements.exampleTitle = document.getElementById('exampleTitle');
         if (!this.domElements.exampleTitle) console.error("DOM Element #exampleTitle not found!");
        this.domElements.videoTitle = document.getElementById('videoTitle');
         if (!this.domElements.videoTitle) console.error("DOM Element #videoTitle not found!");


        this.domElements.termExample = document.getElementById('termExample');
         if (!this.domElements.termExample) console.error("DOM Element #termExample not found!");
        this.domElements.termExampleContainer = document.getElementById('termExampleContainer');
         if (!this.domElements.termExampleContainer) console.error("DOM Element #termExampleContainer not found!");

        this.domElements.termVideo = document.getElementById('termVideo');
         if (!this.domElements.termVideo) console.error("DOM Element #termVideo not found!");
        this.domElements.termImage = document.getElementById('termImage');
         if (!this.domElements.termImage) console.error("DOM Element #termImage not found!");

        this.domElements.termVideoContainer = document.getElementById('termVideoContainer');
         if (!this.domElements.termVideoContainer) console.error("DOM Element #termVideoContainer not found!");


        this.domElements.musclesWorked = document.getElementById('musclesWorked');
         if (!this.domElements.musclesWorked) console.error("DOM Element #musclesWorked not found!");
        this.domElements.musclesWorkedContainer = document.getElementById('musclesWorkedContainer');
         if (!this.domElements.musclesWorkedContainer) console.error("DOM Element #musclesWorkedContainer not found!");


        this.domElements.termVariations = document.getElementById('termVariations');
         if (!this.domElements.termVariations) console.error("DOM Element #termVariations not found!");
        this.domElements.termVariationsContainer = document.getElementById('termVariationsContainer');
         if (!this.domElements.termVariationsContainer) console.error("DOM Element #termVariationsContainer not found!");

        this.domElements.relatedTerms = document.getElementById('relatedTerms');
         if (!this.domElements.relatedTerms) console.error("DOM Element #relatedTerms not found!");

        this.domElements.backButton = document.getElementById('backButton');
         if (!this.domElements.backButton) console.error("DOM Element #backButton not found!");

        this.domElements.categoryTabs = document.querySelectorAll('.category-tab');
         if (this.domElements.categoryTabs.length === 0) console.warn("DOM Elements .category-tab not found!");

        this.domElements.sortSelect = document.getElementById('sortSelect');
         if (!this.domElements.sortSelect) console.error("DOM Element #sortSelect not found!");

        this.domElements.browseGridContainer = document.querySelector('#browseAll .grid');
         if (!this.domElements.browseGridContainer) console.error("DOM Element #browseAll .grid not found!");

        this.domElements.paginationNav = document.querySelector('#browseAll .mt-8 nav');
         if (!this.domElements.paginationNav) console.error("DOM Element #paginationNav not found!");

        this.domElements.athleteStatsContainer = document.getElementById('athleteStatsContainer');
         if (!this.domElements.athleteStatsContainer) console.error("DOM Element #athleteStatsContainer not found!");
        this.domElements.athleteStats = document.getElementById('athleteStats');
         if (!this.domElements.athleteStats) console.error("DOM Element #athleteStats not found!");
    },

    bindEvents: function() {
        if (this.domElements.searchButton) {
             this.domElements.searchButton.addEventListener('click', () => this.performSearch());
        }
        if (this.domElements.searchInput) {
            this.domElements.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
             this.domElements.searchInput.addEventListener('input', () => {
                 if (this.domElements.searchInput.value.length >= 3 || (this.state.view === 'search' && this.domElements.searchInput.value.length < 3 && this.domElements.searchInput.value.length > 0)) {
                      this.performSearch();
                 } else if (this.state.view === 'search' && this.domElements.searchInput.value.length === 0) {
                      this.showBrowseView();
                 } else if (this.state.view === 'search' && this.domElements.searchInput.value.length < 3) {
                     if (this.domElements.resultsList) {
                        this.domElements.resultsList.innerHTML = '<li class="p-4 text-center text-gray-500">Introduce al menos 3 caracteres para buscar.</li>';
                        this.domElements.resultsCount.textContent = '';
                     }
                 }
             });
        }

        // BOTÓN DE RETROCESO: USAR FUNCIÓN FLECHA SIMPLE LLAMANDO A App
        if (this.domElements.backButton) {
             // Llama al método showBrowseView a través del objeto App global
             this.domElements.backButton.addEventListener('click', () => App.updateStateForBrowse()); // Mantener esta sintaxis
        }


        // Pestañas de Categoría: Acceden a App a través de 'App.updateState...'
        if (this.domElements.categoryTabs) {
            this.domElements.categoryTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    App.updateStateForCategoryFilter(this.dataset.category);
                });
            });
        }

        // Selector de Ordenación: Usa arrow function
        if (this.domElements.sortSelect) {
            this.domElements.sortSelect.addEventListener('change', () => {
                this.updateStateForSort(this.domElements.sortSelect.value);
            });
        }

        // Navegación Alfabética: Acceden a App a través de 'App.updateState...'
        document.querySelectorAll('.alphabet-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                App.updateStateForLetterFilter(this.textContent.trim());
            });
        });

        // Listener para popstate: Usa arrow function
        window.addEventListener('popstate', (event) => {
            console.log("Popstate event triggered. State from history:", event.state);
            this.updateStateFromUrl();
            this.renderUI();
        });

         // Delegación de eventos para tarjetas en la vista de exploración (Usa arrow function)
         if (this.domElements.browseGridContainer) {
              this.domElements.browseGridContainer.addEventListener('click', (e) => {
                  const cardElement = e.target.closest('.exercise-card');
                  if (cardElement && cardElement.dataset.termId) {
                       const termId = parseInt(cardElement.dataset.termId, 10);
                       const term = this.termMapById ? this.termMapById[termId] : this.crossfitTerms.find(t => t.id === termId);
                       if (term) {
                            this.showTermDetail(term);
                       } else {
                           console.error("Término no encontrado en datos al hacer clic en la tarjeta con ID:", termId);
                       }
                  }
              });
         }

          // Delegación de eventos para resultados de búsqueda (Usa arrow function)
         if (this.domElements.resultsList) {
              this.domElements.resultsList.addEventListener('click', (e) => {
                  const listItem = e.target.closest('li');
                  if (listItem && listItem.dataset.termId) {
                       const termId = parseInt(listItem.dataset.termId, 10);
                       const term = this.termMapById ? this.termMapById[termId] : this.crossfitTerms.find(t => t.id === termId);
                       if (term) {
                            this.showTermDetail(term);
                       } else {
                            console.error("Término no encontrado en datos al hacer clic en resultado de búsqueda con ID:", termId);
                       }
                  }
              });
         }
         // Los listeners de paginación en renderPaginationControls también usan arrow functions.
    },

    loadTerms: async function() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.crossfitTerms = await response.json();
            console.log("Datos cargados:", this.crossfitTerms.length, "términos.");

             this.termMapByName = this.crossfitTerms.reduce((map, term) => {
                 map[term.name] = term;
                 if (term.fullName) { // Añadir también por nombre completo si existe
                     map[term.fullName] = term;
                 }
                 return map;
             }, {});

             this.termMapById = this.crossfitTerms.reduce((map, term) => {
                 map[term.id] = term;
                 return map;
             }, {});

             console.log("Mapas de términos (byName, byId) creados.");

            this.bindEvents();

             if (this.state.view === 'detail' && this.state.selectedTermId !== null) {
                 const termExists = this.termMapById.hasOwnProperty(this.state.selectedTermId);
                 if (!termExists) {
                     console.warn(`Term with ID ${this.state.selectedTermId} not found. Changing view to browse.`);
                     this.state.view = 'browse';
                     this.state.selectedTermId = null;
                 }
             }

             const validSorts = ['name-asc', 'name-desc', 'category', 'popularity'];
             if (!validSorts.includes(this.state.sortBy)) {
                  console.warn(`Invalid sort key "${this.state.sortBy}" in URL. Defaulting to "name-asc".`);
                  this.state.sortBy = 'name-asc';
              }
              if (this.domElements.sortSelect) {
                   this.domElements.sortSelect.value = this.state.sortBy;
              }

             if (this.state.view === 'browse') {
                 const { totalPages } = this.getFilteredAndSortedTermsIncludingPaginationInfo();
                 if (this.state.currentPage > totalPages && totalPages > 0) {
                      console.warn(`Current page ${this.state.currentPage} is out of bounds (total pages ${totalPages}). Adjusting to page ${totalPages}.`);
                      this.state.currentPage = totalPages;
                 } else if (totalPages === 0) {
                      this.state.currentPage = 1;
                 }
             }

            this.updateUrlFromState(true);
            this.renderUI();

        } catch (error) {
            console.error("Error al cargar los términos:", error);
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.innerHTML = '<p class="col-span-full text-center text-red-600 text-xl py-8">Error al cargar los términos. Consulta la consola para más detalles.</p>';
            }
             if (this.domElements.searchInput) {this.domElements.searchInput.disabled = true; this.domElements.searchInput.placeholder = "Error de carga";}
             if (this.domElements.searchButton) this.domElements.searchButton.disabled = true;
             if (this.domElements.categoryTabs) this.domElements.categoryTabs.forEach(tab => tab.disabled = true);
             if (this.domElements.sortSelect) this.domElements.sortSelect.disabled = true;
             document.querySelectorAll('.alphabet-nav a').forEach(link => {
                  link.classList.add('pointer-events-none', 'opacity-50');
             });
             if (this.domElements.paginationNav) this.domElements.paginationNav.classList.add('hidden');
        }
    },

     updateStateFromUrl: function() {
         const params = new URLSearchParams(window.location.search);

         const view = params.get('view') || 'browse';
         this.state.view = view;

         if (view === 'browse') {
             this.state.activeCategory = params.get('cat') || 'all';
             this.state.activeLetter = params.get('letter') || 'All';
             this.state.currentPage = parseInt(params.get('page') || '1', 10);
             if (isNaN(this.state.currentPage) || this.state.currentPage < 1) {
                 this.state.currentPage = 1;
             }
             this.state.sortBy = params.get('sort') || 'name-asc';
             this.state.selectedTermId = null;


         } else if (view === 'detail') {
             const id = parseInt(params.get('id'), 10);
             this.state.selectedTermId = !isNaN(id) ? id : null;
             this.state.searchTerm = '';
             this.state.activeCategory = 'all';
             this.state.activeLetter = 'All';
             this.state.currentPage = 1;
             this.state.sortBy = 'name-asc';


         } else if (view === 'search') {
             this.state.searchTerm = params.get('q') || '';
             this.state.selectedTermId = null;
             this.state.activeCategory = 'all';
             this.state.activeLetter = 'All';
             this.state.currentPage = 1;
             this.state.sortBy = 'name-asc';

         } else {
              console.warn("Vista no reconocida en la URL:", view, "Por defecto 'browse'.");
              this.state.view = 'browse';
              this.state.selectedTermId = null;
              this.state.searchTerm = '';
              this.state.activeCategory = 'all';
              this.state.activeLetter = 'All';
              this.state.currentPage = 1;
              this.state.sortBy = 'name-asc';
         }

         console.log("Estado actualizado desde la URL:", this.state);
     },

     updateUrlFromState: function(replace = false) {
         if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, omitiendo actualización de URL.");
             return;
         }

         const url = new URL(window.location.origin + window.location.pathname);

         if (this.state.view !== 'browse') {
            url.searchParams.set('view', this.state.view);
         }


         if (this.state.view === 'browse') {
             if (this.state.activeCategory !== 'all') {
                 url.searchParams.set('cat', this.state.activeCategory);
             }
             if (this.state.activeLetter !== 'All') {
                 url.searchParams.set('letter', this.state.activeLetter);
             }
              if (this.state.currentPage !== 1) {
                 url.searchParams.set('page', this.state.currentPage);
             }
              if (this.state.sortBy !== 'name-asc') {
                 url.searchParams.set('sort', this.state.sortBy);
             }

         } else if (this.state.view === 'detail') {
             if (this.state.selectedTermId !== null) {
                 url.searchParams.set('id', this.state.selectedTermId);
             } else {
                  console.warn("El estado indica vista de detalle pero selectedTermId es null. La URL estará incompleta.");
             }

         } else if (this.state.view === 'search') {
             if (this.state.searchTerm !== '') {
                 url.searchParams.set('q', this.state.searchTerm);
             }
         }

         if (replace) {
             history.replaceState(this.state, '', url.toString());
         } else {
             history.pushState(this.state, '', url.toString());
         }
          console.log(`${replace ? 'Reemplazado' : 'Pulsado'} estado a la URL:`, url.toString());
     },

    getFilteredAndSortedAndPagedTerms: function() {
        if (this.crossfitTerms.length === 0) {
             return [];
        }
        const allFilteredSortedTerms = this.getFilteredAndSortedTermsIncludingPaginationInfo().terms;
        const startIndex = (this.state.currentPage - 1) * this.state.termsPerPage;
        const endIndex = startIndex + this.state.termsPerPage;
        const termsOnPage = allFilteredSortedTerms.slice(startIndex, endIndex);
        return termsOnPage;
    },

    getFilteredAndSortedTermsIncludingPaginationInfo: function() {
         if (this.crossfitTerms.length === 0) {
              return { terms: [], totalItems: 0, totalPages: 0 };
         }

         let terms = [...this.crossfitTerms];

         // 1. Filtrar por categoría
         if (this.state.activeCategory !== 'all') {
             terms = terms.filter(term => term.category === this.state.activeCategory);
         }

         // 2. Filtrar por letra (nombre O nombre completo para atletas)
         if (this.state.activeLetter !== 'All') {
              terms = terms.filter(term =>
                  (term.name && term.name.startsWith(this.state.activeLetter)) ||
                  (term.fullName && term.fullName.startsWith(this.state.activeLetter))
              );
         }

         const totalItems = terms.length;
         const totalPages = Math.ceil(totalItems / this.state.termsPerPage);

         // 3. Aplicar ordenación
         switch(this.state.sortBy) {
             case 'name-asc':
                 terms.sort((a, b) => (a.fullName || a.name).localeCompare(b.fullName || b.name));
                 break;
             case 'name-desc':
                 terms.sort((a, b) => (b.fullName || b.name).localeCompare(a.fullName || b.name));
                 break;
             case 'category':
                 terms.sort((a, b) => {
                    if (a.category < b.category) return -1;
                    if (a.category > b.category) return 1;
                    return (a.fullName || a.name).localeCompare(b.fullName || b.name);
                });
                 break;
             case 'popularity':
                 terms = terms.sort(() => Math.random() - 0.5);
                 break;
             default:
                 terms.sort((a, b) => (a.fullName || a.name).localeCompare(b.fullName || b.name));
                 break;
         }

         return {
             terms: terms,
             totalItems: totalItems,
             totalPages: totalPages
         };
    },

    performSearch: function() {
        const query = this.domElements.searchInput ? this.domElements.searchInput.value.trim() : '';
        if (query.length < 3 && query.length > 0) {
             console.log("Término de búsqueda demasiado corto:", query);
             if (this.state.view === 'search') {
                 if (this.domElements.resultsList) {
                    this.domElements.resultsList.innerHTML = '<li class="p-4 text-center text-gray-500">Introduce al menos 3 caracteres para buscar.</li>';
                    this.domElements.resultsCount.textContent = '';
                 }
             }
             return;
        }
        if (query === '') {
            if (this.state.view === 'search') {
                 this.showBrowseView();
            }
            return;
        }
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede realizar la búsqueda.");
             return;
        }
        this.updateStateForSearch(query);
    },


     updateStateForBrowse: function() {
          if (this.crossfitTerms.length === 0) {
               console.warn("Datos no cargados, no se puede actualizar el estado a browse.");
               return;
          }
           this.state.searchTerm = '';
          this.state.view = 'browse';
          this.state.selectedTermId = null;
          this.updateUrlFromState();
          this.renderUI();
     },

    showTermDetail: function(term) {
         if (!term || term.id === undefined || term.id === null) {
             console.error("Término inválido pasado a showTermDetail");
             return;
         }
         this.state.searchTerm = '';
         this.state.activeCategory = 'all';
         this.state.activeLetter = 'All';
         this.state.currentPage = 1;
         this.state.sortBy = 'name-asc';

         this.state.view = 'detail';
         this.state.selectedTermId = term.id;
         this.updateUrlFromState();
         this.renderUI();
    },

     updateStateForCategoryFilter: function(category) {
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado del filtro de categoría.");
             return;
        }
        this.state.searchTerm = '';
        this.state.activeLetter = 'All';
        this.state.activeCategory = category;
        this.state.view = 'browse';
        this.state.currentPage = 1;
        this.updateUrlFromState();
        this.renderUI();
    },

     updateStateForLetterFilter: function(letter) {
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado del filtro por letra.");
             return;
        }
        this.state.searchTerm = '';
        this.state.activeCategory = 'all';
        this.state.activeLetter = letter;
        this.state.view = 'browse';
        this.state.currentPage = 1;
        this.updateUrlFromState();
        this.renderUI();
    },

     updateStateForSort: function(sortBy) {
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado de ordenación.");
             return;
        }
        this.state.searchTerm = '';
        this.state.sortBy = sortBy;
        this.state.view = 'browse';
        this.state.currentPage = 1;
        this.updateUrlFromState();
        this.renderUI();
    },

    updateStateForPagination: function(pageNumber) {
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado de paginación.");
             return;
        }

        const { totalPages } = this.getFilteredAndSortedTermsIncludingPaginationInfo();

        if (pageNumber >= 1 && pageNumber <= totalPages) {
            this.state.currentPage = pageNumber;
            this.state.view = 'browse';
            this.updateUrlFromState();
            this.renderUI();
        } else {
            console.warn("Número de página inválido:", pageNumber, "Páginas totales:", totalPages);
        }
    },

     updateStateForSearch: function(query) {
        if (this.crossfitTerms.length === 0) {
             console.warn("Datos no cargados, no se puede actualizar el estado de búsqueda.");
             return;
        }
         this.state.activeCategory = 'all';
         this.state.activeLetter = 'All';
         this.state.currentPage = 1;
         this.state.sortBy = 'name-asc';

        this.state.view = 'search';
        this.state.searchTerm = query.trim().toLowerCase();
         this.state.selectedTermId = null;
         this.updateUrlFromState();
         this.renderUI();
     },

    updateStateForDetail: function(termId) {
         if (!termId || termId === null || termId === undefined) {
              console.warn("ID de término inválido, no se puede actualizar el estado de detalle.");
              this.updateStateForBrowse();
              return;
         }
          if (this.crossfitTerms.length === 0) {
               console.warn("Datos no cargados, no se puede actualizar el estado de detalle.");
               this.updateStateForBrowse();
               return;
          }

         const term = this.termMapById ? this.termMapById[termId] : this.crossfitTerms.find(t => t.id === termId);

          if (!term) {
               console.warn("Término no encontrado para el ID:", termId, "Cambiando vista a browse.");
               this.updateStateForBrowse();
               return;
          }

         this.state.searchTerm = '';
         this.state.activeCategory = 'all';
         this.state.activeLetter = 'All';
         this.state.currentPage = 1;
         this.state.sortBy = 'name-asc';


         this.state.view = 'detail';
         this.state.selectedTermId = term.id;
         this.updateUrlFromState();
         this.renderUI();
    },


    renderUI: function() {
        console.log("Renderizando UI basada en el estado:", this.state);

        if (this.domElements.browseAll) this.domElements.browseAll.classList.add('hidden');
        if (this.domElements.termDetail) this.domElements.termDetail.classList.add('hidden');
        if (this.domElements.searchResults) this.domElements.searchResults.classList.add('hidden');

        if (this.domElements.searchInput) {
             this.domElements.searchInput.value = (this.state.view === 'detail') ? '' : this.state.searchTerm;
             this.domElements.searchInput.disabled = this.state.view === 'detail';
        }

        this.updateFilterControlsUI();


        if (this.state.view === 'browse') {
            if (this.domElements.browseAll) this.domElements.browseAll.classList.remove('hidden');
            const termsOnCurrentPage = this.getFilteredAndSortedAndPagedTerms();
            this.renderBrowseView(termsOnCurrentPage);


        } else if (this.state.view === 'search') {
             if (this.domElements.searchResults) this.domElements.searchResults.classList.remove('hidden');
            const query = this.state.searchTerm;

             if (query.length < 3 && query.length > 0) {
                  if (this.domElements.resultsList) {
                     this.domElements.resultsList.innerHTML = '<li class="p-4 text-center text-gray-500">Introduce al menos 3 caracteres para buscar.</li>';
                     this.domElements.resultsCount.textContent = '';
                  }
             } else {
                 const results = this.crossfitTerms.filter(term =>
                     term.name.toLowerCase().includes(query) ||
                     (term.fullName && term.fullName.toLowerCase().includes(query)) ||
                     term.definition.toLowerCase().includes(query) ||
                     (term.example && term.example.toLowerCase().includes(query)) ||
                     (term.category && this.formatCategory(term.category).toLowerCase().includes(query)) ||
                     (term.category === 'athletes' && term.nationality && this.getCountryName(term.nationality).toLowerCase().includes(query)) ||
                      (term.category === 'athletes' && term.height && term.height.toLowerCase().includes(query)) ||
                     (term.category === 'athletes' && term.weight && term.weight.toLowerCase().includes(query)) ||
                     (term.category === 'athletes' && term.competitions && term.competitions.some(c => c.toLowerCase().includes(query))) ||
                      (term.category === 'athletes' && term.benchmarks && Object.entries(term.benchmarks).some(([wod, mark]) => wod.toLowerCase().includes(query) || mark.toLowerCase().includes(query)))

                 );
                 this.renderSearchResultsList(results, query);
             }


        } else if (this.state.view === 'detail') {
             if (this.domElements.termDetail) this.domElements.termDetail.classList.remove('hidden');
            const term = this.termMapById ? this.termMapById[this.state.selectedTermId] : this.crossfitTerms.find(t => t.id === this.state.selectedTermId);

            if (term) {
                this.renderTermDetailContent(term);
                if (this.domElements.termDetail && !this.domElements.termDetail.classList.contains('hidden')) {
                     this.domElements.termDetail.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                 console.error("renderUI: Término no encontrado para el estado de vista de detalle, pero no fue redirigido. ID:", this.state.selectedTermId);
                 if (this.domElements.termDetail) {
                     this.domElements.termDetail.innerHTML = '<p class="text-center text-red-600 text-xl py-8">Error al renderizar el detalle del término.</p>';
                 }
            }
        }
    },

    updateFilterControlsUI: function() {
        if (this.domElements.searchInput) {
             this.domElements.searchInput.value = (this.state.view === 'detail') ? '' : this.state.searchTerm;
             this.domElements.searchInput.disabled = this.state.view === 'detail';
        }

        if (this.domElements.categoryTabs) {
            this.domElements.categoryTabs.forEach(tab => {
                 if (this.state.view === 'browse' && tab.dataset.category === this.state.activeCategory) {
                    tab.classList.add('active');
                 } else {
                    tab.classList.remove('active');
                 }
                 tab.disabled = this.state.view !== 'browse';
                 tab.classList.toggle('pointer-events-none', this.state.view !== 'browse');
                 tab.classList.toggle('opacity-50', this.state.view !== 'browse');
            });
        }

        const alphabetLinks = document.querySelectorAll('.alphabet-nav a');
         if (alphabetLinks.length > 0) {
             alphabetLinks.forEach(link => {
                 if (this.state.view === 'browse' && link.textContent.trim() === this.state.activeLetter) {
                     link.classList.add('active');
                 } else {
                     link.classList.remove('active');
                 }
                 link.classList.toggle('pointer-events-none', this.state.view !== 'browse');
                 link.classList.toggle('opacity-50', this.state.view !== 'browse');
             });
         }

         if (this.domElements.sortSelect) {
              if (this.state.view === 'browse') {
                 this.domElements.sortSelect.value = this.state.sortBy;
                 this.domElements.sortSelect.disabled = false;
                 this.domElements.sortSelect.classList.remove('opacity-50');
              } else {
                 this.domElements.sortSelect.value = 'name-asc';
                 this.domElements.sortSelect.disabled = true;
                 this.domElements.sortSelect.classList.add('opacity-50');
              }
         }

         if (this.state.view === 'browse') {
             const { totalItems } = this.getFilteredAndSortedTermsIncludingPaginationInfo();
             this.renderPaginationControls(totalItems);
         } else {
              if (this.domElements.paginationNav) this.domElements.paginationNav.classList.add('hidden');
         }
    },


    renderBrowseView: function(termsOnCurrentPage) {
        if (!this.domElements.browseGridContainer) {
             console.error("Browse grid container not found, cannot render browse view!");
             return;
        }

        this.domElements.browseGridContainer.innerHTML = '';

        const { totalItems } = this.getFilteredAndSortedTermsIncludingPaginationInfo();


        if (termsOnCurrentPage.length === 0 && totalItems > 0) {
             this.domElements.browseGridContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 py-8">No se encontraron términos en la página ${this.state.currentPage}. Por favor, regresa a la <button onclick="App.updateStateForPagination(1)" class="text-blue-600 hover:underline">primera página</button>.</p>`;
        } else if (termsOnCurrentPage.length === 0 && totalItems === 0) {
            this.domElements.browseGridContainer.innerHTML = '<p class="col-span-full text-center text-gray-500 py-8">No se encontraron términos con el filtro actual.</p>';
        } else {
            termsOnCurrentPage.forEach(term => {
                const card = this.createTermCard(term);
                 card.dataset.termId = term.id;
                this.domElements.browseGridContainer.appendChild(card);
            });
        }
    },

     renderSearchResultsList: function(results, query = '') {
         if (!this.domElements.resultsList || !this.domElements.resultsCount) {
              console.error("Search results list elements not found, cannot render search results!");
              return;
         }

         this.domElements.resultsList.innerHTML = '';
         this.domElements.resultsCount.textContent = `${results.length} resultados encontrados para "${query}"`;

         if (results.length === 0) {
             this.domElements.resultsList.innerHTML = '<li class="p-4 text-center text-gray-500">No se encontraron resultados. Intenta otro término de búsqueda.</li>';
             return;
         }

         results.forEach(term => {
             const item = this.createSearchResultItem(term, query);
             item.dataset.termId = term.id;
             this.domElements.resultsList.appendChild(item);
         });
     },

    renderTermDetailContent: function(term) {
         if (!this.domElements.termTitle || !this.domElements.termDefinition || !this.domElements.definitionTitle ||
             !this.domElements.termExampleContainer || !this.domElements.exampleTitle || !this.domElements.termExample ||
             !this.domElements.termVideoContainer || !this.domElements.videoTitle || !this.domElements.termVideo || !this.domElements.termImage ||
             !this.domElements.musclesWorkedContainer || !this.domElements.musclesWorked ||
             !this.domElements.termVariationsContainer || !this.domElements.termVariations ||
             !this.domElements.relatedTerms || !this.domElements.termCategory ||
             !this.domElements.athleteStatsContainer || !this.domElements.athleteStats
             ) {
              console.error("One or more Term detail DOM elements not found, cannot render detail content!");
              return;
         }

        this.domElements.termTitle.textContent = term.name;
        this.domElements.termCategory.textContent = this.formatCategory(term.category);
        this.domElements.termCategory.className = 'inline-block mt-2 text-sm px-3 py-1 rounded-full ' + this.getCategoryClass(term.category);

        // --- Configurar secciones basadas en la categoría ---

        // Restablecer visibilidad de todos los contenedores variables
        this.domElements.athleteStatsContainer.classList.add('hidden');
        this.domElements.musclesWorkedContainer.classList.add('hidden');
        this.domElements.termVariationsContainer.classList.add('hidden');
        // Ocultar video e imagen por defecto y limpiar srcs
         if (this.domElements.termVideo) {
              this.domElements.termVideo.style.display = 'none';
              this.domElements.termVideo.src = ''; // Limpiar src para detener la reproducción
         }
         if (this.domElements.termImage) {
              this.domElements.termImage.style.display = 'none';
              this.domElements.termImage.src = ''; // Limpiar src de la imagen
         }
         // Ocultar el contenedor de video/imagen por defecto
         this.domElements.termVideoContainer.classList.add('hidden');


        if (term.category === 'athletes') {
            // === Vista de Atleta ===
            this.domElements.definitionTitle.innerHTML = '<i class="fas fa-book mr-2 text-blue-600"></i>Biografía';
            this.domElements.termDefinition.textContent = term.definition || "No hay biografía disponible.";

            this.domElements.exampleTitle.innerHTML = '<i class="fas fa-clipboard-list mr-2 text-blue-600"></i>Logros Destacados';
            this.domElements.termExampleContainer.classList.toggle('hidden', !term.example);
            this.domElements.termExample.textContent = term.example || "No hay logros destacados listados.";


            this.domElements.videoTitle.innerHTML = '<i class="fas fa-video mr-2 text-blue-600"></i>Imagen / Highlights';
            if (term.image) {
                 this.domElements.termVideoContainer.classList.remove('hidden');
                 this.domElements.termImage.style.display = 'block'; // Mostrar la imagen
                 this.domElements.termImage.src = term.image; // Cargar la imagen
                 // Asegurarse de que el video esté oculto si se muestra la imagen
                  if (this.domElements.termVideo) this.domElements.termVideo.style.display = 'none';
            } else if (term.video) {
                 this.domElements.termVideoContainer.classList.remove('hidden');
                 this.domElements.termVideo.style.display = 'block'; // Mostrar el video
                 this.domElements.termVideo.src = term.video; // Cargar el video
                  // Asegurarse de que la imagen esté oculto si se muestra el video
                 if (this.domElements.termImage) this.domElements.termImage.style.display = 'none';
            }


            const hasAthleteStats = term.fullName || term.nationality || term.dob || term.height || term.weight || (term.competitions && term.competitions.length > 0) || (term.benchmarks && Object.keys(term.benchmarks).length > 0);
            this.domElements.athleteStatsContainer.classList.toggle('hidden', !hasAthleteStats);
            this.domElements.athleteStats.innerHTML = ''; // Limpiar antes de llenar

            this.addAthleteStat('Nombre Completo', term.fullName);
            this.addAthleteStat('Nacionalidad', term.nationality ? `${this.getFlagEmoji(term.nationality)} ${this.getCountryName(term.nationality)}` : null);
            this.addAthleteStat('Nacimiento / Edad', term.dob ? this.formatDateOfBirthAndAge(term.dob) : null);
            this.addAthleteStat('Estatura', term.height);
            this.addAthleteStat('Peso', term.weight);

            if (term.competitions && term.competitions.length > 0) {
                 const competitionsHTML = `
                      <p class="text-gray-700 text-sm font-semibold">Competiciones:</p>
                      <ul class="list-disc list-inside text-gray-600 text-sm ml-4 space-y-1">
                           ${term.competitions.map(comp => `<li>${comp}</li>`).join('')}
                      </ul>
                 `;
                 this.addAthleteStat(null, competitionsHTML, true);

            } else if (hasAthleteStats) { // Mostrar si no hay competiciones pero sí hay otras estadísticas
                 this.addAthleteStat('Competiciones', 'No hay competiciones destacadas listadas.');
            }

             if (term.benchmarks && Object.keys(term.benchmarks).length > 0) {
                 const benchmarksHTML = `
                      <p class="text-gray-700 text-sm font-semibold">Mejores Marcas (Benchmarks):</p>
                      <ul class="list-disc list-inside text-gray-600 text-sm ml-4 space-y-1">
                           ${Object.entries(term.benchmarks).map(([wod, mark]) => `<li><strong>${wod}:</strong> ${mark}</li>`).join('')}
                      </ul>
                 `;
                 this.addAthleteStat(null, benchmarksHTML, true);

             } else if (hasAthleteStats) {
                 this.addAthleteStat('Mejores Marcas', 'No hay mejores marcas listadas.');
             }


        } else {
            // === Vista de Término General (Ejercicio, WOD, Equipo, etc.) ===

            this.domElements.definitionTitle.innerHTML = '<i class="fas fa-book mr-2 text-blue-600"></i>Definición';
            this.domElements.termDefinition.textContent = term.definition || "No hay definición disponible.";

            this.domElements.exampleTitle.innerHTML = '<i class="fas fa-clipboard-list mr-2 text-blue-600"></i>Ejemplo de Uso';
            this.domElements.termExampleContainer.classList.toggle('hidden', !term.example);
            this.domElements.termExample.textContent = term.example || "No hay ejemplo disponible.";


            this.domElements.videoTitle.innerHTML = '<i class="fas fa-video mr-2 text-blue-600"></i>Video Demostración';
            this.domElements.termVideoContainer.classList.toggle('hidden', !term.video);
            if (term.video) {
               this.domElements.termVideo.style.display = 'block';
               this.domElements.termVideo.src = term.video;
               // Asegurarse de que la imagen esté oculto si se muestra el video
                 if (this.domElements.termImage) this.domElements.termImage.style.display = 'none';
            }


            this.domElements.athleteStatsContainer.classList.add('hidden');
            this.domElements.athleteStats.innerHTML = '';

            this.domElements.musclesWorkedContainer.classList.toggle('hidden', !term.muscles || term.muscles.length === 0);
            this.domElements.musclesWorked.innerHTML = '';
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
                 this.domElements.musclesWorked.innerHTML = '<p class="col-span-full text-gray-500 text-center text-sm">No hay músculos específicos listados.</p>';
             }


            this.domElements.termVariationsContainer.classList.toggle('hidden', !term.variations || term.variations.length === 0);
            this.domElements.termVariations.innerHTML = '';
             if (term.variations && term.variations.length > 0) {
                 term.variations.forEach(variation => {
                     const li = document.createElement('li');
                     li.className = 'flex items-center text-gray-700 text-sm';
                     li.innerHTML = `
                         <i class="fas fa-arrow-right text-blue-500 mr-2"></i>
                         <span>${variation}</span>
                     `;
                     this.domElements.termVariations.appendChild(li);
                 });
             } else {
                 this.domElements.termVariations.innerHTML = '<li class="text-gray-500 text-sm">No hay variaciones disponibles.</li>';
             }
        }

        // La sección de términos relacionados se mantiene para ambas vistas
        this.domElements.relatedTerms.innerHTML = '';
        if (term.related && term.related.length > 0) {
            term.related.forEach(relatedTermName => {
                const relatedTerm = this.termMapByName ? this.termMapByName[relatedTermName] : null;
                const a = document.createElement('a');
                a.href = '#'; // Usamos '#' ya que la navegación es manejada por JS
                a.className = 'bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer';
                a.textContent = relatedTerm ? (relatedTerm.fullName || relatedTerm.name) : relatedTermName;


                 if(relatedTerm) {
                      a.addEventListener('click', (e) => {
                           e.preventDefault();
                           this.showTermDetail(relatedTerm);
                      });
                 } else {
                      a.classList.add('pointer-events-none', 'opacity-70');
                      // console.warn(`Término relacionado "${relatedTermName}" no encontrado en los datos.`); // Comentar para reducir spam de consola si "Core" es el único faltante
                 }
                this.domElements.relatedTerms.appendChild(a);
            });
        } else {
            this.domElements.relatedTerms.innerHTML = '<p class="text-gray-500 text-sm">No hay términos relacionados.</p>';
        }

         // Limpiar el src del iframe/img si el contenedor está oculto
         if (this.domElements.termVideoContainer && this.domElements.termVideoContainer.classList.contains('hidden')) {
              if (this.domElements.termVideo) this.domElements.termVideo.src = '';
              if (this.domElements.termImage) this.domElements.termImage.src = '';
         }
    },

     addAthleteStat: function(label, value, isHTML = false) {
         if (!this.domElements.athleteStats) return;
         if (value === null || value === undefined || value === '' || (isHTML && typeof value === 'string' && value.trim() === '')) {
              return;
         }

         const statDiv = document.createElement('div');
         statDiv.className = 'text-gray-700 text-sm';

         if (isHTML && typeof value === 'string') {
             statDiv.innerHTML = value;
         } else {
             statDiv.innerHTML = `<span class="font-semibold">${label}:</span> ${value}`;
         }

         this.domElements.athleteStats.appendChild(statDiv);
     },

     formatDateOfBirthAndAge: function(dobString) {
          if (!dobString) return null;
          try {
               const [year, month, day] = dobString.split('-').map(Number);
               const dob = new Date(year, month - 1, day);
               const today = new Date();
               let age = today.getFullYear() - dob.getFullYear();
               const monthDiff = today.getMonth() - dob.getMonth();
               if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                   age--;
               }
               const options = { year: 'numeric', month: 'long', day: 'numeric' };
               const formattedDate = dob.toLocaleDateString('es-ES', options);

               return `${formattedDate} (${age} años)`;
          } catch (error) {
               console.error("Error formatting date of birth:", dobString, error);
               return dobString;
          }
     },

     getFlagEmoji: function(countryCode) {
         if (!countryCode || countryCode.length !== 2) return '';
          const codePoints = countryCode
              .toUpperCase()
              .split('')
              .map(char => 127345 + char.charCodeAt(0));

          try {
               return String.fromCodePoint(...codePoints);
          } catch (error) {
               console.error("Error getting flag emoji for code:", countryCode, error);
               return '';
          }
     },

      getCountryName: function(countryCode) {
           const countryNames = {
               'US': 'Estados Unidos',
               'IS': 'Islandia',
               'AU': 'Australia',
               'GB': 'Reino Unido',
               'CA': 'Canadá',
               'FR': 'Francia',
               'ES': 'España',
               'SE': 'Suecia',
               'NO': 'Noruega',
               'ZA': 'Sudáfrica',
               'BR': 'Brasil',
               'PL': 'Polonia',
               'RS': 'Serbia',
               'DE': 'Alemania',
               'IT': 'Italia',
               'RU': 'Rusia'
           };
           return countryNames[countryCode] || countryCode;
      },


    renderPaginationControls: function(totalItems) {
        const paginationNav = this.domElements.paginationNav;
        if (!paginationNav) {
             console.error("Pagination navigation element not found!");
             return;
        }

        const totalPages = Math.ceil(totalItems / this.state.termsPerPage);
        const currentPage = this.state.currentPage;

        paginationNav.innerHTML = '';

        if (totalPages <= 1) {
            paginationNav.classList.add('hidden');
            return;
        }

        paginationNav.classList.remove('hidden');

        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.className = `px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`;
        prevButton.setAttribute('aria-label', 'Página anterior');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        if (currentPage > 1) {
             prevButton.addEventListener('click', (e) => {
                 e.preventDefault();
                 this.updateStateForPagination(currentPage - 1);
             });
        }
        paginationNav.appendChild(prevButton);

        const maxPageButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }
        endPage = Math.min(totalPages, endPage);


        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('a');
            pageButton.href = '#';
            pageButton.className = `px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ${i === currentPage ? 'active text-blue-600 font-medium border-blue-300 z-10' : ''}`;
             if (i > startPage) pageButton.classList.add('border-l');

            pageButton.textContent = i;
             pageButton.setAttribute('aria-label', `Página ${i}`);

            if (i !== currentPage) {
                 pageButton.addEventListener('click', (e) => {
                     e.preventDefault();
                     this.updateStateForPagination(i);
                 });
            } else {
                 pageButton.classList.add('pointer-events-none');
                 pageButton.setAttribute('aria-current', 'page');
            }
            paginationNav.appendChild(pageButton);
        }

        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.className = `px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`;
        nextButton.setAttribute('aria-label', 'Página siguiente');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        if (currentPage < totalPages) {
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateStateForPagination(currentPage + 1);
            });
        }
        paginationNav.appendChild(nextButton);
    },


    createTermCard: function(term) {
        const card = document.createElement('div');
        card.className = 'exercise-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer';

         const cardTitle = term.fullName || term.name;

        card.innerHTML = `
            <div class="h-40 ${this.getCategoryBgClass(term.category)} flex items-center justify-center">
                <i class="${this.getCategoryIcon(term.category)} text-5xl ${this.getCategoryIconColor(term.category)}"></i>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start">
                    <h4 class="text-lg font-bold text-gray-800">${cardTitle}</h4>
                    <span class="text-xs px-2 py-1 rounded-full ${this.getCategoryClass(term.category)}">${this.formatCategory(term.category)}</span>
                </div>
                <p class="text-gray-600 mt-2 text-sm">${term.definition.substring(0, 80)}${term.definition.length > 80 ? '...' : ''}</p>
            </div>
        `;

         card.dataset.termId = term.id;

        return card;
    },

    createSearchResultItem: function(term, query) {
        const li = document.createElement('li');
        li.className = 'p-4 hover:bg-gray-50 cursor-pointer';

         const resultTitle = term.fullName || term.name;

        li.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-medium text-gray-800">${this.highlightText(resultTitle, query)}</h4>
                    <p class="text-sm text-gray-600 mt-1">${this.highlightText(term.definition.substring(0, 150) + (term.definition.length > 150 ? '...' : ''), query)}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded-full ${this.getCategoryClass(term.category)}">${this.formatCategory(term.category)}</span>
            </div>
        `;
         li.dataset.termId = term.id;
        return li;
    },


    highlightText: function(text, query) {
        if (!query) return text;
        const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${safeQuery})`, 'gi');
        const safeText = text.replace(/</g, '<').replace(/>/g, '>');
        return safeText.replace(regex, '<span class="search-highlight">$1</span>');
    },

    formatCategory: function(category) {
        if (!category) return '';
        const translations = {
             'all': 'Todos los Términos',
             'exercises': 'Ejercicios',
             'wods': 'WODs',
             'equipment': 'Equipamiento',
             'acronyms': 'Acrónimos',
             'gymnastics': 'Gimnásticos',
             'concepts': 'Conceptos',
             'athletes': 'Atletas'
        };
        return translations[category] || category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },

    getCategoryClass: function(category) {
        const classes = {
            'exercises': 'bg-green-100 text-green-800',
            'wods': 'bg-blue-100 text-blue-800',
            'equipment': 'bg-yellow-100 text-yellow-800',
            'acronyms': 'bg-purple-100 text-purple-800',
            'gymnastics': 'bg-red-100 text-red-800',
            'concepts': 'bg-indigo-100 text-indigo-800',
            'athletes': 'bg-orange-100 text-orange-800'
        };
        return classes[category] || 'bg-gray-100 text-gray-800';
    },

    getCategoryBgClass: function(category) {
        const classes = {
            'exercises': 'bg-green-100',
            'wods': 'bg-blue-100',
            'equipment': 'bg-yellow-100',
            'acronyms': 'bg-purple-100',
            'gymnastics': 'bg-red-100',
            'concepts': 'bg-indigo-100',
            'athletes': 'bg-orange-100'
        };
        return classes[category] || 'bg-gray-100';
    },

    getCategoryIcon: function(category) {
        const icons = {
            'exercises': 'fas fa-running',
            'wods': 'fas fa-fire-alt',
            'equipment': 'fas fa-dumbbell',
            'acronyms': 'fas fa-trophy',
            'gymnastics': 'fas fa-grip-lines',
            'concepts': 'fas fa-lightbulb',
            'athletes': 'fas fa-user-alt'
        };
        return icons[category] || 'fas fa-question-circle';
    },

    getCategoryIconColor: function(category) {
         const colors = {
            'exercises': 'text-green-600',
            'wods': 'text-blue-600',
            'equipment': 'text-yellow-600',
            'acronyms': 'text-purple-600',
            'gymnastics': 'text-red-600',
            'concepts': 'text-indigo-600',
            'athletes': 'text-orange-600'
        };
        return colors[category] || 'text-gray-600';
    }
}; // Fin del objeto App

// --- Inicio de la aplicación ---
document.addEventListener('DOMContentLoaded', () => {
    // Asigna el objeto App al ámbito global (window) para que App.showBrowseView sea accesible globalmente
    window.App = App; // <-- Asegura que App esté disponible globalmente ANTES de init
    App.init();
});