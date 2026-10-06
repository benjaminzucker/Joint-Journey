/* Joint Journey - Side Stepping animation (DRAFT - awaiting physio sign-off)
   Seen from behind, hands sliding along the worktop: step out, bring feet together,
   three steps one way, three steps back. Toes stay pointing forward. */
(function (A) {
  'use strict';
  var F = A.front;
  var START_L = 122, STEP = 20, STEP_T = 0.055, Y0 = A.ANKLE_Y + 1;
  // [start t, foot (0 = screen-left, 1 = screen-right), distance]
  var STEPS = [];
  [0.04, 0.12, 0.20].forEach(function (t) { STEPS.push([t, 1, STEP], [t + 0.04, 0, STEP]); });
  [0.54, 0.62, 0.70].forEach(function (t) { STEPS.push([t, 0, -STEP], [t + 0.04, 1, -STEP]); });

  function footAt(i, phase) {
    var x = START_L + 16 * i, lift = 0;
    STEPS.forEach(function (s) {
      if (s[1] !== i || phase < s[0]) return;
      var u = Math.min(1, (phase - s[0]) / STEP_T);
      x += s[2] * A.ease(u);
      if (u < 1) lift = Math.sin(Math.PI * u);
    });
    return { x: x, lift: lift };
  }

  A.exercises['side-stepping'] = {
    title: 'Side Stepping',
    view: 'front',
    alt: 'Seen from behind, a person holding the kitchen worktop takes three small steps sideways along it, bringing the feet together after each step with toes pointing forward, then steps back the other way.',
    tip: 'Keep your toes pointing forward and take small, steady steps. Slide your hands along the worktop as you go.',
    period: 14,
    poster: 0.08,
    scene: function (g) { A.props.floor(g); F.props.worktop(g); return null; },
    pose: function (phase) {
      var l = footAt(0, phase), r = footAt(1, phase);
      // Weight stays over the planted foot while the other one moves
      var planted = l.lift > 0 ? r.x - 8 : (r.lift > 0 ? l.x + 8 : (l.x + r.x) / 2);
      var pv = [planted, 110 - 1.2 * Math.max(l.lift, r.lift)];
      var hips = F.hipJoints(pv, 0), sh = F.shoulders(pv, 0), Y = F.props.WORKTOP_Y;
      var caption = phase < 0.04 ? 'Stand tall, holding the worktop' :
                    phase < 0.30 ? 'Step to the side, then bring your feet together' :
                    phase < 0.54 ? 'Toes pointing forward' :
                    phase < 0.80 ? 'Now step back the other way' : 'Relax, then repeat';
      return {
        pelvis: pv, tilt: 0, face: false,
        legs: [F.leg(hips[0], [l.x, Y0 - 9 * l.lift], -2 * l.lift),
               F.leg(hips[1], [r.x, Y0 - 9 * r.lift], 2 * r.lift)],
        arms: [F.arm(sh[0], [sh[0][0] - 12, Y], -1), F.arm(sh[1], [sh[1][0] + 12, Y], 1)],
        armsFront: false,
        glows: [],
        caption: caption
      };
    }
  };
})(window.JJAnim);
