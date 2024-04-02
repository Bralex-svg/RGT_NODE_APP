import { Request, Response } from "express";
import { validateData } from "../services/validation";
import { database } from "../database/postgres";
import userSchema from "../Models/user.model";
const bcrypt = require('bcrypt')
const argon2 = require('argon2');

database.defineModel("Users", userSchema);

async function createUser(req: Request, res: Response) {
  try {
    const {  email, password} = req.body;
    const isDataValid = validateData(userSchema, {
      email,
      password
    });
    if (!isDataValid) {
      throw new Error("Invalid user data");
    }

    const hashedPassword = await argon2.hash(password);

    const user = await database.create("Users", {
        email,
        password: hashedPassword
    });
    console.log("User created:", user.toJSON());
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle error
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await database.getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const student = await database.getStudentByEmail(email);
    return res.status(200).json({ student });
  } catch (error) {
    console.error("Error fetching student by email:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    
    const updatedUser = await database.updateUser(parseInt(id), { email, password });
    
    return res.status(200).json({ message: "User updated successfully", student: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const deletedUser = await database.deleteUser(parseInt(id));
    
    return res.status(200).json({ message: "Student deleted successfully", student: deletedUser });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export {createUser, getAllUsers, getUserByEmail, deleteUser, updateUser}
