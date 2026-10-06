/* Joint Journey - Heel-to-Toe Walking animation (DRAFT - awaiting physio sign-off)
   Side view uses inverse kinematics so each foot lands exactly one foot-length
   ahead of the other. A view from above shows the footprints on a single line. */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL, lerp = A.lerp, ease = A.ease;
  var STEP = 20;          // ankle-to-ankle distance per step = heel (5) + toe (16) - 1
  var SWING = 0.35;       // fraction of each foot's cycle spent swinging
  var BACK = -16, FRONT = 10;

  function baseY(angle) { return angle < 90 ? A.ANKLE_Y - A.L.toe * Math.cos(A.rad(angle)) : A.ANKLE_Y; }

  function footAt(phase, swingStart) {
    var p = (phase - swingStart + 1) % 1, x, y, f;
    if (p < SWING) {                          // swinging forward
      var sw = p / SWING;
      x = lerp(BACK, FRONT, ease(sw));
      f = sw < 0.5 ? lerp(66, 98, sw * 2) : lerp(98, 104, (sw - 0.5) * 2);
      y = baseY(f) - 9 * Math.sin(Math.PI * sw);
    } else {                                   // planted; body moves forward over it
      var q = (p - SWING) / (1 - SWING);
      x = lerp(FRONT, BACK, q);
      f = q < 0.1 ? lerp(104, 90, q / 0.1) : (q > 0.86 ? lerp(90, 66, (q - 0.86) / 0.14) : 90);
      y = baseY(f);                             // heel rises while toes stay on the floor
    }
    return { x: x, y: y, f: f };
  }

  A.exercises['heel-to-toe-walking'] = {
    title: 'Heel-to-Toe Walking',
    alt: 'A person walks slowly forward in a straight line, placing the heel of each foot directly in front of the toes of the other foot. A view from above shows the footprints touching heel to toe along a single line.',
    tip: 'Use a wall or kitchen worktop for light support if you need it. Look ahead, not down at your feet.',
    period: 4,
    poster: 0.3,
    viewBox: '0 0 320 266',

    scene: function (g, uid) {
      var period = this.period;
      el('line', { x1: 0, y1: A.FLOOR, x2: 320, y2: A.FLOOR, stroke: COL.floor, 'stroke-width': 2 }, g);
      var ticks = [];
      for (var i = 0; i < 18; i++) {
        ticks.push(el('line', { y1: A.FLOOR + 1, y2: A.FLOOR + 6, stroke: COL.floor, 'stroke-width': 2, 'stroke-linecap': 'round' }, g));
      }
      // View from above
      var clipId = 'jj-anim-clip-' + uid;
      var cp = el('clipPath', { id: clipId }, el('defs', {}, g));
      el('rect', { x: 14, y: 212, width: 292, height: 48, rx: 10 }, cp);
      el('rect', { x: 14, y: 212, width: 292, height: 48, rx: 10, fill: '#F1F5F3', stroke: '#DDE4E0' }, g);
      var strip = el('g', { 'clip-path': 'url(#' + clipId + ')' }, g);
      el('line', { x1: 14, y1: 232, x2: 306, y2: 232, stroke: COL.propEdge, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, strip);
      var prints = [];
      for (var j = 0; j < 12; j++) prints.push(el('ellipse', { cy: 232, rx: 13, ry: 4.8 }, strip));
      var target = el('ellipse', { cy: 232, rx: 13, ry: 4.8, fill: 'none', stroke: COL.hl, 'stroke-width': 1.5, 'stroke-dasharray': '3 2' }, strip);
      var label = el('text', { x: 24, y: 254, 'font-size': 9, fill: '#5B6B66',
        'font-family': 'Inter, -apple-system, Segoe UI, Arial, sans-serif' }, g);
      label.textContent = 'View from above: each heel lands touching the other toe, on one line';

      var K = 1.25, CX = 160;
      return function update(phase, sec) {
        var travel = (2 * STEP) * sec / period;          // distance walked so far
        for (var i = 0; i < ticks.length; i++) {
          var x = ((i * 20 - travel) % 360 + 360) % 360 - 20;
          ticks[i].setAttribute('x1', x.toFixed(1));
          ticks[i].setAttribute('x2', (x - 4).toFixed(1));
        }
        // Footprint n lands at world x = 24 + STEP*n, at time (0.35 + 0.5n) * period
        var nMax = Math.floor((sec / period - 0.35) / 0.5);
        for (var k = 0; k < prints.length; k++) {
          var n = nMax - k;
          if (n < 0) { prints[k].setAttribute('opacity', 0); continue; }
          prints[k].setAttribute('cx', (CX + K * (24 + STEP * n + 5.5 - travel)).toFixed(1));
          prints[k].setAttribute('fill', n % 2 === 0 ? COL.near : COL.far);
          prints[k].setAttribute('opacity', Math.max(0.15, 1 - k * 0.12).toFixed(2));
        }
        target.setAttribute('cx', (CX + K * (24 + STEP * (nMax + 1) + 5.5 - travel)).toFixed(1));
      };
    },

    pose: function (phase) {
      var hip = [150, 110 + 1.2 * Math.sin(4 * Math.PI * phase)];
      var b = A.body(hip, 3);
      var F = footAt(phase, 0), B = footAt(phase, 0.5);
      var sway = Math.sin(2 * Math.PI * phase);
      var caption = phase < 0.35 ? 'Step: put your heel right in front of your toes'
                  : phase < 0.5 ? 'Steady yourself'
                  : phase < 0.85 ? 'Step: heel to toe, keeping your feet on one line'
                  : 'Steady yourself';
      return {
        body: b,
        near: A.legIK(hip, [hip[0] + F.x, F.y], F.f),
        far: A.legIK([hip[0] - 2, hip[1]], [hip[0] - 2 + B.x, B.y], B.f),
        nearArm: A.armFK(b.shoulder, 14 + 4 * sway, 30),     // arms slightly out for balance
        farArm: A.armFK([b.shoulder[0] - 2, b.shoulder[1]], 10 - 4 * sway, 26),
        hl: 0,
        caption: caption
      };
    }
  };
})(window.JJAnim);
