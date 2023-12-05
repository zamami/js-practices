import { db, runQuery, getQuery } from "./promise_module.js";

runQuery(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )"
)
  .then(() =>
    runQuery("INSERT INTO books(title) VALUES (?)", ["Promiseエラーなし"])
  )
  .then((result) => {
    console.log(`ID番号${result.lastID}`);
    return getQuery("SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log(row);
    return runQuery("DROP TABLE books");
  })
  .then(() => db.close());
