import type { StatusCodes } from "http-status-codes";

export interface ControllerRequest {
	body: Record<string, any>;
	params?: Record<string, any>;
	query?: Record<string, any>;
	headers?: Record<string, any>;
	userId?: string;
}

export interface ControllerResponse {
	statusCode: StatusCodes;
	body: Record<string, any> | null;
}

export interface ControllerInterface {
	handle(request: ControllerRequest): Promise<ControllerResponse>;
}
