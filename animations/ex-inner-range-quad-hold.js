/* Joint Journey - Inner-Range Quad Hold animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;

  A.exercises['inner-range-quad-hold'] = {
    title: 'Inner-Range Quad Hold',
    alt: 'A person lying on their back with a rolled towel under one knee tightens the thigh to lift the heel until the knee is straight, keeping the back of the knee on the towel, holds, then lowers slowly.',
    tip: 'Keep the back of your knee resting on the towel the whole time.',
    period: 9,
    poster: 0.45,
    keys: [
      { t: 0.00, v: { shin: 68, hl: 0.2 }, caption: 'Rest your knee over a rolled-up towel' },
      { t: 0.10, v: { shin: 68, hl: 0.4 }, caption: 'Tighten your thigh to lift your heel' },
      { t: 0.32, v: { shin: 106, hl: 1 }, caption: 'Hold for {count}' },
      { t: 0.62, v: { shin: 106, hl: 1 }, caption: 'Lower your heel slowly' },
      { t: 0.86, v: { shin: 68, hl: 0.2 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { shin: 68, hl: 0.2 } }
    ],
    scene: function (g) {
      A.props.floor(g);
      A.props.mat(g);
      return null;
    },
    // Rolled towel: in front of the far leg so it is always visible, the near knee rests on it
    midground: function (g) {
      el('circle', { cx: 199, cy: 185, r: 9, fill: '#F3E3C3', stroke: '#C9B48A', 'stroke-width': 1.5 }, g);
      el('path', { d: 'M199,185 m-5,0 a5,5 0 1,1 5,5', fill: 'none', stroke: '#C9B48A', 'stroke-width': 1.3, 'stroke-linecap': 'round' }, g);
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var hip = [158, 188], b = A.body(hip, -86);
      return {
        body: b,
        far: A.legFK([hip[0] - 1, hip[1]], 91, 91, 176),
        near: A.legFK(hip, 106, s.v.shin, s.v.shin + 82),
        farArm: A.armFK([b.shoulder[0], b.shoulder[1] + 1], 85, 88),
        nearArm: A.armFK([b.shoulder[0], b.shoulder[1] + 2], 85, 88),
        hl: s.v.hl,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
