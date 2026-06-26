/* ============================================
   JOINT JOURNEY - Icon system
   Single source of truth for all UI icons.
   Bold, rounded line icons drawn as inline SVG.
   Usage: <span class="jj-icon" data-jjicon="exercise"></span>
   Size is controlled by the parent's font-size (icon = 1em).
   ============================================ */
(function () {
  // Inner SVG markup for each icon (24x24 viewBox, currentColor stroke)
  var ICONS = {
    // Core pillars
    'exercise':      '<circle cx="13" cy="4" r="1.7"/><path d="M4 17l5 1 .75 -1.5"/><path d="M15 21v-4l-4 -3 1 -6"/><path d="M7 12v-3l5 -1 3 3 3 1"/>', // running figure
    'nutrition':     '<path d="M3 21s9.8 -3.5 12.7 -6.3a4.5 4.5 0 0 0 0 -6.35 4.48 4.48 0 0 0 -6.35 0C6.5 11.2 3 21 3 21z"/><path d="M9 13l-1.5 -1.5"/><path d="M16 17l-1.5 -1.5"/><path d="M14 7c0 -2 1 -3 3 -3"/><path d="M14 7c2 0 3 -1 3 -3"/>', // carrot
    'mindset':       '<circle cx="12" cy="12" r="9"/><path d="M12 16.4c-1.95 -1.7 -3.3 -2.85 -3.3 -4.4a1.75 1.75 0 0 1 3.3 -0.85 1.75 1.75 0 0 1 3.3 0.85c0 1.55 -1.35 2.7 -3.3 4.4z"/>', // head with heart inside

    // App sections
    'getting-ready': '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/><path d="M10 13v2"/><path d="M14 13v2"/>', // suitcase / hospital bag
    'how-to-use':    '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1 -1 -1V4a1 1 0 0 1 1 -1h5a3 3 0 0 1 3 3v14a2.5 2.5 0 0 0 -2.5 -2.5H3z"/><path d="M21 18a1 1 0 0 0 1 -1V4a1 1 0 0 0 -1 -1h-5a3 3 0 0 0 -3 3v14a2.5 2.5 0 0 1 2.5 -2.5H21z"/>', // open book
    'joint-score':   '<path d="M12 13l3.5 -3.5"/><path d="M4 18a8 8 0 1 1 16 0"/><circle cx="12" cy="18" r="1.3"/>', // gauge / dial
    'about':         '<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="12" y1="8" x2="12.01" y2="8"/>', // info circle
    'account':       '<path d="M20 21v-2a4 4 0 0 0 -4 -4H8a4 4 0 0 0 -4 4v2"/><circle cx="12" cy="7" r="4"/>', // person
    'dashboard':     '<path d="M3 9l9 -7 9 7v11a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2z"/><polyline points="9 22 9 12 15 12 15 22"/>', // home
    'logout':        '<path d="M9 21H5a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>', // logout

    // Getting Ready sub-cards
    'bag':           '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/><path d="M10 13v2"/><path d="M14 13v2"/>', // hospital bag (alias of suitcase)
    'home':          '<path d="M3 9l9 -7 9 7v11a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2z"/><polyline points="9 22 9 12 15 12 15 22"/>', // house
    'warning':       '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7 -3L13.7 3.9a2 2 0 0 0 -3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', // warning triangle
    'knee':          '<path d="M17.6 9.3a2.6 2.6 0 1 1 1.9 -4.5 2.6 2.6 0 1 1 -3.7 3.4l-7 7a2.6 2.6 0 1 1 -5 1.4 2.6 2.6 0 1 1 1.4 -5z"/>', // bone (knee/joint)
    'question':      '<circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a3 3 0 0 1 4.6 2.5c0 1.4 -1.4 1.9 -2 2.5"/><line x1="11.8" y1="17" x2="11.81" y2="17"/>', // question in circle
    'clipboard':     '<rect x="9" y="3" width="6" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v13a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2h2"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="13" y2="15"/>' // clipboard list
  };

  function svg(inner) {
    return '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      inner + '</svg>';
  }

  function hydrate(root) {
    (root || document).querySelectorAll('[data-jjicon]').forEach(function (el) {
      if (el.dataset.jjiconDone) return;
      var name = el.getAttribute('data-jjicon');
      if (ICONS[name]) {
        el.innerHTML = svg(ICONS[name]);
        el.dataset.jjiconDone = '1';
      }
    });
  }

  // Inject the shared icon styling once
  function injectStyles() {
    if (document.getElementById('jj-icon-styles')) return;
    var css =
      '.jj-icon{display:inline-flex;align-items:center;justify-content:center;line-height:0;vertical-align:-0.12em;color:var(--green-700)}' +
      '.jj-icon svg{width:1em;height:1em;display:block}' +
      '.nav-icon.jj-icon{color:var(--green-600);font-size:22px}' +
      '.nav-item:hover .nav-icon.jj-icon,.nav-item.active .nav-icon.jj-icon{color:currentColor}' +
      '.page-title .jj-icon{margin-right:.35em;font-size:.95em}' +
      '.badge .jj-icon{margin-right:.4em;font-size:1.05em}' +
      '.hero-card-icon.jj-icon{font-size:40px;margin-bottom:var(--space-sm)}' +
      '.icon-emoji.jj-icon{font-size:28px}' +
      '.icon-emoji-lg.jj-icon{font-size:44px}';
    var style = document.createElement('style');
    style.id = 'jj-icon-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  injectStyles();
  if (document.readyState !== 'loading') {
    hydrate();
  } else {
    document.addEventListener('DOMContentLoaded', function () { hydrate(); });
  }

  // Expose for dynamically-rendered content
  window.JJIcons = { icons: ICONS, svg: svg, hydrate: hydrate };
})();
