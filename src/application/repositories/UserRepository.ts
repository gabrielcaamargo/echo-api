import type {User} from '@prisma/client';
import {prismaClient} from '@libs';

export interface UserRepositoryInterface {
	findUserByEmail(email: string): Promise<User | null>;
	findUserById(id: string): Promise<User | null>;
}

export class UserRepository implements UserRepositoryInterface {
	async findUserById(id: string): Promise<User | null> {
		return await prismaClient.user.findUnique({
			where: {id},
		});
	}

	async findUserByEmail(email: string): Promise<User | null> {
		return await prismaClient.user.findUnique({
			where: {email},
		});
	}
}
