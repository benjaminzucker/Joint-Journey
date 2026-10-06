/* ============================================================================
   JOINT JOURNEY - Front / back view of the illustrated character
   For movements that happen out to the side (hip abduction, side stepping,
   knees pushing out or squeezing in), which a side view cannot show.
   Same colours, limb outlines and proportions as jj-anim-character.js.
   Load after jj-anim-character.js. Exercises opt in with  view: 'front'.

   Pose: { pelvis: [x, y], tilt (deg, + = clockwise), face: true = front view
           (seated), false = back view (standing at the worktop),
           legs: [screenLeft, screenRight] each { hip, knee, ankle },
           arms: [screenLeft, screenRight] each { s, e, w }, armsFront: bool,
           glows: [{ a, b, o, w }], caption }
   ============================================================================ */
(function (A) {
  'use strict';
  var el = A.el, C = A.CHAR_COL, U = A.charUtil, L = A.L;
  var part = U.part, group = U.group, line = U.line, place = U.place;

  var HIP_W = 8;            // hip joint distance from the middle of the pelvis
  var SHOULDER_W = 15;      // shoulder joint distance from the middle of the chest

  var SHIRT = 'M-14.5,4 L-15.5,-30 C-16.5,-44 -14,-50 -6,-52.5 L6,-52.5 C14,-50 16.5,-44 15.5,-30 L14.5,4 ' +
              'Q14.5,6 12.5,6 L-12.5,6 Q-14.5,6 -14.5,4 Z';
  var PELVIS = 'M-15.5,-4 L15.5,-4 L15.5,6 Q15.5,9.5 12,9.5 L-12,9.5 Q-15.5,9.5 -15.5,6 Z';
  var NECK = 'M-4.5,-1 L-4.5,-11 C-2,-13 2,-13 4.5,-11 L4.5,-1 Z';
  var HEAD = 'M-9,-2 C-9.5,-11 -5,-15.5 0,-15.5 C5,-15.5 9.5,-11 9,-2 C8.6,4 5,8 0,8 C-5,8 -8.6,4 -9,-2 Z';
  var HAIR_BACK = 'M-9.8,0 C-11,-11 -5.5,-16.8 0,-16.8 C5.5,-16.8 11,-11 9.8,0 C9.4,4 7,6.5 4,7 L-4,7 C-7,6.5 -9.4,4 -9.8,0 Z';
  var HAIR_FRONT = 'M-9.8,-1 C-10.8,-11 -5.5,-16.8 0,-16.8 C5.5,-16.8 10.8,-11 9.8,-1 C9,-5 8,-8 6,-9.5 ' +
                   'C2,-8.5 -2,-8.5 -6,-9.5 C-8,-8 -9,-5 -9.8,-1 Z';
  // Trainer seen end-on (toe cap or heel), centred on the ankle
  var SHOE = 'M-6.5,0 C-6.5,-4.5 -3.5,-6 0,-6 C3.5,-6 6.5,-4.5 6.5,0 L7,4.5 C7,6 5.5,6.5 4,6.5 L-4,6.5 C-5.5,6.5 -7,6 -7,4.5 Z';
  var SOLE = 'M-7,4 L7,4 L7,5.5 C7,6.8 6,7.3 4.5,7.3 L-4.5,7.3 C-6,7.3 -7,6.8 -7,5.5 Z';

  function buildLeg(g) {
    var leg = part(g, '', C.trouser);
    var shoe = group(g);
    part(shoe, SHOE, C.shoe);
    part(shoe, SOLE, C.sole);
    return { leg: leg, shoe: shoe };
  }
  function buildArm(g) {
    return { arm: part(g, '', C.skin), hand: el('ellipse', { rx: 4, ry: 4.8, fill: C.skin }, g),
             sleeve: part(g, '', C.top) };
  }

  function build(g) {
    var shadow = el('ellipse', { rx: 30, ry: 3.5, fill: C.shadow }, g);
    var backArms = group(g);
    var arms0 = [buildArm(backArms), buildArm(backArms)];
    var legs = [buildLeg(g), buildLeg(g)];
    var mid = group(g);                       // props between the knees (cushion)
    var pelvis = group(g);
    part(pelvis, PELVIS, C.trouser);
    var torso = group(g);
    part(torso, SHIRT, C.top);
    var neck = group(g);
    part(neck, NECK, C.skinShade);
    var head = group(g);
    el('ellipse', { cx: -9.4, cy: -2, rx: 2.2, ry: 3.2, fill: C.skinShade }, head);   // ears
    el('ellipse', { cx: 9.4, cy: -2, rx: 2.2, ry: 3.2, fill: C.skinShade }, head);
    part(head, HEAD, C.skin);
    var hairBack = part(head, HAIR_BACK, C.hair);
    var face = group(head);
    part(face, HAIR_FRONT, C.hair);
    el('ellipse', { cx: -3.6, cy: -3.5, rx: 1.15, ry: 1.45, fill: C.eye }, face);
    el('ellipse', { cx: 3.6, cy: -3.5, rx: 1.15, ry: 1.45, fill: C.eye }, face);
    line(face, 'M-5,-6.6 C-4,-7.3 -2.6,-7.3 -1.8,-6.8', C.hairShade, 1.1);
    line(face, 'M5,-6.6 C4,-7.3 2.6,-7.3 1.8,-6.8', C.hairShade, 1.1);
    el('circle', { cx: -5.2, cy: 1, r: 1.8, fill: C.cheek, opacity: 0.35 }, face);
    el('circle', { cx: 5.2, cy: 1, r: 1.8, fill: C.cheek, opacity: 0.35 }, face);
    line(face, 'M0,-2.5 L0.8,0.8 L-0.4,1.2', C.skinShade, 0.9);
    line(face, 'M-2.2,3.6 C-1,4.6 1,4.6 2.2,3.6', C.skinShade, 0.9);
    var frontArms = group(g);
    var arms1 = [buildArm(frontArms), buildArm(frontArms)];
    var glows = group(g);
    return { shadow: shadow, legs: legs, mid: mid, pelvis: pelvis, torso: torso, neck: neck, head: head,
             hairBack: hairBack, face: face, backArms: backArms, frontArms: frontArms,
             arms0: arms0, arms1: arms1, glows: glows };
  }

  function drawArm(R, arm) {
    R.arm.setAttribute('d', U.limbPath(arm.s, arm.e, arm.w, U.ARM, 8));
    var dx = arm.w[0] - arm.e[0], dy = arm.w[1] - arm.e[1], l = Math.sqrt(dx * dx + dy * dy) || 1;
    var h = [arm.w[0] + dx / l * 3.5, arm.w[1] + dy / l * 3.5];
    R.hand.setAttribute('cx', h[0].toFixed(2));
    R.hand.setAttribute('cy', h[1].toFixed(2));
    var ang = Math.atan2(-dx, dy) * 180 / Math.PI;
    R.hand.setAttribute('transform', 'rotate(' + ang.toFixed(1) + ' ' + h[0].toFixed(2) + ' ' + h[1].toFixed(2) + ')');
    R.sleeve.setAttribute('d', U.limbPath(arm.s, U.mix(arm.s, arm.e, 0.5), U.mix(arm.s, arm.e, 0.62), U.SLEEVE, 0));
  }

  function draw(c, p) {
    var t = p.tilt || 0, pv = p.pelvis;
    var lowest = Math.max(p.legs[0].ankle[1], p.legs[1].ankle[1]);
    c.shadow.setAttribute('cx', ((p.legs[0].ankle[0] + p.legs[1].ankle[0]) / 2).toFixed(1));
    c.shadow.setAttribute('cy', Math.min(A.FLOOR + 1, lowest + 8).toFixed(1));
    for (var i = 0; i < 2; i++) {
      var lg = p.legs[i], Lg = c.legs[i];
      Lg.leg.setAttribute('d', U.limbPath(lg.hip, lg.knee, lg.ankle, U.LEG, 12));
      var sa = Math.atan2(-(lg.ankle[0] - lg.knee[0]), lg.ankle[1] - lg.knee[1]) * 180 / Math.PI;
      place(Lg.shoe, lg.ankle, sa * 0.5);
    }
    place(c.pelvis, pv, t);
    place(c.torso, pv, t);
    var neck = A.up(pv, t, L.torso);
    place(c.neck, neck, t);
    place(c.head, A.up(neck, t, L.neck + L.head), t * 0.6);
    c.face.setAttribute('opacity', p.face ? 1 : 0);
    c.hairBack.setAttribute('opacity', p.face ? 0 : 1);
    var front = !!p.armsFront;
    c.backArms.setAttribute('opacity', front ? 0 : 1);
    c.frontArms.setAttribute('opacity', front ? 1 : 0);
    var set = front ? c.arms1 : c.arms0;
    drawArm(set[0], p.arms[0]);
    drawArm(set[1], p.arms[1]);
    U.drawGlows(c.glows, p.glows);
  }

  // ---- Pose helpers ----------------------------------------------------------
  function hipJoints(pv, tilt) {
    var r = A.rad(tilt || 0), cx = Math.cos(r) * HIP_W, cy = Math.sin(r) * HIP_W;
    return [[pv[0] - cx, pv[1] - cy], [pv[0] + cx, pv[1] + cy]];
  }
  function shoulders(pv, tilt) {
    var top = A.up(pv, tilt || 0, L.torso - 5), r = A.rad(tilt || 0);
    var cx = Math.cos(r) * SHOULDER_W, cy = Math.sin(r) * SHOULDER_W;
    return [[top[0] - cx, top[1] - cy], [top[0] + cx, top[1] + cy]];
  }
  // Leg through an explicit knee point (used for seated legs seen from the front)
  function legVia(hip, knee, ankle) { return { hip: hip, knee: knee, ankle: ankle }; }
  // Standing leg: knee half-way, nudged sideways by bend (+ = to screen right)
  function leg(hip, ankle, bend) {
    var k = L.thigh / (L.thigh + L.shin);
    return { hip: hip, knee: [A.lerp(hip[0], ankle[0], k) + (bend || 0), A.lerp(hip[1], ankle[1], k)], ankle: ankle };
  }
  // Two-bone arm reaching a target; side = -1 elbow out to screen left, +1 to screen right
  function arm(s, w, side) {
    var dx = w[0] - s[0], dy = w[1] - s[1], dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var d = A.clamp(dist, 3, L.upper + L.fore - 0.01);
    var a = Math.acos(A.clamp((L.upper * L.upper + d * d - L.fore * L.fore) / (2 * L.upper * d), -1, 1)) * (side > 0 ? -1 : 1);
    var ux = dx / dist, uy = dy / dist;
    var e = [s[0] + L.upper * (ux * Math.cos(a) - uy * Math.sin(a)), s[1] + L.upper * (ux * Math.sin(a) + uy * Math.cos(a))];
    var fx = w[0] - e[0], fy = w[1] - e[1], fl = Math.sqrt(fx * fx + fy * fy) || 1;
    return { s: s, e: e, w: [e[0] + fx / fl * L.fore, e[1] + fy / fl * L.fore] };
  }

  // ---- Scenery seen from the front / back -------------------------------------
  function box(g, x, y, w, h, r) {
    el('rect', { x: x, y: y, width: w, height: h, rx: r, fill: A.COL.prop, stroke: A.COL.propEdge, 'stroke-width': 1.5 }, g);
  }
  var props = {
    WORKTOP_Y: 101,
    // Kitchen units seen from behind the person (drawn behind the figure)
    worktop: function (g) {
      box(g, 6, 104, 308, 96, 2);
      for (var x = 6; x < 300; x += 77) {
        box(g, x + 5, 112, 67, 84, 3);
        el('line', { x1: x + 31, y1: 122, x2: x + 45, y2: 122, stroke: A.COL.propEdge, 'stroke-width': 2, 'stroke-linecap': 'round' }, g);
      }
      box(g, 0, 96, 320, 9, 2);
    },
    // Chair seen from the front: back rest (behind the figure), seat top at y = 160
    chair: function (g, x) {
      box(g, x - 28, 92, 56, 70, 4);
      box(g, x - 33, 158, 66, 8, 3);
      box(g, x - 31, 166, 6, 34, 2);
      box(g, x + 25, 166, 6, 34, 2);
    }
  };

  A.front = { build: build, draw: draw, hipJoints: hipJoints, shoulders: shoulders, leg: leg, legVia: legVia,
              arm: arm, props: props, HIP_W: HIP_W };
})(window.JJAnim);
