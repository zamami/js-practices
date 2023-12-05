import { runQuery, getQuery, db } from "../async/async_module.js";

async function main() {
  await runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )"
  );
  try {
    const insertQuery = await runQuery(
      "INSERT INTO hogehoge (title) VALUES (?)",
      ["asyncエラーあり"]
    );
    console.log(`ID番号${insertQuery.lastID}`);
    const row = await getQuery("SELECT * FROM hugahuga WHERE id = ?", [
      insertQuery.lastID,
    ]);
    console.log(row);
  } catch (error) {
    console.error(error.message);
  } finally {
    await runQuery("DROP TABLE books");
    db.close();
  }
}

main();
