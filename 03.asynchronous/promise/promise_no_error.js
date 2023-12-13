import {
  initializeDatabase,
  closeDb,
  runQuery,
  getQuery,
} from "./promise_module.js";

const db = initializeDatabase();
runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    runQuery(db, "INSERT INTO books (title) VALUES (?)", ["Promiseエラーなし"])
  )
  .then((result) => {
    console.log(result.lastID);
    return getQuery(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log(row);
    return runQuery(db, "DROP TABLE books");
  })
  .then(() => closeDb(db));
