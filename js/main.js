document.querySelector('.home-btn').addEventListener('click', e => {
  const btn = e.currentTarget;
  btn.classList.add('circle');
  
  btn.addEventListener('transitionend', () => {
    btn.classList.remove('circle');
  }, { once: true }); // deletes the listener after execution in order to avoid accumulations
});

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
