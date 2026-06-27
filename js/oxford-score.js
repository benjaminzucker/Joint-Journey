/* ============================================
   JOINT JOURNEY - Oxford Score Questionnaires
   Oxford Hip Score (OHS) & Oxford Knee Score (OKS)
   Each has 12 questions, scored 0-4 per question
   Total: 0 (worst) to 48 (best function)
   ============================================ */

// ===== OXFORD HIP SCORE QUESTIONS =====
const OXFORD_HIP_QUESTIONS = [
  {
    id: 'oh1',
    text: 'How would you describe the pain you usually have in your hip?',
    options: [
      { label: 'None', score: 4 },
      { label: 'Very mild', score: 3 },
      { label: 'Mild', score: 2 },
      { label: 'Moderate', score: 1 },
      { label: 'Severe', score: 0 }
    ]
  },
  {
    id: 'oh2',
    text: 'Have you been troubled by pain from your hip in bed at night?',
    options: [
      { label: 'No nights', score: 4 },
      { label: 'Only 1 or 2 nights', score: 3 },
      { label: 'Some nights', score: 2 },
      { label: 'Most nights', score: 1 },
      { label: 'Every night', score: 0 }
    ]
  },
  {
    id: 'oh3',
    text: 'Have you had any sudden, severe pain ("shooting", "stabbing" or "spasms") from your affected hip?',
    options: [
      { label: 'No days', score: 4 },
      { label: 'Only 1 or 2 days', score: 3 },
      { label: 'Some days', score: 2 },
      { label: 'Most days', score: 1 },
      { label: 'Every day', score: 0 }
    ]
  },
  {
    id: 'oh4',
    text: 'Have you been limping when walking, because of your hip?',
    options: [
      { label: 'Rarely/never', score: 4 },
      { label: 'Sometimes or just at first', score: 3 },
      { label: 'Often, not just at first', score: 2 },
      { label: 'Most of the time', score: 1 },
      { label: 'All of the time', score: 0 }
    ]
  },
  {
    id: 'oh5',
    text: 'For how long have you been able to walk before the pain from your hip becomes severe? (with or without a stick)',
    options: [
      { label: 'No pain / more than 30 minutes', score: 4 },
      { label: '16 to 30 minutes', score: 3 },
      { label: '5 to 15 minutes', score: 2 },
      { label: 'Around the house only', score: 1 },
      { label: 'Not at all - pain severe on walking', score: 0 }
    ]
  },
  {
    id: 'oh6',
    text: 'Have you been able to climb a flight of stairs?',
    options: [
      { label: 'Yes, easily', score: 4 },
      { label: 'With a little difficulty', score: 3 },
      { label: 'With moderate difficulty', score: 2 },
      { label: 'With extreme difficulty', score: 1 },
      { label: 'No, impossible', score: 0 }
    ]
  },
  {
    id: 'oh7',
    text: 'Have you been able to put on a pair of socks, stockings or tights?',
    options: [
      { label: 'Yes, easily', score: 4 },
      { label: 'With a little difficulty', score: 3 },
      { label: 'With moderate difficulty', score: 2 },
      { label: 'With extreme difficulty', score: 1 },
      { label: 'No, impossible', score: 0 }
    ]
  },
  {
    id: 'oh8',
    text: 'After a meal (sitting at a table), how painful has it been for you to stand up from a chair?',
    options: [
      { label: 'Not at all painful', score: 4 },
      { label: 'Slightly painful', score: 3 },
      { label: 'Moderately painful', score: 2 },
      { label: 'Very painful', score: 1 },
      { label: 'Unbearable', score: 0 }
    ]
  },
  {
    id: 'oh9',
    text: 'Could you do the household shopping on your own?',
    options: [
      { label: 'Yes, easily', score: 4 },
      { label: 'With a little difficulty', score: 3 },
      { label: 'With moderate difficulty', score: 2 },
      { label: 'With extreme difficulty', score: 1 },
      { label: 'No, impossible', score: 0 }
    ]
  },
  {
    id: 'oh10',
    text: 'How much has pain from your hip interfered with your usual work (including housework)?',
    options: [
      { label: 'Not at all', score: 4 },
      { label: 'A little bit', score: 3 },
      { label: 'Moderately', score: 2 },
      { label: 'Greatly', score: 1 },
      { label: 'Totally', score: 0 }
    ]
  },
  {
    id: 'oh11',
    text: 'Have you felt that your hip might suddenly "give way" or let you down?',
    options: [
      { label: 'Rarely/never', score: 4 },
      { label: 'Sometimes or just at first', score: 3 },
      { label: 'Often, not just at first', score: 2 },
      { label: 'Most of the time', score: 1 },
      { label: 'All of the time', score: 0 }
    ]
  },
  {
    id: 'oh12',
    text: 'Could you walk to and use public transport (bus, train, taxi)?',
    options: [
      { label: 'Yes, easily', score: 4 },
      { label: 'With a little difficulty', score: 3 },
      { label: 'With moderate difficulty', score: 2 },
      { label: 'With extreme difficulty', score: 1 },
      { label: 'No, impossible', score: 0 }
    ]
  }
];

// ===== OXFORD KNEE SCORE QUESTIONS =====
const OXFORD_KNEE_QUESTIONS = [
  {
    id: 'ok1',
    text: 'How would you describe the pain you usually have in your knee?',
    options: [
      { label: 'None', score: 4 },
      { label: 'Very mild', score: 3 },
      { label: 'Mild', score: 2 },
      { label: 'Moderate', score: 1 },
      { label: 'Severe', score: 0 }
    ]
  },
  {
    id: 'ok2',
    text: 'Have you had any trouble washing and drying yourself (all over) because of your knee?',
    options: [
      { label: 'No trouble at all', score: 4 },
      { label: 'Very little trouble', score: 3 },
      { label: 'Moderate trouble', score: 2 },
      { label: 'Extreme difficulty', score: 1 },
      { label: 'Impossible to do', score: 0 }
    ]
  },
  {
    id: 'ok3',
    text: 'Have you had any trouble getting in and out of a car or using public transport because of your knee? (whichever you tend to use)',
    options: [
      { label: 'No trouble at all', score: 4 },
      { label: 'Very little trouble', score: 3 },
      { label: 'Moderate trouble', score: 2 },
      { label: 'Extreme difficulty', score: 1 },
      { label: 'Impossible to do', score: 0 }
    ]
  },
  {
    id: 'ok4',
    text: 'For how long are you able to walk before the pain in your knee becomes severe? (with or without a stick)',
    options: [
      { label: 'No pain / more than 30 minutes', score: 4 },
      { label: '16 to 30 minutes', score: 3 },
      { label: '5 to 15 minutes', score: 2 },
      { label: 'Around the house only', score: 1 },
      { label: 'Not at all - pain severe on walking', score: 0 }
    ]
  },
  {
    id: 'ok5',
    text: 'After a meal (sitting at a table), how painful has it been for you to stand up from a chair because of your knee?',
    options: [
      { label: 'Not at all painful', score: 4 },
      { label: 'Slightly painful', score: 3 },
      { label: 'Moderately painful', score: 2 },
      { label: 'Very painful', score: 1 },
      { label: 'Unbearable', score: 0 }
    ]
  },
  {
    id: 'ok6',
    text: 'Have you been limping when walking, because of your knee?',
    options: [
      { label: 'Rarely/never', score: 4 },
      { label: 'Sometimes or just at first', score: 3 },
      { label: 'Often, not just at first', score: 2 },
      { label: 'Most of the time', score: 1 },
      { label: 'All of the time', score: 0 }
    ]
  },
  {
    id: 'ok7',
    text: 'Could you kneel down and get up again afterwards?',
    options: [
      { label: 'Yes, easily', score: 4 },
      { label: 'With a little difficulty', score: 3 },
      { label: 'With moderate difficulty', score: 2 },
      { label: 'With extreme difficulty', score: 1 },
      { label: 'No, impossible', score: 0 }
    ]
  },
  {
    id: 'ok8',
    text: 'Are you troubled by pain in your knee at night in bed?',
    options: [
      { label: 'No nights', score: 4 },
      { label: 'Only 1 or 2 nights', score: 3 },
      { label: 'Some nights', score: 2 },
      { label: 'Most nights', score: 1 },
      { label: 'Every night', score: 0 }
    ]
  },
  {
    id: 'ok9',
    text: 'How much has pain from your knee interfered with your usual work (including housework)?',
    options: [
      { label: 'Not at all', score: 4 },
      { label: 'A little bit', score: 3 },
      { label: 'Moderately', score: 2 },
      { label: 'Greatly', score: 1 },
      { label: 'Totally', score: 0 }
    ]
  },
  {
    id: 'ok10',
    text: 'Have you felt that your knee might suddenly "give way" or let you down?',
    options: [
      { label: 'Rarely/never', score: 4 },
      { label: 'Sometimes or just at first', score: 3 },
      { label: 'Often, not just at first', score: 2 },
      { label: 'Most of the time', score: 1 },
      { label: 'All of the time', score: 0 }
    ]
  },
  {
    id: 'ok11',
    text: 'Could you do the household shopping on your own?',
    options: [
      { label: 'Yes, easily', score: 4 },
      { label: 'With a little difficulty', score: 3 },
      { label: 'With moderate difficulty', score: 2 },
      { label: 'With extreme difficulty', score: 1 },
      { label: 'No, impossible', score: 0 }
    ]
  },
  {
    id: 'ok12',
    text: 'Could you walk down a flight of stairs?',
    options: [
      { label: 'Yes, easily', score: 4 },
      { label: 'With a little difficulty', score: 3 },
      { label: 'With moderate difficulty', score: 2 },
      { label: 'With extreme difficulty', score: 1 },
      { label: 'No, impossible', score: 0 }
    ]
  }
];

// ===== SCORE INTERPRETATION =====
function getOxfordScoreInterpretation(score) {
  if (score >= 40) return { level: 'mild', label: 'Satisfactory joint function', description: 'Your joint function is relatively good. Prehab will help maintain and improve this before surgery.', color: '#22c55e' };
  if (score >= 30) return { level: 'mild-moderate', label: 'Mild to moderate arthritis', description: 'You have some limitation in daily activities. Prehab exercises can help strengthen the muscles around your joint.', color: '#84cc16' };
  if (score >= 20) return { level: 'moderate', label: 'Moderate to severe arthritis', description: 'Your joint is significantly affecting your daily life. This is common for people awaiting surgery - prehab can help you manage better.', color: '#eab308' };
  if (score >= 10) return { level: 'severe', label: 'Severe arthritis', description: 'Your joint is causing major limitations. Gentle prehab exercises can still help strengthen muscles and prepare you for surgery.', color: '#f97316' };
  return { level: 'very-severe', label: 'Very severe arthritis', description: 'Your joint is severely affected. Do only the exercises that feel comfortable, and focus on the nutrition and mindset modules.', color: '#ef4444' };
}

// Track which joint questionnaire is currently being completed (for "both" users)
let currentOxfordJoint = null;

// ===== RENDER PRE-OP QUESTIONNAIRE =====
function initOxfordScore() {
  if (!currentUser) return;
  
  const joint = currentUser.profile.joint;
  
  // For "both" users, check what's already completed
  if (joint === 'both') {
    const hipDone = currentUser.progress.oxfordScorePreOpHip;
    const kneeDone = currentUser.progress.oxfordScorePreOpKnee;
    
    if (hipDone && kneeDone) {
      // Both completed - show results
      renderOxfordScoreResult('preop');
      return;
    } else if (!hipDone) {
      // Hip not done yet - do hip first
      currentOxfordJoint = 'hip';
      renderOxfordQuestionnaire('hip', 'You have both hip and knee replacements planned. Let\'s start with your <strong>hip</strong>, we\'ll do the knee next.');
    } else {
      // Hip done, knee not done
      currentOxfordJoint = 'knee';
      renderOxfordQuestionnaire('knee', 'Great, your hip score is recorded! Now let\'s do your <strong>knee</strong>.');
    }
    return;
  }
  
  // Single joint
  if (currentUser.progress.oxfordScorePreOp) {
    renderOxfordScoreResult('preop');
    return;
  }
  
  currentOxfordJoint = joint;
  renderOxfordQuestionnaire(joint);
}

function renderOxfordQuestionnaire(jointType, introMessage) {
  const questions = jointType === 'hip' ? OXFORD_HIP_QUESTIONS : OXFORD_KNEE_QUESTIONS;
  const jointLabel = jointType === 'hip' ? 'Hip' : 'Knee';
  
  const container = document.getElementById('oxford-score-questions');
  if (!container) return;
  
  document.getElementById('oxford-score-title').textContent = 'Oxford ' + jointLabel + ' Score';
  document.getElementById('oxford-score-subtitle').textContent = 'These 12 questions ask about your ' + jointType + ' over the past 4 weeks. This helps us understand your starting point.';
  
  let html = '';
  
  if (introMessage) {
    html += '<div class="alert alert-info mb-lg">' + introMessage + '</div>';
  }
  
  questions.forEach((q, i) => {
    html += '<div class="oxford-question" id="oq-' + q.id + '">';
    html += '<p class="oxford-question-number">Question ' + (i + 1) + ' of 12</p>';
    html += '<p class="oxford-question-text">' + q.text + '</p>';
    html += '<div class="oxford-options">';
    q.options.forEach((opt, j) => {
      html += '<label class="oxford-option" onclick="setTimeout(checkOxfordProgress, 50)">';
      html += '<input type="radio" name="' + q.id + '" value="' + opt.score + '">';
      html += '<span class="oxford-option-label">' + opt.label + '</span>';
      html += '</label>';
    });
    html += '</div></div>';
  });
  
  container.innerHTML = html;
  
  // Hide submit until all answered
  document.getElementById('oxford-submit-btn').style.display = 'none';
  document.getElementById('oxford-score-result').style.display = 'none';
  document.getElementById('oxford-score-form').style.display = 'block';
}

function checkOxfordProgress() {
  const questions = currentOxfordJoint === 'hip' ? OXFORD_HIP_QUESTIONS : OXFORD_KNEE_QUESTIONS;
  let answered = 0;
  
  questions.forEach(q => {
    const selected = document.querySelector('input[name="' + q.id + '"]:checked');
    if (selected) answered++;
  });
  
  // Update progress indicator
  const progressEl = document.getElementById('oxford-progress');
  if (progressEl) {
    progressEl.textContent = answered + ' of 12 answered';
    progressEl.style.color = answered === 12 ? 'var(--primary)' : 'var(--text-muted)';
  }
  
  // Show submit when all answered
  const submitBtn = document.getElementById('oxford-submit-btn');
  if (submitBtn) {
    submitBtn.style.display = answered === 12 ? 'block' : 'none';
  }
}

function submitOxfordScore() {
  const questions = currentOxfordJoint === 'hip' ? OXFORD_HIP_QUESTIONS : OXFORD_KNEE_QUESTIONS;
  const jointLabel = currentOxfordJoint === 'hip' ? 'Hip' : 'Knee';
  
  let totalScore = 0;
  const answers = {};
  
  questions.forEach(q => {
    const selected = document.querySelector('input[name="' + q.id + '"]:checked');
    if (selected) {
      const score = parseInt(selected.value);
      totalScore += score;
      answers[q.id] = score;
    }
  });
  
  const scoreData = {
    score: totalScore,
    answers: answers,
    date: new Date().toISOString(),
    joint: currentOxfordJoint
  };
  
  const joint = currentUser.profile.joint;
  
  if (joint === 'both') {
    // Save to joint-specific key
    if (currentOxfordJoint === 'hip') {
      currentUser.progress.oxfordScorePreOpHip = scoreData;
      saveUser();
      showToast('✅ Your Oxford Hip Score has been recorded! Now let\'s do your knee.');
      // Immediately show knee questionnaire
      currentOxfordJoint = 'knee';
      renderOxfordQuestionnaire('knee', 'Great, your hip score is recorded! Now let\'s do your <strong>knee</strong>.');
      // Scroll to top of questionnaire
      document.querySelector('.app-main').scrollTop = 0;
      return;
    } else {
      currentUser.progress.oxfordScorePreOpKnee = scoreData;
      saveUser();
      assignProgrammeLevel();
      showToast('✅ Your Oxford Knee Score has been recorded!');
      renderOxfordScoreResult('preop');
      return;
    }
  }
  
  // Single joint
  currentUser.progress.oxfordScorePreOp = scoreData;
  saveUser();
  assignProgrammeLevel();
  renderOxfordScoreResult('preop');
  showToast('✅ Your Oxford ' + jointLabel + ' Score has been recorded!');
}

function renderOxfordScoreResult(type) {
  const joint = currentUser.profile.joint;
  
  // Hide form, show result
  const form = document.getElementById('oxford-score-form');
  if (form) form.style.display = 'none';
  
  const result = document.getElementById('oxford-score-result');
  if (!result) return;
  
  let html = '';
  
  if (joint === 'both') {
    // Show both hip and knee results
    const hipData = type === 'preop' ? currentUser.progress.oxfordScorePreOpHip : currentUser.progress.oxfordScorePostOpHip;
    const kneeData = type === 'preop' ? currentUser.progress.oxfordScorePreOpKnee : currentUser.progress.oxfordScorePostOpKnee;
    
    if (hipData) {
      html += renderSingleScoreCard(hipData, 'Hip', type, 'hip');
    }
    if (kneeData) {
      html += renderSingleScoreCard(kneeData, 'Knee', type, 'knee');
    }
  } else {
    // Single joint result
    const data = type === 'preop' ? currentUser.progress.oxfordScorePreOp : currentUser.progress.oxfordScorePostOp;
    if (!data) return;
    const jointLabel = joint === 'hip' ? 'Hip' : 'Knee';
    html += renderSingleScoreCard(data, jointLabel, type, joint);
  }
  
  result.innerHTML = html;
  result.style.display = 'block';
}

function renderSingleScoreCard(data, jointLabel, type, jointType) {
  const interp = getOxfordScoreInterpretation(data.score);
  
  let html = '<div class="oxford-result-card" style="margin-bottom: var(--space-lg);">';
  html += '<h3 style="margin-top:0; text-align:center;">Oxford ' + jointLabel + ' Score</h3>';
  html += '<div class="oxford-result-score" style="color:' + interp.color + ';">' + data.score + '<span class="oxford-result-total">/48</span></div>';
  html += '<div class="oxford-result-label">' + interp.label + '</div>';
  html += '<p class="oxford-result-description">' + interp.description + '</p>';
  html += '<p class="oxford-result-date">Completed on ' + new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '</p>';
  
  // Pre vs post comparison
  if (type === 'postop') {
    const joint = currentUser.profile.joint;
    let preData = null;
    if (joint === 'both') {
      preData = jointType === 'hip' ? currentUser.progress.oxfordScorePreOpHip : currentUser.progress.oxfordScorePreOpKnee;
    } else {
      preData = currentUser.progress.oxfordScorePreOp;
    }
    
    if (preData) {
      const diff = data.score - preData.score;
      html += '<div class="oxford-comparison">';
      html += '<h4>Your Progress</h4>';
      html += '<div class="oxford-compare-row"><span>Pre-op score:</span><strong>' + preData.score + '/48</strong></div>';
      html += '<div class="oxford-compare-row"><span>Post-op score:</span><strong>' + data.score + '/48</strong></div>';
      if (diff > 0) {
        html += '<div class="oxford-compare-result positive">↑ Improved by ' + diff + ' points! 🎉</div>';
      } else if (diff < 0) {
        html += '<div class="oxford-compare-result negative">↓ Changed by ' + Math.abs(diff) + ' points</div>';
      } else {
        html += '<div class="oxford-compare-result neutral">No change in score</div>';
      }
      html += '</div>';
    }
  }
  
  html += '</div>';
  return html;
}

// ===== POST-OP CHECK-IN =====
function initPostOpCheckIn() {
  if (!currentUser || !currentUser.profile.surgeryDate) return;
  
  // Check if surgery date has passed
  const surgeryDate = new Date(currentUser.profile.surgeryDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (today < surgeryDate) return; // Surgery hasn't happened yet
  if (currentUser.progress.postOpCheckIn) return; // Already completed
  
  // Show the post-op check-in prompt
  const prompt = document.getElementById('post-op-checkin-prompt');
  if (prompt) prompt.style.display = 'block';
}

function submitPostOpCheckIn() {
  const hadSurgery = document.querySelector('input[name="had-surgery"]:checked');
  if (!hadSurgery) {
    showToast('Please select whether you have had your surgery.');
    return;
  }
  
  const result = {
    hadSurgery: hadSurgery.value,
    date: new Date().toISOString()
  };
  
  if (hadSurgery.value === 'yes') {
    const nights = document.getElementById('hospital-nights').value;
    const rating = document.querySelector('input[name="hospital-rating"]:checked');
    
    if (!nights || nights === '') {
      showToast('Please enter how many nights you stayed in hospital.');
      return;
    }
    if (!rating) {
      showToast('Please rate your hospital experience.');
      return;
    }
    
    result.hospitalNights = parseInt(nights);
    result.hospitalRating = parseInt(rating.value);
  }
  
  currentUser.progress.postOpCheckIn = result;
  saveUser();
  
  // Hide the check-in form
  document.getElementById('post-op-checkin-prompt').style.display = 'none';
  
  if (hadSurgery.value === 'yes') {
    showToast('🎉 Congratulations on your surgery! We hope recovery goes brilliantly.');
  } else if (hadSurgery.value === 'cancelled') {
    showToast('We\'re sorry to hear that. Keep using Joint Journey - the preparation is still valuable.');
  } else {
    showToast('Thank you for letting us know. Keep preparing - you\'re doing great!');
  }
}

function toggleHospitalDetails() {
  const hadSurgery = document.querySelector('input[name="had-surgery"]:checked');
  const details = document.getElementById('hospital-details');
  if (details) {
    details.style.display = (hadSurgery && hadSurgery.value === 'yes') ? 'block' : 'none';
  }
}

// ===== MOUNTAIN JOURNEY GRAPHIC =====
function renderMountainJourney() {
  const container = document.getElementById('mountain-journey');
  if (!container || !currentUser) return;
  container.style.display = 'block';
  
  // The journey graphic mirrors the Joint Journey logo: a two-peaked mountain
  // with a flag planted on the summit. The marker climbs the logo's own ridge.
  // Logo path (48-space): M4 42 L20 10 L24 18 L30 8 L46 42 -> scaled into 100-space below.
  // Climbing ridge waypoints, base camp -> lower peak -> saddle -> summit (flag).
  const RIDGE = [
    { x: 8,  y: 84 },  // base camp (start)
    { x: 16, y: 68 },
    { x: 24, y: 52 },
    { x: 32, y: 36 },
    { x: 40, y: 20 },  // lower peak
    { x: 48, y: 36 },  // saddle
    { x: 54, y: 26 },
    { x: 60, y: 16 }   // summit (flag)
  ];
  const MOUNTAIN_FILL = 'M 8 84 L 40 20 L 48 36 L 60 16 L 92 84 Z';
  const MOUNTAIN_OUTLINE = 'M 8 84 L 40 20 L 48 36 L 60 16 L 92 84';

  // Shared logo backdrop: silhouette + outline (echoing the logo's stroked style) + amber summit flag.
  function logoMountain() {
    return `
      <rect width="100" height="100" fill="url(#skyGrad)" rx="4"/>
      <path d="${MOUNTAIN_FILL}" fill="#475953" opacity="0.12"/>
      <path d="${MOUNTAIN_OUTLINE}" fill="none" stroke="#475953" stroke-width="1.2" stroke-linejoin="round" opacity="0.5"/>
      <!-- Amber summit flag (the goal) -->
      <line x1="60" y1="16" x2="60" y2="4" stroke="#475953" stroke-width="0.9" stroke-linecap="round"/>
      <path d="M 60 4 L 76 9 L 60 13 Z" fill="#FF8F00"/>
    `;
  }

  function ridgeString(upToIndex, endX, endY) {
    let d = 'M ' + RIDGE[0].x + ' ' + RIDGE[0].y;
    for (let i = 1; i <= upToIndex; i++) d += ' L ' + RIDGE[i].x + ' ' + RIDGE[i].y;
    if (endX != null) d += ' L ' + endX + ' ' + endY;
    return d;
  }

  // ----- Distance & progress -----
  // Frame of reference is the day the user joined (createdAt). The mountain
  // "distance" is the span from joining to surgery; if no surgery date is set
  // yet, it defaults to 24 weeks (168 days). Moving the surgery date therefore
  // rescales the climb against this fixed start point.
  const DEFAULT_DAYS = 168; // 24 weeks
  const createdAt = new Date(currentUser.createdAt);
  const today = new Date();
  const hasDate = !!currentUser.profile.surgeryDate;
  const surgeryDate = hasDate ? new Date(currentUser.profile.surgeryDate) : null;

  const elapsedDays = Math.max(0, Math.ceil((today - createdAt) / 86400000));
  const totalDays = hasDate
    ? Math.max(1, Math.ceil((surgeryDate - createdAt) / 86400000))
    : DEFAULT_DAYS;
  const daysLeft = hasDate ? Math.max(0, Math.ceil((surgeryDate - today) / 86400000)) : null;
  let progress = Math.min(1, Math.max(0, elapsedDays / totalDays));

  // Find marker position along the logo's ridge
  const pathIndex = Math.min(RIDGE.length - 1, Math.floor(progress * (RIDGE.length - 1)));
  const pathFraction = (progress * (RIDGE.length - 1)) - pathIndex;
  const nextIndex = Math.min(RIDGE.length - 1, pathIndex + 1);

  const dotX = RIDGE[pathIndex].x + (RIDGE[nextIndex].x - RIDGE[pathIndex].x) * pathFraction;
  const dotY = RIDGE[pathIndex].y + (RIDGE[nextIndex].y - RIDGE[pathIndex].y) * pathFraction;

  const fullRidge = ridgeString(RIDGE.length - 1);
  const walkedRidge = ridgeString(pathIndex, dotX, dotY);

  // Celebrate reaching the summit (surgery day) once ever - persisted to the
  // profile so a reload after surgery day never re-triggers it.
  if (hasDate && daysLeft === 0 && !currentUser.progress.summitCelebrated) {
    currentUser.progress.summitCelebrated = true;
    saveUser();
    if (window.JJEffects) {
      setTimeout(function () { JJEffects.confetti({ count: 130 }); }, 250);
    }
  }

  const svg = `
    <svg viewBox="0 0 100 100" class="mountain-svg" aria-label="Your journey progress towards surgery">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#e0f2fe"/>
          <stop offset="100%" stop-color="#f0fdf4"/>
        </linearGradient>
      </defs>
      ${logoMountain()}

      <!-- Ridge still to climb (dashed) -->
      <path d="${fullRidge}" stroke="#475953" stroke-width="0.7" stroke-dasharray="2,1.5" fill="none" opacity="0.35"/>
      <!-- Ridge already climbed (brighter green) -->
      <path d="${walkedRidge}" stroke="#5C8A74" stroke-width="1.5" fill="none" opacity="0.95" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Marker (you) in brand green -->
      <circle cx="${dotX}" cy="${dotY}" r="3.4" fill="#475953" stroke="white" stroke-width="1.4"/>
      <circle cx="${dotX}" cy="${dotY}" r="1.4" fill="white"/>

      <text x="4" y="93" font-size="3.4" fill="#475953" opacity="0.55" font-family="sans-serif">Start</text>
      <text x="64" y="24" font-size="3.4" fill="#475953" opacity="0.55" font-family="sans-serif">${hasDate ? 'Surgery' : 'Goal'}</text>
    </svg>
  `;

  // ----- Caption -----
  if (!hasDate) {
    container.innerHTML = `
      <div class="mountain-journey-card">
        <h4 class="mountain-title">Your Journey</h4>
        ${svg}
        <p class="mountain-days" style="margin-top: var(--space-md);">
          <strong>Set your surgery date</strong> to see your journey progress.
        </p>
        <p style="font-size: var(--font-size-sm); color: var(--text-muted); text-align: center; margin-top: var(--space-xs);">
          If you don't know the exact date, just put a date in keeping with the current waiting list. This will help you reach your goals in time.
        </p>
        <button class="btn btn-primary btn-sm btn-block" style="margin-top: var(--space-md);" onclick="navigateTo('account')">Set Surgery Date</button>
      </div>
    `;
    return;
  }

  let daysText = '';
  if (daysLeft > 0) {
    daysText = '<strong>' + daysLeft + ' day' + (daysLeft !== 1 ? 's' : '') + '</strong> until surgery - ' + Math.round(progress * 100) + '% of your journey complete';
  } else if (daysLeft === 0) {
    daysText = '<strong>Surgery day!</strong> You\'ve completed your preparation journey 🏔️';
  } else {
    daysText = 'Your surgery was <strong>' + Math.abs(daysLeft) + ' day' + (Math.abs(daysLeft) !== 1 ? 's' : '') + ' ago</strong> - well done for preparing!';
  }

  container.innerHTML = `
    <div class="mountain-journey-card">
      <h4 class="mountain-title">Your Journey</h4>
      ${svg}
      <p class="mountain-days">${daysText}</p>
    </div>
  `;
}
