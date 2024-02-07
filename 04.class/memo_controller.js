import { MemoModel } from "./memo_model.js";
import { PromptHandler } from "./prompt_handler.js";

const promptHandler = new PromptHandler();
export class MemoController {
  constructor() {
    this.memoModel = new MemoModel();
    this.promptHandler = new PromptHandler();
  }
  async showMemos() {
    try {
      const memos = await this.memoModel.getAllQuery("SELECT * FROM memos");
      if (!memos || memos.length === 0) {
        throw new Error("No memos available to display.");
      }
      memos.forEach((memo) => {
        const firstLine = memo.title.split("\n")[0];
        console.log(firstLine);
      });
    } catch (err) {
      console.error(err.message);
    }
    await this.memoModel.closeDb();
  }

  async showMemo() {
    try {
      const memos = await this.memoModel.getAllQuery("SELECT * FROM memos");
      if (!memos || memos.length === 0) {
        throw new Error("No memos available to display.");
      }
      await promptHandler.selectMemo(memos);
    } catch (err) {
      console.error(err.message);
    }
    await this.memoModel.closeDb();
  }

  async deleteMemo() {
    try {
      const memos = await this.memoModel.getAllQuery("SELECT * FROM memos");
      const selectedId = await this.promptHandler.deleteMemo(memos);
      await this.memoModel.deleteQuery(selectedId);
    } catch (err) {
      console.error(err.message);
    }
    await this.memoModel.closeDb();
  }

  async addMemo(lines) {
    await this.memoModel.runQuery(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );
    try {
      await this.memoModel.runQuery("INSERT INTO memos (title) VALUES (?)", [
        lines.join("\n"),
      ]);
    } catch (err) {
      console.error(err.message);
    }
    try {
      const memo = await this.memoModel.getQuery(
        "SELECT * FROM memos WHERE id = last_insert_rowid()"
      );
      console.log(`メモを追加しました：${memo.title}`);
    } catch (err) {
      console.error(err.message);
    }
    await this.memoModel.closeDb();
  }

  async handleUserInput() {
    const lines = await this.promptHandler.showLines();
    await this.addMemo(lines);
  }
}
