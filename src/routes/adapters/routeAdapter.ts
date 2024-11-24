import { ControllerInterface } from "@interfaces";
import { Request, Response } from "express";

export function routeAdapter(controller: ControllerInterface) {
	return async (request: Request, response: Response) => {
		const { body, statusCode } = await controller.handle({
			body: request.body,
			headers: request.headers,
			params: request.params,
			query: request.query,
		});

		response.status(statusCode).json(body);
	};
}
