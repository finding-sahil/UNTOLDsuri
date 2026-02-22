/**
 * UNTOLDsuri — main.js
 * Reads window.SITE (from config.js) and renders the entire page.
 * Also handles: cinematic visuals, scroll logic, and custom cursor.
 */

(function () {
  'use strict';

  const S = window.SITE;

  /* ══════════════════════════════════════════════════════════
     ICON REGISTRY
  ══════════════════════════════════════════════════════════ */
  const ICONS = {
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 2 1 9.3 1 9.3 1s7.3 0 9.3-1c1.1-.3 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.977 6.98 1.281.058 1.689.072 4.951.072s3.67-.014 4.951-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.977-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg>`,
    person: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="22" r="10" stroke="#555" stroke-width="1.5"/><path d="M10 55c0-11 9-18 20-18s20 7 20 18" stroke="#555" stroke-width="1.5"/></svg>`,
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ══════════════════════════════════════════════════════════
     RENDER FUNCTIONS
  ══════════════════════════════════════════════════════════ */

  function renderNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    const brand = `<a href="#" class="nav-brand">${esc(S.brand.name).replace('suri', '<span>suri</span>')}</a>`;
    const links = S.nav.map(n => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('');
    nav.innerHTML = `${brand}<ul class="nav-links">${links}</ul><button class="nav-toggle"><span></span><span></span><span></span></button>`;
  }

  function renderHero() {
    const hero = document.getElementById('hero-inner');
    if (!hero) return;
    hero.innerHTML = `
      <img src="${esc(S.brand.logo)}" alt="logo" class="hero-logo reveal" width="120" height="120" fetchpriority="high" />
      <h1 class="hero-title reveal">${esc(S.brand.name).replace('suri', '<span>suri</span>')}</h1>
      <div class="red-rule reveal"></div>
      <p class="hero-tagline reveal">${esc(S.brand.tagline)}</p>
      <p class="hero-sub reveal">${esc(S.brand.subtext)}</p>`;
  }

  function renderAbout() {
    const wrap = document.getElementById('about-body');
    if (!wrap) return;
    wrap.classList.add('reveal');
    wrap.innerHTML = S.about.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`).join('');
  }

  function renderPlatforms() {
    const grid = document.getElementById('platform-grid');
    if (!grid) return;
    grid.innerHTML = S.platforms.map(p => `
      <a href="${esc(p.href)}" target="_blank" class="platform-card reveal">
        <div class="platform-icon">${ICONS[p.icon] || ''}</div>
        <div class="platform-info"><strong>${esc(p.name)}</strong><span>${esc(p.desc)}</span></div>
        <span class="platform-arrow">↗</span>
      </a>`).join('');
  }

  function renderWorks() {
    const grid = document.getElementById('works-grid');
    if (!grid) return;
    grid.innerHTML = S.works.map(w => `
      <article class="work-card reveal">
        <a href="${esc(w.url)}" target="_blank" class="work-thumbnail-link">
          <img src="${esc(w.thumbnail)}" alt="${esc(w.title)}" class="work-thumbnail" loading="lazy"/>
          <div class="play-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.8"/><polygon points="10,8 16,12 10,16" fill="white"/></svg></div>
        </a>
        <div class="work-meta">
          <span class="badge">${esc(w.badge)}</span>
          <h3 class="work-title">${esc(w.title)}</h3>
          <p class="work-desc">${esc(w.desc)}</p>
        </div>
      </article>`).join('');
  }

  let currentLightboxIndex = 0;

  function renderGallery() {
    const scroller = document.getElementById('gallery-scroller');
    if (!scroller) return;
    scroller.innerHTML = S.gallery.map((g, i) => {
      const rot = (Math.random() * 6 - 3).toFixed(1);
      return `
      <div class="gallery-card reveal" style="--rot: ${rot}deg" data-index="${i}">
        <img src="${esc(g.img)}" alt="${esc(g.title)}" class="gallery-img" loading="lazy" width="300" height="300" />
        <div class="gallery-info">
          <h3>${esc(g.title)}</h3>
        </div>
      </div>`;
    }).join('');

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    const updateLightbox = (idx) => {
      currentLightboxIndex = parseInt(idx);
      const item = S.gallery[currentLightboxIndex];
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = item.img;
        lbImg.alt = item.title;
        lbCap.innerHTML = `<h3>${esc(item.title)}</h3><p>${esc(item.desc)}</p>`;
        lbImg.style.opacity = '1';
      }, 200);
    };

    scroller.addEventListener('click', e => {
      const card = e.target.closest('.gallery-card');
      if (!card) return;
      updateLightbox(card.dataset.index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    prevBtn?.addEventListener('click', e => {
      e.stopPropagation();
      let newIdx = currentLightboxIndex - 1;
      if (newIdx < 0) newIdx = S.gallery.length - 1;
      updateLightbox(newIdx);
    });

    nextBtn?.addEventListener('click', e => {
      e.stopPropagation();
      let newIdx = (currentLightboxIndex + 1) % S.gallery.length;
      updateLightbox(newIdx);
    });

    lightbox.addEventListener('click', e => {
      if (!e.target.closest('.lightbox-content') && !e.target.closest('.lightbox-btn')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  function renderResearch() {
    const t = document.getElementById('research-topics');
    const p = document.getElementById('research-places');
    const o = document.getElementById('research-ongoing');
    if (t) t.innerHTML = S.research.topics.map(li => `<li class="reveal">${esc(li)}</li>`).join('');
    if (p) p.innerHTML = S.research.places.map(li => `<li class="reveal">${esc(li)}</li>`).join('');
    if (o) o.innerHTML = S.research.ongoing.map(item => `<li class="reveal"><span class="status-dot ${item.active ? '' : 'status-pending'}"></span> ${esc(item.label)}</li>`).join('');
  }

  function renderMap() {
    const title = document.getElementById('map-title');
    const desc = document.getElementById('map-desc');
    const canvas = document.getElementById('map-canvas');
    if (title) title.textContent = S.map.title;
    if (desc) desc.textContent = S.map.desc;
    if (canvas) {
      canvas.innerHTML = S.map.pins.map(pin => `
        <div class="map-pin" style="left: ${pin.x}; top: ${pin.y};">
          <div class="pin-label">${esc(pin.name)} • ${esc(pin.status)}</div>
        </div>`).join('');
    }
  }

  function renderTeam() {
    const grid = document.getElementById('team-grid');
    if (!grid) return;
    grid.innerHTML = S.team.map(m => `
      <div class="team-card reveal">
        <div class="team-avatar">${m.photo ? `<img src="${esc(m.photo)}" alt="photo" width="64" height="64" loading="lazy" />` : ICONS.person}</div>
        <div class="team-info">
          <strong class="team-name">${esc(m.name)}</strong>
          <span class="team-role">${esc(m.role)}</span>
          <p class="team-bio">${esc(m.bio)}</p>
        </div>
      </div>`).join('');
  }

  function renderNewsletter() {
    const title = document.getElementById('news-title');
    const desc = document.getElementById('news-desc');
    const input = document.getElementById('news-email');
    if (title) title.textContent = S.newsletter.title;
    if (desc) desc.textContent = S.newsletter.desc;
    if (input) input.placeholder = S.newsletter.placeholder;

    const form = document.getElementById('newsletter-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const status = document.getElementById('news-status');
        status.textContent = 'Verifying with the archive...';
        setTimeout(() => {
          status.textContent = 'Welcome to the inner circle of UNTOLDsuri.';
          form.reset();
        }, 1500);
      });
    }
  }

  function renderContact() {
    const body = document.getElementById('contact-body');
    const link = document.getElementById('contact-email-link');
    if (body) body.innerHTML = S.contact.body.map(p => `<p class="contact-body reveal">${esc(p)}</p>`).join('');
    if (link) {
      link.href = `mailto:${esc(S.links.email)}`;
      link.querySelector('.contact-email-text').textContent = S.links.email;
    }
  }

  function renderFooter() {
    const brand = document.getElementById('footer-brand');
    const tagline = document.getElementById('footer-tagline');
    const nav = document.getElementById('footer-nav');
    const socials = document.getElementById('footer-socials');
    const quote = document.getElementById('footer-quote');
    const copy = document.getElementById('footer-copy');
    const dev = document.getElementById('footer-dev');

    if (brand) brand.innerHTML = esc(S.brand.name || 'UNTOLDsuri').replace('suri', '<span>suri</span>');
    if (tagline) tagline.textContent = S.brand.tagline || '';
    if (nav) {
      nav.innerHTML = (S.nav || []).map(n => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('');
    }
    if (socials && S.links) {
      socials.innerHTML = `
        <div class="footer-social-icons">
          <a href="${esc(S.links.youtube || '#')}" target="_blank" aria-label="YouTube">${ICONS.youtube}</a>
          <a href="${esc(S.links.instagram || '#')}" target="_blank" aria-label="Instagram">${ICONS.instagram}</a>
          <a href="${esc(S.links.facebook || '#')}" target="_blank" aria-label="Facebook">${ICONS.facebook}</a>
        </div>
        <a href="mailto:${esc(S.links.email || '')}" class="footer-email-link">${esc(S.links.email || '')}</a>
      `;
    }
    if (quote) quote.textContent = S.brand.footerQuote || '';
    if (copy) copy.textContent = `© ${S.brand.copyright || ''}`;
    if (dev && S.brand.developer) {
      dev.innerHTML = `Created with ❤️ by <a href="${esc(S.brand.developer.link)}" target="_blank">${esc(S.brand.developer.name)}</a>`;
    }
  }

  /* ══════════════════════════════════════════════════════════
     INTERACTIVE LOGIC
  ══════════════════════════════════════════════════════════ */

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function initScroll() {
    const progressBar = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');
    const bubbles = document.querySelectorAll('.hero-bubbles span, .bubble-bg');

    let lastScrollY = window.scrollY;
    let ticking = false;

    function update() {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / height) * 100;

      if (progressBar) progressBar.style.width = progress + '%';

      if (backToTop) {
        if (scrollY > 600) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
      }

      bubbles.forEach((b, i) => {
        const speed = (i + 1) * 0.08;
        b.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });

      // Smart Nav logic
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 120) current = section.getAttribute("id");
      });
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href").includes(current));
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function tick() {
      dx += (mx - dx) * 0.35; dy += (my - dy) * 0.35;
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      dot.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, .work-card, .platform-card, .gallery-card, .map-pin')) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, .work-card, .platform-card, .gallery-card, .map-pin')) document.body.classList.remove('cursor-hover');
    });
  }

  function initNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.addEventListener('click', e => {
      const toggle = e.target.closest('.nav-toggle');
      if (toggle) nav.querySelector('.nav-links').classList.toggle('open');
      if (e.target.closest('.nav-links a')) nav.querySelector('.nav-links').classList.remove('open');
    });
  }

  function boot() {
    renderNav(); renderHero(); renderAbout(); renderPlatforms(); renderWorks();
    renderGallery(); renderResearch(); renderMap(); renderTeam(); renderNewsletter();
    renderContact(); renderFooter();
    initNav(); initCursor(); initReveal(); initScroll();

    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);
      }, 500);
    });
  }

  boot();
})();
