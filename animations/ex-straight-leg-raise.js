/* Joint Journey - Straight Leg Raise animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;

  A.exercises['straight-leg-raise'] = {
    title: 'Straight Leg Raise',
    alt: 'A person lying on their back with one knee bent tightens the thigh of the straight leg, lifts it to the height of the bent knee, holds for three seconds, then lowers it slowly.',
    tip: 'Keep the lifted knee completely straight. Lift only as high as your other knee.',
    period: 9,
    poster: 0.45,
    keys: [
      { t: 0.00, v: { lift: 0, hl: 0.35 }, caption: 'Bend one knee. Tighten the thigh of your straight leg' },
      { t: 0.10, v: { lift: 0, hl: 1 }, caption: 'Lift the straight leg to the height of your other knee' },
      { t: 0.34, v: { lift: 24, hl: 1 }, caption: 'Hold for {count}' },
      { t: 0.67, v: { lift: 24, hl: 1 }, caption: 'Lower slowly, keeping the knee straight' },
      { t: 0.90, v: { lift: 0, hl: 0.35 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { lift: 0, hl: 0.35 } }
    ],
    scene: function (g) {
      el('line', { x1: 0, y1: A.FLOOR, x2: 320, y2: A.FLOOR, stroke: COL.floor, 'stroke-width': 2 }, g);
      el('rect', { x: 36, y: 194, width: 260, height: 6, rx: 3, fill: COL.mat }, g);   // mat / bed
      el('ellipse', { cx: 88, cy: 190, rx: 17, ry: 5, fill: COL.prop, stroke: COL.propEdge, 'stroke-width': 1.5 }, g); // pillow
      return null;
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var hip = [158, 188];
      var b = A.body(hip, -86);
      var leg = 90 + s.v.lift;
      return {
        body: b,
        far: A.legFK([hip[0] - 1, hip[1]], 140, 30, 90),   // bent knee, foot flat on the mat
        near: A.legFK(hip, leg, leg, leg + 82),            // straight leg, toes pointing up
        farArm: A.armFK([b.shoulder[0], b.shoulder[1] + 1], 85, 88),
        nearArm: A.armFK([b.shoulder[0], b.shoulder[1] + 2], 85, 88),
        hl: s.v.hl,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
