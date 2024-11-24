import { SigninUseCase } from "src/application/useCases/user/SigninUseCase";
import { makeUserRepository } from "./makeUserRepository";

export function makeSigninUseCase() {
	return new SigninUseCase(makeUserRepository());
}
