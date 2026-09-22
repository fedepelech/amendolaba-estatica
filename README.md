# Amendola Pastelería — Hub de Prototipos Interactivos

Sitio estático navegable autocontenido generado a partir de exportaciones visuales de **Google Stitch**. Este hub permite presentar a clientes y partes interesadas las propuestas de diseño de **Amendola Pastelería** (sistema visual *Artisanal Warmth*), explorando tanto la versión de escritorio como la versión móvil de cada pantalla y simulando los flujos principales de navegación.

> **Aclaración importante:** Este proyecto es una **demostración visual e interactiva**. No cuenta con backend, base de datos, pasarela de pago real, autenticación ni recopilación de datos personales. Todas las acciones comerciales son ilustrativas.

---

## 📁 Estructura del Proyecto

La estructura de archivos generada en el repositorio es la siguiente:

```text
amendolaba-estatica/
├── index.html                   # Hub principal con catálogo de pantallas y accesos rápidos
├── netlify.toml                 # Configuración de despliegue y cabeceras de seguridad para Netlify
├── .gitignore                   # Archivos y carpetas del sistema ignorados
├── README.md                    # Documentación del proyecto e instrucciones de uso
├── VALIDACION.md                # Reporte técnico de validación de rutas y flujos
├── styles/
│   └── hub.css                  # Estilos del hub, barra flotante y modal de demostración
├── scripts/
│   ├── hub.js                   # Comportamiento interactivo del hub (filtros de vista)
│   └── prototype-nav.js         # Inyección de barra flotante, modal demo y enlaces CTA
├── screens/
│   ├── menu/
│   │   ├── desktop.html         # Pantalla Menú y Tienda Online (Desktop)
│   │   ├── mobile.html          # Pantalla Menú y Tienda Online (Mobile)
│   │   ├── screen.png           # Captura de referencia Desktop
│   │   └── screen-mobile.png    # Captura de referencia Mobile
│   ├── producto/
│   │   ├── desktop.html         # Detalle de Producto: Super Cookie New York (Desktop)
│   │   ├── mobile.html          # Detalle de Producto: Super Cookie New York (Mobile)
│   │   ├── screen.png           # Captura de referencia Desktop
│   │   └── screen-mobile.png    # Captura de referencia Mobile
│   ├── checkout/
│   │   ├── desktop.html         # Checkout & Entrega: Resumen y Pago (Desktop)
│   │   ├── mobile.html          # Checkout & Entrega: Resumen y Pago (Mobile)
│   │   ├── screen.png           # Captura de referencia Desktop
│   │   └── screen-mobile.png    # Captura de referencia Mobile
│   └── admin/
│       ├── desktop.html         # Panel de Administración / Dashboard (Desktop)
│       ├── mobile.html          # Panel de Administración (Mobile)
│       ├── screen.png           # Captura de referencia Desktop
│       └── screen-mobile.png    # Captura de referencia Mobile
├── design-system/
│   └── DESIGN.md                # Especificación técnica del sistema visual (colores, tipografías)
└── source-stitch/               # Respaldo intacto de las exportaciones originales de Stitch
```

---

## 💻 Prueba Local

Para probar el hub de forma local sin requerir dependencias ni gestores de paquetes (Node.js/npm), podés utilizar el servidor HTTP nativo de Python:

```bash
python3 -m http.server 8080
```

Luego, abrí tu navegador e ingresá a:
[http://localhost:8080](http://localhost:8080)

---

## 🚀 Despliegue en Netlify

El proyecto está preparado para desplegarse de manera directa y sin necesidad de paso de compilación (`build command` vacío):

### Opción 1: Netlify Drop (Manual sin Git)
1. Ingresá a [Netlify Drop](https://app.netlify.com/drop).
2. Arrastrá la carpeta completa `amendolaba-estatica` dentro del área indicada.
3. Netlify publicará la demo estática de inmediato y te entregará una URL pública `https://<nombre-sitio>.netlify.app`.

### Opción 2: Conectando el Repositorio Git
1. Creá un nuevo sitio desde Git en tu panel de Netlify.
2. Seleccioná el repositorio `fedepelech/amendolaba-estatica`.
3. Configuraciones de build:
   - **Base directory:** *(dejar vacío)*
   - **Build command:** *(dejar vacío)*
   - **Publish directory:** `.`
4. Hacé clic en **Deploy Site**. Cualquier actualización en la rama principal generará un despliegue automático.

---

## 🧭 Características del Prototipo
- **Hub Central:** Acceso directo a cada pantalla en variante Desktop y Mobile con previsualización fotográfica.
- **Barra Flotante:** Inyectada en la parte inferior de todas las pantallas (`prototype-nav.js`), permitiendo volver al hub, alternar entre desktop y mobile al instante, o saltar entre secciones sin recargar el diseño base.
- **Flujos Conectados:**
  - Menú &rarr; Clic en producto &rarr; Detalle de Producto.
  - Menú / Detalle &rarr; Carrito o Continuar pedido &rarr; Checkout.
  - Checkout &rarr; Confirmar Pedido &rarr; Modal informativo de pago simulado.
  - Navegación hacia Backoffice / Admin desde el encabezado o la barra flotante.
