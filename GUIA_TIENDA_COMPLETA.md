# 🛒 GUÍA DE TIENDA - CÓMO VENDER PRODUCTOS

Tu sitio web ahora tiene una **tienda completamente funcional** con 6 productos de ejemplo. Esta guía te muestra cómo personalizarla, agregar más productos y monetizar tu negocio.

---

## 📋 RESUMEN: PRODUCTOS INCLUIDOS

| # | Producto | Precio | Tipo |
|---|----------|--------|------|
| 1 | Paquete Básico Web | $499.99 | Servicio |
| 2 | Paquete Profesional | $1,299.99 | Servicio |
| 3 | Paquete Premium Enterprise | $4,999.99 | Servicio |
| 4 | Curso: Web Avanzado | $199.99 | Digital |
| 5 | Sesión de Consultoría | $99.99 | Servicio |
| 6 | Plan de Soporte Anual | $599.99 | Servicio |

---

## 🚀 CÓMO FUNCIONA LA TIENDA

### Sistema de Carrito
Cuando alguien hace click en **"🛒 Agregar al Carrito"**:

```javascript
// El botón ejecuta esto:
quickAddToCart('Nombre Producto', precio);

// Ejemplo
quickAddToCart('Paquete Básico Web', 499.99);

// Internamente:
// 1. Se agrega al carrito en localStorage
// 2. Se muestra notificación de éxito
// 3. El botón flotante 🛒 muestra cantidad
```

### Ver el Carrito
```javascript
// En la consola
console.table(Cart.getCart());

// Retorna:
// [
//   { id: '1', name: 'Producto 1', price: 99.99, qty: 2, total: 199.98 },
//   ...
// ]
```

### Total del Carrito
```javascript
Cart.getTotal(); // "2,299.98"
```

### Checkout (Crear Orden)
```javascript
Cart.checkout(); 
// Crea una orden
// Vacía el carrito
// Guarda en historial
```

---

## ✏️ CÓMO PERSONALIZAR PRODUCTOS

### OPCIÓN 1: Cambiar un Producto Existente

Abre `index.html` y busca la sección de productos. Ejemplo:

```html
<!-- PRODUCTO 1: PAQUETE BÁSICO -->
<div class="producto-card">
  <h3>Paquete Básico Web</h3>
  <p class="producto-descripcion">
    Sitio web profesional con 5 páginas...
  </p>
  <span class="precio">$499.99</span>
  <button onclick="quickAddToCart('Paquete Básico Web', 499.99)">
    🛒 Agregar al Carrito
  </button>
</div>
```

**Para cambiar nombre:**
```html
<h3>Mi Producto Nuevo</h3>
```

**Para cambiar descripción:**
```html
<p class="producto-descripcion">
  Mi nueva descripción aquí
</p>
```

**Para cambiar precio:**
```html
<span class="precio">$1,299.99</span>
```

**Para cambiar el botón (IMPORTANTE):**
```html
<!-- ANTES: -->
<button onclick="quickAddToCart('Paquete Básico Web', 499.99)">

<!-- DESPUÉS: con tus datos -->
<button onclick="quickAddToCart('Tu Nuevo Nombre', 1299.99)">
```

### OPCIÓN 2: Agregar un Producto Nuevo

Copia este bloque en la sección `productos-grid`:

```html
<div class="producto-card" data-aos="zoom-in">
  <div class="producto-imagen">
    <i class="fas fa-star fa-4x" style="color: #FFI166D;"></i>
  </div>
  <div class="producto-info">
    <h3>Mi Nuevo Producto</h3>
    <p class="producto-descripcion">
      Descripción del producto aquí
    </p>
    <div class="producto-caracteristicas">
      <ul>
        <li>Característica 1</li>
        <li>Característica 2</li>
        <li>Característica 3</li>
      </ul>
    </div>
    <div class="producto-precio">
      <span class="precio">$99.99</span>
      <span class="original-precio">$199.99</span>
      <span class="descuento">-50%</span>
    </div>
    <button class="btn-primary" onclick="quickAddToCart('Mi Nuevo Producto', 99.99)">
      🛒 Agregar al Carrito
    </button>
    <button class="btn-secondary">📋 Ver Detalles</button>
  </div>
</div>
```

**Personaliza:**
- Reemplaza `Mi Nuevo Producto` con tu nombre
- Cambia `$99.99` a tu precio
- Actualiza icon: `<i class="fas fa-[icon]"></i>`
- Agrega características con `<li>`

### OPCIÓN 3: Cambiar Iconos

Los iconos provienen de **Font Awesome**. Opciones populares:

| Icono | Código |
|-------|--------|
| 💻 Laptop | `fa-laptop` |
| 🛍️ Bolsa | `fa-shopping-bag` |
| 📱 Teléfono | `fa-mobile-alt` |
| ⚙️ Settings | `fa-cog` |
| 🎓 Educación | `fa-graduation-cap` |
| 💰 Dinero | `fa-dollar-sign` |
| 🎨 Diseño | `fa-palette` |
| 🚀 Lanzamiento | `fa-rocket` |
| ⭐ Estrella | `fa-star` |
| 💎 Gema | `fa-gem` |

**Uso:**
```html
<!-- Icono de laptop -->
<i class="fas fa-laptop fa-4x"></i>

<!-- Icono de cohete con color -->
<i class="fas fa-rocket fa-4x" style="color: #FF5733;"></i>
```

Busca más iconos en: https://fontawesome.com/icons

---

## 💰 INTEGRAR PAGOS REALES

Una vez que quieras cobrar de verdad (no solo guardar en carrito):

### OPCIÓN 1: Con Stripe (Recomendado)

```javascript
// 1. Instala Stripe en tu HTML
<script src="https://js.stripe.com/v3/"></script>

// 2. En tu botón de checkout
<button onclick="processPaymentStripe()">
  💳 Pagar Ahora
</button>

// 3. En js/script.js agrega:
async function processPaymentStripe() {
  const total = Cart.getTotal();
  
  const response = await fetch('/pagar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: total })
  });
  
  const session = await response.json();
  // Redirige a Stripe
  window.location.href = session.redirect_url;
}
```

### OPCIÓN 2: Con PayPal

```html
<button onclick="processPaymentPayPal()">
  🅿️ Pagar con PayPal
</button>

<script>
function processPaymentPayPal() {
  const total = Cart.getTotal();
  // Crear transacción PayPal
  // Redirigir a PayPal
}
</script>
```

### OPCIÓN 3: Con Firebase Realtime Database

```javascript
// Ya preparado en firebase-operations.js
async function saveOrder() {
  const order = {
    products: Cart.getCart(),
    total: Cart.getTotal(),
    date: new Date(),
    status: 'pending'
  };
  
  await FirebaseOps.saveData('orders', orderId, order);
}
```

---

## 📊 VER TUS VENTAS

Desde la consola:

```javascript
// Ver todas las órdenes
console.table(Storage.getOrders());

// Ver total vendido
const orders = Storage.getOrders();
const total = orders.reduce((sum, order) => sum + order.total, 0);
console.log(`Total vendido: $${total}`);

// Ver últimas órdenes
const recent = orders.slice(-5);
console.table(recent);
```

---

## 🎨 PERSONALIZAR ESTILOS

### Cambiar colores de la tienda

En `css/estilos.css`, busca la sección TIENDA:

```css
.tienda-section h2 {
  color: var(--primary-color); /* Color del título */
}

.producto-card:hover {
  border-color: var(--primary-color); /* Color al pasar mouse */
}

.producto-imagen {
  background: linear-gradient(
    135deg, 
    var(--primary-color),  /* Color izquierda */
    var(--accent-color)    /* Color derecha */
  );
}
```

**Colores predefinidos disponibles:**
- `--primary-color`: Azul (#007bff)
- `--secondary-color`: Gris (#6c757d)
- `--accent-color`: Verde (#28a745)
- `--danger-color`: Rojo (#FF6B6B)
- `--warning-color`: Amarillo (#FFE66D)

**Ejemplo: Cambiar todo a rojo**
```css
.producto-card:hover {
  border-color: #FF6B6B;
}

.precio {
  color: #FF6B6B;
}
```

### Cambiar tamaño de tarjetas

```css
/* Hacer tarjetas más grandes */
.productos-grid {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

/* Hacer tarjetas más pequeñas */
.productos-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

---

## 🔔 NOTIFICACIONES DE VENTA

El sistema notifica automáticamente cuando alguien:

```javascript
// 1. Agrega al carrito
quickAddToCart('Producto', 99.99);
// → Muestra: "✅ ¡Agregado al carrito!"

// 2. Hace checkout
Cart.checkout();
// → Muestra: "✅ ¡Compra realizada!" (en consola)

// 3. Ve detalles
// → Si implementas, agregar tu propia notificación
Notifications.success('¡Viendo detalles!');
```

---

## 📌 LISTA DE VERIFICACIÓN PARA LANZAR TIENDA

- [ ] Cambiar nombres de productos según lo que VENDES
- [ ] Agregar fotos reales (reemplazar iconos si prefieres)
- [ ] Actualizar precios correctos
- [ ] Escribir descripciones profesionales
- [ ] Agregar características/beneficios
- [ ] Probar botones en diferentes navegadores
- [ ] Probar vista móvil
- [ ] Configurar Stripe o PayPal (si cobras)
- [ ] Publicar en internet
- [ ] Compartir enlace con clientes

---

## 💡 IDEAS: QUÉ VENDER

Basándote en tu negocio:

### Si haces **Desarrollo Web:**
- Paquetes: Básico (5 pag), Standard (10 pag), Premium (custom)
- Cursos de web development
- Consultoría técnica
- Mantenimiento anual
- Soporte post-venta

### Si haces **Diseño:**
- Logo diseño
- Marca completa (logo + colores + guía)
- Rediseño de sitio
- Ilustraciones custom
- Templates reutilizables

### Si tienes **Ecommerce:**
- Productos físicos
- Digitales (ebooks, templates)
- Servicios (envío, personalización)
- Suscripciones mensuales

### Si das **Consultoría:**
- Sesiones individuales
- Paquetes de coaching
- Membresía anual
- Cursos en línea
- Grupos de mentoría

---

## 🚀 EJEMPLOS LISTOS PARA COPIAR-PEGAR

### Producto: Ebook
```html
<div class="producto-card">
  <div class="producto-imagen">
    <i class="fas fa-book fa-4x" style="color: #4ECDC4;"></i>
  </div>
  <h3>Ebook: Marketing Digital</h3>
  <span class="precio">$29.99</span>
  <button onclick="quickAddToCart('Ebook: Marketing Digital', 29.99)">
    🛒 Agregar al Carrito
  </button>
</div>
```

### Producto: Membresía
```html
<div class="producto-card">
  <div class="producto-imagen">
    <i class="fas fa-lock fa-4x" style="color: #FFE66D;"></i>
  </div>
  <h3>Membresía Premium - 1 Año</h3>
  <span class="precio">$199.99</span>
  <button onclick="quickAddToCart('Membresía Premium 1Y', 199.99)">
    🛒 Agregar al Carrito
  </button>
</div>
```

### Producto: Sesión
```html
<div class="producto-card">
  <div class="producto-imagen">
    <i class="fas fa-video fa-4x" style="color: #95E1D3;"></i>
  </div>
  <h3>Sesión 1-to-1 (60 min)</h3>
  <span class="precio">$79.99</span>
  <button onclick="quickAddToCart('Sesión 1-to-1', 79.99)">
    🛒 Agregar al Carrito
  </button>
</div>
```

---

## 📈 ESTADÍSTICAS

Ver qué productos se agrega más:

```javascript
// Usar Google Analytics (ya está instalado)
// O en la consola:
const cart = Storage.getCart();
console.log(`Items en carrito: ${cart.length}`);
console.log(`Total del carrito: $${Cart.getTotal()}`);
```

---

## ☑️ PRÓXIMOS PASOS

1. **HOY:** Personaliza los 6 productos existentes
2. **MAÑANA:** Configura Stripe o PayPal
3. **SEMANA:** Publica tu tienda
4. **PRONTO:** Agrega más productos

---

## 🎁 BONUS: Crear Cupones de Descuento

```javascript
// En js/script.js agrega:
function applyCoupon(code) {
  const discounts = {
    'BIENVENIDA': 0.10,      // 10% descuento
    'AMIGO2024': 0.20,       // 20% descuento
    'VIP50': 0.50            // 50% descuento
  };
  
  if (discounts[code]) {
    const original = parseFloat(Cart.getTotal());
    const percentage = discounts[code];
    const discount = original * percentage;
    const final = original - discount;
    
    console.log(`Descuento aplicado: -$${discount.toFixed(2)}`);
    console.log(`Total final: $${final.toFixed(2)}`);
    
    return final;
  } else {
    Notifications.error('❌ Cupón inválido');
  }
}

// Uso:
applyCoupon('BIENVENIDA'); // 10% off
```

---

## 🔐 SEGURIDAD EN PAGOS

- **Nunca** guardes números de tarjeta en tu código
- **Usa siempre** Stripe, PayPal o similares
- **Encripta** datos sensibles
- **HTTPS siempre** (obligatorio para pagos)
- **Valida** precios en el backend

---

## 📞 EJEMPLOS DE SOPORTE

Agrega esto en tu página de contacto:

```html
<section class="soporte">
  <h3>Soporte para Compradores</h3>
  <p>¿Problema con tu compra?</p>
  <button onclick="Chat.openChat()">
    💬 Chat en Vivo
  </button>
  <p>📧 Email: soporte@miempresa.com</p>
  <p>📞 Teléfono: +1 (555) 123-4567</p>
</section>
```

---

🎉 **¡Tu tienda está lista para vender!** 🎉

Próximo paso: Personaliza los productos con TUS datos y ¡empieza a ganar dinero!
