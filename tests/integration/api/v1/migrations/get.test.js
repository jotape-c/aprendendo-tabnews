import database from "infra/database.js";
import { loadEnvConfig } from "@next/env";
test("GET to api/v1/migrations should return 200", async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  //expect(responseBody.length).toBeGreaterThan(0);

  console.log(responseBody);

  console.log("Chamando valores do .env.test.local:" + process.env.POSTGRES_DB);
});
