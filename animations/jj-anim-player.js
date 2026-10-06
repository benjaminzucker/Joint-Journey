/* ============================================================================
   JOINT JOURNEY - Exercise animation player
   JJAnimations.mount(container, 'seated-knee-extension', { freeze: 0.4 })
     freeze (optional 0-1): show one still frame at that point in the cycle.
   Respects the user's "reduce motion" setting and has a Play/Pause button
   (WCAG 2.2.2 Pause, Stop, Hide).
   ============================================================================ */
(function (global, A) {
  'use strict';

  function injectStyles() {
    if (document.getElementById('jj-anim-styles')) return;
    var s = document.createElement('style');
    s.id = 'jj-anim-styles';
    s.textContent =
      '.jj-anim{margin:0;background:#fff;border:1px solid #DDE4E0;border-radius:14px;padding:12px;}' +
      '.jj-anim-svg{display:block;width:100%;height:auto;background:#F8FAF9;border-radius:10px;}' +
      '.jj-anim figcaption{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:10px;}' +
      '.jj-anim-caption{flex:1 1 200px;margin:0;font-weight:600;color:#2F3B37;min-height:2.6em;line-height:1.3;}' +
      '.jj-anim-tip{flex:1 1 100%;margin:0;font-size:.9em;color:#5B6B66;}' +
      '.jj-anim-toggle{min-width:88px;min-height:44px;padding:8px 16px;border:0;border-radius:10px;' +
        'background:#475953;color:#fff;font:inherit;font-weight:600;cursor:pointer;}' +
      '.jj-anim-toggle:focus-visible{outline:3px solid #FF8F00;outline-offset:2px;}';
    document.head.appendChild(s);
  }

  var uid = 0;
  function mount(container, key, opts) {
    opts = opts || {};
    var spec = A.exercises[key];
    if (!spec || !container) return null;
    injectStyles();
    var id = ++uid;

    var fig = document.createElement('figure');
    fig.className = 'jj-anim';
    var svg = A.el('svg', { viewBox: spec.viewBox || '0 0 320 220', role: 'img', 'class': 'jj-anim-svg',
      'aria-label': spec.title + ' demonstration. ' + spec.alt });
    fig.appendChild(svg);
    var sceneUpdate = spec.scene ? spec.scene(A.el('g', {}, svg), id) : null;
    var figG = A.el('g', {}, svg);
    var figure = A.buildFigure(figG);
    if (spec.midground) spec.midground(figure.mid);   // drawn in front of the far leg, behind the near leg
    // Optional second figure for crossfades: pose.blend = { pose: otherPose, mix: 0-1 }
    var figG2 = null, figure2 = null;
    if (spec.blend) {
      figG2 = A.el('g', { opacity: 0 }, svg);
      figure2 = A.buildFigure(figG2);
    }

    var cap = document.createElement('figcaption');
    var capText = document.createElement('p');
    capText.className = 'jj-anim-caption';
    capText.setAttribute('aria-hidden', 'true'); // step text is visual; the full description is in aria-label
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jj-anim-toggle';
    cap.appendChild(capText);
    cap.appendChild(btn);
    if (spec.tip) {
      var tip = document.createElement('p');
      tip.className = 'jj-anim-tip';
      tip.textContent = spec.tip;
      cap.appendChild(tip);
    }
    fig.appendChild(cap);
    container.innerHTML = '';
    container.appendChild(fig);

    var reduceMotion = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var frozen = typeof opts.freeze === 'number' && !isNaN(opts.freeze);
    var elapsed = (frozen ? opts.freeze : (reduceMotion ? spec.poster : 0)) * spec.period;
    var playing = false, last = null, raf = null;

    function render() {
      var phase = (elapsed % spec.period) / spec.period;
      var pose = spec.pose(phase, elapsed);
      A.drawFigure(figure, pose);
      if (figure2) {
        var m = pose.blend ? pose.blend.mix : 0;
        if (pose.blend) A.drawFigure(figure2, pose.blend.pose);
        figG.setAttribute('opacity', (1 - m).toFixed(3));
        figG2.setAttribute('opacity', m.toFixed(3));
      }
      if (sceneUpdate) sceneUpdate(phase, elapsed);
      if (capText.textContent !== pose.caption) capText.textContent = pose.caption || '';
    }
    function tick(now) {
      if (last === null) last = now;
      elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      render();
      raf = playing ? requestAnimationFrame(tick) : null;
    }
    function setPlaying(p) {
      playing = p;
      btn.textContent = p ? 'Pause' : 'Play';
      btn.setAttribute('aria-label', (p ? 'Pause ' : 'Play ') + spec.title + ' animation');
      last = null;
      if (p && !raf) raf = requestAnimationFrame(tick);
    }
    btn.addEventListener('click', function () { setPlaying(!playing); });

    render();
    setPlaying(!(frozen || reduceMotion));
    return { destroy: function () { playing = false; if (raf) cancelAnimationFrame(raf); raf = null; } };
  }

  global.JJAnimations = {
    mount: mount,
    list: function () { return Object.keys(A.exercises); },
    title: function (key) { return A.exercises[key] ? A.exercises[key].title : ''; }
  };
})(window, window.JJAnim);
