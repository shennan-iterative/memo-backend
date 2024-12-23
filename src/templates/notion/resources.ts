import type { BlockObjectRequest } from "@notionhq/client/build/src/api-endpoints.js";
import type { EnhancedCompanyResult } from "../../types/interfaces.js";

export const generateResources = (
	company: EnhancedCompanyResult,
): BlockObjectRequest[] => {
	return [
		// Resources Section
		{
			object: "block" as const,
			type: "heading_3" as const,
			heading_3: {
				rich_text: [{ type: "text" as const, text: { content: "Resources" } }],
				color: "blue_background",
			},
		},
		// Resource Links
		...[
			{
				title: "Final Interview Feedback",
				url: company.feedback.final.url,
			},
			{
				title: "Final Interview Grain",
				url: company.video_recordings.final,
			},
			{ title: "First Call Feedback", url: company.feedback.first?.url },
			{ title: "First Call Grain", url: company.video_recordings.first },
		]
			.filter((item) => item.url)
			.map((item) => ({
				object: "block" as const,
				type: "bulleted_list_item" as const,
				bulleted_list_item: {
					rich_text: [
						{
							type: "text" as const,
							text: {
								content: item.title,
								...(item.url && { link: { url: item.url } }),
							},
						},
					],
				},
			})),
	];
};
