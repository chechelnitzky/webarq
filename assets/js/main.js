
(function(){
 const cfg=window.SITE_CONFIG||{};
 const number=cfg.whatsappNumber||'56976052356';
 function openWA(msg){ window.open('https://wa.me/'+number+'?text='+encodeURIComponent(msg||'Hola Joseph, quiero evaluar un proyecto de arquitectura.'),'_blank','noopener'); }
 document.querySelectorAll('.js-wa').forEach(el=>{ el.setAttribute('role','link'); el.addEventListener('click',e=>{e.preventDefault(); openWA(el.dataset.wa);}); });
 const btn=document.querySelector('.menu-toggle'), nav=document.querySelector('.mobile-nav');
 if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');});}
 document.querySelectorAll('.faq-item button').forEach(b=>b.addEventListener('click',()=>b.closest('.faq-item').classList.toggle('open')));
 const header=document.querySelector('.site-header');
 const onScroll=()=>header&&header.classList.toggle('at-top',window.scrollY<16); onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 const form=document.querySelector('.form-card');
 if(form){form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const msg=`Hola Joseph, quiero evaluar un proyecto.\nNombre: ${fd.get('nombre')||''}\nTeléfono: ${fd.get('telefono')||''}\nComuna: ${fd.get('comuna')||''}\nTipo: ${fd.get('tipo')||''}\nMensaje: ${fd.get('mensaje')||''}`;openWA(msg);});}
})();
