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



  // Tracking liviano para CTAs de consulta gratuita
  document.querySelectorAll('[data-event]').forEach(el => {
    el.addEventListener('click', () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: el.dataset.event,
        page: el.dataset.page || document.body.dataset.page || 'unknown',
        service: el.dataset.service || 'general'
      });
    });
  });

  // Formulario integrado del home: abre WhatsApp con el caso prearmado para coordinar agenda
  document.querySelectorAll('form[data-form="consulta-gratis"]').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(f);
      const msg = `Hola Joseph, quiero agendar una consulta inicial gratuita.\n\nNombre: ${fd.get('nombre') || ''}\nEmail: ${fd.get('email') || ''}\nTeléfono: ${fd.get('telefono') || ''}\nComuna: ${fd.get('comuna') || ''}\nTipo de caso: ${fd.get('tipo') || ''}\nPropiedad/local/terreno: ${fd.get('propiedad') || ''}\nQué quiero lograr: ${fd.get('mensaje') || ''}\nLink documentos: ${fd.get('link') || ''}`;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'form_llamada_submit', page: 'home', service: fd.get('tipo') || 'general' });
      window.open(waUrl(msg), '_blank', 'noopener');
    });
  });

  const form = document.querySelector('.form-card:not([data-form]):not([data-lead-form])');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const msg = `Hola Joseph, quiero evaluar un proyecto.\nNombre: ${fd.get('nombre') || ''}\nTeléfono: ${fd.get('telefono') || ''}\nComuna: ${fd.get('comuna') || ''}\nTipo: ${fd.get('tipo') || ''}\nMensaje: ${fd.get('mensaje') || ''}`;
      window.open(waUrl(msg), '_blank', 'noopener');
    });
  }
})();


(function(){
  function submitLeadForm(form){
    var cfg=window.SITE_CONFIG||{};
    var endpoint=(cfg.googleSheetsWebAppUrl||'').trim();
    var thankYou=cfg.thankYouUrl||'/gracias/';
    var fd=new FormData(form);
    var params=new URLSearchParams(window.location.search);
    var payload={};
    fd.forEach(function(v,k){ payload[k]=v; });
    payload.nombre=payload.nombre||'';
    payload.email=payload.email||'';
    payload.telefono=payload.telefono||'';
    payload.comuna=payload.comuna||'';
    payload.tipoProyecto=payload.tipo||payload.tipoProyecto||params.get('tipo')||'';
    payload.mensaje=payload.mensaje||'';
    payload.pageUrl=window.location.href;
    payload.utmSource=params.get('utm_source')||'';
    payload.utmMedium=params.get('utm_medium')||'';
    payload.utmCampaign=params.get('utm_campaign')||'';
    payload.userAgent=navigator.userAgent||'';
    payload.referrer=document.referrer||'';
    payload.source=payload.source||form.dataset.source||'site-contact-form';
    payload.submittedAt=new Date().toISOString();
    try{localStorage.setItem('joseph_consulta_ultimo_envio',JSON.stringify({createdAt:new Date().toISOString(),data:payload}));}catch(err){}
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:'form_consulta_submit',page:document.body.dataset.page||location.pathname,section:'contacto',tipo:payload.tipoProyecto||''});
    var btn=form.querySelector('button[type="submit"]');
    var err=form.querySelector('.muse-form-error');
    if(err) err.hidden=true;
    if(btn){btn.disabled=true;btn.dataset.originalText=btn.textContent;btn.textContent='Enviando consulta…';}
    var redirected=false;
    function go(){
      if(redirected) return; redirected=true;
      var q='?tipo='+encodeURIComponent(payload.tipoProyecto||'consulta')+'&nombre='+encodeURIComponent(payload.nombre||'');
      window.location.href=thankYou+q;
    }
    if(endpoint && endpoint.indexOf('script.google.com')!==-1){
      var body=JSON.stringify(payload), sent=false;
      if(navigator.sendBeacon){try{sent=navigator.sendBeacon(endpoint,new Blob([body],{type:'text/plain;charset=UTF-8'}));}catch(e){sent=false;}}
      if(btn) btn.textContent='Listo, redirigiendo…';
      if(sent){setTimeout(go,220);} else {
        var timeout=setTimeout(go,900);
        fetch(endpoint,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain;charset=utf-8'},body:body}).then(function(){clearTimeout(timeout);go();}).catch(function(){clearTimeout(timeout);go();});
      }
    }else{go();}
  }
  document.querySelectorAll('form[data-lead-form="true"]').forEach(function(form){
    var params=new URLSearchParams(window.location.search);
    var tipo=params.get('tipo');
    if(tipo){
      var sel=form.querySelector('select[name="tipo"], select[name="tipoProyecto"]');
      if(sel){
        var matched=false; Array.from(sel.options).forEach(function(o){ if(o.text.toLowerCase().indexOf(tipo.toLowerCase().replace(/-/g,' '))>-1 || o.value.toLowerCase()===tipo.toLowerCase()){sel.value=o.value; matched=true;} });
        if(!matched){ try{sel.value=tipo;}catch(e){} }
      }
    }
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.checkValidity()){form.reportValidity();return;}
      submitLeadForm(form);
    });
  });
})();
