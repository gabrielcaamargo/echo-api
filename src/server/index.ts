import "dotenv/config";
import { env } from "@config";
import { makeSignupController } from "@factories";
import express from "express";
import { routeAdapter } from "@routes";

const app = express();
app.use(express.json());

app.post("/auth/sign-up", routeAdapter(makeSignupController()));

app.listen(env.port, () =>
	console.log(`🚀 Server running on http://localhost:${env.port}`)
);
