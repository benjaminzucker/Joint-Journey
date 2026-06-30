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
    'question':      '<circle cx="12" cy="12" r="9"/><path d="M9.3 9.1a2.8 2.8 0 0 1 5.4 1c0 1.9 -2.7 2.3 -2.7 3.9"/><line x1="12" y1="17" x2="12.01" y2="17"/>', // question in circle
    'clipboard':     '<rect x="9" y="3" width="6" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v13a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2V6a2 2 0 0 1 2 -2h2"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="13" y2="15"/>', // clipboard list

    // Onboarding + decorative
    'joint':         '<path d="M17.6 9.3a2.6 2.6 0 1 1 1.9 -4.5 2.6 2.6 0 1 1 -3.7 3.4l-7 7a2.6 2.6 0 1 1 -5 1.4 2.6 2.6 0 1 1 1.4 -5z"/>', // bone (alias of knee)
    'arrows':        '<polyline points="7 8 3 12 7 16"/><polyline points="17 8 21 12 17 16"/><line x1="3" y1="12" x2="21" y2="12"/>', // left-right (side)
    'calendar':      '<rect x="3" y="4" width="18" height="17" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>', // calendar
    'ruler':         '<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="7" y1="6.5" x2="11" y2="6.5"/><line x1="7" y1="10.5" x2="11" y2="10.5"/><line x1="7" y1="14.5" x2="11" y2="14.5"/><line x1="7" y1="18.5" x2="11" y2="18.5"/>', // ruler / measurements
    'star':          '<polygon points="12 2.5 15 8.6 21.7 9.6 16.8 14.3 18 21 12 17.8 6 21 7.2 14.3 2.3 9.6 9 8.6"/>', // star / goal
    'weight':        '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 8a3 3 0 0 1 6 0"/><line x1="12" y1="8" x2="13.4" y2="10"/>', // scales / weight tracker
    'book':          '<path d="M5 4a2 2 0 0 1 2 -2h11a1 1 0 0 1 1 1v17a1 1 0 0 1 -1 1H7a2 2 0 0 1 -2 -2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>', // book / modules
    'lightbulb':     '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0 -3.5 10.9c.6 .5 1 1.2 1 2h5c0 -.8 .4 -1.5 1 -2A6 6 0 0 0 12 3z"/>', // tips
    'chat':          '<path d="M21 11.5a8.4 8.4 0 0 1 -9 8.4 9 9 0 0 1 -3.9 -.8L3 21l1.9 -4.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/>', // feedback bubble

    // Mindset module icons
    'pulse':         '<path d="M3 12h4l2 -6 4 14 2 -8h6"/>', // heartbeat (understanding pain)
    'shield':        '<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4 -1.5 7 -4.5 7 -9V6z"/><path d="M9.3 12l1.9 1.9 3.5 -3.7"/>', // confidence
    'target':        '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.9"/>', // buy-in / goal
    'sun':           '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/>', // staying positive
    'moon':          '<path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z"/>', // sleep
    'sunrise':       '<path d="M12 3v5"/><path d="M8.5 6.5 12 3l3.5 3.5"/><line x1="2" y1="18" x2="22" y2="18"/><line x1="4.5" y1="14.5" x2="6" y2="15.3"/><line x1="19.5" y1="14.5" x2="18" y2="15.3"/><path d="M7 18a5 5 0 0 1 10 0"/>', // surgery day
    'film':          '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7.5" y1="4" x2="7.5" y2="20"/><line x1="16.5" y1="4" x2="16.5" y2="20"/><line x1="3" y1="9" x2="7.5" y2="9"/><line x1="3" y1="15" x2="7.5" y2="15"/><line x1="16.5" y1="9" x2="21" y2="9"/><line x1="16.5" y1="15" x2="21" y2="15"/>', // mental rehearsal
    'mountain':      '<path d="M3 20 10 7l3.5 6 2 -3L21 20z"/>', // rehearsing recovery

    // Healthy Habits
    'leaf':          '<path d="M5 21c0 -9 5 -16 15 -16 0 8 -5 14 -13 14a6 6 0 0 1 -2 -.3z"/><path d="M5 21c1.5 -6 5 -9.5 9.5 -11.5"/>' // leaf with vein (healthy habits)
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
      // Pillar / accent palette (override-able via CSS variables)
      ':root{--jj-green:#2f9e6f;--jj-amber:#e08a1e;--jj-blue:#2f7fb5;--jj-terracotta:#c4654a;--jj-plum:#8e4585;--jj-neutral:#6b7280}' +
      '.jj-icon{display:inline-flex;align-items:center;justify-content:center;line-height:0;vertical-align:-0.12em;color:var(--green-700)}' +
      '.jj-icon svg{width:1em;height:1em;display:block}' +
      '.nav-icon.jj-icon{color:var(--jj-neutral);font-size:22px}' +
      '.page-title .jj-icon{margin-right:.35em;font-size:.95em}' +
      '.badge .jj-icon{margin-right:.4em;font-size:1.05em}' +
      '.hero-card-icon.jj-icon{font-size:40px;margin-bottom:var(--space-sm)}' +
      '.icon-emoji.jj-icon{font-size:28px}' +
      '.icon-emoji-lg.jj-icon{font-size:44px}' +
      // Colour tints (placed last so they win over the defaults above)
      '.jj-icon[data-jjcolor="green"]{color:var(--jj-green)}' +
      '.jj-icon[data-jjcolor="amber"]{color:var(--jj-amber)}' +
      '.jj-icon[data-jjcolor="blue"]{color:var(--jj-blue)}' +
      '.jj-icon[data-jjcolor="terracotta"]{color:var(--jj-terracotta)}' +
      '.jj-icon[data-jjcolor="plum"]{color:var(--jj-plum)}' +
      '.jj-icon[data-jjcolor="neutral"]{color:var(--jj-neutral)}' +
      // Keep the icon colour on hover/active too (don't wash it out)
      '.nav-item.active .nav-icon.jj-icon[data-jjcolor],.nav-item:hover .nav-icon.jj-icon[data-jjcolor]{filter:saturate(1.15)}';
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
