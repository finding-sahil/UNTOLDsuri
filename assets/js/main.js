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
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>`,
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
    if (!nav || !S.nav) return;
    const currentLoc = window.location.pathname.split('/').pop() || 'index.html';
    const brand = `<a href="index.html" class="nav-brand">${esc(S.brand.name || 'UNTOLDsuri').replace('suri', '<span>suri</span>')}</a>`;
    const links = S.nav.map(n => {
      const isCurrent = currentLoc === n.href;
      return `<li><a href="${esc(n.href)}"${isCurrent ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`;
    }).join('');
    nav.innerHTML = `${brand}<ul class="nav-links">${links}</ul><button class="nav-toggle" aria-label="Toggle navigation menu"><span></span><span></span><span></span></button>`;
  }

  function renderHero() {
    const hero = document.getElementById('hero-inner');
    if (!hero) return;
    hero.innerHTML = `
      <img src="${esc(S.brand.logo)}" alt="UNTOLDsuri: Barak Valley History Archive Logo" class="hero-logo reveal" width="120" height="120" fetchpriority="high" />
      <h1 class="hero-title reveal">${esc(S.brand.name).replace('suri', '<span>suri</span>')}</h1>
      <div class="red-rule reveal"></div>
      <p class="hero-tagline reveal">${esc(S.brand.tagline)}</p>
      <p class="hero-sub reveal">${esc(S.brand.subtext)}</p>`;
  }

  function renderAbout() {
    const wrap = document.getElementById('about-body');
    if (!wrap || !S.about) return;
    wrap.classList.add('reveal');
    wrap.innerHTML = S.about.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`).join('');
  }

  function renderPlatforms() {
    const grid = document.getElementById('platform-grid');
    if (!grid || !S.platforms) return;
    grid.innerHTML = S.platforms.map(p => `
      <a href="${esc(p.href)}" target="_blank" class="platform-card reveal">
        <div class="platform-icon" aria-hidden="true">${ICONS[p.icon] || ''}</div>
        <div class="platform-info"><strong>${esc(p.name)}</strong><span>${esc(p.desc)}</span></div>
        <span class="platform-arrow" aria-hidden="true">↗</span>
      </a>`).join('');
  }

  function renderWorks() {
    const grid = document.getElementById('works-grid');
    if (!grid || !S.works) return;
    grid.innerHTML = S.works.map((w, i) => `
      <article class="work-card reveal" style="transition-delay: ${i * 0.1}s">
        <a href="${esc(w.url)}" target="_blank" class="work-thumbnail-link" aria-label="View ${esc(w.title)} on ${esc(w.platform)}">
          <img src="${esc(w.thumbnail)}" alt="${esc(w.alt || w.title)}" class="work-thumbnail" loading="lazy"/>
          <div class="play-overlay" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.8"/><polygon points="10,8 16,12 10,16" fill="white"/></svg></div>
        </a>
        <div class="work-meta">
          <span class="badge ${w.platform === 'youtube' ? 'badge-youtube' : 'badge-instagram'}">${esc(w.badge)}</span>
          <h3 class="work-title">${esc(w.title)}</h3>
          <p class="work-desc">${esc(w.desc)}</p>
        </div>
      </article>`).join('');
  }

  let currentLightboxIndex = 0;

  function renderGallery() {
    const scroller = document.getElementById('gallery-scroller');
    if (!scroller || !S.gallery) return;
    scroller.innerHTML = S.gallery.map((g, i) => {
      const rot = (Math.random() * 6 - 3).toFixed(1);
      return `
      <div class="gallery-card reveal" style="--rot: ${rot}deg" data-index="${i}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="View gallery image: ${esc(g.title)}">
        <img src="${esc(g.img)}" alt="${esc(g.alt || g.title)}" class="gallery-img" loading="lazy" width="300" height="300" />
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

    // Keyboard Navigation for Lightbox
    window.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        let newIdx = currentLightboxIndex - 1;
        if (newIdx < 0) newIdx = S.gallery.length - 1;
        updateLightbox(newIdx);
      } else if (e.key === 'ArrowRight') {
        let newIdx = (currentLightboxIndex + 1) % S.gallery.length;
        updateLightbox(newIdx);
      }
    });
  }

  function renderResearch() {
    const t = document.getElementById('research-topics');
    const p = document.getElementById('research-places');
    const o = document.getElementById('research-ongoing');
    if (t && S.research?.topics) t.innerHTML = S.research.topics.map(li => `<li class="reveal">${esc(li)}</li>`).join('');
    if (p && S.research?.places) p.innerHTML = S.research.places.map(li => `<li class="reveal">${esc(li)}</li>`).join('');
    if (o && S.research?.ongoing) o.innerHTML = S.research.ongoing.map(item => `<li class="reveal"><span class="status-dot ${item.active ? '' : 'status-pending'}"></span> ${esc(item.label)}</li>`).join('');
  }

  function renderMap() {
    const title = document.getElementById('map-title');
    const desc = document.getElementById('map-desc');
    const canvas = document.getElementById('map-canvas');
    if (title) title.textContent = S.map?.title || '';
    if (desc) desc.textContent = S.map?.desc || '';
    if (canvas && S.map?.pins) {
      canvas.innerHTML = S.map.pins.map(pin => `
        <div class="map-pin" style="left: ${pin.x}; top: ${pin.y};">
          <div class="pin-label">${esc(pin.name)} • ${esc(pin.status)}</div>
        </div>`).join('');
    }
  }

  function renderAchievementsHero() {
    const container = document.getElementById('achievements-hero-container');
    if (!container || !S.achievementsHero) return;
    const h = S.achievementsHero;

    let buttonsHtml = '';
    if (h.buttons && h.buttons.length > 0) {
      buttonsHtml = `<div class="hero-actions reveal reveal-delay-3 active">` +
        h.buttons.map(b => `<a href="${esc(b.href)}" class="btn ${b.primary ? 'btn-primary' : 'btn-outline'}">${esc(b.label)}</a>`).join('') +
        `</div>`;
    }

    container.innerHTML = `
      <section class="achievements-hero-section">
        <div class="concentric-bg"></div>
        <div class="container hero-achievements-inner">
          <span class="hero-pre-title reveal reveal-delay-1 active">${esc(h.preTitle)}</span>
          <h1 class="hero-main-title reveal reveal-delay-2 active">
            ${esc(h.titleMain)} <span class="text-highlight">${esc(h.titleHighlight)}</span>
          </h1>
          <p class="hero-desc reveal reveal-delay-2 active">${esc(h.desc)}</p>
          ${buttonsHtml}
        </div>
      </section>
    `;
  }

  function renderAchievements() {
    const list = document.getElementById('achievements-list');
    if (!list || !S.achievements) return;
    list.innerHTML = S.achievements.map((a, i) => `
      <article class="achievement-card reveal" style="transition-delay: ${i * 0.15}s">
        <span class="achievement-year">${esc(a.year)}</span>
        <h3 class="achievement-title">${esc(a.title)}</h3>
        <span class="achievement-event" aria-label="Event context">${esc(a.event)}</span>
        <p class="achievement-desc">${esc(a.desc)}</p>
      </article>`).join('');
  }

  function renderTeam() {
    const grid = document.getElementById('team-grid');
    if (!grid || !S.team) return;
    const limit = grid.dataset.limit ? parseInt(grid.dataset.limit) : S.team.length;
    const teamToRender = S.team.slice(0, limit);
    grid.innerHTML = teamToRender.map((m, i) => {
      const isSlot = m.name?.toLowerCase().includes('archive') || m.role?.toLowerCase().includes('contributor');
      return `
      <div class="team-card reveal ${isSlot ? 'team-slot' : 'click-expand'}" data-index="${i}" style="transition-delay: ${i * 0.1}s" ${!isSlot ? 'tabindex="0" role="button" aria-haspopup="dialog" aria-label="View details for ' + esc(m.name) + '"' : ''}>
        <div class="team-avatar" aria-hidden="true">${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" width="64" height="64" loading="lazy" />` : (isSlot ? `<div class="slot-plus">+</div>` : ICONS.person)}</div>
        <div class="team-info">
          <strong class="team-name">${esc(m.name)}</strong>
          <span class="team-role">${esc(m.role)}</span>
          <p class="team-bio line-clamp">${esc(m.bio)}</p>
          ${isSlot ? '' : `
          <div class="team-socials">
            ${m.socials?.instagram && m.socials.instagram !== '#' ? `<a href="${esc(m.socials.instagram)}" target="_blank" class="team-social-link" aria-label="${esc(m.name)}'s Instagram" onclick="event.stopPropagation()">${ICONS.instagram}</a>` : ''}
            ${m.socials?.facebook && m.socials.facebook !== '#' ? `<a href="${esc(m.socials.facebook)}" target="_blank" class="team-social-link" aria-label="${esc(m.name)}'s Facebook" onclick="event.stopPropagation()">${ICONS.facebook}</a>` : ''}
            ${m.socials?.linkedin && m.socials.linkedin !== '#' ? `<a href="${esc(m.socials.linkedin)}" target="_blank" class="team-social-link" aria-label="${esc(m.name)}'s LinkedIn" onclick="event.stopPropagation()">${ICONS.linkedin}</a>` : ''}
          </div>`}
        </div>
      </div>`;
    }).join('');
  }

  function renderFAQ() {
    const wrap = document.getElementById('faq-list');
    if (!wrap || !S.faq) return;
    wrap.innerHTML = S.faq.map((item, i) => `
      <div class="faq-item reveal" style="transition-delay: ${i * 0.15}s">
        <button class="faq-question">${esc(item.q)} <span class="faq-icon" aria-hidden="true">+</span></button>
        <div class="faq-answer"><div class="faq-answer-inner">${esc(item.a)}</div></div>
      </div>`).join('');

    wrap.addEventListener('click', e => {
      const btn = e.target.closest('.faq-question');
      if (!btn) return;
      const item = btn.parentElement;
      const isOpen = item.classList.contains('active');

      // Close others
      wrap.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  }

  function initTeamModal() {
    // Add modal container if it doesn't exist
    if (!document.getElementById('team-modal')) {
      const modalHtml = `
          <div id="team-modal" class="lightbox team-modal" role="dialog" aria-modal="true" aria-label="Team member details">
            <button class="lightbox-close team-modal-close" aria-label="Close viewer">✕</button>
            <div class="team-modal-content glass-card">
              <div class="team-modal-avatar" id="tm-avatar"></div>
              <div class="team-modal-info">
                <h3 id="tm-name" class="team-modal-name"></h3>
                <span id="tm-role" class="team-modal-role"></span>
                <p id="tm-bio" class="team-modal-bio"></p>
                <div class="team-modal-socials" id="tm-socials"></div>
              </div>
            </div>
          </div>
        `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('team-modal');
    const closeBtn = modal.querySelector('.team-modal-close');

    document.getElementById('team-grid')?.addEventListener('click', e => {
      const card = e.target.closest('.team-card');
      if (!card) return;
      const index = card.dataset.index;
      const m = S.team[index];
      if (!m) return;

      document.getElementById('tm-avatar').innerHTML = m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" />` : ICONS.person;
      document.getElementById('tm-name').innerHTML = esc(m.name);
      document.getElementById('tm-role').textContent = m.role;
      document.getElementById('tm-bio').textContent = m.bio;

      let socialHtml = '';
      if (m.socials) {
        if (m.socials.instagram && m.socials.instagram !== '#') socialHtml += `<a href="${esc(m.socials.instagram)}" target="_blank" class="team-social-link" aria-label="Instagram">${ICONS.instagram}</a>`;
        if (m.socials.facebook && m.socials.facebook !== '#') socialHtml += `<a href="${esc(m.socials.facebook)}" target="_blank" class="team-social-link" aria-label="Facebook">${ICONS.facebook}</a>`;
        if (m.socials.linkedin && m.socials.linkedin !== '#') socialHtml += `<a href="${esc(m.socials.linkedin)}" target="_blank" class="team-social-link" aria-label="LinkedIn">${ICONS.linkedin}</a>`;
      }
      document.getElementById('tm-socials').innerHTML = socialHtml;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeBtn?.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', e => {
      if (!e.target.closest('.team-modal-content')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Keyboard listener for team modal
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  function renderNewsletter() {
    const title = document.getElementById('news-title');
    const desc = document.getElementById('news-desc');
    if (title) title.textContent = S.newsletter?.title || '';
    if (desc) desc.textContent = S.newsletter?.desc || '';

    const form = document.getElementById('newsletter-form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const status = document.getElementById('news-status');

        // Populate Automatic Metadata
        const deviceInput = document.getElementById('meta-device');
        const langInput = document.getElementById('meta-lang');
        const refInput = document.getElementById('meta-ref');

        if (deviceInput) deviceInput.value = window.innerWidth <= 768 ? 'Mobile' : 'Desktop';
        if (langInput) langInput.value = navigator.language || 'Unknown';
        if (refInput) refInput.value = window.location.href;

        const data = new FormData(form);

        status.textContent = 'Transmitting to the archive...';
        status.style.opacity = '1';

        try {
          await fetch(form.action, {
            method: 'POST',
            body: data,
            mode: 'no-cors'
          });

          status.textContent = 'Message received. We will be in touch.';
          form.reset();
        } catch (error) {
          status.textContent = 'Connection to the archive failed. Please try again later.';
        }
      });
    }
  }

  function renderContact() {
    const body = document.getElementById('contact-body');
    const link = document.getElementById('contact-email-link');
    if (body && S.contact?.body) body.innerHTML = S.contact.body.map(p => `<p class="contact-body reveal">${esc(p)}</p>`).join('');
    if (link && S.links?.email) {
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

    if (brand) brand.innerHTML = esc(S.brand?.name || 'UNTOLDsuri').replace('suri', '<span>suri</span>');
    if (tagline) tagline.textContent = S.brand?.tagline || '';
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
    if (quote) quote.textContent = S.brand?.footerQuote || '';
    if (copy) copy.textContent = `© ${S.brand?.copyright || ''}`;
    if (dev && S.brand?.credits) {
      const creditsHtml = S.brand.credits.map(c => `<a href="${esc(c.link)}" target="_blank">${esc(c.name)}</a>`).join(' & ');
      dev.innerHTML = `Created with ❤️ by ${creditsHtml}`;
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
      let currentLoc = window.location.pathname.split('/').pop() || 'index.html';
      let currentSection = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 120) currentSection = section.getAttribute("id");
      });
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        let isActive = false;
        if (currentLoc === href) {
          isActive = true; // Subpage match
        } else if (currentLoc === 'index.html' && href.includes(currentSection) && currentSection !== "") {
          isActive = true; // Same-page scroll match
        }
        link.classList.toggle("active", isActive);
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
    if (!window.matchMedia("(pointer: fine)").matches) return; // Only for fine pointers (desktops)

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.style.opacity !== '1') {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    });
    document.body.classList.add('has-custom-cursor');
    function tick() {
      dx += (mx - dx) * 0.35; dy += (my - dy) * 0.35;
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      dot.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, .work-card, .platform-card, .gallery-card, .map-pin, .click-expand')) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, .work-card, .platform-card, .gallery-card, .map-pin, .click-expand')) document.body.classList.remove('cursor-hover');
    });

    // Ensure the cursor-dot and cursor-ring are visible initially if JS is running
    dot.style.opacity = '0';
    ring.style.opacity = '0';
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
    // Phase 1: Critical UI (Above the fold)
    renderNav();
    renderHero();
    initNav();
    initCursor();

    // Phase 2: Deferred UI (Below the fold)
    const deferred = () => {
      renderAbout(); renderPlatforms(); renderWorks();
      renderGallery(); renderResearch(); renderMap(); renderAchievementsHero(); renderAchievements(); renderTeam(); renderFAQ(); renderNewsletter();
      renderContact(); renderFooter();
      initReveal();
      initScroll();
      initTeamModal();
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(deferred);
    } else {
      setTimeout(deferred, 32);
    }

    // Dynamic Loader Removal
    const loader = document.getElementById('loader');
    if (loader) {
      const startTime = Date.now();
      const minDelay = 800; // Minimum time to show loader for cinematic effect
      const maxTimeout = 3000; // Safety timeout

      const hideLoader = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const remaining = Math.max(0, minDelay - elapsed);

        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 800);
        }, remaining);
      };

      // Remove bar on subpages immediately for faster feel
      const isHome = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html') || window.location.pathname === "";
      if (!isHome) {
        const loaderBar = loader.querySelector('.loader-bar');
        if (loaderBar) loaderBar.style.display = 'none';
      }

      window.addEventListener('load', hideLoader);
      // Safety fallback
      setTimeout(() => {
        if (loader.style.display !== 'none' && loader.style.opacity !== '0') {
          hideLoader();
        }
      }, maxTimeout);
    }
  }

  boot();
})();
