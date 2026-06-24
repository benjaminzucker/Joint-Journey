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

  currentUser.onboarded = true;
  saveUser();

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

  // Mountain journey graphic
  renderMountainJourney();

  // Post-op check-in
  initPostOpCheckIn();
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
