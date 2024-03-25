const notes = [
  "A",
  ["A#", "Bb"],
  "B",
  "C",
  ["C#", "Db"],
  "D",
  ["D#", "Eb"],
  "E",
  "F",
  ["F#", "Gb"],
  "G",
  ["G#", "Ab"],
];

const errorMessage = {
  incorrectNote: "Enter correct note.",
  stringNote: "Input must be a string.",
  invalidNum: "Input must be a number.",
  invalidArray: "Input should be an array of two notes.",
};
const checkAnswerMessage = {
  invalidInput: "Please enter a valid number.",
  negativeInput: "Number should be positive.",
  correctAnswer: "Correct answer! You got it!",
  incorrectAnswer: "Incorrect answer. Try again.",
  outOfRange: "Input out of range",
};

const className = {
  highlightedNotes: "highlighted-note",
};
module.exports = { notes, errorMessage, checkAnswerMessage, className };
