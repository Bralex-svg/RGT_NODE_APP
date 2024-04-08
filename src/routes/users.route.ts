import { NextFunction, Request, Response, Router } from "express";
import { createUser,  getAllUsers, getUserByEmail, updateUser, deleteUser, loginUser } from "../controllers/users.controller";
import { authenticateBasicAuth } from "../middlewares/authenticate.middleware";
const users_routes = Router();

users_routes.post("/create", authenticateBasicAuth, createUser);
users_routes.post("/login", loginUser);
users_routes.get("/", getAllUsers);
users_routes.get("/:email", getUserByEmail);
users_routes.put("/:id", updateUser);
users_routes.delete("/:id", deleteUser);
export default users_routes;
