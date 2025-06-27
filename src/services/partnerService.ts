
// This file is kept for backward compatibility and to provide a unified access point
// It re-exports all functionalities from the modular services

// Re-export from partnerProfileService
export {
  getPartnerByUserId,
  getPartnerById,
  getAllPartners,
  createPartner,
  updatePartner
} from "./partners/partnerProfileService";

// Re-export from partnerStatusService
export {
  updatePartnerStatus
} from "./partners/partnerStatusService";

// Re-export from partnerApplicationService
export {
  getPartnerApplication,
  getAllApplications,
  submitApplication,
  updateApplicationDocuments,
  reviewApplication
} from "./partners/partnerApplicationService";

// Re-export from partnerTrialService
export {
  getPartnerTrialServices,
  assignTrialService,
  completeTrialService,
  failTrialService,
  getCompletedTrialCount
} from "./partners/partnerTrialService";

// Re-export from partnerExpertiseService
export {
  getPartnerExpertise,
  addPartnerExpertise,
  updatePartnerExpertise,
  deletePartnerExpertise
} from "./partners/partnerExpertiseService";

// Re-export from partnerAssignmentService
export {
  getPartnerAssignments,
  getServiceAssignments,
  assignPartnerToService,
  updateAssignment,
  completeAssignment
} from "./partners/partnerAssignmentService";
