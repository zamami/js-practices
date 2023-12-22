import { MemoController } from "./memo_controller.js";
import { MemoStdin } from "./memo_stdin.js";

const argv = process.argv[2];
const memoController = new MemoController(argv);
const memoStdin = new MemoStdin();
async function main(argv) {
  if (argv === "-l") {
    memoController.showMemos();
  } else if (argv === "-r") {
    memoController.showMemo();
  } else if (argv === "-d") {
    memoController.deleteMemo();
  } else {
    const lines = await memoStdin.showLines();
    await memoController.addMemo(lines);
  }
}

main(argv);
