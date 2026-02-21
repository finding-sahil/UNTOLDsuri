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
    youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="3"/><polygon points="10,9 16,12 10,15" fill="currentColor"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
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
      <img src="${esc(S.brand.logo)}" alt="logo" class="hero-logo reveal"/>
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

  function renderGallery() {
    const scroller = document.getElementById('gallery-scroller');
    if (!scroller) return;
    scroller.innerHTML = S.gallery.map((g, i) => {
      const rot = (Math.random() * 6 - 3).toFixed(1); // Random rotation -3 to 3deg
      return `
      <div class="gallery-card reveal" style="--rot: ${rot}deg" data-index="${i}">
        <img src="${esc(g.img)}" alt="${esc(g.title)}" class="gallery-img" loading="lazy"/>
        <div class="gallery-info">
          <h3>${esc(g.title)}</h3>
        </div>
      </div>`;
    }).join('');

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');

    scroller.addEventListener('click', e => {
      const card = e.target.closest('.gallery-card');
      if (!card) return;
      const idx = card.dataset.index;
      const item = S.gallery[idx];

      lbImg.src = item.img;
      lbCap.innerHTML = `<h3>${esc(item.title)}</h3><p>${esc(item.desc)}</p>`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scroll
    });

    lightbox.addEventListener('click', () => {
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
        <div class="team-avatar">${m.photo ? `<img src="${esc(m.photo)}" alt="photo"/>` : ICONS.person}</div>
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

    if (brand) brand.innerHTML = esc(S.brand.name).replace('suri', '<span>suri</span>');
    if (tagline) tagline.textContent = S.brand.tagline;
    if (nav) {
      nav.innerHTML = S.nav.map(n => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`).join('');
    }
    if (socials) {
      socials.innerHTML = `
        <a href="${esc(S.links.youtube)}" target="_blank" aria-label="YouTube">${ICONS.youtube}</a>
        <a href="${esc(S.links.instagram)}" target="_blank" aria-label="Instagram">${ICONS.instagram}</a>
        <a href="${esc(S.links.facebook)}" target="_blank" aria-label="Facebook">${ICONS.facebook}</a>
      `;
    }
    if (quote) quote.textContent = S.brand.footerQuote;
    if (copy) copy.textContent = `© ${S.brand.copyright}`;
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

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / height) * 100;

      // Progress bar
      if (progressBar) progressBar.style.width = progress + '%';

      // Back to top
      if (backToTop) {
        if (scrollY > 600) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
      }

      // Parallax Orbs
      bubbles.forEach((b, i) => {
        const speed = (i + 1) * 0.1;
        b.style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Smart Nav
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
          current = section.getAttribute("id");
        }
      });
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });

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
      dx += (mx - dx) * 1; dy += (my - dy) * 1;
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(tick);
    }
    tick();
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, .work-card, .platform-card')) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, .work-card, .platform-card')) document.body.classList.remove('cursor-hover');
    });
  }

  function initNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.addEventListener('click', e => {
      const toggle = e.target.closest('.nav-toggle');
      if (toggle) {
        nav.querySelector('.nav-links').classList.toggle('open');
      }
      if (e.target.closest('.nav-links a')) {
        nav.querySelector('.nav-links').classList.remove('open');
      }
    });
  }

  function boot() {
    renderNav(); renderHero(); renderAbout(); renderPlatforms(); renderWorks();
    renderGallery(); renderResearch(); renderMap(); renderTeam(); renderNewsletter();
    renderContact(); renderFooter();
    initNav(); initCursor(); initReveal(); initScroll();

    // Loader fadeout
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
