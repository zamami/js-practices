import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = new Date();
const month = argv.m ?? now.getMonth() + 1;
const year = argv.y ?? now.getFullYear();

const lastDate = new Date(year, month, 0);

// 月末日を取得し、月の期間を作成
const formattedDays = [];
for (let i = 1; i < lastDate.getDate() + 1; i++) {
  const day = i < 10 ? ` ${i}` : i.toString();
  formattedDays.push(day);
}

const firstDate = new Date(year, month - 1, 1);

// 月初の曜日を取得し（0から6の整数)、曜日のスタート位置の分だけ、空白をdaysに入れる
for (let i = 0; i < firstDate.getDay(); i++) {
  formattedDays.unshift("  ");
}

console.log(`       ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

const daysPerWeek = 7; // 1週間の日数で区切り、要素をくっつけて表示
for (let i = 0; i < formattedDays.length; i += daysPerWeek) {
  const weekDays = formattedDays.slice(i, i + daysPerWeek); // １週間分の日付
  console.log(weekDays.join(" "));
}
console.log();
