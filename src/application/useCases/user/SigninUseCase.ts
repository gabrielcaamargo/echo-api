import { env } from "@config";
import { InvalidCredentials } from "@errors";
import { User } from "@prisma/client";
import { UserRepository } from "@repositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface Input {
	email: string;
	password: string;
}

interface Output {
	accessToken: string;
	user: Omit<User, "password">;
}

export class SigninUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute({ email, password }: Input): Promise<Output> {
		const user = await this.userRepository.findUserByEmail(email);

		if (!user) {
			throw new InvalidCredentials();
		}

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			throw new InvalidCredentials();
		}

		const accessToken = sign({ sub: user.id }, env.jwtSecret, {
			expiresIn: "1d",
		});

		const { password: _, ...userWithoutPassword } = user;

		return {
			accessToken,
			user: userWithoutPassword,
		};
	}
}
