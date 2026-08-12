import { AIDiagnosis, TreatmentWindowEvaluation, FarmerAdvisory } from '../types';

export function buildFarmerAdvisory(
  diagnosis: AIDiagnosis,
  evaluation: TreatmentWindowEvaluation
): FarmerAdvisory {
  const { decision, actionWindow, reasons } = evaluation;

  let doNotTreatReason: string | undefined;
  if (decision === 'WAIT') {
    doNotTreatReason = reasons[0] || 'Unfavorable weather conditions expected.';
  } else if (decision === 'DO_NOT_ACT') {
    doNotTreatReason = 'Severe weather or chemical hazard risk.';
  }

  let treatmentSummary = 'Follow locally approved agronomic treatment guidance.';
  if (diagnosis.treatmentGuidance.chemical.length > 0) {
    treatmentSummary = diagnosis.treatmentGuidance.chemical[0];
  } else if (diagnosis.treatmentGuidance.biological.length > 0) {
    treatmentSummary = diagnosis.treatmentGuidance.biological[0];
  }

  return {
    summaryTitle: "Today's KisanIQ Advisory",
    crop: diagnosis.crop,
    likelyIssue: diagnosis.likelyIssue,
    riskLevel: diagnosis.severity,
    doNow: diagnosis.immediateActions.slice(0, 3),
    treatmentSummary,
    doNotTreatReason,
    bestTimeToAct: decision === 'ACT_NOW'
      ? 'Act Now (Favorable weather active)'
      : `${actionWindow.dayLabel} (${actionWindow.timeRange})`,
    whyDetails: evaluation.whyExplainability.decisionLogic
  };
}
