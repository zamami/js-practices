import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

const runQuery = async (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const getQuery = async (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const main = async () => {
  try {
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
  } catch (err) {
    console.error(err.message);
  }
};

main();
