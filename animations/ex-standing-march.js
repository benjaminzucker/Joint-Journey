/* Joint Journey - Standing March animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';

  A.exercises['standing-march'] = {
    title: 'Standing March',
    alt: 'A person standing upright marches on the spot, lifting each knee in turn towards hip height and swinging the opposite arm.',
    tip: 'Stand near a worktop in case you need support. Lift your knees only as high as is comfortable.',
    period: 2.4,
    poster: 0.2,
    keys: [
      { t: 0.00, v: { n: 0, f: 0 }, caption: 'March on the spot' },
      { t: 0.22, v: { n: 1, f: 0 }, caption: 'March on the spot' },
      { t: 0.45, v: { n: 0, f: 0 }, caption: 'Lift your knees and pump your arms' },
      { t: 0.50, v: { n: 0, f: 0 }, caption: 'Lift your knees and pump your arms' },
      { t: 0.72, v: { n: 0, f: 1 }, caption: 'Lift your knees and pump your arms' },
      { t: 0.95, v: { n: 0, f: 0 }, caption: 'March on the spot' },
      { t: 1.00, v: { n: 0, f: 0 } }
    ],
    scene: function (g) { A.props.floor(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), n = s.v.n, f = s.v.f;
      var lift = Math.max(n, f);
      var hip = [150, 109], b = A.body(hip, 3);
      function leg(h, u) { return A.legFK(h, 80 * u, 4 * u, 90 + 20 * u); }
      var swing = 34 * (n - f);   // near arm forward when the far knee lifts, and back when the near knee lifts
      return {
        body: b,
        far: leg([hip[0] - 2, hip[1]], f),
        near: leg(hip, n),
        farArm: A.armFK([b.shoulder[0] - 2, b.shoulder[1]], swing, swing + 60),
        nearArm: A.armFK(b.shoulder, -swing, -swing + 60 + 10 * lift),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
