import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints.js";
import type { EnhancedCompanyResult } from "../../types/interfaces.js";

export const generateThesis = (
	company: EnhancedCompanyResult,
): BlockObjectRequest[] => {
	return [
		// Thesis Section
		{
			object: "block" as const,
			type: "heading_2" as const,
			heading_2: {
				rich_text: [{ type: "text" as const, text: { content: "Thesis" } }],
				color: "blue_background",
			},
		},
		// Highlights Section
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "Highlights (Why invest)" },
					},
				],
				color: "gray_background",
			},
		},
		{
			object: "block" as const,
			type: "bulleted_list_item" as const,
			bulleted_list_item: {
				rich_text: [{ type: "text" as const, text: { content: "Bullet 1" } }],
			},
		},
		{
			object: "block" as const,
			type: "bulleted_list_item" as const,
			bulleted_list_item: {
				rich_text: [{ type: "text" as const, text: { content: "Bullet 2" } }],
			},
		},
		// Key Open Questions Section
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: {
							content: "Key Open Questions [GP and Deal Lead to Align]",
						},
					},
				],
				color: "gray_background",
			},
		},
		{
			object: "block" as const,
			type: "bulleted_list_item" as const,
			bulleted_list_item: {
				rich_text: [{ type: "text" as const, text: { content: "Bullet 1" } }],
			},
		},
		{
			object: "block" as const,
			type: "bulleted_list_item" as const,
			bulleted_list_item: {
				rich_text: [{ type: "text" as const, text: { content: "Bullet 2" } }],
			},
		},
		// Key Risks Section
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "Key Risks (Why not invest)" },
					},
				],
				color: "gray_background",
			},
		},
		{
			object: "block" as const,
			type: "bulleted_list_item" as const,
			bulleted_list_item: {
				rich_text: [{ type: "text" as const, text: { content: "Bullet 1" } }],
			},
		},
		{
			object: "block" as const,
			type: "bulleted_list_item" as const,
			bulleted_list_item: {
				rich_text: [{ type: "text" as const, text: { content: "Bullet 2" } }],
			},
		},
	];
};
