import { MemoRepository } from "./memo_repository.js";
import { PromptHandler } from "./prompt_handler.js";

export class MemoController {
  constructor() {
    this.memoRepository = new MemoRepository();
    this.promptHandler = new PromptHandler();
  }

  async showMemos() {
    try {
      const memos = await this.memoRepository.getAllMemos();
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
    await this.memoRepository.dbHandler.closeDb();
  }

  async showMemo() {
    try {
      const memos = await this.memoRepository.getAllMemos();
      if (!memos || memos.length === 0) {
        throw new Error("No memos available to display.");
      }
      await this.promptHandler.selectMemo(memos);
    } catch (err) {
      console.error(err.message);
    }
    await this.memoRepository.dbHandler.closeDb();
  }

  async deleteMemo() {
    try {
      const memos = await this.memoRepository.getAllMemos();
      const selectedId = await this.promptHandler.deleteMemo(memos);
      await this.memoRepository.deleteMemo(selectedId);
    } catch (err) {
      console.error(err.message);
    }
    await this.memoRepository.dbHandler.closeDb();
  }

  async addMemo(lines) {
    await this.memoRepository.createTable();
    try {
      const lastID = await this.memoRepository.addMemo(lines.join("\n"));
      const memo = await this.memoRepository.getMemoById(lastID);
      console.log(`メモを追加しました：${memo.title}`);
    } catch (err) {
      console.error(err.message);
    }
    await this.memoRepository.dbHandler.closeDb();
  }

  async handleUserInput() {
    const lines = await this.promptHandler.showLines();
    await this.addMemo(lines);
  }
}
