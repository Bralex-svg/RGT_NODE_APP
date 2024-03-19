import { NextFunction, Request, Response, Router } from "express";
import students_routes from "./students.route";
const routes = Router();

routes.use('/students', students_routes)

export default routes;