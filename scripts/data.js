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
    case 'overdue':
    case 'expired':
    case 'missing proof':
      return 'badge-danger';
    default:
      return 'badge-neutral';
  }
}

// Obligations
function renderObligations() {
  loadJSON('../data/obligations.json')
    .then(obligations => {
      const tbody = document.getElementById('obligations-body');
      if (!tbody) return;
      tbody.innerHTML = '';
      let total = 0;
      let dueSoon = 0;
      let overdue = 0;
      let evidenceLinks = 0;
      const now = new Date();
      obligations.forEach(item => {
        total++;
        let status = item.status || '';
        if (item.dueDate) {
          const due = new Date(item.dueDate);
          const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
          if (diffDays < 0) {
            status = 'Overdue';
          } else if (diffDays <= 30) {
            status = 'Due soon';
          } else {
            status = 'On track';
          }
        }
        if (status.toLowerCase() === 'due soon') dueSoon++;
        if (status.toLowerCase() === 'overdue') overdue++;
        if (item.evidence) evidenceLinks++;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${item.obligation}</strong></td>
          <td>${item.category}</td>
          <td>${item.frequency}</td>
          <td>${item.owner}</td>
          <td><span class="badge ${getStatusBadgeClass(status)}">${status}</span></td>
          <td>${item.evidence || ''}</td>
        `;
        tbody.appendChild(tr);
      });
      // update metrics
      const totalEl = document.getElementById('obligations-total');
      if (totalEl) totalEl.textContent = total;
      const dueEl = document.getElementById('obligations-duesoon');
      if (dueEl) dueEl.textContent = dueSoon;
      const overdueEl = document.getElementById('obligations-overdue');
      if (overdueEl) overdueEl.textContent = overdue;
      const evidenceEl = document.getElementById('obligations-evidence');
      if (evidenceEl) evidenceEl.textContent = evidenceLinks;
      const badgeEl = document.getElementById('obligations-badge');
      if (badgeEl) {
        badgeEl.textContent = `${dueSoon} due soon`;
        badgeEl.className = dueSoon > 0 ? 'badge badge-warning' : 'badge badge-success';
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// Risks
function renderRisks() {
  loadJSON('../data/risks.json')
    .then(risks => {
      const tbody = document.getElementById('risks-body');
      if (!tbody) return;
      tbody.innerHTML = '';
      let openCount = 0;
      let mitigatedCount = 0;
      let highImpact = 0;
      let total = 0;
      risks.forEach(item => {
        total++;
        const status = item.status || '';
        const sLower = status.toLowerCase();
        if (sLower === 'open') openCount++;
        if (sLower === 'mitigated') mitigatedCount++;
        if (item.impact && item.impact.toLowerCase() === 'high') highImpact++;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${item.id}</strong></td>
          <td>${item.risk}</td>
          <td>${item.category}</td>
          <td>${item.likelihood}</td>
          <td>${item.impact}</td>
          <td>${item.owner}</td>
          <td><span class="badge ${getStatusBadgeClass(status)}">${status}</span></td>
        `;
        tbody.appendChild(tr);
      });
      // update metrics
      const openEl = document.getElementById('risks-open');
      if (openEl) openEl.textContent = openCount;
      const mitigatedEl = document.getElementById('risks-mitigated');
      if (mitigatedEl) mitigatedEl.textContent = mitigatedCount;
      const highEl = document.getElementById('risks-high');
      if (highEl) highEl.textContent = highImpact;
      const totalEl = document.getElementById('risks-total');
      if (totalEl) totalEl.textContent = total;
      const badge = document.getElementById('risks-badge');
      if (badge) {
        badge.textContent = `${openCount} open`;
        badge.className = openCount > 0 ? 'badge badge-warning' : 'badge badge-success';
      }
    })
    .catch(err => console.error(err));
}

// Controls
function renderControls() {
  loadJSON('../data/controls.json')
    .then(controls => {
      const tbody = document.getElementById('controls-body');
      if (!tbody) return;
      tbody.innerHTML = '';
      let total = 0;
      let evidenceCount = 0;
      const mappedRisks = new Set();
      const sopSections = new Set();
      controls.forEach(item => {
        total++;
        evidenceCount++;
        if (item.mappedRisk) mappedRisks.add(item.mappedRisk);
        if (item.frequency) sopSections.add(item.frequency);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${item.control}</strong></td>
          <td>${item.owner}</td>
          <td>${item.frequency}</td>
          <td>${item.evidenceRequired}</td>
          <td>${item.mappedRisk}</td>
          <td><span class="badge ${getStatusBadgeClass(item.status)}">${item.status}</span></td>
        `;
        tbody.appendChild(tr);
      });
      const totalEl = document.getElementById('controls-total');
      if (totalEl) totalEl.textContent = total;
      const sectionsEl = document.getElementById('controls-sections');
      if (sectionsEl) sectionsEl.textContent = sopSections.size;
      const evidenceEl = document.getElementById('controls-evidence');
      if (evidenceEl) evidenceEl.textContent = evidenceCount;
      const risksEl = document.getElementById('controls-risks');
      if (risksEl) risksEl.textContent = mappedRisks.size;
      const badgeEl = document.getElementById('controls-badge');
      if (badgeEl) {
        badgeEl.textContent = `${total} controls`;
        badgeEl.className = 'badge badge-success';
      }
    })
    .catch(err => console.error(err));
}

// Evidence
function renderEvidence() {
  loadJSON('../data/evidence.json')
    .then(evidenceList => {
      const tbody = document.getElementById('evidence-body');
      if (!tbody) return;
      tbody.innerHTML = '';
      let total = 0;
      let verified = 0;
      let missing = 0;
      let expired = 0;
      const now = new Date();
      evidenceList.forEach(item => {
        total++;
        const status = item.status || '';
        const lower = status.toLowerCase();
        if (lower === 'verified' || lower === 'stored') verified++;
        if (lower === 'review' || lower === 'missing') missing++;
        if (item.expires) {
          const expDate = new Date(item.expires);
          if (!isNaN(expDate) && expDate < now) expired++;
        }
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${item.evidence}</strong></td>
          <td>${item.supports}</td>
          <td>${item.type}</td>
          <td>${item.owner}</td>
          <td>${item.collected}</td>
          <td>${item.expires || 'n/a'}</td>
          <td><span class="badge ${getStatusBadgeClass(status)}">${status}</span></td>
          <td>${item.linkedDoc}</td>
        `;
        tbody.appendChild(tr);
      });
      const totalEl = document.getElementById('evidence-total');
      if (totalEl) totalEl.textContent = total;
      const verifiedEl = document.getElementById('evidence-verified');
      if (verifiedEl) verifiedEl.textContent = verified;
      const missingEl = document.getElementById('evidence-missing');
      if (missingEl) missingEl.textContent = missing;
      const expiredEl = document.getElementById('evidence-expired');
      if (expiredEl) expiredEl.textContent = expired;
      const badgeEl = document.getElementById('evidence-badge');
      if (badgeEl) {
        badgeEl.textContent = `${missing} missing`;
        badgeEl.className = missing > 0 ? 'badge badge-danger' : 'badge badge-success';
      }
    })
    .catch(err => console.error(err));
}

// Expenses
function renderExpenses() {
  loadJSON('../data/expenses.json')
    .then(expenses => {
      const tbody = document.getElementById('expenses-body');
      if (!tbody) return;
      tbody.innerHTML = '';
      let totalAmount = 0;
      const categories = new Set();
      const vendors = new Set();
      let verifiedCount = 0;
      expenses.forEach(item => {
        totalAmount += Number(item.amount) || 0;
        categories.add(item.category);
        vendors.add(item.vendor);
        if (item.status && (item.status.toLowerCase() === 'verified' || item.status.toLowerCase() === 'stored')) verifiedCount++;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
          <td><strong>${item.vendor}</strong></td>
          <td>${item.category}</td>
          <td>$${item.amount}</td>
          <td><span class="badge ${getStatusBadgeClass(item.status)}">${item.status}</span></td>
          <td>${item.linkedEvidence}</td>
        `;
        tbody.appendChild(tr);
      });
      const quarterEl = document.getElementById('expenses-quarterly');
      if (quarterEl) quarterEl.textContent = `$${totalAmount.toFixed(0)}`;
      const categoriesEl = document.getElementById('expenses-categories');
      if (categoriesEl) categoriesEl.textContent = categories.size;
      const vendorsEl = document.getElementById('expenses-vendors');
      if (vendorsEl) vendorsEl.textContent = vendors.size;
      const receiptEl = document.getElementById('expenses-receipt');
      if (receiptEl) {
        const coverage = expenses.length ? Math.round((verifiedCount / expenses.length) * 100) : 0;
        receiptEl.textContent = `${coverage}%`;
      }
      const badgeEl = document.getElementById('expenses-badge');
      if (badgeEl) {
        const missingCount = expenses.length - verifiedCount;
        badgeEl.textContent = missingCount > 0 ? 'Receipts review' : 'Receipts complete';
        badgeEl.className = missingCount > 0 ? 'badge badge-warning' : 'badge badge-success';
      }
      // Monthly trend (optional)
      const trendEl = document.getElementById('expenses-trend');
      if (trendEl) {
        const monthTotals = {};
        expenses.forEach(item => {
          const date = new Date(item.date);
          const monthName = date.toLocaleString('default', { month: 'long' });
          if (!monthTotals[monthName]) monthTotals[monthName] = 0;
          monthTotals[monthName] += Number(item.amount) || 0;
        });
        trendEl.innerHTML = '';
        Object.keys(monthTotals).forEach(month => {
          const li = document.createElement('li');
          li.innerHTML = `<span>${month}</span><strong>$${monthTotals[month].toFixed(0)}</strong>`;
          trendEl.appendChild(li);
        });
      }
    })
    .catch(err => console.error(err));
}

// Initialize rendering based on page content

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('obligations-body')) {
    renderObligations();
  }
  if (document.getElementById('risks-body')) {
    renderRisks();
  }
  if (document.getElementById('controls-body')) {
    renderControls();
  }
  if (document.getElementById('evidence-body')) {
    renderEvidence();
  }
  if (document.getElementById('expenses-body')) {
    renderExpenses();
  }
});
