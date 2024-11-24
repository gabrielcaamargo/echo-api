import type { StatusCodes } from "http-status-codes";

export interface MiddlewareRequest {
	headers: Record<string, string>;
}

export interface MiddlewareResponse {
	statusCode: StatusCodes.OK | StatusCodes;
	body: Record<string, any> | null;
}

export interface MiddlewareData {
	data: Record<string, any>;
}

export interface MiddlewareInterface {
	handle(
		request: MiddlewareRequest
	): Promise<MiddlewareResponse | MiddlewareData>;
}
