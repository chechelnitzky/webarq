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
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var data={};
      new FormData(form).forEach(function(v,k){data[k]=v});
      try{localStorage.setItem('joseph_consulta_draft',JSON.stringify({createdAt:new Date().toISOString(),data:data}));}catch(err){}
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({event:'form_consulta_submit',page:'home',tipo:data.tipo||''});
      var success=form.querySelector('.muse-form-success');
      if(success){success.hidden=false;success.scrollIntoView({behavior:'smooth',block:'nearest'});}
    });
  }
})();
