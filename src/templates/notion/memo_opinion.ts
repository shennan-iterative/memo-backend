import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints.js";
import type { EnhancedCompanyResult } from "../../types/interfaces.js";

export const generateMemoOpinion = (
	company: EnhancedCompanyResult,
): BlockObjectRequest[] => {
	return [
		// Memo - Opinion Section
		{
			object: "block" as const,
			type: "heading_2" as const,
			heading_2: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "Memo - Opinion Section" },
					},
				],
				color: "brown_background",
			},
		},
		// TL;DR Section
		{
			object: "block" as const,
			type: "heading_2" as const,
			heading_2: {
				rich_text: [{ type: "text" as const, text: { content: "TL;DR" } }],
				color: "blue_background",
			},
		},
		// Condensed Company Overview
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "Condensed Company Overview" },
					},
				],
				color: "gray_background",
			},
		},
		{
			object: "block" as const,
			type: "paragraph" as const,
			paragraph: {
				rich_text: [
					{ type: "text" as const, text: { content: company.description } },
				],
			},
		},
		// Market Summary
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{ type: "text" as const, text: { content: "Market Summary" } },
				],
				color: "gray_background",
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
								company.rationale_details.market ||
								"[Market summary to be added]",
						},
					},
				],
			},
		},
		// Diligence Lead Callout
		{
			object: "block" as const,
			type: "callout" as const,
			callout: {
				rich_text: [
					{ type: "text" as const, text: { content: "Diligence Lead:" } },
				],
				icon: { emoji: "💡" },
				color: "gray",
			},
		},
		// Team Summary
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{ type: "text" as const, text: { content: "Team Summary" } },
				],
				color: "gray_background",
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
								company.rationale_details.team || "[Team summary to be added]",
						},
					},
				],
			},
		},
		// Diligence Lead Callout
		{
			object: "block" as const,
			type: "callout" as const,
			callout: {
				rich_text: [
					{ type: "text" as const, text: { content: "Diligence Lead:" } },
				],
				icon: { emoji: "💡" },
				color: "gray_background",
			},
		},
		// Evidence Summary
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{ type: "text" as const, text: { content: "Evidence Summary" } },
				],
				color: "gray_background",
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
								company.rationale_details.traction ||
								"[Evidence summary to be added]",
						},
					},
				],
			},
		},
		// Diligence Lead Callout
		{
			object: "block" as const,
			type: "callout" as const,
			callout: {
				rich_text: [
					{ type: "text" as const, text: { content: "Diligence Lead:" } },
				],
				icon: { emoji: "💡" },
				color: "gray_background",
			},
		},
		// Key Win Conditions
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "Key Win Conditions" },
					},
				],
				color: "gray_background",
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
								"[What are the things that need to happen for this company to become massive?]",
						},
					},
				],
			},
		},
		// Key Open Questions
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: {
							content: "Key Open Questions - Diligence Lead To Align with GP",
						},
					},
				],
				color: "gray_background",
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
							content: "[What are the key open questions for 2nd GP call?]",
						},
					},
				],
			},
		},
		// 2nd GP Call Summary
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "2nd GP Call - Summary and Updates" },
					},
				],
				color: "gray_background",
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
								"[What are the additional learnings / responses after 2nd GP call?]",
						},
					},
				],
			},
		},
		// Meeting Minutes Link
		{
			object: "block" as const,
			type: "paragraph" as const,
			paragraph: {
				rich_text: [
					{ type: "text" as const, text: { content: "Meeting Minutes: " } },
					{
						type: "text" as const,
						text: {
							content: "2nd GP Call - Meeting Minutes",
							link: {
								url: "https://www.notion.so/2nd-GP-Call-Meeting-Minutes-c1feb986d4b24b6f8a47d17684feb729?pvs=21",
							},
						},
					},
				],
			},
		},
		{
			object: "block" as const,
			type: "paragraph" as const,
			paragraph: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "Meeting Overview: " },
					},
				],
			},
		},
	];
};
