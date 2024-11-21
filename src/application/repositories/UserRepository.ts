import type {User} from '@prisma/client';
import {prismaClient} from '@libs';
import type {UserRepositoryInterface} from '@interfaces';

export class UserRepository implements UserRepositoryInterface {
	async findUserByEmailOrUsername(
		email: string,
		username: string,
	): Promise<User | null> {
		return await prismaClient.user.findFirst({
			where: {
				OR: [{email}, {username}],
			},
		});
	}

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

	async createUser(
		email: string,
		username: string,
		password: string,
	): Promise<void> {
		await prismaClient.user.create({
			data: {
				email,
				password,
				username,
			},
		});
	}
}
