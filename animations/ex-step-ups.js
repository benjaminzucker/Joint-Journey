/* Joint Journey - Step Ups with Controlled Descent animation (DRAFT - awaiting physio sign-off)
   Two reps per cycle, one leading with each leg. The lead leg steps up first and stays
   on the stair on the way down, lowering the body slowly over about 3 seconds. */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;
  var STEP_X = 170, STEP_TOP = 176;         // bottom stair: front edge and top
  var UP = A.ANKLE_Y - (A.FLOOR - STEP_TOP); // ankle height on the stair
  function railY(x) { return 108 - (x - 150) * 0.45; }

  A.exercises['step-ups'] = {
    title: 'Step Ups with Controlled Descent',
    alt: 'A person holding the banister steps up onto the bottom stair with one leg, brings the other foot up, stands tall, then steps back down slowly, taking about three seconds to lower themselves. They then repeat leading with the other leg.',
    tip: 'Always hold the banister. Control on the way down matters more than the way up.',
    period: 20,
    poster: 0.21,
    keys: (function () {
      // One rep: [t, hip x, hip y, lean, lead foot x, y, angle, other foot x, y, angle, glow, caption]
      // Lead leg steps up first and stays on the stair to lower the body on the way down.
      var REP = [
        [0.00, 140, 109, 3, 144, 195, 90, 138, 195, 90, 0, 'Stand facing the stair, holding the banister'],
        [0.08, 140, 109, 3, 144, 195, 90, 138, 195, 90, 0, 'STEP'],
        [0.15, 143, 109, 6, 166, 166, 100, 138, 195, 90, 0.3, 'STEP'],
        [0.22, 148, 109, 12, 186, UP, 90, 138, 195, 90, 0.6, 'Push up through that leg'],
        [0.33, 170, 94, 8, 186, UP, 90, 158, 164, 100, 1, 'Push up through that leg'],
        [0.40, 182, 86, 3, 186, UP, 90, 180, UP, 90, 0.4, 'Stand tall on the step'],
        [0.48, 182, 86, 3, 186, UP, 90, 180, UP, 90, 0.4, 'Step down slowly: 3'],
        [0.57, 178, 92, 8, 186, UP, 90, 162, 166, 96, 1, 'Step down slowly: 2'],
        [0.66, 160, 104, 12, 186, UP, 90, 146, 186, 94, 1, 'Step down slowly: 1'],
        [0.75, 150, 110, 10, 186, UP, 90, 138, 195, 90, 0.6, 'Bring the other foot down'],
        [0.83, 143, 109, 6, 164, 168, 100, 138, 195, 90, 0.2, 'Bring the other foot down'],
        [0.92, 140, 109, 3, 144, 195, 90, 138, 195, 90, 0, 'Pause']
      ];
      var out = [];
      [0, 1].forEach(function (rep) {
        REP.forEach(function (r) {
          var lead = { x: r[4], y: r[5], f: r[6] }, other = { x: r[7], y: r[8], f: r[9] };
          // Rep 1 leads with the near leg; rep 2 leads with the far leg (feet keep their side-by-side offset)
          var n = rep ? { x: other.x + 6, y: other.y, f: other.f } : lead;
          var f = rep ? { x: lead.x - 6, y: lead.y, f: lead.f } : other;
          var cap = r[11] === 'STEP' ? (rep ? 'Now lead with the other leg' : 'Step up with one leg') : r[11];
          if (rep && r[0] === 0) cap = 'Now the other leg';
          if (r[11] === 'Pause') cap = rep ? 'Relax, then repeat' : 'Now swap legs';
          out.push({ t: rep * 0.5 + r[0] * 0.5,
            v: { hx: r[1], hy: r[2], ln: r[3], nx: n.x, ny: n.y, nf: n.f, fx: f.x, fy: f.y, ff: f.f,
                 hl: rep ? 0 : r[10], hlF: rep ? r[10] : 0 },
            caption: cap });
        });
      });
      var last = out[0];
      out.push({ t: 1, v: last.v });
      return out;
    })(),
    scene: function (g) {
      A.props.floor(g);
      // Banister on the far side: post and sloping handrail
      el('line', { x1: 156, y1: A.FLOOR, x2: 156, y2: railY(156), stroke: COL.propEdge, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
      el('line', { x1: 150, y1: railY(150), x2: 320, y2: railY(320), stroke: '#B79A76', 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
      // Bottom two stairs
      el('rect', { x: STEP_X + 60, y: STEP_TOP - 24, width: 100, height: A.FLOOR - STEP_TOP + 24, rx: 2, fill: COL.prop, stroke: COL.propEdge, 'stroke-width': 1.5 }, g);
      el('rect', { x: STEP_X, y: STEP_TOP, width: 160, height: A.FLOOR - STEP_TOP, rx: 2, fill: COL.prop, stroke: COL.propEdge, 'stroke-width': 1.5 }, g);
      return null;
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), v = s.v;
      var hip = [v.hx, v.hy], b = A.body(hip, v.ln);
      var fs = [b.shoulder[0] - 2, b.shoulder[1]], hx = fs[0] + 20;
      return {
        body: b,
        far: A.legIK([hip[0] - 2, hip[1]], [v.fx, v.fy], v.ff),
        near: A.legIK(hip, [v.nx, v.ny], v.nf),
        farArm: A.armIK(fs, [hx, railY(hx) - 2]),          // hand on the banister
        nearArm: A.armFK(b.shoulder, v.ln + 8, v.ln + 30),
        hl: v.hl,
        hlFar: v.hlF,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
