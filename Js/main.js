// Vídeo hero — só roda no desktop (mobile usa imagem via CSS)
const heroVideo = document.querySelector('.hero__video');
if (heroVideo && window.matchMedia('(min-width: 768px)').matches) {
  heroVideo.muted = true;
  heroVideo.playbackRate = 1.0;

  const playVideo = () => {
    heroVideo.currentTime = 0;
    heroVideo.play().catch(() => {});
  };

  heroVideo.addEventListener('canplay', playVideo, { once: true });
  heroVideo.play().catch(() => {});
}

// Iguala altura dos cards de processo no desktop
function equalizeProcessCards() {
  const cards = document.querySelectorAll('.process__card');
  if (!cards.length) return;
  cards.forEach(c => (c.style.height = 'auto'));
  if (window.innerWidth < 1024) return;
  let max = 0;
  cards.forEach(c => (max = Math.max(max, c.offsetHeight)));
  cards.forEach(c => (c.style.height = max + 'px'));
}

window.addEventListener('load',   equalizeProcessCards);
window.addEventListener('resize', equalizeProcessCards, { passive: true });

// Glow local dentro de cada card de processo
document.querySelectorAll('.process__card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--card-x', x + '%');
    card.style.setProperty('--card-y', y + '%');
  }, { passive: true });
});

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
