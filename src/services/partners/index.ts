
// This file provides a unified entry point for all partner-related services

// Export from partnerProfileService
export {
  getPartnerByUserId,
  getPartnerById,
  getAllPartners,
  createPartner,
  updatePartner,
  createPartnerFromLead
} from "./partnerProfileService";

// Export from partnerAccountLinkingService
export {
  findUserByEmail,
  linkPartnerToUser,
  getCurrentUserForLinking
} from "./partnerAccountLinkingService";

// Export from partnerStatusService
export {
  updatePartnerStatus
} from "./partnerStatusService";

// Export from partnerApplicationService
export {
  getPartnerApplication,
  getAllApplications,
  submitApplication,
  updateApplicationDocuments,
  reviewApplication
} from "./partnerApplicationService";

// Export from partnerTrialService
export {
  getPartnerTrialServices,
  assignTrialService,
  completeTrialService,
  failTrialService,
  getCompletedTrialCount
} from "./partnerTrialService";

// Export from partnerExpertiseService
export {
  getPartnerExpertise,
  addPartnerExpertise,
  updatePartnerExpertise,
  deletePartnerExpertise
} from "./partnerExpertiseService";

// Export from partnerAssignmentService
export {
  getPartnerAssignments,
  getServiceAssignments,
  assignPartnerToService,
  updateAssignment,
  completeAssignment
} from "./partnerAssignmentService";

// Export from serviceAssignmentService
export {
  getServiceAssignmentMetrics,
  getServiceAssignmentSummary,
  getPartnersByExpertise,
  updateAssignmentStrategy,
  selectPartnerForService,
  assignServiceToPartner
} from "./serviceAssignmentService";
