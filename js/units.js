/* ============================================
   JOINT JOURNEY - Units (Metric / Imperial)
   --------------------------------------------
   All weights/heights are STORED IN METRIC (kg, cm) internally.
   Imperial is purely a display/entry convenience: the imperial input
   fields write their converted metric value into the existing metric
   inputs (calc-weight, calc-height, weight-entry, onboard-*), so every
   downstream calculation keeps working on metric untouched.
   ============================================ */

(function () {
  var LB_PER_KG = 2.2046226218;

  function kgToLb(kg) { return kg * LB_PER_KG; }
  function lbToKg(lb) { return lb / LB_PER_KG; }
  function kgToStLb(kg) {
    var totLb = kgToLb(kg);
    var st = Math.floor(totLb / 14);
    var lb = totLb - st * 14;
    return { st: st, lb: lb };
  }
  function cmToFtIn(cm) {
    var totIn = cm / 2.54;
    var ft = Math.floor(totIn / 12);
    var inch = totIn - ft * 12;
    return { ft: ft, inch: inch };
  }
  function ftInToCm(ft, inch) { return (((+ft || 0) * 12) + (+inch || 0)) * 2.54; }

  function getUnits() {
    try {
      if (window.currentUser && currentUser.profile && currentUser.profile.units) {
        return currentUser.profile.units;
      }
    } catch (e) { }
    return 'metric';
  }
  function setUnits(u) {
    try {
      if (window.currentUser && currentUser.profile) {
        currentUser.profile.units = u;
        if (typeof saveUser === 'function') saveUser();
      }
    } catch (e) { }
  }

  // ----- Display formatters (input is always kg) -----
  function fmtWeight(kg) {
    if (kg == null || isNaN(kg)) return '--';
    if (getUnits() === 'imperial') {
      var o = kgToStLb(kg);
      var st = o.st, lb = Math.round(o.lb);
      if (lb >= 14) { st += 1; lb -= 14; }
      return st + ' st ' + lb + ' lb';
    }
    return (Math.round(kg * 10) / 10).toFixed(1) + ' kg';
  }
  // A plain amount of weight (e.g. "amount to lose"), no sign
  function fmtWeightAmount(kg) {
    if (kg == null || isNaN(kg)) return '--';
    if (getUnits() === 'imperial') {
      return (Math.round(kgToLb(kg) * 10) / 10).toFixed(1) + ' lb';
    }
    return (Math.round(kg * 10) / 10).toFixed(1) + ' kg';
  }
  // A signed change (e.g. total change on the tracker)
  function fmtWeightDelta(kg) {
    var sign = kg > 0 ? '+' : '';
    if (getUnits() === 'imperial') {
      return sign + (Math.round(kgToLb(kg) * 10) / 10).toFixed(1) + ' lb';
    }
    return sign + (Math.round(kg * 10) / 10).toFixed(1) + ' kg';
  }
  // Chart axis label (numeric only)
  function axisLabel(kg) {
    if (getUnits() === 'imperial') return String(Math.round(kgToLb(kg)));
    return (Math.round(kg * 10) / 10).toFixed(1);
  }
  function unitShort() { return getUnits() === 'imperial' ? 'lb' : 'kg'; }

  // ----- DOM helpers -----
  function $(id) { return document.getElementById(id); }
  function show(id, on) { var el = $(id); if (el) el.style.display = on ? '' : 'none'; }
  function setVal(id, v) { var el = $(id); if (el) el.value = v; }
  function getNum(id) { var el = $(id); return el ? parseFloat(el.value) : NaN; }

  // Populate the imperial fields of a group from the metric source input
  function populateCalcImperialFromMetric() {
    var kg = getNum('calc-weight');
    if (!isNaN(kg)) { var o = kgToStLb(kg); setVal('calc-weight-st', o.st); setVal('calc-weight-lb', Math.round(o.lb * 10) / 10); }
    var cm = getNum('calc-height');
    if (!isNaN(cm)) { var h = cmToFtIn(cm); setVal('calc-height-ft', h.ft); setVal('calc-height-in', Math.round(h.inch * 10) / 10); }
  }
  function populateOnboardImperialFromMetric() {
    var kg = getNum('onboard-weight');
    if (!isNaN(kg)) { var o = kgToStLb(kg); setVal('onboard-weight-st', o.st); setVal('onboard-weight-lb', Math.round(o.lb * 10) / 10); }
    var cm = getNum('onboard-height');
    if (!isNaN(cm)) { var h = cmToFtIn(cm); setVal('onboard-height-ft', h.ft); setVal('onboard-height-in', Math.round(h.inch * 10) / 10); }
  }

  // Reflect the chosen units in both dropdowns + toggle all input groups
  function applyPreferenceToUI(u) {
    var imperial = u === 'imperial';
    // Dropdowns (may not all be present depending on page)
    setVal('calc-units', u);
    setVal('weight-units', u);
    setVal('onboard-units', u);
    // Calculator groups
    show('calc-weight-metric-group', !imperial);
    show('calc-weight-imperial-group', imperial);
    show('calc-height-metric-group', !imperial);
    show('calc-height-imperial-group', imperial);
    // Weight tracker groups
    show('weight-entry-metric-group', !imperial);
    show('weight-entry-imperial-group', imperial);
    // Onboarding groups
    show('onboard-weight-metric-group', !imperial);
    show('onboard-weight-imperial-group', imperial);
    show('onboard-height-metric-group', !imperial);
    show('onboard-height-imperial-group', imperial);
    if (imperial) { populateCalcImperialFromMetric(); populateOnboardImperialFromMetric(); }
  }

  // ----- Public change handlers (wired from inline onchange/oninput) -----
  function setCalcUnits(u) {
    setUnits(u);
    applyPreferenceToUI(u);
    if (typeof calculateNutrition === 'function') calculateNutrition();
    if (typeof renderWeightHistory === 'function') renderWeightHistory();
  }
  function setWeightUnits(u) { setCalcUnits(u); }
  function setOnboardUnits(u) { setUnits(u); applyPreferenceToUI(u); }

  // Imperial -> metric sync for the calculator
  function onCalcImperialInput() {
    var st = getNum('calc-weight-st'); var lb = getNum('calc-weight-lb');
    if (!isNaN(st) || !isNaN(lb)) setVal('calc-weight', Math.round(lbToKg((st || 0) * 14 + (lb || 0)) * 10) / 10);
    var ft = getNum('calc-height-ft'); var inch = getNum('calc-height-in');
    if (!isNaN(ft) || !isNaN(inch)) setVal('calc-height', Math.round(ftInToCm(ft || 0, inch || 0)));
    if (typeof calculateNutrition === 'function') calculateNutrition();
  }
  // Imperial -> metric sync for onboarding
  function onOnboardImperialInput() {
    var st = getNum('onboard-weight-st'); var lb = getNum('onboard-weight-lb');
    if (!isNaN(st) || !isNaN(lb)) setVal('onboard-weight', Math.round(lbToKg((st || 0) * 14 + (lb || 0)) * 10) / 10);
    var ft = getNum('onboard-height-ft'); var inch = getNum('onboard-height-in');
    if (!isNaN(ft) || !isNaN(inch)) setVal('onboard-height', Math.round(ftInToCm(ft || 0, inch || 0)));
  }

  // Read the weight-tracker entry as kg regardless of the active units
  function getWeightEntryKg() {
    if (getUnits() === 'imperial') {
      var st = getNum('weight-entry-st'); var lb = getNum('weight-entry-lb');
      if (isNaN(st) && isNaN(lb)) return NaN;
      return lbToKg((st || 0) * 14 + (lb || 0));
    }
    return getNum('weight-entry');
  }
  function clearWeightEntry() {
    setVal('weight-entry', ''); setVal('weight-entry-st', ''); setVal('weight-entry-lb', '');
  }

  window.JJUnits = {
    kgToLb: kgToLb, lbToKg: lbToKg, kgToStLb: kgToStLb, cmToFtIn: cmToFtIn, ftInToCm: ftInToCm,
    getUnits: getUnits, setUnits: setUnits,
    fmtWeight: fmtWeight, fmtWeightAmount: fmtWeightAmount, fmtWeightDelta: fmtWeightDelta,
    axisLabel: axisLabel, unitShort: unitShort,
    applyPreferenceToUI: applyPreferenceToUI, getWeightEntryKg: getWeightEntryKg, clearWeightEntry: clearWeightEntry
  };

  // Expose inline handlers globally
  window.setCalcUnits = setCalcUnits;
  window.setWeightUnits = setWeightUnits;
  window.setOnboardUnits = setOnboardUnits;
  window.onCalcImperialInput = onCalcImperialInput;
  window.onOnboardImperialInput = onOnboardImperialInput;
})();
