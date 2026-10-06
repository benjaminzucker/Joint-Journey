/* Joint Journey - Standing Knee Bend animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';

  A.exercises['standing-knee-bend'] = {
    title: 'Standing Knee Bend',
    alt: 'A person standing upright holding the kitchen worktop slowly bends one knee, bringing the heel up towards the buttock as far as is comfortable, then slowly lowers the foot.',
    tip: 'Keep your thighs side by side. Only bend as far as is comfortable.',
    period: 7,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { k: 0 }, caption: 'Stand tall, holding the worktop' },
      { t: 0.10, v: { k: 0 }, caption: 'Bend your knee, heel towards your buttock' },
      { t: 0.35, v: { k: 1 }, caption: 'Hold for {count}' },
      { t: 0.55, v: { k: 1 }, caption: 'Slowly lower your foot' },
      { t: 0.85, v: { k: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { k: 0 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.worktop(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), k = s.v.k;
      var hip = [140, 109], b = A.body(hip, 3);
      var shin = -95 * k;
      return {
        body: b,
        far: A.legFK([hip[0] - 2, hip[1]], 0, 0, 90),
        near: A.legFK(hip, 4 * k, shin, 90 + shin * 1.1),
        farArm: A.armIK([b.shoulder[0] - 2, b.shoulder[1]], [A.props.GRIP[0] - 2, A.props.GRIP[1]]),
        nearArm: A.armIK(b.shoulder, A.props.GRIP),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
