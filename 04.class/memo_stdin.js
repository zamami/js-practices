import readline from "readline";
import pkg from "enquirer";

const { Select } = pkg;
export class MemoStdin {
  constructor() {
    this.lines = [];
  }

  showLines() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
      });

      rl.on("line", (line) => {
        this.lines.push(line);
      });

      rl.on("close", () => {
        resolve(this.lines);
      });
    });
  }

  selectMemo(memos) {
    return new Promise((resolve) => {
      const promptMemos = memos.map((memo) => {
        const firstLine = memo.title.split(`\n`)[0];
        return { name: memo.title, message: firstLine };
      });
      const prompt = new Select({
        name: "memo",
        message: "Choose a note you want to see:",
        choices: promptMemos,
      });

      prompt
        .run()
        .then((answer) => resolve(answer))
        .catch(console.error);
    });
  }
}
