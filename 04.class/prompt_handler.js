import readline from "readline";
import pkg from "enquirer";

const { Select } = pkg;
export class PromptHandler {
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

  createPrompt(memos, message, nameProperty) {
    return new Promise((resolve, reject) => {
      const promptMemos = memos.map((memo) => {
        const firstLine = memo.title.split(`\n`)[0];
        return { name: memo[nameProperty], message: firstLine };
      });

      const prompt = new Select({
        name: "memo",
        message: message,
        choices: promptMemos,
      });

      prompt
        .run()
        .then((answer) => resolve(answer))
        .catch((err) => {
          console.error("An error occurred while selecting a memo:", err);
          reject(err);
        });
    });
  }

  selectMemo(memos) {
    return this.createPrompt(memos, "Choose a note you want to see:", "title");
  }

  deleteMemo(memos) {
    return this.createPrompt(memos, "Choose a note you want to delete:", "id");
  }
}
