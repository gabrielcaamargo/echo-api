import type {
	ControllerInterface,
	ControllerRequest,
	ControllerResponse,
} from "@interfaces";
import type { SigninUseCase } from "@useCases";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

const signinSchema = z.object({
	email: z.string({ message: "Email is required" }).email({
		message: "Invalid email address",
	}),
	password: z.string({ message: "Password is required" }),
});

export class SigninController implements ControllerInterface {
	constructor(private readonly signinUseCase: SigninUseCase) {}
	async handle({ body }: ControllerRequest): Promise<ControllerResponse> {
		const { email, password } = signinSchema.parse(body);

		try {
			const { accessToken, user } = await this.signinUseCase.execute({
				email,
				password,
			});

			return {
				statusCode: StatusCodes.OK,
				body: { accessToken, user },
			};
		} catch (error) {
			if (error instanceof ZodError) {
				return {
					statusCode: StatusCodes.BAD_REQUEST,
					body: error.issues.map((issue) => issue.message),
				};
			}

			if (error instanceof Error) {
				return {
					statusCode: StatusCodes.BAD_REQUEST,
					body: {
						message: error.message,
					},
				};
			}

			throw error;
		}
	}
}
