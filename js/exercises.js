/* ============================================
   JOINT JOURNEY - Exercise Programme
   ============================================ */

function initExercises() {
  if (!currentUser) return;

  const joint = currentUser.profile.joint;
  const jointLabel = joint === 'hip' ? 'Hip' : joint === 'knee' ? 'Knee' : 'Hip & Knee';
  document.getElementById('exercise-programme-type').textContent = jointLabel + ' Replacement - 12-Week Progressive Programme';

  renderWeekTabs();
  renderExerciseSession();
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
