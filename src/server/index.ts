import "dotenv/config";
import { env } from "@config";
import express from "express";
import { routes } from "@routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen(env.port, () =>
	console.log(`🚀 Server running on http://localhost:${env.port}`)
);
