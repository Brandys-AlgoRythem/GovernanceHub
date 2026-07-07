async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }
  return response.json();
}

const GovernanceData = {
  loadJSON,
  basePath() {
    return window.location.pathname.includes('/pages/') ? '../data/' : './data/';
  },
  async loadAll() {
    const base = this.basePath();
    const [business, obligations, documents, evidence, risks, controls, expenses, vendors, activity] = await Promise.all([
      loadJSON(`${base}business.json`),
      loadJSON(`${base}obligations.json`),
      loadJSON(`${base}documents.json`),
      loadJSON(`${base}evidence.json`),
      loadJSON(`${base}risks.json`),
      loadJSON(`${base}controls.json`),
      loadJSON(`${base}expenses.json`),
      loadJSON(`${base}vendors.json`),
      loadJSON(`${base}activity.json`)
    ]);

    return { business, obligations, documents, evidence, risks, controls, expenses, vendors, activity };
  }
};

window.loadJSON = loadJSON;
window.GovernanceData = GovernanceData;
