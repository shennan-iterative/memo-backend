import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints.js";
import type { EnhancedCompanyResult } from "../../types/interfaces.js";

export const generateVotingSection = (
	company: EnhancedCompanyResult,
): BlockObjectRequest[] => {
	return [
		// Voting Section
		{
			object: "block" as const,
			type: "heading_2" as const,
			heading_2: {
				rich_text: [{ type: "text" as const, text: { content: "Voting" } }],
			},
		},
		{
			object: "block" as const,
			type: "paragraph" as const,
			paragraph: {
				rich_text: [
					{
						type: "text" as const,
						text: {
							content:
								'[For invest decisions, write 1-2 sentences on the "bet" we are taking: what is the opportunity we are backing? For decline decisions, write 1-2 decisions on the key reasons why.]',
						},
					},
				],
			},
		},
		// Hsu Ken Vote
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [{ type: "text" as const, text: { content: "Hsu Ken" } }],
				is_toggleable: true,
				children: [
					{
						object: "block" as const,
						type: "table" as const,
						table: {
							table_width: 2,
							has_column_header: true,
							has_row_header: false,
							children: [
								{
									type: "table_row",
									table_row: {
										cells: [
											[
												{
													type: "text" as const,
													text: { content: "Vote\n(Invest or Reject)" },
												},
											],
											[
												{
													type: "text" as const,
													text: { content: "Reason - Articulate the Vote" },
												},
											],
										],
									},
								},
								{
									type: "table_row",
									table_row: {
										cells: [
											[{ type: "text" as const, text: { content: "" } }],
											[{ type: "text" as const, text: { content: "" } }],
										],
									},
								},
							],
						},
					},
				],
			},
		},
		// Brian Vote
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [{ type: "text" as const, text: { content: "Brian" } }],
				is_toggleable: true,
				children: [
					{
						object: "block" as const,
						type: "table" as const,
						table: {
							table_width: 2,
							has_column_header: true,
							has_row_header: false,
							children: [
								{
									type: "table_row",
									table_row: {
										cells: [
											[
												{
													type: "text" as const,
													text: { content: "Vote\n(Invest or Reject)" },
												},
											],
											[
												{
													type: "text" as const,
													text: { content: "Reason - Articulate the Vote" },
												},
											],
										],
									},
								},
								{
									type: "table_row",
									table_row: {
										cells: [
											[{ type: "text" as const, text: { content: "" } }],
											[{ type: "text" as const, text: { content: "" } }],
										],
									},
								},
							],
						},
					},
				],
			},
		},
		// Diligence Lead Vote
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{ type: "text" as const, text: { content: "Diligence Lead" } },
				],
				is_toggleable: true,
				children: [
					{
						object: "block" as const,
						type: "table" as const,
						table: {
							table_width: 2,
							has_column_header: true,
							has_row_header: false,
							children: [
								{
									type: "table_row",
									table_row: {
										cells: [
											[
												{
													type: "text" as const,
													text: { content: "Vote\n(Invest or Reject)" },
												},
											],
											[
												{
													type: "text" as const,
													text: { content: "Reason - Articulate the Vote" },
												},
											],
										],
									},
								},
								{
									type: "table_row",
									table_row: {
										cells: [
											[{ type: "text" as const, text: { content: "" } }],
											[{ type: "text" as const, text: { content: "" } }],
										],
									},
								},
							],
						},
					},
				],
			},
		},
	];
};
