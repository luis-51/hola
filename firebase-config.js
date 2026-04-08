/**
 * 🔥 CONFIGURACIÓN DE FIREBASE FIRESTORE
 * Esta es la configuración para conectar tu app con Google Firebase
 * 
 * INSTRUCCIONES PREVIAS (VER FIREBASE_SETUP.md):
 * 1. Ve a https://firebase.google.com/
 * 2. Crea un proyecto (gratis)
 * 3. Copia tu "firebaseConfig" de aquí abajo
 * 4. Reemplaza los valores XXXXX con tus valores reales
 */

// IMPORTANTE: Reemplaza esto con TUS valores de Firebase
const firebaseConfig = {
  apiKey: "REEMPLAZA_CON_TU_API_KEY",
  authDomain: "REEMPLAZA_CON_TU_AUTH_DOMAIN.firebaseapp.com",
  projectId: "REEMPLAZA_CON_TU_PROJECT_ID",
  storageBucket: "REEMPLAZA_CON_TU_STORAGE_BUCKET.appspot.com",
  messagingSenderId: "REEMPLAZA_CON_TU_MESSAGING_SENDER_ID",
  appId: "REEMPLAZA_CON_TU_APP_ID"
};

// Inicializar Firebase
try {
  firebase.initializeApp(firebaseConfig);
  console.log("✅ Firebase inicializado correctamente");
} catch (error) {
  console.warn("⚠️ Firebase aún no está configurado. Revisa FIREBASE_SETUP.md");
}

// Obtener referencias a los servicios
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

/**
 * COLECCIONES EN FIRESTORE (Base de Datos)
 * 
 * /users/ - Usuarios registrados
 *   ├── uid (ID único)
 *   ├── email
 *   ├── nombre
 *   ├── avatar
 *   └── fechaRegistro
 *
 * /comments/ - Comentarios de blog
 *   ├── id (único)
 *   ├── postId
 *   ├── autor
 *   ├── texto
 *   ├── fecha
 *   └── userId
 *
 * /favorites/ - Artículos favoritos
 *   ├── id (único)
 *   ├── userId
 *   ├── postId
 *   └── fecha
 *
 * /newsletter/ - Suscriptores
 *   ├── id (único)
 *   ├── email
 *   └── fechaSuscripcion
 *
 * /visitantes/ - Estadísticas
 *   ├── id (único)
 *   ├── fecha
 *   ├── pagina
 *   └── timestamp
 */

// Crear referencias útiles
const dbCollections = {
  users: db.collection("users"),
  comments: db.collection("comments"),
  favorites: db.collection("favorites"),
  newsletter: db.collection("newsletter"),
  visitantes: db.collection("visitantes")
};

console.log("🔥 Firestore collections están disponibles en dbCollections");
