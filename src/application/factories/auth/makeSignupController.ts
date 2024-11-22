import {SignupController} from '@controllers';
import {makeSignupUseCase} from './makeSignupUseCase';

export function makeSignupController(): SignupController {
	return new SignupController(makeSignupUseCase());
}
