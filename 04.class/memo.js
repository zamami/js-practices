import { MemoController } from "./memo_controller.js";

const argv = process.argv[2];
const memoController = new MemoController(argv);

async function main(argv) {
  if (argv === "-l") {
    await memoController.showMemos();
  } else if (argv === "-r") {
    await memoController.showMemo();
  } else if (argv === "-d") {
    await memoController.deleteMemo();
  } else {
    await memoController.handleUserInput();
  }
}

main(argv).catch((err) => console.log(err.message));
