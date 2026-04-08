/**
 * 🔥 OPERACIONES FIREBASE - FUNCIONES DISPONIBLES
 * 
 * Este archivo contiene funciones lista para usar con Firestore
 * Copia estas funciones en tu script.js cuando estén configuradas
 */

// ============================================
// 🔐 AUTENTICACIÓN (Usuarios)
// ============================================

/**
 * REGISTRO - Crear nuevo usuario
 * Uso: await FirebaseOps.registerUser(email, password, nombre)
 */
const registerUser = async (email, password, nombre) => {
  try {
    // 1. Crear usuario en Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;

    // 2. Guardar datos en Firestore
    await db.collection("users").doc(uid).set({
      email: email,
      nombre: nombre,
      avatar: `https://ui-avatars.com/api/?name=${nombre}&background=random`,
      fechaRegistro: new Date(),
      activo: true
    });

    console.log("✅ Usuario registrado:", nombre);
    Notifications.show("success", `¡Bienvenido ${nombre}!`);
    return uid;
  } catch (error) {
    console.error("❌ Error registro:", error.message);
    Notifications.show("error", `Error: ${error.message}`);
    return null;
  }
};

/**
 * LOGIN - Iniciar sesión
 * Uso: await FirebaseOps.loginUser(email, password)
 */
const loginUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;

    // Obtener datos del usuario
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.data();

    console.log("✅ Usuario logueado:", userData.nombre);
    Notifications.show("success", `¡Hola ${userData.nombre}!`);
    
    // Guardar en localStorage también
    localStorage.setItem("user", JSON.stringify({
      uid: uid,
      email: userData.email,
      nombre: userData.nombre,
      avatar: userData.avatar
    }));

    return uid;
  } catch (error) {
    console.error("❌ Error login:", error.message);
    Notifications.show("error", `Email o contraseña incorrectos`);
    return null;
  }
};

/**
 * LOGOUT - Cerrar sesión
 * Uso: await FirebaseOps.logoutUser()
 */
const logoutUser = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("user");
    console.log("✅ Sesión cerrada");
    Notifications.show("success", "Sesión cerrada");
    window.location.reload();
  } catch (error) {
    console.error("❌ Error logout:", error.message);
  }
};

/**
 * OBTENER USUARIO ACTUAL
 * Uso: const usuario = await FirebaseOps.getCurrentUser()
 */
const getCurrentUser = async () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await db.collection("users").doc(firebaseUser.uid).get();
        resolve({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userDoc.data()
        });
      } else {
        resolve(null);
      }
    });
  });
};

// ============================================
// 💬 COMENTARIOS
// ============================================

/**
 * AGREGAR COMENTARIO
 * Uso: await FirebaseOps.addComment("blog-1", "Juan", "Muy bueno!")
 */
const addComment = async (postId, autor, texto) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Notifications.show("error", "Debes estar logueado para comentar");
      return null;
    }

    // Guardar en Firestore
    const docRef = await db.collection("comments").add({
      postId: postId,
      autor: autor,
      texto: texto,
      userId: currentUser.uid,
      fecha: new Date(),
      likes: 0
    });

    console.log("✅ Comentario agregado:", docRef.id);
    Notifications.show("success", "¡Comentario publicado!");
    return docRef.id;
  } catch (error) {
    console.error("❌ Error comentario:", error.message);
    Notifications.show("error", "Error al publicar comentario");
    return null;
  }
};

/**
 * OBTENER COMENTARIOS DE UN POST
 * Uso: const comentarios = await FirebaseOps.getCommentsByPost("blog-1")
 */
const getCommentsByPost = async (postId) => {
  try {
    const querySnapshot = await db.collection("comments")
      .where("postId", "==", postId)
      .orderBy("fecha", "desc")
      .get();

    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ ${comments.length} comentarios encontrados`);
    return comments;
  } catch (error) {
    console.error("❌ Error obtener comentarios:", error.message);
    return [];
  }
};

/**
 * ELIMINAR COMENTARIO
 * Uso: await FirebaseOps.deleteComment("commentId123")
 */
const deleteComment = async (commentId) => {
  try {
    const commentDoc = await db.collection("comments").doc(commentId).get();
    const comment = commentDoc.data();

    // Verificar que es el dueño
    if (comment.userId !== auth.currentUser.uid) {
      Notifications.show("error", "No puedes eliminar comentarios ajenos");
      return false;
    }

    await db.collection("comments").doc(commentId).delete();
    console.log("✅ Comentario eliminado");
    Notifications.show("success", "Comentario eliminado");
    return true;
  } catch (error) {
    console.error("❌ Error eliminar comentario:", error.message);
    return false;
  }
};

// ============================================
// ❤️ FAVORITOS
// ============================================

/**
 * AGREGAR A FAVORITOS
 * Uso: await FirebaseOps.addFavorite("blog-1", "Mi Artículo")
 */
const addFavorite = async (postId, postName) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Notifications.show("error", "Debes estar logueado para marcar favoritos");
      return false;
    }

    // Verificar que no esté ya agregado
    const exists = await db.collection("favorites")
      .where("userId", "==", currentUser.uid)
      .where("postId", "==", postId)
      .limit(1)
      .get();

    if (!exists.empty) {
      Notifications.show("info", "Ya está en favoritos");
      return false;
    }

    // Agregar
    await db.collection("favorites").add({
      userId: currentUser.uid,
      postId: postId,
      postName: postName,
      fecha: new Date()
    });

    console.log("✅ Agregado a favoritos:", postName);
    Notifications.show("success", "❤️ Agregado a favoritos");
    return true;
  } catch (error) {
    console.error("❌ Error agregar favorito:", error.message);
    return false;
  }
};

/**
 * OBTENER FAVORITOS DEL USUARIO
 * Uso: const favoritos = await FirebaseOps.getUserFavorites()
 */
const getUserFavorites = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return [];

    const querySnapshot = await db.collection("favorites")
      .where("userId", "==", currentUser.uid)
      .orderBy("fecha", "desc")
      .get();

    const favorites = [];
    querySnapshot.forEach((doc) => {
      favorites.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return favorites;
  } catch (error) {
    console.error("❌ Error obtener favoritos:", error.message);
    return [];
  }
};

/**
 * ELIMINAR DE FAVORITOS
 * Uso: await FirebaseOps.removeFavorite("blog-1")
 */
const removeFavorite = async (postId) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    const querySnapshot = await db.collection("favorites")
      .where("userId", "==", currentUser.uid)
      .where("postId", "==", postId)
      .get();

    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });

    console.log("✅ Eliminado de favoritos");
    Notifications.show("success", "Eliminado de favoritos");
    return true;
  } catch (error) {
    console.error("❌ Error eliminar favorito:", error.message);
    return false;
  }
};

// ============================================
// 📧 NEWSLETTER
// ============================================

/**
 * SUSCRIBIRSE A NEWSLETTER
 * Uso: await FirebaseOps.subscribeNewsletter("usuario@email.com")
 */
const subscribeNewsletter = async (email) => {
  try {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Notifications.show("error", "Email inválido");
      return false;
    }

    // Verificar que no esté ya suscrito
    const exists = await db.collection("newsletter")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!exists.empty) {
      Notifications.show("info", "Email ya suscrito");
      return false;
    }

    // Guardar
    await db.collection("newsletter").add({
      email: email,
      fechaSuscripcion: new Date(),
      activo: true
    });

    console.log("✅ Suscrito:", email);
    Notifications.show("success", "✉️ ¡Gracias por suscribirte!");
    return true;
  } catch (error) {
    console.error("❌ Error newsletter:", error.message);
    return false;
  }
};

/**
 * OBTENER SUSCRIPTORES (Solo Admin)
 * Uso: const suscriptores = await FirebaseOps.getNewsletterSubscribers()
 */
const getNewsletterSubscribers = async () => {
  try {
    const currentUser = auth.currentUser;
    // NOTA: Usar reglas de Firestore para proteger esto
    
    const querySnapshot = await db.collection("newsletter")
      .where("activo", "==", true)
      .get();

    const subscribers = [];
    querySnapshot.forEach((doc) => {
      subscribers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return subscribers;
  } catch (error) {
    console.error("❌ Error obtener suscriptores:", error.message);
    return [];
  }
};

// ============================================
// 📊 VISITANTES (Analytics)
// ============================================

/**
 * REGISTRAR VISITA
 * Uso: await FirebaseOps.trackVisit("index.html")
 */
const trackVisit = async (pagina) => {
  try {
    await db.collection("visitantes").add({
      pagina: pagina,
      fecha: new Date().toLocaleDateString(),
      timestamp: new Date(),
      userAgent: navigator.userAgent
    });

    console.log("📊 Visita registrada:", pagina);
  } catch (error) {
    console.error("❌ Error registrar visita:", error.message);
  }
};

/**
 * OBTENER ESTADÍSTICAS
 * Uso: const stats = await FirebaseOps.getStats()
 */
const getStats = async () => {
  try {
    const docCount = await db.collectionGroup("visitantes").count().get();
    const totalVisitas = docCount.data().count;

    return {
      totalVisitas: totalVisitas,
      timestamp: new Date(),
      ultimaActualizacion: new Date().toLocaleString()
    };
  } catch (error) {
    console.error("❌ Error obtener stats:", error.message);
    return null;
  }
};

// ============================================
// 📦 OBJETO PRINCIPAL (Use esto en script.js)
// ============================================

const FirebaseOps = {
  // Auth
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,

  // Comments
  addComment,
  getCommentsByPost,
  deleteComment,

  // Favorites
  addFavorite,
  getUserFavorites,
  removeFavorite,

  // Newsletter
  subscribeNewsletter,
  getNewsletterSubscribers,

  // Analytics
  trackVisit,
  getStats
};

console.log("🔥 FirebaseOps cargado - Usa: FirebaseOps.loginUser(), etc.");
