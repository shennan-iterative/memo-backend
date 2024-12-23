import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import type { EnhancedCompanyResult, ErrorResponse } from "../types/interfaces.js";
import { createCompanyPage } from "../services/notion.js";

export const createNotionPage = async (c: Context) => {
    try {
        const body = await c.req.json();
        const companyData = body as EnhancedCompanyResult;

        const response = await createCompanyPage(companyData);

        return c.json({
            success: true,
            data: {
                pageId: response.id
            }
        });
    } catch (error) {
        console.error("Notion page creation error:", error);

        const errorResponse: ErrorResponse = {
            success: false,
            error: {
                code: 'NOTION_ERROR',
                message: 'Failed to create Notion page',
                details: process.env.NODE_ENV === 'development' ? error : undefined
            }
        };

        return c.json(errorResponse, 500 as StatusCode);
    }
};
