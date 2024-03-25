const { errorMessage, checkAnswerMessage } = require("../src/helper_objects");
const { JamBuddy } = require("../src/jam_buddy");

describe("JamBuddy", () => {
  let buddy, buddy2, buddy3;
  let normalNotes, flatNotes, sharpNotes;

  beforeEach(() => {
    buddy = new JamBuddy();
    buddy2 = new JamBuddy();
    buddy3 = new JamBuddy();

    normalNotes = ["A", "F"];
    flatNotes = ["Bb", "Db"];
    sharpNotes = ["A#", "C#"];

    buddy.setCurrentNotes(normalNotes);
    buddy2.setCurrentNotes(flatNotes);
    buddy3.setCurrentNotes(sharpNotes);
  });
  describe("randomizeCurrentNotes", () => {
    it("should return two random notes that are not equal", () => {
      buddy.randomizeCurrentNotes();
      buddy2.randomizeCurrentNotes();
      buddy3.randomizeCurrentNotes();

      let firstNote = buddy.note1;
      let secondNote = buddy.note2;

      expect(firstNote === secondNote).toBeFalse();

      firstNote = buddy2.note1;
      secondNote = buddy2.note2;

      expect(firstNote === secondNote).toBeFalse();
    });
  });
  describe("setCurrentNotes", () => {
    it("should throw an error if invalid notes are selected", () => {
      expect(function () {
        buddy.setCurrentNotes(["B#", "F"]);
      }).toThrowError(errorMessage.incorrectNote);

      expect(function () {
        buddy.setCurrentNotes(["A", "E#"]);
      }).toThrowError(errorMessage.incorrectNote);

      expect(function () {
        buddy2.setCurrentNotes(["Cb", "Fb"]);
      }).toThrowError(errorMessage.incorrectNote);

      expect(function () {
        buddy.setCurrentNotes([1, 2]);
      }).toThrowError(errorMessage.stringNote);

      expect(function () {
        buddy.setCurrentNotes([]);
      }).toThrowError(errorMessage.invalidArray);

      expect(function () {
        buddy.setCurrentNotes();
      }).toThrowError(errorMessage.invalidArray);
    });
    it("should set the current notes", () => {
      let note1 = buddy.note1;
      let note2 = buddy.note2;

      expect(note1).toBe("A");
      expect(note2).toBe("F");

      note1 = buddy2.note1;
      note2 = buddy2.note2;

      expect(note1).toBe("Bb");
      expect(note2).toBe("Db");
    });
  });
  describe("checkAnswer", () => {
    it("should throw an error if checkAnswer input is not a number", () => {
      expect(function () {
        buddy.checkAnswer("1");
      }).toThrowError(errorMessage.invalidNum);

      expect(function () {
        buddy2.checkAnswer("A");
      }).toThrowError(errorMessage.invalidNum);
    });
    it("should throw an error if checkAnswer input is a negative number", () => {
      expect(function () {
        buddy2.checkAnswer(-2);
      }).toThrowError(checkAnswerMessage.negativeInput);
    });
    it("should return true if the input of checkAnswer is equal to the semitone difference", () => {
      expect(buddy.checkAnswer(8)).toBeTrue();
      expect(buddy.checkAnswer(4)).toBeTrue();

      expect(buddy2.checkAnswer(3)).toBeTrue();
      expect(buddy2.checkAnswer(9)).toBeTrue();

      expect(buddy3.checkAnswer(3)).toBeTrue();
      expect(buddy3.checkAnswer(9)).toBeTrue();
    });
  });
  describe("getCurrentNotes", () => {
    it("should return currently selected notes", () => {
      expect(buddy.getCurrentNotes()).toEqual(normalNotes);

      expect(buddy2.getCurrentNotes()).toEqual(flatNotes);

      expect(buddy3.getCurrentNotes()).toEqual(sharpNotes);
    });
  });
});
