import { NextFunction, Request, Response, Router } from "express";
import students_routes from "./students.route";
import users_routes from "./users.route";
const routes = Router();

routes.use('/students', students_routes)
routes.use('/users', users_routes)

export default routes;