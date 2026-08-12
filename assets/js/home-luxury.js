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

/* ---------- Spatial hero DOM ---------- */
const hero = document.querySelector('.hero');
const heroMedia = document.querySelector('.hero-media');
const heroMainImage = heroMedia?.querySelector(':scope > img');
let spatialDetailA = null;
let spatialDetailB = null;
let spatialSheet = null;
let spatialOrbit = null;

if (heroMedia && heroMainImage) {
  const makePlane = className => {
    const plane = document.createElement('div');
    plane.className = `spatial-plane ${className}`;
    plane.setAttribute('aria-hidden', 'true');
    const clone = heroMainImage.cloneNode(false);
    clone.removeAttribute('fetchpriority');
    clone.setAttribute('loading', 'eager');
    clone.alt = '';
    plane.appendChild(clone);
    heroMedia.appendChild(plane);
    return plane;
  };

  spatialDetailA = makePlane('spatial-plane--detail-a');
  spatialDetailB = makePlane('spatial-plane--detail-b');

  spatialSheet = document.createElement('div');
  spatialSheet.className = 'spatial-sheet';
  spatialSheet.setAttribute('aria-hidden', 'true');
  spatialSheet.innerHTML = '<strong>Consulta inicial</strong><span>Confidencial · 30 minutos</span><span>Sin compromiso</span>';
  heroMedia.appendChild(spatialSheet);

  spatialOrbit = document.createElement('div');
  spatialOrbit.className = 'spatial-orbit';
  spatialOrbit.setAttribute('aria-hidden', 'true');
  heroMedia.appendChild(spatialOrbit);

  const axis = document.createElement('div');
  axis.className = 'spatial-axis';
  axis.setAttribute('aria-hidden', 'true');
  heroMedia.appendChild(axis);

  const cue = document.createElement('div');
  cue.className = 'spatial-scroll-cue';
  cue.setAttribute('aria-hidden', 'true');
  cue.textContent = 'Scroll para ordenar la escena';
  heroMedia.appendChild(cue);

  // Move only the camera, not content. This adds a subtle pointer-based 3D response
  // without fighting the scroll-linked transforms on individual planes.
  if (window.matchMedia('(pointer:fine)').matches && !reducedMotion) {
    heroMedia.addEventListener('pointermove', event => {
      const rect = heroMedia.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      heroMedia.style.perspectiveOrigin = `${48 + px * 12}% ${42 + py * 8}%`;
    });
    heroMedia.addEventListener('pointerleave', () => {
      heroMedia.style.perspectiveOrigin = '48% 42%';
    });
  }
}

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
    await animate(intentPreview, {
      opacity: [1, 0],
      scale: [1, .985],
      rotateY: [0, -3],
      z: [0, -35]
    }, { duration: .16, easing: 'ease-in' }).finished;
    intentPreview.src = nextSrc;
    intentPreview.alt = nextAlt;
    animate(intentPreview, {
      opacity: [0, 1],
      scale: [1.025, 1],
      rotateY: [4, 0],
      z: [-45, 0]
    }, { duration: .46, easing: [.22, 1, .36, 1] });
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
      motionApi.animate(card, {
        opacity: [0, 1],
        y: [18, 0],
        rotateX: [2, 0],
        z: [-35, 0]
      }, { duration: .42, easing: [.22, 1, .36, 1] });
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
      motionApi.animate(answer, { opacity: [0, 1], y: [-7, 0] }, { duration: .24, easing: [.22, 1, .36, 1] });
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

    /* Opening: the drawing table assembles in depth. */
    const heroPieces = document.querySelectorAll('.hero-copy > .eyebrow, .hero-copy > h1, .hero-lede, .hero-context, .hero-actions, .hero-trust');
    animate(heroPieces, { opacity: [0, 1], y: [18, 0] }, {
      duration: .58,
      delay: stagger(.055),
      easing: [.22, 1, .36, 1]
    });

    if (heroMainImage && window.innerWidth > 820) {
      animate(heroMainImage, {
        opacity: [0, 1],
        rotateY: [-8, -6],
        rotateX: [3.5, 2.5],
        z: [-150, -120],
        x: [55, 34],
        scale: [1.095, 1.07]
      }, { duration: .9, easing: [.22, 1, .36, 1] });
    }
    if (spatialDetailA) animate(spatialDetailA, { opacity: [0, 1], x: [95, 68], y: [-65, -46], rotateY: [-22, -17], z: [230, 195] }, { duration: .92, delay: .12, easing: [.22, 1, .36, 1] });
    if (spatialDetailB) animate(spatialDetailB, { opacity: [0, 1], x: [-75, -52], y: [55, 38], rotateY: [17, 13], z: [165, 140] }, { duration: .92, delay: .18, easing: [.22, 1, .36, 1] });
    if (spatialSheet) animate(spatialSheet, { opacity: [0, 1], x: [70, 46], y: [42, 28], rotateY: [-16, -12], rotateX: [7, 5], z: [285, 245] }, { duration: .88, delay: .24, easing: [.22, 1, .36, 1] });

    /* Scroll-linked 3D assembly: exploded model -> resolved architectural image. */
    if (hero && window.innerWidth > 820) {
      if (heroMainImage) {
        scroll(animate(heroMainImage, {
          rotateY: [-6, 0],
          rotateX: [2.5, 0],
          z: [-120, 0],
          x: [34, 0],
          scale: [1.07, 1]
        }, { easing: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      }
      if (spatialDetailA) {
        scroll(animate(spatialDetailA, {
          x: [68, 0], y: [-46, 0], rotateY: [-17, -1.5], rotateX: [3, 0], z: [195, 24]
        }, { easing: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      }
      if (spatialDetailB) {
        scroll(animate(spatialDetailB, {
          x: [-52, 0], y: [38, 0], rotateY: [13, 1], rotateX: [-3, 0], z: [140, 12]
        }, { easing: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      }
      if (spatialSheet) {
        scroll(animate(spatialSheet, {
          x: [46, 0], y: [28, 0], rotateY: [-12, 0], rotateX: [5, 0], z: [245, 42]
        }, { easing: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      }
      if (spatialOrbit) {
        scroll(animate(spatialOrbit, { rotateZ: [-12, 18], opacity: [.8, .2], scale: [1, 1.12] }, { easing: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      }
      const heroCopy = document.querySelector('.hero-copy');
      if (heroCopy) {
        scroll(animate(heroCopy, { y: [0, -22], opacity: [1, .82] }, { easing: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      }
    }

    /* Scroll progress rail. */
    scroll(progress => {
      if (!railProgress || !railDot) return;
      railProgress.style.transform = `scaleY(${progress})`;
      railDot.style.transform = `translateY(calc(${progress} * 60vh - 4px))`;
    });

    /* Editorial reveals. */
    document.querySelectorAll('.reveal').forEach((el, index) => {
      inView(el, element => {
        animate(element, { opacity: [0, 1], y: [16, 0] }, {
          duration: .52,
          delay: Math.min(index % 3, 2) * .035,
          easing: [.22, 1, .36, 1]
        });
      }, { amount: .12, margin: '0px 0px -6% 0px' });
    });

    /* Process becomes a scroll chapter: the active decision plane comes forward in z. */
    const processSection = document.querySelector('.process-section');
    const processRows = [...document.querySelectorAll('.process-row')];
    if (processSection && processRows.length && window.innerWidth > 820) {
      let activeIndex = -1;
      processRows.forEach((row, index) => {
        animate(row, { opacity: index === 0 ? 1 : .42, z: index === 0 ? 62 : -46, scale: index === 0 ? 1 : .985, rotateY: index % 2 ? -1.2 : 1.2 }, { duration: .01 });
      });

      scroll(progress => {
        const nextIndex = Math.min(processRows.length - 1, Math.floor(progress * processRows.length));
        if (nextIndex === activeIndex) return;
        activeIndex = nextIndex;
        processRows.forEach((row, index) => {
          const active = index === activeIndex;
          row.classList.toggle('is-resolved', active);
          animate(row, {
            opacity: active ? 1 : .4,
            z: active ? 68 : -48,
            scale: active ? 1 : .982,
            rotateY: active ? 0 : (index % 2 ? -1.3 : 1.3)
          }, { duration: .38, easing: [.22, 1, .36, 1] });
        });
      }, { target: processSection, offset: ['start start', 'end end'] });
    } else {
      processRows.forEach(row => {
        inView(row, element => {
          element.classList.add('is-resolved');
          animate(element, { opacity: [0.55, 1], x: [-8, 0] }, { duration: .38, easing: [.22, 1, .36, 1] });
        }, { amount: .45 });
      });
    }

    /* Intent plate keeps depth while its image changes. */
    const intentVisual = document.querySelector('.intent-visual');
    if (intentVisual && intentPreview && window.innerWidth > 820) {
      scroll(animate(intentPreview, { rotateY: [-2.5, 1.5], z: [-28, 34], y: [16, -14] }, { easing: 'linear' }), { target: intentVisual, offset: ['start end', 'end start'] });
    }

    /* Criteria photos live on slightly different planes; copy itself stays still. */
    document.querySelectorAll('.criteria-media figure').forEach((figure, index) => {
      if (window.innerWidth <= 820) return;
      scroll(animate(figure, {
        y: [index === 0 ? 12 : 28, index === 0 ? -12 : -20],
        z: [index === 0 ? -30 : 34, index === 0 ? 0 : 70],
        rotateY: [index === 0 ? -1 : 2.2, index === 0 ? .5 : -1.2]
      }, { easing: 'linear' }), { target: figure, offset: ['start end', 'end start'] });
    });

    /* Projects enter like physical boards on a review table. */
    if (window.innerWidth > 820) {
      document.querySelectorAll('.project-card').forEach((card, index) => {
        scroll(animate(card, {
          rotateY: [index % 2 ? -3.2 : 3.2, index % 2 ? 1.4 : -1.4],
          rotateX: [1.4, -.8],
          z: [-90, 54],
          y: [28, -18]
        }, { easing: 'linear' }), { target: card, offset: ['start end', 'end start'] });
      });
    }
  } catch (error) {
    console.warn('Motion unavailable; Spatial Story remains fully usable without animation.', error);
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = '1'; });
    rail.remove();
  }
}

initMotion();
