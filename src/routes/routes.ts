import { Router } from "express";
import { routeAdapter } from "./adapters/routeAdapter";
import {
	makeAuthenticationMiddleware,
	makeSigninController,
	makeSignupController,
} from "@factories";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { TestController } from "src/application/controllers/testController";

export const routes = Router();

// Auth routes
routes.post("/auth/sign-up", routeAdapter(makeSignupController()));
routes.post("/auth/sign-in", routeAdapter(makeSigninController()));

// Test routes
routes.get(
	"/test",
	middlewareAdapter(makeAuthenticationMiddleware()),
	routeAdapter(new TestController())
);
