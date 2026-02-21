document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  // ===== МЕНЮ =====
  if (menuToggle && mainNav) {
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

      // для доступности
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
    }

    menuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // закрытие по клику на ссылку меню (на мобильных)
    document.querySelectorAll('.header__nav-link').forEach((link) => {
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
  }

  // ===== КНОПКА "НАВЕРХ" =====
  const scrollTopButton = document.getElementById('scrollTop');

  if (scrollTopButton) {
    const getY = () =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const updateScrollBtn = () => {
      scrollTopButton.classList.toggle('visible', getY() > 300);
    };

  // обычный скролл
    window.addEventListener('scroll', updateScrollBtn, { passive: true });

  // ключевое: когда страница открыта сразу с #hash (/#choose)
    window.addEventListener('load', () => {
      requestAnimationFrame(updateScrollBtn);
      setTimeout(updateScrollBtn, 50);
      setTimeout(updateScrollBtn, 200);
    });

  // если hash меняется (кликаешь по меню)
    window.addEventListener('hashchange', () => {
      requestAnimationFrame(updateScrollBtn);
      setTimeout(updateScrollBtn, 50);
    });

  // возврат из bfcache (Safari/мобилки)
    window.addEventListener('pageshow', updateScrollBtn);

    updateScrollBtn();

    scrollTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);
      }, 400);
    });
  }
});