/* Joint Journey - Kitchen Worktop Press-Ups animation (DRAFT - awaiting physio sign-off)
   The body stays in one straight line pivoting at the ankles; the lean is solved so
   the hands stay on the worktop edge. */
(function (A) {
  'use strict';
  var ANKLE = [106, A.ANKLE_Y];
  var REACH = 134;   // ankle to shoulder: leg (86) + torso to shoulder (48)

  function leanFor(dist) {   // lean (degrees) that puts the shoulder `dist` from the hands
    var g = A.props.GRIP, lo = 0, hi = Math.atan2(g[0] - ANKLE[0], ANKLE[1] - g[1]) * 180 / Math.PI;
    for (var i = 0; i < 30; i++) {
      var m = (lo + hi) / 2, r = A.rad(m);
      var sx = ANKLE[0] + REACH * Math.sin(r), sy = ANKLE[1] - REACH * Math.cos(r);
      var d = Math.sqrt((g[0] - sx) * (g[0] - sx) + (g[1] - sy) * (g[1] - sy));
      if (d > dist) lo = m; else hi = m;
    }
    return (lo + hi) / 2;
  }

  A.exercises['kitchen-worktop-press-ups'] = {
    title: 'Kitchen Worktop Press-Ups',
    alt: 'A person stands at arm\'s length from the kitchen worktop with hands on its edge, bends the elbows to lower the chest towards the worktop with the body in a straight line, then pushes back up.',
    tip: 'Only do this on a dry, non-slip floor in sensible shoes. Keep your body in a straight line.',
    period: 5,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { d: 54 }, caption: 'Hands on the worktop edge, arms straight' },
      { t: 0.10, v: { d: 54 }, caption: 'Bend your elbows, chest towards the worktop' },
      { t: 0.45, v: { d: 34 }, caption: 'Push back up' },
      { t: 0.55, v: { d: 34 }, caption: 'Push back up' },
      { t: 0.90, v: { d: 54 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { d: 54 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.worktop(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period);
      var lean = leanFor(s.v.d), r = A.rad(lean);
      var hip = [ANKLE[0] + 86 * Math.sin(r), ANKLE[1] - 86 * Math.cos(r)];
      var b = A.body(hip, lean), G = A.props.GRIP;
      return {
        body: b,
        far: A.legFK([hip[0] - 2, hip[1]], -lean, -lean, 90),
        near: A.legFK(hip, -lean, -lean, 90),
        farArm: A.armIK([b.shoulder[0] - 2, b.shoulder[1]], [G[0] - 2, G[1]]),
        nearArm: A.armIK(b.shoulder, G),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
