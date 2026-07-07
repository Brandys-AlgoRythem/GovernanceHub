function countBy(items, predicate) {
  return items.filter(predicate).length;
}

function sumBy(items, picker) {
  return items.reduce((total, item) => total + Number(picker(item) || 0), 0);
}

function calculateDocumentScore(documents) {
  if (!documents.length) return 0;
  const ready = countBy(documents, (doc) => ['Stored', 'Template'].includes(doc.status));
  return Math.round((ready / documents.length) * 100);
}

function calculateObligationScore(obligations) {
  if (!obligations.length) return 0;
  const ready = countBy(obligations, (item) => ['Completed', 'On Track'].includes(item.status));
  return Math.round((ready / obligations.length) * 100);
}

function calculateEvidenceScore(evidence) {
  if (!evidence.length) return 0;
  const verified = countBy(evidence, (item) => item.status === 'Verified');
  return Math.round((verified / evidence.length) * 100);
}

function calculateRiskScore(risks) {
  if (!risks.length) return 100;
  const controlled = countBy(risks, (risk) => ['Closed', 'Controlled', 'In Progress'].includes(risk.status));
  return Math.round((controlled / risks.length) * 100);
}

function latestExpenseDate(expenses) {
  const dates = expenses
    .map((expense) => new Date(expense.date))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b - a);
  return dates[0] || new Date();
}

function calculateDashboardMetrics(data) {
  const obligations = data.obligations || [];
  const risks = data.risks || [];
  const documents = data.documents || [];
  const evidence = data.evidence || [];
  const expenses = data.expenses || [];

  const dueDates = window.GovernanceDates;
  const totalObligations = obligations.length;
  const upcomingDeadlines = countBy(obligations, (item) => dueDates.isWithinDays(item.dueDate, 30));
  const overdueObligations = countBy(obligations, (item) => dueDates.getDueStatus(item.dueDate, item.status === 'Completed') === 'Overdue');
  const openRisks = countBy(risks, (risk) => !['Closed', 'Controlled'].includes(risk.status));
  const highRisks = countBy(risks, (risk) => risk.inherentRisk === 'High');
  const totalDocuments = documents.length;
  const verifiedEvidence = countBy(evidence, (item) => item.status === 'Verified');
  const missingEvidence = countBy(evidence, (item) => item.status === 'Missing');

  const latestDate = latestExpenseDate(expenses);
  const latestMonth = latestDate.getMonth();
  const latestQuarter = `Q${Math.floor(latestMonth / 3) + 1}`;
  const monthlyExpenses = sumBy(expenses, (expense) => {
    const date = new Date(expense.date);
    return date.getMonth() === latestMonth ? expense.amount : 0;
  });
  const quarterlyExpenses = sumBy(expenses, (expense) => expense.quarter === latestQuarter ? expense.amount : 0);

  const documentScore = calculateDocumentScore(documents);
  const obligationScore = calculateObligationScore(obligations);
  const evidenceScore = calculateEvidenceScore(evidence);
  const riskScore = calculateRiskScore(risks);
  const healthScore = Math.round((documentScore + obligationScore + evidenceScore + riskScore) / 4);

  return {
    totalObligations,
    upcomingDeadlines,
    overdueObligations,
    openRisks,
    highRisks,
    totalDocuments,
    verifiedEvidence,
    missingEvidence,
    monthlyExpenses,
    quarterlyExpenses,
    documentScore,
    obligationScore,
    evidenceScore,
    riskScore,
    healthScore
  };
}

window.GovernanceMetrics = {
  calculateDashboardMetrics
};
