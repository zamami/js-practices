import {MemoModel} from "./memo_model.js";

export class MemoController {
    constructor() {
        this.memoModel = new MemoModel();
    }
    async showMemos(){
        try {
            const memos = await this.memoModel.getAllQuery("SELECT * FROM memos");
            memos.forEach(memo => {
                const firstLine = memo.title.split('\n')[0];
                console.log(firstLine);
            });
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        }
        await this.memoModel.closeDb();

    }

    showMemo(){
        console.log('-dオプションが実行されました')
    }

    deleteMemo(){
        console.log('-dオプションが実行されました')
    }

    async addMemo(lines){
        await this.memoModel.runQuery(
            "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)"
        );
        try {
            await this.memoModel.runQuery("INSERT INTO memos (title) VALUES (?)", [
                lines.join('\n')
            ]);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        }
        try {
            const memo = await this.memoModel.getQuery("SELECT * FROM memos WHERE id = last_insert_rowid()");
            console.log(`メモを追加しました：${memo.title}`);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        }
        await this.memoModel.closeDb();
    }
}
