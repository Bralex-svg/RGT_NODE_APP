import { NextFunction, Request, Response, Router } from "express";
import { createStudent,  getAllStudents, getStudentByEmail, updateStudent, deleteStudent } from "../controllers/students.controller";
import { authenticateBasicAuth } from "../middlewares/authenticate.middleware";
const students_routes = Router();

students_routes.post("/create", authenticateBasicAuth, createStudent);
students_routes.get("/", getAllStudents);
students_routes.get("/:email", getStudentByEmail);
students_routes.put("/:id", updateStudent);
students_routes.delete("/:id", deleteStudent);
export default students_routes;
