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
  if (p.activityLevel) document.getElementById('calc-activity').value = p.activityLevel;
  else if (p.activity) document.getElementById('calc-activity').value = p.activity;
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

// ===== GOAL WEIGHT =====
// Goal-weight rule:
//   BMI <= 33  -> aim for BMI 25
//   BMI  > 33  -> aim for BMI 30
// The goal is the ideal-BMI weight IF it can be reached by the surgery date
// without exceeding the maximum safe daily deficit; otherwise it is the best
// weight realistically achievable by that date.
function computeGoalWeight(weight, height, bmi, tdee, minCal) {
  var heightM = height / 100;
  var idealBMI = bmi > 33 ? 30 : 25;

  // Already at or below the ideal band - no weight-loss goal needed
  if (bmi <= idealBMI) {
    return { needsLoss: false, idealBMI: idealBMI };
  }

  var idealWeight = idealBMI * heightM * heightM;

  // Maximum safe daily deficit: capped at 500, but never below the calorie floor
  var maxDeficit = Math.min(500, Math.max(0, tdee - minCal));
  var maxWeeklyLoss = maxDeficit * 7 / 7700; // kg per week (1kg fat ~ 7700 kcal)

  // Weeks until surgery (if a date is set)
  var weeksToSurgery = null;
  if (currentUser && currentUser.profile.surgeryDate) {
    var ms = new Date(currentUser.profile.surgeryDate).getTime() - Date.now();
    weeksToSurgery = Math.max(1, Math.round(ms / (7 * 86400000)));
  }

  var goalWeight, achievable;
  if (weeksToSurgery) {
    var maxLossByDate = maxWeeklyLoss * weeksToSurgery;
    var idealLoss = weight - idealWeight;
    if (maxLossByDate >= idealLoss) {
      goalWeight = idealWeight;       // can reach the ideal BMI in time
      achievable = true;
    } else {
      goalWeight = weight - maxLossByDate; // best achievable by surgery date
      achievable = false;
    }
  } else {
    goalWeight = idealWeight;          // no date - show the ideal target
    achievable = null;
  }

  goalWeight = Math.round(goalWeight * 2) / 2; // round to nearest 0.5 kg
  var lossNeeded = Math.max(0, Math.round((weight - goalWeight) * 10) / 10);

  return {
    needsLoss: lossNeeded > 0,
    idealBMI: idealBMI,
    idealWeight: idealWeight,
    goalWeight: goalWeight,
    lossNeeded: lossNeeded,
    achievable: achievable,
    weeksToSurgery: weeksToSurgery,
    maxWeeklyLoss: maxWeeklyLoss
  };
}

function renderGoalWeightBanner(goal, dailyDeficit) {
  var el = document.getElementById('goal-weight-banner');
  if (!el) return;
  if (!goal || !goal.needsLoss) { el.style.display = 'none'; return; }

  var weeklyLoss = Math.max(0, (dailyDeficit || 0) * 7 / 7700);
  var html = '<span class="jj-icon" data-jjicon="target" data-jjcolor="green" style="font-size:1.3em;vertical-align:-0.2em;"></span> ';
  html += 'Your goal weight is <strong>' + goal.goalWeight.toFixed(1) + ' kg</strong> (BMI ' + goal.idealBMI + ') - about <strong>' + goal.lossNeeded.toFixed(1) + ' kg</strong> to lose.';

  if (goal.weeksToSurgery && weeklyLoss > 0.05) {
    var reachWeeks = Math.ceil(goal.lossNeeded / weeklyLoss);
    var reachDate = new Date(Date.now() + reachWeeks * 7 * 86400000);
    var dateStr = reachDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    if (goal.achievable) {
      html += ' At your current plan you should reach it around <strong>' + dateStr + '</strong> - well within your surgery timeline. You\'ve got this!';
    } else {
      html += ' That\'s the most you can realistically lose by your surgery date, and every kilo makes a real difference.';
    }
  } else if (!goal.weeksToSurgery) {
    html += ' <span style="color:var(--text-muted);">Add your surgery date in My Account for a personalised timeline.</span>';
  }

  el.innerHTML = html;
  el.style.display = 'block';
  if (window.JJIcons) JJIcons.hydrate(el);
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
    // Minimum calories: higher than standard dieting minimums because
    // patients are doing a prehab exercise programme and need to preserve muscle
    const minCal = sex === 'male' ? 1600 : 1400;

    if (bmi > 30) {
      const targetWeight = 30 * Math.pow(height / 100, 2);
      const weightToLose = weight - targetWeight;

      // Time-aware deficit: calculate based on weeks until surgery
      var weeksToSurgery = null;
      var idealDeficit = 400; // default if no surgery date
      if (currentUser && currentUser.profile.surgeryDate) {
        var surgeryMs = new Date(currentUser.profile.surgeryDate).getTime() - Date.now();
        weeksToSurgery = Math.max(1, Math.round(surgeryMs / (7 * 86400000)));
        // kg per week needed, converted to daily cal deficit (1kg fat ≈ 7700 cal)
        var weeklyLossNeeded = weightToLose / weeksToSurgery;
        idealDeficit = Math.round((weeklyLossNeeded * 7700) / 7);
      }
      // Clamp deficit to 300-500 range
      var deficit = Math.max(300, Math.min(500, idealDeficit));
      calorieTarget = Math.max(tdee - deficit, minCal);
      deficit = tdee - calorieTarget; // recalc in case floor was hit

      var expectedWeeklyLoss = Math.round((deficit * 7 / 7700) * 10) / 10;
      var weeksAtThisRate = Math.ceil(weightToLose / Math.max(0.1, expectedWeeklyLoss));
      var canReachTarget = weeksToSurgery ? weeksAtThisRate <= weeksToSurgery : true;

      let html = '<div style="line-height:1.8;">';
      html += '<h4 style="margin-bottom:var(--space-sm);">📖 How we calculated this</h4>';
      html += '<p>Based on your age, height, weight, and activity level, your body uses roughly <strong>' + tdee.toLocaleString() + ' calories per day</strong> to maintain your current weight (your TDEE).</p>';
      if (weeksToSurgery) {
        html += '<p>With <strong>' + weeksToSurgery + ' weeks until your surgery</strong>, we\'ve calculated a <strong>' + deficit + '-calorie daily deficit</strong> tailored to your timeline. ';
        if (deficit === 300) {
          html += 'You have plenty of time, so we\'ve kept this gentle, no need to rush.</p>';
        } else if (deficit >= 450) {
          html += 'This is a moderate deficit to help you make meaningful progress before surgery.</p>';
        } else {
          html += 'This balances sustainable weight loss with preserving the muscle you need for surgery and recovery.</p>';
        }
      } else {
        html += '<p>We\'ve reduced this by <strong>' + deficit + ' calories</strong> to create a safe, sustainable calorie deficit.</p>';
      }
      html += '<h4 style="margin-bottom:var(--space-sm);">⚖️ What to expect</h4>';
      html += '<p>At this calorie level, you can expect to lose about <strong>' + expectedWeeklyLoss + 'kg per week</strong>. That preserves your muscle while losing fat, crash diets do the opposite, which is the last thing you need before surgery.</p>';
      html += '<p>To reach a BMI of 30, you\'d need to lose <strong>' + weightToLose.toFixed(1) + 'kg</strong>';
      if (weeksToSurgery && canReachTarget) {
        html += ', which should take roughly <strong>' + weeksAtThisRate + ' weeks</strong>, well within your surgery timeline. You\'ve got this!</p>';
      } else if (weeksToSurgery && !canReachTarget) {
        html += '. At this pace that would take about <strong>' + weeksAtThisRate + ' weeks</strong>, longer than your ' + weeksToSurgery + ' weeks to surgery. <strong>That\'s absolutely fine.</strong> Every kilo you lose makes a real difference. Research shows that even losing 2-3kg before surgery measurably improves outcomes and speeds recovery. Do what you can.</p>';
      } else {
        html += ', which would take roughly <strong>' + weeksAtThisRate + ' weeks</strong> at this pace.</p>';
      }
      html += '<h4 style="margin-bottom:var(--space-sm);">🥩 Why protein matters</h4>';
      html += '<p>Your protein target is <strong>' + proteinTarget + 'g per day</strong>, based on 1.2g per kg of lean body weight. We\'ve adjusted this for your body composition so it\'s realistic and achievable. Protein is essential because you\'re doing strengthening exercises, your muscles need it to repair and grow. Our recipes are designed to help you hit this target.</p>';
      html += '<p style="color:var(--text-muted); font-size:var(--font-size-sm);">We\'ve set a minimum of ' + minCal.toLocaleString() + ' calories per day, we\'ll never suggest going below this, as it wouldn\'t be safe or sustainable.</p>';
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

    // Goal weight (drives the banner here and the Weight Tracker feedback)
    var goal = computeGoalWeight(weight, height, bmi, tdee, minCal);
    renderGoalWeightBanner(goal, tdee - calorieTarget);
    currentUser.profile.goalWeight = goal.needsLoss ? goal.goalWeight : null;
    currentUser.profile.goalBMI = goal.idealBMI;

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
  // Update calculator first so the goal weight is current, then redraw history
  document.getElementById('calc-weight').value = weight;
  calculateNutrition();
  renderWeightHistory();
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

  // Goal weight feedback
  var goalW = currentUser.profile.goalWeight;
  if (goalW) {
    var latestW = log[log.length - 1].weight;
    if (latestW <= goalW) {
      html += '<div class="alert alert-success" style="margin-top:var(--space-md);">🎉 <strong>You\'ve reached your goal weight of ' + goalW.toFixed(1) + ' kg!</strong> Fantastic work, this puts you in a great position for surgery.</div>';
    } else {
      var toGo = Math.round((latestW - goalW) * 10) / 10;
      html += '<div class="alert alert-info" style="margin-top:var(--space-md);">🎯 <strong>' + toGo.toFixed(1) + ' kg to go</strong> to reach your goal weight of ' + goalW.toFixed(1) + ' kg. Keep going, you\'re making real progress!</div>';
    }
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
