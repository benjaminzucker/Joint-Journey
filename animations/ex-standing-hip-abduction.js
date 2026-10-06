/* Joint Journey - Standing Hip Abduction animation (DRAFT - awaiting physio sign-off)
   Seen from behind, holding the worktop: one leg slides out to the side and back,
   body stays upright. Two reps each side per cycle. */
(function (A) {
  'use strict';
  var F = A.front;
  var PV = [160, 110];

  A.exercises['standing-hip-abduction'] = {
    title: 'Standing Hip Abduction',
    view: 'front',
    alt: 'Seen from behind, a person holding the kitchen worktop with both hands stands tall and slowly moves one straight leg out to the side, then brings it back. The body stays upright. They then do the same with the other leg.',
    tip: 'Keep your body upright and your toes pointing forward. Only move as far as is comfortable.',
    period: 12,
    poster: 0.2,
    keys: [
      { t: 0.00, v: { l: 0, r: 0 }, caption: 'Stand tall, holding the worktop' },
      { t: 0.06, v: { l: 0, r: 0 }, caption: 'Slowly move one leg out to the side' },
      { t: 0.18, v: { l: 0, r: 1 }, caption: 'Keep your body upright' },
      { t: 0.26, v: { l: 0, r: 1 }, caption: 'Bring it back slowly' },
      { t: 0.38, v: { l: 0, r: 0 }, caption: 'Feet together' },
      { t: 0.50, v: { l: 0, r: 0 }, caption: 'Now the other leg' },
      { t: 0.56, v: { l: 0, r: 0 }, caption: 'Now the other leg' },
      { t: 0.68, v: { l: 1, r: 0 }, caption: 'Keep your body upright' },
      { t: 0.76, v: { l: 1, r: 0 }, caption: 'Bring it back slowly' },
      { t: 0.88, v: { l: 0, r: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { l: 0, r: 0 } }
    ],
    scene: function (g) { A.props.floor(g); F.props.worktop(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), l = s.v.l, r = s.v.r;
      // Pelvis shifts slightly over the standing leg; trunk stays upright
      var pv = [PV[0] + 2.5 * (l - r), PV[1]];
      var hips = F.hipJoints(pv, 0), sh = F.shoulders(pv, 0), LEN = A.L.thigh + A.L.shin - 1;
      function lg(hip, amt, dir) {   // straight leg swung out by up to 22 degrees
        var a = A.rad(22 * amt) * dir;
        return F.leg(hip, [hip[0] + Math.sin(a) * LEN, hip[1] + Math.cos(a) * LEN], 0);
      }
      var L0 = lg(hips[0], l, -1), R0 = lg(hips[1], r, 1);
      var Y = F.props.WORKTOP_Y;
      // Outer hip muscles: from the side of the pelvis down the outside of the upper thigh
      function glow(leg, dir, o) {
        var b = A.lerp(0, 1, 0.3);
        return { a: [leg.hip[0] + dir * 7, leg.hip[1] - 9],
                 b: [A.lerp(leg.hip[0], leg.knee[0], b) + dir * 7, A.lerp(leg.hip[1], leg.knee[1], b)], o: o, w: 7 };
      }
      return {
        pelvis: pv, tilt: 0, face: false,
        legs: [L0, R0],
        arms: [F.arm(sh[0], [sh[0][0] - 12, Y], -1), F.arm(sh[1], [sh[1][0] + 12, Y], 1)],
        armsFront: false,
        glows: [glow(L0, -1, l), glow(R0, 1, r)],
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
