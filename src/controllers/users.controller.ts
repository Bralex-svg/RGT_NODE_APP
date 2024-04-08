import { Request, Response } from "express";
import { validateData } from "../services/validation";
import { Database } from "../database/postgres";
import userSchema from "../Models/user.model";
import argon2 from 'argon2'; 
import jwt from 'jsonwebtoken'; 
import { verifyPassword, hashPassword } from "../services/password_hashing.service";
interface User {
  email: string;
  password: string;
  id: string;
}


const database = new Database();
const table = "Users";
database.defineModel(table, userSchema);

async function createUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const isDataValid = validateData(userSchema, { email, password });
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
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await database.findByKey(table, "email", email) as unknown as User | null;
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const isPasswordValid = await verifyPassword(user.password, password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
                 //JWT
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await database.getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const user = await database.getUserByEmail(email);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    
    const updatedUser = await database.updateUser(parseInt(id), { email, password });
    
    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const deletedUser = await database.deleteUser(parseInt(id));
    
    return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { createUser, loginUser, getAllUsers, getUserByEmail, deleteUser, updateUser };
