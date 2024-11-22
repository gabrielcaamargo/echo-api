import 'dotenv/config';
import {env} from '@config';
import {makeSignupController} from '@factories';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/auth/sign-up', async (request, response) => {
	const signupController = makeSignupController();

	const {body, statusCode} = await signupController.handle({
		body: request.body,
	});

	response.status(statusCode).json(body);
});

app.listen(env.port, () =>
	console.log(`🚀 Server running on http://localhost:${env.port}`),
);
