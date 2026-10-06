/* Joint Journey - Glute Sets animation (DRAFT - awaiting physio sign-off)
   Lying on the back, legs straight. Nothing moves: the buttocks glow as they
   squeeze, with small squeeze marks either side. */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;

  A.exercises['glute-sets'] = {
    title: 'Glute Sets',
    alt: 'A person lying on their back with legs straight squeezes their buttocks together as firmly as is comfortable, holds, then relaxes. Nothing moves; the buttock muscles are highlighted while squeezing.',
    tip: 'Squeeze only as firmly as is comfortable. Keep breathing normally while you hold. You can also do this sitting.',
    period: 8,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { p: 0 }, caption: 'Lie on your back, legs straight' },
      { t: 0.12, v: { p: 0 }, caption: 'Squeeze your buttocks together' },
      { t: 0.25, v: { p: 1 }, caption: 'Hold for {count}' },
      { t: 0.65, v: { p: 1 }, caption: 'Relax' },
      { t: 0.80, v: { p: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { p: 0 } }
    ],
    scene: function (g) {
      A.props.floor(g);
      A.props.mat(g);
      // Squeeze marks round the buttocks
      var marks = el('g', { opacity: 0, stroke: COL.hl, 'stroke-width': 2, 'stroke-linecap': 'round', fill: 'none' }, g);
      el('path', { d: 'M150,168 L146,163' }, marks);
      el('path', { d: 'M170,168 L174,163' }, marks);
      el('path', { d: 'M160,166 L160,160' }, marks);
      var self = this;
      return function (phase) {
        marks.setAttribute('opacity', A.sample(self.keys, phase, self.period).v.p.toFixed(2));
      };
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), p = s.v.p;
      var hip = [158, 188 - 0.6 * p], b = A.body(hip, -86);
      return {
        body: b,
        far: A.legFK([hip[0] - 1, hip[1]], 90, 90, 160),
        near: A.legFK(hip, 90, 90, 160),
        farArm: A.armFK([b.shoulder[0], b.shoulder[1] + 1], 85, 88),
        nearArm: A.armFK([b.shoulder[0], b.shoulder[1] + 2], 85, 88),
        hl: 0,
        // Buttock: underneath the hip, against the mat
        glows: [{ a: [149, 194], b: [167, 194], o: p, w: 6 }],
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
