import readline from "readline";
import pkg from 'enquirer';

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
                terminal: false
            });

            rl.on('line', (line) => {
                this.lines.push(line);
            });

            rl.on('close', () => {
                resolve(this.lines);
            });
        });
    }

    selectMemo(memos){
        return new Promise((resolve) => {
            const first_lines = memos.map(memo => memo.title.split('\n')[0]);
            const prompt = new Select({
                name: 'memo',
                message: 'Choose a note you want to see:',
                choices: first_lines
            });

            prompt.run()
                .then(answer => {
                    const selectedMemo = memos.find(memo => memo.title.split('\n')[0] === answer);
                    resolve(selectedMemo);
                })
                .catch(console.error);
        });
    }
}
