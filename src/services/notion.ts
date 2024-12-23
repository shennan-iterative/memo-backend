import { Client } from "@notionhq/client";
import { NOTION_CONFIG } from "../config/notion.js";
import type { EnhancedCompanyResult } from "../types/interfaces.js";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import { generateCompanyOverview } from "../templates/notion/overview.js";
import { generateMemoInfo } from "../templates/notion/info_section.js";
import { generateVotingSection } from "../templates/notion/voting.js";
import { generateMemoOpinion } from "../templates/notion/memo_opinion.js";
import { generateThesis } from "../templates/notion/thesis.js";
import { generateResources } from "../templates/notion/resources.js";

const notion = new Client({
	auth: NOTION_CONFIG.ACCESS_TOKEN,
});

const dividerBlock = {
	object: "block" as const,
	type: "divider" as const,
	divider: {},
};

export const createCompanyPage = async (company: EnhancedCompanyResult) => {
	try {
		const response = await notion.pages.create({
			parent: { database_id: NOTION_CONFIG.DATABASE_ID },
			properties: {
				Name: {
					title: [
						{ type: "text" as const, text: { content: company.company } },
					],
				},
			},
			children: [
				...generateCompanyOverview(company),
				...generateResources(company),
				...generateThesis(company),
				...[dividerBlock],
				...generateMemoOpinion(company),
				...[dividerBlock],
				...generateMemoInfo(company),
				...[dividerBlock],
				...generateVotingSection(company),
			],
		});

		return response;
	} catch (error) {
		console.error("Error creating Notion page:", error);
		throw error;
	}
};

// Function to update specific sections in a Notion page
export const updateNotionPageSection = async (
	pageId: string,
	sectionType: string,
	content: string | { [key: string]: string },
) => {
	try {
		// First, retrieve the blocks to find the section
		const { results } = await notion.blocks.children.list({
			block_id: pageId,
		});

		// Find the section and its content block
		let sectionIndex = -1;
		let contentBlockId = "";

		for (let i = 0; i < results.length; i++) {
			const block = results[i] as BlockObjectResponse;
			if (
				(block.type === "heading_2" || block.type === "heading_3") &&
				((block.type === "heading_2" &&
					block.heading_2.rich_text[0].type === "text" &&
					block.heading_2.rich_text[0].text.content
						.toLowerCase()
						.includes(sectionType.toLowerCase())) ||
					(block.type === "heading_3" &&
						block.heading_3.rich_text[0].type === "text" &&
						block.heading_3.rich_text[0].text.content
							.toLowerCase()
							.includes(sectionType.toLowerCase())))
			) {
				sectionIndex = i;
				// The content block is usually right after the heading
				if (i + 1 < results.length) {
					contentBlockId = results[i + 1].id;
				}
				break;
			}
		}

		if (!contentBlockId) {
			throw new Error(`Section ${sectionType} not found`);
		}

		if (typeof content === "string") {
			// Update paragraph content
			await notion.blocks.update({
				block_id: contentBlockId,
				type: "paragraph",
				paragraph: {
					rich_text: [
						{
							type: "text",
							text: { content },
						},
					],
				},
			});
		} else if (typeof content === "object") {
			// Handle different block types based on the section
			switch (sectionType.toLowerCase()) {
				case "highlights":
				case "key open questions":
				case "key risks":
					// Delete existing bullet points
					await notion.blocks.delete({
						block_id: contentBlockId,
					});

					// Create new bullet points
					await notion.blocks.children.append({
						block_id: pageId,
						children: Object.values(content).map((item) => ({
							object: "block",
							type: "bulleted_list_item",
							bulleted_list_item: {
								rich_text: [
									{
										type: "text",
										text: { content: item },
									},
								],
							},
						})),
					});
					break;

				case "voting":
					if ("vote" in content && "reason" in content) {
						await notion.blocks.update({
							block_id: contentBlockId,
							type: "table",
							table: {
								has_column_header: true,
								has_row_header: false,
							},
						});

						await notion.blocks.children.append({
							block_id: contentBlockId,
							children: [
								{
									type: "table_row",
									table_row: {
										cells: [
											[{ type: "text", text: { content: content.vote } }],
											[{ type: "text", text: { content: content.reason } }],
										],
									},
								},
							],
						});
					}
					break;

				default:
					throw new Error(`Unsupported section type: ${sectionType}`);
			}
		}

		return { success: true };
	} catch (error) {
		console.error(`Error updating section ${sectionType}:`, error);
		throw error;
	}
};
