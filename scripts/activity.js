async function loadDashboardActivity() {
  const list = document.querySelector('[data-recent-activity]');
  if (!list) return;

  try {
    const response = await fetch('../data/activity.json');
    if (!response.ok) throw new Error('Activity data unavailable');
    const items = await response.json();

    list.replaceChildren(
      ...items.slice(0, 5).map((item) => {
        const row = document.createElement('li');
        const title = document.createElement('span');
        const date = document.createElement('strong');

        title.textContent = item.title || 'Governance activity';
        date.textContent = item.area || item.date || 'Recent';

        row.append(title, date);
        return row;
      })
    );
  } catch (error) {
    console.warn('Recent activity could not load:', error);
  }
}

loadDashboardActivity();
