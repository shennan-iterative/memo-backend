import { base, airtableConfig } from "../config/airtable.js";
import type { 
  CompanySearchResult, 
  PartnerInfo,
  RationaleDetails
} from "../types/interfaces.js";
import { 
  createAirtableError, 
  createNotFoundError,
  createValidationError 
} from "../types/interfaces.js";

interface TableInfo {
	firstCall: {
		tableId: string;
		viewId: string;
	};
	finalInterview: {
		tableId: string;
		viewId: string;
	};
}

let tableInfo: TableInfo | null = null;

async function getTableInfo(): Promise<TableInfo | null> {
	try {
		const response = await fetch(
			`https://api.airtable.com/v0/meta/bases/${airtableConfig.baseId}/tables`,
			{
				headers: {
					Authorization: `Bearer ${airtableConfig.apiKey}`,
				},
			},
		);

		if (!response.ok) {
			throw createAirtableError(`API request failed: ${response.statusText}`, {
				status: response.status,
				statusText: response.statusText
			});
		}

		const data = await response.json();
		const finalInterviewTable = data.tables.find(
			(table: { name: string }) => table.name === "Feedback: Final Interview",
		);
		const firstCallTable = data.tables.find(
			(table: { name: string }) => table.name === "Feedback: Calls",
		);

		if (!finalInterviewTable || !firstCallTable) {
			throw createNotFoundError("Could not find required tables", {
				availableTables: data.tables.map((t: { name: string }) => t.name)
			});
		}

		return {
			firstCall: {
				tableId: firstCallTable.id,
				viewId: firstCallTable.views[0].id,
			},
			finalInterview: {
				tableId: finalInterviewTable.id,
				viewId: finalInterviewTable.views[0].id,
			},
		};
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error) {
			throw error; // Re-throw our custom errors
		}
		throw createAirtableError("Failed to get table info", { cause: error });
	}
}

export async function searchCompanies(
	company: string,
	batch: string,
): Promise<CompanySearchResult[]> {
	if (!company.trim() || !batch.trim()) {
		throw createValidationError("Company and batch are required", { company, batch });
	}

	const records = await base("Applications")
		.select({
			filterByFormula: `AND(FIND("${company}", {Name}) > 0, FIND("${batch}", {Batch}) > 0)`,
		})
		.all();

	return records.map((record) => ({
		id: record.id as string,
		company: (record.get("Name") as string) || "",
		batch: record.get("Batch") as string,
		description: record.get("Company Description") as string,
		attachments: record.get("Attachments (Backup)") as string,
		source: `${record.get("Attribution - Primary")} -- ${
			record.get("Attribution - Referrer Type") || "N/A"
		}` as string,
		industry: record.get("Sector") as string,
		location: record.get("Country") as string,
		feedback: {
			first: {
				text: record.get("First Call Feedback") as string,
				partner: (record.get("partner_firstCall") as string[]) || [],
			},
			final: {
				text: record.get("Final Call Feedback") as string,
				partner: (record.get("partner_finalInterview") as string[]) || [],
			},
		},
		rationale: [record.get("Investment Rationale") as string],
	}));
}

export async function getPartnerDetails(
	partnerId: string,
): Promise<PartnerInfo> {
	if (!partnerId.trim()) {
		throw createValidationError("Partner ID is required");
	}

	try {
		const partner = await base("Venture Partners")
			.select({
				filterByFormula: `{Record ID} = "${partnerId}"`,
			})
			.all();

		if (!partner.length) {
			throw createNotFoundError(`Partner not found with ID: ${partnerId}`);
		}

		return {
			name: (partner[0]?.fields?.Name as string) || "",
			email: (partner[0]?.fields?.Email as string) || "",
		};
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error) {
			throw error; // Re-throw our custom errors
		}
		throw createAirtableError("Failed to get partner details", { cause: error });
	}
}

export async function getRationale(rationaleId: string): Promise<RationaleDetails> {
	const rationaleRecords = await base("Investment Rationale")
		.select({
			filterByFormula: `RECORD_ID() = "${rationaleId}"`,
		})
		.all();

	if (!rationaleRecords || rationaleRecords.length === 0) {
		throw createNotFoundError(`Rationale not found with ID: ${rationaleId}`);
	}

	const {
		"application_recordID (from Company)": _applicationRecordId,
		"Lead GP": _leadGP,
		Company,
		...rest
	} = rationaleRecords[0].fields;

	return rest;
}

export async function getVideoRecordingLinks(applicationId: string) {
	if (!applicationId?.trim()) {
		throw createValidationError("Application ID is required");
	}

	try {
		// Get the final interview URL and video recording links
		if (!tableInfo) {
			tableInfo = await getTableInfo();
			if (!tableInfo) {
				throw createAirtableError("Failed to get table information");
			}
		}

		const [firstCallFeedbackRecords, finalInterviewFeedback] = await Promise.all([
			base("Feedback: Calls")
				.select({
					filterByFormula: `{application_recordID (from Application)} = "${applicationId}"`,
				})
				.all(),
			base("Feedback: Final Interview")
				.select({
					filterByFormula: `{application_recordID (from Application)} = "${applicationId}"`,
				})
				.all(),
		]).catch(error => {
			throw createAirtableError("Failed to fetch feedback records", { cause: error });
		});

		const firstCallVideoRecording = String(
			firstCallFeedbackRecords[0]?.fields?.["Video Recording"] || "",
		);
		const finalInterviewVideoRecording = String(
			finalInterviewFeedback[0]?.fields?.["Video Recording"] || "",
		);

		const firstCallUrl =
			tableInfo && firstCallFeedbackRecords[0]
				? `https://airtable.com/${airtableConfig.baseId}/${tableInfo.firstCall.tableId}/${tableInfo.firstCall.viewId}/${firstCallFeedbackRecords[0].id}`
				: "";

		const finalInterviewUrl =
			tableInfo && finalInterviewFeedback[0]
				? `https://airtable.com/${airtableConfig.baseId}/${tableInfo.finalInterview.tableId}/${tableInfo.finalInterview.viewId}/${finalInterviewFeedback[0].id}`
				: "";

		return {
			first: firstCallVideoRecording,
			firstUrl: firstCallUrl,
			final: finalInterviewVideoRecording,
			finalUrl: finalInterviewUrl,
		};
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error) {
			throw error; // Re-throw our custom errors
		}
		throw createAirtableError("Failed to get video recording links", { cause: error });
	}
}
