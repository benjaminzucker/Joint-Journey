/* ============================================================================
   JOINT JOURNEY - Exercise animations: core figure engine
   Original artwork and code created for Joint Journey (Elan Health Ltd).
   No third-party footage, images or libraries are used.

   DRAFT: every animation must be reviewed and signed off by the physiotherapy
   advisor before it is shown to patients (Hazard Log H01).
   ============================================================================ */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var COL = {
    near: '#475953',   // brand green - limbs nearest the viewer
    far: '#A3B5AD',    // lighter green - limbs further away
    hl: '#FF8F00',     // amber - the muscle doing the work
    prop: '#E3E9E6', propEdge: '#B7C3BD', floor: '#C3CEC9', mat: '#DCE6E1'
  };
  var L = { torso: 52, neck: 5, head: 10, thigh: 44, shin: 42, toe: 16, heel: 5, upper: 29, fore: 27 };
  var FLOOR = 200;
  var ANKLE_Y = 195; // ankle height when the foot is flat on the floor

  function rad(a) { return a * Math.PI / 180; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  // Limb angles are absolute: 0 = pointing straight down, 90 = forward (right), 180 = up.
  function along(p, a, len) { return [p[0] + Math.sin(rad(a)) * len, p[1] + Math.cos(rad(a)) * len]; }
  // Torso angle: 0 = upright, + leans forward, -90 = lying with the head to the left.
  function up(p, a, len) { return [p[0] + Math.sin(rad(a)) * len, p[1] - Math.cos(rad(a)) * len]; }

  function body(hip, lean) {
    var neck = up(hip, lean, L.torso);
    return { hip: hip, neck: neck, shoulder: up(hip, lean, L.torso - 4), head: up(neck, lean, L.neck + L.head) };
  }
  function legFK(hip, thigh, shin, foot) {
    var knee = along(hip, thigh, L.thigh);
    var ankle = along(knee, shin, L.shin);
    return { hip: hip, knee: knee, ankle: ankle, heel: along(ankle, foot, -L.heel), toe: along(ankle, foot, L.toe) };
  }
  // Two-bone inverse kinematics: puts the ankle exactly where asked, knee bends forward.
  function legIK(hip, ankle, foot) {
    var dx = ankle[0] - hip[0], dy = ankle[1] - hip[1];
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var d = clamp(dist, Math.abs(L.thigh - L.shin) + 0.01, L.thigh + L.shin - 0.01);
    var a = Math.acos(clamp((L.thigh * L.thigh + d * d - L.shin * L.shin) / (2 * L.thigh * d), -1, 1));
    var ux = dx / dist, uy = dy / dist, th = -a;
    var knee = [hip[0] + L.thigh * (ux * Math.cos(th) - uy * Math.sin(th)),
                hip[1] + L.thigh * (ux * Math.sin(th) + uy * Math.cos(th))];
    return { hip: hip, knee: knee, ankle: ankle, heel: along(ankle, foot, -L.heel), toe: along(ankle, foot, L.toe) };
  }
  // Arm inverse kinematics: puts the wrist where asked (e.g. on a worktop), elbow bends down/back.
  function armIK(shoulder, wrist) {
    var dx = wrist[0] - shoulder[0], dy = wrist[1] - shoulder[1];
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var d = clamp(dist, Math.abs(L.upper - L.fore) + 0.01, L.upper + L.fore - 0.01);
    var a = Math.acos(clamp((L.upper * L.upper + d * d - L.fore * L.fore) / (2 * L.upper * d), -1, 1));
    var ux = dx / dist, uy = dy / dist;
    var e = [shoulder[0] + L.upper * (ux * Math.cos(a) - uy * Math.sin(a)),
             shoulder[1] + L.upper * (ux * Math.sin(a) + uy * Math.cos(a))];
    var fx = wrist[0] - e[0], fy = wrist[1] - e[1], fl = Math.sqrt(fx * fx + fy * fy) || 1;
    return { s: shoulder, e: e, w: [e[0] + fx / fl * L.fore, e[1] + fy / fl * L.fore] };
  }
  function armFK(shoulder, upper, fore) {
    var elbow = along(shoulder, upper, L.upper);
    return { s: shoulder, e: elbow, w: along(elbow, fore, L.fore) };
  }

  // Keyframes: { t: 0-1, v: {numbers}, caption }. A caption belongs to the segment
  // starting at that key; "{count}" becomes the seconds left in that segment.
  function sample(keys, phase, period) {
    var i = 0;
    while (i < keys.length - 2 && phase >= keys[i + 1].t) i++;
    var a = keys[i], b = keys[i + 1];
    var span = b.t - a.t;
    var e = ease(span > 0 ? clamp((phase - a.t) / span, 0, 1) : 1);
    var out = {};
    for (var k in a.v) out[k] = lerp(a.v[k], b.v[k] != null ? b.v[k] : a.v[k], e);
    var left = Math.max(1, Math.ceil((b.t - phase) * period - 1e-6));
    var caption = (a.caption || '').replace('{count}', left + (left === 1 ? ' second' : ' seconds'));
    return { v: out, caption: caption };
  }

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function pts(list) { return list.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
  function limb(g, colour, width) {
    return el('polyline', { fill: 'none', stroke: colour, 'stroke-width': width,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  }

  function buildFigure(g) {
    return {
      farArm: limb(g, COL.far, 7), farLeg: limb(g, COL.far, 8), farFoot: limb(g, COL.far, 6),
      torso: limb(g, COL.near, 11), head: el('circle', { r: L.head, fill: COL.near }, g),
      nearLeg: limb(g, COL.near, 8), nearFoot: limb(g, COL.near, 6),
      hl: limb(g, COL.hl, 4), nearArm: limb(g, COL.near, 7)
    };
  }
  function drawFigure(f, p) {
    f.farArm.setAttribute('points', pts([p.farArm.s, p.farArm.e, p.farArm.w]));
    f.farLeg.setAttribute('points', pts([p.far.hip, p.far.knee, p.far.ankle]));
    f.farFoot.setAttribute('points', pts([p.far.heel, p.far.toe]));
    f.torso.setAttribute('points', pts([p.body.hip, p.body.neck]));
    f.head.setAttribute('cx', p.body.head[0].toFixed(1));
    f.head.setAttribute('cy', p.body.head[1].toFixed(1));
    f.nearLeg.setAttribute('points', pts([p.near.hip, p.near.knee, p.near.ankle]));
    f.nearFoot.setAttribute('points', pts([p.near.heel, p.near.toe]));
    f.nearArm.setAttribute('points', pts([p.nearArm.s, p.nearArm.e, p.nearArm.w]));
    // Amber band on the working thigh
    var h = p.near.hip, k = p.near.knee;
    f.hl.setAttribute('points', pts([[lerp(h[0], k[0], 0.15), lerp(h[1], k[1], 0.15)],
                                     [lerp(h[0], k[0], 0.85), lerp(h[1], k[1], 0.85)]]));
    f.hl.setAttribute('opacity', (p.hl || 0).toFixed(2));
  }

  global.JJAnim = {
    COL: COL, L: L, FLOOR: FLOOR, ANKLE_Y: ANKLE_Y,
    rad: rad, clamp: clamp, lerp: lerp, ease: ease, along: along, up: up,
    body: body, legFK: legFK, legIK: legIK, armFK: armFK, armIK: armIK, sample: sample,
    el: el, buildFigure: buildFigure, drawFigure: drawFigure,
    exercises: {}
  };
})(window);
