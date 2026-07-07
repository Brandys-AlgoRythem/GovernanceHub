const navLinks = document.querySelectorAll('[data-nav]');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (!href) return;
  const linkPath = href.split('/').pop();
  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});
