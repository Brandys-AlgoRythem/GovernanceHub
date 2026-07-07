async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return await response.json();
}

function getStatusBadgeClass(status) {
  const s = status ? status.toLowerCase() : '';
  switch (s) {
    case 'on track':
    case 'verified':
    case 'stored':
    case 'active':
    case 'mitigated':
      return 'badge-success';
    case 'due soon':
    case 'review':
    case 'open':
      return 'badge-warning';
    case 'planned':
      return 'badge-neutral';
    case 'expired':
    case 'missing proof':
      return 'badge-danger';
    default:
      return 'badge-neutral';
  }
}

function renderObligations() {
  loadJSON('../data/obligations.json')
    .then(obligations => {
      const tbody = document.getElementById('obligations-body');
      if (!tbody) return;
      tbody.innerHTML = '';
      obligations.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${item.obligation}</strong></td>
          <td>${item.category}</td>
          <td>${item.frequency}</td>
          <td>${item.owner}</td>
          <td><span class="badge ${getStatusBadgeClass(item.status)}">${item.status}</span></td>
          <td>${item.evidence}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error(err);
    });
}

// Initialize rendering based on page content
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('obligations-body')) {
    renderObligations();
  }
  // TODO: add calls for renderRisks, renderControls, renderEvidence, renderExpenses when implemented
});
