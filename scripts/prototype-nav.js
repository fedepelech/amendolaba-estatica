/**
 * ============================================================================
 * NAVEGACIÓN FLOTANTE & CONEXIÓN DE FLUJOS INTERACTIVOS (STITCH PROTOTYPE HUB)
 * Todos los comentarios en castellano según las directrices del proyecto.
 * ============================================================================
 */

(function () {
  'use strict';

  // Configuración centralizada para evitar cadenas mágicas y hardcodeo
  const CONFIGURACION = {
    claveSesionOculto: 'prototype_hub_nav_oculto_amendola',
    rutaHubRelativa: '../../index.html',
    dispositivos: {
      desktop: 'desktop',
      mobile: 'mobile'
    },
    secciones: [
      { id: 'menu', etiqueta: 'Menú', icono: 'restaurant_menu' },
      { id: 'producto', etiqueta: 'Producto', icono: 'bakery_dining' },
      { id: 'checkout', etiqueta: 'Checkout', icono: 'shopping_cart' },
      { id: 'admin', etiqueta: 'Admin', icono: 'admin_panel_settings' }
    ],
    textosModal: {
      etiquetaBadge: 'Demo visual',
      titulo: 'Confirmación de Pedido',
      mensaje: 'En la versión final, este paso redireccionará a Mercado Pago para abonar y confirmar el pedido.',
      botonConfirmar: 'Ver confirmación',
      botonCerrar: 'Cerrar',
      alertaConfirmacion: '¡Excelente! En una versión productiva, el pedido se registraría y enviaría notificación por WhatsApp con el comprobante.'
    }
  };

  /**
   * Detecta la sección actual y el tipo de dispositivo a partir de la URL
   */
  function detectarContextoActual() {
    const ruta = window.location.pathname.toLowerCase();
    
    // Detectar dispositivo
    let dispositivo = CONFIGURACION.dispositivos.desktop;
    if (ruta.includes('mobile.html') || ruta.endsWith('mobile') || document.body.classList.contains('mobile-view')) {
      dispositivo = CONFIGURACION.dispositivos.mobile;
    }

    // Detectar sección
    let seccionActual = 'menu';
    for (const sec of CONFIGURACION.secciones) {
      if (ruta.includes('/' + sec.id + '/') || ruta.includes(sec.id)) {
        seccionActual = sec.id;
        break;
      }
    }

    return { seccionActual, dispositivo };
  }

  /**
   * Genera e inyecta la barra flotante de navegación
   */
  function inyectarBarraNavegacion() {
    const { seccionActual, dispositivo } = detectarContextoActual();
    const esDesktop = dispositivo === CONFIGURACION.dispositivos.desktop;
    const archivoOpuesto = esDesktop ? 'mobile.html' : 'desktop.html';
    const textoSwitch = esDesktop ? '📱 Ver Mobile' : '🖥️ Ver Desktop';
    const estaOculto = sessionStorage.getItem(CONFIGURACION.claveSesionOculto) === 'true';

    // Contenedor principal de la barra flotante
    const navBarra = document.createElement('aside');
    navBarra.className = 'prototype-hub-nav';
    navBarra.id = 'prototypeHubNav';
    navBarra.setAttribute('aria-label', 'Navegación del prototipo interactivo');
    if (estaOculto) {
      navBarra.style.display = 'none';
    }

    // Enlace para volver al hub raíz
    let htmlItems = `
      <div class="prototype-hub-nav-items">
        <a class="prototype-hub-nav-link hub-home" href="${CONFIGURACION.rutaHubRelativa}" title="Volver al Hub de pantallas">
          ← Hub
        </a>
        <div class="prototype-hub-nav-divider"></div>
    `;

    // Enlaces de cada sección respetando el dispositivo actual
    CONFIGURACION.secciones.forEach((sec) => {
      const esActiva = sec.id === seccionActual;
      const claseActiva = esActiva ? ' active' : '';
      const hrefSeccion = `../${sec.id}/${dispositivo}.html`;
      htmlItems += `
        <a class="prototype-hub-nav-link${claseActiva}" href="${hrefSeccion}" title="Ir a pantalla ${sec.etiqueta}">
          ${sec.etiqueta}
        </a>
      `;
    });

    // Separador, conmutador de dispositivo y botón de cerrar
    htmlItems += `
        <div class="prototype-hub-nav-divider"></div>
        <a class="prototype-hub-nav-switch" href="./${archivoOpuesto}" title="Cambiar a vista ${esDesktop ? 'Mobile' : 'Desktop'}">
          ${textoSwitch}
        </a>
        <button class="prototype-hub-nav-close" id="prototypeHubCloseBtn" type="button" title="Ocultar barra flotante" aria-label="Ocultar barra">
          ✕
        </button>
      </div>
    `;

    navBarra.innerHTML = htmlItems;
    document.body.appendChild(navBarra);

    // Botón discreto para reabrir la barra si fue ocultada
    const botonRestaurar = document.createElement('button');
    botonRestaurar.className = 'prototype-hub-restore-btn';
    botonRestaurar.id = 'prototypeHubRestoreBtn';
    botonRestaurar.type = 'button';
    botonRestaurar.innerText = '🧭 Prototipo';
    botonRestaurar.title = 'Mostrar navegación de prototipo';
    if (estaOculto) {
      botonRestaurar.style.display = 'block';
    }
    document.body.appendChild(botonRestaurar);

    // Listeners para ocultar y restaurar
    const closeBtn = document.getElementById('prototypeHubCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        navBarra.style.display = 'none';
        botonRestaurar.style.display = 'block';
        sessionStorage.setItem(CONFIGURACION.claveSesionOculto, 'true');
      });
    }

    botonRestaurar.addEventListener('click', () => {
      navBarra.style.display = 'flex';
      botonRestaurar.style.display = 'none';
      sessionStorage.removeItem(CONFIGURACION.claveSesionOculto);
    });
  }

  /**
   * Despliega el modal de demostración de pago y confirmación simulada
   */
  function mostrarModalDemoPago() {
    // Si ya existe un modal en el DOM, evitar duplicados
    if (document.getElementById('prototypeHubModalOverlay')) {
      return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'prototype-hub-modal-overlay';
    overlay.id = 'prototypeHubModalOverlay';

    overlay.innerHTML = `
      <div class="prototype-hub-modal-card" role="dialog" aria-modal="true">
        <span class="prototype-hub-modal-badge">${CONFIGURACION.textosModal.etiquetaBadge}</span>
        <h3 class="prototype-hub-modal-title">${CONFIGURACION.textosModal.titulo}</h3>
        <p class="prototype-hub-modal-body">
          ${CONFIGURACION.textosModal.mensaje}
        </p>
        <div class="prototype-hub-modal-actions">
          <button class="prototype-hub-modal-btn prototype-hub-modal-btn-confirm" id="btnModalConfirmarDemo" type="button">
            ${CONFIGURACION.textosModal.botonConfirmar}
          </button>
          <button class="prototype-hub-modal-btn prototype-hub-modal-btn-close" id="btnModalCerrarDemo" type="button">
            ${CONFIGURACION.textosModal.botonCerrar}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const btnCerrar = document.getElementById('btnModalCerrarDemo');
    const btnConfirmar = document.getElementById('btnModalConfirmarDemo');

    function cerrarModal() {
      overlay.remove();
    }

    if (btnCerrar) {
      btnCerrar.addEventListener('click', cerrarModal);
    }

    if (btnConfirmar) {
      btnConfirmar.addEventListener('click', () => {
        alert(CONFIGURACION.textosModal.alertaConfirmacion);
        cerrarModal();
      });
    }

    // Cerrar al hacer clic en el backdrop
    overlay.addEventListener('click', (evento) => {
      if (evento.target === overlay) {
        cerrarModal();
      }
    });
  }

  /**
   * Conecta los botones y disparadores de alta confianza según la sección actual
   */
  function conectarCTAAltaConfianza() {
    const { seccionActual, dispositivo } = detectarContextoActual();

    // 1. Enlaces a Admin desde la barra superior o navegación interna
    document.querySelectorAll('a, button').forEach((el) => {
      const texto = (el.innerText || '').trim().toLowerCase();
      const href = (el.getAttribute('href') || '').toLowerCase();

      // Navegar a Admin
      if (texto === 'admin' || href === '#admin') {
        el.setAttribute('href', `../admin/${dispositivo}.html`);
        el.addEventListener('click', (ev) => {
          ev.preventDefault();
          window.location.href = `../admin/${dispositivo}.html`;
        });
      }

      // Navegar a Menú
      if ((texto === 'menú' || texto === 'menu' || href === '#menu') && seccionActual !== 'menu') {
        el.setAttribute('href', `../menu/${dispositivo}.html`);
        el.addEventListener('click', (ev) => {
          ev.preventDefault();
          window.location.href = `../menu/${dispositivo}.html`;
        });
      }
    });

    // 2. Interacciones específicas por pantalla
    if (seccionActual === 'menu') {
      // Clic en cards de productos -> navegar a Detalle de Producto
      const tarjetasProductos = document.querySelectorAll('article, .product-card');
      tarjetasProductos.forEach((tarjeta) => {
        tarjeta.style.cursor = 'pointer';
        tarjeta.addEventListener('click', (ev) => {
          // Evitar que el clic en botones internos de cantidad detenga el flujo deseado
          const target = ev.target;
          if (target.tagName === 'INPUT' || target.getAttribute('role') === 'button') {
            return;
          }
          window.location.href = `../producto/${dispositivo}.html`;
        });
      });

      // Botón "Continuar compra / Checkout" o disparador de Carrito -> navegar a Checkout
      document.querySelectorAll('button, a').forEach((el) => {
        const texto = (el.innerText || '').toLowerCase();
        const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();

        if (
          texto.includes('continuar compra') ||
          texto.includes('checkout') ||
          texto.includes('ver pedido') ||
          ariaLabel.includes('carrito') ||
          texto.includes('ítems')
        ) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', (ev) => {
            ev.preventDefault();
            window.location.href = `../checkout/${dispositivo}.html`;
          });
        }
      });
    } else if (seccionActual === 'producto') {
      // Botón "Volver al Menú" / flecha atrás
      document.querySelectorAll('a, button').forEach((el) => {
        const texto = (el.innerText || '').toLowerCase();
        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
        if (texto.includes('volver al menú') || aria.includes('volver al menú')) {
          el.setAttribute('href', `../menu/${dispositivo}.html`);
          el.addEventListener('click', (ev) => {
            ev.preventDefault();
            window.location.href = `../menu/${dispositivo}.html`;
          });
        }
      });

      // Botón Carrito en Detalle -> ir a Checkout
      document.querySelectorAll('button, a').forEach((el) => {
        const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
        const texto = (el.innerText || '').toLowerCase();
        if (ariaLabel.includes('carrito') || (texto.includes('carrito') && !texto.includes('agregar'))) {
          el.addEventListener('click', (ev) => {
            ev.preventDefault();
            window.location.href = `../checkout/${dispositivo}.html`;
          });
        }
      });
    } else if (seccionActual === 'checkout') {
      // Botón "Volver al Menú"
      document.querySelectorAll('a, button').forEach((el) => {
        const texto = (el.innerText || '').toLowerCase();
        const aria = (el.getAttribute('aria-label') || '').toLowerCase();
        if (texto.includes('volver al menú') || aria.includes('volver')) {
          el.setAttribute('href', `../menu/${dispositivo}.html`);
          el.addEventListener('click', (ev) => {
            ev.preventDefault();
            window.location.href = `../menu/${dispositivo}.html`;
          });
        }
      });

      // Botón principal "Confirmar Pedido por WhatsApp / Web" -> abre modal de pago demo
      document.querySelectorAll('button').forEach((btn) => {
        const texto = (btn.innerText || '').toLowerCase();
        if (texto.includes('confirmar pedido')) {
          btn.addEventListener('click', (ev) => {
            ev.preventDefault();
            mostrarModalDemoPago();
          });
        }
      });
    } else if (seccionActual === 'admin') {
      // Enlaces para regresar a Menú desde Admin
      document.querySelectorAll('a, button').forEach((el) => {
        const texto = (el.innerText || '').toLowerCase();
        if (texto === 'menú' || texto === 'menu') {
          el.setAttribute('href', `../menu/${dispositivo}.html`);
          el.addEventListener('click', (ev) => {
            ev.preventDefault();
            window.location.href = `../menu/${dispositivo}.html`;
          });
        }
      });
    }
  }

  // Inicialización cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      inyectarBarraNavegacion();
      conectarCTAAltaConfianza();
    });
  } else {
    inyectarBarraNavegacion();
    conectarCTAAltaConfianza();
  }
})();
