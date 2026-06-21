/* ============================================
   JOINT JOURNEY - Authentication
   Using localStorage for MVP
   (Replace with Firebase when ready to deploy)
   ============================================ */

// Current user state
let currentUser = null;

// ===== INIT =====
function initAuth() {
  // Check for existing session
  const savedUser = localStorage.getItem('jj_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    if (currentUser.onboarded) {
      showMainApp();
    } else {
      showOnboarding();
    }
  } else {
    // Check URL hash for routing
    const hash = window.location.hash.replace('#', '');
    if (hash === 'signup') {
      showScreen('signup');
    } else {
      showScreen('login');
    }
  }
}

// ===== SHOW SCREENS =====
function showScreen(screen) {
  // Hide all auth screens
  document.querySelectorAll('.auth-screen').forEach(s => s.style.display = 'none');
  document.getElementById('onboarding').style.display = 'none';
  document.getElementById('main-app').style.display = 'none';
  document.getElementById('auth-screens').style.display = 'block';

  // Show requested screen
  const el = document.getElementById('screen-' + screen);
  if (el) el.style.display = 'block';

  // Update URL hash
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

  // Initialize the app
  initApp();
}

// ===== SIGNUP =====
function handleSignup(name, email, password, feedbackConsent) {
  // Basic validation
  if (!name || !email || !password) {
    showError('signup', 'Please fill in all fields.');
    return;
  }
  if (password.length < 6) {
    showError('signup', 'Password must be at least 6 characters.');
    return;
  }

  // Check if email already exists
  const users = JSON.parse(localStorage.getItem('jj_users') || '{}');
  if (users[email]) {
    showError('signup', 'An account with this email already exists. Try logging in.');
    return;
  }

  // Create user
  currentUser = {
    name: name,
    email: email,
    password: password, // In production, NEVER store plain text passwords
    createdAt: new Date().toISOString(),
    onboarded: false,
    profile: {
      feedbackConsent: feedbackConsent || false
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

  // Save user
  users[email] = currentUser;
  localStorage.setItem('jj_users', JSON.stringify(users));
  localStorage.setItem('jj_user', JSON.stringify(currentUser));

  // Show onboarding
  showOnboarding();
}

// ===== LOGIN =====
function handleLogin(email, password) {
  if (!email || !password) {
    showError('login', 'Please enter your email and password.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('jj_users') || '{}');
  const user = users[email];

  if (!user || user.password !== password) {
    showError('login', 'Invalid email or password. Please try again.');
    return;
  }

  currentUser = user;
  localStorage.setItem('jj_user', JSON.stringify(currentUser));

  if (currentUser.onboarded) {
    showMainApp();
  } else {
    showOnboarding();
  }
}

// ===== LOGOUT =====
function handleLogout() {
  currentUser = null;
  localStorage.removeItem('jj_user');
  showScreen('login');
}

// ===== PASSWORD RESET (simulated) =====
function handlePasswordReset(email) {
  if (!email) {
    showError('reset', 'Please enter your email address.');
    return;
  }
  
  // Just show success message (no actual email in MVP)
  document.getElementById('reset-error').style.display = 'none';
  document.getElementById('reset-success').style.display = 'block';
}

// ===== SAVE USER =====
function saveUser() {
  if (currentUser) {
    localStorage.setItem('jj_user', JSON.stringify(currentUser));
    
    // Also update in users list
    const users = JSON.parse(localStorage.getItem('jj_users') || '{}');
    users[currentUser.email] = currentUser;
    localStorage.setItem('jj_users', JSON.stringify(users));
  }
}

// ===== ERROR DISPLAY =====
function showError(form, message) {
  const el = document.getElementById(form + '-error');
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

// ===== FORM LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      handleLogin(email, password);
    });
  }

  // Signup form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const feedbackConsent = document.getElementById('signup-feedback-consent').checked;
      handleSignup(name, email, password, feedbackConsent);
    });
  }

  // Reset form
  const resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('reset-email').value.trim();
      handlePasswordReset(email);
    });
  }

  // Initialize auth
  initAuth();
});
