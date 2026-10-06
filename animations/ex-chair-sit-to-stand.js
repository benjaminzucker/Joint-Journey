/* Joint Journey - Chair Sit-to-Stand animation (DRAFT - awaiting physio sign-off)
   Feet stay planted (inverse kinematics) while the hips travel from the seat to standing. */
(function (A) {
  'use strict';

  A.exercises['chair-sit-to-stand'] = {
    title: 'Chair Sit-to-Stand',
    alt: 'A person sitting in a sturdy chair leans forward, stands up using their legs, pauses standing tall, then slowly sits back down with control.',
    tip: 'Use a sturdy chair that will not slide. Use the armrests if you need to.',
    period: 9,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { x: 120, y: 154, lean: 2, hl: 0.2 }, caption: 'Sit near the front of the chair, feet flat' },
      { t: 0.10, v: { x: 120, y: 154, lean: 2, hl: 0.2 }, caption: 'Lean forward, nose over toes' },
      { t: 0.22, v: { x: 126, y: 153, lean: 36, hl: 0.6 }, caption: 'Stand up using your legs' },
      { t: 0.30, v: { x: 140, y: 134, lean: 24, hl: 1 }, caption: 'Stand up using your legs' },
      { t: 0.40, v: { x: 154, y: 110, lean: 3, hl: 0.6 }, caption: 'Stand tall' },
      { t: 0.50, v: { x: 154, y: 110, lean: 3, hl: 0.6 }, caption: 'Slowly sit back down with control' },
      { t: 0.66, v: { x: 140, y: 134, lean: 24, hl: 1 }, caption: 'Slowly sit back down with control' },
      { t: 0.80, v: { x: 126, y: 153, lean: 36, hl: 0.6 }, caption: 'Sit back and relax' },
      { t: 0.90, v: { x: 120, y: 154, lean: 2, hl: 0.2 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { x: 120, y: 154, lean: 2, hl: 0.2 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.chair(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), v = s.v;
      var hip = [v.x, v.y], b = A.body(hip, v.lean);
      return {
        body: b,
        far: A.legIK([v.x - 3, v.y], [154, A.ANKLE_Y], 90),
        near: A.legIK(hip, [158, A.ANKLE_Y], 90),
        farArm: A.armFK([b.shoulder[0] - 2, b.shoulder[1]], v.lean + 18, v.lean + 50),
        nearArm: A.armFK(b.shoulder, v.lean + 22, v.lean + 56),
        hl: v.hl,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
