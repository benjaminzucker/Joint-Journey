/* ============================================================================
   JOINT JOURNEY - Illustrated older-adult character (replaces the stick figure)
   Uses the same skeleton and poses as jj-anim-core.js. Limbs are drawn as one
   smooth tapered outline per frame; head, torso and shoes are shapes from
   jj-anim-shapes.js rotated into place.
   Load order: jj-anim-core.js, jj-anim-shapes.js, jj-anim-character.js.
   ============================================================================ */
(function (A) {
  'use strict';
  var el = A.el, C = A.CHAR_COL, S = A.CHAR_SHAPES;

  function deg(r) { return r * 180 / Math.PI; }
  function angDown(a, b) { return deg(Math.atan2(-(b[0] - a[0]), b[1] - a[1])); }   // rotates local +y onto a->b
  function angAlong(a, b) { return deg(Math.atan2(b[1] - a[1], b[0] - a[0])); }     // rotates local +x onto a->b
  function place(node, p, ang) {
    node.setAttribute('transform', 'translate(' + p[0].toFixed(2) + ',' + p[1].toFixed(2) + ') rotate(' + ang.toFixed(2) + ')');
  }
  function part(g, d, fill) {
    return el('path', { d: d, fill: fill }, g);   // no per-part outline: shapes meet by colour only
  }
  function line(g, d, colour, w) {
    return el('path', { d: d, stroke: colour, 'stroke-width': w, 'stroke-linecap': 'round', fill: 'none' }, g);
  }
  function group(g) { return el('g', {}, g); }

  // ---- Smooth limbs ---------------------------------------------------------
  // A limb is one closed outline around a centre line a -> b -> c. The joint at
  // b is rounded off, the width tapers along the length (profile = [[t, halfWidth]]),
  // and both ends get round caps, so there are no seams or notches when it bends.
  function sub(p, q) { return [p[0] - q[0], p[1] - q[1]]; }
  function len(v) { return Math.sqrt(v[0] * v[0] + v[1] * v[1]) || 1e-6; }
  function mix(p, q, t) { return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; }
  function widthAt(profile, t) {
    for (var i = 1; i < profile.length; i++) {
      if (t <= profile[i][0]) {
        var u = (t - profile[i - 1][0]) / (profile[i][0] - profile[i - 1][0]);
        u = u * u * (3 - 2 * u);   // smoothstep keeps the taper curvy
        return profile[i - 1][1] + (profile[i][1] - profile[i - 1][1]) * u;
      }
    }
    return profile[profile.length - 1][1];
  }
  function centreLine(a, b, c, round) {
    var l1 = len(sub(b, a)), l2 = len(sub(c, b));
    var r = Math.min(round, l1 * 0.45, l2 * 0.45);
    var p1 = mix(b, a, r / l1), p2 = mix(b, c, r / l2), out = [], i, N = 8;
    for (i = 0; i <= N; i++) out.push(mix(a, p1, i / N));
    for (i = 1; i < N; i++) {   // quadratic curve round the joint
      var t = i / N, q = mix(mix(p1, b, t), mix(b, p2, t), t);
      out.push(q);
    }
    for (i = 0; i <= N; i++) out.push(mix(p2, c, i / N));
    return out;
  }
  function limbPath(a, b, c, profile, round) {
    var pts = centreLine(a, b, c, round), n = pts.length, i;
    var acc = [0];
    for (i = 1; i < n; i++) acc.push(acc[i - 1] + len(sub(pts[i], pts[i - 1])));
    var total = acc[n - 1], left = [], right = [];
    for (i = 0; i < n; i++) {
      var d = sub(pts[Math.min(n - 1, i + 1)], pts[Math.max(0, i - 1)]), l = len(d);
      var nx = -d[1] / l, ny = d[0] / l, w = widthAt(profile, acc[i] / total);
      left.push([pts[i][0] + nx * w, pts[i][1] + ny * w]);
      right.push([pts[i][0] - nx * w, pts[i][1] - ny * w]);
    }
    var w0 = widthAt(profile, 0), w1 = widthAt(profile, 1);
    function f(p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }
    var dStr = 'M' + f(left[0]);
    for (i = 1; i < n; i++) dStr += 'L' + f(left[i]);
    dStr += 'A' + w1.toFixed(2) + ',' + w1.toFixed(2) + ' 0 0 0 ' + f(right[n - 1]);
    for (i = n - 2; i >= 0; i--) dStr += 'L' + f(right[i]);
    dStr += 'A' + w0.toFixed(2) + ',' + w0.toFixed(2) + ' 0 0 0 ' + f(left[0]) + 'Z';
    return dStr;
  }

  // Half-widths along the limb (t = 0 at the hip/shoulder, 1 at the ankle/wrist)
  var LEG = [[0, 9.5], [0.25, 8.6], [0.5, 6.5], [0.66, 7.1], [0.85, 5.5], [1, 4.8]];
  var ARM = [[0, 5.8], [0.5, 4.4], [1, 3.3]];
  var SLEEVE = [[0, 6.6], [1, 5.4]];

  function buildLeg(g, far) {
    var leg = part(g, '', far ? C.trouserFar : C.trouser);
    var shoe = group(g);
    part(shoe, S.sole, C.sole);
    part(shoe, S.shoe, far ? C.shoeFar : C.shoe);
    line(shoe, S.lace, C.sole, 1.2);
    return { leg: leg, shoe: shoe, glow: null };
  }
  function buildArm(g, far) {
    var skin = far ? C.skinShade : C.skin;
    return { arm: part(g, '', skin), hand: el('ellipse', { rx: 4, ry: 4.8, fill: skin }, g),
             sleeve: part(g, '', far ? C.topFar : C.top) };
  }

  function buildCharacter(g) {
    var shadow = el('ellipse', { rx: 26, ry: 3.5, fill: C.shadow }, g);
    var farArm = buildArm(g, true);
    var farLeg = buildLeg(g, true);
    // Far thigh glow (used when the far leg is the working leg, e.g. step ups on the other side)
    farLeg.glow = el('path', { stroke: C.glow, 'stroke-width': 9, 'stroke-linecap': 'round',
      fill: 'none', opacity: 0 }, g);
    var neck = group(g);
    part(neck, S.neck, C.skin);
    var nearLeg = buildLeg(g, false);
    // Pelvis and shirt go over both thighs so the leg tops never show past the hips
    // Props that sit between the legs (e.g. a towel roll under the near knee)
    var mid = group(g);
    // Pelvis tilts less than the torso so its lower corner never pokes out below the seat
    var pelvis = group(g);
    part(pelvis, S.pelvis, C.trouser);
    var torso = group(g);
    var shirt = part(torso, '', C.top);
    // Thigh glow sits above the shirt hem but below the near arm
    nearLeg.glow = el('path', { stroke: C.glow, 'stroke-width': 9, 'stroke-linecap': 'round',
      fill: 'none', opacity: 0 }, g);
    var head = group(g);
    part(head, S.head, C.skin);
    part(head, S.hair, C.hair);
    part(head, S.ear, C.skinShade);
    el('circle', { cx: S.cheek.cx, cy: S.cheek.cy, r: S.cheek.r, fill: C.cheek, opacity: 0.35 }, head);
    el('ellipse', { cx: S.eye.cx, cy: S.eye.cy, rx: S.eye.rx, ry: S.eye.ry, fill: C.eye }, head);
    el('circle', { cx: S.eyeLight.cx, cy: S.eyeLight.cy, r: S.eyeLight.r, fill: '#FFFFFF' }, head);
    line(head, S.brow, C.hairShade, 1.1);
    line(head, S.smile, C.skinShade, 0.9);
    // Extra amber glows for muscles not on the near thigh (glutes, hamstrings): p.glows = [{a, b, o, w}]
    var extra = group(g);
    var nearArm = buildArm(g, false);
    return { mid: mid, pelvis: pelvis, shirt: shirt, shadow: shadow, farArm: farArm, farLeg: farLeg, torso: torso, neck: neck, head: head,
             nearLeg: nearLeg, nearArm: nearArm, extra: extra };
  }

  function drawLeg(L, leg, hl, k) {
    k = k || 0;
    L.leg.setAttribute('d', limbPath(leg.hip, leg.knee, leg.ankle, LEG, 12));
    place(L.shoe, leg.ankle, angAlong(leg.heel, leg.toe));
    if (L.glow) {
      var a = mix(leg.hip, leg.knee, 0.28 + 0.14 * k), b = mix(leg.hip, leg.knee, 0.78 - 0.06 * k);
      L.glow.setAttribute('d', 'M' + a[0].toFixed(2) + ',' + a[1].toFixed(2) + 'L' + b[0].toFixed(2) + ',' + b[1].toFixed(2));
      L.glow.setAttribute('opacity', (0.6 * Math.max(0, ((hl || 0) - 0.4) / 0.6)).toFixed(2));
    }
  }
  function drawArm(R, arm) {
    R.arm.setAttribute('d', limbPath(arm.s, arm.e, arm.w, ARM, 8));
    var dir = sub(arm.w, arm.e), l = len(dir), h = [arm.w[0] + dir[0] / l * 3.5, arm.w[1] + dir[1] / l * 3.5];
    R.hand.setAttribute('cx', h[0].toFixed(2));
    R.hand.setAttribute('cy', h[1].toFixed(2));
    R.hand.setAttribute('transform', 'rotate(' + angDown(arm.e, arm.w).toFixed(1) + ' ' + h[0].toFixed(2) + ' ' + h[1].toFixed(2) + ')');
    // Short sleeve over the top of the upper arm
    var s2 = mix(arm.s, arm.e, 0.5), s3 = mix(arm.s, arm.e, 0.62);
    R.sleeve.setAttribute('d', limbPath(arm.s, s2, s3, SLEEVE, 0));
  }

  // Shirt with a hem that slants as the hip bends: k = 0 straight, 1 fully seated
  function shirtPath(k) {
    var a = S.hemFlat, b = S.hemSeated;
    var fy = a.front + (b.front - a.front) * k, by = a.back + (b.back - a.back) * k;
    var fx = a.frontX + (b.frontX - a.frontX) * k;
    function n(v) { return v.toFixed(2); }
    return 'M-12.5,' + n(by - 1.5) + ' ' + S.torsoUpper +
      ' C14.8,-7 ' + n(fx) + ',' + n(fy - 4) + ' ' + n(fx) + ',' + n(fy - 1.5) +
      ' Q' + n(fx) + ',' + n(fy) + ' ' + n(fx - 1.5) + ',' + n(fy) +
      ' Q1,' + n((fy + by) / 2 + 1.5) + ' -11,' + n(by) +
      ' Q-12.4,' + n(by) + ' -12.5,' + n(by - 1.5) + ' Z';
  }

  function drawGlows(g, list) {
    list = list || [];
    while (g.childNodes.length < list.length) {
      el('path', { stroke: C.glow, 'stroke-linecap': 'round', fill: 'none' }, g);
    }
    for (var i = 0; i < g.childNodes.length; i++) {
      var n = g.childNodes[i], q = list[i];
      if (!q) { n.setAttribute('opacity', 0); continue; }
      n.setAttribute('d', 'M' + q.a[0].toFixed(2) + ',' + q.a[1].toFixed(2) + 'L' + q.b[0].toFixed(2) + ',' + q.b[1].toFixed(2));
      n.setAttribute('stroke-width', q.w || 9);
      n.setAttribute('opacity', (0.6 * A.clamp(q.o, 0, 1)).toFixed(2));
    }
  }

  function drawCharacter(c, p) {
    var b = p.body;
    var lean = deg(Math.atan2(b.neck[0] - b.hip[0], b.hip[1] - b.neck[1]));   // 0 = upright
    var lying = Math.abs(lean) > 45;
    var low = Math.max(p.near.toe[1], p.far.toe[1], p.near.heel[1], p.far.heel[1]);
    var cx = lying ? (b.hip[0] + b.neck[0]) / 2 : (p.near.ankle[0] + p.far.ankle[0]) / 2;
    c.shadow.setAttribute('cx', cx.toFixed(1));
    c.shadow.setAttribute('cy', Math.min(A.FLOOR + 1, (lying ? A.FLOOR - 2 : low + 4)).toFixed(1));
    c.shadow.setAttribute('rx', lying ? 70 : 26);

    drawArm(c.farArm, p.farArm);
    drawLeg(c.farLeg, p.far, p.hlFar || 0);
    // Hip bend = angle between the torso's "down" and the near thigh
    var th = Math.atan2(p.near.knee[0] - b.hip[0], p.near.knee[1] - b.hip[1]) * 180 / Math.PI;
    var flex = Math.abs(((th + lean) % 360 + 540) % 360 - 180);
    var k = A.clamp((flex - 45) / 35, 0, 1);
    k = k * k * (3 - 2 * k);
    c.shirt.setAttribute('d', shirtPath(k));
    place(c.pelvis, b.hip, lying ? lean : lean * 0.3);
    place(c.torso, b.hip, lean);
    place(c.neck, b.neck, lean);
    place(c.head, b.head, lying ? lean + 6 : lean * 0.6 + 2);   // when lying, face points up
    drawLeg(c.nearLeg, p.near, p.hl, k);
    drawGlows(c.extra, p.glows);
    drawArm(c.nearArm, p.nearArm);
  }

  // Shared drawing helpers for the front/back view figure (jj-anim-front.js)
  A.charUtil = { limbPath: limbPath, LEG: LEG, ARM: ARM, SLEEVE: SLEEVE, place: place, part: part,
                 line: line, group: group, mix: mix, drawGlows: drawGlows };

  A.buildFigure = buildCharacter;
  A.drawFigure = drawCharacter;
})(window.JJAnim);
