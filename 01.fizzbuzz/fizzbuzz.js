let nums = [...Array(20)].map((_, i) => i + 1);

for (let num of nums) {
  if (num % 15 === 0) {
    console.log("fizzbuzz");
  } else if (num % 3 === 0) {
    console.log("fizz");
  } else if (num % 5 === 0) {
    console.log("buzz");
  } else {
    console.log(num);
  }
}
