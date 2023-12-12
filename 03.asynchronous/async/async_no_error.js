import { runQuery, getQuery, db } from "../async/async_module.js";

async function main() {
  await runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  const insertQuery = await runQuery("INSERT INTO books(title) VALUES (?)", [
    "asyncエラーなし",
  ]);
  console.log(`ID番号${insertQuery.lastID}`);
  const row = await getQuery("SELECT * FROM books WHERE id = ?", [
    insertQuery.lastID,
  ]);
  console.log(row);
  await runQuery("DROP TABLE books");
  db.close();
}

main();
