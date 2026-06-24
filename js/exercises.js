/* ============================================
   JOINT JOURNEY - Exercise Programme
   ============================================ */

function initExercises() {
  if (!currentUser) return;

  // Auto-assign level if not set
  if (!currentUser.profile.programmeLevel) {
    assignProgrammeLevel();
  }

  const joint = currentUser.profile.joint;
  const jointLabel = joint === 'hip' ? 'Hip' : joint === 'knee' ? 'Knee' : 'Hip & Knee';
  const level = currentUser.profile.programmeLevel || 'standard';
  const levelInfo = PROGRAMME_LEVELS[level];

  document.getElementById('exercise-programme-type').textContent = jointLabel + ' Replacement - 12-Week Progressive Programme';

  // Render programme level indicator
  renderProgrammeLevelIndicator(level, levelInfo);

  renderWeekTabs();
  renderExerciseSession();
}

function renderProgrammeLevelIndicator(currentLevel, levelInfo) {
  const container = document.getElementById('programme-level-indicator');
  if (!container) return;

  let html = '<div class="programme-level-card" style="background:var(--surface); border-radius:var(--radius-lg); padding:var(--space-md); margin-bottom:var(--space-lg); border-left:4px solid ' + levelInfo.color + ';">';
  html += '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:var(--space-sm);">';
  html += '<div>';
  html += '<div style="font-weight:700; font-size:var(--font-size-base);">' + levelInfo.icon + ' ' + levelInfo.label + '</div>';
  html += '<div style="font-size:var(--font-size-sm); color:var(--text-secondary); margin-top:2px;">' + levelInfo.description + '</div>';
  html += '</div>';
  html += '<button class="btn btn-sm" style="white-space:nowrap;" onclick="showLevelSwitcher()">Change Level</button>';
  html += '</div>';
  html += '</div>';

  // Level switcher (hidden by default)
  html += '<div id="level-switcher" style="display:none; margin-bottom:var(--space-lg);">';
  html += '<div style="background:var(--surface); border-radius:var(--radius-lg); padding:var(--space-md);">';
  html += '<h4 style="margin-top:0; margin-bottom:var(--space-sm);">Choose Your Programme Level</h4>';
  html += '<p style="font-size:var(--font-size-sm); color:var(--text-secondary); margin-bottom:var(--space-md);">Your level was set based on your Oxford Score. Feel free to change it if it feels too easy or too hard.</p>';

  ['gentle', 'standard', 'active'].forEach(function(level) {
    var info = PROGRAMME_LEVELS[level];
    var isSelected = level === currentLevel;
    html += '<div class="level-option" onclick="changeProgrammeLevel(\'' + level + '\')" style="cursor:pointer; padding:var(--space-sm) var(--space-md); margin-bottom:var(--space-xs); border-radius:var(--radius-md); border:2px solid ' + (isSelected ? info.color : 'var(--border)') + '; background:' + (isSelected ? info.color + '10' : 'transparent') + ';">';
    html += '<div style="font-weight:' + (isSelected ? '700' : '600') + ';">' + info.icon + ' ' + info.name + ' <span style="font-weight:400; color:var(--text-muted); font-size:var(--font-size-sm);">(Oxford Score ' + info.scoreRange + ')</span></div>';
    html += '<div style="font-size:var(--font-size-sm); color:var(--text-secondary); margin-top:2px;">' + info.sessionsNote + '</div>';
    html += '</div>';
  });

  html += '</div></div>';

  container.innerHTML = html;
}

function showLevelSwitcher() {
  var el = document.getElementById('level-switcher');
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function renderWeekTabs() {
  const container = document.getElementById('week-tabs');
  const currentWeek = currentUser.progress.currentWeek || 1;
  let html = '';

  for (let w = 1; w <= 12; w++) {
    const isActive = w === currentWeek;
    const phase = w <= 4 ? '1' : w <= 8 ? '2' : '3';
    html += '<button class="tab ' + (isActive ? 'active' : '') + '" onclick="switchWeek(' + w + ')">Wk ' + w + '</button>';
  }

  container.innerHTML = html;
}

function switchWeek(week) {
  currentUser.progress.currentWeek = week;
  saveUser();

  // Update tab active state
  document.querySelectorAll('#week-tabs .tab').forEach((t, i) => {
    t.classList.toggle('active', i + 1 === week);
  });

  renderExerciseSession();
}

function renderExerciseSession() {
  const week = currentUser.progress.currentWeek || 1;
  const phase = getPhaseForWeek(week);
  const exercises = getExercisesForWeek(week);
  const today = new Date().toISOString().split('T')[0];
  const completedToday = currentUser.progress.exercisesCompleted[today] || [];

  // Session header
  document.getElementById('exercise-session-title').textContent = phase.name + ' - Week ' + week;
  document.getElementById('exercise-session-subtitle').textContent = phase.description + ' • ' + phase.sessionsPerWeek + ' sessions per week • ~25 minutes';

  const completedCount = exercises.filter(ex => completedToday.includes(ex.id)).length;
  const badge = document.getElementById('exercise-session-badge');
  badge.textContent = completedCount + '/' + exercises.length + ' done';

  // Exercise list
  const container = document.getElementById('exercise-list');
  let html = '';

  exercises.forEach(ex => {
    const prog = ex.progression.find(p => p.week === week) || ex.progression[ex.progression.length - 1];
    const done = completedToday.includes(ex.id);

    html += '<div class="exercise-item ' + (done ? 'completed' : '') + '" onclick="toggleExercise(\'' + ex.id + '\')">';
    html += '<div class="exercise-check">' + (done ? '✓' : '') + '</div>';
    html += '<div class="exercise-info">';
    html += '<div class="exercise-name">' + ex.name + '</div>';
    html += '<div class="exercise-detail">' + prog.sets + ' sets × ' + prog.reps + '</div>';
    html += '<div class="exercise-detail" style="margin-top:4px; color:var(--text-secondary);">' + ex.description + '</div>';
    if (ex.video) {
      html += '<a href="https://www.youtube.com/watch?v=' + ex.video + '" target="_blank" rel="noopener" class="video-link" style="display:inline-block; margin-top:8px; padding:6px 14px; background:var(--primary); color:white; border-radius:8px; text-decoration:none; font-size:0.85rem; font-weight:600;">📺 Watch Video</a>';
    }
    html += '</div></div>';
  });

  container.innerHTML = html;

  // Show celebration if all complete
  const completeSection = document.getElementById('exercise-complete-section');
  if (completedCount === exercises.length && exercises.length > 0) {
    completeSection.style.display = 'block';
  } else {
    completeSection.style.display = 'none';
  }
}

function toggleExercise(exerciseId) {
  const today = new Date().toISOString().split('T')[0];

  if (!currentUser.progress.exercisesCompleted[today]) {
    currentUser.progress.exercisesCompleted[today] = [];
  }

  const list = currentUser.progress.exercisesCompleted[today];
  const index = list.indexOf(exerciseId);

  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(exerciseId);

    // Update streak
    if (currentUser.progress.lastExerciseDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (currentUser.progress.lastExerciseDate === yesterday || !currentUser.progress.lastExerciseDate) {
        currentUser.progress.exerciseStreak = (currentUser.progress.exerciseStreak || 0) + 1;
      } else {
        currentUser.progress.exerciseStreak = 1;
      }
      currentUser.progress.lastExerciseDate = today;
    }
  }

  saveUser();
  renderExerciseSession();

  // Check if all exercises completed
  const exercises = getExercisesForWeek(currentUser.progress.currentWeek || 1);
  const allDone = exercises.every(ex => list.includes(ex.id));
  if (allDone) {
    showToast('🎉 Session complete! You\'re doing brilliantly!');
  }
}
