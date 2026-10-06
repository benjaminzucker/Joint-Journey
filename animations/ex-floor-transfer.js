/* Joint Journey - Floor Transfer Practice animation (DRAFT - awaiting physio sign-off)
   Getting up from lying on the floor using a sturdy chair, then getting back down.
   Up: lie on back > roll onto side (crossfade, as a side view cannot show the roll) >
   push up onto hands and knees (crossfade, as the figure turns to face the chair) >
   crawl to the chair > kneel up with hands on the seat > half kneel > stand.
   Down is the same sequence in reverse. */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;
  var SEAT = [190, 157];   // hands on the chair seat
  var PERIOD = 32;         // 16 s up, 16 s down

  function box(g, x, y, w, h, r) {
    el('rect', { x: x, y: y, width: w, height: h, rx: r, fill: COL.prop, stroke: COL.propEdge, 'stroke-width': 1.5 }, g);
  }

  // ---- Lying poses (head to the left) --------------------------------------
  function supine() {
    var hip = [128, 188], b = A.body(hip, -86);
    return {
      body: b,
      far: A.legIK([hip[0] - 1, hip[1]], [164, A.ANKLE_Y], 90),
      near: A.legIK(hip, [168, A.ANKLE_Y], 90),
      farArm: A.armFK([b.shoulder[0], b.shoulder[1] + 1], 85, 88),
      nearArm: A.armFK([b.shoulder[0], b.shoulder[1] + 2], 85, 88),
      hl: 0
    };
  }
  function sideLying() {   // rolled onto the side, propped on the elbow, knees drawn up
    var hip = [128, 187], b = A.body(hip, -72);
    return {
      body: b,
      far: A.legIK([hip[0] - 1, hip[1]], [150, A.ANKLE_Y - 1], 70),
      near: A.legIK(hip, [154, A.ANKLE_Y], 80),
      farArm: A.armIK([b.shoulder[0], b.shoulder[1] + 1], [b.shoulder[0] + 22, 194]),   // forearm on the floor
      nearArm: A.armIK(b.shoulder, [b.shoulder[0] + 34, 190]),                       // hand pushing on the floor
      hl: 0
    };
  }

  // ---- Hands and knees through to standing (facing the chair) --------------
  // hx, hy hip; ln lean; n/f ankle x, y, foot angle; px, py hand target; w 1 = hands on target, 0 = by the side
  function K(t, hx, hy, ln, nx, ny, nf, fx, fy, ff, px, py, w, hl) {
    return { t: t, v: { hx: hx, hy: hy, ln: ln, nx: nx, ny: ny, nf: nf, fx: fx, fy: fy, ff: ff, px: px, py: py, w: w, hl: hl } };
  }
  var UPRIGHT = [
    K(0.00, 116, 148, 80, 78, 191, -100, 76, 191, -100, 163, 194, 1, 0),     // hands and knees
    K(0.30, 128, 148, 80, 90, 191, -100, 88, 191, -100, 175, 194, 1, 0),     // after crawling
    K(0.45, 140, 150, 30, 102, 191, -100, 100, 191, -100, SEAT[0], SEAT[1], 1, 0),  // kneel up, hands on seat
    K(0.52, 139, 149, 34, 132, 170, 60, 100, 191, -100, SEAT[0], SEAT[1], 1, 0.3),
    K(0.60, 140, 150, 30, 162, 195, 90, 100, 191, -100, SEAT[0], SEAT[1], 1, 0.4),  // half kneel
    K(0.68, 146, 146, 38, 162, 195, 90, 104, 190, -60, SEAT[0], SEAT[1], 1, 0.8),
    K(0.80, 152, 126, 32, 162, 195, 90, 120, 192, 60, SEAT[0], SEAT[1], 0.5, 1),
    K(0.90, 154, 110, 4, 160, 195, 90, 150, 195, 90, SEAT[0], SEAT[1], 0, 0.3),   // standing
    K(1.00, 154, 110, 4, 160, 195, 90, 150, 195, 90, SEAT[0], SEAT[1], 0, 0)
  ];
  function upright(u) {
    var v = A.sample(UPRIGHT, u, 1).v;
    var hip = [v.hx, v.hy], b = A.body(hip, v.ln);
    // Crawl: hands lift and move alternately while travelling
    var crawl = u < 0.30 ? u / 0.30 : -1, nl = 0, fl = 0;
    if (crawl >= 0) { var w = Math.sin(crawl * 4 * Math.PI); nl = Math.max(0, w) * 5; fl = Math.max(0, -w) * 5; }
    function hand(sh, dx, lift) {
      var rest = [sh[0] + 6, sh[1] + 50];
      return A.armIK(sh, [A.lerp(rest[0], v.px + dx, v.w), A.lerp(rest[1], v.py - lift, v.w)]);
    }
    return {
      body: b,
      far: A.legIK([hip[0] - 2, hip[1]], [v.fx, v.fy], v.ff),
      near: A.legIK(hip, [v.nx, v.ny], v.nf),
      farArm: hand([b.shoulder[0] - 2, b.shoulder[1]], -3, fl),
      nearArm: hand(b.shoulder, 0, nl),
      hl: v.hl
    };
  }

  // ---- Timeline for getting up (u from 0 to 1) -----------------------------
  var UP_CAPS = [
    [0.10, 'Lie on your back, knees bent'],
    [0.28, 'Roll onto your side'],
    [0.38, 'Push up onto your hands and knees'],
    [0.52, 'Crawl to the chair'],
    [0.60, 'Kneel up, hands on the seat'],
    [0.68, 'Bring one foot forward, flat on the floor'],
    [0.88, 'Push up through your front leg and the chair'],
    [1.01, 'Stand tall and steady yourself']
  ];
  var DOWN_CAPS = [
    [0.10, 'Rest, then repeat'],
    [0.28, 'Lie back down'],
    [0.38, 'Lower onto your side'],
    [0.52, 'Crawl back from the chair'],
    [0.60, 'Put your hands on the floor'],
    [0.68, 'Bring the other knee down'],
    [0.88, 'Reach for the seat and lower one knee slowly'],
    [1.01, 'To get down: hold the chair seat']
  ];
  function caption(list, u) { for (var i = 0; i < list.length; i++) if (u < list[i][0]) return list[i][1]; return ''; }
  function fade(u, a, b) { return A.ease(A.clamp((u - a) / (b - a), 0, 1)); }

  A.exercises['floor-transfer'] = {
    title: 'Floor Transfer Practice',
    alt: 'A person lying on their back on the floor rolls onto their side, pushes up onto hands and knees, crawls to a sturdy chair, kneels up with hands on the seat, brings one foot forward and pushes up to standing. They then reverse the movement to get back down to the floor.',
    tip: 'Only practise if you feel confident, with someone nearby. Roll onto your side first rather than sitting straight up. Use a sturdy chair that will not slide.',
    period: PERIOD,
    poster: 0.18,
    blend: true,
    scene: function (g) {
      A.props.floor(g);
      A.props.mat(g, false);
      // Sturdy chair facing the person: seat top at y = 160, front edge at x = 184
      box(g, 238, 92, 7, 74, 3);    // back rest
      box(g, 184, 160, 61, 7, 3);   // seat
      box(g, 237, 166, 6, 34, 2);   // back leg
      box(g, 187, 166, 6, 34, 2);   // front leg
      return null;
    },
    pose: function (phase) {
      var up = phase < 0.5, u = up ? phase * 2 : (1 - phase) * 2;
      var p, blend = null;
      if (u < 0.10) p = supine();
      else if (u < 0.20) { p = supine(); blend = { pose: sideLying(), mix: fade(u, 0.10, 0.20) }; }
      else if (u < 0.28) p = sideLying();
      else if (u < 0.38) { p = sideLying(); blend = { pose: upright(0), mix: fade(u, 0.28, 0.38) }; }
      else p = upright((u - 0.38) / 0.62);
      p.blend = blend;
      p.caption = caption(up ? UP_CAPS : DOWN_CAPS, u);
      return p;
    }
  };
})(window.JJAnim);
