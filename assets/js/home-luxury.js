document.documentElement.classList.add('js');

const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
}

// Editorial intent index: one large image changes as the user explores each real problem.
const intentItems = [...document.querySelectorAll('[data-intent-image]')];
const intentPreview = document.querySelector('[data-intent-preview]');
if (intentItems.length && intentPreview) {
  const setIntent = item => {
    intentItems.forEach(node => node.classList.toggle('is-active', node === item));
    const nextSrc = item.dataset.intentImage;
    const nextAlt = item.dataset.intentAlt || '';
    if (!nextSrc || intentPreview.getAttribute('src') === nextSrc) return;
    const wrapper = intentPreview.closest('.intent-visual');
    wrapper?.classList.add('is-switching');
    const preload = new Image();
    preload.onload = () => {
      intentPreview.src = nextSrc;
      intentPreview.alt = nextAlt;
      requestAnimationFrame(() => wrapper?.classList.remove('is-switching'));
    };
    preload.src = nextSrc;
  };
  intentItems.forEach(item => {
    item.addEventListener('mouseenter', () => setIntent(item));
    item.addEventListener('focusin', () => setIntent(item));
    item.addEventListener('click', () => setIntent(item));
  });
}

// Case filters remain text-only and understated.
const filterButtons = [...document.querySelectorAll('[data-project-filter]')];
const projectCards = [...document.querySelectorAll('[data-project-category]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.projectFilter;
  filterButtons.forEach(btn => btn.classList.toggle('is-active', btn === button));
  projectCards.forEach(card => {
    card.hidden = filter !== 'todos' && card.dataset.projectCategory !== filter;
  });
}));

// Minimal FAQ accordion.
document.querySelectorAll('[data-faq-button]').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    const sign = button.querySelector('[data-faq-sign]');
    if (sign) sign.textContent = open ? '−' : '+';
  });
});

// Preview-safe form: the production backend is not present in the GitHub snapshot.
// On the branch preview we preserve the form and route the user to the live contact page.
const form = document.querySelector('[data-consulta-form]');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    window.location.href = 'https://joseph.cl/contacto/';
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) {
  try {
    const { animate, inView } = await import('https://cdn.jsdelivr.net/npm/motion@12.43.0/+esm');
    document.querySelectorAll('.reveal').forEach(el => {
      inView(el, element => {
        element.classList.add('is-visible');
        animate(element, { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0px)'] }, { duration: .62, easing: [.22, 1, .36, 1] });
      }, { amount: .12, margin: '0px 0px -5% 0px' });
    });
    const heroImage = document.querySelector('.hero-media img');
    if (heroImage) {
      animate(heroImage, { transform: ['scale(1.018)', 'scale(1.006)'] }, { duration: 1.1, easing: [.22, 1, .36, 1] });
    }
  } catch (error) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}
