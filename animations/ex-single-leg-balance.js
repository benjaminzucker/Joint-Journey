/* Joint Journey - Single Leg Balance animation (DRAFT - awaiting physio sign-off)
   Hands rest lightly on the worktop; one foot lifts just off the floor, then the other. */
(function (A) {
  'use strict';

  A.exercises['single-leg-balance'] = {
    title: 'Single Leg Balance',
    alt: 'A person standing at the kitchen worktop with fingertips resting on it lifts one foot slightly off the floor by bending the knee, balances, lowers it, then does the same with the other foot.',
    tip: 'Stay close to the worktop. Rest your fingertips on it and use less support as you get steadier.',
    period: 14,
    poster: 0.25,
    keys: [
      { t: 0.00, v: { n: 0, f: 0 }, caption: 'Stand tall, fingertips on the worktop' },
      { t: 0.06, v: { n: 0, f: 0 }, caption: 'Lift one foot just off the floor' },
      { t: 0.14, v: { n: 1, f: 0 }, caption: 'Balance for {count}' },
      { t: 0.40, v: { n: 1, f: 0 }, caption: 'Lower your foot' },
      { t: 0.48, v: { n: 0, f: 0 }, caption: 'Now the other foot' },
      { t: 0.56, v: { n: 0, f: 0 }, caption: 'Now the other foot' },
      { t: 0.64, v: { n: 0, f: 1 }, caption: 'Balance for {count}' },
      { t: 0.90, v: { n: 0, f: 1 }, caption: 'Lower your foot' },
      { t: 0.98, v: { n: 0, f: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { n: 0, f: 0 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.worktop(g); return null; },
    pose: function (phase, sec) {
      var s = A.sample(this.keys, phase, this.period), n = s.v.n, f = s.v.f;
      var sway = 0.8 * Math.sin(sec * 2.3) * Math.max(n, f);   // small natural wobble while balancing
      var hip = [150 + sway, 109], b = A.body(hip, 3);
      function leg(h, x, u) {   // u = 0 foot flat, 1 foot lifted behind with the knee bent
        return A.legIK(h, [x - 8 * u, A.ANKLE_Y - 16 * u], 90 + 25 * u);
      }
      var G = A.props.GRIP;
      return {
        body: b,
        far: leg([hip[0] - 2, hip[1]], 148, f),
        near: leg(hip, 153, n),
        farArm: A.armIK([b.shoulder[0] - 2, b.shoulder[1]], [G[0] - 2, G[1] + 1]),
        nearArm: A.armIK(b.shoulder, [G[0], G[1] + 1]),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
