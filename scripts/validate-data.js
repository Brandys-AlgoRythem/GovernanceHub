const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const requiredFiles = [
  'index.html',
  'README.md',
  'data/business.json',
  'data/obligations.json',
  'data/documents.json',
  'data/evidence.json',
  'data/risks.json',
  'data/controls.json',
  'data/expenses.json',
  'data/vendors.json',
  'data/licenses.json',
  'data/activity.json',
  'pages/dashboard.html',
  'pages/business-profile.html',
  'pages/obligations.html',
  'pages/vault.html',
  'pages/licenses.html',
  'pages/risks.html',
  'pages/controls.html',
  'pages/evidence.html',
  'pages/expenses.html',
  'pages/roadmap.html',
  'styles/tokens.css',
  'styles/base.css',
  'styles/layout.css',
  'styles/hive.css',
  'styles/cards.css',
  'styles/tables.css',
  'styles/badges.css',
  'styles/pages.css',
  'styles/responsive.css',
  'scripts/navigation.js',
  'scripts/data.js',
  'scripts/dates.js',
  'scripts/metrics.js',
  'scripts/tables.js',
  'scripts/app.js',
  'scripts/activity.js'
];

const jsonFiles = [
  'business',
  'obligations',
  'documents',
  'evidence',
  'risks',
  'controls',
  'expenses',
  'vendors',
  'licenses',
  'activity'
];

const errors = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function loadJSON(name) {
  const relativePath = `data/${name}.json`;
  try {
    return JSON.parse(read(relativePath));
  } catch (error) {
    errors.push(`Could not parse ${relativePath}: ${error.message}`);
    return [];
  }
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function addIds(map, collection, prefix, label) {
  asArray(collection).forEach((item) => {
    if (!item.id) {
      errors.push(`${label} record missing id`);
      return;
    }
    if (!item.id.startsWith(prefix)) {
      errors.push(`${label} id ${item.id} should start with ${prefix}`);
    }
    if (map.has(item.id)) {
      errors.push(`Duplicate id found: ${item.id}`);
    }
    map.set(item.id, label);
  });
}

function validateLinks(records, fields, idMap, label) {
  asArray(records).forEach((record) => {
    fields.forEach((field) => {
      asArray(record[field]).forEach((id) => {
        if (typeof id !== 'string') return;
        if (!/^(OBL|DOC|EVD|RISK|CTRL|EXP|VND|LIC)-/.test(id)) return;
        if (!idMap.has(id)) {
          errors.push(`${label} ${record.id || record.title || record.name} references missing ${field}: ${id}`);
        }
      });
    });
  });
}

function validatePageAssets(pagePath) {
  const html = read(pagePath);
  const dir = path.dirname(pagePath);
  const assetPattern = /(href|src)="([^"]+)"/g;
  let match;
  while ((match = assetPattern.exec(html))) {
    const target = match[2];
    if (target.startsWith('http') || target.startsWith('#') || target.startsWith('mailto:')) continue;
    const resolved = path.normalize(path.join(dir, target));
    if (!exists(resolved)) {
      errors.push(`${pagePath} references missing asset ${target}`);
    }
  }
}

function validateNavigation(pagePath) {
  const html = read(pagePath);
  const dir = path.dirname(pagePath);
  const linkPattern = /href="([^"]+\.html)"/g;
  let match;
  while ((match = linkPattern.exec(html))) {
    const target = match[1];
    if (target.startsWith('http')) continue;
    const resolved = path.normalize(path.join(dir, target));
    if (!exists(resolved)) {
      errors.push(`${pagePath} links to missing page ${target}`);
    }
  }
}

requiredFiles.forEach((file) => {
  if (!exists(file)) errors.push(`Missing required file: ${file}`);
});

const data = Object.fromEntries(jsonFiles.map((name) => [name, loadJSON(name)]));
const idMap = new Map();

addIds(idMap, data.obligations, 'OBL-', 'obligation');
addIds(idMap, data.documents, 'DOC-', 'document');
addIds(idMap, data.evidence, 'EVD-', 'evidence');
addIds(idMap, data.risks, 'RISK-', 'risk');
addIds(idMap, data.controls, 'CTRL-', 'control');
addIds(idMap, data.expenses, 'EXP-', 'expense');
addIds(idMap, data.vendors, 'VND-', 'vendor');
addIds(idMap, data.licenses, 'LIC-', 'license');

validateLinks(data.obligations, ['linkedEvidence', 'linkedDocuments', 'linkedRisks'], idMap, 'obligation');
validateLinks(data.documents, ['linkedObligations', 'linkedEvidence'], idMap, 'document');
validateLinks(data.evidence, ['supports', 'linkedDocument', 'linkedRisks'], idMap, 'evidence');
validateLinks(data.risks, ['linkedControls', 'linkedObligations', 'linkedEvidence'], idMap, 'risk');
validateLinks(data.controls, ['linkedEvidence', 'mappedRisk', 'mappedObligation'], idMap, 'control');
validateLinks(data.expenses, ['linkedEvidence'], idMap, 'expense');
validateLinks(data.vendors, ['linkedExpenses', 'linkedRisks'], idMap, 'vendor');
validateLinks(data.licenses, ['linkedEvidence'], idMap, 'license');

const pages = requiredFiles.filter((file) => file.endsWith('.html'));
pages.forEach((page) => {
  validatePageAssets(page);
  validateNavigation(page);
});

if (errors.length) {
  console.error('Governance Hub validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Governance Hub validation passed.');
