import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = new Date();
const month = argv.m|| now.getMonth() + 1;
const year = argv.y || now.getFullYear();

// 月末日を取得
const lastDate = new Date(year, month, 0).getDate();

// 月の期間を作成
const days = [];
for (let i = 1; i < lastDate + 1; i++) {
  if (i < 10) {
    i = " " + i.toString();
  } // 1~9の見た目調整
  days.push(i);
}

// 月初の曜日を取得（0から6の整数)
const dayOfWeek = (new Date(year, month - 1, 1)).getDay();

// 曜日のスタート位置の分だけ、空白をdaysに入れる
for (let i = 0; i < dayOfWeek; i++) {
  days.unshift("  ");
}

console.log(`       ${month}月 ${year}\n日 月 火 水 木 金 土`);

const oneWeek = 7; // ７日ごとに区切り、要素をくっつけて表示
for (let i = 0; i < days.length; i += oneWeek) {
  const week = days.slice(i, i + oneWeek);
  console.log(week.join(" "));
}
process.stdout.write("\n");
