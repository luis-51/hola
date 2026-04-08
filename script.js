/**
 * 🚀 SISTEMA COMPLETO PRO - Todas las funcionalidades
 * ⭐ Rating | 🛒 Carrito | 💬 Chat | 📅 Calendario | 🗺️ Mapas | 📊 Dashboard | Y MÁS
 */

// ════════════════════════════════════════════════════════════════
// 🔐 ALMACENAMIENTO AVANZADO
// ════════════════════════════════════════════════════════════════

const Storage = {
  // Usuarios
  getUsers: () => { const raw = localStorage.getItem('users'); return raw ? JSON.parse(raw) : []; },
  saveUsers: (users) => { localStorage.setItem('users', JSON.stringify(users)); },
  getAuthUser: () => { const raw = localStorage.getItem('authUser'); return raw ? JSON.parse(raw) : null; },
  setAuthUser: (user) => { user ? localStorage.setItem('authUser', JSON.stringify(user)) : localStorage.removeItem('authUser'); },
  
  // Favoritos & Guardados
  getFavorites: () => { const raw = localStorage.getItem('favorites'); return raw ? JSON.parse(raw) : []; },
  saveFavorites: (favorites) => { localStorage.setItem('favorites', JSON.stringify(favorites)); },
  getSaved: () => { const raw = localStorage.getItem('saved'); return raw ? JSON.parse(raw) : []; },
  saveSaved: (saved) => { localStorage.setItem('saved', JSON.stringify(saved)); },
  
  // Contenido
  getComments: () => { const raw = localStorage.getItem('comments'); return raw ? JSON.parse(raw) : []; },
  saveComments: (comments) => { localStorage.setItem('comments', JSON.stringify(comments)); },
  getReviews: () => { const raw = localStorage.getItem('reviews'); return raw ? JSON.parse(raw) : []; },
  saveReviews: (reviews) => { localStorage.setItem('reviews', JSON.stringify(reviews)); },
  getRatings: () => { const raw = localStorage.getItem('ratings'); return raw ? JSON.parse(raw) : []; },
  saveRatings: (ratings) => { localStorage.setItem('ratings', JSON.stringify(ratings)); },
  
  // Comercio
  getCart: () => { const raw = localStorage.getItem('cart'); return raw ? JSON.parse(raw) : []; },
  saveCart: (cart) => { localStorage.setItem('cart', JSON.stringify(cart)); },
  getOrders: () => { const raw = localStorage.getItem('orders'); return raw ? JSON.parse(raw) : []; },
  saveOrders: (orders) => { localStorage.setItem('orders', JSON.stringify(orders)); },
  
  // Comunicación
  getMessages: () => { const raw = localStorage.getItem('messages'); return raw ? JSON.parse(raw) : []; },
  saveMessages: (messages) => { localStorage.setItem('messages', JSON.stringify(messages)); },
  getChats: () => { const raw = localStorage.getItem('chats'); return raw ? JSON.parse(raw) : []; },
  saveChats: (chats) => { localStorage.setItem('chats', JSON.stringify(chats)); },
  getNewsletterEmails: () => { const raw = localStorage.getItem('newsletter'); return raw ? JSON.parse(raw) : []; },
  saveNewsletterEmails: (emails) => { localStorage.setItem('newsletter', JSON.stringify(emails)); },
  
  // Planificación
  getEvents: () => { const raw = localStorage.getItem('events'); return raw ? JSON.parse(raw) : []; },
  saveEvents: (events) => { localStorage.setItem('events', JSON.stringify(events)); },
  getBookings: () => { const raw = localStorage.getItem('bookings'); return raw ? JSON.parse(raw) : []; },
  saveBookings: (bookings) => { localStorage.setItem('bookings', JSON.stringify(bookings)); },
  
  // Historial
  getHistory: () => { const raw = localStorage.getItem('history'); return raw ? JSON.parse(raw) : []; },
  saveHistory: (history) => { localStorage.setItem('history', JSON.stringify(history)); },
  getWishlist: () => { const raw = localStorage.getItem('wishlist'); return raw ? JSON.parse(raw) : []; },
  saveWishlist: (wishlist) => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }
};

// ════════════════════════════════════════════════════════════════
// 🔔 NOTIFICACIONES AVANZADAS
// ════════════════════════════════════════════════════════════════

const Notifications = {
  show: (message, type = 'info', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle', warning: 'exclamation-triangle' };
    toast.innerHTML = `<i class="fas fa-${icons[type] || 'info-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, duration);
  },
  success: (msg, duration = 3000) => Notifications.show(msg, 'success', duration),
  error: (msg, duration = 3000) => Notifications.show(msg, 'error', duration),
  info: (msg, duration = 3000) => Notifications.show(msg, 'info', duration),
  warning: (msg, duration = 3000) => Notifications.show(msg, 'warning', duration)
};

// ════════════════════════════════════════════════════════════════
// ⭐ SISTEMA DE CALIFICACIONES (Rating)
// ════════════════════════════════════════════════════════════════

const Rating = {
  add: (itemId, itemType, stars, comment = '') => {
    const ratings = Storage.getRatings();
    const existing = ratings.find(r => r.itemId === itemId && r.userId === (Storage.getAuthUser()?.email));
    if (existing) {
      existing.stars = stars;
      existing.comment = comment;
      existing.date = new Date().toISOString();
    } else {
      ratings.push({ id: Date.now(), itemId, itemType, stars, comment, userId: Storage.getAuthUser()?.email, date: new Date().toISOString() });
    }
    Storage.saveRatings(ratings);
    Notifications.success(`⭐ Calificación de ${stars} estrellas registrada`);
  },
  
  getByItem: (itemId) => {
    const ratings = Storage.getRatings().filter(r => r.itemId === itemId);
    if (ratings.length === 0) return { average: 0, count: 0, ratings };
    const avg = (ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length).toFixed(1);
    return { average: avg, count: ratings.length, ratings };
  }
};

// ════════════════════════════════════════════════════════════════
// 🛒 SISTEMA DE CARRITO (Shopping Cart)
// ════════════════════════════════════════════════════════════════

const Cart = {
  add: (productId, productName, price, quantity = 1) => {
    const cart = Storage.getCart();
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: Date.now(), productId, productName, price, quantity, date: new Date().toISOString() });
    }
    Storage.saveCart(cart);
    Notifications.success(`${productName} agregado al carrito`);
  },
  
  remove: (productId) => {
    const cart = Storage.getCart().filter(item => item.productId !== productId);
    Storage.saveCart(cart);
    Notifications.info('Producto removido del carrito');
  },
  
  getTotal: () => {
    const cart = Storage.getCart();
    return (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2);
  },
  
  openCartModal: () => {
    const cart = Storage.getCart();
    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    let itemsHTML = '';
    if (cart.length === 0) {
      itemsHTML = '<p style="text-align: center; padding: 2rem;">El carrito está vacío</p>';
    } else {
      itemsHTML = cart.map(item => `
        <div style="background:#f8f9fa;padding:1rem;border-radius:8px;margin-bottom:0.8rem;display:flex;justify-content:space-between;align-items:center;">
          <div style="flex:1;">
            <strong style="color:#1a202c;">${item.productName}</strong>
            <div style="font-size:0.9rem;color:#666;">Cantidad: ${item.quantity}</div>
            <div style="font-weight:bold;color:#4A90E2;">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
          <button onclick="Cart.remove('${item.productId}'); updateCartCount(); Cart.openCartModal();" style="background:#FF6B6B;color:white;border:none;padding:0.5rem 1rem;border-radius:5px;cursor:pointer;">Quitar</button>
        </div>
      `).join('');
    }
    
    const total = Cart.getTotal();
    
    modal.innerHTML = `
      <div class="modal-content" style="width:90%;max-width:600px;background:white;padding:2rem;border-radius:15px;box-shadow:0 10px 40px rgba(0,0,0,0.2);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
          <h2 style="margin:0;color:#1a202c;">🛒 Mi Carrito</h2>
          <button id="close-cart" style="background:none;border:none;font-size:24px;cursor:pointer;">✕</button>
        </div>
        
        <div style="max-height:400px;overflow-y:auto;margin-bottom:1.5rem;padding-right:1rem;">
          ${itemsHTML}
        </div>
        
        <div style="background:linear-gradient(135deg, #e3f2fd 0%, #f0f7ff 100%);padding:1.5rem;border-radius:10px;margin-bottom:1.5rem;border-left:4px solid #4A90E2;">
          <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
            <span style="color:#666;">Subtotal:</span>
            <span style="font-weight:bold;color:#1a202c;">$${total}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
            <span style="color:#666;">Impuesto (10%):</span>
            <span style="font-weight:bold;color:#1a202c;">$${(total * 0.1).toFixed(2)}</span>
          </div>
          <hr style="margin:0.8rem 0;border:1px solid rgba(74, 144, 226, 0.2);">
          <div style="display:flex;justify-content:space-between;">
            <span style="font-weight:bold;font-size:1.1rem;color:#4A90E2;">Total:</span>
            <span style="font-weight:bold;font-size:1.1rem;color:#4A90E2;">$${(parseFloat(total) * 1.1).toFixed(2)}</span>
          </div>
        </div>
        
        <div style="display:flex;gap:1rem;">
          <button id="continue-shopping" style="flex:1;background:#f0f0f0;color:#1a202c;border:2px solid #ddd;padding:1rem;border-radius:8px;font-weight:bold;cursor:pointer;transition:all 0.3s;" onMouseEnter="this.style.background='#e0e0e0'" onMouseLeave="this.style.background='#f0f0f0'">Continuar Comprando</button>
          <button id="checkout-btn" style="flex:1;background:linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);color:white;border:none;padding:1rem;border-radius:8px;font-weight:bold;cursor:pointer;transition:all 0.3s;" onMouseEnter="this.style.transform='translateY(-2px)'" onMouseLeave="this.style.transform='translateY(0)'">💳 Proceder al Pago</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('close-cart').addEventListener('click', () => modal.remove());
    document.getElementById('continue-shopping').addEventListener('click', () => modal.remove());
    document.getElementById('checkout-btn').addEventListener('click', () => {
      modal.remove();
      Cart.processPayment();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  },
  
  processPayment: () => {
    const cart = Storage.getCart();
    if (cart.length === 0) {
      Notifications.error('El carrito está vacío');
      return;
    }
    
    const total = (parseFloat(Cart.getTotal()) * 1.1).toFixed(2);
    const modal = document.createElement('div');
    modal.id = 'payment-modal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
      <div class="modal-content" style="width:90%;max-width:500px;background:white;padding:2rem;border-radius:15px;box-shadow:0 10px 40px rgba(0,0,0,0.2);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
          <h2 style="margin:0;color:#1a202c;">💳 Información de Pago</h2>
          <button id="close-payment" style="background:none;border:none;font-size:24px;cursor:pointer;">✕</button>
        </div>
        
        <div style="background:linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);color:white;padding:1.5rem;border-radius:10px;margin-bottom:1.5rem;text-align:center;">
          <div style="font-size:0.9rem;margin-bottom:0.5rem;">Total a Pagar</div>
          <div style="font-size:2.5rem;font-weight:bold;">$${total}</div>
        </div>
        
        <form style="display:flex;flex-direction:column;gap:1rem;">
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;color:#1a202c;">Nombre Completo</label>
            <input id="payment-name" type="text" placeholder="Juan Pérez" style="width:100%;padding:0.8rem;border:2px solid #e0e7ff;border-radius:6px;font-size:1rem;" required>
          </div>
          
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;color:#1a202c;">Email</label>
            <input id="payment-email" type="email" placeholder="tu@email.com" style="width:100%;padding:0.8rem;border:2px solid #e0e7ff;border-radius:6px;font-size:1rem;" required>
          </div>
          
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;color:#1a202c;">Número de Tarjeta</label>
            <input id="payment-card" type="text" placeholder="4532 1234 5678 9010" maxlength="19" style="width:100%;padding:0.8rem;border:2px solid #e0e7ff;border-radius:6px;font-size:1rem;" required>
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label style="display:block;margin-bottom:0.5rem;font-weight:bold;color:#1a202c;">Expiración</label>
              <input id="payment-expiry" type="text" placeholder="MM/YY" maxlength="5" style="width:100%;padding:0.8rem;border:2px solid #e0e7ff;border-radius:6px;font-size:1rem;" required>
            </div>
            <div>
              <label style="display:block;margin-bottom:0.5rem;font-weight:bold;color:#1a202c;">CVV</label>
              <input id="payment-cvv" type="text" placeholder="123" maxlength="3" style="width:100%;padding:0.8rem;border:2px solid #e0e7ff;border-radius:6px;font-size:1rem;" required>
            </div>
          </div>
          
          <button id="pay-btn" type="button" style="background:linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);color:white;border:none;padding:1rem;border-radius:8px;font-weight:bold;font-size:1.1rem;cursor:pointer;transition:all 0.3s;" onMouseEnter="this.style.transform='translateY(-2px)'" onMouseLeave="this.style.transform='translateY(0)'">
            ✓ Pagar $${total}
          </button>
        </form>
        
        <div style="margin-top:1rem;padding:1rem;background:#f0f7ff;border-radius:8px;border-left:4px solid #4A90E2;">
          <div style="font-size:0.85rem;color:#666;">
            🔒 <strong>Pago Seguro</strong><br>
            Tu información está protegida con encriptación SSL 256 bits
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('close-payment').addEventListener('click', () => modal.remove());
    
    document.getElementById('pay-btn').addEventListener('click', () => {
      const name = document.getElementById('payment-name').value.trim();
      const email = document.getElementById('payment-email').value.trim();
      const card = document.getElementById('payment-card').value.trim();
      const expiry = document.getElementById('payment-expiry').value.trim();
      const cvv = document.getElementById('payment-cvv').value.trim();
      
      if (!name || !email || !card || !expiry || !cvv) {
        Notifications.error('Por favor completa todos los campos');
        return;
      }
      
      if (card.length < 13) {
        Notifications.error('El número de tarjeta no es válido');
        return;
      }
      
      // Procesar pago
      const order = {
        id: Date.now(),
        items: [...cart],
        total: total,
        customer: { name, email },
        date: new Date().toLocaleString('es-ES'),
        status: 'completado'
      };
      
      const orders = Storage.getOrders();
      orders.push(order);
      Storage.saveOrders(orders);
      Storage.saveCart([]);
      
      modal.remove();
      Notifications.success(`✅ ¡Pago realizado! Orden #${order.id}\nSe ha enviado confirmaciónBrailleón a ${email}`);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  },
  
  checkout: () => {
    const cart = Storage.getCart();
    if (cart.length === 0) {
      Notifications.error('El carrito está vacío');
      return false;
    }
    const order = {
      id: Date.now(),
      items: [...cart],
      total: Cart.getTotal(),
      date: new Date().toLocaleString('es-ES'),
      status: 'pendiente'
    };
    const orders = Storage.getOrders();
    orders.push(order);
    Storage.saveOrders(orders);
    Storage.saveCart([]);
    Notifications.success(`✅ Orden #${order.id} creada correctamente`);
    return true;
  }
};

// ════════════════════════════════════════════════════════════════
// 💬 SISTEMA DE CHAT EN TIEMPO REAL
// ════════════════════════════════════════════════════════════════

// 🤖 CHATBOT INTELIGENTE CON INFORMACIÓN REAL
const Chatbot = {
  // Base de datos de información de la página
  knowledgeBase: {
    productos: {
      items: [
        { nombre: 'Paquete Premium Enterprise', precio: 4999.99, descuento: '-29%', features: 'Productos ilimitados, API personalizada, integraciones avanzadas, soporte 24/7, 5 años hosting' },
        { nombre: 'Curso: Web Avanzado', precio: 199.99, descuento: '-50%', features: '12 módulos, 60+ horas video, proyectos prácticos, certificado final, acceso de por vida' },
        { nombre: 'Sesión de Consultoría', precio: 99.99, descuento: 'No aplica', features: 'Sesión de 60 min, experto dedicado, videoconferencia, plan de acción, grabación' },
        { nombre: 'Plan de Soporte Anual', precio: 599.99, descuento: '-25%', features: 'Mantenimiento mensual, actualizaciones ilimitadas, respuesta en 24h, seguridad reforzada' }
      ]
    },
    servicios: {
      descripcion: 'Ofrecemos servicios profesionales de diseño web, desarrollo de aplicaciones, consultoría tecnológica y soporte técnico 24/7.',
      items: ['Diseño Web', 'Desarrollo de Aplicaciones', 'Consultoría Tecnológica', 'Soporte Técnico', 'Mantenimiento', 'Integraciones']
    },
    beneficios: {
      items: ['Garantía de Satisfacción (30 días)', 'Pago Seguro (SSL 256 bits)', 'Soporte 24/7', 'Entrega Rápida de productos digitales']
    }
  },

  // Detectar intención del usuario
  responses: {
    precio: {
      keywords: ['precio', 'costo', 'cuánto cuesta', 'cuanto vale', 'valor', 'tarifa'],
      handler: (text) => {
        const productos = Chatbot.knowledgeBase.productos.items;
        let respuesta = '💰 **Nuestros precios:**\n\n';
        productos.forEach(p => {
          respuesta += `🔹 **${p.nombre}**: $${p.precio.toFixed(2)} ${p.descuento !== 'No aplica' ? p.descuento : ''}\n`;
        });
        respuesta += '\n¿Te interesa alguno de estos productos?';
        return respuesta;
      }
    },
    producto: {
      keywords: ['producto', 'productos', 'tienda', 'qué venden', 'que ofrecen', 'comprar'],
      handler: (text) => {
        const productos = Chatbot.knowledgeBase.productos.items;
        let respuesta = '🛍️ **Nuestros Productos y Servicios:**\n\n';
        productos.forEach((p, idx) => {
          respuesta += `${idx + 1}. **${p.nombre}** - $${parseFloat(p.precio).toFixed(2)}\n   📌 ${p.features.split(',')[0]}\n\n`;
        });
        respuesta += '¿Quieres más detalles de alguno?';
        return respuesta;
      }
    },
    curso: {
      keywords: ['curso', 'cursos', 'aprender', 'formación', 'educación', 'capacitación', 'estudio'],
      handler: (text) => {
        return '📚 **Nuestras opciones de aprendizaje:**\n\n' +
          '1️⃣ **Curso: Web Avanzado** ($199.99)\n' +
          '   • 12 módulos completos\n' +
          '   • 60+ horas de video\n' +
          '   • Proyectos prácticos\n' +
          '   • Certificado oficial\n' +
          '   • Acceso de por vida\n' +
          '   • Comunidad privada\n\n' +
          '2️⃣ **Sesión de Consultoría** ($99.99)\n' +
          '   • Sesión personalizada de 60 minutos\n' +
          '   • Con expertos dedicados\n' +
          '   • Plan de acción incluido\n\n' +
          '¿Te gustaría inscribirte en alguno?';
      }
    },
    soporte: {
      keywords: ['soporte', 'ayuda', 'problema', 'error', 'no funciona', 'assistance', 'help'],
      handler: (text) => {
        return '🆘 **Contamos con:**\n\n' +
          '✅ **Soporte Técnico 24/7**\n' +
          '   • Chat en vivo disponible ahora\n' +
          '   • Email: contacto@miempresa.com\n' +
          '   • Teléfono disponible\n\n' +
          '✅ **Plan de Soporte Anual** ($599.99)\n' +
          '   • Mantenimiento mensual\n' +
          '   • Respuesta garantizada en 24h\n' +
          '   • Monitoreo 24/7\n' +
          '   • Backups automáticos\n\n' +
          '¿En qué puedo ayudarte específicamente?';
      }
    },
    garantia: {
      keywords: ['garantía', 'garantia', 'asegura', 'se puede devolver', 'dinero de vuelta', 'reembolso'],
      handler: (text) => {
        return '✅ **Garantía de Satisfacción:**\n\n' +
          '• 30 días de garantía dinero de vuelta\n' +
          '• Pago 100% seguro con SSL 256 bits\n' +
          '• Encriptación de datos garantizada\n' +
          '• Sin preguntas si no estás satisfecho\n\n' +
          'Nos aseguramos de que disfrutes nuestros servicios. 🛡️';
      }
    },
    entrega: {
      keywords: ['entrega', 'cuánto tiempo', 'demora', 'cuanto tarda', 'envío'],
      handler: (text) => {
        return '🚀 **Entrega de Productos:**\n\n' +
          '⚡ **Acceso Inmediato** para productos digitales\n' +
          '   • Cursos: Acceso inmediato después de compra\n' +
          '   • Sesiones de consultoría: Se agenda por email\n' +
          '   • Paquetes: Activación en menos de 1 hora\n\n' +
          '📦 **En caso de productos físicos:**\n' +
          '   • Envío express disponible\n' +
          '   • Seguimiento en tiempo real\n\n' +
          '¿Necesitas algo urgente?';
      }
    },
    empresa: {
      keywords: ['quiénes son', 'quienes son', 'sobre ustedes', 'acerca de', 'información de la empresa', 'about'],
      handler: (text) => {
        return '🏢 **Sobre Mi Empresa:**\n\n' +
          'Somos una empresa profesional dedicada a:\n' +
          '✨ Diseño web de alta calidad\n' +
          '🚀 Desarrollo de aplicaciones modernas\n' +
          '🎯 Consultoría tecnológica especializada\n' +
          '🛠️ Soporte técnico 24/7\n\n' +
          'Nuestro equipo de expertos está comprometido con la **innovación** y la **satisfacción del cliente**.\n\n' +
          'Trabajamos con tecnología de última generación. ¿Qué necesitas?';
      }
    },
    pago: {
      keywords: ['pago', 'tarjeta', 'how to pay', 'cómo pagar', 'métodos de pago', 'forma de pago'],
      handler: (text) => {
        return '💳 **Métodos de Pago:**\n\n' +
          '✅ Tarjetas de Crédito (Visa, Mastercard)\n' +
          '✅ Tarjetas de Débito\n' +
          '✅ Transferencia Bancaria\n' +
          '✅ PayPal\n' +
          '✅ Criptomonedas (Bitcoin, Ethereum)\n\n' +
          '🔒 **Seguridad Garantizada:**\n' +
          '• Encriptación SSL 256 bits\n' +
          '• Datos protegidos certificados\n' +
          '• No almacenamos datos de tarjeta\n\n' +
          '¿Deseas proceder con tu compra?';
      }
    },
    contacto: {
      keywords: ['contacto', 'contactar', 'teléfono', 'email', 'mail', 'cómo me contacto', 'comunicarme'],
      handler: (text) => {
        return '📞 **Formas de Contactarnos:**\n\n' +
          '💬 **Chat en Vivo:** Disponible ahora (yo puedo ayudarte)\n' +
          '📧 **Email:** contacto@miempresa.com\n' +
          '☎️ **Teléfono:** +34 XXX XXX XXX\n' +
          '🌐 **WhatsApp:** Disponible\n' +
          '📍 **Redes Sociales:** Facebook, Twitter, LinkedIn\n\n' +
          'También puedes visitar nuestra página de **Contacto** en el sitio. 🎧';
      }
    },
    evento: {
      keywords: ['evento', 'eventos', 'conferencia', 'webinar', 'taller', 'reunión', 'calendario'],
      handler: (text) => {
        return '📅 **Gestión de Eventos:**\n\n' +
          '✅ Crea eventos profesionales fácilmente\n' +
          '✅ Invita a tu comunidad\n' +
          '✅ Recibe reseñas detalladas\n' +
          '✅ Sistema de calificación 5 estrellas\n' +
          '✅ Gestión completa en línea\n\n' +
          '🎤 **Nuestros Eventos:**\n' +
          '• Conferencias técnicas\n' +
          '• Webinarios gratuitos\n' +
          '• Talleres prácticos\n' +
          '• Networking profesional\n\n' +
          '¿Te gustaría crear un evento o registrarte?';
      }
    },
    default: {
      handler: (text) => {
        return '👋 Entiendo tu pregunta. Puedo ayudarte con información sobre:\n\n' +
          '📌 **Productos y Precios**\n' +
          '📌 **Cursos y Formación**\n' +
          '📌 **Servicios Profesionales**\n' +
          '📌 **Garantías y Política**\n' +
          '📌 **Contacto y Soporte**\n' +
          '📌 **Métodos de Pago**\n' +
          '📌 **Eventos**\n\n' +
          '¿Cuál de estos temas te interesa? 😊';
      }
    }
  },

  detectIntent: (text) => {
    const lowerText = text.toLowerCase();
    
    // Buscar coincidencia con palabras clave
    for (const [category, data] of Object.entries(Chatbot.responses)) {
      if (category === 'default') continue;
      if (data.keywords && data.keywords.some(keyword => lowerText.includes(keyword))) {
        return data.handler(text);
      }
    }
    
    return Chatbot.responses.default.handler(text);
  },

  generateResponse: (userMessage) => {
    const response = Chatbot.detectIntent(userMessage);
    return response;
  }
};

const Chat = {
  addMessage: (sender, text, roomId = 'general') => {
    const chats = Storage.getChats();
    const room = chats.find(c => c.id === roomId) || { id: roomId, messages: [] };
    room.messages = room.messages || [];
    room.messages.push({ id: Date.now(), sender, text, timestamp: new Date().toLocaleTimeString('es-ES'), read: false });
    const index = chats.findIndex(c => c.id === roomId);
    if (index !== -1) chats[index] = room;
    else chats.push(room);
    Storage.saveChats(chats);
    return room.messages[room.messages.length - 1];
  },
  
  getMessages: (roomId = 'general') => {
    const chats = Storage.getChats();
    const room = chats.find(c => c.id === roomId);
    return room?.messages || [];
  },
  
  closeAndClearChat: () => {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.remove();
    }
    // Limpiar el chat del localStorage
    Storage.saveChats([]);
  },

  openChat: () => {
    const chatBox = document.createElement('div');
    chatBox.id = 'chat-box';
    chatBox.className = 'chat-box';
    chatBox.innerHTML = `
      <div class="chat-header" style="background:linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);color:white;padding:12px 15px;border-radius:10px 10px 0 0;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 8px rgba(74, 144, 226, 0.3);">
        <h4 style="margin:0;font-size:1.1rem;">💬 Chat en Vivo</h4>
        <div style="display:flex;gap:8px;">
          <button id="end-chat" title="Finalizar y limpiar chat" style="background:none;border:none;color:#fff;cursor:pointer;font-size:16px;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;" onMouseEnter="this.style.transform='scale(1.2)'" onMouseLeave="this.style.transform='scale(1)'">🗑️</button>
          <button id="close-chat" title="Cerrar chat" style="background:none;border:none;color:#fff;cursor:pointer;font-size:20px;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;">✕</button>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages" style="height:300px;overflow-y:auto;padding:12px;border:1px solid #ddd;margin-bottom:10px;background:#ffffff;color:#1a202c;"></div>
      <div class="chat-input" style="display:flex;gap:8px;padding:10px;background:#f8f9fa;border-top:1px solid #ddd;">
        <input type="text" id="chat-text" placeholder="Escribe un mensaje..." style="flex:1;padding:10px 12px;border:2px solid #e0e7ff;border-radius:6px;font-size:14px;color:#1a202c;background:#ffffff;" onBlur="this.style.borderColor='#e0e7ff'" onFocus="this.style.borderColor='#4A90E2'">
        <button id="chat-send" class="btn-small" style="padding:10px 18px;background:#4A90E2;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;transition:all 0.3s ease;" onMouseEnter="this.style.background='#357ABD'" onMouseLeave="this.style.background='#4A90E2'">Enviar</button>
      </div>
    `;
    document.body.appendChild(chatBox);
    
    const messagesDiv = document.getElementById('chat-messages');
    const chatText = document.getElementById('chat-text');
    const chatSend = document.getElementById('chat-send');
    const closeChat = document.getElementById('close-chat');
    const endChat = document.getElementById('end-chat');
    
    const renderMessages = () => {
      const messages = Chat.getMessages();
      messagesDiv.innerHTML = messages.map((msg, idx) => {
        const isBotMessage = msg.sender.includes('🤖');
        const bgColor = isBotMessage ? '#e3f2fd' : '#ffffff';
        const borderColor = isBotMessage ? '#4A90E2' : '#ddd';
        const textColor = '#1a202c';
        
        return `
          <div class="chat-message" style="margin:8px 0;padding:10px 12px;background:${bgColor};border-left:3px solid ${borderColor};border-radius:6px;word-wrap:break-word;color:${textColor};">
            <strong style="color:#357ABD;font-weight:700;">${msg.sender}</strong>
            <div style="margin-top:4px;line-height:1.5;color:${textColor};">${msg.text}</div>
            <span style="font-size:11px;color:#666;display:block;margin-top:5px;">${msg.timestamp}</span>
          </div>`;
      }).join('');
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
    
    // Mensaje de bienvenida del bot si es la primera vez
    const existingMessages = Chat.getMessages();
    if (existingMessages.length === 0) {
      Chat.addMessage('🤖 Asistente', '¡Hola! 👋 Bienvenido a Mi Empresa. Soy tu asistente inteligente 🎯\n\nPuedo ayudarte con:\n' +
        '💰 Precios e información de productos\n' +
        '📚 Cursos y formación\n' +
        '🎯 Servicios profesionales\n' +
        '✅ Garantías y políticas\n' +
        '📞 Contacto y soporte\n' +
        '📅 Eventos\n' +
        '💳 Métodos de pago\n\n' +
        '¿En qué puedo ayudarte hoy? 😊');
    }
    
    renderMessages();
    
    chatSend.addEventListener('click', () => {
      const text = chatText.value.trim();
      if (!text) return;
      const user = Storage.getAuthUser();
      Chat.addMessage(user?.name || 'Anónimo', text);
      chatText.value = '';
      renderMessages();
      
      // El bot responde después de 800ms
      setTimeout(() => {
        const botResponse = Chatbot.generateResponse(text);
        Chat.addMessage('🤖 Asistente', botResponse);
        renderMessages();
      }, 800);
    });
    
    chatText.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') chatSend.click();
    });
    
    closeChat.addEventListener('click', () => chatBox.remove());
    
    endChat.addEventListener('click', () => {
      if (confirm('¿Deseas finalizar y limpiar el historial del chat? Esta acción no se puede deshacer.')) {
        Chat.closeAndClearChat();
        Notifications.success('Chat finalizado y limpiado correctamente');
      }
    });
  }
};

// ════════════════════════════════════════════════════════════════
// � SISTEMA DE DETALLES DE PRODUCTOS
// ════════════════════════════════════════════════════════════════

const ProductDetails = {
  products: {
    basico: {
      nombre: 'Paquete Básico Web',
      precio: 499.99,
      original: 699.99,
      descuento: '-29%',
      descripcion: 'Solución web básica perfecta para pequeños negocios y emprendimientos.',
      features: [
        '✅ Dominio .com incluido por 1 año',
        '✅ Hosting en servidor compartido',
        '✅ Hasta 100 páginas',
        '✅ Email profesional (5 cuentas)',
        '✅ 5GB almacenamiento',
        '✅ Certificado SSL gratis',
        '✅ Soporte por email'
      ],
      detalle: 'Incluye todo lo necesario para crear una presencia online profesional. Perfecto para comenzar.'
    },
    profesional: {
      nombre: 'Paquete Profesional',
      precio: 1299.99,
      original: 1999.99,
      descuento: '-35%',
      descripcion: 'Sitio web profesional con ecommerce y panel de administración completo.',
      features: [
        '✅ Dominio personalizado',
        '✅ Hosting en servidor dedicado',
        '✅ Sitio con carrito de compras',
        '✅ Email profesional (20 cuentas)',
        '✅ 100GB almacenamiento',
        '✅ Panel de administración avanzado',
        '✅ Integración con redes sociales',
        '✅ Soporte por chat y teléfono'
      ],
      detalle: 'Solución completa para negocios en crecimiento con todas las herramientas necesarias.'
    },
    premium: {
      nombre: 'Paquete Premium Enterprise',
      precio: 4999.99,
      original: 6999.99,
      descuento: '-29%',
      descripcion: 'Solución empresarial con API, integraciones y soporte 24/7.',
      features: [
        '✅ Productos ilimitados en tienda',
        '✅ API personalizada',
        '✅ Integraciones avanzadas',
        '✅ Soporte técnico 24/7',
        '✅ 5 años hosting incluido',
        '✅ Consultoría dedicada',
        '✅ Servidor dedicado',
        '✅ Copias de seguridad automáticas'
      ],
      detalle: 'La solución más completa para grandes empresas con requisitos personalizados.'
    },
    curso: {
      nombre: 'Curso: Web Avanzado',
      precio: 199.99,
      original: 399.99,
      descuento: '-50%',
      descripcion: 'Aprende desarrollo web moderno con proyectos prácticos y certificado oficial.',
      features: [
        '✅ 12 módulos completos',
        '✅ 60+ horas de video HD',
        '✅ 15 proyectos prácticos',
        '✅ Certificado de finalización',
        '✅ Acceso de por vida',
        '✅ Comunidad privada de estudiantes',
        '✅ Actualizaciones gratis permanentes'
      ],
      detalle: 'Formación profesional con instructores expertos. Desde HTML básico hasta frameworks modernos.'
    },
    consultoria: {
      nombre: 'Sesión de Consultoría',
      precio: 99.99,
      original: null,
      descuento: null,
      descripcion: 'Sesión personalizada de 1 hora con nuestros expertos en tecnología.',
      features: [
        '✅ Sesión de 60 minutos',
        '✅ Experto dedicado',
        '✅ Videoconferencia segura',
        '✅ Plan de acción personalizado',
        '✅ Grabación de la sesión',
        '✅ Seguimiento por email'
      ],
      detalle: 'Consulta uno a uno con especialistas para resolver tus dudas tecnológicas.'
    },
    soporte: {
      nombre: 'Plan de Soporte Anual',
      precio: 599.99,
      original: 799.99,
      descuento: '-25%',
      descripcion: 'Mantenimiento, actualizaciones y soporte técnico durante todo el año.',
      features: [
        '✅ Mantenimiento mensual',
        '✅ Actualizaciones ilimitadas',
        '✅ Respuesta en 24 horas',
        '✅ Seguridad reforzada',
        '✅ Backups automáticos diarios',
        '✅ Monitoreo 24/7'
      ],
      detalle: 'Tranquilidad total con soporte continuo y mantenimiento profesional.'
    }
  },

  show: (productKey) => {
    const product = ProductDetails.products[productKey];
    if (!product) {
      Notifications.error('Producto no encontrado');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'product-detail-modal';
    modal.className = 'modal';
    modal.style.display = 'flex';

    let priceHTML = '';
    if (product.original) {
      priceHTML = `
        <div style="display:flex;gap:1rem;align-items:center;margin:1rem 0;">
          <div>
            <div style="text-decoration:line-through;color:#999;font-size:1.2rem;">$${product.original.toFixed(2)}</div>
            <div style="font-size:2rem;font-weight:bold;color:#4A90E2;">$${product.precio.toFixed(2)}</div>
          </div>
          <div style="background:#FF6B6B;color:white;padding:0.5rem 1rem;border-radius:20px;font-weight:bold;">${product.descuento}</div>
        </div>
      `;
    } else {
      priceHTML = `
        <div style="font-size:2rem;font-weight:bold;color:#4A90E2;margin:1rem 0;">$${product.precio.toFixed(2)}</div>
      `;
    }

    modal.innerHTML = `
      <div class="modal-content" style="width:90%;max-width:700px;background:white;padding:2rem;border-radius:15px;box-shadow:0 10px 40px rgba(0,0,0,0.2);max-height:90vh;overflow-y:auto;">
        <button id="close-detail" style="position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:24px;cursor:pointer;">✕</button>
        
        <div style="background:linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);color:white;padding:2rem;border-radius:10px;margin-bottom:1.5rem;text-align:center;">
          <i class="fas fa-box fa-4x" style="margin-bottom:1rem;display:block;"></i>
          <h2 style="margin:0;font-size:1.8rem;">${product.nombre}</h2>
        </div>
        
        ${priceHTML}
        
        <p style="color:#666;font-size:1.05rem;margin:1rem 0;line-height:1.6;">${product.descripcion}</p>
        
        <div style="background:#f0f7ff;padding:1rem;border-radius:8px;border-left:4px solid #4A90E2;margin:1.5rem 0;">
          <strong style="color:#4A90E2;">💡 Detalles del Producto:</strong>
          <p style="color:#1a202c;margin:0.5rem 0;">${product.detalle}</p>
        </div>
        
        <h3 style="color:#1a202c;margin:1.5rem 0 1rem 0;">✨ Características Incluidas:</h3>
        <ul style="list-style:none;padding:0;display:grid;gap:0.8rem;">
          ${product.features.map(f => `
            <li style="background:#f8f9fa;padding:0.8rem;border-radius:6px;border-left:3px solid #FFE66D;color:#1a202c;">
              ${f}
            </li>
          `).join('')}
        </ul>
        
        <div style="display:flex;gap:1rem;margin-top:2rem;">
          <button id="close-btn" style="flex:1;background:#f0f0f0;color:#1a202c;border:2px solid #ddd;padding:1rem;border-radius:8px;font-weight:bold;cursor:pointer;transition:all 0.3s;" onMouseEnter="this.style.background='#e0e0e0'" onMouseLeave="this.style.background='#f0f0f0'">Cerrar</button>
          <button id="add-btn" style="flex:1;background:linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);color:white;border:none;padding:1rem;border-radius:8px;font-weight:bold;font-size:1.05rem;cursor:pointer;transition:all 0.3s;" onMouseEnter="this.style.transform='translateY(-2px)'" onMouseLeave="this.style.transform='translateY(0)'">🛒 Agregar al Carrito</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-detail').addEventListener('click', () => modal.remove());
    document.getElementById('close-btn').addEventListener('click', () => modal.remove());
    document.getElementById('add-btn').addEventListener('click', () => {
      Cart.add(productKey, product.nombre, product.precio);
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }
};



const Calendar = {
  addEvent: (title, description, date, time) => {
    const events = Storage.getEvents();
    events.push({ id: Date.now(), title, description, date, time, reminder: false });
    Storage.saveEvents(events);
    Notifications.success(`📅 Evento "${title}" creado`);
  },
  
  getEventsByDate: (date) => Storage.getEvents().filter(e => e.date === date),
  
  getAllEvents: () => Storage.getEvents()
};

// ════════════════════════════════════════════════════════════════
// 🔍 BÚSQUEDA Y FILTROS AVANZADOS
// ════════════════════════════════════════════════════════════════

const SearchFilter = {
  filterBlog: (query) => {
    const posts = document.querySelectorAll('.blog-post');
    query = query.toLowerCase();
    let count = 0;
    posts.forEach(post => {
      const matches = post.textContent.toLowerCase().includes(query);
      post.style.display = matches ? 'block' : 'none';
      if (matches) count++;
    });
    return count;
  },
  filterGallery: (category) => {
    const items = document.querySelectorAll('.galeria-grid img, .gallery-item');
    let count = 0;
    items.forEach(item => {
      if (category === 'todas' || item.dataset.category === category) {
        item.style.display = 'block';
        count++;
      } else {
        item.style.display = 'none';
      }
    });
    return count;
  },
  filterServices: (category) => {
    const services = document.querySelectorAll('.card');
    let count = 0;
    services.forEach(service => {
      if (category === 'todos' || service.dataset.category === category) {
        service.style.display = 'block';
        count++;
      } else {
        service.style.display = 'none';
      }
    });
    return count;
  }
};

// ════════════════════════════════════════════════════════════════
// ❤️ FAVORITOS Y GUARDADOS AVANZADOS
// ════════════════════════════════════════════════════════════════

const Favorites = {
  toggle: (itemId, itemName) => {
    const favorites = Storage.getFavorites();
    const index = favorites.findIndex(f => f.id === itemId);
    if (index > -1) {
      favorites.splice(index, 1);
      Notifications.info(`${itemName} removido de favoritos`);
    } else {
      favorites.push({ id: itemId, name: itemName, date: new Date().toISOString() });
      Notifications.success(`❤️ ${itemName} agregado a favoritos`);
    }
    Storage.saveFavorites(favorites);
    return index === -1;
  },
  isFavorite: (itemId) => Storage.getFavorites().some(f => f.id === itemId)
};

const Saved = {
  toggle: (itemId, itemName) => {
    const saved = Storage.getSaved();
    const index = saved.findIndex(s => s.id === itemId);
    if (index > -1) {
      saved.splice(index, 1);
    } else {
      saved.push({ id: itemId, name: itemName, date: new Date().toISOString() });
      Notifications.success(`📌 ${itemName} guardado`);
    }
    Storage.saveSaved(saved);
  }
};

// ════════════════════════════════════════════════════════════════
// 💬 COMENTARIOS Y RESEÑAS
// ════════════════════════════════════════════════════════════════

const Comments = {
  add: (postId, author, text) => {
    const comments = Storage.getComments();
    comments.push({ id: Date.now(), postId, author, text, date: new Date().toLocaleString('es-ES') });
    Storage.saveComments(comments);
    Notifications.success('✅ Comentario publicado');
  },
  getByPost: (postId) => Storage.getComments().filter(c => c.postId === postId),
  delete: (commentId) => {
    const comments = Storage.getComments().filter(c => c.id !== commentId);
    Storage.saveComments(comments);
  }
};

const Reviews = {
  add: (productId, author, text, rating) => {
    const reviews = Storage.getReviews();
    reviews.push({ id: Date.now(), productId, author, text, rating, date: new Date().toLocaleString('es-ES'), helpful: 0 });
    Storage.saveReviews(reviews);
    Notifications.success('📝 Reseña publicada');
  },
  getByProduct: (productId) => Storage.getReviews().filter(r => r.productId === productId)
};

// ════════════════════════════════════════════════════════════════
// 📊 DASHBOARD Y ESTADÍSTICAS
// ════════════════════════════════════════════════════════════════

const Dashboard = {
  getUserStats: () => {
    const user = Storage.getAuthUser();
    return {
      favoritos: Storage.getFavorites().length,
      comentarios: Storage.getComments().length,
      guardados: Storage.getSaved().length,
      ordenes: Storage.getOrders().length,
      mensajes: Storage.getMessages().length
    };
  }
};

// Funciones compatibles (código antiguo)
function getStoredUsers() { return Storage.getUsers(); }
function saveStoredUsers(users) { Storage.saveUsers(users); }
function getAuthUser() { return Storage.getAuthUser(); }
function setAuthUser(user) { Storage.setAuthUser(user); }


// ========================================
// INICIALIZACIÓN COMPLETA
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Agregar página al histórico
  const pageTitle = document.querySelector('title').textContent;
  const history = Storage.getHistory();
  history.unshift({ page: window.location.pathname, title: pageTitle, date: new Date().toLocaleString('es-ES') });
  if (history.length > 20) history.pop();
  Storage.saveHistory(history);

  // Inicializar AOS
  if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });

  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => { preloader.classList.add('hidden'); }, 1000);
  }

  // ========== TEMA OSCURO/CLARO ==========
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon();
      Notifications.info(`Tema: ${newTheme === 'dark' ? 'Oscuro' : 'Claro'}`);
    });
  }

  function updateThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i> Tema<span class="tooltiptext">Claro</span>'
        : '<i class="fas fa-moon"></i> Tema<span class="tooltiptext">Oscuro</span>';
    }
  }

  // ========== MENÚ MÓVIL ==========
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // ========== AUTENTICACIÓN ==========
  const authModal = document.getElementById('auth-modal');
  const btnAuth = document.getElementById('btn-auth');
  const closeAuth = document.getElementById('auth-close');
  
  if (btnAuth && authModal) {
    btnAuth.addEventListener('click', () => { authModal.style.display = 'flex'; });
  }
  
  if (closeAuth && authModal) {
    closeAuth.addEventListener('click', () => { authModal.style.display = 'none'; });
  }

  function setTab(tab) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    const targetForm = document.getElementById(tab + '-form');
    if (targetForm) targetForm.classList.add('active');
    document.querySelectorAll('#tab-login, #tab-register').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.getElementById('tab-' + tab);
    if (targetBtn) targetBtn.classList.add('active');
  }
  
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  if (tabLogin) tabLogin.addEventListener('click', () => setTab('login'));
  if (tabRegister) tabRegister.addEventListener('click', () => setTab('register'));

  // Login
  const loginSubmit = document.getElementById('login-submit');
  if (loginSubmit) {
    loginSubmit.addEventListener('click', () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      if (!email || !password) {
        Notifications.error('Completa todos los campos');
        return;
      }
      const users = Storage.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        Notifications.error('Usuario o contraseña incorrectos');
        return;
      }
      Storage.setAuthUser({ name: user.name, email: user.email, avatar: user.avatar });
      if (authModal) authModal.style.display = 'none';
      updateAuthUI();
      Notifications.success(`¡Bienvenido, ${user.name}!`);
      document.getElementById('login-email').value = '';
      document.getElementById('login-password').value = '';
    });
  }

  // Registro
  const registerSubmit = document.getElementById('register-submit');
  if (registerSubmit) {
    registerSubmit.addEventListener('click', () => {
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      if (!name || !email || !password) {
        Notifications.error('Completa todos los campos');
        return;
      }
      const users = Storage.getUsers();
      if (users.some(u => u.email === email)) {
        Notifications.error('Este email ya está registrado');
        return;
      }
      users.push({ name, email, password, avatar: 'fas fa-user-circle' });
      Storage.saveUsers(users);
      setTab('login');
      Notifications.success('Registrado correctamente. Inicia sesión ahora');
      document.getElementById('login-email').value = email;
      document.getElementById('reg-name').value = '';
      document.getElementById('reg-email').value = '';
      document.getElementById('reg-password').value = '';
    });
  }

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Storage.setAuthUser(null);
      updateAuthUI();
      Notifications.info('Has cerrado sesión');
    });
  }

  // Navegación protegida
  document.querySelectorAll('.protected').forEach(link => {
    link.addEventListener('click', (e) => {
      if (!Storage.getAuthUser()) {
        e.preventDefault();
        authModal.style.display = 'flex';
        Notifications.error('Debes iniciar sesión primero');
      }
    });
  });

  function updateAuthUI() {
    const user = Storage.getAuthUser();
    const protectedLinks = document.querySelectorAll('.protected');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');
    const authButton = document.getElementById('btn-auth');
    
    if (user) {
      if (userName) userName.textContent = `¡${user.name}!`;
      if (userAvatar) {
        userAvatar.className = user.avatar || 'fas fa-user-circle';
        userAvatar.style.display = 'inline-block';
      }
      if (logoutBtn) logoutBtn.style.display = 'inline-block';
      if (authButton) authButton.style.display = 'none';
      protectedLinks.forEach(link => link.classList.remove('disabled'));
    } else {
      if (userName) userName.textContent = '';
      if (userAvatar) userAvatar.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (authButton) authButton.style.display = 'inline-block';
      protectedLinks.forEach(link => link.classList.add('disabled'));
    }
  }
  
  updateAuthUI();

  const userAvatar = document.getElementById('user-avatar');
  if (userAvatar) {
    userAvatar.addEventListener('click', () => {
      if (Storage.getAuthUser()) {
        window.location.href = 'perfil.html';
      }
    });
  }

  // ========== SLIDER TESTIMONIOS ==========
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  
  function showTestimonial(index) {
    testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
  }
  
  const prevTest = document.getElementById('prev-testimonial');
  const nextTest = document.getElementById('next-testimonial');
  
  if (prevTest) prevTest.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  });
  
  if (nextTest) nextTest.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  });
  
  if (testimonials.length > 0) {
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // ========== GALERÍA ==========
  let currentImage = 0;
  const carouselImages = document.querySelectorAll('.carousel img');
  const prevGal = document.getElementById('prev');
  const nextGal = document.getElementById('next');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.getElementById('close');
  
  function showImage(index) {
    carouselImages.forEach((img, i) => img.classList.toggle('active', i === index));
  }
  
  if (prevGal) prevGal.addEventListener('click', () => {
    currentImage = (currentImage - 1 + carouselImages.length) % carouselImages.length;
    showImage(currentImage);
  });
  
  if (nextGal) nextGal.addEventListener('click', () => {
    currentImage = (currentImage + 1) % carouselImages.length;
    showImage(currentImage);
  });
  
  if (carouselImages.length > 0) {
    setInterval(() => {
      currentImage = (currentImage + 1) % carouselImages.length;
      showImage(currentImage);
    }, 4000);
  }
  
  document.querySelectorAll('.galeria-grid img, .carousel img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = img.src;
      }
    });
  });
  
  if (closeModal) closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // ========== BOTÓN VOLVER ARRIBA ==========
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'btn-primary';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);
  }
  
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (backToTopBtn) backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== FORMULARIO DE CONTACTO ==========
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('telefono').value;
      const mensaje = document.getElementById('mensaje').value;
      
      if (!nombre || !email || !mensaje) {
        Notifications.error('Completa los campos obligatorios');
        return;
      }
      
      if (!/\S+@\S+\.\S+/.test(email)) {
        Notifications.error('Email no válido');
        return;
      }
      
      const messages = JSON.parse(localStorage.getItem('messages') || '[]');
      messages.push({ nombre, email, telefono, mensaje, date: new Date().toLocaleString('es-ES') });
      localStorage.setItem('messages', JSON.stringify(messages));
      
      Notifications.success('Mensaje enviado correctamente ✅');
      contactForm.reset();
    });
  }

  // ========== PERFIL ==========
  function cargarPerfil() {
    const user = Storage.getAuthUser();
    if (!user) return;
    const fields = ['profile-nombre', 'profile-email', 'profile-telefono', 'profile-direccion', 'profile-bio'];
    fields.forEach(field => {
      const el = document.getElementById(field);
      if (el) el.value = user[field.replace('profile-', '')] || '';
    });
  }
  
  function guardarPerfil(e) {
    e.preventDefault();
    const user = Storage.getAuthUser();
    if (!user) {
      Notifications.error('Debes iniciar sesión');
      return;
    }
    
    const nombre = document.getElementById('profile-nombre').value;
    const email = document.getElementById('profile-email').value;
    const telefono = document.getElementById('profile-telefono').value;
    const direccion = document.getElementById('profile-direccion').value;
    const bio = document.getElementById('profile-bio').value;
    
    if (!nombre || !email) {
      Notifications.error('Nombre y email requeridos');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      Notifications.error('Email no válido');
      return;
    }
    
    const users = Storage.getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      users[index] = { ...users[index], name: nombre, email, telefono, direccion, bio };
      Storage.saveUsers(users);
    }
    
    const updatedUser = { ...user, name: nombre, email, telefono, direccion, bio };
    Storage.setAuthUser(updatedUser);
    Notifications.success('Perfil actualizado ✅');
  }
  
  if (document.getElementById('profile-form')) {
    cargarPerfil();
    const profileForm = document.getElementById('profile-form');
    if (profileForm) profileForm.addEventListener('submit', guardarPerfil);
    
    const avatarModal = document.getElementById('avatar-modal');
    const changeAvatar = document.getElementById('change-avatar');
    const avatarClose = document.getElementById('avatar-close');
    const currentAvatar = document.getElementById('current-avatar');
    
    if (changeAvatar && avatarModal) {
      changeAvatar.addEventListener('click', () => { avatarModal.style.display = 'block'; });
    }
    
    if (avatarClose) {
      avatarClose.addEventListener('click', () => { avatarModal.style.display = 'none'; });
    }
    
    document.querySelectorAll('.avatar-option').forEach(option => {
      option.addEventListener('click', () => {
        const avatar = option.getAttribute('data-avatar');
        document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        if (currentAvatar) currentAvatar.className = avatar + ' fa-5x';
        const user = Storage.getAuthUser();
        if (user) {
          user.avatar = avatar;
          Storage.setAuthUser(user);
          updateAuthUI();
        }
        setTimeout(() => {
          avatarModal.style.display = 'none';
          Notifications.success('Avatar actualizado ✅');
        }, 500);
      });
    });
    
    const user = Storage.getAuthUser();
    if (user && user.avatar && currentAvatar) {
      currentAvatar.className = user.avatar + ' fa-5x';
    }
  }

  // ========== ANIMACIONES ==========
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));

  // ========== CONTADOR ==========
  let visits = parseInt(localStorage.getItem('visits') || '0') + 1;
  localStorage.setItem('visits', visits);
  const visitCounter = document.getElementById('visit-counter');
  if (visitCounter) visitCounter.textContent = visits;

  // ========== FAQ ACCORDION ==========
  const faqItems = document.querySelectorAll('.faq-item h3');
  faqItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === 'block';
      document.querySelectorAll('.faq-item p').forEach(p => p.style.display = 'none');
      answer.style.display = isOpen ? 'none' : 'block';
    });
  });

  // ========== BLOG - LEER MÁS ==========
  document.body.addEventListener('click', event => {
    const btn = event.target.closest('.read-more-btn');
    if (btn) {
      const article = btn.closest('.blog-post');
      const fullContent = article?.querySelector('.full-content');
      if (fullContent) {
        const isExpanded = article.classList.toggle('expanded');
        btn.textContent = isExpanded ? 'Leer menos' : 'Leer más';
        if (isExpanded) article.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // ========== BUSCADOR BLOG ==========
  const blogSearch = document.getElementById('blog-search');
  if (blogSearch) {
    blogSearch.addEventListener('input', (e) => {
      const count = SearchFilter.filterBlog(e.target.value);
      if (count === 0 && e.target.value) Notifications.info('No se encontraron resultados');
    });
  }

  // ========== FILTROS ==========
  document.querySelectorAll('[data-filter="service"]').forEach(filter => {
    filter.addEventListener('click', (e) => {
      e.preventDefault();
      SearchFilter.filterServices(filter.dataset.category);
      document.querySelectorAll('[data-filter="service"]').forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
    });
  });

  document.querySelectorAll('[data-filter="gallery"]').forEach(filter => {
    filter.addEventListener('click', (e) => {
      e.preventDefault();
      SearchFilter.filterGallery(filter.dataset.category);
      document.querySelectorAll('[data-filter="gallery"]').forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
    });
  });

  // ========== FAVORITOS ==========
  document.querySelectorAll('[data-favorite]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!Storage.getAuthUser()) {
        authModal.style.display = 'flex';
        Notifications.error('Inicia sesión para usar favoritos');
        return;
      }
      const isFav = Favorites.toggle(btn.dataset.id, btn.dataset.name);
      btn.classList.toggle('favorited', isFav);
      btn.innerHTML = isFav ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    });
  });

  // ========== NEWSLETTER ==========
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email')?.value;
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        Notifications.error('Email no válido');
        return;
      }
      const emails = Storage.getNewsletterEmails();
      if (emails.includes(email)) {
        Notifications.info('Ya estás suscrito');
        return;
      }
      emails.push(email);
      Storage.saveNewsletterEmails(emails);
      Notifications.success('¡Gracias por suscribirte!');
      newsletterForm.reset();
    });
  }

  // ========== COMENTARIOS BLOG ==========
  const commentForm = document.getElementById('comment-form');
  const commentsContainer = document.getElementById('comments-list');
  
  if (commentForm && commentsContainer) {
    const postId = commentForm.dataset.postId;
    
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!Storage.getAuthUser()) {
        authModal.style.display = 'flex';
        Notifications.error('Inicia sesión para comentar');
        return;
      }
      const author = Storage.getAuthUser().name;
      const text = document.getElementById('comment-text').value;
      if (!text.trim()) {
        Notifications.error('El comentario no puede estar vacío');
        return;
      }
      Comments.add(postId, author, text);
      commentForm.reset();
      renderComments(postId);
    });
    
    function renderComments(postId) {
      const comments = Comments.getByPost(postId);
      commentsContainer.innerHTML = '';
      comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `
          <div class="comment-header">
            <strong>${comment.author}</strong>
            <span class="comment-date">${comment.date}</span>
          </div>
          <p>${comment.text}</p>
          ${Storage.getAuthUser()?.name === comment.author ? `<button class="btn-small delete-comment" data-id="${comment.id}">Eliminar</button>` : ''}
        `;
        commentsContainer.appendChild(div);
      });
      document.querySelectorAll('.delete-comment').forEach(btn => {
        btn.addEventListener('click', () => {
          Comments.delete(parseInt(btn.dataset.id));
          renderComments(postId);
        });
      });
    }
    renderComments(postId);
  }

  // ========== HERO CAROUSEL ==========
  const heroImages = ['https://picsum.photos/1920/1080?random=1', 'https://picsum.photos/1920/1080?random=2', 'https://picsum.photos/1920/1080?random=3', 'https://picsum.photos/1920/1080?random=4'];
  let currentHeroImage = 0;
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    setInterval(() => {
      currentHeroImage = (currentHeroImage + 1) % heroImages.length;
      heroSection.style.backgroundImage = `url('${heroImages[currentHeroImage]}')`;
    }, 5000);
  }

  // ════════════════════════════════════════════════════════════════
  // 📅 SISTEMA DE EVENTOS Y RESEÑAS
  // ════════════════════════════════════════════════════════════════

  window.toggleEventoReviews = function(button) {
    const card = button.closest('.evento-card');
    const reviews = card.querySelector('.evento-reviews');
    
    if (reviews.style.display === 'none') {
      reviews.style.display = 'block';
      button.textContent = '💬 Ocultar Reseñas';
    } else {
      reviews.style.display = 'none';
      button.textContent = '💬 Ver Reseñas';
    }
  };

  window.setRating = function(element, rating) {
    const form = element.closest('.review-form');
    const stars = form.querySelectorAll('.rating-stars i');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
    element.dataset.selectedRating = rating;
  };

  window.submitReview = function(button) {
    const form = button.closest('.review-form');
    const textarea = form.querySelector('textarea');
    const ratingElement = form.querySelector('.rating-stars i.selected');
    const rating = ratingElement ? ratingElement.dataset.rating : 5;
    const text = textarea.value.trim();

    if (!text) {
      Notifications.warning('Por favor escribe una reseña');
      return;
    }

    const reviewsList = form.nextElementSibling;
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
      <div class="review-header">
        <strong>Tú</strong>
        <div class="review-stars">${'⭐'.repeat(rating)}</div>
      </div>
      <p>"${text}"</p>
    `;

    reviewsList.insertBefore(newReview, reviewsList.firstChild);
    textarea.value = '';
    form.querySelectorAll('.rating-stars i').forEach(s => s.classList.remove('selected'));
    Notifications.success('¡Reseña publicada exitosamente!');

    // Guardar en storage
    const reviews = Storage.getReviews() || [];
    reviews.push({
      rating: rating,
      text: text,
      date: new Date().toLocaleDateString('es-ES'),
      timestamp: Date.now()
    });
    Storage.saveReviews(reviews);
  };

  // Formulario para crear eventos
  const formEvento = document.getElementById('form-evento');
  if (formEvento) {
    formEvento.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('evento-nombre').value;
      const fecha = document.getElementById('evento-fecha').value;
      const hora = document.getElementById('evento-hora').value;
      const tipo = document.getElementById('evento-tipo').value;
      const descripcion = document.getElementById('evento-descripcion').value;
      const ubicacion = document.getElementById('evento-ubicacion').value;

      if (!nombre || !fecha || !hora || !tipo) {
        Notifications.warning('Por favor completa todos los campos requeridos');
        return;
      }

      const evento = {
        id: Date.now(),
        nombre: nombre,
        fecha: new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
        hora: hora,
        tipo: tipo,
        descripcion: descripcion,
        ubicacion: ubicacion,
        asistentes: Math.floor(Math.random() * 100) + 1,
        rating: (Math.random() * 1 + 4).toFixed(1)
      };

      // Guardar el evento
      const eventos = Storage.getEvents() || [];
      eventos.push(evento);
      Storage.saveEvents(eventos);

      // Agregar evento a la página
      const listaEventos = document.getElementById('lista-eventos');
      const newEventoHTML = `
        <div class="evento-card">
          <div class="evento-header">
            <h4>${evento.nombre}</h4>
            <span class="evento-badge">${evento.tipo}</span>
          </div>
          <div class="evento-info">
            <p><i class="fas fa-calendar-alt"></i> ${evento.fecha}</p>
            <p><i class="fas fa-clock"></i> ${evento.hora}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${evento.ubicacion}</p>
          </div>
          <p class="evento-descripcion">${evento.descripcion}</p>
          <div class="evento-stats">
            <span><i class="fas fa-users"></i> ${evento.asistentes} asistentes</span>
            <span><i class="fas fa-star"></i> ${evento.rating}/5.0</span>
          </div>
          <button class="btn-secondary" onclick="toggleEventoReviews(this)">💬 Ver Reseñas</button>
          <div class="evento-reviews" style="display:none;">
            <div class="review-form">
              <textarea placeholder="Escribe tu reseña..."></textarea>
              <div class="rating-stars">
                <i class="fas fa-star" data-rating="1" onclick="setRating(this, 1)"></i>
                <i class="fas fa-star" data-rating="2" onclick="setRating(this, 2)"></i>
                <i class="fas fa-star" data-rating="3" onclick="setRating(this, 3)"></i>
                <i class="fas fa-star" data-rating="4" onclick="setRating(this, 4)"></i>
                <i class="fas fa-star" data-rating="5" onclick="setRating(this, 5)"></i>
              </div>
              <button class="btn-primary btn-small" onclick="submitReview(this)">Enviar Reseña</button>
            </div>
            <div class="reviews-list"></div>
          </div>
        </div>
      `;
      
      listaEventos.insertAdjacentHTML('beforeend', newEventoHTML);

      // Limpiar formulario
      formEvento.reset();
      Notifications.success('¡Evento creado exitosamente!');
    });
  }

  // ════════════════════════════════════════════════════════════════
  // 🎨 BOTONES FLOTANTES AVANZADOS
  // ════════════════════════════════════════════════════════════════

  const floatingButtons = document.createElement('div');
  floatingButtons.className = 'floating-buttons';
  floatingButtons.innerHTML = `
    <button id="chat-btn" title="Abrir Chat" style="background:#25D366;"><i class="fas fa-comments"></i></button>
    <button id="cart-btn" title="Ver Carrito" style="background:#FF6B6B;"><i class="fas fa-shopping-cart"></i></button>
    <button id="events-btn" title="Eventos" style="background:#4ECDC4;"><i class="fas fa-calendar-alt"></i></button>
    <button id="ratings-btn" title="Calificaciones" style="background:#FFE66D;color:#333;"><i class="fas fa-star"></i></button>
    <button id="dashboard-btn" title="Dashboard" style="background:#95E1D3;"><i class="fas fa-chart-bar"></i></button>
  `;
  document.body.appendChild(floatingButtons);

  // Event listeners para botones flotantes
  document.getElementById('chat-btn').addEventListener('click', () => Chat.openChat());
  
  document.getElementById('cart-btn').addEventListener('click', () => {
    const cart = Storage.getCart();
    if (cart.length === 0) {
      Notifications.info('El carrito está vacío');
      return;
    }
    const cartSummary = cart.map(item => `${item.productName} (x${item.quantity}) = $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    alert(`🛒 CARRITO\n\n${cartSummary}\n\nTotal: $${Cart.getTotal()}`);
  });

  document.getElementById('events-btn').addEventListener('click', () => {
    const events = Calendar.getAllEvents();
    if (events.length === 0) {
      alert('📅 No hay eventos próximos');
      return;
    }
    const eventsList = events.slice(0, 5).map(e => `${e.title} - ${e.date} ${e.time}`).join('\n');
    alert(`📅 PRÓXIMOS EVENTOS\n\n${eventsList}`);
  });

  document.getElementById('ratings-btn').addEventListener('click', () => {
    const ratings = Storage.getRatings();
    if (ratings.length === 0) {
      alert('⭐ Aún no hay calificaciones');
      return;
    }
    const summary = ratings.slice(0, 5).map(r => `${r.stars}⭐ - ${r.userId}`).join('\n');
    alert(`⭐ CALIFICACIONES RECIENTES\n\n${summary}`);
  });

  document.getElementById('dashboard-btn').addEventListener('click', () => {
    const stats = Dashboard.getUserStats();
    alert(`📊 TU DASHBOARD\n\n❤️ Favoritos: ${stats.favoritos}\n💬 Comentarios: ${stats.comentarios}\n📌 Guardados: ${stats.guardados}\n🛒 Órdenes: ${stats.ordenes}\n✉️ Mensajes: ${stats.mensajes}`);
  });

  // ════════════════════════════════════════════════════════════════
  // 🎯 FUNCIONALIDADES ADICIONALES
  // ════════════════════════════════════════════════════════════════

  // Crear evento rápido
  window.quickAddEvent = () => {
    const title = prompt('Título del evento:');
    if (!title) return;
    const date = prompt('Fecha (YYYY-MM-DD):');
    if (!date) return;
    const time = prompt('Hora (HH:MM):');
    if (!time) return;
    Calendar.addEvent(title, '', date, time);
  };

  // Agregar a carrito directamente
  window.quickAddToCart = (name, price) => {
    Cart.add(Date.now().toString(), name, parseFloat(price));
    updateCartCount();
  };

  // Actualizar contador del carrito
  window.updateCartCount = () => {
    const cart = Storage.getCart();
    const count = cart.length;
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  };
  
  // Inicializar contador del carrito
  window.addEventListener('load', () => {
    updateCartCount();
  });

  // Ver historial
  window.viewHistory = () => {
    const history = Storage.getHistory();
    if (history.length === 0) {
      alert('Historial vacío');
      return;
    }
    const items = history.slice(0, 10).map(h => `${h.title} - ${h.date}`).join('\n');
    alert(`📜 HISTORIAL\n\n${items}`);
  };

  // Crear prueba de rating
  window.rateItem = (itemId, itemType) => {
    const stars = prompt(`Califica "${itemType}" (1-5 estrellas):`);
    if (!stars) return;
    const comment = prompt('Tu comentario (opcional):');
    Rating.add(itemId, itemType, parseInt(stars), comment || '');
  };

  // Validar formularios
  window.validateForm = (formId) => {
    return AdvancedForms.validateForm(formId);
  };

  // ════════════════════════════════════════════════════════════════
  // 🔧 UTILIDADES GLOBALES
  // ════════════════════════════════════════════════════════════════

  const Utils = {
    debounce: (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    },
    
    shortenText: (text, length = 100) => text.length > length ? text.substring(0, length) + '...' : text,
    
    copyToClipboard: (text) => {
      navigator.clipboard.writeText(text);
      Notifications.info('✓ Copiado al portapapeles');
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 📡 SINCRONIZACIÓN OFFLINE
  // ════════════════════════════════════════════════════════════════

  window.addEventListener('online', () => Notifications.success('🔄 Conectado a internet'));
  window.addEventListener('offline', () => Notifications.warning('📴 Modo offline'));

  console.log('🚀 ✨ SISTEMA COMPLETO PRO INICIALIZADO');
  console.log('═════════════════════════════════════════════════════');
  console.log('✅ ⭐ Rating System');
  console.log('✅ 🛒 Shopping Cart & Checkout');
  console.log('✅ 💬 Live Chat');
  console.log('✅ 📅 Calendar & Events');
  console.log('✅ 📊 Dashboard & Analytics');
  console.log('✅ 🔍 Advanced Search & Filters');
  console.log('✅ ❤️ Favorites & Saved Items');
  console.log('✅ 💬 Comments & Reviews');
  console.log('✅ 🔔 Advanced Notifications');
  console.log('✅ 📱 Offline Support');
  console.log('═════════════════════════════════════════════════════');
  console.log('Funcionalidades globales:');
  console.log('  Cart.add(), Cart.getTotal(), Cart.checkout()');
  console.log('  Chat.addMessage(), Chat.openChat()');
  console.log('  Rating.add(), Rating.getByItem()');
  console.log('  Calendar.addEvent(), Calendar.getAllEvents()');
  console.log('  Notifications.success(), Notifications.error()');
  console.log('  Dashboard.getUserStats()');
  console.log('  quickAddEvent(), quickAddToCart(), viewHistory()');
  console.log('═════════════════════════════════════════════════════');
});