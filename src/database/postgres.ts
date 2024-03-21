import { Sequelize, DataTypes, Model, ModelCtor } from "sequelize";
type DataTypes =  any;

interface ModelSchema {
  [key: string]: DataTypes ;
}

class Database {
  getAllStudents() {
    throw new Error("Method not implemented.");
  }
  
  sequelize: Sequelize;
  models: { [key: string]: ModelCtor<Model<any, any>> };

  constructor(
    databaseName: string = "Node_Tutorial",
    username: string = "postgres",
    password: string = "alexadam269",
    options: object = {}
  ) {
    let config: any = { host: "localhost" };
    config = { ...config, ...options };
    this.sequelize = new Sequelize(databaseName, username, password, {
      ...config,
      dialect: "postgres", // Adjust dialect as per your database type
    });
    this.models = {};
  }

  defineModel(modelName: string, schema: ModelSchema) {
    this.models[modelName] = this.sequelize.define(modelName, schema);
  }

  async syncModels() {
    await this.sequelize.sync();
    console.log("Database synchronized!");
  }

  async create(modelName: string, data: any) {
    try {
      const model = this.models[modelName];
      const user = await model.create(data);
      console.log("User created:", user.toJSON());
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getAll(modelName: string) {
    try {
      const model = this.models[modelName];
      const users = await model.findAll();
      console.log(
        "All users:",
        users.map((user) => (user as any).toJSON())
      );
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async update(modelName: string, id: number, data: ModelSchema) {
    try {
      const model = this.models[modelName];
      const user = await model.findByPk(id);
      if (!user) throw new Error("User not found");
      await (user as any).update(data);
      console.log("User updated:", (user as any).toJSON());
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async delete(modelName: string, id: number) {
    try {
      const model = this.models[modelName];
      const user = await model.findByPk(id);
      if (!user) throw new Error("User not found");
      await (user as any).destroy();
      console.log("User deleted:", (user as any).toJSON());
      return user;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const students = await this.models.Students.findAll();
      console.log("All students:", students.map((student) => student.toJSON()));
      return students;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }

  async getStudentByEmail(email: string) {
    try {
      const student = await this.models.Students.findOne({ where: { email } });
      if (!student) throw new Error("Student not found");
      console.log("Student found:", student.toJSON());
      return student;
    } catch (error) {
      console.error("Error fetching student by email:", error);
      throw error;
    }
  }

  async updateUser(id: number, data: ModelSchema) {
    try {
      const student = await this.models.Students.findByPk(id);
      if (!student) throw new Error("Student not found");
      await student.update(data);
      console.log("Student updated:", student.toJSON());
      return student;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  }
  
  async deleteUser(id: number) {
    try {
      const student = await this.models.Students.findByPk(id);
      if (!student) throw new Error("Student not found");
      await student.destroy();
      console.log("Student deleted:", student.toJSON());
      return student;
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  }
  async getUserByEmail(email: string) {
    try {
      const student = await this.models.Students.findOne({ where: { email } });
      if (!student) throw new Error("Student not found");
      console.log("Student found:", student.toJSON());
      return student;
    } catch (error) {
      console.error("Error fetching student by email:", error);
      throw error;
    }
  }

  async updateStudent(id: number, data: ModelSchema) {
    try {
      const student = await this.models.Students.findByPk(id);
      if (!student) throw new Error("Student not found");
      await student.update(data);
      console.log("Student updated:", student.toJSON());
      return student;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  }
  
  async deleteStudent(id: number) {
    try {
      const student = await this.models.Students.findByPk(id);
      if (!student) throw new Error("Student not found");
      await student.destroy();
      console.log("Student deleted:", student.toJSON());
      return student;
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  }
  
}


  


const database = new Database
export  {Database, database}