import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5TRBLdXcyf7vKqx2DEeeTGKyA459yI6Y", 
  authDomain: "metridoors.firebaseapp.com", 
  projectId: "metridoors", 
  storageBucket: "metridoors.appspot.com", 
  messagingSenderId: "825359692122", 
  appId: "1:825359692122:web:9d670437204398c3400363", 
  measurementId: "G-CPN0ZWE3BB" 
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o objeto firestore, não o valor diretamente
export { db };
