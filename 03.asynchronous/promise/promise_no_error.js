import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

const runQuery = (query, params = []) => {
  return new Promise((resolve) => {
    db.run(query, params, function () {
      resolve(this.lastID);
    });
  });
};

const getQuery = (query, params = []) => {
  return new Promise((resolve) => {
    db.get(query, params, (_, row) => {
      resolve(row);
    });
  });
};

runQuery(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )"
)
  .then(() =>
    runQuery("INSERT INTO books(title) VALUES (?)", ["Promiseエラーなし"])
  )
  .then((lastID) => {
    console.log(`ID番号${lastID}`);
    return getQuery("SELECT * FROM books WHERE id = ?", [lastID]);
  })
  .then((row) => {
    console.log(row);
    return runQuery("DROP TABLE books");
  })
  .then(() => db.close())
