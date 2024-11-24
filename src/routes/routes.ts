import { Router } from "express";
import { routeAdapter } from "./adapters/routeAdapter";
import { makeSignupController } from "@factories";

export const routes = Router();

routes.post("/auth/sign-up", routeAdapter(makeSignupController()));
