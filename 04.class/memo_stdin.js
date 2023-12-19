import readline from "readline";

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
}
