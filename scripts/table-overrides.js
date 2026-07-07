function applyGovernanceTableOverrides() {
  const config = window.GovernanceTables?.tableConfigs?.licenses;
  if (!config) return false;

  config.columns = [
    ['license', 'License'],
    ['jurisdiction', 'Jurisdiction'],
    ['licenseNumber', 'License Number'],
    ['owner', 'Owner'],
    ['expirationDate', 'Expiration Date'],
    ['renewalStatus', 'Renewal Status'],
    ['linkedEvidence', 'Linked Evidence'],
    ['notes', 'Notes']
  ];

  return true;
}

function waitForGovernanceTables() {
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (applyGovernanceTableOverrides() || attempts > 20) {
      window.clearInterval(timer);
    }
  }, 50);
}

waitForGovernanceTables();
