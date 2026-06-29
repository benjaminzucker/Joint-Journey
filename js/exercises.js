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

  var totalWeeks = getTotalProgrammeWeeks();
  document.getElementById('exercise-programme-type').textContent = jointLabel + ' Replacement - ' + totalWeeks + '-Week Progressive Programme';

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
  const totalWeeks = getTotalProgrammeWeeks();
  const ranges = getPhaseWeekRanges();
  let html = '';

  for (let w = 1; w <= totalWeeks; w++) {
    const isActive = w === currentWeek;
    // Add phase separator labels
    if (w === ranges.phase1.start) html += '<span style="font-size:0.7rem;color:var(--text-muted);padding:0 4px;white-space:nowrap;">Phase 1</span>';
    if (w === ranges.phase2.start) html += '<span style="font-size:0.7rem;color:var(--text-muted);padding:0 4px;white-space:nowrap;">Phase 2</span>';
    if (w === ranges.phase3.start) html += '<span style="font-size:0.7rem;color:var(--text-muted);padding:0 4px;white-space:nowrap;">Phase 3</span>';
    html += '<button class="tab ' + (isActive ? 'active' : '') + '" onclick="switchWeek(' + w + ')">Wk ' + w + '</button>';
  }

  container.innerHTML = html;
}

function switchWeek(week) {
  currentUser.progress.currentWeek = week;
  saveUser();
  renderWeekTabs();
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
    const mappedWeek = getProgressionWeek(week);
    const prog = ex.progression.find(p => p.week === mappedWeek) || ex.progression[ex.progression.length - 1];
    const done = completedToday.includes(ex.id);
    const intensity = getExerciseIntensity(ex.id);
    const adj = applyIntensity(prog, intensity);

    html += '<div class="exercise-item ' + (done ? 'completed' : '') + '" onclick="toggleExercise(\'' + ex.id + '\')">';
    html += '<div class="exercise-check">' + (done ? '✓' : '') + '</div>';
    html += '<div class="exercise-info">';
    html += '<div class="exercise-name">' + ex.name + '</div>';
    html += '<div class="exercise-detail">' + adj.sets + ' sets × ' + adj.reps + (intensity !== 0 ? ' <span class="intensity-tag">' + adj.label + '</span>' : '') + '</div>';
    html += '<div class="exercise-detail" style="margin-top:4px; color:var(--text-secondary);">' + ex.description + '</div>';
    if (ex.video) {
      html += '<button type="button" class="video-link" onclick="openVideoModal(\'' + ex.video + '\', \'' + encodeURIComponent(ex.name) + '\', event)" style="display:inline-block; margin-top:8px; padding:6px 14px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer; font-size:0.85rem; font-weight:600;">📺 Watch Video</button>';
    }
    html += '</div>';
    // Per-exercise difficulty controls (intensity nudge) - stopPropagation so taps here don't tick the exercise
    html += '<div class="exercise-difficulty" onclick="event.stopPropagation()" title="Find this too easy or too hard? Adjust just this exercise.">';
    html += '<button type="button" class="diff-btn" aria-label="Make this exercise harder" ' + (intensity >= 2 ? 'disabled' : '') + ' onclick="adjustExerciseIntensity(\'' + ex.id + '\', 1, event)">▲</button>';
    html += '<span class="diff-label">' + adj.label + '</span>';
    html += '<button type="button" class="diff-btn" aria-label="Make this exercise easier" ' + (intensity <= -2 ? 'disabled' : '') + ' onclick="adjustExerciseIntensity(\'' + ex.id + '\', -1, event)">▼</button>';
    html += '</div>';
    html += '</div>';
  });

  container.innerHTML = html;

  // Show celebration if all complete. NB: confetti is fired from toggleExercise()
  // at the moment the final exercise is ticked - never from this passive render
  // (which runs on every page open / week switch).
  const completeSection = document.getElementById('exercise-complete-section');
  const allDone = completedCount === exercises.length && exercises.length > 0;
  completeSection.style.display = allDone ? 'block' : 'none';
}

function toggleExercise(exerciseId) {
  const today = new Date().toISOString().split('T')[0];

  if (!currentUser.progress.exercisesCompleted[today]) {
    currentUser.progress.exercisesCompleted[today] = [];
  }

  const list = currentUser.progress.exercisesCompleted[today];
  const index = list.indexOf(exerciseId);

  // Was the session already complete before this tap? (used to fire confetti
  // only on the transition into "all complete", not when toggling an already-done set)
  const exercisesForWeek = getExercisesForWeek(currentUser.progress.currentWeek || 1);
  const wasComplete = exercisesForWeek.length > 0 && exercisesForWeek.every(ex => list.includes(ex.id));

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

  // Check if all exercises completed - celebrate only on the transition into
  // "all complete" (i.e. this tap finished the session), never on a passive render.
  const exercises = getExercisesForWeek(currentUser.progress.currentWeek || 1);
  const allDone = exercises.every(ex => list.includes(ex.id));
  if (allDone && !wasComplete) {
    showToast('🎉 Session complete! You\'re doing brilliantly!');
    const completeSection = document.getElementById('exercise-complete-section');
    if (window.JJEffects && completeSection) {
      JJEffects.confettiFromElement(completeSection, { count: 110 });
    }
  }
}

/* ============================================
   PER-EXERCISE DIFFICULTY (intensity nudge)
   Lets a user make an individual exercise easier
   or harder (±2 steps) without changing their whole
   programme level. Stored per-exercise on the user's
   progress and synced via saveUser().
   ============================================ */

var INTENSITY_LABELS = { '-2': 'Easier+', '-1': 'Easier', '0': 'As set', '1': 'Harder', '2': 'Harder+' };

function getExerciseIntensity(exId) {
  if (!currentUser || !currentUser.progress.exerciseIntensity) return 0;
  return currentUser.progress.exerciseIntensity[exId] || 0;
}

function adjustExerciseIntensity(exId, delta, event) {
  if (event) event.stopPropagation();
  if (!currentUser) return;
  if (!currentUser.progress.exerciseIntensity) currentUser.progress.exerciseIntensity = {};
  var current = currentUser.progress.exerciseIntensity[exId] || 0;
  var next = Math.max(-2, Math.min(2, current + delta));
  if (next === 0) {
    delete currentUser.progress.exerciseIntensity[exId];
  } else {
    currentUser.progress.exerciseIntensity[exId] = next;
  }
  saveUser();
  renderExerciseSession();
}

// Scale the first number found in a reps string by ~15% per intensity step
// (e.g. "8 each leg" -> "9 each leg" at +1). Non-numeric text is preserved.
function scaleReps(reps, intensity) {
  if (!intensity) return reps;
  var factor = 1 + 0.15 * intensity;
  return String(reps).replace(/\d+/, function (m) {
    return String(Math.max(1, Math.round(parseInt(m, 10) * factor)));
  });
}

function applyIntensity(prog, intensity) {
  var sets = Math.max(1, prog.sets + intensity);
  var reps = scaleReps(prog.reps, intensity);
  return { sets: sets, reps: reps, label: INTENSITY_LABELS[String(intensity)] || 'As set' };
}

/* ============================================
   VIDEO MODAL - plays exercise videos in an
   in-app overlay so users are never taken off site.
   ============================================ */

function openVideoModal(videoId, encodedName, event) {
  if (event) event.stopPropagation();
  var name = encodedName ? decodeURIComponent(encodedName) : '';
  closeVideoModal();
  var overlay = document.createElement('div');
  overlay.id = 'jj-video-modal';
  overlay.className = 'jj-video-overlay';
  overlay.innerHTML =
    '<div class="jj-video-dialog" role="dialog" aria-modal="true" aria-label="' + (name || 'Exercise video') + '">' +
      '<div class="jj-video-header">' +
        '<span class="jj-video-title">' + (name || 'Exercise demonstration') + '</span>' +
        '<div class="jj-video-actions">' +
          '<a class="jj-video-yt" href="https://www.youtube.com/watch?v=' + videoId + '" target="_blank" rel="noopener">Watch on YouTube ↗</a>' +
          '<button type="button" class="jj-video-close" aria-label="Close video" onclick="closeVideoModal()">✕</button>' +
        '</div>' +
      '</div>' +
      '<div class="jj-video-frame">' +
        '<iframe src="https://www.youtube.com/embed/' + videoId + '?rel=0&playsinline=1" title="' + (name || 'Exercise video') + '" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
      '</div>' +
    '</div>';
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeVideoModal(); });
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  document._jjVideoEsc = function (e) { if (e.key === 'Escape') closeVideoModal(); };
  document.addEventListener('keydown', document._jjVideoEsc);
}

function closeVideoModal() {
  var m = document.getElementById('jj-video-modal');
  if (m && m.parentNode) m.parentNode.removeChild(m);
  document.body.style.overflow = '';
  if (document._jjVideoEsc) {
    document.removeEventListener('keydown', document._jjVideoEsc);
    document._jjVideoEsc = null;
  }
}
