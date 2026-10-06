/* Joint Journey - Tandem Standing (Balance) animation (DRAFT - awaiting physio sign-off)
   Only one foot moves at a time, and every move is a real step: heel lifts, foot arcs
   through the air and lands. Near foot steps in front and holds, steps back; then the
   far foot does the same. A view from above shows the feet side by side, then on one line. */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;
  var HOME_N = 150, HOME_F = 147;      // feet together (ankle x)
  var BACK = 142, FRONT = BACK + 21;   // tandem: front heel touches back toe (toe 16 + heel 5)
  var STEP_T = 0.06;                   // fraction of the cycle a single step takes

  // Each step: [start t, foot ('n' | 'f'), from x, to x]
  var STEPS = [
    [0.05, 'f', HOME_F, BACK],          // shuffle back foot back a little
    [0.12, 'n', HOME_N, FRONT],         // near foot steps in front
    [0.45, 'n', FRONT, HOME_N],         // back beside
    [0.52, 'f', BACK, HOME_F],
    [0.57, 'n', HOME_N, BACK + 3],      // near foot back, far foot steps in front
    [0.64, 'f', HOME_F, FRONT],
    [0.90, 'f', FRONT, HOME_F],
    [0.95, 'n', BACK + 3, HOME_N]
  ];
  function footAt(which, phase) {
    var x = which === 'n' ? HOME_N : HOME_F, lift = 0;
    for (var i = 0; i < STEPS.length; i++) {
      var s = STEPS[i];
      if (s[1] !== which || phase < s[0]) continue;
      var u = Math.min(1, (phase - s[0]) / STEP_T);
      x = A.lerp(s[2], s[3], A.ease(u));
      lift = u < 1 ? Math.sin(Math.PI * u) : 0;
    }
    return { x: x, lift: lift };
  }
  function captionAt(p) {
    if (p < 0.12) return 'Stand tall, holding the worktop lightly';
    if (p < 0.19) return 'Step one foot right in front of the other';
    if (p < 0.45) return 'Heel touching toe: hold for ' + secs(0.45 - p);
    if (p < 0.57) return 'Step back to feet together';
    if (p < 0.71) return 'Now step the other foot in front';
    if (p < 0.90) return 'Heel touching toe: hold for ' + secs(0.90 - p);
    return 'Step back to feet together';
  }
  var PERIOD = 16;
  function secs(f) { var n = Math.max(1, Math.ceil(f * PERIOD - 1e-6)); return n + (n === 1 ? ' second' : ' seconds'); }

  A.exercises['tandem-standing'] = {
    title: 'Tandem Standing (Balance)',
    alt: 'A person holding the kitchen worktop lightly steps one foot directly in front of the other so the heel touches the toes, balances, steps back to feet together, then does the same with the other foot in front. A view from above shows the feet side by side, then on a single line.',
    tip: 'Hold the worktop lightly. Try to use less hand support over time.',
    period: PERIOD,
    poster: 0.3,
    viewBox: '0 0 320 266',
    scene: function (g) {
      A.props.floor(g);
      A.props.worktop(g);
      // View from above
      el('rect', { x: 14, y: 212, width: 292, height: 48, rx: 10, fill: '#F1F5F3', stroke: '#DDE4E0' }, g);
      el('line', { x1: 24, y1: 230, x2: 296, y2: 230, stroke: COL.propEdge, 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }, g);
      // Foot shape pointing right, heel at x = 0, about 26 long
      var FOOT = 'M0,0 C0,-3.4 3,-4.2 8,-4.2 C16,-4.6 22,-5.4 25,-3 C27.5,-1 27.5,1 25,3 C22,5.4 16,4.6 8,4.2 C3,4.2 0,3.4 0,0 Z';
      function print(fill) { return el('path', { d: FOOT, fill: fill, stroke: fill, 'stroke-width': 1 }, g); }
      var farPrint = print(COL.far), nearPrint = print(COL.near);
      var touch = el('circle', { r: 3.2, fill: 'none', stroke: COL.hl, 'stroke-width': 1.6, opacity: 0 }, g);
      var label = el('text', { x: 24, y: 254, 'font-size': 9, fill: '#5B6B66',
        'font-family': 'Inter, -apple-system, Segoe UI, Arial, sans-serif' }, g);
      label.textContent = 'View from above: heel touching toe, both feet on one line';
      var K = 1.25, CX = 160;
      return function update(phase) {
        var n = footAt('n', phase), f = footAt('f', phase);
        // Side offset: feet together sit either side of the line; once apart by a foot length they line up
        var tandem = A.clamp((Math.abs(n.x - f.x) - 6) / 12, 0, 1);
        function place(node, foot, side) {
          var hx = CX + K * (foot.x - 5 - HOME_N), y = 230 + side * 6 * (1 - tandem);
          node.setAttribute('transform', 'translate(' + hx.toFixed(1) + ',' + y.toFixed(1) + ') scale(' + K + ')');
          node.setAttribute('fill-opacity', foot.lift > 0.05 ? 0.25 : 1);
          node.setAttribute('stroke-dasharray', foot.lift > 0.05 ? '2 2' : 'none');
        }
        place(farPrint, f, -1);
        place(nearPrint, n, 1);
        var still = n.lift < 0.05 && f.lift < 0.05;
        touch.setAttribute('opacity', still && tandem > 0.95 ? 1 : 0);
        var heel = Math.max(n.x, f.x) - 5;   // front foot's heel
        touch.setAttribute('cx', (CX + K * (heel - HOME_N)).toFixed(1));
        touch.setAttribute('cy', 230);
      };
    },
    pose: function (phase, sec) {
      var n = footAt('n', phase), f = footAt('f', phase);
      // Hips settle over the middle of the planted feet, with a small balance wobble
      var mid = (n.x + f.x) / 2, wob = 0.5 * Math.sin(sec * 2.1);
      var hip = [mid + 1 + wob, 110.5 - 1.5 * Math.max(n.lift, f.lift)], b = A.body(hip, 3);
      function foot(ft) {   // heel rises first, toe leaves the floor, lands heel first
        return { p: [ft.x, A.ANKLE_Y - 10 * ft.lift], a: 90 - 20 * ft.lift };
      }
      var nf = foot(n), ff = foot(f), G = A.props.GRIP;
      return {
        body: b,
        far: A.legIK([hip[0] - 2, hip[1]], ff.p, ff.a),
        near: A.legIK(hip, nf.p, nf.a),
        farArm: A.armIK([b.shoulder[0] - 2, b.shoulder[1]], [G[0] - 2, G[1] + 1]),
        nearArm: A.armIK(b.shoulder, [G[0], G[1] + 1]),
        hl: 0,
        caption: captionAt(phase)
      };
    }
  };
})(window.JJAnim);
