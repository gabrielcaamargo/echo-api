import type {
	ControllerInterface,
	ControllerRequest,
	ControllerResponse,
} from "@interfaces";
import type { SignupUseCase } from "@useCases";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

const signupSchema = z.object({
	username: z.string({ message: "Username is required" }),
	password: z
		.string({ message: "Password is required" })
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			{
				message:
					"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
			}
		),
	email: z
		.string({ message: "Email is required" })
		.email({ message: "Invalid email address" }),
});

export class SignupController implements ControllerInterface {
	constructor(private readonly signupUseCase: SignupUseCase) {}

	async handle({ body }: ControllerRequest): Promise<ControllerResponse> {
		try {
			const { username, email, password } = signupSchema.parse(body);

			await this.signupUseCase.execute({ username, email, password });

			return {
				statusCode: StatusCodes.CREATED,
				body: null,
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
