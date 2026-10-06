/* Joint Journey - Ankle Pumps animation (DRAFT - awaiting physio sign-off) */
(function (A) {
  'use strict';

  A.exercises['ankle-pumps'] = {
    title: 'Ankle Pumps',
    alt: 'A person lying on their back with both legs straight pumps their feet slowly up and down, pulling the toes towards them and then pointing them away, like pressing a car pedal.',
    tip: 'Keep a steady rhythm. You can also do this sitting in a chair.',
    period: 4,
    poster: 0.25,
    keys: [
      { t: 0.00, v: { foot: 175 }, caption: 'Pull your toes up towards you' },
      { t: 0.25, v: { foot: 200 }, caption: 'Pull your toes up towards you' },
      { t: 0.50, v: { foot: 175 }, caption: 'Point your toes away, like pressing a pedal' },
      { t: 0.75, v: { foot: 140 }, caption: 'Point your toes away, like pressing a pedal' },
      { t: 1.00, v: { foot: 175 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.mat(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var hip = [158, 188], b = A.body(hip, -86);
      return {
        body: b,
        far: A.legFK([hip[0] - 1, hip[1]], 91, 91, s.v.foot - 3),
        near: A.legFK(hip, 90, 90, s.v.foot),
        farArm: A.armFK([b.shoulder[0], b.shoulder[1] + 1], 85, 88),
        nearArm: A.armFK([b.shoulder[0], b.shoulder[1] + 2], 85, 88),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
