import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import type {
	CompanySearchResult,
	EnhancedCompanyResult,
	AppError,
	ErrorResponse
} from "../types/interfaces.js";
import { createValidationError } from "../types/interfaces.js";
import {
	searchCompanies,
	getPartnerDetails,
	getRationale,
	getVideoRecordingLinks,
} from "../services/airtable.js";

export const searchCompany = async (c: Context) => {
	try {
		const { company, batch } = c.req.query();

		if (!company || typeof company !== "string") {
			throw createValidationError("Search term is required", { company });
		}

		if (!batch || typeof batch !== "string") {
			throw createValidationError("Batch is required", { batch });
		}

		const results = await searchCompanies(company, batch);

		if (results.length > 0) {
			const firstResult = results[0];
			const [GP, firstCallPartner] = await Promise.all([
				getPartnerDetails(
					Array.isArray(firstResult?.feedback?.final?.partner)
						? firstResult?.feedback?.final?.partner[0]
						: "",
				),
				getPartnerDetails(
					Array.isArray(firstResult?.feedback?.first?.partner)
						? firstResult?.feedback?.first?.partner[0]
						: "",
				),
			]);

			const [rationale, videoLinksAndUrl] = await Promise.all([
				getRationale(
					Array.isArray(firstResult?.rationale)
						? firstResult?.rationale[0]
						: "",
				),
				getVideoRecordingLinks(firstResult?.id),
			]);

			// Transform the first result into an enhanced result
			const enhancedResults: (CompanySearchResult | EnhancedCompanyResult)[] = [
				...results,
			];
			if (enhancedResults.length > 0) {
				const baseResult = enhancedResults[0];
				const enhanced: EnhancedCompanyResult = {
					...baseResult,
					feedback: {
						first: {
							text: baseResult.feedback.first.text[0],
							partner: firstCallPartner,
							url: videoLinksAndUrl.firstUrl,
						},
						final: {
							text: baseResult.feedback.final.text[0],
							partner: GP,
							url: videoLinksAndUrl.finalUrl,
						},
					},
					rationale_details: rationale,
					video_recordings: {
						first: videoLinksAndUrl.first,
						final: videoLinksAndUrl.final,
					},
				};
				enhancedResults[0] = enhanced;
			}

			return c.json({
				success: true,
				results: enhancedResults,
				count: enhancedResults.length,
			});
		}

		return c.json({
			success: true,
			results: [],
			count: 0,
		});
	} catch (error) {
		console.error("Search error:", error);
		
		// Handle our custom errors
		if (error && typeof error === 'object' && 'code' in error) {
			const appError = error as AppError;
			const errorResponse: ErrorResponse = {
				success: false,
				error: {
					code: appError.code,
					message: appError.message,
					details: appError.details
				}
			};
			return c.json(errorResponse, appError.statusCode as StatusCode);
		}

		// Handle unexpected errors
		return c.json(
			{
				success: false,
				error: {
					code: 'INTERNAL_ERROR',
					message: 'An unexpected error occurred',
					details: process.env.NODE_ENV === 'development' ? error : undefined
				}
			},
			500 as StatusCode
		);
	}
};
