import {
  db,
  closeDb,
  runQuery,
  getQuery,
} from "../promise/promise_module.js";

await runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
);
const result = await runQuery(db, "INSERT INTO books(title) VALUES (?)", [
  "asyncエラーなし",
]);
console.log(result.lastID);
const row = await getQuery(db, "SELECT * FROM books WHERE id = ?", [
  result.lastID,
]);
console.log(row);
await runQuery(db, "DROP TABLE books");
await closeDb(db);
