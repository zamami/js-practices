import {
  db,
  closeDb,
  runQuery,
  getQuery,
} from "./promise_module.js";

runQuery(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    runQuery(db, "INSERT INTO hogehoge (title) VALUES (?)", [
      "Promiseエラーあり",
    ])
  )
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => getQuery(db, "SELECT * FROM fugafuga WHERE id = ?", [1]))
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => runQuery(db, "DROP TABLE books"))
  .then(() => closeDb(db));
