/**
 * ============================================================================
 * LÓGICA DEL HUB PRINCIPAL DE PROTOTIPOS (AMENDOLA PASTELERÍA)
 * Todos los comentarios en castellano según las directrices del proyecto.
 * ============================================================================
 */

(function () {
  'use strict';

  // Configuración de constantes para evitar hardcodeo
  const CONFIG_HUB = {
    claseBotonActivo: 'active',
    selectorBotonesFiltro: '.hub-filter-btn',
    selectorTarjetas: '.hub-card',
    atributoFiltro: 'data-device'
  };

  /**
   * Inicializa los filtros interactivos del catálogo de pantallas
   */
  function inicializarFiltros() {
    const botones = document.querySelectorAll(CONFIG_HUB.selectorBotonesFiltro);
    const tarjetas = document.querySelectorAll(CONFIG_HUB.selectorTarjetas);

    if (!botones.length) return;

    botones.forEach((boton) => {
      boton.addEventListener('click', () => {
        // Remover estado activo de los demás botones
        botones.forEach((b) => b.classList.remove(CONFIG_HUB.claseBotonActivo));
        boton.classList.add(CONFIG_HUB.claseBotonActivo);

        const filtroSeleccionado = boton.getAttribute('data-filter') || 'todos';

        // Filtrar u ordenar tarjetas según la variante elegida
        tarjetas.forEach((tarjeta) => {
          if (filtroSeleccionado === 'todos') {
            tarjeta.style.display = 'flex';
          } else {
            // Cada sección tiene ambas variantes, resaltamos el botón correspondiente
            tarjeta.style.display = 'flex';
            const btnDesktop = tarjeta.querySelector('.hub-btn-desktop');
            const btnMobile = tarjeta.querySelector('.hub-btn-mobile');
            
            if (filtroSeleccionado === 'desktop') {
              if (btnDesktop) btnDesktop.classList.add('hub-btn-primary');
              if (btnMobile) btnMobile.classList.remove('hub-btn-primary');
            } else if (filtroSeleccionado === 'mobile') {
              if (btnMobile) btnMobile.classList.add('hub-btn-primary');
              if (btnDesktop) btnDesktop.classList.remove('hub-btn-primary');
            }
          }
        });
      });
    });
  }

  // Inicialización al cargar el documento
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFiltros);
  } else {
    inicializarFiltros();
  }
})();
