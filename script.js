const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Закрыть':'Меню';nav.classList.toggle('open',open);});
const scene=document.querySelector('.hero-visual'),photo=document.querySelector('.hero-photo');
function fitBathEdge(){
  if(!photo.complete||!photo.naturalWidth)return;
  const bleed=parseFloat(getComputedStyle(scene).getPropertyValue('--bleed')),width=scene.clientWidth+bleed,height=scene.clientHeight;
  const scale=Math.max(width/photo.naturalWidth,height/photo.naturalHeight),reach=innerWidth<=650?12:24;
  const offsetX=Math.max(width-photo.naturalWidth*scale,Math.min(0,bleed-reach-58*scale)),offsetY=(height-photo.naturalHeight*scale)/2;
  photo.style.objectPosition=offsetX+'px '+offsetY+'px';
  const frame=document.querySelector('#bath-frame');
  Object.entries({x:bleed,y:0,width:width-bleed,height,rx:parseFloat(getComputedStyle(scene).borderTopLeftRadius)}).forEach(([key,value])=>frame.setAttribute(key,value));
  const points=[[58,179],[110,53],[673,210],[667,221],[235,117],[215,126],[91,215],[91,203]];
  document.querySelector('#bath-roof').setAttribute('d',points.map(([x,y],i)=>(i?'L':'M')+(x*scale+offsetX).toFixed(2)+' '+(y*scale+offsetY).toFixed(2)).join(' ')+' Z');
}
photo.addEventListener('load',fitBathEdge);new ResizeObserver(fitBathEdge).observe(scene);fitBathEdge();
const picker=document.querySelector('.picker'),lightbox=document.querySelector('.lightbox');
document.querySelectorAll('[data-picker]').forEach(button=>button.addEventListener('click',()=>picker.showModal()));
function updateMail(){
  const size=document.querySelector('#size').value,insulation=document.querySelector('#insulation').value,finish=document.querySelector('#finish').value;
  const body='Добрый день! Помогите подобрать баню.\n\nРазмеры: '+size+'\nУтепление: '+insulation+'\nНаружная отделка: '+finish+'\n\nМесто установки: \nДругие пожелания: ';
  document.querySelector('#send-preferences').href='mailto:89085825782@mail.ru?subject='+encodeURIComponent('Подбор бани Баер')+'&body='+encodeURIComponent(body);
}
picker.querySelectorAll('select').forEach(select=>select.addEventListener('change',updateMail));updateMail();
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{
  lightbox.querySelector('img').src='assets/'+button.dataset.image;lightbox.querySelector('img').alt=button.dataset.caption;lightbox.querySelector('figcaption').textContent=button.dataset.caption;lightbox.showModal();
}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
