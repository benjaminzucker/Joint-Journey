/* Joint Journey - Isometric Hamstring (Heel Dig) animation (DRAFT - awaiting physio sign-off)
   Seated, knee slightly bent, heel on the floor. Nothing moves: an arrow shows the
   heel pressing down and back, and the glow shows the back of the thigh working. */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;
  var HEEL = [192, 199];

  A.exercises['heel-dig'] = {
    title: 'Isometric Hamstring (Heel Dig)',
    alt: 'A person sitting on a chair with one leg forward, knee slightly bent and heel on the floor, digs the heel down and back into the floor without letting the leg move, holds, then relaxes. An arrow shows the heel pressing down and back.',
    tip: 'Nothing should move. You should feel the muscles at the back of your thigh tighten.',
    period: 8,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { p: 0 }, caption: 'Sit with your heel on the floor, knee slightly bent' },
      { t: 0.12, v: { p: 0 }, caption: 'Dig your heel down and back into the floor' },
      { t: 0.25, v: { p: 1 }, caption: 'Hold for {count}' },
      { t: 0.65, v: { p: 1 }, caption: 'Relax' },
      { t: 0.80, v: { p: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { p: 0 } }
    ],
    scene: function (g) {
      A.props.floor(g);
      A.props.chair(g);
      // Arrow pointing down and back from the heel
      var arrow = el('g', { opacity: 0 }, g);
      el('path', { d: 'M0,0 L-14,9', stroke: COL.hl, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' }, arrow);
      el('path', { d: 'M-17,11 L-8,11 L-13,4 Z', fill: COL.hl }, arrow);
      arrow.setAttribute('transform', 'translate(' + (HEEL[0] + 4) + ',' + (HEEL[1] - 12) + ')');
      var self = this;
      return function (phase) {
        arrow.setAttribute('opacity', A.sample(self.keys, phase, self.period).v.p.toFixed(2));
      };
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), p = s.v.p;
      var b = A.body([120, 154], 2 + p);
      var near = A.legIK([120, 154], [HEEL[0] + 5, HEEL[1] - 4], 70);
      var k = near.knee, h = near.hip;
      return {
        body: b,
        far: A.legFK([117, 154], 90, 0, 90),
        near: near,
        farArm: A.armFK([b.shoulder[0] - 2, b.shoulder[1]], 2, 58),
        nearArm: A.armFK(b.shoulder, 6, 62),
        hl: 0,
        // Back of the thigh (underneath, towards the knee)
        glows: [{ a: [A.lerp(h[0], k[0], 0.35), A.lerp(h[1], k[1], 0.35) + 5],
                  b: [A.lerp(h[0], k[0], 0.85), A.lerp(h[1], k[1], 0.85) + 5], o: p, w: 7 }],
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
