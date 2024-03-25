const {
  validateNotes,
  validateNum,
  validateInputType,
  generateRandomIndex,
  calculateAroundDistance,
  calculateForwardDistance,
} = require("./helper_functions");
const { notes } = require("./helper_objects");

class JamBuddy {
  setCurrentNotes(notesArray) {
    validateInputType(notesArray);

    const [note1, note2] = notesArray;
    validateNotes(note1, note2, notes);

    this.note1 = note1;
    this.note2 = note2;
  }

  getCurrentNotes() {
    return [this.note1, this.note2];
  }

  checkAnswer(num) {
    validateNum(num);

    return (
      num === calculateAroundDistance(this.note1, this.note2) ||
      num === calculateForwardDistance(this.note1, this.note2)
    );
  }

  randomizeCurrentNotes() {
    for (let i = 0; i < notes.length; i++) {
      let note1, note2;
      const firstIndex = generateRandomIndex(notes);
      const secondIndex = generateRandomIndex(notes);
      if (firstIndex !== secondIndex) {
        note1 = notes[firstIndex];
        note2 = notes[secondIndex];
        if (typeof note1 === "object") {
          note1 = note1[generateRandomIndex(note1)];
        }
        if (typeof note2 === "object") {
          note2 = note2[generateRandomIndex(note2)];
        }
        return this.setCurrentNotes([note1, note2]);
      }
    }
  }
}
module.exports = { JamBuddy };
