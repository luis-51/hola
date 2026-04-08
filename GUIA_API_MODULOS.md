# 📚 GUÍA DE API - MÓDULOS DEL SISTEMA

## Acceso Rápido a Todos los Módulos

---

## 📦 MÓDULO: Storage (Almacenamiento)

### Métodos Disponibles:

```javascript
// USUARIOS
Storage.saveUser(user)                    // Guardar usuario
Storage.getUser(userId)                   // Obtener usuario
Storage.getAllUsers()                     // Listar todos
Storage.deleteUser(userId)                // Eliminar

// FAVORITOS
Storage.addFavorite(itemId, itemName)     // Marcar favorito
Storage.removeFavorite(itemId)            // Quitar de favoritos
Storage.getFavorites()                    // Ver todos favoritos

// GUARDADOS
Storage.addSaved(itemId, itemName)        // Guardar para después
Storage.removeSaved(itemId)               // Eliminar guardado
Storage.getSaved()                        // Ver guardados

// COMENTARIOS
Storage.addComment(comment)               // Guardar comentario
Storage.getCommentsByPost(postId)         // Obtener de un post
Storage.deleteComment(commentId)          // Eliminar comentario

// RESEÑAS
Storage.addReview(review)                 // Guardar reseña
Storage.getReviewsByProduct(productId)    // Obtener de producto
Storage.deleteReview(reviewId)            // Eliminar reseña

// CALIFICACIONES
Storage.addRating(rating)                 // Guardar calificación
Storage.getRatingsByItem(itemId)          // Obtener de item
Storage.deleteRating(ratingId)            // Eliminar calificación

// CARRITO
Storage.addCartItem(item)                 // Agregar al carrito
Storage.removeCartItem(itemId)            // Quitar del carrito
Storage.getCart()                         // Ver carrito completo
Storage.clearCart()                       // Vaciar carrito

// ÓRDENES
Storage.addOrder(order)                   // Guardar orden
Storage.getOrders()                       // Ver todas órdenes
Storage.getOrderById(orderId)             // Ver orden específica

// CHATS
Storage.addMessage(message)               // Guardar mensaje
Storage.getMessages(roomId)               // Obtener mensajes
Storage.getChatRooms()                    // Ver salas

// EVENTOS
Storage.addEvent(event)                   // Guardar evento
Storage.getEvents()                       // Ver todos eventos
Storage.getEventsByDate(date)             // Filtrar por fecha

// HISTORIAL
Storage.addToHistory(item)                // Agregar a historial
Storage.getHistory()                      // Ver historial
Storage.clearHistory()                    // Limpiar historial

// NEWSLETTER
Storage.addSubscriber(email)              // Suscribir
Storage.getSubscribers()                  // Ver suscriptores
Storage.removeSubscriber(email)           // Desuscribir

// WISHLIST
Storage.addToWishlist(item)               // Agregar a deseos
Storage.getWishlist()                     // Ver lista deseos
Storage.removeFromWishlist(itemId)        // Quitar de deseos
```

---

## ⭐ MÓDULO: Rating (Calificaciones)

```javascript
// AGREGAR CALIFICACIÓN
Rating.add(
  itemId,        // ID del item
  itemType,      // "producto", "servicio", "artículo", etc.
  stars,         // 1-5 estrellas
  comment        // Comentario opcional
)

// OBTENER CALIFICACIONES
Rating.getByItem(itemId)
// Retorna: { average: 4.5, count: 10, ratings: [...] }

// EJEMPLO
Rating.add('prod-123', 'producto', 5, '¡Excelente producto!');
const stats = Rating.getByItem('prod-123');
console.log(stats.average); // 4.5
```

---

## 🛒 MÓDULO: Cart (Carrito)

```javascript
// AGREGAR AL CARRITO
Cart.add(
  productId,     // ID único
  productName,   // Nombre del producto
  price,         // Precio unitario
  quantity       // Cantidad (default: 1)
)

// QUITAR DEL CARRITO
Cart.remove(productId)

// VER TOTAL
Cart.getTotal()            // Retorna: "125.50"

// VER CARRITO COMPLETO
Cart.getCart()             // Retorna: [{ id, name, price, qty, total }]

// CHECKOUT (compra)
Cart.checkout()            // Crea orden y vacía carrito

// EJEMPLO
Cart.add('prod-1', 'Laptop', 999.99, 1);
Cart.add('prod-2', 'Mouse', 25.50, 2);
console.log(Cart.getTotal()); // "1050.99"
Cart.checkout(); // Ordena
```

---

## 💬 MÓDULO: Chat (Mensajería)

```javascript
// AGREGAR MENSAJE
Chat.addMessage(
  sender,        // Nombre del remitente
  text,          // Contenido del mensaje
  roomId         // ID de la sala (default: 'general')
)

// OBTENER MENSAJES
Chat.getMessages(roomId)   // Retorna: [{ sender, text, time }]

// ABRIR INTERFAZ CHAT
Chat.openChat()

// VER SALAS
Chat.getRooms()

// EJEMPLO
Chat.addMessage('Juan', 'Hola a todos!', 'general');
Chat.addMessage('María', '¿Qué tal?', 'general');
const msgs = Chat.getMessages('general');
// [{ sender: 'Juan', text: 'Hola...', time: '14:32' }, ...]
```

---

## 📅 MÓDULO: Calendar (Eventos)

```javascript
// AGREGAR EVENTO
Calendar.addEvent(
  title,         // Nombre del evento
  description,   // Descripción (opcional)
  date,          // Formato: "2026-04-15"
  time           // Formato: "14:30"
)

// OBTENER EVENTOS POR FECHA
Calendar.getEventsByDate(date)
// Retorna: [{ title, description, date, time }]

// VER TODOS LOS EVENTOS
Calendar.getAllEvents()

// EJEMPLO
Calendar.addEvent('Reunión', 'Con el equipo', '2026-04-15', '14:30');
Calendar.addEvent('Presentación', 'Proyecto nuevo', '2026-04-20', '10:00');
const events = Calendar.getEventsByDate('2026-04-15');
// [{ title: 'Reunión', description: '...', date: '2026-04-15', time: '14:30' }]
```

---

## 📊 MÓDULO: Dashboard (Estadísticas)

```javascript
// OBTENER ESTADÍSTICAS
Dashboard.getUserStats()
// Retorna: {
//   favoritos: 5,
//   comentarios: 3,
//   guardados: 2,
//   ordenes: 1,
//   mensajes: 10
// }

// RENDERIZAR WIDGET
Dashboard.render(
  selector       // CSS selector donde mostrar
)

// EJEMPLO
Dashboard.render('#dashboard-widget');
const stats = Dashboard.getUserStats();
console.log(`Tienes ${stats.favoritos} favoritos`);
```

---

## 🔍 MÓDULO: SearchFilter (Búsqueda)

```javascript
// BÚSQUEDA EN BLOG
SearchFilter.filterBlog(query)
// Busca en títulos y contenido

// BÚSQUEDA EN GALERÍA
SearchFilter.filterGallery(query)
// Busca por categoría y tags

// BÚSQUEDA EN SERVICIOS
SearchFilter.filterServices(query)
// Busca por tipo y descripción

// BÚSQUEDA AVANZADA
SearchFilter.advancedSearch(
  query,         // Texto a buscar
  options        // { category, rating, dating, etc. }
)

// EJEMPLO
SearchFilter.filterBlog('JavaScript');
SearchFilter.advancedSearch('laptop', { category: 'productos', rating: 4 });
const results = SearchFilter.filterServices('diseño');
```

---

## ❤️ MÓDULO: Favorites (Favoritos)

```javascript
// TOGGLE FAVORITO
Favorites.toggle(
  itemId,        // ID del item
  itemName       // Nombre para referencia
)

// VERIFICAR SI ES FAVORITO
Favorites.isFavorite(itemId)
// Retorna: true/false

// OBTENER TODOS
Favorites.getAll()

// LIMPIAR FAVORITOS
Favorites.clear()

// EJEMPLO
Favorites.toggle('item-1', 'Mi Artículo');
if (Favorites.isFavorite('item-1')) {
  console.log('Es favorito');
}
const all = Favorites.getAll();
console.log(`Tienes ${all.length} favoritos`);
```

---

## 📌 MÓDULO: Saved (Guardados)

```javascript
// TOGGLE GUARDADO
Saved.toggle(
  itemId,        // ID del item
  itemName       // Nombre para referencia
)

// VERIFICAR SI ESTÁ GUARDADO
Saved.isSaved(itemId)
// Retorna: true/false

// OBTENER TODOS
Saved.getAll()

// LIMPIAR GUARDADOS
Saved.clear()

// EJEMPLO
Saved.toggle('article-5', 'Leer después');
if (Saved.isSaved('article-5')) {
  console.log('Guardado para después');
}
```

---

## 💬 MÓDULO: Comments (Comentarios)

```javascript
// AGREGAR COMENTARIO
Comments.add(
  postId,        // ID del post
  author,        // Nombre del autor
  text           // Contenido del comentario
)

// OBTENER COMENTARIOS
Comments.getByPost(postId)
// Retorna: [{ id, author, text, date }]

// ELIMINAR COMENTARIO
Comments.delete(commentId)

// OBTENER TODOS
Comments.getAll()

// EJEMPLO
Comments.add('blog-1', 'Juan', 'Excelente artículo!');
Comments.add('blog-1', 'María', 'Muy útil la información');
const comments = Comments.getByPost('blog-1');
// [{ id: '1', author: 'Juan', text: '...', date: '14:32' }, ...]
```

---

## ⭐ MÓDULO: Reviews (Reseñas)

```javascript
// AGREGAR RESEÑA CON RATING
Reviews.add(
  productId,     // ID del producto
  author,        // Nombre del autor
  text,          // Contenido de la reseña
  rating         // Calificación 1-5
)

// OBTENER RESEÑAS
Reviews.getByProduct(productId)
// Retorna: [{ id, author, text, rating, date }]

// ELIMINAR RESEÑA
Reviews.delete(reviewId)

// OBTENER TODAS
Reviews.getAll()

// EJEMPLO
Reviews.add('laptop-1', 'Carlos', 'Increíble rendimiento', 5);
Reviews.add('laptop-1', 'Ana', 'Buena relación precio', 4);
const reviews = Reviews.getByProduct('laptop-1');
// [{ id: '1', author: 'Carlos', text: '...', rating: 5, date: '2026-04-01' }, ...]
```

---

## 🔔 MÓDULO: Notifications (Notificaciones)

```javascript
// ÉXITO (Verde)
Notifications.success('¡Operación completada!')

// ERROR (Rojo)
Notifications.error('Algo salió mal')

// INFORMACIÓN (Azul)
Notifications.info('Información importante')

// ADVERTENCIA (Amarillo)
Notifications.warning('Ten cuidado con esto')

// EJEMPLO
if (Cart.checkout()) {
  Notifications.success('¡Compra realizada!');
} else {
  Notifications.error('El carrito está vacío');
}
```

---

## 🛠️ MÓDULO: Utils (Utilidades)

```javascript
// DEBOUNCE (retrasar ejecución)
const debouncedFunc = Utils.debounce(
  function,      // Función a debounce
  delay          // Retraso en ms (default: 300)
)

// ACORTAR TEXTO
Utils.shortenText(
  text,          // Texto a acortar
  maxLength      // Máximo de caracteres
)

// COPIAR AL PORTAPAPELES
Utils.copyToClipboard(text)
// Retorna: true/false

// GENERAR ID ÚNICO
Utils.generateId()
// Retorna: "id_1234567890"

// VALIDAR EMAIL
Utils.validateEmail(email)
// Retorna: true/false

// VALIDAR TELÉFONO
Utils.validatePhone(phone)
// Retorna: true/false

// FORMATEAR MONEDA
Utils.formatCurrency(amount)
// Retorna: "$1,234.56"

// EJEMPLO
const search = Utils.debounce(searchFunction, 500);
const short = Utils.shortenText('Texto muy largo...', 20);
// → "Texto muy l..."
Utils.copyToClipboard('texto');
if (Utils.validateEmail('user@email.com')) {
  console.log('Email válido');
}
```

---

## 📱 MÓDULO: Sync (Sincronización Online/Offline)

```javascript
// CONFIG AUTOMÁTICO
// El módulo se inicializa solo

// EVENTOS DISPONIBLES
window.addEventListener('online', () => {
  Notifications.success('🔄 Conectado a internet');
  Sync.syncData();
});

window.addEventListener('offline', () => {
  Notifications.warning('📴 Modo offline');
});

// SINCRONIZAR MANUALMENTE
Sync.syncData()
// Sube datos locales a Firebase (si está configurado)

// VER ESTADO
console.log(navigator.onLine); // true/false
```

---

## 🎨 FUNCIONES GLOBALES DE VENTANA

```javascript
// CARRITO
addToCart(id, name, price)
quickAddToCart(name, price)
viewCart()
checkoutCart()

// EVENTOS
quickAddEvent()
showUpcomingEvents()

// RATING
rateItem(itemId, itemType)

// HISTORIAL
viewHistory()
clearHistory()

// FORMAS
validateForm(formId)

// EJEMPLO EN HTML
<button onclick="quickAddToCart('Producto', 99.99)">
  Agregar al Carrito
</button>

<button onclick="rateItem('articulo-1', 'Blog')">
  Calificar
</button>

<button onclick="quickAddEvent()">
  Crear Evento
</button>
```

---

## 📡 FIREBASE (Opcional)

```javascript
// ESTAR LISTO PARA USAR EN FIREBASE
// Primero: Configura js/firebase-config.js con tus credenciales

// LOGIN
await FirebaseOps.loginUser(email, password)

// LOGOUT
await FirebaseOps.logoutUser()

// REGISTRAR
await FirebaseOps.registerUser(email, password)

// OBTENER USUARIO ACTUAL
const user = await FirebaseOps.getCurrentUser()

// GUARDAR DATOS
await FirebaseOps.saveData('users', userId, userData)

// OBTENER DATOS
const data = await FirebaseOps.getData('users', userId)

// ACTUALIZAR DATOS
await FirebaseOps.updateData('users', userId, updates)

// ELIMINAR DATOS
await FirebaseOps.deleteData('users', userId)

// ESCUCHAR CAMBIOS (Real-time)
FirebaseOps.listenData('users', (data) => {
  console.log('Datos actualizados:', data);
});

// EJEMPLO
const user = {
  name: 'Juan',
  email: 'juan@email.com',
  phone: '1234567890'
};
await FirebaseOps.saveData('users', 'user-1', user);
```

---

## 🚀 FLUJO TÍPICO DE USO

### Caso 1: Usuario compra un producto
```javascript
// 1. Añade al carrito
Cart.add('laptop-1', 'Laptop Gaming', 1299.99, 1);

// 2. Ve el carrito
console.log(Cart.getCart());

// 3. Revisa el total
console.log(Cart.getTotal()); // "1299.99"

// 4. Completa la compra
Cart.checkout();

// 5. Confirmación
Notifications.success('¡Compra realizada!');
```

### Caso 2: Usuario califica un producto
```javascript
// 1. Abre formulario de rating
rateItem('laptop-1', 'producto');

// 2. Sistema guarda rating
Rating.add('laptop-1', 'producto', 5, 'Producto excelente');

// 3. Ve stats de rating
const stats = Rating.getByItem('laptop-1');
console.log(`Promedio: ${stats.average}/5`);
```

### Caso 3: Usuario guarda artículo para después
```javascript
// 1. Toggle guardado
Saved.toggle('articulo-123', 'Mi artículo guardado');

// 2. Verificar
if (Saved.isSaved('articulo-123')) {
  Notifications.success('Guardado para después');
}

// 3. Ver todos guardados
const saved = Saved.getAll();
```

---

## 📋 CHEAT SHEET - Comandos Rápidos

| Tarea | Comando |
|-------|---------|
| Agregar carrito | `Cart.add(id, name, price, qty)` |
| Ver total carrito | `Cart.getTotal()` |
| Crear orden | `Cart.checkout()` |
| Agregar favorito | `Favorites.toggle(id, name)` |
| Obtener favoritos | `Favorites.getAll()` |
| Agregar comentario | `Comments.add(postId, author, text)` |
| Ver comentarios | `Comments.getByPost(postId)` |
| Crear evento | `Calendar.addEvent(title, desc, date, time)` |
| Ver eventos | `Calendar.getAllEvents()` |
| Enviar mensaje | `Chat.addMessage(sender, text, roomId)` |
| Ver estadísticas | `Dashboard.getUserStats()` |
| Buscar artículos | `SearchFilter.filterBlog(query)` |
| Validar email | `Utils.validateEmail(email)` |
| Copiar mensaje | `Utils.copyToClipboard(text)` |
| Notificación éxito | `Notifications.success('mensaje')` |

---

## 💡 TIPS PROFESIONALES

1. **Usa debounce en búsquedas:**
   ```javascript
   const search = Utils.debounce(searchFunction, 500);
   input.addEventListener('input', search);
   ```

2. **Crea notificaciones después de acciones:**
   ```javascript
   if (Cart.checkout()) {
     Notifications.success('Compra exitosa!');
   }
   ```

3. **Sincroniza con Firebase cuando sea posible:**
   ```javascript
   window.addEventListener('online', () => {
     Sync.syncData();
   });
   ```

4. **Valida formularios antes de procesar:**
   ```javascript
   if (validateForm('contact-form')) {
     // Procesar formulario
   }
   ```

5. **Usa localStorage como backup:**
   ```javascript
   const data = Storage.getCart();
   // Si Firebase no responde, usa localStorage
   ```

---

## 📞 SOPORTE RÁPIDO

**Si algo no funciona:**

1. Abre F12 → Consola
2. Revisa los logs (busca "Sistema Completo PRO")
3. Verifica que todos los módulos están cargados
4. Revisa la red (Network tab) para errores

**Todos los módulos están documentados en cada archivo .js**

---

🎉 **¡Disfruta de tu sistema profesional!** 🎉
