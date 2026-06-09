// Vídeo hero — autoplay em todos os dispositivos
const heroVideo = document.querySelector('.hero__video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.playbackRate = 1.0;
  heroVideo.play().catch(() => {});
}

// Accordion "Como Trabalhamos" — abre um item e fecha os demais
const processAccordion = document.getElementById('processAccordion');
if (processAccordion) {
  processAccordion.querySelectorAll('.process__header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.process__item');
      const isOpen = item.classList.contains('process__item--open');

      processAccordion.querySelectorAll('.process__item').forEach(i => {
        i.classList.remove('process__item--open');
        i.querySelector('.process__header').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('process__item--open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
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
