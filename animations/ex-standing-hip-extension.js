/* Joint Journey - Standing Hip Extension animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';

  A.exercises['standing-hip-extension'] = {
    title: 'Standing Hip Extension',
    alt: 'A person standing upright holding the kitchen worktop slowly moves one straight leg backwards, squeezes the buttock at the top, then brings the leg back.',
    tip: 'Keep your body upright and your knee straight. Do not arch your back.',
    period: 7,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { e: 0 }, caption: 'Stand tall, holding the worktop' },
      { t: 0.10, v: { e: 0 }, caption: 'Move one leg backwards, knee straight' },
      { t: 0.35, v: { e: -22 }, caption: 'Squeeze your buttock for {count}' },
      { t: 0.55, v: { e: -22 }, caption: 'Return slowly' },
      { t: 0.85, v: { e: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { e: 0 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.worktop(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), e = s.v.e;
      var hip = [140, 109], b = A.body(hip, 3 - e * 0.1);
      return {
        body: b,
        far: A.legFK([hip[0] - 2, hip[1]], 0, 0, 90),
        near: A.legFK(hip, e, e, 90 + e * 0.6),
        farArm: A.armIK([b.shoulder[0] - 2, b.shoulder[1]], [A.props.GRIP[0] - 2, A.props.GRIP[1]]),
        nearArm: A.armIK(b.shoulder, A.props.GRIP),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
