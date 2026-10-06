/* Joint Journey - Seated Heel Slides animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';

  A.exercises['seated-heel-slides'] = {
    title: 'Seated Heel Slides',
    alt: 'A person sitting in a chair slides one foot back along the floor under the chair, bending the knee as far as is comfortable, then slides it forward again.',
    tip: 'Keep your foot in contact with the floor. Only bend as far as is comfortable.',
    period: 7,
    poster: 0.45,
    keys: [
      { t: 0.00, v: { x: 166 }, caption: 'Sit tall with your foot on the floor' },
      { t: 0.10, v: { x: 166 }, caption: 'Slide your foot back under the chair' },
      { t: 0.40, v: { x: 138 }, caption: 'Hold for {count}' },
      { t: 0.55, v: { x: 138 }, caption: 'Slide your foot back out' },
      { t: 0.85, v: { x: 166 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { x: 166 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.chair(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var b = A.body([120, 154], 2);
      return {
        body: b,
        far: A.legFK([117, 154], 90, 0, 90),
        near: A.legIK([120, 154], [s.v.x, A.ANKLE_Y], 90),
        farArm: A.armFK([b.shoulder[0] - 2, b.shoulder[1]], 2, 58),
        nearArm: A.armFK(b.shoulder, 6, 62),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
