import { Router } from "express";
import { routeAdapter } from "./adapters/routeAdapter";
import { makeSigninController, makeSignupController } from "@factories";

export const routes = Router();

routes.post("/auth/sign-up", routeAdapter(makeSignupController()));
routes.post("/auth/sign-in", routeAdapter(makeSigninController()));
