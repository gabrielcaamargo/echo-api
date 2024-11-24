import {
	ControllerInterface,
	ControllerRequest,
	ControllerResponse,
} from "@interfaces";

export class TestController implements ControllerInterface {
	async handle({
		body,
		userId,
	}: ControllerRequest): Promise<ControllerResponse> {
		console.log("Controller:: ", userId);

		return {
			statusCode: 200,
			body: {
				message: "Hello World",
			},
		};
	}
}
