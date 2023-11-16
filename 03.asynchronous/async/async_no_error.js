import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

const runQuery = async (query, params = []) => {
  return new Promise((resolve) => {
    db.run(query, params, function () {
      resolve(this.lastID);
    });
  });
};

const getQuery = async (query, params = []) => {
  return new Promise((resolve) => {
    db.get(query, params, (_, row) => {
      resolve(row);
    });
  });
};

const main = async () => {
  await runQuery(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )"
  );
  const lastID = await runQuery("INSERT INTO books(title) VALUES (?)", [
    "Promiseエラーなし",
  ]);
  console.log(`ID番号${lastID}`);
  const row = await getQuery("SELECT * FROM books WHERE id = ?", [lastID]);
  console.log(row);
  await runQuery("DROP TABLE books");
  db.close();
};

main();
