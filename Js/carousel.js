(function () {
  const track = document.getElementById('servicesTrack');
  if (!track) return;

  const cards   = Array.from(track.querySelectorAll('.service-card'));
  const dots    = Array.from(document.querySelectorAll('.services__dot'));
  const prevBtn = document.querySelector('.services__arrow--prev');
  const nextBtn = document.querySelector('.services__arrow--next');

  let currentIndex = 0;

  function cardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  }

  function maxIndex() {
    return Math.max(0, cards.length - cardsPerView());
  }

  function scrollToIndex(index) {
    index = Math.max(0, Math.min(index, maxIndex()));
    const card      = cards[index];
    const trackRect = track.getBoundingClientRect();
    const cardRect  = card.getBoundingClientRect();
    track.scrollBy({ left: cardRect.left - trackRect.left, behavior: 'smooth' });
    currentIndex = index;
    updateUI();
  }

  function updateUI() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('services__dot--active', i === currentIndex);
    });
    if (prevBtn) prevBtn.disabled = currentIndex <= 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex();
  }

  prevBtn?.addEventListener('click', () => scrollToIndex(currentIndex - 1));
  nextBtn?.addEventListener('click', () => scrollToIndex(currentIndex + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => scrollToIndex(i));
  });

  // IntersectionObserver: atualiza dots imediatamente ao card entrar na área visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = cards.indexOf(entry.target);
        if (index !== -1 && index !== currentIndex) {
          currentIndex = index;
          updateUI();
        }
      }
    });
  }, {
    root: track,
    threshold: 0.5
  });

  cards.forEach(card => observer.observe(card));

  window.addEventListener('resize', updateUI, { passive: true });

  updateUI();
})();
