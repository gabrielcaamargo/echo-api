import type {User} from '@prisma/client';

export interface UserRepositoryInterface {
	findUserByEmail(email: string): Promise<User | null>;
	findUserById(id: string): Promise<User | null>;
	findUserByEmailOrUsername: (
		email: string,
		username: string,
	) => Promise<User | null>;
	createUser(email: string, username: string, password: string): Promise<void>;
}
