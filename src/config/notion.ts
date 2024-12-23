import "dotenv/config";

export const NOTION_CONFIG = {
	DATABASE_ID: process.env.NOTION_DATABASE_ID as string,
	ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN as string,
};
