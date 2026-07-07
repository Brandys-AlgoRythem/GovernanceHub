function setYear() {
  const yearNodes = document.querySelectorAll('.js-year');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function setMetric(selector, value, prefix = '', suffix = '') {
  const node = document.querySelector(selector);
  if (node) node.textContent = `${prefix}${value}${suffix}`;
}

function updateDashboardMetricCards(metrics) {
  const cards = document.querySelectorAll('.metric-card');
  if (!cards.length) return;

  const values = [
    metrics.upcomingDeadlines,
    metrics.overdueObligations,
    metrics.highRisks,
    metrics.totalDocuments,
    metrics.healthScore,
    metrics.openRisks,
    metrics.verifiedEvidence,
    Math.round(metrics.quarterlyExpenses)
  ];

  cards.forEach((card, index) => {
    const strong = card.querySelector('strong');
    if (!strong || values[index] === undefined) return;
    const value = index === 4 ? `${values[index]}%` : index === 7 ? `$${values[index].toLocaleString()}` : values[index];
    strong.textContent = value;
  });
}

async function initializeGovernanceHub() {
  setYear();

  if (!window.GovernanceData) return;

  try {
    const data = await window.GovernanceData.loadAll();

    if (window.GovernanceMetrics && window.location.pathname.endsWith('dashboard.html')) {
      const metrics = window.GovernanceMetrics.calculateDashboardMetrics(data);
      updateDashboardMetricCards(metrics);
      setMetric('[data-health-score]', metrics.healthScore, '', '%');
    }

    if (window.GovernanceTables) {
      const type = window.GovernanceTables.pageTableType?.();
      if (type) window.GovernanceTables.renderDynamicTable(type, data);
    }
  } catch (error) {
    console.warn('Governance Hub demo data did not load:', error);
  }
}

window.GovernanceApp = {
  initializeGovernanceHub,
  updateDashboardMetricCards
};
