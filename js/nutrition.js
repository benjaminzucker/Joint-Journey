/* ============================================
   JOINT JOURNEY - Nutrition (Calculator, Weight)
   ============================================ */

function initNutrition() {
  if (!currentUser) return;
  // Populate calculator fields
  const p = currentUser.profile;
  if (p.weight) document.getElementById('calc-weight').value = p.weight;
  if (p.height) document.getElementById('calc-height').value = p.height;
  if (p.age) document.getElementById('calc-age').value = p.age;
  if (p.sex) document.getElementById('calc-sex').value = p.sex;
  if (p.activity) document.getElementById('calc-activity').value = p.activity;
  calculateNutrition();
  renderWeightHistory();
}

function showNutritionTab(tab) {
  document.querySelectorAll('.nutrition-tab').forEach(t => t.style.display = 'none');
  document.getElementById('nutrition-' + tab).style.display = 'block';
  // Update tabs
  const tabContainer = document.querySelector('#page-nutrition > .tabs');
  tabContainer.querySelectorAll('.tab').forEach((t, i) => {
    const tabs = ['calculator', 'recipes', 'shopping', 'weight'];
    t.classList.toggle('active', tabs[i] === tab);
  });
  if (tab === 'recipes') initRecipes();
  if (tab === 'shopping') renderShoppingList();
  if (tab === 'weight') renderWeightHistory();
}

// ===== CALORIE CALCULATOR =====
function calculateNutrition() {
  const weight = parseFloat(document.getElementById('calc-weight').value);
  const height = parseFloat(document.getElementById('calc-height').value);
  const age = parseInt(document.getElementById('calc-age').value);
  const sex = document.getElementById('calc-sex').value;
  const activity = document.getElementById('calc-activity').value;

  if (!weight || !height) {
    document.getElementById('current-bmi').textContent = '--';
    document.getElementById('current-weight-display').textContent = '--';
    document.getElementById('calorie-targets').style.display = 'none';
    document.getElementById('bmi-message').style.display = 'none';
    return;
  }

  // BMI
  const bmi = weight / Math.pow(height / 100, 2);
  document.getElementById('current-bmi').textContent = bmi.toFixed(1);
  document.getElementById('current-weight-display').textContent = weight.toFixed(1);

  // BMI message
  const bmiMsg = document.getElementById('bmi-message');
  if (bmi < 18.5) {
    bmiMsg.className = 'alert alert-warning';
    bmiMsg.innerHTML = '<strong>BMI ' + bmi.toFixed(1) + ' - Underweight.</strong> You may benefit from speaking with your GP about nutrition before surgery.';
  } else if (bmi < 25) {
    bmiMsg.className = 'alert alert-success';
    bmiMsg.innerHTML = '<strong>BMI ' + bmi.toFixed(1) + ' - Healthy weight! 🎉</strong> You\'re in a great position for surgery. Focus on maintaining your weight and eating plenty of protein.';
  } else if (bmi < 30) {
    bmiMsg.className = 'alert alert-info';
    bmiMsg.innerHTML = '<strong>BMI ' + bmi.toFixed(1) + ' - Slightly overweight.</strong> You\'re not far off. Even a small amount of weight loss can make surgery easier and recovery faster.';
  } else {
    bmiMsg.className = 'alert alert-warning';
    bmiMsg.innerHTML = '<strong>BMI ' + bmi.toFixed(1) + ' - Your BMI is above 30.</strong> Losing some weight before surgery can significantly improve your outcomes. We\'ll help you get there with manageable targets.';
  }
  bmiMsg.style.display = 'block';

  // Calorie calculation
  if (age && sex) {
    const activityFactors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
    const factor = activityFactors[activity] || 1.2;
    let bmr;
    if (sex === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    const tdee = Math.round(bmr * factor);

    // Protein: 1.2g per kg of estimated lean body mass
    // For BMI > 25, use adjusted body weight to avoid overestimating
    let proteinWeight = weight;
    if (bmi > 25) {
      const idealWeight = 25 * Math.pow(height / 100, 2);
      proteinWeight = idealWeight + 0.25 * (weight - idealWeight);
    }
    const proteinTarget = Math.round(proteinWeight * 1.2);

    let calorieTarget = tdee;
    const weightLossInfo = document.getElementById('weight-loss-info');
    const minCal = sex === 'male' ? 1500 : 1200;

    if (bmi > 30) {
      calorieTarget = Math.max(tdee - 500, minCal);
      const targetWeight = 30 * Math.pow(height / 100, 2);
      const weightToLose = weight - targetWeight;
      const weeksToTarget = Math.ceil(weightToLose / 0.5);
      const deficit = tdee - calorieTarget;

      let html = '<div style="line-height:1.8;">';
      html += '<h4 style="margin-bottom:var(--space-sm);">📖 How we calculated this</h4>';
      html += '<p>Based on your age, height, weight, and activity level, your body uses roughly <strong>' + tdee.toLocaleString() + ' calories per day</strong> to maintain your current weight. This is called your Total Daily Energy Expenditure (TDEE).</p>';
      html += '<p>We\'ve reduced this by <strong>' + deficit + ' calories</strong> to create a safe, sustainable calorie deficit. This is the approach recommended by the NHS - it\'s enough to lose weight without losing the muscle you need for surgery and recovery.</p>';
      html += '<h4 style="margin-bottom:var(--space-sm);">⚖️ What to expect</h4>';
      html += '<p>At this calorie level, you can expect to lose about <strong>0.5kg (1lb) per week</strong>. That might not sound dramatic, but it\'s the rate that preserves your muscle while losing fat. Crash diets do the opposite - they lose muscle first, which is the last thing you need before surgery.</p>';
      html += '<p>To reach a BMI of 30, you\'d need to lose <strong>' + weightToLose.toFixed(1) + 'kg</strong>, which would take roughly <strong>' + weeksToTarget + ' weeks</strong> at this pace.</p>';
      if (weeksToTarget > 12) {
        html += '<p>That\'s longer than the 12-week exercise programme - and that\'s absolutely fine. <strong>Every kilo you lose makes a difference.</strong> Research shows that even losing 2-3kg before surgery measurably improves outcomes, reduces complications, and speeds recovery. Do what you can.</p>';
      }
      html += '<h4 style="margin-bottom:var(--space-sm);">🥩 Why protein matters</h4>';
      html += '<p>Your protein target is <strong>' + proteinTarget + 'g per day</strong>, based on 1.2g per kg of lean body weight. We\'ve adjusted this for your body composition so it\'s realistic and achievable. Protein is essential because you\'re doing strengthening exercises - your muscles need it to repair and grow. Our recipes are designed to help you hit this target.</p>';
      html += '<p style="color:var(--text-muted); font-size:var(--font-size-sm);">We\'ve set a minimum of ' + minCal.toLocaleString() + ' calories per day - we\'ll never suggest going below this, as it wouldn\'t be safe or sustainable.</p>';
      html += '</div>';

      weightLossInfo.innerHTML = html;
      weightLossInfo.style.display = 'block';
    } else if (bmi > 25) {
      calorieTarget = Math.max(tdee - 300, minCal);

      let html = '<div style="line-height:1.8;">';
      html += '<h4 style="margin-bottom:var(--space-sm);">📖 How we calculated this</h4>';
      html += '<p>Your body uses roughly <strong>' + tdee.toLocaleString() + ' calories per day</strong> to maintain your current weight. We\'ve reduced this by <strong>300 calories</strong> - a gentle deficit that should help you lose weight gradually without feeling hungry or deprived.</p>';
      html += '<p>At this level, expect to lose about <strong>0.25-0.5kg per week</strong>. No crash diets, no misery - just slow and steady progress. Even a few kilos makes surgery easier and recovery faster.</p>';
      html += '<h4 style="margin-bottom:var(--space-sm);">🥩 Why protein matters</h4>';
      html += '<p>Your protein target is <strong>' + proteinTarget + 'g per day</strong>, based on 1.2g per kg of lean body weight. This supports the muscle-strengthening work you\'re doing with your exercises. Our recipes are designed to be high in protein to help you hit this.</p>';
      html += '</div>';

      weightLossInfo.innerHTML = html;
      weightLossInfo.style.display = 'block';
    } else {
      let html = '<div style="line-height:1.8;">';
      html += '<h4 style="margin-bottom:var(--space-sm);">📖 How we calculated this</h4>';
      html += '<p>You\'re at a healthy weight - well done! Your calorie target of <strong>' + tdee.toLocaleString() + '</strong> is set to maintain your current weight. There\'s no need to lose weight before surgery.</p>';
      html += '<p>Focus on <strong>eating well</strong> - plenty of protein (target: <strong>' + proteinTarget + 'g per day</strong>), fruit and vegetables, and staying hydrated. Good nutrition helps your body heal faster after surgery.</p>';
      html += '</div>';

      weightLossInfo.innerHTML = html;
      weightLossInfo.style.display = 'block';
    }

    document.getElementById('calorie-target').textContent = calorieTarget.toLocaleString();
    document.getElementById('protein-target').textContent = proteinTarget + 'g';
    document.getElementById('calorie-targets').style.display = 'block';

    // Save updated profile
    currentUser.profile.weight = weight;
    currentUser.profile.height = height;
    currentUser.profile.age = age;
    currentUser.profile.sex = sex;
    currentUser.profile.activity = activity;
    saveUser();
  }
}

// ===== WEIGHT TRACKER =====
function logWeight() {
  const weightInput = document.getElementById('weight-entry');
  const weight = parseFloat(weightInput.value);
  if (!weight || weight < 30 || weight > 300) {
    showToast('Please enter a valid weight.', 'warning');
    return;
  }
  const today = new Date().toISOString().split('T')[0];
  // Remove existing entry for today
  currentUser.progress.weightLog = currentUser.progress.weightLog.filter(e => e.date !== today);
  currentUser.progress.weightLog.push({ date: today, weight: weight });
  currentUser.profile.weight = weight;
  saveUser();
  weightInput.value = '';
  showToast('Weight logged! ⚖️');
  renderWeightHistory();
  // Update calculator
  document.getElementById('calc-weight').value = weight;
  calculateNutrition();
}

function renderWeightHistory() {
  const log = (currentUser.progress.weightLog || []).sort((a, b) => a.date.localeCompare(b.date));
  const container = document.getElementById('weight-history');
  if (log.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);">No weight entries yet. Log your first weight above!</p>';
    renderWeightChart([]);
    return;
  }

  let html = '<h5>Recent Entries</h5>';
  const recent = log.slice(-10).reverse();
  recent.forEach(entry => {
    html += '<div class="weight-entry">';
    html += '<span class="weight-entry-date">' + formatDate(entry.date) + '</span>';
    html += '<span class="weight-entry-value">' + entry.weight.toFixed(1) + ' kg</span>';
    html += '</div>';
  });

  if (log.length >= 2) {
    const first = log[0].weight;
    const last = log[log.length - 1].weight;
    const diff = last - first;
    const emoji = diff < 0 ? '📉' : diff > 0 ? '📈' : '➡️';
    html += '<div class="alert ' + (diff <= 0 ? 'alert-success' : 'alert-info') + '" style="margin-top:var(--space-md);">';
    html += emoji + ' Total change: <strong>' + (diff > 0 ? '+' : '') + diff.toFixed(1) + 'kg</strong> since ' + formatDateShort(log[0].date);
    html += '</div>';
  }

  container.innerHTML = html;
  renderWeightChart(log);
}

function renderWeightChart(data) {
  const canvas = document.getElementById('weight-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (data.length < 2) {
    ctx.fillStyle = '#7A7A8A';
    ctx.font = '16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Log at least 2 weights to see your trend', w / 2, h / 2);
    return;
  }

  const weights = data.map(d => d.weight);
  const minW = Math.min(...weights) - 2;
  const maxW = Math.max(...weights) + 2;
  const range = maxW - minW || 1;

  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const plotW = w - padding.left - padding.right;
  const plotH = h - padding.top - padding.bottom;

  // Grid lines
  ctx.strokeStyle = '#E0E4DC';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (plotH * i / 4);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();
    // Label
    const val = maxW - (range * i / 4);
    ctx.fillStyle = '#7A7A8A';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(val.toFixed(1), padding.left - 8, y + 4);
  }

  // Line
  ctx.strokeStyle = '#475953';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  data.forEach((d, i) => {
    const x = padding.left + (plotW * i / (data.length - 1));
    const y = padding.top + plotH - (plotH * (d.weight - minW) / range);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots
  data.forEach((d, i) => {
    const x = padding.left + (plotW * i / (data.length - 1));
    const y = padding.top + plotH - (plotH * (d.weight - minW) / range);
    ctx.fillStyle = '#475953';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Date labels
  ctx.fillStyle = '#7A7A8A';
  ctx.font = '11px system-ui';
  ctx.textAlign = 'center';
  const labelStep = Math.max(1, Math.floor(data.length / 5));
  data.forEach((d, i) => {
    if (i % labelStep === 0 || i === data.length - 1) {
      const x = padding.left + (plotW * i / (data.length - 1));
      ctx.fillText(formatDateShort(d.date), x, h - 5);
    }
  });
}
