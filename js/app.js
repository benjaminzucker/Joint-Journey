/* ============================================
   JOINT JOURNEY - Core App Logic
   Navigation, onboarding, dashboard, utilities
   ============================================ */

let currentOnboardingStep = 1;
let onboardingData = {};

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ===== ONBOARDING =====
function selectOption(card, field, value) {
  onboardingData[field] = value;
  card.closest('.option-cards').querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

function nextOnboardingStep() {
  // Validate current step
  if (currentOnboardingStep === 1 && !onboardingData.joint) {
    showToast('Please select which joint you are having replaced.', 'warning');
    return;
  }
  if (currentOnboardingStep === 2 && !onboardingData.side) {
    showToast('Please select which side.', 'warning');
    return;
  }

  // Collect data from current step
  if (currentOnboardingStep === 3) {
    onboardingData.surgeryDate = document.getElementById('surgery-date').value || null;
  }
  if (currentOnboardingStep === 4) {
    onboardingData.age = document.getElementById('onboard-age').value || null;
    onboardingData.sex = document.getElementById('onboard-sex').value || null;
    onboardingData.height = document.getElementById('onboard-height').value || null;
    onboardingData.weight = document.getElementById('onboard-weight').value || null;
    onboardingData.activity = document.getElementById('onboard-activity').value || null;
  }

  // Move to next step
  currentOnboardingStep++;
  document.querySelectorAll('.onboarding-step').forEach(s => s.style.display = 'none');
  const next = document.querySelector('[data-step="' + currentOnboardingStep + '"]');
  if (next) next.style.display = 'block';

  // If entering step 5 (Oxford Score), render the questions
  if (currentOnboardingStep === 5) {
    renderOnboardingOxford();
  }
}

function prevOnboardingStep() {
  currentOnboardingStep--;
  document.querySelectorAll('.onboarding-step').forEach(s => s.style.display = 'none');
  const prev = document.querySelector('[data-step="' + currentOnboardingStep + '"]');
  if (prev) prev.style.display = 'block';
}

function completeOnboarding() {
  onboardingData.goal = document.getElementById('onboard-goal').value || '';

  // Save to user profile
  currentUser.profile = {
    joint: onboardingData.joint,
    side: onboardingData.side,
    surgeryDate: onboardingData.surgeryDate,
    age: onboardingData.age ? parseInt(onboardingData.age) : null,
    sex: onboardingData.sex,
    height: onboardingData.height ? parseFloat(onboardingData.height) : null,
    weight: onboardingData.weight ? parseFloat(onboardingData.weight) : null,
    activity: onboardingData.activity,
    goal: onboardingData.goal
  };

  // Log initial weight
  if (currentUser.profile.weight) {
    currentUser.progress.weightLog.push({
      date: new Date().toISOString().split('T')[0],
      weight: currentUser.profile.weight
    });
  }

  // Save Oxford Score from onboarding
  if (onboardingData.oxfordScorePreOp) {
    currentUser.progress.oxfordScorePreOp = onboardingData.oxfordScorePreOp;
  }
  if (onboardingData.oxfordScorePreOpHip) {
    currentUser.progress.oxfordScorePreOpHip = onboardingData.oxfordScorePreOpHip;
  }
  if (onboardingData.oxfordScorePreOpKnee) {
    currentUser.progress.oxfordScorePreOpKnee = onboardingData.oxfordScorePreOpKnee;
  }

  // Assign programme level based on Oxford Score
  if (typeof assignProgrammeLevel === 'function') {
    assignProgrammeLevel();
  }

  currentUser.onboarded = true;
  saveUserNow(); // Immediate save for important action

  showToast('Welcome to Joint Journey, ' + currentUser.name + '!');
  showMainApp();
}

// ===== NAVIGATION =====
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.app-page').forEach(p => p.style.display = 'none');

  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) target.style.display = 'block';

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector('[data-page="' + page + '"]');
  if (navItem) navItem.classList.add('active');

  // Close mobile menu
  closeMobileMenu();

  // Initialize page-specific content
  switch (page) {
    case 'dashboard': initDashboard(); break;
    case 'exercises': initExercises(); break;
    case 'nutrition': initNutrition(); break;
    case 'mindset': initMindset(); break;
    case 'getting-ready': initGettingReady(); break;
    case 'oxford-score': initOxfordScore(); break;
    case 'account': initAccount(); break;
  }

  // Scroll to top
  document.querySelector('.app-main').scrollTop = 0;
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const sidebar = document.getElementById('app-sidebar');
  sidebar.classList.toggle('open');

  // Create/toggle overlay
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.onclick = closeMobileMenu;
    document.querySelector('.app-layout').prepend(overlay);
  }
  overlay.classList.toggle('active');
}

function closeMobileMenu() {
  const sidebar = document.getElementById('app-sidebar');
  sidebar.classList.remove('open');
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.classList.remove('active');
}

// ===== INIT APP =====
function initApp() {
  if (!currentUser) return;

  // Set header greeting
  const headerGreeting = document.getElementById('header-greeting');
  if (headerGreeting) {
    headerGreeting.textContent = 'Hi, ' + currentUser.name + '!';
  }

  // Update streak
  updateStreak();

  // Show/hide joint-specific content
  updateJointVisibility();

  // Navigate to dashboard
  navigateTo('dashboard');
}

// ===== DASHBOARD =====
function initDashboard() {
  if (!currentUser) return;

  // Greeting
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';

  document.getElementById('dashboard-greeting').textContent = greeting + ', ' + currentUser.name + '!';
  document.getElementById('dashboard-subtitle').textContent = "Every step you take today brings you closer to your goal.";

  // Daily motivation
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  document.getElementById('daily-motivation').textContent = MOTIVATIONS[dayOfYear % MOTIVATIONS.length];

  // Stats
  const progress = currentUser.progress;
  document.getElementById('stat-streak').textContent = progress.exerciseStreak || 0;
  
  const totalExercises = Object.values(progress.exercisesCompleted || {}).reduce((sum, day) => {
    return sum + (Array.isArray(day) ? day.length : 0);
  }, 0);
  document.getElementById('stat-exercises').textContent = totalExercises;
  document.getElementById('stat-week').textContent = progress.currentWeek || 1;
  document.getElementById('stat-recipes').textContent = (progress.recipesTried || []).length;

  // Today's exercises preview
  renderDashboardExercises();

  // Mood check - check if already done today
  const today = new Date().toISOString().split('T')[0];
  const todayMood = (progress.moodLog || []).find(m => m.date === today);
  if (todayMood) {
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
    showMoodResponse(todayMood.mood);
  }

  // Goal
  if (currentUser.profile.goal) {
    document.getElementById('dashboard-goal').textContent = '"' + currentUser.profile.goal + '"';
    document.getElementById('dashboard-goal-card').style.display = 'block';
  }

  // Adaptive messages (mood, encouragement, nudges, week progression)
  renderAdaptiveMessages();

  // Mountain journey graphic
  renderMountainJourney();

  // Post-op check-in
  initPostOpCheckIn();
}

// ===== ADAPTIVE DASHBOARD MESSAGES =====
function renderAdaptiveMessages() {
  var container = document.getElementById('dashboard-adaptive-messages');
  if (!container || !currentUser) return;
  var html = '';
  var progress = currentUser.progress;
  var today = new Date().toISOString().split('T')[0];

  // 1. MOOD-BASED SUPPORT
  var moodLog = progress.moodLog || [];
  var recentMoods = moodLog.slice(-5);
  if (recentMoods.length >= 3) {
    var avgMood = recentMoods.reduce(function(s, m) { return s + m.mood; }, 0) / recentMoods.length;
    if (avgMood >= 4) {
      html += '<div class="card mb-md" style="background:var(--green-50);border-color:var(--green-200);">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">😊</span><div>';
      html += '<strong>You\'ve been in great spirits!</strong> That positive energy is brilliant for your recovery. Keep it up.';
      html += '</div></div></div>';
    } else if (avgMood <= 2.2) {
      html += '<div class="card mb-md" style="background:#FFF7ED;border-color:#FED7AA;">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">💛</span><div>';
      html += '<strong>We\'ve noticed things have been tough recently.</strong> That\'s completely normal, living with joint pain is exhausting and frustrating. Be kind to yourself. ';
      html += 'Our <a href="#" onclick="navigateTo(\'mindset\');return false;" style="font-weight:600;">Mindset modules</a> have some techniques that might help.';
      html += '</div></div></div>';
    }
  }

  // 2. EXERCISE ENCOURAGEMENT (positive only)
  var streak = progress.exerciseStreak || 0;
  var lastEx = progress.lastExerciseDate;
  if (streak >= 7) {
    html += '<div class="card mb-md" style="background:var(--green-50);border-color:var(--green-200);">';
    html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">🔥</span><div>';
    html += '<strong>' + streak + ' days in a row!</strong> You\'re building an incredible habit. Your body is getting stronger every day.';
    html += '</div></div></div>';
  } else if (streak >= 3) {
    html += '<div class="card mb-md" style="background:var(--green-50);border-color:var(--green-200);">';
    html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">💪</span><div>';
    html += '<strong>' + streak + ' days in a row!</strong> Great consistency, that\'s what makes the real difference.';
    html += '</div></div></div>';
  } else if (lastEx && lastEx !== today) {
    // Haven't exercised today yet but have before - just a gentle welcome
    var daysSince = Math.round((Date.now() - new Date(lastEx).getTime()) / 86400000);
    if (daysSince >= 3) {
      html += '<div class="card mb-md" style="background:var(--green-50);border-color:var(--green-200);">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">👋</span><div>';
      html += '<strong>Welcome back!</strong> Great to see you. Ready to pick up where you left off?';
      html += '</div></div></div>';
    }
  }

  // 3. WEEK PROGRESSION PROMPT
  var currentWeek = progress.currentWeek || 1;
  var totalWeeks = getTotalProgrammeWeeks();
  // Count sessions completed in current week (Mon-Sun)
  var now = new Date();
  var dayOfWeek = now.getDay() || 7; // 1=Mon...7=Sun
  var mondayMs = now.getTime() - (dayOfWeek - 1) * 86400000;
  var sessionsThisWeek = 0;
  for (var d = 0; d < 7; d++) {
    var dateStr = new Date(mondayMs + d * 86400000).toISOString().split('T')[0];
    if (progress.exercisesCompleted[dateStr] && progress.exercisesCompleted[dateStr].length > 0) {
      sessionsThisWeek++;
    }
  }
  if (sessionsThisWeek >= 3 && currentWeek < totalWeeks && dayOfWeek >= 5) {
    html += '<div class="card mb-md" style="background:#EFF6FF;border-color:#BFDBFE;">';
    html += '<div class="flex items-center justify-between gap-md flex-wrap">';
    html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">⬆️</span><div>';
    html += '<strong>' + sessionsThisWeek + ' sessions this week!</strong> Ready to move to Week ' + (currentWeek + 1) + '?';
    html += '</div></div>';
    html += '<button class="btn btn-sm btn-primary" onclick="advanceWeek()">Move to Week ' + (currentWeek + 1) + '</button>';
    html += '</div></div>';
  }

  // 4. SURGERY PREPARATION NUDGES
  if (currentUser.profile.surgeryDate) {
    var surgeryMs = new Date(currentUser.profile.surgeryDate).getTime();
    var daysToSurgery = Math.round((surgeryMs - Date.now()) / 86400000);
    var viewed = progress.gettingReadyViewed || [];

    if (daysToSurgery > 0 && daysToSurgery <= 56 && daysToSurgery > 28 && viewed.indexOf('home-prep') === -1) {
      // 4-8 weeks: home prep
      html += '<div class="card mb-md" style="background:#F0FDF4;border-color:#BBF7D0;">';
      html += '<div class="flex items-center justify-between gap-md flex-wrap">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">🏠</span><div>';
      html += '<strong>' + Math.ceil(daysToSurgery / 7) + ' weeks to go.</strong> Good time to start thinking about preparing your home for recovery.';
      html += '</div></div>';
      html += '<button class="btn btn-sm" onclick="navigateTo(\'getting-ready\');setTimeout(function(){showGettingReadySection(\'home-prep\')},100);">Read Guide →</button>';
      html += '</div></div>';
    } else if (daysToSurgery > 0 && daysToSurgery <= 28 && daysToSurgery > 14 && viewed.indexOf('surgery-day') === -1) {
      // 2-4 weeks: surgery day guide
      html += '<div class="card mb-md" style="background:#F0FDF4;border-color:#BBF7D0;">';
      html += '<div class="flex items-center justify-between gap-md flex-wrap">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">📋</span><div>';
      html += '<strong>' + Math.ceil(daysToSurgery / 7) + ' weeks to surgery.</strong> Have a read through "What Happens on Surgery Day" so you know what to expect.';
      html += '</div></div>';
      html += '<button class="btn btn-sm" onclick="navigateTo(\'getting-ready\');setTimeout(function(){showGettingReadySection(\'surgery-day\')},100);">Read Guide →</button>';
      html += '</div></div>';
    } else if (daysToSurgery > 0 && daysToSurgery <= 14 && daysToSurgery > 7 && viewed.indexOf('surgeon-questions') === -1) {
      // 1-2 weeks: surgeon questions
      html += '<div class="card mb-md" style="background:#F0FDF4;border-color:#BBF7D0;">';
      html += '<div class="flex items-center justify-between gap-md flex-wrap">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">❓</span><div>';
      html += '<strong>' + daysToSurgery + ' days to go.</strong> Have a look at the questions you might want to ask at your pre-op appointment.';
      html += '</div></div>';
      html += '<button class="btn btn-sm" onclick="navigateTo(\'getting-ready\');setTimeout(function(){showGettingReadySection(\'surgeon-questions\')},100);">See Questions →</button>';
      html += '</div></div>';
    } else if (daysToSurgery > 0 && daysToSurgery <= 7 && viewed.indexOf('hospital-bag') === -1) {
      // <1 week: hospital bag
      html += '<div class="card mb-md" style="background:#FFF7ED;border-color:#FED7AA;">';
      html += '<div class="flex items-center justify-between gap-md flex-wrap">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">🧳</span><div>';
      html += '<strong>' + daysToSurgery + ' days to go!</strong> Time to pack your hospital bag, here\'s the checklist.';
      html += '</div></div>';
      html += '<button class="btn btn-sm" onclick="navigateTo(\'getting-ready\');setTimeout(function(){showGettingReadySection(\'hospital-bag\')},100);">Pack My Bag →</button>';
      html += '</div></div>';
    } else if (daysToSurgery > 0 && daysToSurgery <= 3) {
      // Final days
      html += '<div class="card mb-md" style="background:var(--green-50);border-color:var(--green-200);">';
      html += '<div class="flex items-center gap-md"><span style="font-size:1.5rem;">⭐</span><div>';
      html += '<strong>Your surgery is nearly here.</strong> You\'ve done the work. You\'ve prepared. Trust yourself, you\'re going into this in the best shape you can be.';
      html += '</div></div></div>';
    }
  }

  container.innerHTML = html;
}

function advanceWeek() {
  var currentWeek = currentUser.progress.currentWeek || 1;
  var totalWeeks = getTotalProgrammeWeeks();
  if (currentWeek < totalWeeks) {
    currentUser.progress.currentWeek = currentWeek + 1;
    saveUser();
    showToast('⬆️ Moved to Week ' + (currentWeek + 1) + '!');
    initDashboard();
  }
}

function renderDashboardExercises() {
  const container = document.getElementById('dashboard-exercises-preview');
  const exercises = getExercisesForWeek(currentUser.progress.currentWeek || 1);
  const today = new Date().toISOString().split('T')[0];
  const completedToday = currentUser.progress.exercisesCompleted[today] || [];

  let html = '';
  const previewExercises = exercises.slice(0, 4);
  previewExercises.forEach(ex => {
    const week = currentUser.progress.currentWeek || 1;
    const mappedWeek = getProgressionWeek(week);
    const prog = ex.progression.find(p => p.week === mappedWeek) || ex.progression[0];
    const done = completedToday.includes(ex.id);
    html += '<div class="exercise-item ' + (done ? 'completed' : '') + '" style="cursor:default;">';
    html += '<div class="exercise-check">' + (done ? '✓' : '') + '</div>';
    html += '<div class="exercise-info">';
    html += '<div class="exercise-name">' + ex.name + '</div>';
    html += '<div class="exercise-detail">' + prog.sets + ' × ' + prog.reps + '</div>';
    html += '</div></div>';
  });

  if (exercises.length > 4) {
    html += '<p style="color:var(--text-muted); font-size:var(--font-size-sm); margin-top:var(--space-sm);">+ ' + (exercises.length - 4) + ' more exercises</p>';
  }

  container.innerHTML = html;
}

// ===== MOOD =====
function setMood(value) {
  const today = new Date().toISOString().split('T')[0];
  
  // Remove existing mood for today
  currentUser.progress.moodLog = (currentUser.progress.moodLog || []).filter(m => m.date !== today);
  currentUser.progress.moodLog.push({ date: today, mood: value });
  
  // Update UI
  document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
  showMoodResponse(value);
  
  saveUser();
}

function showMoodResponse(value) {
  // Highlight the selected button
  const buttons = document.querySelectorAll('.mood-btn');
  const moodValues = [5, 4, 3, 2, 1];
  moodValues.forEach((v, i) => {
    if (v === value && buttons[i]) buttons[i].classList.add('selected');
  });

  // Show response
  const responses = MOOD_RESPONSES[value];
  const response = responses[Math.floor(Math.random() * responses.length)];
  const responseEl = document.getElementById('mood-response');
  responseEl.innerHTML = '<div class="alert alert-success"><p style="margin:0">' + response + '</p></div>';
  responseEl.style.display = 'block';
}

// ===== STREAK =====
function updateStreak() {
  const progress = currentUser.progress;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (progress.lastExerciseDate === today) {
    // Already exercised today, streak is current
  } else if (progress.lastExerciseDate === yesterday) {
    // Exercised yesterday, streak continues (will increment when they exercise today)
  } else if (progress.lastExerciseDate && progress.lastExerciseDate !== today && progress.lastExerciseDate !== yesterday) {
    // Missed a day, reset streak
    progress.exerciseStreak = 0;
    saveUser();
  }
}

// ===== JOINT VISIBILITY =====
function updateJointVisibility() {
  const joint = currentUser.profile.joint;
  const hipCard = document.getElementById('hip-precautions-card');
  const kneeCard = document.getElementById('knee-guide-card');

  if (hipCard) {
    hipCard.style.display = (joint === 'knee') ? 'none' : 'block';
  }
  if (kneeCard) {
    kneeCard.style.display = (joint === 'hip') ? 'none' : 'block';
  }
}

// ===== ACCOUNT =====
function initAccount() {
  if (!currentUser) return;
  
  document.getElementById('account-name').value = currentUser.name;
  document.getElementById('account-email').value = currentUser.email;
  document.getElementById('account-joint').value = currentUser.profile.joint;
  document.getElementById('account-surgery-date').value = currentUser.profile.surgeryDate || '';
  document.getElementById('account-goal').value = currentUser.profile.goal || '';

  // Member since
  const created = new Date(currentUser.createdAt);
  document.getElementById('account-member-since').textContent = created.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Progress
  const week = currentUser.progress.currentWeek || 1;
  const totalWeeks = getTotalProgrammeWeeks();
  const weekPercent = Math.round((week / totalWeeks) * 100);
  document.getElementById('account-exercise-progress').style.width = weekPercent + '%';
  document.getElementById('account-exercise-text').textContent = 'Week ' + week + ' of ' + totalWeeks;

  const mindsetDone = (currentUser.progress.mindsetCompleted || []).length;
  document.getElementById('account-mindset-progress').style.width = Math.round((mindsetDone / 6) * 100) + '%';
  document.getElementById('account-mindset-text').textContent = mindsetDone + ' of 6 completed';

  const readyDone = (currentUser.progress.gettingReadyViewed || []).length;
  document.getElementById('account-ready-progress').style.width = Math.round((readyDone / 6) * 100) + '%';
  document.getElementById('account-ready-text').textContent = readyDone + ' of 6 sections viewed';
}

function saveAccount() {
  currentUser.name = document.getElementById('account-name').value.trim();
  currentUser.profile.joint = document.getElementById('account-joint').value;
  currentUser.profile.surgeryDate = document.getElementById('account-surgery-date').value || null;
  currentUser.profile.goal = document.getElementById('account-goal').value;

  saveUser();
  updateJointVisibility();
  showToast('Changes saved! ✅');
}

// ===== DYNAMIC PROGRAMME LENGTH =====
// Calculates total programme weeks based on surgery date
function getTotalProgrammeWeeks() {
  if (!currentUser || !currentUser.profile.surgeryDate) return 12; // default
  var surgery = new Date(currentUser.profile.surgeryDate);
  var created = new Date(currentUser.createdAt);
  var now = new Date();
  var start = created < now ? created : now;
  var diffMs = surgery.getTime() - start.getTime();
  var totalWeeks = Math.round(diffMs / (7 * 86400000));
  // Clamp between 4 and 24 weeks
  if (totalWeeks < 4) totalWeeks = 4;
  if (totalWeeks > 24) totalWeeks = 24;
  return totalWeeks;
}

// Splits total weeks into 3 phases proportionally
// Returns { phase1: { start, end, weeks }, phase2: ..., phase3: ... }
function getPhaseWeekRanges() {
  var total = getTotalProgrammeWeeks();
  // Split roughly into thirds, with phase3 getting any remainder
  var p1 = Math.max(1, Math.floor(total / 3));
  var p2 = Math.max(1, Math.floor(total / 3));
  var p3 = Math.max(1, total - p1 - p2);
  return {
    total: total,
    phase1: { start: 1, end: p1, weeks: p1 },
    phase2: { start: p1 + 1, end: p1 + p2, weeks: p2 },
    phase3: { start: p1 + p2 + 1, end: total, weeks: p3 }
  };
}

// Maps user's current week within a phase to the closest original progression week (1-4, 5-8, or 9-12)
function getProgressionWeek(userWeek) {
  var ranges = getPhaseWeekRanges();
  var phaseKey, phaseRange, origStart;
  
  if (userWeek <= ranges.phase1.end) {
    phaseKey = 'phase1'; phaseRange = ranges.phase1; origStart = 1;
  } else if (userWeek <= ranges.phase2.end) {
    phaseKey = 'phase2'; phaseRange = ranges.phase2; origStart = 5;
  } else {
    phaseKey = 'phase3'; phaseRange = ranges.phase3; origStart = 9;
  }
  
  // Position within this phase (0 to 1)
  var posInPhase = (userWeek - phaseRange.start) / Math.max(1, phaseRange.weeks - 1);
  if (phaseRange.weeks === 1) posInPhase = 0;
  // Map to original 4-week span (e.g. 1-4, 5-8, 9-12)
  var origWeek = Math.round(origStart + posInPhase * 3);
  return Math.min(origWeek, origStart + 3);
}

// ===== UTILITY: Get exercises for current week =====
function getExercisesForWeek(week) {
  var joint = currentUser.profile.joint;
  var exercises = getExerciseDataForLevel(joint);
  var ranges = getPhaseWeekRanges();

  if (week <= ranges.phase1.end) return exercises.phase1.exercises;
  if (week <= ranges.phase2.end) return exercises.phase2.exercises;
  return exercises.phase3.exercises;
}

function getPhaseForWeek(week) {
  var joint = currentUser.profile.joint;
  var exercises = getExerciseDataForLevel(joint);
  var ranges = getPhaseWeekRanges();

  if (week <= ranges.phase1.end) return exercises.phase1;
  if (week <= ranges.phase2.end) return exercises.phase2;
  return exercises.phase3;
}

// ===== DATE FORMATTING =====
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// ===== ONBOARDING OXFORD SCORE =====
var onboardingOxfordJoint = null; // tracks which joint we're currently asking about
var onboardingOxfordPhase = 'first'; // 'first' or 'second' (for 'both' joints)

function renderOnboardingOxford() {
  var joint = onboardingData.joint;
  var container = document.getElementById('onboarding-oxford-questions');
  
  // Determine which joint to ask about first
  if (joint === 'both') {
    onboardingOxfordJoint = 'hip';
    onboardingOxfordPhase = 'first';
  } else {
    onboardingOxfordJoint = joint; // 'hip' or 'knee'
    onboardingOxfordPhase = 'first';
  }

  renderOnboardingOxfordQuestions(onboardingOxfordJoint);
}

function renderOnboardingOxfordQuestions(jointType) {
  var container = document.getElementById('onboarding-oxford-questions');
  var questions = jointType === 'hip' ? OXFORD_HIP_QUESTIONS : OXFORD_KNEE_QUESTIONS;
  var jointLabel = jointType === 'hip' ? 'Hip' : 'Knee';
  var joint = onboardingData.joint;
  
  var html = '';
  
  if (joint === 'both') {
    html += '<div class="alert alert-info mb-lg"><strong>Oxford ' + jointLabel + ' Score.</strong> ' +
      (onboardingOxfordPhase === 'first' ? 'We\'ll do your hip first, then your knee.' : 'Now let\'s do your knee.') + '</div>';
  }

  questions.forEach(function(q, i) {
    html += '<div class="oxford-question mb-lg" style="padding: var(--space-lg); background: var(--bg-secondary); border-radius: var(--radius-lg);">';
    html += '<p style="font-weight: 600; margin-bottom: var(--space-md);">' + (i + 1) + '. ' + q.text + '</p>';
    q.options.forEach(function(opt) {
      html += '<label style="display: flex; align-items: flex-start; gap: var(--space-sm); cursor: pointer; padding: var(--space-xs) 0;">';
      html += '<input type="radio" name="onboard-ox-' + q.id + '" value="' + opt.score + '" onchange="updateOnboardingOxfordProgress()" style="margin-top: 3px;">';
      html += '<span style="font-size: var(--font-size-sm);">' + opt.label + '</span>';
      html += '</label>';
    });
    html += '</div>';
  });

  container.innerHTML = html;
  
  // Reset continue button
  document.getElementById('onboarding-oxford-continue').style.display = 'none';
  updateOnboardingOxfordProgress();
}

function updateOnboardingOxfordProgress() {
  var questions = onboardingOxfordJoint === 'hip' ? OXFORD_HIP_QUESTIONS : OXFORD_KNEE_QUESTIONS;
  var answered = 0;
  
  questions.forEach(function(q) {
    var selected = document.querySelector('input[name="onboard-ox-' + q.id + '"]:checked');
    if (selected) answered++;
  });

  var progressEl = document.getElementById('onboarding-oxford-progress');
  if (progressEl) {
    progressEl.textContent = answered + ' of 12 answered';
    progressEl.style.color = answered === 12 ? 'var(--primary)' : 'var(--text-muted)';
  }

  var continueBtn = document.getElementById('onboarding-oxford-continue');
  if (continueBtn) {
    continueBtn.style.display = answered === 12 ? 'inline-flex' : 'none';
  }
}

function submitOnboardingOxford() {
  var questions = onboardingOxfordJoint === 'hip' ? OXFORD_HIP_QUESTIONS : OXFORD_KNEE_QUESTIONS;
  var totalScore = 0;
  var answers = {};

  questions.forEach(function(q) {
    var selected = document.querySelector('input[name="onboard-ox-' + q.id + '"]:checked');
    if (selected) {
      var score = parseInt(selected.value);
      totalScore += score;
      answers[q.id] = score;
    }
  });

  var scoreData = {
    score: totalScore,
    answers: answers,
    date: new Date().toISOString(),
    joint: onboardingOxfordJoint
  };

  // Store in onboarding data
  var joint = onboardingData.joint;

  if (joint === 'both') {
    if (onboardingOxfordPhase === 'first') {
      // Save hip score, show knee questionnaire
      onboardingData.oxfordScorePreOpHip = scoreData;
      onboardingOxfordJoint = 'knee';
      onboardingOxfordPhase = 'second';
      showToast('✅ Hip score recorded! Now let\'s do your knee.');
      renderOnboardingOxfordQuestions('knee');
      // Scroll to top of the step
      document.querySelector('.onboarding-wrapper').scrollTop = 0;
      return;
    } else {
      // Save knee score, move to next step
      onboardingData.oxfordScorePreOpKnee = scoreData;
    }
  } else {
    // Single joint
    onboardingData.oxfordScorePreOp = scoreData;
  }

  showToast('✅ Your Oxford Score has been recorded!');
  
  // Move to step 6 (Goal)
  currentOnboardingStep = 6;
  document.querySelectorAll('.onboarding-step').forEach(function(s) { s.style.display = 'none'; });
  var next = document.querySelector('[data-step="6"]');
  if (next) next.style.display = 'block';
}
