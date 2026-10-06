/* Joint Journey - Seated Knee Extension animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;

  A.exercises['seated-knee-extension'] = {
    title: 'Seated Knee Extension',
    alt: 'A person sitting upright in a chair slowly straightens one knee until the leg is out in front, holds it for three seconds, then slowly lowers the foot back to the floor.',
    tip: 'Sit tall and move slowly. Do not swing the leg.',
    period: 9,
    poster: 0.45,
    keys: [
      { t: 0.00, v: { shin: 0, foot: 90, hl: 0.15 }, caption: 'Sit tall with both feet flat on the floor' },
      { t: 0.08, v: { shin: 0, foot: 90, hl: 0.3 }, caption: 'Slowly straighten your knee' },
      { t: 0.32, v: { shin: 82, foot: 166, hl: 1 }, caption: 'Hold for {count}' },
      { t: 0.65, v: { shin: 82, foot: 166, hl: 1 }, caption: 'Slowly lower your foot back down' },
      { t: 0.90, v: { shin: 0, foot: 90, hl: 0.15 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { shin: 0, foot: 90, hl: 0.15 } }
    ],
    scene: function (g) {
      el('line', { x1: 0, y1: A.FLOOR, x2: 320, y2: A.FLOOR, stroke: COL.floor, 'stroke-width': 2 }, g);
      var c = { fill: COL.prop, stroke: COL.propEdge, 'stroke-width': 1.5 };
      function box(x, y, w, h, r) { el('rect', { x: x, y: y, width: w, height: h, rx: r, fill: c.fill, stroke: c.stroke, 'stroke-width': c['stroke-width'] }, g); }
      box(101, 92, 7, 74, 3);    // back rest
      box(101, 160, 61, 7, 3);   // seat
      box(103, 166, 6, 34, 2);   // back leg
      box(153, 166, 6, 34, 2);   // front leg
      return null;
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var b = A.body([120, 154], 2);
      return {
        body: b,
        far: A.legFK([117, 154], 90, 0, 90),
        near: A.legFK([120, 154], 90, s.v.shin, s.v.foot),
        farArm: A.armFK([b.shoulder[0] - 2, b.shoulder[1]], 2, 58),
        nearArm: A.armFK(b.shoulder, 6, 62),
        hl: s.v.hl,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
