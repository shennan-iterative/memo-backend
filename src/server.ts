import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import type { StatusCode } from "hono/utils/http-status";
import type { HTTPException } from "hono/http-exception";
import type { AppError, ErrorResponse } from "./types/interfaces.js";
import { searchCompany } from "./controllers/company.js";
import { createNotionPage } from "./controllers/notion.js";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("/api/*", cors());

// Routes
app.get("/api/search/company", searchCompany);
app.post("/api/notion/company", createNotionPage);

// Error handling middleware
app.onError((error, c) => {
	console.error("Unhandled error:", error);

	// Check if it's our custom AppError
	if (
		error &&
		typeof error === 'object' &&
		'statusCode' in error &&
		'code' in error &&
		'message' in error
	) {
		const appError = error as AppError;
		const errorResponse: ErrorResponse = {
			success: false,
			error: {
				code: appError.code,
				message: appError.message,
				details: appError.details
			}
		};
		return c.json(errorResponse, appError.statusCode as StatusCode);
	}

	// Check if it's Hono's HTTPException
	if (error instanceof Error && 'status' in error) {
		const httpError = error as HTTPException;
		return c.json({
			success: false,
			error: {
				code: 'HTTP_ERROR',
				message: httpError.message || 'HTTP Error occurred',
				details: {
					status: httpError.status,
					name: httpError.name
				}
			}
		}, httpError.status as StatusCode);
	}

	return c.json(
		{
			success: false,
			error: {
				code: 'INTERNAL_ERROR',
				message: 'An unexpected error occurred',
				details: process.env.NODE_ENV === 'development' ? error : undefined
			}
		},
		500 as StatusCode
	);
});

// Not found handler
app.notFound((c) => {
	return c.json({
		success: false,
		error: {
			code: 'NOT_FOUND',
			message: 'The requested resource was not found'
		}
	}, 404 as StatusCode);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
