import { db, runQuery, getQuery } from "./promise_module.js";
runQuery(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )"
)
  .then(() =>
    runQuery("INSERT INTO hogehoge (title) VALUES (?)", ["promiseエラーあり"])
  )
  .catch((err) => {
    console.error(`${err.message}`);
    return Promise.resolve();
  })
  .then(() => {
    return getQuery("SELECT * FROM hugahuga WHERE id = ?", [1]);
  })
  .catch((err) => {
    console.error(`${err.message}`);
  })
  .then(() => {
    return runQuery("DROP TABLE books");
  })
  .then(() => db.close());
