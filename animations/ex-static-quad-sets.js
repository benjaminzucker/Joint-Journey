/* Joint Journey - Static Quad Sets animation (DRAFT - awaiting physio sign-off)
   Nothing moves much: the amber glow shows the thigh tightening. */
(function (A) {
  'use strict';

  A.exercises['static-quad-sets'] = {
    title: 'Static Quad Sets',
    alt: 'A person lying on their back with one leg straight tightens the thigh muscle and gently pushes the back of the knee down into the bed, holds, then relaxes. The leg barely moves.',
    tip: 'The leg should hardly move. You should feel the muscle at the front of your thigh go firm.',
    period: 8,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { foot: 176, hl: 0.3 }, caption: 'Lie with your leg straight out' },
      { t: 0.12, v: { foot: 176, hl: 0.3 }, caption: 'Tighten your thigh and push the back of your knee down' },
      { t: 0.25, v: { foot: 188, hl: 1 }, caption: 'Hold for {count}' },
      { t: 0.65, v: { foot: 188, hl: 1 }, caption: 'Relax' },
      { t: 0.80, v: { foot: 176, hl: 0.3 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { foot: 176, hl: 0.3 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.mat(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var hip = [158, 188], b = A.body(hip, -86);
      return {
        body: b,
        far: A.legFK([hip[0] - 1, hip[1]], 140, 30, 90),   // other knee bent for comfort
        near: A.legFK(hip, 90, 90, s.v.foot),
        farArm: A.armFK([b.shoulder[0], b.shoulder[1] + 1], 85, 88),
        nearArm: A.armFK([b.shoulder[0], b.shoulder[1] + 2], 85, 88),
        hl: s.v.hl,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
