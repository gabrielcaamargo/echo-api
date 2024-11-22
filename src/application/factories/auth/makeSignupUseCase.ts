import {SignupUseCase} from '@useCases';
import {makeUserRepository} from './makeUserRepository';

export function makeSignupUseCase(): SignupUseCase {
	const userRepository = makeUserRepository();
	return new SignupUseCase(userRepository);
}
