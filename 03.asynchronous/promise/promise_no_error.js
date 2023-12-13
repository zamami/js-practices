import { closeDb, runQuery, getQuery } from "./promise_module.js";

runQuery(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    runQuery("INSERT INTO books (title) VALUES (?)", ["Promiseエラーなし"])
  )
  .then((result) => {
    console.log(result.lastID);
    return getQuery("SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log(row);
    return runQuery("DROP TABLE books");
  })
  .then(() => closeDb());
