import {runQuery, getQuery, db} from "../async/async_module.js";

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
