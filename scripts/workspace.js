const WORKSPACE_KEY = 'governanceHubWorkspace';

const defaultWorkspace = {
  businessName: 'SyNERDgy LLC',
  entityType: 'Limited Liability Company',
  state: 'Kentucky',
  ownerName: 'Brandy',
  primaryConcern: 'Evidence readiness',
  operatingCadence: 'Monthly review'
};

function readWorkspace() {
  try {
    return { ...defaultWorkspace, ...JSON.parse(localStorage.getItem(WORKSPACE_KEY) || '{}') };
  } catch (error) {
    return { ...defaultWorkspace };
  }
}

function saveWorkspace(values) {
  const next = { ...readWorkspace(), ...values };
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(next));
  hydrateWorkspace(next);
  return next;
}

function resetWorkspace() {
  localStorage.removeItem(WORKSPACE_KEY);
  hydrateWorkspace(defaultWorkspace);
  document.querySelectorAll('[data-workspace-input]').forEach((input) => {
    const key = input.dataset.workspaceInput;
    input.value = defaultWorkspace[key] || '';
  });
}

function hydrateWorkspace(workspace = readWorkspace()) {
  document.querySelectorAll('[data-workspace-value]').forEach((node) => {
    const key = node.dataset.workspaceValue;
    node.textContent = workspace[key] || defaultWorkspace[key] || 'Not set';
  });

  document.querySelectorAll('[data-workspace-input]').forEach((input) => {
    const key = input.dataset.workspaceInput;
    if (!input.value) input.value = workspace[key] || defaultWorkspace[key] || '';
  });

  document.querySelectorAll('[data-workspace-status]').forEach((node) => {
    node.textContent = localStorage.getItem(WORKSPACE_KEY) ? 'Custom sample saved' : 'Using starter sample';
  });
}

function bindWorkspaceForm() {
  const form = document.querySelector('[data-workspace-form]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    saveWorkspace(Object.fromEntries(data.entries()));
  });

  const reset = document.querySelector('[data-workspace-reset]');
  if (reset) {
    reset.addEventListener('click', resetWorkspace);
  }
}

hydrateWorkspace();
bindWorkspaceForm();

window.GovernanceWorkspace = {
  readWorkspace,
  saveWorkspace,
  resetWorkspace,
  hydrateWorkspace
};
