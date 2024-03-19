import { Request, Response } from "express";
import { validateData } from "../services/validation";
import { database } from "../database/postgres";
import studentSchema from "../Models/student.model";

database.defineModel("Students", studentSchema);

async function createStudent(req: Request, res: Response) {
  try {
    const { firstName, lastName, email } = req.body;
    const isDataValid = validateData(studentSchema, {
      firstName,
      lastName,
      email,
    });
    if (!isDataValid) {
      throw new Error("Invalid user data");
    }
    // Call the create method of the Database class to create the user
    const user = await database.create("Students", {
      firstName,
      lastName,
      email,
    }); // Assuming 'Student' is the model name
    // Handle success
    console.log("User created:", user.toJSON());
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle error
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllStudents(req: Request, res: Response) {
  try {
    const students = await database.getAllStudents();
    return res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getStudentByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const student = await database.getStudentByEmail(email);
    return res.status(200).json({ student });
  } catch (error) {
    console.error("Error fetching student by email:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateStudent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    
    const updatedStudent = await database.updateStudent(parseInt(id), { firstName, lastName, email });
    
    return res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteStudent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const deletedStudent = await database.deleteStudent(parseInt(id));
    
    return res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export {createStudent, getAllStudents, getStudentByEmail, deleteStudent, updateStudent}
