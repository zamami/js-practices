import {
  db,
  closeDb,
  runQuery,
  getQuery,
} from "../utility_function/databaseUtils.js";

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
