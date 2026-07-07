function parseDate(value) {
  if (!value || value === 'Stored' || value === 'As Needed' || value === 'Review Required' || value === 'Pending') {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getDueStatus(dueDate, completed = false) {
  if (completed) return 'Completed';

  const due = parseDate(dueDate);
  if (!due) return 'Needs Review';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Overdue';
  if (diffDays <= 30) return 'Due Soon';
  return 'On Track';
}

function isWithinDays(dueDate, days = 30) {
  const due = parseDate(dueDate);
  if (!due) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= days;
}

window.GovernanceDates = {
  parseDate,
  getDueStatus,
  isWithinDays
};
