document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let motionApi = null;

/* ---------- Navigation ---------- */
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
if (menuButton && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

/* ---------- Drawing rail ---------- */
const rail = document.createElement('div');
rail.className = 'art-rail';
rail.setAttribute('aria-hidden', 'true');
rail.innerHTML = '<span class="art-rail-progress"></span><span class="art-rail-dot"></span>';
document.body.appendChild(rail);
const railProgress = rail.querySelector('.art-rail-progress');
const railDot = rail.querySelector('.art-rail-dot');

/* ---------- Intent image plate ---------- */
const intentItems = [...document.querySelectorAll('[data-intent-image]')];
const intentPreview = document.querySelector('[data-intent-preview]');
let intentBusy = false;

async function setIntent(item) {
  if (!intentPreview || intentBusy) return;
  intentItems.forEach(node => node.classList.toggle('is-active', node === item));
  const nextSrc = item.dataset.intentImage;
  const nextAlt = item.dataset.intentAlt || '';
  if (!nextSrc || intentPreview.getAttribute('src') === nextSrc) return;

  intentBusy = true;
  const preload = new Image();
  preload.src = nextSrc;
  await preload.decode().catch(() => null);

  if (motionApi && !reducedMotion) {
    const { animate } = motionApi;
    await animate(intentPreview, { opacity: [1, 0], transform: ['scale(1)', 'scale(.985)'] }, { duration: .16, easing: 'ease-in' }).finished;
    intentPreview.src = nextSrc;
    intentPreview.alt = nextAlt;
    animate(intentPreview, { opacity: [0, 1], transform: ['scale(1.018)', 'scale(1)'] }, { duration: .42, easing: [.22, 1, .36, 1] });
  } else {
    intentPreview.src = nextSrc;
    intentPreview.alt = nextAlt;
  }
  intentBusy = false;
}

intentItems.forEach(item => {
  item.addEventListener('mouseenter', () => setIntent(item));
  item.addEventListener('focusin', () => setIntent(item));
  item.addEventListener('click', () => setIntent(item));
});

/* ---------- Project filters ---------- */
const filterButtons = [...document.querySelectorAll('[data-project-filter]')];
const projectCards = [...document.querySelectorAll('[data-project-category]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.projectFilter;
  filterButtons.forEach(btn => btn.classList.toggle('is-active', btn === button));
  projectCards.forEach(card => {
    const show = filter === 'todos' || card.dataset.projectCategory === filter;
    card.hidden = !show;
    if (show && motionApi && !reducedMotion) {
      motionApi.animate(card, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0px)'] }, { duration: .38, easing: [.22, 1, .36, 1] });
    }
  });
}));

/* ---------- FAQ ---------- */
document.querySelectorAll('[data-faq-button]').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item?.querySelector('.faq-answer');
    const open = item?.classList.toggle('open');
    button.setAttribute('aria-expanded', String(Boolean(open)));
    const sign = button.querySelector('[data-faq-sign]');
    if (sign) sign.textContent = open ? '−' : '+';
    if (answer && open && motionApi && !reducedMotion) {
      motionApi.animate(answer, { opacity: [0, 1], transform: ['translateY(-7px)', 'translateY(0px)'] }, { duration: .24, easing: [.22, 1, .36, 1] });
    }
  });
});

/* ---------- Preview-safe form ---------- */
const form = document.querySelector('[data-consulta-form]');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    window.location.href = 'https://joseph.cl/contacto/';
  });
}

/* ---------- Motion choreography ---------- */
async function initMotion() {
  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = '1'; });
    rail.remove();
    return;
  }

  try {
    motionApi = await import('https://cdn.jsdelivr.net/npm/motion@12.43.0/+esm');
    const { animate, inView, scroll, stagger } = motionApi;

    // Opening: a calm editorial sequence, not a splash animation.
    const heroPieces = document.querySelectorAll('.hero-copy > .eyebrow, .hero-copy > h1, .hero-lede, .hero-context, .hero-actions, .hero-trust');
    animate(heroPieces, { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0px)'] }, {
      duration: .58,
      delay: stagger(.055),
      easing: [.22, 1, .36, 1]
    });

    const heroMedia = document.querySelector('.hero-media');
    if (heroMedia) {
      animate(heroMedia, {
        clipPath: [
          'polygon(18% 0,100% 0,100% 100%,0 100%,0 24%)',
          'polygon(5% 0,100% 0,100% 100%,0 100%,0 11%)'
        ]
      }, { duration: .95, easing: [.22, 1, .36, 1] });
    }

    // Scroll progress rail — Motion callback uses 0..1 progress.
    scroll(progress => {
      if (!railProgress || !railDot) return;
      railProgress.style.transform = `scaleY(${progress})`;
      railDot.style.transform = `translateY(calc(${progress} * 60vh - 4px))`;
    });

    // Editorial reveals. Each element moves very little; hierarchy comes from timing.
    document.querySelectorAll('.reveal').forEach((el, index) => {
      inView(el, element => {
        animate(element, {
          opacity: [0, 1],
          transform: ['translateY(16px)', 'translateY(0px)']
        }, {
          duration: .52,
          delay: Math.min(index % 3, 2) * .035,
          easing: [.22, 1, .36, 1]
        });
      }, { amount: .12, margin: '0px 0px -6% 0px' });
    });

    // Process rows behave like a drawing being resolved line by line.
    document.querySelectorAll('.process-row').forEach(row => {
      inView(row, element => {
        element.classList.add('is-active');
        animate(element, { opacity: [0.55, 1], transform: ['translateX(-8px)', 'translateX(0px)'] }, { duration: .38, easing: [.22, 1, .36, 1] });
      }, { amount: .45 });
    });

    // Subtle parallax stays image-only and never shifts copy.
    if (window.innerWidth > 820) {
      const heroImage = document.querySelector('.hero-media img');
      if (heroImage) {
        const heroParallax = animate(heroImage, {
          transform: ['scale(1.05) translateY(-1.6%)', 'scale(1.05) translateY(1.6%)']
        }, { easing: 'linear' });
        scroll(heroParallax, { target: document.querySelector('.hero'), offset: ['start start', 'end start'] });
      }

      document.querySelectorAll('.project-card').forEach(card => {
        const image = card.querySelector('.project-media img');
        if (!image) return;
        const parallax = animate(image, {
          transform: ['scale(1.045) translateY(-1.8%)', 'scale(1.045) translateY(1.8%)']
        }, { easing: 'linear' });
        scroll(parallax, { target: card, offset: ['start end', 'end start'] });
      });
    }
  } catch (error) {
    console.warn('Motion unavailable; Art20 remains fully usable without animation.', error);
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = '1'; });
    rail.remove();
  }
}

initMotion();
