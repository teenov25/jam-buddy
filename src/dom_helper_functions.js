const { domElements } = require("./dom_elements");
const {
  calculateAroundDistance,
  calculateForwardDistance,
} = require("./helper_functions");
const { checkAnswerMessage, notes, className } = require("./helper_objects");

let streak = 0;

function disableUserInputs() {
  domElements.userAnswer.disabled = true;
  domElements.submitButton.disabled = true;
}

function enableUserInputs() {
  domElements.userAnswer.disabled = false;
  domElements.submitButton.disabled = false;
}

function handleCorrectAnswer(note1, note2) {
  showMessage(checkAnswerMessage.correctAnswer);
  incrementStreak();
  displayAllNotes();
  disableUserInputs();
  domElements.explanation.textContent = explanation(note1, note2, true);
}

function handleIncorrectAnswer() {
  showMessage(checkAnswerMessage.incorrectAnswer);
  resetStreak();
  enableUserInputs();
}

function displayAllNotes() {
  const note1 = domElements.note1Element.textContent;
  const note2 = domElements.note2Element.textContent;

  const notesDisplay = domElements.notesDisplay;
  notesDisplay.textContent = "";

  notes.forEach((noteGroup) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note-group";

    if (Array.isArray(noteGroup)) {
      const highlightedNotes = noteGroup
        .map((note) => {
          if (note === note1 || note === note2) {
            return `<span class=${className.highlightedNotes}>${note}</span>`;
          }
          return note;
        })
        .join(" ");

      noteElement.innerHTML = highlightedNotes;
    } else {
      noteElement.textContent = noteGroup;
      if (noteGroup === note1 || noteGroup === note2) {
        noteElement.classList.add(className.highlightedNotes);
      }
    }

    notesDisplay.appendChild(noteElement);
  });
}

function explanation(note1, note2, val) {
  if (val) {
    return `${note1} is ${calculateForwardDistance(
      note1,
      note2
    )} note(s) Clockwise and  ${calculateAroundDistance(
      note1,
      note2
    )} note(s) Anti-clockwise away from note ${note2}`;
  }
  return "";
}

function resetStreak() {
  streak = 0;
  updateStreakDisplay();
}

function updateStreakDisplay() {
  const streakElement = domElements.streakDisplay;
  streakElement.textContent = `Streak: ${streak}`;
}
function incrementStreak() {
  streak++;
  updateStreakDisplay();
}

function showMessage(message) {
  const messageElement = domElements.message;
  messageElement.textContent = message;
  setTimeout(() => {
    messageElement.textContent = "";
  }, 3000);
}

module.exports = {
  showMessage,
  updateStreakDisplay,
  resetStreak,
  incrementStreak,
  explanation,
  displayAllNotes,
  handleCorrectAnswer,
  handleIncorrectAnswer,
  enableUserInputs,
  disableUserInputs,
};
