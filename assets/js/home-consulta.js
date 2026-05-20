(function(){
  const menu=document.querySelector('.jc-menu');
  const mobile=document.querySelector('.jc-mobile-nav');
  if(menu&&mobile){menu.addEventListener('click',()=>{const open=mobile.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));});}
  const tipo=document.getElementById('tipoCaso');
  document.querySelectorAll('[data-case]').forEach(card=>{
    card.addEventListener('click',e=>{
      const link=e.target.closest('a');
      if(!link) return;
      if(tipo){tipo.value=card.getAttribute('data-case')||'';}
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'cta_consulta_inicial_click',page:'home',section:'resolver',intent:card.getAttribute('data-case')});
    });
  });
  document.querySelectorAll('[data-event]').forEach(el=>{
    el.addEventListener('click',()=>{
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:el.dataset.event,page:el.dataset.page||'home',section:el.dataset.section||'',intent:el.dataset.intent||''});
    });
  });
  const form=document.getElementById('consultaForm');
  const success=document.getElementById('consultaSuccess');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.checkValidity()){form.reportValidity();return;}
      const data=Object.fromEntries(new FormData(form).entries());
      const payload={...data,createdAt:new Date().toISOString(),status:'placeholder_backend_pending'};
      try{localStorage.setItem('joseph_consulta_inicial_ultimo_borrador',JSON.stringify(payload));}catch(err){}
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'form_consulta_submit',page:'home',section:'consulta',tipo:data.tipo||''});
      if(success) success.hidden=false;
      form.querySelector('button[type="submit"]').textContent='Consulta guardada como borrador';
    });
  }
})();
