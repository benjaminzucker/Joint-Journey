/* ============================================
   JOINT JOURNEY - Firebase Configuration
   
   To set up:
   1. Go to https://console.firebase.google.com
   2. Create a new project called "joint-journey"
   3. Go to Project Settings > General > Your Apps > Web App
   4. Register a web app and copy the config below
   5. Enable Authentication > Email/Password
   6. Create a Firestore Database (production mode)
   7. Set Firestore rules (see firestore.rules below)
   ============================================ */

const firebaseConfig = {
  apiKey: "AIzaSyDDOGYJ09k7bAdO3bVbs7BqyYmdoVZiM4Y",
  authDomain: "jointjourney-4cf64.firebaseapp.com",
  projectId: "jointjourney-4cf64",
  storageBucket: "jointjourney-4cf64.firebasestorage.app",
  messagingSenderId: "722156871283",
  appId: "1:722156871283:web:3bcb318d7143cd997b5406",
  measurementId: "G-922WX390KR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// References
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence (so app works offline)
db.enablePersistence({ synchronizeTabs: true }).catch(function(err) {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.log('Firestore persistence unavailable (multiple tabs)');
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support persistence
    console.log('Firestore persistence not supported in this browser');
  }
});
