const { JamBuddy } = require("./jam_buddy");
const { checkAnswerMessage } = require("./helper_objects");

const { domElements } = require("./dom_elements");
const {
  showMessage,
  updateStreakDisplay,
  explanation,
  displayAllNotes,
  handleCorrectAnswer,
  handleIncorrectAnswer,
  enableUserInputs,
  disableUserInputs,
  resetStreak,
} = require("./dom_helper_functions");

const jamBuddy = new JamBuddy();

function displayRandomNotes() {
  domElements.userAnswer.value = "";
  jamBuddy.randomizeCurrentNotes();
  const [note1, note2] = jamBuddy.getCurrentNotes();
  domElements.note1Element.textContent = `${note1}`;
  domElements.note2Element.textContent = `${note2}`;
  enableUserInputs();
  domElements.giveUpButton.disabled = false;
  domElements.explanation.textContent = "";
  domElements.notesDisplay.textContent = "";
}

function checkUserAnswer() {
  const userAnswer = parseInt(domElements.userAnswer.value);

  if (userAnswer <= 0 || userAnswer > 11) {
    showMessage(checkAnswerMessage.outOfRange);
  } else {
    if (jamBuddy.checkAnswer(userAnswer)) {
      const note1 = domElements.note1Element.textContent;
      const note2 = domElements.note2Element.textContent;
      handleCorrectAnswer(note1, note2);
    } else {
      handleIncorrectAnswer();
    }
  }
  domElements.userAnswer.value = "";
}

function toggleRandomizeButton(value) {
  domElements.randomizeNotes.disabled = value;
}

function giveUp() {
  const note1 = domElements.note1Element.textContent;
  const note2 = domElements.note2Element.textContent;
  disableUserInputs();
  toggleRandomizeButton(true);
  displayAllNotes();
  domElements.explanation.textContent = explanation(note1, note2, true);
}
function restart() {
  const note1 = domElements.note1Element.textContent;
  const note2 = domElements.note2Element.textContent;
  enableUserInputs();
  toggleRandomizeButton(false);
  displayRandomNotes();
  resetStreak();
  updateStreakDisplay();
  domElements.explanation.textContent = explanation(note1, note2, false);
  domElements.notesDisplay.textContent = "";
}

(() => {
  displayRandomNotes();
  domElements.randomizeNotes.addEventListener("click", displayRandomNotes);
})();
(() => {
  domElements.giveUpButton.addEventListener("click", giveUp);
})();
(() => {
  domElements.submitButton.addEventListener("click", checkUserAnswer);
})();
(() => {
  domElements.restartButton.addEventListener("click", restart);
})();

module.exports = {
  displayRandomNotes,
  checkUserAnswer,
  giveUp,
  restart,
  jamBuddy,
  explanation,
};
