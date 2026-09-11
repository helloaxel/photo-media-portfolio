document.querySelector('.home-btn').addEventListener('click', e => {
  const btn = e.currentTarget;
  btn.classList.add('circle');

  btn.addEventListener('transitionend', () => {
    btn.classList.remove('circle');
  }, { once: true }); // deletes the listener after execution in order to avoid accumulations

  if (location.pathname === '/' || location.pathname.includes('index.html')) {
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

if (horizontalPage) {

  horizontalPage.addEventListener('wheel', e => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  });

}


const expand = document.querySelector('.has-lightbox')
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

if (expand) {

  expand.addEventListener('click', e => {
    const img = e.target.closest('img');
    if (!img) return;

    lightboxImg.src = img.src;

    /* decode() resolves once the image is actually ready to paint, not just once it's requested. 
    Revealing the lightbox before this was what made the transition feel slow: the overlay popped up blank,
    then the image filled in a beat later once decoding finished. Falls back to revealing immediately if decode() itself isn't supported.*/

    if (lightboxImg.decode) {
      lightboxImg.decode()
        .then(() => lightbox.classList.add('active'))
        .catch(() => lightbox.classList.add('active'));
    } else {
      lightbox.classList.add('active');
    }

  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

}



const spotlightGallery = document.querySelector('.gallery');
const spotlightItems = spotlightGallery ? spotlightGallery.querySelectorAll('.gallery-item') : [];

const clearSpotlightIfNoneActive = () => {
  if (!spotlightGallery.querySelector('.gallery-item.is-spotlighted')) {
    spotlightGallery.classList.remove('has-spotlight');
  }
};

spotlightItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('is-spotlighted');
    spotlightGallery.classList.add('has-spotlight');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('is-spotlighted');
    clearSpotlightIfNoneActive();
  });
});

if (spotlightGallery) {
  spotlightGallery.addEventListener('focusin', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    item.classList.add('is-spotlighted');
    spotlightGallery.classList.add('has-spotlight');
  });

  spotlightGallery.addEventListener('focusout', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    item.classList.remove('is-spotlighted');
    clearSpotlightIfNoneActive();
  });
}


if (window.matchMedia('(max-width: 767px)').matches) {
  const gallery = document.querySelector('.gallery');

  document.querySelectorAll('.gallery a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
    });
  });

  gallery.addEventListener('click', e => {
    const card = e.target.closest('.gallery-item');
    const isImgTap = e.target.tagName === 'IMG';
    const selectedCard = gallery.querySelector('.gallery-item.selected');


    if (!gallery.classList.contains('fanned-state')) {
      gallery.classList.add('fanned-state');
      return;
    
    }

      if (isImgTap && card && card === selectedCard) {
        const link = card.closest('a');
        if (link) window.location.href = link.href;
        return;
      }
    

    if (isImgTap && card && card != selectedCard) {
      if (selectedCard) selectedCard.classList.remove('selected');
      card.classList.add('selected');
      gallery.classList.add('has-selection');
      return;
    }

    if(selectedCard){
      selectedCard.classList.remove('selected');
      gallery.classList.remove('has-selection');
      return;
    }


 
    gallery.classList.remove('fanned-state');
  

  });

  document.addEventListener('click', e => {
    if (!gallery.contains(e.target)) {
        gallery.classList.remove('fanned-state');
        gallery.classList.remove('has-selection');
        const selectedCard = gallery.querySelector('.gallery-item.selected');
        if (selectedCard) selectedCard.classList.remove('selected');
    }
  })


}
