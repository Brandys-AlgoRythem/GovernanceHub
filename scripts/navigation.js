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

function scriptPath(fileName) {
  return window.location.pathname.includes('/pages/') ? `../scripts/${fileName}` : `scripts/${fileName}`;
}

function loadScriptOnce(fileName) {
  const src = scriptPath(fileName);
  const existing = [...document.scripts].find((script) => script.getAttribute('src') === src);
  if (existing) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.body.appendChild(script);
  });
}

async function bootstrapGovernanceHub() {
  try {
    await loadScriptOnce('data.js');
    await loadScriptOnce('dates.js');
    await loadScriptOnce('metrics.js');
    await loadScriptOnce('tables.js');
    await loadScriptOnce('app.js');

    if (window.GovernanceApp) {
      await window.GovernanceApp.initializeGovernanceHub();
    }
  } catch (error) {
    console.warn('Governance Hub bootstrap failed:', error);
  }
}

bootstrapGovernanceHub();
