// if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// window.addEventListener('load', () => {
//   if (location.hash) {
//     history.replaceState(null, '', location.pathname + location.search);
//   }
//   window.scrollTo(0, 0);
// });

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// создаём затемнение
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function toggleMenu() {
  const isOpen = mainNav.classList.contains('active');

  menuToggle.classList.toggle('active');
  mainNav.classList.toggle('active');
  navOverlay.classList.toggle('active');

  // блокируем скролл когда меню открыто
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// закрытие по клику на ссылку меню (на мобильных)
document.querySelectorAll('.header__nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// закрытие по Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mainNav.classList.contains('active')) {
    toggleMenu();
  }
});

const scrollTopButton = document.getElementById('scrollTop');

if (scrollTopButton) {
  const scrollEl = document.scrollingElement || document.documentElement;

  const updateScrollBtn = () => {
    scrollTopButton.classList.toggle('visible', scrollEl.scrollTop > 100);
  };

  window.addEventListener('scroll', updateScrollBtn, { passive: true });
  window.addEventListener('pageshow', updateScrollBtn); 
  updateScrollBtn();

  scrollTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    scrollEl.scrollTop = 0; // fallback
  });
}