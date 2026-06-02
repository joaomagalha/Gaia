const mobileMenu = document.getElementById('mobileMenu');
const menuBtn    = document.getElementById('menuBtn');
const closeBtn   = document.getElementById('closeBtn');
const overlay    = document.getElementById('overlay');

function openMenu() {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  document.body.classList.add('no-scroll');
  menuBtn.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
  menuBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-menu__link, .mobile-menu__sublink').forEach(link => {
  link.addEventListener('click', closeMenu);
});
