import database from "infra/database.js";

async function cleamDatabase() {
  await database.query("DROP schema public cascade; CREATE schema public;");
}
beforeAll(cleamDatabase);

test("Post to api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const countMigrations = await database.query(
    "SELECT count(*)::int from pgmigrations;",
  );
  expect(countMigrations.rows[0].count).toBeGreaterThan(0);
});
