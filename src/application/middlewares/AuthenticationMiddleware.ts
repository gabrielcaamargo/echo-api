import {
	MiddlewareData,
	MiddlewareInterface,
	MiddlewareRequest,
	MiddlewareResponse,
} from "@interfaces";
import { verify } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { env } from "@config";

export class AuthenticationMiddleware implements MiddlewareInterface {
	async handle({
		headers,
	}: MiddlewareRequest): Promise<MiddlewareResponse | MiddlewareData> {
		const { authorization } = headers;

		if (!authorization) {
			return {
				statusCode: StatusCodes.UNAUTHORIZED,
				body: {
					message: "Invalid access token",
				},
			};
		}

		try {
			const [bearer, token] = authorization.split(" ");

			if (bearer !== "Bearer") {
				throw new Error();
			}

			const payload = verify(token, env.jwtSecret);

			return {
				data: {
					userId: payload.sub,
				},
			};
		} catch {
			return {
				statusCode: StatusCodes.UNAUTHORIZED,
				body: {
					message: "Invalid access token",
				},
			};
		}
	}
}
