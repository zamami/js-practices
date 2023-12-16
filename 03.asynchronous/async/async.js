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
try {
  await runQuery(db, "INSERT INTO hogehoge (title) VALUES (?)", [
    "asyncエラーあり",
  ]);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  }
}
try {
  await getQuery(db, "SELECT * FROM fugafuga WHERE id = ?", [1]);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  }
}
await runQuery(db, "DROP TABLE books");
await closeDb(db);
