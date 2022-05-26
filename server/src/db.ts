import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { v4 as uuid } from "uuid";

export interface DbEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DbUser extends DbEntity {
  name: string;
  avatarUrl: string;
}

export interface DbSchema {
  users: DbUser[];
}

class Db {
  private adapter;
  private db;

  constructor(filePath: string) {
    this.adapter = new FileSync.default<DbSchema>(filePath);
    this.db = low.default(this.adapter);
    this.db.read();
  }
  async initDefaults() {
    return await this.db
      .defaults({
        users: [],
      })
      .write();
  }

  getAllUsers(): DbUser[] {
    return this.db.get("users").value();
  }

  getUserById(id: string) {
    return this.db
      .get("users")
      .find((user) => user.id === id)
      .value();
  }

  async createUser(
    userProps: Pick<DbUser, "name" | "avatarUrl">
  ): Promise<DbUser> {
    const users = this.db.get("users");
    const user: DbUser = {
      ...userProps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: `user-${uuid()}`,
    };
    await users.push(user).write();
    return user;
  }

  async editUser(userId: string, name: string): Promise<DbUser> {
    const user = this.db.get("users").find({ id: userId });
    await user.assign({ name, updatedAt: new Date().toISOString() }).write();
    return user.value();
  }

  async deleteUser(userId: string): Promise<string> {
    const users = this.db.get("users");
    await users.remove({ id: userId }).write();
    return userId;
  }

  async write(): Promise<void> {
    await this.db.write();
  }
}

export default Db;
