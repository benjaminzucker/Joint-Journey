/* Joint Journey - Seated Marching animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';

  A.exercises['seated-marching'] = {
    title: 'Seated Marching',
    alt: 'A person sitting tall in a chair lifts one knee up and puts the foot back down, then lifts the other knee, marching at a steady rhythm.',
    tip: 'Sit tall and lift your knees only as high as is comfortable.',
    period: 3,
    poster: 0.2,
    keys: [
      { t: 0.00, v: { n: 0, f: 0 }, caption: 'Lift one knee' },
      { t: 0.20, v: { n: 1, f: 0 }, caption: 'Lift one knee' },
      { t: 0.40, v: { n: 0, f: 0 }, caption: 'Now the other knee' },
      { t: 0.50, v: { n: 0, f: 0 }, caption: 'Now the other knee' },
      { t: 0.70, v: { n: 0, f: 1 }, caption: 'Now the other knee' },
      { t: 0.90, v: { n: 0, f: 0 }, caption: 'Keep a steady rhythm' },
      { t: 1.00, v: { n: 0, f: 0 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.chair(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var b = A.body([120, 154], 2);
      function leg(hip, u) { return A.legFK(hip, 90 + 22 * u, 4 * u, 90 + 6 * u); }
      return {
        body: b,
        far: leg([117, 154], s.v.f),
        near: leg([120, 154], s.v.n),
        farArm: A.armFK([b.shoulder[0] - 2, b.shoulder[1]], 2, 40),
        nearArm: A.armFK(b.shoulder, 6, 44),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
