const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const html = fs.readFileSync("index.html", "utf-8", (data) => data);
const dom = new JSDOM(html).window;
const document = dom.document;
global.document = document;
global.window = dom;
const { checkAnswerMessage } = require("../src/helper_objects");
const {
  jamBuddy,
  checkUserAnswer,
  displayRandomNotes,
  giveUp,
  restart,
  explanation,
} = require("../src/semitone_dom");
const { domElements } = require("../src/dom_elements");
const { resetStreak } = require("../src/dom_helper_functions");

const notesDisplay = domElements.notesDisplay;
const userAnswerElement = domElements.userAnswer;
const messageElement = domElements.message;
const submitButton = domElements.submitButton;
const streak = domElements.streakDisplay;
const note1 = domElements.note1Element;
const note2 = domElements.note2Element;
const explanationMessage = domElements.explanation;
const allNotes = "AA# BbBCC# DbDD# EbEFF# GbGG# Ab";

describe("Randomize Notes Button", () => {
  it('should display random notes when the "Get Random Notes" button is clicked', () => {
    displayRandomNotes();

    const note1Text = note1.textContent;
    const note2Text = note2.textContent;

    expect(note1Text).not.toBe(note2Text);
  });

  it(`should reset the user's answer/input when the "Get Random Notes" button is clicked`, () => {
    userAnswerElement.value = 1;

    displayRandomNotes();

    expect(userAnswerElement.value).toBe("");
  });
});

describe("restart button", () => {
  beforeEach(() => {
    restart();
  });

  it("should reset the notes display", () => {
    expect(notesDisplay.textContent).toBe("");
  });

  it("should reset the streak", () => {
    expect(streak.textContent).toBe("Streak: 0");
  });

  it("should reset the random notes", () => {
    const note1Text = (note1.textContent = "");
    const note2Text = (note2.textContent = "");

    restart();

    expect(note1Text.textContent).not.toBe("");

    expect(note2Text.textContent).not.toBe("");
  });

  it("should reset the user answer", () => {
    userAnswerElement.value = 2;

    restart();

    expect(userAnswerElement.value).toBe("");
  });

  it("should reset the explanation message", () => {
    expect(explanationMessage.textContent).toBe("");
  });
});

describe("Give up button", () => {
  it("should display notes when give up button is clicked", () => {
    giveUp();

    expect(notesDisplay.textContent).toBe(allNotes);
  });

  it("should display the explanation when give up button is clicked", () => {
    const note1Text = (note1.textContent = "A");
    const note2Text = (note2.textContent = "B");

    giveUp();

    expect(explanationMessage.textContent).toBe(
      explanation(note1Text, note2Text, true)
    );
  });

  it("should disable user answer field random notes, submit answer buttons when give up is clicked", () => {
    giveUp();

    expect(submitButton.disabled).toBe(true);

    const randomizeNotesButton = domElements.randomizeNotes;

    expect(randomizeNotesButton.disabled).toBe(true);

    expect(userAnswerElement.disabled).toBe(true);
  });
});

describe("Submit Answer Button", () => {
  const noteArray = ["A", "B"];
  beforeEach(() => {
    jamBuddy.setCurrentNotes(noteArray);
  });

  it(`should display error message when input is not in the range of 1 to 11 when "Submit Answer is clicked"`, () => {
    userAnswerElement.value = 12;

    checkUserAnswer();

    expect(messageElement.textContent).toBe(checkAnswerMessage.outOfRange);
  });

  it("should display correct message when input is correct", () => {
    userAnswerElement.value = 2;

    checkUserAnswer();

    expect(messageElement.textContent).toBe(checkAnswerMessage.correctAnswer);
  });
  it("should display the all notes and explanation when user answer is correct", () => {
    userAnswerElement.value = 2;

    checkUserAnswer();

    expect(notesDisplay.textContent).toBe(allNotes);

    expect(explanationMessage.textContent).toBe(
      explanation(note1.textContent, note2.textContent, true)
    );
  });

  it("should increment streak when user answer is correct", () => {
    resetStreak();

    userAnswerElement.value = 2;
    const streakText = streak.textContent;

    expect(streakText).toBe("Streak: 0");

    checkUserAnswer();

    const newStreakText = streak.textContent;

    expect(newStreakText).toBe("Streak: 1");
  });

  it("should display incorrect message when user answer is incorrect", () => {
    userAnswerElement.value = 3;

    checkUserAnswer();

    expect(messageElement.textContent).toBe(checkAnswerMessage.incorrectAnswer);
  });

  it("should disable user answer and submit button when the user answer is correct", () => {
    userAnswerElement.value = 2;

    checkUserAnswer();

    expect(submitButton.disabled).toBe(true);

    expect(userAnswerElement.disabled).toBe(true);
  });
});
