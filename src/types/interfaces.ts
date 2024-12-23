interface FeedbackBase {
    text: string;
    url?: string;
}

interface SearchFeedback extends FeedbackBase {
    partner: string[];
}

interface EnhancedFeedback extends FeedbackBase {
    partner: PartnerInfo;
}

export interface PartnerInfo {
	name: string;
	email: string;
}

export interface CompanySearchResult {
	id: string;
	company: string;
	batch: string;
	description: string;
	attachments: string;
	source: string;
	industry: string;
	location: string;
	feedback: {
		first: SearchFeedback;
		final: SearchFeedback;
	};
	rationale: string[];
}

// Airtable specific types
interface AirtableCollaborator {
    id: string;
    email: string;
    name: string;
}

interface AirtableAttachment {
    id: string;
    url: string;
    filename: string;
    size: number;
    type: string;
}

// Union of possible Airtable field values
type AirtableValue = 
    | string 
    | number 
    | boolean 
    | AirtableCollaborator
    | readonly AirtableCollaborator[]
    | readonly string[]
    | readonly AirtableAttachment[]
    | null
    | undefined;

export interface RationaleDetails {
    summary?: string;
    strengths?: string;
    risks?: string;
    market?: string;
    competition?: string;
    product?: string;
    team?: string;
    traction?: string;
    [key: string]: AirtableValue;
}

export interface VideoRecordings {
    first: string;
    final: string;
}

export interface EnhancedCompanyResult {
    id: string;
    company: string;
    batch: string;
    description: string;
    attachments: string;
    source: string;
    industry: string;
    location: string;
    feedback: {
        first: EnhancedFeedback;
        final: EnhancedFeedback;
    };
    rationale: string[];
    rationale_details: RationaleDetails;
    video_recordings: VideoRecordings;
}

export interface Vote {
    decision: 'Invest' | 'Reject';
    reason: string;
}

export interface MemoVotes {
    hsuKen: Vote;
    brian: Vote;
    diligenceLead: Vote;
}

// Custom error types
export interface AppError {
    statusCode: number;
    code: string;
    message: string;
    details?: unknown;
}

export type ValidationError = AppError & {
    statusCode: 400;
    code: 'VALIDATION_ERROR';
};

export type NotFoundError = AppError & {
    statusCode: 404;
    code: 'NOT_FOUND';
};

export type AirtableError = AppError & {
    statusCode: 502;
    code: 'AIRTABLE_ERROR';
};

export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
}

// Error factory functions
export const createValidationError = (message: string, details?: unknown): ValidationError => ({
    statusCode: 400,
    code: 'VALIDATION_ERROR',
    message,
    details
});

export const createNotFoundError = (message: string, details?: unknown): NotFoundError => ({
    statusCode: 404,
    code: 'NOT_FOUND',
    message,
    details
});

export const createAirtableError = (message: string, details?: unknown): AirtableError => ({
    statusCode: 502,
    code: 'AIRTABLE_ERROR',
    message,
    details
});
