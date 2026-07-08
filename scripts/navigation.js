const navLinks = document.querySelectorAll('[data-nav]');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

const navLabelMap = {
  'dashboard.html': 'Executive Overview',
  'business-profile.html': 'Governance Profile',
  'obligations.html': 'Compliance Calendar',
  'vault.html': 'Governance Records Vault',
  'licenses.html': 'License & Permit Register',
  'risks.html': 'Enterprise Risk Register',
  'controls.html': 'Control Library',
  'evidence.html': 'Evidence & Audit Readiness',
  'expenses.html': 'Expense Evidence',
  'roadmap.html': 'GRC Roadmap'
};

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (!href) return;
  const linkPath = href.split('/').pop();
  if (navLabelMap[linkPath]) link.textContent = navLabelMap[linkPath];
  if (linkPath === currentPath) link.classList.add('active');
});

function polishHiveChrome() {
  document.querySelectorAll('.brand-mark small').forEach((node) => {
    node.textContent = 'Corporate Hive Workspace';
  });
  document.querySelectorAll('.header-copy span').forEach((node) => {
    if (node.textContent.trim() === 'Welcome back, King.') node.textContent = 'Hive Operations';
  });
  document.querySelectorAll('.profile-hex').forEach((node) => {
    if (node.textContent.trim() === 'B') node.textContent = 'GH';
  });
}

polishHiveChrome();

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
