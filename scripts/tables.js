const tableConfigs = {
  obligations: {
    label: 'Obligations',
    dataKey: 'obligations',
    categoryKey: 'category',
    statusKey: 'status',
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
  risks: {
    label: 'Risks',
    dataKey: 'risks',
    categoryKey: 'category',
    statusKey: 'status',
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

function displayValue(value, key) {
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'None';
  if (key === 'amount') return `$${Number(value || 0).toLocaleString()}`;
  return value ?? 'None';
}

function badgeClass(status) {
  const value = normalize(status);
  if (['verified', 'completed', 'active', 'stored', 'on track', 'controlled'].includes(value)) return 'success';
  if (['due soon', 'pending review', 'needs review', 'draft', 'in progress', 'pending proof'].includes(value)) return 'warning';
  if (['overdue', 'missing', 'expired', 'open', 'high'].includes(value)) return 'danger';
  return 'info';
}

function isStatusColumn(key) {
  return ['status', 'computedStatus', 'receiptStatus', 'inherentRisk', 'residualRisk'].includes(key);
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
  uniqueOptions(rows, config.statusKey).forEach((option) => {
    status.insertAdjacentHTML('beforeend', `<option value="${option}">${option}</option>`);
  });

  toolbar.append(search, category, status);
  return toolbar;
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
              : `<td>${key === 'title' || key === 'name' || key === 'id' ? `<strong>${value}</strong>` : value}</td>`;
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  `;

  const existing = target.querySelector('table');
  if (existing) existing.replaceWith(table);
  else target.appendChild(table);
}

function applyFilters(target, config, rows) {
  const search = normalize(target.querySelector('[data-table-search]')?.value);
  const category = target.querySelector('[data-table-category]')?.value || '';
  const status = target.querySelector('[data-table-status]')?.value || '';

  const filtered = rows.filter((row) => {
    const textMatch = !search || normalize(Object.values(row).flat().join(' ')).includes(search);
    const categoryMatch = !category || row[config.categoryKey] === category;
    const statusMatch = !status || row[config.statusKey] === status || row.computedStatus === status;
    return textMatch && categoryMatch && statusMatch;
  });

  renderTable(target, config, filtered);
}

function renderDynamicTable(type, data, selector = '.table-card') {
  const config = tableConfigs[type];
  if (!config) return;

  const target = document.querySelector(`[data-dynamic-table="${type}"]`) || document.querySelector(selector);
  if (!target) return;

  const rows = enrichRows(type, data[config.dataKey] || []);
  const oldToolbar = target.querySelector('.table-toolbar');
  if (oldToolbar) oldToolbar.remove();

  const toolbar = createToolbar(config, rows);
  const heading = target.querySelector('.card-header');
  if (heading) heading.insertAdjacentElement('afterend', toolbar);
  else target.prepend(toolbar);

  toolbar.addEventListener('input', () => applyFilters(target, config, rows));
  toolbar.addEventListener('change', () => applyFilters(target, config, rows));

  renderTable(target, config, rows);
}

function pageTableType() {
  const page = window.location.pathname.split('/').pop();
  const map = {
    'obligations.html': 'obligations',
    'vault.html': 'documents',
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
  renderDynamicTable,
  hydrateCurrentTable
};
