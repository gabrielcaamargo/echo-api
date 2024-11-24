import { MiddlewareInterface } from "@interfaces";
import { NextFunction, Request, Response } from "express";

export function middlewareAdapter(middleware: MiddlewareInterface) {
	return async (
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<any> => {
		const result = await middleware.handle({
			headers: request.headers as Record<string, string>,
		});

		if ("statusCode" in result) {
			return response.status(result.statusCode).json(result.body);
		}

		request.metadata = {
			...request.metadata,
			userId: result.data.userId,
		};

		next();
	};
}
