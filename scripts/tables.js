const tableConfigs = {
  obligations: {
    label: 'Obligations',
    dataKey: 'obligations',
    categoryKey: 'category',
    statusKey: 'status',
    quickFilters: ['All', 'Due Soon', 'Overdue', 'Completed', 'High Priority'],
    columns: [
      ['title', 'Obligation'],
      ['category', 'Category'],
      ['jurisdiction', 'Jurisdiction'],
      ['frequency', 'Frequency'],
      ['dueDate', 'Due Date'],
      ['owner', 'Owner'],
      ['priority', 'Priority'],
      ['computedStatus', 'Status'],
      ['evidenceRequired', 'Evidence Required'],
      ['notes', 'Notes']
    ]
  },
  documents: {
    label: 'Documents',
    dataKey: 'documents',
    categoryKey: 'category',
    statusKey: 'status',
    quickFilters: ['All', 'Stored', 'Needs Review', 'Draft', 'Pending Proof'],
    columns: [
      ['title', 'Document'],
      ['category', 'Category'],
      ['owner', 'Owner'],
      ['status', 'Status'],
      ['version', 'Version'],
      ['reviewDate', 'Review Date'],
      ['linkedObligations', 'Linked Obligation'],
      ['storageLocation', 'Storage Location']
    ]
  },
  licenses: {
    label: 'Licenses',
    dataKey: 'licenses',
    categoryKey: 'jurisdiction',
    statusKey: 'renewalStatus',
    quickFilters: ['All', 'Active', 'Renewal Soon', 'Expired', 'Pending Proof'],
    columns: [
      ['license', 'License'],
      ['jurisdiction', 'Jurisdiction'],
      ['licenseNumber', 'License Number'],
      ['owner', 'Owner'],
      ['expirationDate', 'Expiration Date'],
      ['renewalStatus', 'Renewal Status'],
      ['evidence', 'Evidence'],
      ['notes', 'Notes']
    ]
  },
  risks: {
    label: 'Risks',
    dataKey: 'risks',
    categoryKey: 'category',
    statusKey: 'status',
    quickFilters: ['All', 'High', 'Medium', 'Low', 'Open', 'Mitigated'],
    columns: [
      ['id', 'Risk ID'],
      ['title', 'Risk'],
      ['category', 'Category'],
      ['likelihood', 'Likelihood'],
      ['impact', 'Impact'],
      ['inherentRisk', 'Inherent Risk'],
      ['mitigation', 'Mitigation'],
      ['owner', 'Owner'],
      ['residualRisk', 'Residual Risk'],
      ['status', 'Status']
    ]
  },
  evidence: {
    label: 'Evidence',
    dataKey: 'evidence',
    categoryKey: 'evidenceType',
    statusKey: 'status',
    quickFilters: ['All', 'Verified', 'Pending', 'Missing', 'Expired'],
    columns: [
      ['title', 'Evidence'],
      ['supports', 'Supports'],
      ['evidenceType', 'Evidence Type'],
      ['owner', 'Owner'],
      ['collectedDate', 'Collected Date'],
      ['expirationDate', 'Expiration Date'],
      ['status', 'Status'],
      ['linkedDocument', 'Linked Document']
    ]
  },
  expenses: {
    label: 'Expenses',
    dataKey: 'expenses',
    categoryKey: 'category',
    statusKey: 'receiptStatus',
    quickFilters: ['All', 'Software', 'Insurance', 'Legal', 'Marketing', 'Office', 'Taxes'],
    columns: [
      ['date', 'Date'],
      ['vendor', 'Vendor'],
      ['category', 'Category'],
      ['amount', 'Amount'],
      ['frequency', 'Frequency'],
      ['receiptStatus', 'Receipt Status'],
      ['linkedEvidence', 'Linked Evidence'],
      ['quarter', 'Quarter'],
      ['notes', 'Notes']
    ]
  },
  vendors: {
    label: 'Vendors',
    dataKey: 'vendors',
    categoryKey: 'category',
    statusKey: 'status',
    quickFilters: ['All', 'Active', 'Review'],
    columns: [
      ['name', 'Vendor'],
      ['category', 'Category'],
      ['owner', 'Owner'],
      ['reviewDate', 'Review Date'],
      ['status', 'Status'],
      ['linkedExpenses', 'Linked Expenses'],
      ['linkedRisks', 'Linked Risks']
    ]
  },
  controls: {
    label: 'Controls',
    dataKey: 'controls',
    categoryKey: 'controlType',
    statusKey: 'status',
    quickFilters: ['All', 'Active', 'Needs Review', 'Draft'],
    columns: [
      ['name', 'Control'],
      ['controlType', 'Control Type'],
      ['owner', 'Owner'],
      ['frequency', 'Frequency'],
      ['evidenceRequired', 'Evidence Required'],
      ['mappedRisk', 'Mapped Risk'],
      ['mappedObligation', 'Mapped Obligation'],
      ['status', 'Status']
    ]
  }
};

function normalize(value) {
  return String(value ?? '').toLowerCase();
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function displayValue(value, key) {
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'None';
  if (key === 'amount') return `$${Number(value || 0).toLocaleString()}`;
  return value ?? 'None';
}

function badgeClass(status) {
  const value = normalize(status);
  if (['verified', 'completed', 'active', 'stored', 'on track', 'controlled', 'mitigated'].includes(value)) return 'success';
  if (['due soon', 'renewal soon', 'pending review', 'needs review', 'draft', 'in progress', 'pending proof', 'medium'].includes(value)) return 'warning';
  if (['overdue', 'missing', 'expired', 'open', 'high'].includes(value)) return 'danger';
  return 'info';
}

function isStatusColumn(key) {
  return ['status', 'computedStatus', 'receiptStatus', 'renewalStatus', 'inherentRisk', 'residualRisk'].includes(key);
}

function enrichRows(type, rows) {
  if (type !== 'obligations') return rows;
  return rows.map((row) => ({
    ...row,
    computedStatus: window.GovernanceDates.getDueStatus(row.dueDate, row.status === 'Completed')
  }));
}

function uniqueOptions(rows, key) {
  return [...new Set(rows.map((row) => row[key]).filter(Boolean))].sort();
}

function createQuickFilters(config) {
  const filters = config.quickFilters || ['All'];
  const row = document.createElement('div');
  row.className = 'quick-filter-row';
  row.dataset.quickFilterRow = 'true';

  filters.forEach((label, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-chip${index === 0 ? ' active' : ''}`;
    button.dataset.quickFilter = slug(label);
    button.textContent = label;
    row.appendChild(button);
  });

  return row;
}

function createToolbar(config, rows) {
  const toolbar = document.createElement('div');
  toolbar.className = 'table-toolbar';

  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = `Search ${config.label.toLowerCase()}`;
  search.dataset.tableSearch = 'true';

  const category = document.createElement('select');
  category.dataset.tableCategory = 'true';
  category.innerHTML = '<option value="">All categories</option>';
  uniqueOptions(rows, config.categoryKey).forEach((option) => {
    category.insertAdjacentHTML('beforeend', `<option value="${option}">${option}</option>`);
  });

  const status = document.createElement('select');
  status.dataset.tableStatus = 'true';
  status.innerHTML = '<option value="">All statuses</option>';
  const statusValues = config.dataKey === 'obligations'
    ? uniqueOptions(rows, 'computedStatus')
    : uniqueOptions(rows, config.statusKey);
  statusValues.forEach((option) => {
    status.insertAdjacentHTML('beforeend', `<option value="${option}">${option}</option>`);
  });

  toolbar.append(search, category, status);
  return toolbar;
}

function quickFilterMatch(type, row, filter) {
  if (!filter || filter === 'all') return true;

  if (type === 'obligations') {
    if (filter === 'due-soon') return row.computedStatus === 'Due Soon';
    if (filter === 'overdue') return row.computedStatus === 'Overdue';
    if (filter === 'completed') return row.computedStatus === 'Completed';
    if (filter === 'high-priority') return row.priority === 'High';
  }

  if (type === 'risks') {
    if (['high', 'medium', 'low'].includes(filter)) return normalize(row.inherentRisk) === filter;
    if (filter === 'open') return ['open', 'needs review'].includes(normalize(row.status));
    if (filter === 'mitigated') return ['mitigated', 'controlled', 'closed', 'in progress'].includes(normalize(row.status)) || normalize(row.residualRisk) === 'low';
  }

  if (type === 'evidence') {
    if (filter === 'pending') return normalize(row.status).includes('pending');
    return normalize(row.status) === filter;
  }

  if (type === 'expenses') {
    return normalize(row.category) === filter;
  }

  if (type === 'licenses') {
    return normalize(row.renewalStatus) === filter;
  }

  if (type === 'documents' || type === 'vendors' || type === 'controls') {
    return normalize(row.status) === filter;
  }

  return true;
}

function renderTable(target, config, rows) {
  const table = document.createElement('table');
  table.className = 'data-table';
  table.innerHTML = `
    <thead>
      <tr>${config.columns.map(([, label]) => `<th>${label}</th>`).join('')}</tr>
    </thead>
    <tbody>
      ${rows.map((row) => `
        <tr>
          ${config.columns.map(([key]) => {
            const value = displayValue(row[key], key);
            return isStatusColumn(key)
              ? `<td><span class="badge ${badgeClass(value)}">${value}</span></td>`
              : `<td>${key === 'title' || key === 'name' || key === 'id' || key === 'license' ? `<strong>${value}</strong>` : value}</td>`;
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  const existing = target.querySelector('table');
  if (existing) existing.replaceWith(table);
  else target.appendChild(table);
}

function applyFilters(type, target, config, rows) {
  const search = normalize(target.querySelector('[data-table-search]')?.value);
  const category = target.querySelector('[data-table-category]')?.value || '';
  const status = target.querySelector('[data-table-status]')?.value || '';
  const quick = target.dataset.activeQuickFilter || 'all';

  const filtered = rows.filter((row) => {
    const textMatch = !search || normalize(Object.values(row).flat().join(' ')).includes(search);
    const categoryMatch = !category || row[config.categoryKey] === category;
    const statusMatch = !status || row[config.statusKey] === status || row.computedStatus === status;
    const quickMatch = quickFilterMatch(type, row, quick);
    return textMatch && categoryMatch && statusMatch && quickMatch;
  });

  renderTable(target, config, filtered);
}

function renderDynamicTable(type, data, selector = '.table-card') {
  const config = tableConfigs[type];
  if (!config) return;

  const target = document.querySelector(`[data-dynamic-table="${type}"]`) || document.querySelector(selector);
  if (!target) return;

  const rows = enrichRows(type, data[config.dataKey] || []);
  target.dataset.activeQuickFilter = 'all';

  target.querySelector('[data-quick-filter-row]')?.remove();
  target.querySelector('.table-toolbar')?.remove();

  const chips = createQuickFilters(config);
  const toolbar = createToolbar(config, rows);
  const heading = target.querySelector('.card-header');
  if (heading) {
    heading.insertAdjacentElement('afterend', chips);
    chips.insertAdjacentElement('afterend', toolbar);
  } else {
    target.prepend(toolbar);
    target.prepend(chips);
  }

  chips.addEventListener('click', (event) => {
    const button = event.target.closest('[data-quick-filter]');
    if (!button) return;
    chips.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.remove('active'));
    button.classList.add('active');
    target.dataset.activeQuickFilter = button.dataset.quickFilter;
    applyFilters(type, target, config, rows);
  });

  toolbar.addEventListener('input', () => applyFilters(type, target, config, rows));
  toolbar.addEventListener('change', () => applyFilters(type, target, config, rows));

  renderTable(target, config, rows);
}

function pageTableType() {
  const page = window.location.pathname.split('/').pop();
  const map = {
    'obligations.html': 'obligations',
    'vault.html': 'documents',
    'licenses.html': 'licenses',
    'risks.html': 'risks',
    'evidence.html': 'evidence',
    'expenses.html': 'expenses',
    'controls.html': 'controls'
  };
  return map[page];
}

async function hydrateCurrentTable() {
  const type = pageTableType();
  if (!type || !window.GovernanceData) return;
  const data = await window.GovernanceData.loadAll();
  renderDynamicTable(type, data);
}

window.GovernanceTables = {
  tableConfigs,
  pageTableType,
  renderDynamicTable,
  hydrateCurrentTable
};
