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
        // 1) Находим реальный скролл-контейнер:
        // если страница скроллится обычно — это window,
        // если скролл внутри обёртки (overflow:auto) — найдём её.
        const getScrollParent = (el) => {
            let p = el.parentElement;
            while (p) {
            const cs = getComputedStyle(p);
            const overflowY = cs.overflowY;
            if ((overflowY === 'auto' || overflowY === 'scroll') && p.scrollHeight > p.clientHeight) {
                return p;
            }
            p = p.parentElement;
            }
            return window; // fallback
        };

        // Часто скролл-контейнером является document.scrollingElement
        // (на всякий случай берём его как приоритет)
        const scrollingEl = document.scrollingElement || document.documentElement;
        const possibleContainer = getScrollParent(scrollTopButton);
        const scrollContainer = (possibleContainer !== window) ? possibleContainer : window;

        const getY = () => {
            if (scrollContainer === window) {
            return window.scrollY || window.pageYOffset || scrollingEl.scrollTop || 0;
            }
            return scrollContainer.scrollTop || 0;
        };

        const updateScrollBtn = () => {
            scrollTopButton.classList.toggle('visible', getY() > 300);
        };

        // 2) Слушаем скролл там, где он реально происходит
        const target = (scrollContainer === window) ? window : scrollContainer;
        target.addEventListener('scroll', updateScrollBtn, { passive: true });

        // 3) Доп. триггеры (когда скролл меняется без "ручного" scroll event)
        window.addEventListener('load', () => requestAnimationFrame(updateScrollBtn));
        window.addEventListener('resize', updateScrollBtn);
        window.addEventListener('hashchange', () => {
            requestAnimationFrame(updateScrollBtn);
            setTimeout(updateScrollBtn, 200); // на случай плавного скролла/якорей
        });
        window.addEventListener('pageshow', updateScrollBtn);

        // 4) Инициализация
        updateScrollBtn();

        // 5) Клик "наверх"
        scrollTopButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (scrollContainer === window) {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // страховка для Safari/мобилок
            setTimeout(() => {
            if (scrollContainer === window) {
                scrollingEl.scrollTop = 0;
                window.scrollTo(0, 0);
            } else {
                scrollContainer.scrollTop = 0;
            }
            updateScrollBtn();
            }, 350);
        });
    }
});