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