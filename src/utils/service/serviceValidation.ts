
import { 
  TITLE_MIN_WORDS, 
  TITLE_MAX_WORDS, 
  DESCRIPTION_MIN_WORDS, 
  DESCRIPTION_MAX_WORDS,
  FEATURE_MIN_WORDS,
  FEATURE_MAX_WORDS,
  FAQ_QUESTION_MIN_WORDS,
  FAQ_QUESTION_MAX_WORDS,
  FAQ_ANSWER_MIN_WORDS, 
  FAQ_ANSWER_MAX_WORDS,
  countWords
} from "@/hooks/service/useServiceForm";

// Helper function to sanitize string inputs
export function sanitizeString(value: string | null | undefined): string | null {
  if (value === undefined || value === null) return null;
  return value.trim();
}

// Basic validation of service data
export function validateServiceData(service: any, isUpdate: boolean = false): void {
  if (!isUpdate && (!service || !service.title || typeof service.price !== 'number')) {
    throw new Error("Invalid service data");
  }

  if (service.price !== undefined && service.price < 0) {
    throw new Error("Price cannot be negative");
  }

  if (service.title !== undefined && (typeof service.title !== 'string' || service.title.trim() === '')) {
    throw new Error("Title cannot be empty");
  }

  if (service.status !== undefined && !['draft', 'active', 'archived'].includes(service.status)) {
    throw new Error("Invalid status value");
  }

  if (service.features !== undefined && !Array.isArray(service.features)) {
    throw new Error("Features must be an array");
  }

  if (service.faqs !== undefined && !Array.isArray(service.faqs)) {
    throw new Error("FAQs must be an array");
  }
}

// Validate word counts for service content
export function validateWordCounts(service: any, isUpdate: boolean = false): void {
  // Validate word count for title if provided
  if (service.title !== undefined) {
    const titleWords = countWords(service.title);
    if (titleWords < TITLE_MIN_WORDS || titleWords > TITLE_MAX_WORDS) {
      throw new Error(`Title must be between ${TITLE_MIN_WORDS} and ${TITLE_MAX_WORDS} words.`);
    }
  }

  // Validate word count for description if provided
  if (service.description !== undefined) {
    const descriptionWords = countWords(service.description);
    if (descriptionWords < DESCRIPTION_MIN_WORDS || descriptionWords > DESCRIPTION_MAX_WORDS) {
      throw new Error(`Description must be between ${DESCRIPTION_MIN_WORDS} and ${DESCRIPTION_MAX_WORDS} words.`);
    }
  }

  // Validate features if provided
  if (service.features !== undefined && service.features.length > 0) {
    for (const feature of service.features) {
      const featureWords = countWords(feature);
      if (featureWords < FEATURE_MIN_WORDS || featureWords > FEATURE_MAX_WORDS) {
        throw new Error(`Each feature must be between ${FEATURE_MIN_WORDS} and ${FEATURE_MAX_WORDS} words.`);
      }
    }
  }

  // Validate FAQs if provided
  if (service.faqs !== undefined && service.faqs.length > 0) {
    for (const faq of service.faqs) {
      const questionWords = countWords(faq.question);
      if (questionWords < FAQ_QUESTION_MIN_WORDS || questionWords > FAQ_QUESTION_MAX_WORDS) {
        throw new Error(`Each FAQ question must be between ${FAQ_QUESTION_MIN_WORDS} and ${FAQ_QUESTION_MAX_WORDS} words.`);
      }

      const answerWords = countWords(faq.answer);
      if (answerWords < FAQ_ANSWER_MIN_WORDS || answerWords > FAQ_ANSWER_MAX_WORDS) {
        throw new Error(`Each FAQ answer must be between ${FAQ_ANSWER_MIN_WORDS} and ${FAQ_ANSWER_MAX_WORDS} words.`);
      }
    }
  }
}
