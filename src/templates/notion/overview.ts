import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints.js";
import type { EnhancedCompanyResult } from "../../types/interfaces.js";

export const generateCompanyOverview = (
	company: EnhancedCompanyResult,
): BlockObjectRequest[] => {
	return [
		// Overview Section
		{
			object: "block" as const,
			type: "heading_2" as const,
			heading_2: {
				rich_text: [{ type: "text" as const, text: { content: "Overview" } }],
				color: "blue_background",
			},
		},
		// Overview Table
		{
			object: "block" as const,
			type: "table" as const,
			table: {
				table_width: 5,
				has_column_header: true,
				has_row_header: false,
				children: [
					{
						type: "table_row",
						table_row: {
							cells: [
								[{ type: "text" as const, text: { content: "Company" } }],
								[{ type: "text" as const, text: { content: "Industry" } }],
								[{ type: "text" as const, text: { content: "Geography" } }],
								[{ type: "text" as const, text: { content: "Source" } }],
								[
									{
										type: "text" as const,
										text: { content: "Round Construct" },
									},
								],
							],
						},
					},
					{
						type: "table_row",
						table_row: {
							cells: [
								[
									{
										type: "text" as const,
										text: {
											content: `${company.company}\n${company.description}`,
										},
									},
								],
								[
									{
										type: "text" as const,
										text: { content: company.industry },
									},
								],
								[
									{
										type: "text" as const,
										text: { content: company.location },
									},
								],
								[
									{
										type: "text" as const,
										text: { content: company.feedback.final.partner.name },
									},
								],
								[
									{
										type: "text" as const,
										text: { content: company.batch },
									},
								],
							],
						},
					},
				],
			},
		},
	];
};
