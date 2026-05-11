(function(){
  const cfg = window.SITE_CONFIG || {};
  const number = cfg.whatsappNumber || '56976052356';
  const fallback = 'Hola Joseph, quiero evaluar un proyecto de arquitectura.';
  function waUrl(msg){ return 'https://wa.me/' + number + '?text=' + encodeURIComponent(msg || fallback); }

  document.querySelectorAll('.js-wa').forEach(el => {
    const msg = el.dataset.wa || fallback;
    if (el.tagName === 'A') {
      el.setAttribute('href', waUrl(msg));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    }
    el.setAttribute('role', 'link');
    el.addEventListener('click', e => {
      if (el.tagName !== 'A') {
        e.preventDefault();
        window.open(waUrl(msg), '_blank', 'noopener');
      }
    });
  });



  // Mantiene abierto el mega menú por un instante al mover el mouse hacia el panel.
  // Evita que desaparezca antes de alcanzar los links internos.
  document.querySelectorAll('.mega-wrap').forEach(wrap => {
    let closeTimer;
    const open = () => {
      window.clearTimeout(closeTimer);
      wrap.classList.add('is-open');
    };
    const close = () => {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => wrap.classList.remove('is-open'), 320);
    };
    wrap.addEventListener('mouseenter', open);
    wrap.addEventListener('mouseleave', close);
    wrap.addEventListener('focusin', open);
    wrap.addEventListener('focusout', close);
  });

  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.faq-item button').forEach(b =>
    b.addEventListener('click', () => b.closest('.faq-item').classList.toggle('open'))
  );

  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('at-top', window.scrollY < 16);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const form = document.querySelector('.form-card');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const msg = `Hola Joseph, quiero evaluar un proyecto.\nNombre: ${fd.get('nombre') || ''}\nTeléfono: ${fd.get('telefono') || ''}\nComuna: ${fd.get('comuna') || ''}\nTipo: ${fd.get('tipo') || ''}\nMensaje: ${fd.get('mensaje') || ''}`;
      window.open(waUrl(msg), '_blank', 'noopener');
    });
  }
})();
