import { DatabaseHandler } from "./database_handler.js";

export class MemoRepository {
  constructor() {
    this.dbHandler = new DatabaseHandler("memo_app.db");
  }

  createTable() {
    return this.dbHandler.runQuery(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );
  }

  addMemo(title) {
    return new Promise((resolve, reject) => {
      this.dbHandler.db.run(
        "INSERT INTO memos (title) VALUES (?)",
        [title],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  getAllMemos() {
    return this.dbHandler.getAllQuery("SELECT * FROM memos");
  }

  getMemoById(id) {
    return this.dbHandler.getQuery("SELECT * FROM memos WHERE id = ?", [id]);
  }

  deleteMemo(id) {
    return this.dbHandler.runQuery("DELETE FROM memos WHERE id = ?", [id]);
  }
}
