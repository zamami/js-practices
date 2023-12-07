import { runQuery, getQuery, db } from "../async/async_module.js";

async function main() {
  await runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )"
  );
  try {
    await runQuery("INSERT INTO hogehoge (title) VALUES (?)", [
      "asyncエラーあり",
    ]);
  } catch (error) {
    console.error(error.message);
  }
  try {
    await getQuery("SELECT * FROM hugahuga WHERE id = ?", [1]);
  } catch (error) {
    console.error(error.message);
  }
  await runQuery("DROP TABLE books");
  db.close();
}

main();
