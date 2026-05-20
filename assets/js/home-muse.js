(function(){
  var menu=document.querySelector('.muse-menu');
  var nav=document.querySelector('.muse-mobile-nav');
  if(menu&&nav){
    menu.addEventListener('click',function(){
      var open=nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');});});
  }
  document.querySelectorAll('.muse-problem-card').forEach(function(card){
    card.addEventListener('click',function(){
      var sel=document.querySelector('#consultaForm select[name="tipo"]');
      var map={casa:'Quiero construir mi casa',remodelar:'Quiero remodelar',regularizar:'Necesito regularizar',inversion:'Soy inversionista'};
      if(sel&&map[card.dataset.case]) sel.value=map[card.dataset.case];
      document.querySelector('#consulta')?.scrollIntoView({behavior:'smooth',block:'start'});
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'select_home_intent',intent:card.dataset.case,page:'home'});
    });
  });
  var form=document.getElementById('consultaForm');
  if(form){
    var submitButton=form.querySelector('button[type="submit"]');
    var errorMessage=form.querySelector('.muse-form-error');
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      var cfg=window.SITE_CONFIG||{};
      var endpoint=(cfg.googleSheetsWebAppUrl||'').trim();
      var thankYou=cfg.thankYouUrl||'/gracias/';
      var fd=new FormData(form);
      var params=new URLSearchParams(window.location.search);
      var data={};
      fd.forEach(function(v,k){data[k]=v});

      // Payload compatible con el Google Apps Script de leads.
      // Importante: se envía como text/plain JSON para evitar problemas CORS con Apps Script.
      var payload={
        nombre:data.nombre||'',
        email:data.email||'',
        telefono:data.telefono||'',
        comuna:data.comuna||'',
        tipoProyecto:data.tipo||'',
        mensaje:data.mensaje||'',
        pageUrl:window.location.href,
        utmSource:params.get('utm_source')||'',
        utmMedium:params.get('utm_medium')||'',
        utmCampaign:params.get('utm_campaign')||'',
        userAgent:navigator.userAgent||'',
        referrer:document.referrer||'',
        source:data.source||'home-consulta-inicial',
        leadStatus:data.lead_status||'nuevo',
        submittedAt:new Date().toISOString()
      };

      try{localStorage.setItem('joseph_consulta_ultimo_envio',JSON.stringify({createdAt:new Date().toISOString(),data:payload}));}catch(err){}
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'form_consulta_submit',page:'home',section:'consulta',tipo:payload.tipoProyecto||''});
      if(errorMessage) errorMessage.hidden=true;
      if(submitButton){submitButton.disabled=true;submitButton.textContent='Enviando consulta…';}

      var alreadyRedirecting=false;
      function goToThanks(){
        if(alreadyRedirecting) return;
        alreadyRedirecting=true;
        var query='?tipo='+encodeURIComponent(payload.tipoProyecto||'consulta')+'&nombre='+encodeURIComponent(payload.nombre||'');
        window.location.href=thankYou+query;
      }

      if(endpoint && endpoint.indexOf('script.google.com')!==-1){
        var body=JSON.stringify(payload);
        var sent=false;

        // Envío rápido: sendBeacon está pensado para mandar datos y dejar que la página redirija sin esperar la respuesta del servidor.
        if(navigator.sendBeacon){
          try{
            var blob=new Blob([body],{type:'text/plain;charset=UTF-8'});
            sent=navigator.sendBeacon(endpoint,blob);
          }catch(err){ sent=false; }
        }

        if(submitButton){submitButton.textContent='Listo, redirigiendo…';}

        if(sent){
          setTimeout(goToThanks,220);
        }else{
          // Fallback: no esperamos indefinidamente a Apps Script. Si el servidor se demora, igual avanzamos a gracias.
          var timeout=setTimeout(goToThanks,900);
          fetch(endpoint,{
            method:'POST',
            mode:'no-cors',
            keepalive:true,
            headers:{'Content-Type':'text/plain;charset=utf-8'},
            body:body
          })
            .then(function(){clearTimeout(timeout);goToThanks();})
            .catch(function(){clearTimeout(timeout);goToThanks();});
        }
      }else{
        // Modo local si no existe endpoint: permite probar la página de gracias sin romper la web.
        goToThanks();
      }
    });
  }
})();

(function(){
  // Header state on scroll
  var header=document.querySelector('.muse-header');
  function setHeader(){ if(header){ header.classList.toggle('is-scrolled', window.scrollY>18); } }
  setHeader(); window.addEventListener('scroll',setHeader,{passive:true});

  // Hero editorial image rotator
  var slides=[].slice.call(document.querySelectorAll('.muse-hero-slide'));
  var label=document.querySelector('.muse-hero-rotator span');
  if(slides.length>1){
    var i=0;
    setInterval(function(){
      slides[i].classList.remove('is-active');
      i=(i+1)%slides.length;
      if(label){ label.classList.add('is-changing'); }
      setTimeout(function(){
        slides[i].classList.add('is-active');
        if(label){ label.textContent=slides[i].dataset.label||''; label.classList.remove('is-changing'); }
      },260);
    },4800);
  }

  // Scroll reveals and process line activation
  var revealItems=[].slice.call(document.querySelectorAll('.muse-center-head,.muse-split-head,.muse-problem-card,.muse-process,.muse-steps article,.muse-process-cta,.muse-authority-copy,.muse-authority-stage,.muse-case-card,.muse-route-grid a,.muse-consulta-media,.muse-form-wrap,.muse-faq-list details,.muse-final h2,.muse-final p,.muse-final .muse-actions'));
  revealItems.forEach(function(el){ el.classList.add('reveal-on-scroll'); });
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    },{threshold:.16,rootMargin:'0px 0px -8% 0px'});
    revealItems.forEach(function(el){ io.observe(el); });
  }else{ revealItems.forEach(function(el){el.classList.add('in-view');}); }

  // Honest counters
  var counters=[].slice.call(document.querySelectorAll('.js-count'));
  function animateCount(el){
    var target=parseInt(el.dataset.target||'0',10); var start=0; var dur=850; var t0=null;
    function step(ts){
      if(!t0) t0=ts; var p=Math.min((ts-t0)/dur,1); var eased=1-Math.pow(1-p,3);
      el.textContent=Math.round(start+(target-start)*eased);
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if(counters.length && 'IntersectionObserver' in window){
    var co=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){ if(entry.isIntersecting){ animateCount(entry.target); co.unobserve(entry.target); } });
    },{threshold:.55});
    counters.forEach(function(c){ co.observe(c); });
  }else{ counters.forEach(animateCount); }

  // Authority tabs / visual switch
  var authButtons=[].slice.call(document.querySelectorAll('[data-auth]'));
  var authImgs=[].slice.call(document.querySelectorAll('[data-auth-panel]'));
  authButtons.forEach(function(btn){
    btn.addEventListener('click',function(){
      var key=btn.dataset.auth;
      authButtons.forEach(function(b){ b.classList.toggle('is-active',b===btn); b.setAttribute('aria-selected',b===btn?'true':'false'); });
      authImgs.forEach(function(img){ img.classList.toggle('is-active',img.dataset.authPanel===key); });
    });
  });

  // Case filters, visual only: keep all cases visible but mute non-matches to preserve layout
  var filterButtons=[].slice.call(document.querySelectorAll('.muse-case-filters button'));
  var caseCards=[].slice.call(document.querySelectorAll('.muse-case-card[data-case-type]'));
  filterButtons.forEach(function(btn){
    btn.addEventListener('click',function(){
      var f=btn.dataset.filter;
      filterButtons.forEach(function(b){b.classList.toggle('is-active',b===btn);});
      caseCards.forEach(function(card){ card.classList.toggle('is-filtered-out', f!=='all' && card.dataset.caseType!==f); });
      window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event:'case_filter_click',filter:f,page:'home'});
    });
  });
})();
