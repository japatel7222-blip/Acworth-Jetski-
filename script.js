const loader = document.querySelector('.loader');
const heroVideos = [...document.querySelectorAll('.hero__video')];
const film = document.querySelector('.film');
const filmVideo = document.querySelector('.film__bg');
const filmMeter = document.querySelector('.film__meter span');
const sound = document.querySelector('.sound');
const splitVideo = document.querySelector('.split-film__visual video');
const playControl = document.querySelector('.play-control');

function dismissLoader(){ loader?.classList.add('is-gone'); setTimeout(()=>loader?.remove(),1100); }
window.addEventListener('load',()=>setTimeout(dismissLoader,650));
setTimeout(dismissLoader,2400);
heroVideos.forEach(v=>v.play().catch(()=>{}));

sound?.addEventListener('click',()=>{
  const muted = heroVideos[0].muted;
  heroVideos.forEach(v=>v.muted=!muted);
  sound.innerHTML = `<span></span> SOUND ${muted?'ON':'OFF'}`;
});

const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('in');
}),{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const videoObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{
  const v=entry.target;
  if(entry.isIntersecting) v.play().catch(()=>{}); else v.pause();
}),{threshold:.2});
[filmVideo,splitVideo].forEach(v=>v&&videoObserver.observe(v));

window.addEventListener('scroll',()=>{
  if(!film) return;
  const r=film.getBoundingClientRect();
  const travel=film.offsetHeight-innerHeight;
  const p=Math.max(0,Math.min(1,-r.top/travel));
  filmMeter.style.width=`${p*100}%`;
  document.querySelector('.film__copy').style.transform=`translateY(${(p-.5)*-30}px)`;
},{passive:true});

playControl?.addEventListener('click',()=>{
  if(splitVideo.paused){splitVideo.play();playControl.textContent='PAUSE FILM'}
  else{splitVideo.pause();playControl.textContent='PLAY FILM'}
});

document.querySelector('#bookingForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const toast=document.querySelector('.toast');
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),3200);
});
