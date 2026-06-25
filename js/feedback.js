/* ============================================
   JOINT JOURNEY - Feedback
   A) Always-available floating feedback button
   C) Smart contextual prompts on the dashboard
   Saves to Firestore 'feedback' collection (read in console),
   with a resilient mirror copy in the user's own document.
   ============================================ */

// ===== STATE =====
var _feedbackRating = 0;        // current rating in the modal (0 = none)
var _feedbackContext = 'button'; // 'button' or a prompt id

// ===== CORE: SAVE FEEDBACK =====
// type: 'button' | 'prompt'  context: page name or prompt id
function saveFeedback(rating, message, contactConsent, type, context) {
  if (!currentUser) return Promise.resolve();

  var entry = {
    uid: firebaseUid || null,
    name: currentUser.name || null,
    email: currentUser.email || null,
    rating: rating || null,
    message: message || '',
    contactConsent: !!contactConsent,
    type: type || 'button',
    context: context || null,
    createdAt: new Date().toISOString()
  };

  // 1) Resilient mirror: always store in the user's own doc (existing rules allow this)
  if (!currentUser.progress.feedbackGiven) currentUser.progress.feedbackGiven = [];
  currentUser.progress.feedbackGiven.push(entry);
  saveUser();

  // 2) Write to the dedicated 'feedback' collection (needs the create rule deployed).
  //    Fails gracefully - the mirror copy above is the safety net.
  if (typeof db !== 'undefined' && firebaseUid) {
    return db.collection('feedback').add(entry).catch(function (err) {
      console.warn('Feedback collection write failed (mirror copy saved):', err);
    });
  }
  return Promise.resolve();
}

// ===== A) FLOATING BUTTON + MODAL =====
function openFeedbackModal(context) {
  _feedbackContext = context || 'button';
  _feedbackRating = 0;
  renderFeedbackStars();

  var msg = document.getElementById('feedback-message');
  if (msg) msg.value = '';

  // Pre-tick contact consent from what they chose at signup
  var consent = document.getElementById('feedback-contact-consent');
  if (consent) consent.checked = !!(currentUser && currentUser.profile && currentUser.profile.feedbackConsent);

  var overlay = document.getElementById('feedback-modal');
  if (overlay) overlay.classList.add('active');
}

function closeFeedbackModal(event) {
  if (event && event.target && event.target.id !== 'feedback-modal' && event.type === 'click') {
    // clicked inside the modal, ignore
    return;
  }
  var overlay = document.getElementById('feedback-modal');
  if (overlay) overlay.classList.remove('active');
}

function setFeedbackRating(value) {
  _feedbackRating = value;
  renderFeedbackStars();
}

function renderFeedbackStars() {
  var container = document.getElementById('feedback-stars');
  if (!container) return;
  var html = '';
  for (var i = 1; i <= 5; i++) {
    var filled = i <= _feedbackRating;
    html += '<button type="button" class="feedback-star' + (filled ? ' filled' : '') +
      '" onclick="setFeedbackRating(' + i + ')" aria-label="' + i + ' star' + (i > 1 ? 's' : '') + '">' +
      (filled ? '★' : '☆') + '</button>';
  }
  container.innerHTML = html;
}

function submitFeedbackModal() {
  var message = (document.getElementById('feedback-message') || {}).value || '';
  var contact = (document.getElementById('feedback-contact-consent') || {}).checked || false;

  if (!_feedbackRating && !message.trim()) {
    showToast('Please add a rating or a comment first.', 'warning');
    return;
  }

  saveFeedback(_feedbackRating, message.trim(), contact, 'button', _feedbackContext);
  closeFeedbackModal();
  showToast('Thank you for your feedback! 💚');
}

// ===== C) CONTEXTUAL PROMPTS (rendered on the dashboard) =====
// Each prompt is shown once; once answered or dismissed it never returns.
function renderFeedbackPrompts() {
  var container = document.getElementById('dashboard-feedback-prompt');
  if (!container || !currentUser) return;

  var progress = currentUser.progress;
  var asked = progress.feedbackPrompts || [];

  // Helper to check if a prompt has been shown/answered/dismissed already
  function done(id) { return asked.indexOf(id) !== -1; }

  // Count total completed exercise sessions (days with >=1 exercise)
  var sessionDays = Object.keys(progress.exercisesCompleted || {}).filter(function (d) {
    return progress.exercisesCompleted[d] && progress.exercisesCompleted[d].length > 0;
  }).length;

  var currentWeek = progress.currentWeek || 1;

  // Days to surgery (if a date is set)
  var daysToSurgery = null;
  if (currentUser.profile.surgeryDate) {
    daysToSurgery = Math.round((new Date(currentUser.profile.surgeryDate).getTime() - Date.now()) / 86400000);
  }

  // Decide which (single) prompt to show, in priority order
  var prompt = null;

  if (daysToSurgery !== null && daysToSurgery >= 0 && daysToSurgery <= 5 && !done('pre-surgery')) {
    prompt = {
      id: 'pre-surgery',
      emoji: '⭐',
      question: "You're nearly at your surgery date. How has Joint Journey been for you?",
    };
  } else if (currentWeek >= 2 && !done('week2')) {
    prompt = {
      id: 'week2',
      emoji: '💪',
      question: "You've reached Week " + currentWeek + "! How are you finding the exercises so far?",
    };
  } else if (sessionDays >= 1 && !done('first-session')) {
    prompt = {
      id: 'first-session',
      emoji: '🎉',
      question: "You've done your first session! How was it?",
    };
  }

  if (!prompt) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }

  var html = '';
  html += '<div class="card mb-lg" style="border:2px solid var(--primary); background: var(--green-50);">';
  html += '<div class="flex items-center gap-md mb-md"><span style="font-size:1.5rem;">' + prompt.emoji + '</span>';
  html += '<strong>' + prompt.question + '</strong></div>';

  // Quick star rating
  html += '<div id="prompt-stars-' + prompt.id + '" class="feedback-stars mb-md">';
  for (var i = 1; i <= 5; i++) {
    html += '<button type="button" class="feedback-star" onclick="setPromptRating(\'' + prompt.id + '\',' + i + ')" aria-label="' + i + ' star">☆</button>';
  }
  html += '</div>';

  // Optional comment
  html += '<textarea id="prompt-message-' + prompt.id + '" class="form-textarea mb-md" rows="2" placeholder="Anything you\'d like to tell us? (optional)"></textarea>';

  // Actions
  html += '<div class="flex gap-sm">';
  html += '<button class="btn btn-primary btn-sm" onclick="submitPrompt(\'' + prompt.id + '\')">Send Feedback</button>';
  html += '<button class="btn btn-ghost btn-sm" onclick="dismissPrompt(\'' + prompt.id + '\')">Maybe later</button>';
  html += '</div>';
  html += '</div>';

  container.innerHTML = html;
  container.style.display = 'block';
}

// Track rating per prompt id
var _promptRatings = {};
function setPromptRating(id, value) {
  _promptRatings[id] = value;
  var container = document.getElementById('prompt-stars-' + id);
  if (!container) return;
  var buttons = container.querySelectorAll('.feedback-star');
  buttons.forEach(function (btn, idx) {
    var filled = (idx + 1) <= value;
    btn.classList.toggle('filled', filled);
    btn.textContent = filled ? '★' : '☆';
  });
}

function submitPrompt(id) {
  var rating = _promptRatings[id] || 0;
  var message = (document.getElementById('prompt-message-' + id) || {}).value || '';

  if (!rating && !message.trim()) {
    showToast('Please add a rating or a comment first.', 'warning');
    return;
  }

  saveFeedback(rating, message.trim(),
    !!(currentUser.profile && currentUser.profile.feedbackConsent), 'prompt', id);

  markPromptDone(id);
  showToast('Thank you for your feedback! 💚');
  renderFeedbackPrompts();
}

function dismissPrompt(id) {
  markPromptDone(id);
  renderFeedbackPrompts();
}

function markPromptDone(id) {
  if (!currentUser.progress.feedbackPrompts) currentUser.progress.feedbackPrompts = [];
  if (currentUser.progress.feedbackPrompts.indexOf(id) === -1) {
    currentUser.progress.feedbackPrompts.push(id);
  }
  saveUser();
}
