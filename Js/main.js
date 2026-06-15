// Vídeo hero — autoplay em todos os dispositivos
const heroVideo = document.querySelector('.hero__video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.playbackRate = 1.0;
  heroVideo.play().catch(() => {});
}


// AOS
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 60,
});

// Navbar: transparente → sólido ao rolar
const navbar = document.getElementById('navbar');

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// Dropdown desktop
const dropdownItem = document.querySelector('.navbar__item--dropdown');
const dropdownBtn  = document.querySelector('.navbar__link--dropdown');

if (dropdownBtn) {
  dropdownBtn.addEventListener('click', () => {
    const isOpen = dropdownItem.classList.toggle('open');
    dropdownBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!dropdownItem.contains(e.target)) {
      dropdownItem.classList.remove('open');
      dropdownBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Fechar dropdown com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdownItem.classList.contains('open')) {
      dropdownItem.classList.remove('open');
      dropdownBtn.setAttribute('aria-expanded', 'false');
      dropdownBtn.focus();
    }
  });
}

// ===================================
// CTA FINAL — Scroll-reveal + Parallax
// ===================================
(function initCtaFinal() {
  const section = document.getElementById('cta-final');
  if (!section) return;

  const content = section.querySelector('.cta-final__content');
  const media   = section.querySelector('.cta-final__media');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* — Scroll-reveal entrance — */
  if (content) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            content.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
  }

  /* — Subtle parallax (desktop only, no reduced-motion) — */
  if (media && !prefersReduced && window.innerWidth >= 768) {
    let rafId = null;

    function updateParallax() {
      const rect     = section.getBoundingClientRect();
      const progress = rect.top / window.innerHeight;   // -1 → 1
      const offset   = progress * 40;                   // ± 40 px max
      section.style.setProperty('--cta-parallax', offset.toFixed(2));
      rafId = null;
    }

    window.addEventListener('scroll', () => {
      if (!rafId) rafId = requestAnimationFrame(updateParallax);
    }, { passive: true });

    updateParallax(); // initial call
  }
})();

