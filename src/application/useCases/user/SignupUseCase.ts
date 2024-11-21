import {UserAlreadyExists} from '@errors';
import type {UserRepository} from '@repositories';

import {hash} from 'bcryptjs';

interface Input {
	username: string;
	email: string;
	password: string;
}

type Output = void;

export class SignupUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(input: Input): Promise<Output> {
		const {email, password, username} = input;

		const userAlreadyExists =
			await this.userRepository.findUserByEmailOrUsername(email, username);

		if (userAlreadyExists) {
			throw new UserAlreadyExists();
		}

		const hashedPassword = await hash(input.password, 8);

		await this.userRepository.createUser(email, username, hashedPassword);
	}
}
