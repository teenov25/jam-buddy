function StringChallenge(str) {
 // Create a dictionary to map words to numbers
 const wordToNumber = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  plus: "+",
  minus: "-",
 };

 // Replace words with corresponding numbers and operators
 let expression = str.replace(
  /(zero|one|two|three|four|five|six|seven|eight|nine|plus|minus)/g,
  (match) => wordToNumber[match]
 );

 // Evaluate the expression
 let result = eval(expression);

 // Convert the result back to its written-out form
 let finalResult = "";
 if (result < 0) {
  finalResult = "negative";
  result *= -1;
 }

 while (result > 0) {
  let digit = result % 10;
  finalResult =
   Object.keys(wordToNumber).find((key) => wordToNumber[key] === digit) +
   finalResult;
  result = Math.floor(result / 10);
 }

 return finalResult || "zero"; // Return "zero" if the result is 0
}

// Test cases
console.log(StringChallenge("foursixminustwotwoplusonezero")); // Output: threefour
console.log(StringChallenge("onezeropluseight")); // Output: oneeight
console.log(StringChallenge("oneminusoneone")); // Output: negativeonezero
