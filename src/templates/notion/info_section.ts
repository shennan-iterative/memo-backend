import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints.js";
import type { EnhancedCompanyResult } from "../../types/interfaces.js";

export const generateMemoInfo = (
	company: EnhancedCompanyResult,
): BlockObjectRequest[] => {
	return [
		// Memo - Informational Section
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [
					{
						type: "text" as const,
						text: { content: "Memo - Informational Section" },
					},
				],
				color: "brown_background",
				is_toggleable: true,
				children: [
					{
						object: "block" as const,
						type: "heading_2" as const,
						heading_2: {
							rich_text: [
								{
									type: "text" as const,
									text: { content: "Company Details" },
								},
							],
							color: "blue_background",
						},
					},
					// Product Section
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [
								{
									type: "text" as const,
									text: { content: "Product - current offering" },
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
									text: {
										content:
											company.rationale_details.product ||
											"[What is the current product offering in more depth? Attach demo screenshots.]",
									},
								},
							],
						},
					},
					// Ideal Customer Persona
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [
								{
									type: "text" as const,
									text: { content: "Ideal Customer Persona" },
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
									text: {
										content:
											"[What is a more detailed explanation of their ideal customer persona? Give examples from existing customer base if any]",
									},
								},
							],
						},
					},
					// Business Model
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [
								{
									type: "text" as const,
									text: {
										content: "Business - revenue model and unit economics",
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
									text: {
										content:
											"[What is the revenue model and unit economics? Deep dive into existing data if any]",
									},
								},
							],
						},
					},
					// Key Operating Metrics
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [
								{
									type: "text" as const,
									text: {
										content: "Key operating metrics (e.g. MAU, GTV)",
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
									text: {
										content:
											"[What are the current key operating metrics? Deep dive into existing data if any]",
									},
								},
							],
						},
					},
					// Key Financial Metrics
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [
								{
									type: "text" as const,
									text: {
										content:
											"Key financial metrics if any (ARR, GMV, revenue, CM1, etc)",
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
									text: {
										content:
											"[What are the current key financial metrics? Deep dive into existing data if any]",
									},
								},
							],
						},
					},
					// Divider
					{
						object: "block" as const,
						type: "divider" as const,
						divider: {},
					},
					// Market Section
					{
						object: "block" as const,
						type: "heading_2" as const,
						heading_2: {
							rich_text: [
								{ type: "text" as const, text: { content: "Market" } },
							],
						},
					},
					// TAM
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [{ type: "text" as const, text: { content: "TAM" } }],
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
											"[How big is the market? Who will buy from them, how much will they pay, and how many of them are there? Could they get to $100M ARR in the current geography or product? If not, where would they most likely need to go?]",
									},
								},
							],
						},
					},
					// Competition
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [
								{ type: "text" as const, text: { content: "Competition" } },
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
									text: {
										content:
											company.rationale_details.competition ||
											"[Players: Who is a direct competitor? Who might be adjacent? Who should they fear the most?]",
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
									text: {
										content:
											"[Differentiation: What is the core differentiation about this company that will allow them to win?]",
									},
								},
							],
						},
					},
					// Unique Insights
					{
						object: "block" as const,
						type: "heading_3" as const,
						heading_3: {
							rich_text: [
								{
									type: "text" as const,
									text: { content: "Unique Insights" },
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
									text: {
										content:
											"[Does the team have any particular unique insights worth noting?]",
									},
								},
							],
						},
					},
					// Divider
					{
						object: "block" as const,
						type: "divider" as const,
						divider: {},
					},
					// Iterative Value-Add
					{
						object: "block" as const,
						type: "heading_2" as const,
						heading_2: {
							rich_text: [
								{
									type: "text" as const,
									text: { content: "Iterative Value-Add" },
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
									text: {
										content:
											"[2-3 bullets on how Iterative can add value and how we can generate excess returns, either by connecting to customer base, enhancing growth, introduction to customers, senior mgmt hiring]",
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
