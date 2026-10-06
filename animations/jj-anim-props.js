/* ============================================================================
   JOINT JOURNEY - Shared scenery for exercise animations (floor, chair, mat,
   pillow, kitchen worktop). Load after jj-anim-core.js.
   ============================================================================ */
(function (A) {
  'use strict';
  var el = A.el, COL = A.COL;

  function box(g, x, y, w, h, r) {
    el('rect', { x: x, y: y, width: w, height: h, rx: r, fill: COL.prop, stroke: COL.propEdge, 'stroke-width': 1.5 }, g);
  }

  A.props = {
    // Worktop hand position for standing exercises (front edge at x = 172)
    GRIP: [176, 104],
    floor: function (g) {
      el('line', { x1: 0, y1: A.FLOOR, x2: 320, y2: A.FLOOR, stroke: COL.floor, 'stroke-width': 2 }, g);
    },
    // Same chair as the seated knee extension: seat top at y = 160, hip sits at [120, 154]
    chair: function (g) {
      box(g, 101, 92, 7, 74, 3);    // back rest
      box(g, 101, 160, 61, 7, 3);   // seat
      box(g, 103, 166, 6, 34, 2);   // back leg
      box(g, 153, 166, 6, 34, 2);   // front leg
    },
    // Mat or bed, with a pillow under the head (lying hip at [158, 188])
    mat: function (g, pillow) {
      el('rect', { x: 36, y: 194, width: 260, height: 6, rx: 3, fill: COL.mat }, g);
      if (pillow !== false) {
        el('ellipse', { cx: 88, cy: 190, rx: 17, ry: 5, fill: COL.prop, stroke: COL.propEdge, 'stroke-width': 1.5 }, g);
      }
    },
    // Kitchen worktop with cupboard front; front edge at x, top at y = 100
    worktop: function (g, x) {
      x = x || 172;
      box(g, x + 4, 108, 320 - x, 92, 2);          // cupboard
      box(g, x, 100, 324 - x, 8, 2);               // worktop surface
      el('line', { x1: x + 14, y1: 122, x2: x + 26, y2: 122, stroke: COL.propEdge, 'stroke-width': 2, 'stroke-linecap': 'round' }, g); // handle
    }
  };
})(window.JJAnim);
