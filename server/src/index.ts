import express from "express";
import { createApolloServer } from "./apollo-server";
import { createServer } from "http";
import path from "path";
import { DB_FILE_PATH, PORT } from "./constants";
import Db from "./db";
import { seedDb } from "./seed";

const app = express();

async function main() {
  console.log(
    [" Building UI and serving on ", `\thttp://localhost:${PORT}\t\t`].join(" ")
  );

  const db = new Db(DB_FILE_PATH);
  await db.initDefaults();
  await seedDb(db);

  // static files
  if (process.env.NODE_ENV === "production") {
    app.use(
      "/static",
      express.static(
        path.join(__dirname, "../node_modules/client/build/static")
      )
    );
    app.use(
      "/",
      express.static(path.join(__dirname, "../node_modules/client/build"))
    );
  }

  const httpServer = createServer(app);
  const apolloServer = await createApolloServer(db, httpServer, app);

  await new Promise<void>((resolve) =>
    app.listen(PORT, () => {
      console.log(
        [
          " GraphQL API listening on   ",
          `\thttp://localhost:${PORT}${apolloServer.graphqlPath}\t`,
        ].join(" ")
      );
      resolve();
    })
  );
}

main().catch((err) => {
  console.error(err);
});
