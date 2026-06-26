/* ============================================
   JOINT JOURNEY - Effects (count-up + confetti)
   Lightweight, dependency-free, respects
   prefers-reduced-motion for accessibility.
   ============================================ */
(function () {
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Brand-aligned confetti colours (greens + warm accents + a pop of blue)
  var COLORS = ['#FFA726', '#FF8F00', '#FFCA28', '#475953', '#849490', '#1976D2'];

  function confetti(opts) {
    opts = opts || {};
    if (reduceMotion) return; // honour accessibility preference
    var count = opts.count || 80;
    var originX = (opts.x != null) ? opts.x : window.innerWidth / 2;
    var originY = (opts.y != null) ? opts.y : window.innerHeight / 3;

    for (var i = 0; i < count; i++) {
      var piece = document.createElement('div');
      piece.className = 'jj-confetti-piece';
      piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      var size = 6 + Math.random() * 6;
      piece.style.width = size + 'px';
      piece.style.height = (size * 0.6) + 'px';
      piece.style.left = originX + 'px';
      piece.style.top = originY + 'px';
      document.body.appendChild(piece);

      var angle = Math.random() * Math.PI * 2;
      var velocity = 120 + Math.random() * 220;
      var dx = Math.cos(angle) * velocity;
      var dy = Math.sin(angle) * velocity - (120 + Math.random() * 140); // bias upward first
      var rot = (Math.random() * 720 - 360);
      var dur = 900 + Math.random() * 800;

      piece.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + dx + 'px,' + (dy + 420) + 'px) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: dur, easing: 'cubic-bezier(.15,.6,.4,1)', fill: 'forwards' });

      (function (p) { setTimeout(function () { p.remove(); }, dur + 50); })(piece);
    }
  }

  function confettiFromElement(el, opts) {
    if (!el) { confetti(opts); return; }
    var r = el.getBoundingClientRect();
    opts = opts || {};
    opts.x = r.left + r.width / 2;
    opts.y = r.top + r.height / 2;
    confetti(opts);
  }

  function countUp(el, target, opts) {
    if (!el) return;
    target = Number(target) || 0;
    opts = opts || {};
    if (reduceMotion || target <= 0) {
      el.textContent = target.toLocaleString();
      return;
    }
    var dur = opts.duration || 900;
    var start = performance.now();
    function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = Math.round(target * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  window.JJEffects = {
    confetti: confetti,
    confettiFromElement: confettiFromElement,
    countUp: countUp
  };
})();
