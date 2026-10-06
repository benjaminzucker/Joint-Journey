/* Joint Journey - Isometric Hip Abduction and Adduction animations
   (DRAFT - awaiting physio sign-off). Seated, seen from the front.
   Abduction: hands on the outside of the knees, knees push out, hands resist.
   Adduction: cushion between the knees, knees squeeze in.
   Nothing moves (a 1 px squeeze at most); arrows and glows show the effort. */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL, F = A.front;
  var CX = 160, PV = [160, 152], KNEE_Y = 160, ANKLE_Y = A.ANKLE_Y + 1;

  var KEYS = function (first) {
    return [
      { t: 0.00, v: { p: 0 }, caption: first },
      { t: 0.12, v: { p: 0 }, caption: 'FIRST' },
      { t: 0.25, v: { p: 1 }, caption: 'Hold for {count}' },
      { t: 0.65, v: { p: 1 }, caption: 'Relax' },
      { t: 0.80, v: { p: 0 }, caption: 'Relax, then repeat' },
      { t: 1.00, v: { p: 0 } }
    ];
  };
  function arrows(g, dirOut) {   // a pair of short amber arrows beside the knees
    var grp = el('g', { opacity: 0 }, g);
    [-1, 1].forEach(function (side) {
      var x = CX + side * (dirOut ? 36 : 30), d = side * (dirOut ? 1 : -1);
      var a = el('g', { transform: 'translate(' + x + ',' + (KNEE_Y - 14) + ') scale(' + d + ',1)' }, grp);
      el('path', { d: 'M0,0 L10,0', stroke: COL.hl, 'stroke-width': 3, 'stroke-linecap': 'round' }, a);
      el('path', { d: 'M9,-4.5 L15,0 L9,4.5 Z', fill: COL.hl }, a);
    });
    return grp;
  }
  function seated(p, kneeX, hands) {
    var hips = F.hipJoints(PV, 0), sh = F.shoulders(PV, 0);
    // Thighs come straight towards the viewer, so the knee sits just below and outside the hip
    var kL = [CX - kneeX, KNEE_Y], kR = [CX + kneeX, KNEE_Y];
    var legs = [F.legVia(hips[0], kL, [CX - kneeX + 1, ANKLE_Y]), F.legVia(hips[1], kR, [CX + kneeX - 1, ANKLE_Y])];
    var arms = hands === 'knees'
      ? [F.arm(sh[0], [kL[0] - 10, KNEE_Y - 6], -1), F.arm(sh[1], [kR[0] + 10, KNEE_Y - 6], 1)]
      : [F.arm(sh[0], [hips[0][0] - 14, KNEE_Y - 4], -1), F.arm(sh[1], [hips[1][0] + 14, KNEE_Y - 4], 1)];
    return { pelvis: PV, tilt: 0, face: true, legs: legs, arms: arms, armsFront: true };
  }

  A.exercises['isometric-hip-abduction'] = {
    title: 'Isometric Hip Abduction',
    view: 'front',
    alt: 'Seen from the front, a person sitting tall on a chair with a hand on the outside of each knee pushes the knees outwards against the hands, resisting so that nothing moves, holds, then relaxes. Arrows show the knees pushing out.',
    tip: 'Push only as hard as is comfortable. Your hands stop your knees from moving.',
    period: 8,
    poster: 0.4,
    keys: KEYS('Sit tall, a hand on the outside of each knee').map(function (k) {
      if (k.caption === 'FIRST') k.caption = 'Push your knees out against your hands';
      return k;
    }),
    scene: function (g) {
      A.props.floor(g);
      F.props.chair(g, CX);
      var arr = arrows(g, true), self = this;
      return function (phase) { arr.setAttribute('opacity', A.sample(self.keys, phase, self.period).v.p.toFixed(2)); };
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), p = s.v.p;
      var pose = seated(p, 16 + 0.8 * p, 'knees');
      // Outer hip muscles
      pose.glows = [-1, 1].map(function (side) {
        return { a: [CX + side * 15, PV[1] - 8], b: [CX + side * 19, PV[1] + 4], o: p, w: 7 };
      });
      pose.caption = s.caption;
      return pose;
    }
  };

  A.exercises['isometric-hip-adduction'] = {
    title: 'Isometric Hip Adduction',
    view: 'front',
    alt: 'Seen from the front, a person sitting on a chair with a cushion between their knees squeezes the knees together into the cushion, holds, then relaxes. Arrows show the knees squeezing in.',
    tip: 'Squeeze only as hard as is comfortable. A rolled-up towel works as well as a cushion.',
    period: 8,
    poster: 0.4,
    keys: KEYS('Sit tall, a cushion between your knees').map(function (k) {
      if (k.caption === 'FIRST') k.caption = 'Squeeze your knees together into the cushion';
      return k;
    }),
    scene: function (g) {
      A.props.floor(g);
      F.props.chair(g, CX);
      var arr = arrows(g, false), self = this;
      return function (phase) { arr.setAttribute('opacity', A.sample(self.keys, phase, self.period).v.p.toFixed(2)); };
    },
    midground: function (g) {
      this._cushion = el('ellipse', { cx: CX, cy: KNEE_Y - 2, rx: 9, ry: 11, fill: '#F3E9D6', stroke: '#D9C8A8', 'stroke-width': 1.5 }, g);
    },
    pose: function (phase) {
      var s = A.sample(this.keys, phase, this.period), p = s.v.p;
      if (this._cushion) this._cushion.setAttribute('rx', (9 - 1.6 * p).toFixed(2));   // cushion squashes a little
      var pose = seated(p, 18 - 1.6 * p, 'thighs');
      // Inner thigh muscles
      pose.glows = [-1, 1].map(function (side) {
        return { a: [CX + side * 5, PV[1] + 1], b: [CX + side * 10, KNEE_Y - 6], o: p, w: 6 };
      });
      pose.caption = s.caption;
      return pose;
    }
  };
})(window.JJAnim);
