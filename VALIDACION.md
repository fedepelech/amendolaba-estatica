# Reporte de Validación Técnica — Stitch Prototype Hub (Amendola)

Fecha de validación: 22 de Septiembre de 2026.
Estado general: **Aprobado sin errores.**

---

## 1. Clasificación Final de Pantallas

Se identificó una propuesta unificada correspondiente a **Amendola Pastelería** estructurada bajo el sistema de diseño *Artisanal Warmth*. Todas las pantallas cuentan con paridad exacta entre Desktop y Mobile:

| Pantalla original | Ubicación final | Dispositivo | Sección | Rol en el flujo |
|---|---|---|---|---|
| `men_de_pedidos_desktop_amendola_pasteler_a/code.html` | `screens/menu/desktop.html` | Desktop | Menú | Catálogo principal, landing y carrito lateral |
| `men_de_pedidos_amendola_pasteler_a/code.html` | `screens/menu/mobile.html` | Mobile | Menú | Catálogo móvil con banner flotante de pedido |
| `detalle_de_producto_desktop_amendola/code.html` | `screens/producto/desktop.html` | Desktop | Producto | Personalización de formato y toppings para cookie |
| `detalle_de_producto_amendola/code.html` | `screens/producto/mobile.html` | Mobile | Producto | Ficha de producto táctil con notas para cocina |
| `checkout_y_promociones_desktop_amendola/code.html` | `screens/checkout/desktop.html` | Desktop | Checkout | Resumen de compra, cupón de descuento y selector de entrega |
| `checkout_y_promociones_amendola/code.html` | `screens/checkout/mobile.html` | Mobile | Checkout | Flujo de entrega, selección de medio de pago y confirmación |
| `panel_de_administraci_n_desktop_amendola/code.html` | `screens/admin/desktop.html` | Desktop | Admin | Dashboard operativo con comandas y estado de tienda |
| `panel_de_administraci_n_amendola/code.html` | `screens/admin/mobile.html` | Mobile | Admin | Panel móvil de gestión y pedidos del taller |

---

## 2. Rutas y Enlaces Verificados

- **Hub raíz (`/index.html`):**
  - Enlace al Sistema de Diseño (`./design-system/DESIGN.md`): **Verificado**.
  - Enlace a Menú Desktop (`./screens/menu/desktop.html`): **Verificado**.
  - Enlace a Menú Mobile (`./screens/menu/mobile.html`): **Verificado**.
  - Enlace a Producto Desktop (`./screens/producto/desktop.html`): **Verificado**.
  - Enlace a Producto Mobile (`./screens/producto/mobile.html`): **Verificado**.
  - Enlace a Checkout Desktop (`./screens/checkout/desktop.html`): **Verificado**.
  - Enlace a Checkout Mobile (`./screens/checkout/mobile.html`): **Verificado**.
  - Enlace a Admin Desktop (`./screens/admin/desktop.html`): **Verificado**.
  - Enlace a Admin Mobile (`./screens/admin/mobile.html`): **Verificado**.
  - Previews fotográficas (`./screens/*/*.png`): **Verificadas (8/8 existentes)**.
- **Rutas Relativas en Pantallas:**
  - Inyección de CSS (`../../styles/hub.css`): **Verificado en las 8 pantallas**.
  - Inyección de Script (`../../scripts/prototype-nav.js`): **Verificado en las 8 pantallas**.
  - Sin uso de rutas absolutas (`/styles/...` o `/scripts/...`): **Comprobado (0 ocurrencias)**.

---

## 3. Disparadores y CTA Conectados (Alta Confianza)

1. **Menú &rarr; Detalle de Producto:**
   - Clic en tarjetas de productos de catálogo redirige a `../producto/[dispositivo].html`.
2. **Menú &rarr; Checkout:**
   - Botón *"Continuar compra / Checkout"*, botón del Carrito en cabecera y banner móvil *"Ver pedido"* redirigen a `../checkout/[dispositivo].html`.
3. **Detalle de Producto &rarr; Menú:**
   - Enlace *"Volver al Menú"* y botón con icono `arrow_back` redirigen a `../menu/[dispositivo].html`.
4. **Detalle de Producto &rarr; Checkout:**
   - Botón *"Carrito"* en cabecera redirige a `../checkout/[dispositivo].html`.
5. **Checkout &rarr; Menú:**
   - Enlace *"Volver al Menú"* redirige a `../menu/[dispositivo].html`.
6. **Checkout &rarr; Modal de Pago Simulado:**
   - Botón *"Confirmar Pedido por WhatsApp / Web"* despliega el modal interactivo con aclaración de demo visual.
7. **Navegación Admin:**
   - Enlaces de *"Admin"* en las cabeceras y barra flotante redirigen a `../admin/[dispositivo].html`.
   - Enlaces *"Menú"* dentro de Admin redirigen de regreso a `../menu/[dispositivo].html`.

---

## 4. Funcionalidades Simuladas

- **Modal de Pago:**
  - Informa claramente que en la versión final la transacción se derivará a Mercado Pago.
  - No captura datos de tarjeta ni procesa cargos reales.
  - Ofrece botón de cierre y confirmación ilustrativa.
- **Persistencia de Barra Flotante:**
  - El estado de cierre de la barra se almacena en `sessionStorage` para no molestar la navegación del cliente durante la sesión.
  - Se provee un botón discreto (`🧭 Prototipo`) para restaurarla en caso de requerirse.

---

## 5. Respaldo de Material Original

Se preservó una copia exacta e intacta de todas las carpetas originales en la carpeta:
`amendolaba-estatica/source-stitch/`

---

## 6. Limitaciones y Tareas Pendientes (`TODO`)

- Los campos de texto y formularios (notas para la cocina, cupones de descuento, direcciones) conservan los valores por defecto del diseño estático de Stitch.
- La persistencia del carrito entre pantallas utiliza los datos de ejemplo del prototipo; no se implementó un almacenamiento dinámico de ítems en `localStorage` para no desvirtuar el maquetado original.
