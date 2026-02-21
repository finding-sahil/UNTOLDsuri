/**
 * UNTOLDsuri — main.js
 * Reads window.SITE (from config.js) and renders the entire page.
 * Also handles: cursor tracer, mobile nav toggle.
 */

(function () {
  'use strict';

  const S = window.SITE;

  /* ══════════════════════════════════════════════════════════
     ICON REGISTRY  (inline SVG, monochrome)
  ══════════════════════════════════════════════════════════ */
  const ICONS = {
    youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3"/>
      <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/></svg>`,

    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,

    facebook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,

    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/></svg>`,

    person: `<svg viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="22" r="10" stroke="#555" stroke-width="1.5"/>
      <path d="M10 55c0-11 9-18 20-18s20 7 20 18" stroke="#555" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  };

  /* ══════════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════════ */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: NAV
  ══════════════════════════════════════════════════════════ */
  function renderNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const brand = `<a href="#" class="nav-brand">${esc(S.brand.name).replace('suri', '<span>suri</span>')}</a>`;
    const links = S.nav.map(n =>
      `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`
    ).join('');

    nav.innerHTML = `
      ${brand}
      <ul class="nav-links">${links}</ul>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>`;
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: HERO
  ══════════════════════════════════════════════════════════ */
  function renderHero() {
    const hero = document.getElementById('hero-inner');
    if (!hero) return;
    hero.innerHTML = `
      <img src="${esc(S.brand.logo)}" alt="${esc(S.brand.name)} logo" class="hero-logo"/>
      <h1 class="hero-title">${esc(S.brand.name).replace('suri', '<span>suri</span>')}</h1>
      <div class="red-rule"></div>
      <p class="hero-tagline">${esc(S.brand.tagline)}</p>
      <p class="hero-sub">${esc(S.brand.subtext)}</p>`;
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: ABOUT
  ══════════════════════════════════════════════════════════ */
  function renderAbout() {
    const wrap = document.getElementById('about-body');
    if (!wrap) return;
    wrap.innerHTML = S.about.map((p, i) =>
      `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`
    ).join('');
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: PLATFORMS
  ══════════════════════════════════════════════════════════ */
  function renderPlatforms() {
    const grid = document.getElementById('platform-grid');
    if (!grid) return;
    grid.innerHTML = S.platforms.map(p => `
      <a href="${esc(p.href)}" target="_blank" rel="noopener noreferrer" class="platform-card">
        <div class="platform-icon">${ICONS[p.icon] || ICONS.email}</div>
        <div class="platform-info">
          <strong>${esc(p.name)}</strong>
          <span>${esc(p.desc)}</span>
        </div>
        <span class="platform-arrow">↗</span>
      </a>`).join('');
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: WORKS  (Instagram reel iframes, portrait)
  ══════════════════════════════════════════════════════════ */
  function renderWorks() {
    const grid = document.getElementById('works-grid');
    if (!grid) return;
    grid.innerHTML = S.works.map(w => `
      <article class="work-card">
        <a href="${esc(w.url)}" target="_blank" rel="noopener noreferrer" class="work-thumbnail-link">
          <img src="${esc(w.thumbnail)}" alt="${esc(w.title)}" class="work-thumbnail" loading="lazy"/>
          <div class="play-overlay" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <circle cx="12" cy="12" r="10" opacity="0.8"/>
              <polygon points="10,8 16,12 10,16" fill="white"/>
            </svg>
          </div>
        </a>
        <div class="work-meta">
          <span class="badge badge-${esc(w.platform)}">${esc(w.badge)}</span>
          <h3 class="work-title">${esc(w.title)}</h3>
          <p class="work-desc">${esc(w.desc)}</p>
        </div>
      </article>`).join('');
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: RESEARCH
  ══════════════════════════════════════════════════════════ */
  function renderResearch() {
    const t = document.getElementById('research-topics');
    const p = document.getElementById('research-places');
    const o = document.getElementById('research-ongoing');

    if (t) t.innerHTML = S.research.topics.map(li =>
      `<li>${esc(li)}</li>`).join('');

    if (p) p.innerHTML = S.research.places.map(li =>
      `<li>${esc(li)}</li>`).join('');

    if (o) o.innerHTML = S.research.ongoing.map(item => {
      const dot = item.active
        ? '<span class="status-dot"></span>'
        : '<span class="status-dot status-pending"></span>';
      return `<li>${dot} ${esc(item.label)}</li>`;
    }).join('');
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: TEAM
  ══════════════════════════════════════════════════════════ */
  function renderTeam() {
    const grid = document.getElementById('team-grid');
    if (!grid) return;
    grid.innerHTML = S.team.map(m => {
      const avatar = m.photo
        ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy"/>`
        : ICONS.person;
      return `
        <div class="team-card">
          <div class="team-avatar" aria-hidden="true">${avatar}</div>
          <div class="team-info">
            <strong class="team-name">${esc(m.name)}</strong>
            <span class="team-role">${esc(m.role)}</span>
            <p class="team-bio">${esc(m.bio)}</p>
          </div>
        </div>`;
    }).join('');
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: CONTACT
  ══════════════════════════════════════════════════════════ */
  function renderContact() {
    const body = document.getElementById('contact-body');
    const link = document.getElementById('contact-email-link');
    if (body) body.innerHTML = S.contact.body.map(p =>
      `<p class="contact-body">${esc(p)}</p>`).join('');
    if (link) {
      link.href = `mailto:${esc(S.links.email)}`;
      link.querySelector('.contact-email-text').textContent = S.links.email;
    }
  }

  /* ══════════════════════════════════════════════════════════
     RENDER: FOOTER
  ══════════════════════════════════════════════════════════ */
  function renderFooter() {
    const brand = document.getElementById('footer-brand');
    const quote = document.getElementById('footer-quote');
    const copy = document.getElementById('footer-copy');
    const dev = document.getElementById('footer-dev');
    if (brand) brand.innerHTML = esc(S.brand.name).replace('suri', '<span>suri</span>');
    if (quote) quote.textContent = S.brand.footerQuote;
    if (copy) copy.textContent = `© ${S.brand.copyright}`;
    if (dev && S.brand.developer) {
      dev.innerHTML = `Created with ❤️ by <a href="${esc(S.brand.developer.link)}" target="_blank" rel="noopener noreferrer">${esc(S.brand.developer.name)}</a>`;
    }
  }

  /* ══════════════════════════════════════════════════════════
     CURSOR TRACER
  ══════════════════════════════════════════════════════════ */
  function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let dx = 0, dy = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      // Dot — instant (lerp factor 1)
      dx = lerp(dx, mx, 1.0);
      dy = lerp(dy, my, 1.0);
      dot.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;

      // Ring — slow trailing bubble (lerp factor 0.07)
      rx = lerp(rx, mx, 0.07);
      ry = lerp(ry, my, 0.07);
      ring.style.transform = `translate(calc(-50% + ${rx}px), calc(-50% + ${ry}px))`;

      requestAnimationFrame(tick);
    }
    tick();

    // Hover expand
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, .platform-card, .work-card, .team-card'))
        document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, .platform-card, .work-card, .team-card'))
        document.body.classList.remove('cursor-hover');
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = ring.style.opacity = '1';
    });
  }

  /* ══════════════════════════════════════════════════════════
     MOBILE NAV
  ══════════════════════════════════════════════════════════ */
  function initNav() {
    // nav is rendered dynamically — wait for DOM
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    nav.addEventListener('click', e => {
      const toggle = e.target.closest('.nav-toggle');
      if (!toggle) return;
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.querySelector('.nav-links').classList.toggle('open');
    });

    nav.addEventListener('click', e => {
      if (e.target.closest('.nav-links a')) {
        nav.querySelector('.nav-links').classList.remove('open');
        nav.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ══════════════════════════════════════════════════════════
     BOOT
  ══════════════════════════════════════════════════════════ */
  function boot() {
    renderNav();
    renderHero();
    renderAbout();
    renderPlatforms();
    renderWorks();
    renderResearch();
    renderTeam();
    renderContact();
    renderFooter();
    initNav();
    initCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
