function setYear() {
  const yearNodes = document.querySelectorAll('.js-year');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function formatMetricValue(key, value) {
  if (key === 'healthScore' || key.endsWith('Score')) return `${value}%`;
  if (key === 'monthlyExpenses' || key === 'quarterlyExpenses') return `$${Math.round(value).toLocaleString()}`;
  return value;
}

function updateDashboardMetricCards(metrics) {
  document.querySelectorAll('[data-metric]').forEach((card) => {
    const key = card.dataset.metric;
    const strong = card.querySelector('strong');
    if (!key || !strong || metrics[key] === undefined) return;
    strong.textContent = formatMetricValue(key, metrics[key]);
  });
}

function dashboardBadgeClass(status) {
  const value = String(status || '').toLowerCase();
  if (['completed', 'verified', 'on track', 'active'].includes(value)) return 'success';
  if (['due soon', 'pending review', 'needs review', 'in progress'].includes(value)) return 'warning';
  if (['overdue', 'missing', 'expired', 'open'].includes(value)) return 'danger';
  return 'info';
}

function formatDate(value) {
  const date = window.GovernanceDates.parseDate(value);
  if (!date) return value || 'Needs Review';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderDashboardDeadlines(obligations) {
  const body = document.querySelector('[data-dashboard-deadlines]');
  if (!body || !window.GovernanceDates) return;

  const rows = obligations
    .map((item) => ({
      ...item,
      computedStatus: window.GovernanceDates.getDueStatus(item.dueDate, item.status === 'Completed'),
      parsedDate: window.GovernanceDates.parseDate(item.dueDate)
    }))
    .filter((item) => item.computedStatus !== 'Completed' && item.parsedDate)
    .sort((a, b) => a.parsedDate - b.parsedDate)
    .slice(0, 5);

  body.innerHTML = rows.map((item) => `
    <tr>
      <td><strong>${item.title}</strong></td>
      <td>${formatDate(item.dueDate)}</td>
      <td><span class="badge ${dashboardBadgeClass(item.computedStatus)}">${item.computedStatus}</span></td>
    </tr>
  `).join('');
}

function updateDashboardHealth(metrics) {
  document.querySelectorAll('[data-health-score]').forEach((node) => {
    node.textContent = `${metrics.healthScore}%`;
  });

  const evidenceNode = document.querySelector('[data-hive-evidence]');
  if (evidenceNode) evidenceNode.textContent = `${metrics.evidenceScore}%`;

  const riskNode = document.querySelector('[data-hive-risks]');
  if (riskNode) riskNode.textContent = `${metrics.openRisks} Open`;
}

async function initializeGovernanceHub() {
  setYear();

  if (!window.GovernanceData) return;

  try {
    const data = await window.GovernanceData.loadAll();

    if (window.GovernanceMetrics && window.location.pathname.endsWith('dashboard.html')) {
      const metrics = window.GovernanceMetrics.calculateDashboardMetrics(data);
      updateDashboardMetricCards(metrics);
      updateDashboardHealth(metrics);
      renderDashboardDeadlines(data.obligations || []);
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
  updateDashboardMetricCards,
  renderDashboardDeadlines
};
