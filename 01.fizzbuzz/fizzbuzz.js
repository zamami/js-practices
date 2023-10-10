const nums = [...Array(20)].map((_, i) => i + 1);

for (const num of nums) {
  if (num % 15 === 0) {
    console.log("FizzBuzz");
  } else if (num % 3 === 0) {
    console.log("Fizz");
  } else if (num % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(num);
  }
}
