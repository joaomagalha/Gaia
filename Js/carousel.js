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
    const card     = cards[index];
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

  // Sync dot/arrows when user drags/swipes manually
  let scrollTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const trackLeft = track.getBoundingClientRect().left;
      let closest = 0;
      let minDist  = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - trackLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      if (closest !== currentIndex) {
        currentIndex = closest;
        updateUI();
      }
    }, 80);
  }, { passive: true });

  window.addEventListener('resize', updateUI, { passive: true });

  updateUI();
})();
