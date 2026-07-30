document.querySelector('.home-btn').addEventListener('click', e => {
  const btn = e.currentTarget;
  btn.classList.add('circle');
  
  btn.addEventListener('transitionend', () => {
    btn.classList.remove('circle');
  }, { once: true }); // deletes the listener after execution in order to avoid accumulations

  if (location.pathname === '/' || location.pathname.includes('index.html')){
    location.reload();
  } else {
    (location.assign('../index.html'));
    
  }
})

const toggle = document.querySelector('.toggle-mode');

toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
})

const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
}



const horizontalPage = document.querySelector('.project-page-horizontal');

if(horizontalPage){

 horizontalPage.addEventListener('wheel', e => {
  e.preventDefault();
  e.currentTarget.scrollLeft += e.deltaY;
 });
  
}


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelector('.project-page-grid').addEventListener('click', e => {
    const img = e.target.closest('img');
     if(!img) return;

    lightboxImg.src = img.src;

    lightbox.classList.add('active');
    
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });