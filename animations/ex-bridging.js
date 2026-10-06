/* Joint Journey - Bridging animation (DRAFT - awaiting physio sign-off)
   Shoulders and feet stay on the mat while the hips lift. */
(function (A) {
  'use strict';

  A.exercises['bridging'] = {
    title: 'Bridging',
    alt: 'A person lying on their back with both knees bent and feet flat squeezes their buttocks and lifts their hips off the bed, holds for three seconds, then lowers slowly.',
    tip: 'Lift only as high as is comfortable. Keep your shoulders and feet on the bed.',
    period: 9,
    poster: 0.45,
    keys: [
      { t: 0.00, v: { lift: 0 }, caption: 'Lie on your back, knees bent, feet flat' },
      { t: 0.10, v: { lift: 0 }, caption: 'Squeeze your buttocks and lift your hips' },
      { t: 0.32, v: { lift: 1 }, caption: 'Hold for {count}' },
      { t: 0.65, v: { lift: 1 }, caption: 'Lower slowly' },
      { t: 0.90, v: { lift: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { lift: 0 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.mat(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var neck = A.body([158, 188], -86).neck;           // shoulders stay put
      var hip = [160, 188 - 16 * s.v.lift];
      var lean = Math.atan2(neck[0] - hip[0], hip[1] - neck[1]) * 180 / Math.PI;
      var b = A.body(hip, lean);
      return {
        body: b,
        far: A.legIK([hip[0] - 1, hip[1]], [204, A.ANKLE_Y], 90),
        near: A.legIK(hip, [208, A.ANKLE_Y], 90),
        farArm: A.armFK([b.shoulder[0], b.shoulder[1] + 1], 85, 88),
        nearArm: A.armFK([b.shoulder[0], b.shoulder[1] + 2], 85, 88),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
