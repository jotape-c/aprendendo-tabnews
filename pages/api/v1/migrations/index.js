import migrationRunner from "node-pg-migrate";
import { request } from "node:http";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    console.log("GET");
    const migrations = await migrationRunner({
      ...defaultMigrationOptions,
    });
    response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    response.status(200).json(migrations);
  }

  response.status(405).end();
}
