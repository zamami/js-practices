import sqlite3 from "sqlite3";
const db = new (sqlite3.verbose().Database)(":memory:");

const run = (query, params = []) => {
  return new Promise((resolve) => {
    db.run(query, params, function () {
      return resolve(this);
    });
  });
};

const get = (query, params = []) => {
  return new Promise((resolve) => {
    db.get(query, params, function (err, row) {
      resolve(row);
    });
  });
};

const createTableQuery =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )";
const insertRowQuery = "INSERT INTO books(title) VALUES (?)";
const selectRowQuery = "SELECT * FROM books WHERE id = ?";
const dropRowQuery = "DROP TABLE books";
run(createTableQuery)
  .then(() => run(insertRowQuery, "Promiseエラーなし"))
  .then(function (res) {
    console.log(`ID番号${res.lastID}`);
    return get(selectRowQuery, [res.lastID]);
  })
  .then((row) => {
    console.log(row);
    return run(dropRowQuery);
  })
  .then(() => {
    db.close();
  });
