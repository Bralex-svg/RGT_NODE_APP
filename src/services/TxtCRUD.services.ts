import fs from "fs";

interface User {
  email: string;
  credentials: {
    accessToken: string;
    refreshToken: string;
  };
}

class TxtCrud {
  private filePath: string;
  private users: User[];

  constructor(filePath: string) {
    this.filePath = filePath;
    this.users = this.loadUsersFromFile();
  }

  private loadUsersFromFile(): User[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, "[]", "utf8");
      }
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data) as User[];
    } catch (error) {
      console.error("Error reading file:", error);
      return [];
    }
  }

  getUserByEmail(email: string): User | null {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, "[]", "utf8");
      }
      const data = fs.readFileSync(this.filePath, "utf8");
      const users = JSON.parse(data) as User[];
      return users.find((e) => e?.email?.toLowerCase() === email?.toLowerCase()) || null;
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }

  private saveUsersToFile(): void {
    try {
      console.log('Saving users to file...');
  
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.users, null, 2),
        'utf8'
      );
    } catch (error: any) {
      console.error('Error saving users to file:', error);
    }
  }
  

  addUser(email: string, accessToken: string, refreshToken: string): void {
    const existingUserIndex = this.users.findIndex(
      (user) => user.email === email
    );
    if (existingUserIndex !== -1) {
      // Update credentials for existing user
      this.users[existingUserIndex].credentials.accessToken = accessToken;
      this.users[existingUserIndex].credentials.refreshToken = refreshToken;
    } else {
      // Add new user
      this.users.push({ email, credentials: { accessToken, refreshToken } });
    }
    this.saveUsersToFile();
  }

  updateUser(email: string, newAccessToken: string, newRefreshToken: string): void {
    const user = this.users.find((user) => user.email === email);
    if (user) {
      user.credentials.accessToken = newAccessToken;
      user.credentials.refreshToken = newRefreshToken;
      this.saveUsersToFile();
    }
  }

  deleteUser(email: string): void {
    const index = this.users.findIndex((user) => user.email === email);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveUsersToFile();
    }
  }

  getUsers(): User[] {
    return this.users;
  }
}

export { TxtCrud };