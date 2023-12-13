import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");
db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO hogehoge (title) VALUES (?)",
      "callbackエラーあり",
      (err) => {
        if (err) {
          console.error(err.message);
        }
        db.get("SELECT * FROM hugahuga WHERE id = ?", [1], (err) => {
          if (err) {
            console.error(err.message);
          }
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      }
    );
  }
);
