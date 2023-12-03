import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      "callbackエラーあり",
      function (err) {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`ID番号${this.lastID}`);
        db.get(
          "SELECT * FROM books WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              console.error(err.message);
              return;
            }
            console.log(row);
            db.run("DROP TABLE books", (err) => {
              if (err) {
                console.error(err.message);
                return;
              }
              db.close();
            });
          }
        );
      }
    );
  }
);
