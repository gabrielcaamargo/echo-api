import { SigninController } from "@controllers";
import { makeSigninUseCase } from "./makeSigninUseCase";

export function makeSigninController() {
	return new SigninController(makeSigninUseCase());
}
