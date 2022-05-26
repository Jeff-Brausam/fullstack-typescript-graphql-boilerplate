import Db from "./db";

export async function seedDb(db: Db) {
  if (db.getAllUsers().length === 0) {
    const [Jane, Michael, Sara, Zoe, Chad] = [
      await db.createUser({
        name: "Jane Doe",
        avatarUrl: "http://localhost:3000/static/jane-doe.jpeg",
      }),
      await db.createUser({
        name: "Michael Cloudman",
        avatarUrl: "http://localhost:3000/static/michael-cloudman.png",
      }),
      await db.createUser({
        name: "Sara Berginni",
        avatarUrl: "http://localhost:3000/static/sara-berginni.png",
      }),
      await db.createUser({
        name: "Zoe Geralds",
        avatarUrl: "http://localhost:3000/static/1zoe.jpeg",
      }),
      await db.createUser({
        name: "Chad Reynolds",
        avatarUrl: "http://localhost:3000/static/chad_reynolds.png",
      }),
    ];
  }
}
