import migrationRunner from "node-pg-migrate";
import { request } from "node:http";
import { join } from "node:path";

export default async function migrations(request, response) {
  let migratetypeRun = null;

  if (request.method === "POST") {
    console.log("in POST");
    migratetypeRun = true;
  } else if (request.method === "GET") {
    console.log("in GET");
    migratetypeRun = false;
  } else {
    response.status(405).end();
  }
  try {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: migratetypeRun,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
    response.status(200).json(migrations);
  } catch (error) {
    throw error;
    response.staus(500).end();
  }
}
