/* Joint Journey - Heel Raises animation (DRAFT - awaiting physio sign-off)
   Toes stay fixed on the floor; the ankle and body rise as the heels lift. */
(function (A) {
  'use strict';

  A.exercises['heel-raises'] = {
    title: 'Heel Raises',
    alt: 'A person standing upright holding the kitchen worktop rises up onto their toes, holds for two seconds, then slowly lowers their heels back to the floor.',
    tip: 'Hold the worktop for balance. Rise straight up, not forwards.',
    period: 7,
    poster: 0.4,
    keys: [
      { t: 0.00, v: { f: 90 }, caption: 'Stand tall, holding the worktop' },
      { t: 0.10, v: { f: 90 }, caption: 'Rise up onto your toes' },
      { t: 0.32, v: { f: 58 }, caption: 'Hold for {count}' },
      { t: 0.60, v: { f: 58 }, caption: 'Slowly lower your heels' },
      { t: 0.88, v: { f: 90 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { f: 90 } }
    ],
    scene: function (g) { A.props.floor(g); A.props.worktop(g); return null; },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), f = s.v.f;
      var r = A.rad(f), TOE = 156;
      var ax = TOE - A.L.toe * Math.sin(r), ay = A.ANKLE_Y - A.L.toe * Math.cos(r);
      var hip = [ax, ay - (A.L.thigh + A.L.shin) + 0.5], b = A.body(hip, 3);
      return {
        body: b,
        far: A.legIK([hip[0] - 2, hip[1]], [ax - 2, ay], f),
        near: A.legIK(hip, [ax, ay], f),
        farArm: A.armIK([b.shoulder[0] - 2, b.shoulder[1]], [A.props.GRIP[0] - 2, A.props.GRIP[1]]),
        nearArm: A.armIK(b.shoulder, A.props.GRIP),
        hl: 0,
        caption: s.caption
      };
    }
  };
})(window.JJAnim);
