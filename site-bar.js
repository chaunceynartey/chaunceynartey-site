/* Site-wide menu bar. One source of truth for the site map: edit PAGES to add or rename a page. */
(function () {
  var PAGES = [
    { label: 'Home', href: '/', match: /^\/(index\.html)?$/ },
    { label: 'For Companies', href: '/speaking/', match: /^\/speaking\// },
    { label: 'For Dads', href: '/run-home/', match: /^\/run-home\// },
    { label: 'For Couples', href: '/couples/', match: /^\/couples\// },
    { label: 'For Educators', href: 'https://lifeskillslab.ai', external: true },
    { label: 'How I With AI', href: '/challenge/', match: /^\/challenge\// }
  ];

  var css = 'html{scroll-padding-top:56px}' +
    '.sitebar{display:block;width:100%;margin:0;padding:0;position:sticky;top:0;z-index:1000;background:#efe9df;border-bottom:1px solid #d9cfbd;font-family:Inter,system-ui,-apple-system,sans-serif}' +
    '.sitebar .sb-in{box-sizing:border-box;justify-content:flex-start;flex-wrap:nowrap;max-width:1368px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:20px;height:44px}' +
    '.sitebar .sb-home{display:inline-flex;align-items:center;gap:8px;font-family:"DM Serif Display",Georgia,serif;font-size:18px;color:#0b1226;text-decoration:none;white-space:nowrap}' +
    '.sitebar .sb-home svg{flex:0 0 18px}' +
    '.sitebar .sb-links{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;margin-left:auto}' +
    '.sitebar .sb-links::-webkit-scrollbar{display:none}' +
    '.sitebar .sb-links a{font-size:13px;font-weight:800;color:#16203a;text-decoration:none;padding:7px 12px;border-radius:999px;white-space:nowrap}' +
    '.sitebar .sb-links a:hover{background:#e2d8c6}' +
    '.sitebar .sb-links a[aria-current="page"]{background:#0b1226;color:#ffff33}' +
    '.sitebar .sb-links a .ext{opacity:.55;margin-left:3px}' +
    '@media (max-width:760px){.sitebar .sb-in{padding:0 0 0 16px;gap:10px}.sitebar .sb-home span{display:none}.sitebar .sb-links{margin-left:0;padding-right:16px}}';

  function build() {
    if (document.querySelector('.sitebar')) return;
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var path = location.pathname;
    var bar = document.createElement('div');
    bar.setAttribute('role', 'navigation');
    bar.className = 'sitebar';
    bar.setAttribute('aria-label', 'Site');

    var links = PAGES.filter(function (p) { return p.label !== 'Home'; }).map(function (p) {
      var current = p.match && p.match.test(path);
      return '<a href="' + p.href + '"' +
        (current ? ' aria-current="page"' : '') +
        (p.external ? ' target="_blank" rel="noopener"' : '') + '>' +
        p.label + (p.external ? '<span class="ext" aria-hidden="true">↗</span>' : '') + '</a>';
    }).join('');

    var homeCurrent = PAGES[0].match.test(path);
    bar.innerHTML = '<div class="sb-in">' +
      '<a class="sb-home" href="/"' + (homeCurrent ? ' aria-current="page"' : '') + ' title="Back to home">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>' +
      '<span>Chauncey Nartey</span></a>' +
      '<div class="sb-links">' + links + '</div></div>';

    document.body.insertBefore(bar, document.body.firstChild);
    var cur = bar.querySelector('.sb-links [aria-current="page"]');
    if (cur) { var box = bar.querySelector('.sb-links'); box.scrollLeft = Math.max(0, cur.getBoundingClientRect().left - box.getBoundingClientRect().left - 24); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
