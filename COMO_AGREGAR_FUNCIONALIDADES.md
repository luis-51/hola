# 🛠️ Cómo Agregar Nuevas Funcionalidades

Esta guía te ayuda a agregar nuevas funcionalidades a tu página web de manera ordenada y modular.

---

## 📋 Plantilla General

Sigue estos pasos para cualquier funcionalidad nueva:

### Paso 1: Crear el Módulo en JavaScript
```javascript
// Agregar al inicio de script.js, después de otros módulos
const MiFuncionalidad = {
  inicializar: () => {
    // Tu código aquí
  },
  agregar: (datos) => {
    // Agregar
  },
  obtener: () => {
    // Recuperar
  },
  eliminar: (id) => {
    // Borrar
  }
};
```

### Paso 2: Agregar Estilos CSS
```css
/* Agregar al final de css/estilos.css */
.mi-funcionalidad {
  /* Estilos */
}

.mi-funcionalidad:hover {
  /* Hover effects */
}

/* Responsive */
@media (max-width: 768px) {
  .mi-funcionalidad {
    /* Ajustes móvil */
  }
}
```

### Paso 3: Agregar HTML
```html
<div class="mi-funcionalidad" id="mi-funcionalidad">
  <h3>Mi Funcionalidad</h3>
  <button id="btn-accionar">Ejecutar</button>
</div>
```

### Paso 4: Conectar en JavaScript
```javascript
// Dentro de DOMContentLoaded()
const miBtn = document.getElementById('btn-accionar');
if (miBtn) {
  miBtn.addEventListener('click', () => {
    MiFuncionalidad.inicializar();
    Notifications.success('¡Funcionalidad activada!');
  });
}
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Sistema de Ratings (Puntuaciones)

```javascript
// 1. Crear módulo
const Ratings = {
  add: (itemId, stars) => {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    ratings.push({ itemId, stars, date: new Date().toISOString() });
    localStorage.setItem('ratings', JSON.stringify(ratings));
  },
  getAverage: (itemId) => {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    const itemRatings = ratings.filter(r => r.itemId === itemId);
    const avg = itemRatings.reduce((a, b) => a + b.stars, 0) / itemRatings.length;
    return Math.round(avg * 10) / 10;
  }
};

// 2. Agregar evento
document.querySelectorAll('.rating-stars').forEach(el => {
  el.addEventListener('click', (e) => {
    const stars = e.target.dataset.stars;
    const itemId = el.dataset.itemId;
    Ratings.add(itemId, parseInt(stars));
    Notifications.success('Gracias por tu calificación!');
  });
});
```

```css
/* Estilos CSS */
.rating-stars {
  display: flex;
  gap: 0.5rem;
}

.star {
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  color: #ddd;
}

.star:hover,
.star.active {
  color: #ffc107;
}
```

```html
<!-- HTML -->
<div class="rating-stars" data-item-id="1">
  <span class="star" data-stars="1">★</span>
  <span class="star" data-stars="2">★</span>
  <span class="star" data-stars="3">★</span>
  <span class="star" data-stars="4">★</span>
  <span class="star" data-stars="5">★</span>
</div>
```

---

### Ejemplo 2: Sistema de Notificaciones Push

```javascript
// Módulo
const PushNotifications = {
  requestPermission: () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          Notifications.success('Notificaciones activadas');
        }
      });
    }
  },
  send: (title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: 'https://picsum.photos/128/128',
        badge: 'https://picsum.photos/128/128',
        ...options
      });
    }
  }
};

// Uso
const notifBtn = document.getElementById('enable-notifications');
if (notifBtn) {
  notifBtn.addEventListener('click', () => {
    PushNotifications.requestPermission();
  });
}
```

---

### Ejemplo 3: Sistema de Carrito (E-commerce)

```javascript
// Módulo
const Carrito = {
  items: JSON.parse(localStorage.getItem('carrito') || '[]'),
  
  agregar: (producto) => {
    const existe = Carrito.items.find(item => item.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      Carrito.items.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(Carrito.items));
    Notifications.success(`${producto.nombre} agregado`);
  },
  
  remover: (id) => {
    Carrito.items = Carrito.items.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(Carrito.items));
  },
  
  obtenerTotal: () => {
    return Carrito.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  },
  
  vaciar: () => {
    Carrito.items = [];
    localStorage.setItem('carrito', JSON.stringify(Carrito.items));
  }
};

// Uso
document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = {
      id: btn.dataset.id,
      nombre: btn.dataset.nombre,
      precio: parseFloat(btn.dataset.precio)
    };
    Carrito.agregar(producto);
  });
});
```

---

## 🎯 Mejores Prácticas

### 1. Siempre Usar Module Pattern
```javascript
const MiModulo = {
  propiedad: valor,
  metodo: () => { ... }
};
```

### 2. Almacenar en localStorage
```javascript
const data = JSON.parse(localStorage.getItem('key') || '[]');
```

### 3. Usar Notificaciones para Feedback
```javascript
Notifications.success('¡Completado!');
Notifications.error('Algo salió mal');
```

### 4. Hacer Responsive
```css
@media (max-width: 768px) {
  /* Ajustes móvil */
}
```

### 5. Validar Entrada
```javascript
if (!email || !/\S+@\S+\.\S+/.test(email)) {
  Notifications.error('Email inválido');
  return;
}
```

### 6. Documentar Código
```javascript
// DESCRIPCIÓN CLARA DE QUÉ HACE
const miFunc = () => {
  // Explicación de pasos importantes
};
```

---

## 🔗 Integraciones Útiles

### Google Maps
```html
<div id="mapa" style="width: 100%; height: 400px;"></div>
<script>
  function iniciarMapa() {
    const loc = { lat: 40.7128, lng: -74.0060 };
    const mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 12,
      center: loc
    });
  }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=TU_CLAVE&callback=iniciarMapa"></script>
```

### Stripe (Pagos)
```html
<script src="https://js.stripe.com/v3/"></script>
<div id="card-element"></div>
```

### Analytics
```javascript
// Google Analytics ya está configurado en el HTML
// Solo revisa el GA_MEASUREMENT_ID
```

### EmailJS (Emails)
```javascript
// Ya está parcialmente configurado
// Completa con TU_SERVICE_ID y TU_TEMPLATE_ID
emailjs.send('tu_service', 'tu_template', { datos });
```

---

## 📦 Estructura de Carpetas Recomendada

Para proyectos más grandes:
```
proyecto/
├── css/
│   ├── estilos.css       (Estilos principales)
│   ├── componentes.css   (Nuevos componentes)
│   └── responsive.css    (Responsive)
├── js/
│   ├── script.js         (JavaScript principal)
│   ├── modulos.js        (Módulos reutilizables)
│   └── utilidades.js     (Funciones auxiliares)
├── img/
│   └── (imágenes)
├── index.html
└── README.md
```

---

## 🧪 Checklist para Nueva Funcionalidad

- [ ] Módulo JavaScript creado
- [ ] HTML agregado
- [ ] CSS agregado con responsive
- [ ] Eventos conectados
- [ ] Validaciones agregadas
- [ ] Notificaciones para feedback
- [ ] Almacenamiento (si aplica)
- [ ] Probado en móvil
- [ ] Probado en desktop
- [ ] Documentación actualizada

---

## 🐛 Debugging

### Ver localStorage
```javascript
console.log(JSON.parse(localStorage.getItem('key')));
```

### Ver módulos disponibles
```javascript
console.log(Storage, Notifications, SearchFilter, Favorites, Comments);
```

### Limpiar localStorage
```javascript
localStorage.clear(); // ⚠️ Cuidado, borra todo
```

### Ver eventos
```javascript
// Agregar breakpoint en DevTools
// Inspeccionar elemento y ver listeners
```

---

## 🎓 Recursos Útiles

- **MDN Web Docs**: mozilla.org/docs/web
- **W3Schools**: w3schools.com
- **Stack Overflow**: stackoverflow.com/questions/tagged/javascript
- **CSS-Tricks**: css-tricks.com

---

## 📞 Soporte

Si tienes dudas:
1. Revisa los comentarios en el código
2. Lee FUNCIONALIDADES.md
3. Consulta GUIA_RAPIDA.md
4. Prueba en consola (F12)

---

**¡Listo para crear!** 🚀
