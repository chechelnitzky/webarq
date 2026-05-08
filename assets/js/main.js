
const qs=(s,p=document)=>p.querySelector(s);const qsa=(s,p=document)=>[...p.querySelectorAll(s)];
const WHATSAPP_NUMBER='56900000000';
function waUrl(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
function track(name,params={}){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...params});}
window.addEventListener('scroll',()=>{qs('.header')?.classList.toggle('is-scrolled',window.scrollY>24)});
qs('.menu-toggle')?.addEventListener('click',()=>document.body.classList.toggle('menu-open'));
qsa('[data-wa]').forEach(el=>{el.setAttribute('href',waUrl(el.dataset.wa));el.addEventListener('click',()=>track(el.dataset.event||'click_whatsapp',{page:document.body.dataset.page||location.pathname,message:el.dataset.wa}))});
qsa('.faq-q').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item').classList.toggle('open')));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});qsa('.reveal,.card,.image-card,.case-card').forEach(el=>{el.classList.add('reveal');io.observe(el)});
qsa('.chip').forEach(chip=>chip.addEventListener('click',()=>{qsa('.chip').forEach(c=>c.classList.remove('active'));chip.classList.add('active');const f=chip.dataset.filter;qsa('[data-case]').forEach(card=>card.style.display=(f==='Todos'||card.dataset.case.includes(f))?'':'none')}));
const contactForm=qs('#contact-form');if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(contactForm);const msg=`Hola Joseph, quiero evaluar un proyecto y necesito orientación.%0A%0ANombre: ${d.get('nombre')}%0ATeléfono: ${d.get('telefono')}%0AEmail: ${d.get('email')}%0AComuna: ${d.get('comuna')}%0ATipo de proyecto: ${d.get('tipo')}%0AMensaje: ${d.get('mensaje')}`;track('click_form_submit');window.location.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`})}
