import Airtable from "airtable";
import "dotenv/config";

export const airtableConfig = {
	apiKey: process.env.AIRTABLE_API_KEY,
	baseId: process.env.AIRTABLE_BASE_ID,
};

export const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(
	airtableConfig.baseId as string,
);
