const { errorMessage, checkAnswerMessage, notes } = require("./helper_objects");

const validateNotes = (note1, note2, notesArray) => {
  if (typeof note1 !== "string" || typeof note2 !== "string") {
    throw new Error(errorMessage.stringNote);
  }

  if (
    !notesArray.some((note) => note.includes(note1)) ||
    !notesArray.some((note) => note.includes(note2))
  ) {
    throw new Error(errorMessage.incorrectNote);
  }
};

const validateNum = (num) => {
  if (typeof num !== "number") {
    throw new Error(errorMessage.invalidNum);
  }
  if (num < 0) {
    throw new Error(checkAnswerMessage.negativeInput);
  }
};

const validateInputType = (input) => {
  if (!Array.isArray(input) || input.length !== 2) {
    throw new Error(errorMessage.invalidArray);
  }
};

const generateRandomIndex = (notes) => {
  return Math.floor(Math.random() * notes.length);
};

const generateIndex = (note) => {
  return notes.findIndex((obj) => obj.includes(note));
};

const calculateForwardDistance = (note1, note2) => {
  const note1Index = generateIndex(note1);
  const note2Index = generateIndex(note2);
  return Math.abs(note1Index - note2Index);
};

const calculateAroundDistance = (note1, note2) => {
  const forwardDistance = calculateForwardDistance(note1, note2);
  const distanceGoingAround = Math.abs(notes.length - forwardDistance);
  return distanceGoingAround;
};

module.exports = {
  validateNotes,
  validateNum,
  validateInputType,
  generateRandomIndex,
  calculateForwardDistance,
  calculateAroundDistance,
};
