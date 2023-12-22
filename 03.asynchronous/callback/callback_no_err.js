import { db } from "../utility_function/db_methods.js";

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      "callbackエラーなし",
      function () {
        console.log(this.lastID);
        db.get("SELECT * FROM books WHERE id = ?", [this.lastID], (_, row) => {
          console.log(row);
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      }
    );
  }
);
