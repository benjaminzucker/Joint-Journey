/* ============================================
   JOINT JOURNEY - Authentication
   Firebase Auth + Firestore with localStorage cache
   ============================================ */

// Current user state
let currentUser = null;
let firebaseUid = null;

// ===== INIT =====
function initAuth() {
  // Listen for Firebase auth state changes
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in, load their data from Firestore
      firebaseUid = user.uid;
      loadUserFromFirestore(user.uid);
    } else {
      // No user signed in
      firebaseUid = null;
      currentUser = null;

      // Check URL hash for routing
      var hash = window.location.hash.replace('#', '');
      if (hash === 'signup') {
        showScreen('signup');
      } else {
        showScreen('login');
      }
    }
  });
}

// ===== LOAD USER FROM FIRESTORE =====
function loadUserFromFirestore(uid) {
  db.collection('users').doc(uid).get().then(function(doc) {
    if (doc.exists) {
      currentUser = doc.data();
      // Cache locally
      localStorage.setItem('jj_user', JSON.stringify(currentUser));

      if (currentUser.onboarded) {
        showMainApp();
      } else {
        showOnboarding();
      }
    } else {
      // User exists in Auth but not in Firestore (shouldn't happen, but handle it)
      console.warn('User authenticated but no Firestore document found');
      handleLogout();
    }
  }).catch(function(error) {
    console.error('Error loading user from Firestore:', error);
    // Fall back to localStorage cache
    var cached = localStorage.getItem('jj_user');
    if (cached) {
      currentUser = JSON.parse(cached);
      if (currentUser.onboarded) {
        showMainApp();
      } else {
        showOnboarding();
      }
      showToast('Loaded from cache (offline mode)', 'warning');
    } else {
      showScreen('login');
    }
  });
}

// ===== SHOW SCREENS =====
function showScreen(screen) {
  document.querySelectorAll('.auth-screen').forEach(function(s) { s.style.display = 'none'; });
  document.getElementById('onboarding').style.display = 'none';
  document.getElementById('main-app').style.display = 'none';
  document.getElementById('auth-screens').style.display = 'block';

  var el = document.getElementById('screen-' + screen);
  if (el) el.style.display = 'block';

  window.location.hash = screen;
}

function showOnboarding() {
  document.getElementById('auth-screens').style.display = 'none';
  document.getElementById('main-app').style.display = 'none';
  document.getElementById('onboarding').style.display = 'block';
}

function showMainApp() {
  document.getElementById('auth-screens').style.display = 'none';
  document.getElementById('onboarding').style.display = 'none';
  document.getElementById('main-app').style.display = 'block';

  initApp();
}

// ===== SIGNUP =====
function handleSignup(name, email, password, feedbackConsent, dataConsent) {
  // Validation
  if (!name || !email || !password) {
    showError('signup', 'Please fill in all fields.');
    return;
  }
  if (password.length < 6) {
    showError('signup', 'Password must be at least 6 characters.');
    return;
  }
  if (!dataConsent) {
    showError('signup', 'Please consent to data storage to create an account.');
    return;
  }

  // Disable button to prevent double-click
  var btn = document.querySelector('#signup-form button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Creating account...'; }

  // Create user with Firebase Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      firebaseUid = userCredential.user.uid;

      // Build user document
      currentUser = {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        onboarded: false,
        profile: {
          feedbackConsent: feedbackConsent || false,
          dataConsent: true,
          dataConsentDate: new Date().toISOString()
        },
        progress: {
          exercisesCompleted: {},
          exerciseStreak: 0,
          lastExerciseDate: null,
          currentWeek: 1,
          recipesTried: [],
          weightLog: [],
          moodLog: [],
          mindsetCompleted: [],
          gettingReadyViewed: [],
          shoppingList: []
        }
      };

      // Save to Firestore
      return db.collection('users').doc(firebaseUid).set(currentUser);
    })
    .then(function() {
      // Cache locally
      localStorage.setItem('jj_user', JSON.stringify(currentUser));
      showOnboarding();
    })
    .catch(function(error) {
      if (btn) { btn.disabled = false; btn.textContent = 'Create My Account'; }
      
      if (error.code === 'auth/email-already-in-use') {
        showError('signup', 'An account with this email already exists. Try logging in.');
      } else if (error.code === 'auth/invalid-email') {
        showError('signup', 'Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        showError('signup', 'Password is too weak. Please use at least 6 characters.');
      } else {
        showError('signup', 'Something went wrong. Please try again. (' + error.message + ')');
      }
    });
}

// ===== LOGIN =====
function handleLogin(email, password) {
  if (!email || !password) {
    showError('login', 'Please enter your email and password.');
    return;
  }

  var btn = document.querySelector('#login-form button[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Logging in...'; }

  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // onAuthStateChanged will handle the rest
      // Button will be re-enabled when page transitions
    })
    .catch(function(error) {
      if (btn) { btn.disabled = false; btn.textContent = 'Log In'; }

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        showError('login', 'Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        showError('login', 'Too many failed attempts. Please wait a few minutes and try again.');
      } else {
        showError('login', 'Something went wrong. Please try again.');
      }
    });
}

// ===== LOGOUT =====
function handleLogout() {
  auth.signOut().then(function() {
    currentUser = null;
    firebaseUid = null;
    localStorage.removeItem('jj_user');
    showScreen('login');
  }).catch(function(error) {
    console.error('Logout error:', error);
    // Force logout locally even if Firebase fails
    currentUser = null;
    firebaseUid = null;
    localStorage.removeItem('jj_user');
    showScreen('login');
  });
}

// ===== PASSWORD RESET (now actually works!) =====
function handlePasswordReset(email) {
  if (!email) {
    showError('reset', 'Please enter your email address.');
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(function() {
      document.getElementById('reset-error').style.display = 'none';
      document.getElementById('reset-success').style.display = 'block';
    })
    .catch(function(error) {
      if (error.code === 'auth/user-not-found') {
        // Don't reveal whether email exists (security best practice)
        document.getElementById('reset-error').style.display = 'none';
        document.getElementById('reset-success').style.display = 'block';
      } else {
        showError('reset', 'Something went wrong. Please try again.');
      }
    });
}

// ===== SAVE USER =====
// Debounced save to avoid hammering Firestore
var _saveTimeout = null;
function saveUser() {
  if (!currentUser) return;

  // Always update localStorage immediately (fast)
  localStorage.setItem('jj_user', JSON.stringify(currentUser));

  // Debounce Firestore writes (wait 2 seconds after last change)
  if (_saveTimeout) clearTimeout(_saveTimeout);
  _saveTimeout = setTimeout(function() {
    if (firebaseUid && currentUser) {
      db.collection('users').doc(firebaseUid).set(currentUser, { merge: true })
        .catch(function(error) {
          console.error('Error saving to Firestore:', error);
          // Data is safe in localStorage, will sync next time
        });
    }
  }, 2000);
}

// Force immediate save (for important actions like completing onboarding)
function saveUserNow() {
  if (!currentUser) return;
  localStorage.setItem('jj_user', JSON.stringify(currentUser));
  
  if (_saveTimeout) clearTimeout(_saveTimeout);
  if (firebaseUid) {
    return db.collection('users').doc(firebaseUid).set(currentUser, { merge: true })
      .catch(function(error) {
        console.error('Error saving to Firestore:', error);
      });
  }
  return Promise.resolve();
}

// ===== ERROR DISPLAY =====
function showError(form, message) {
  var el = document.getElementById(form + '-error');
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

// ===== FORM LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  // Login form
  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = document.getElementById('login-email').value.trim();
      var password = document.getElementById('login-password').value;
      handleLogin(email, password);
    });
  }

  // Signup form
  var signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('signup-name').value.trim();
      var email = document.getElementById('signup-email').value.trim();
      var password = document.getElementById('signup-password').value;
      var feedbackConsent = document.getElementById('signup-feedback-consent').checked;
      var dataConsent = document.getElementById('signup-data-consent').checked;
      handleSignup(name, email, password, feedbackConsent, dataConsent);
    });
  }

  // Reset form
  var resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = document.getElementById('reset-email').value.trim();
      handlePasswordReset(email);
    });
  }

  // Initialize auth
  initAuth();
});
