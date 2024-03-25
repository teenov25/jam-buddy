/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_elements.js":
/*!*****************************!*\
  !*** ./src/dom_elements.js ***!
  \*****************************/
/***/ ((module) => {

eval("const domElements = {\r\n  note1Element: document.getElementById(\"note1\"),\r\n  note2Element: document.getElementById(\"note2\"),\r\n  explanation: document.getElementById(\"explanation\"),\r\n  giveUpButton: document.getElementById(\"giveUpButton\"),\r\n  notesDisplay: document.getElementById(\"notesDisplay\"),\r\n  randomizeNotes: document.getElementById(\"randomizeNotes\"),\r\n  userAnswer: document.getElementById(\"userAnswer\"),\r\n  streakDisplay: document.getElementById(\"streakDisplay\"),\r\n  submitButton: document.getElementById(\"submitAnswer\"),\r\n  message: document.getElementById(\"message\"),\r\n  giveUpButton: document.getElementById(\"giveUpButton\"),\r\n  restartButton: document.getElementById(\"restartButton\"),\r\n};\r\n\r\nmodule.exports = { domElements };\r\n\n\n//# sourceURL=webpack://tm-novuka-199-semitone-difference-basic-algorithm-javascript/./src/dom_elements.js?");

/***/ }),

/***/ "./src/dom_helper_functions.js":
/*!*************************************!*\
  !*** ./src/dom_helper_functions.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { domElements } = __webpack_require__(/*! ./dom_elements */ \"./src/dom_elements.js\");\r\nconst {\r\n  calculateAroundDistance,\r\n  calculateForwardDistance,\r\n} = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\r\nconst { checkAnswerMessage, notes, className } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\n\r\nlet streak = 0;\r\n\r\nfunction disableUserInputs() {\r\n  domElements.userAnswer.disabled = true;\r\n  domElements.submitButton.disabled = true;\r\n}\r\n\r\nfunction enableUserInputs() {\r\n  domElements.userAnswer.disabled = false;\r\n  domElements.submitButton.disabled = false;\r\n}\r\n\r\nfunction handleCorrectAnswer(note1, note2) {\r\n  showMessage(checkAnswerMessage.correctAnswer);\r\n  incrementStreak();\r\n  displayAllNotes();\r\n  disableUserInputs();\r\n  domElements.explanation.textContent = explanation(note1, note2, true);\r\n}\r\n\r\nfunction handleIncorrectAnswer() {\r\n  showMessage(checkAnswerMessage.incorrectAnswer);\r\n  resetStreak();\r\n  enableUserInputs();\r\n}\r\n\r\nfunction displayAllNotes() {\r\n  const note1 = domElements.note1Element.textContent;\r\n  const note2 = domElements.note2Element.textContent;\r\n\r\n  const notesDisplay = domElements.notesDisplay;\r\n  notesDisplay.textContent = \"\";\r\n\r\n  notes.forEach((noteGroup) => {\r\n    const noteElement = document.createElement(\"div\");\r\n    noteElement.className = \"note-group\";\r\n\r\n    if (Array.isArray(noteGroup)) {\r\n      const highlightedNotes = noteGroup\r\n        .map((note) => {\r\n          if (note === note1 || note === note2) {\r\n            return `<span class=${className.highlightedNotes}>${note}</span>`;\r\n          }\r\n          return note;\r\n        })\r\n        .join(\" \");\r\n\r\n      noteElement.innerHTML = highlightedNotes;\r\n    } else {\r\n      noteElement.textContent = noteGroup;\r\n      if (noteGroup === note1 || noteGroup === note2) {\r\n        noteElement.classList.add(className.highlightedNotes);\r\n      }\r\n    }\r\n\r\n    notesDisplay.appendChild(noteElement);\r\n  });\r\n}\r\n\r\nfunction explanation(note1, note2, val) {\r\n  if (val) {\r\n    return `${note1} is ${calculateForwardDistance(\r\n      note1,\r\n      note2\r\n    )} note(s) Clockwise and  ${calculateAroundDistance(\r\n      note1,\r\n      note2\r\n    )} note(s) Anti-clockwise away from note ${note2}`;\r\n  }\r\n  return \"\";\r\n}\r\n\r\nfunction resetStreak() {\r\n  streak = 0;\r\n  updateStreakDisplay();\r\n}\r\n\r\nfunction updateStreakDisplay() {\r\n  const streakElement = domElements.streakDisplay;\r\n  streakElement.textContent = `Streak: ${streak}`;\r\n}\r\nfunction incrementStreak() {\r\n  streak++;\r\n  updateStreakDisplay();\r\n}\r\n\r\nfunction showMessage(message) {\r\n  const messageElement = domElements.message;\r\n  messageElement.textContent = message;\r\n  setTimeout(() => {\r\n    messageElement.textContent = \"\";\r\n  }, 3000);\r\n}\r\n\r\nmodule.exports = {\r\n  showMessage,\r\n  updateStreakDisplay,\r\n  resetStreak,\r\n  incrementStreak,\r\n  explanation,\r\n  displayAllNotes,\r\n  handleCorrectAnswer,\r\n  handleIncorrectAnswer,\r\n  enableUserInputs,\r\n  disableUserInputs,\r\n};\r\n\n\n//# sourceURL=webpack://tm-novuka-199-semitone-difference-basic-algorithm-javascript/./src/dom_helper_functions.js?");

/***/ }),

/***/ "./src/helper_functions.js":
/*!*********************************!*\
  !*** ./src/helper_functions.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { errorMessage, checkAnswerMessage, notes } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\n\r\nconst validateNotes = (note1, note2, notesArray) => {\r\n  if (typeof note1 !== \"string\" || typeof note2 !== \"string\") {\r\n    throw new Error(errorMessage.stringNote);\r\n  }\r\n\r\n  if (\r\n    !notesArray.some((note) => note.includes(note1)) ||\r\n    !notesArray.some((note) => note.includes(note2))\r\n  ) {\r\n    throw new Error(errorMessage.incorrectNote);\r\n  }\r\n};\r\n\r\nconst validateNum = (num) => {\r\n  if (typeof num !== \"number\") {\r\n    throw new Error(errorMessage.invalidNum);\r\n  }\r\n  if (num < 0) {\r\n    throw new Error(checkAnswerMessage.negativeInput);\r\n  }\r\n};\r\n\r\nconst validateInputType = (input) => {\r\n  if (!Array.isArray(input) || input.length !== 2) {\r\n    throw new Error(errorMessage.invalidArray);\r\n  }\r\n};\r\n\r\nconst generateRandomIndex = (notes) => {\r\n  return Math.floor(Math.random() * notes.length);\r\n};\r\n\r\nconst generateIndex = (note) => {\r\n  return notes.findIndex((obj) => obj.includes(note));\r\n};\r\n\r\nconst calculateForwardDistance = (note1, note2) => {\r\n  const note1Index = generateIndex(note1);\r\n  const note2Index = generateIndex(note2);\r\n  return Math.abs(note1Index - note2Index);\r\n};\r\n\r\nconst calculateAroundDistance = (note1, note2) => {\r\n  const forwardDistance = calculateForwardDistance(note1, note2);\r\n  const distanceGoingAround = Math.abs(notes.length - forwardDistance);\r\n  return distanceGoingAround;\r\n};\r\n\r\nmodule.exports = {\r\n  validateNotes,\r\n  validateNum,\r\n  validateInputType,\r\n  generateRandomIndex,\r\n  calculateForwardDistance,\r\n  calculateAroundDistance,\r\n};\r\n\n\n//# sourceURL=webpack://tm-novuka-199-semitone-difference-basic-algorithm-javascript/./src/helper_functions.js?");

/***/ }),

/***/ "./src/helper_objects.js":
/*!*******************************!*\
  !*** ./src/helper_objects.js ***!
  \*******************************/
/***/ ((module) => {

eval("const notes = [\r\n  \"A\",\r\n  [\"A#\", \"Bb\"],\r\n  \"B\",\r\n  \"C\",\r\n  [\"C#\", \"Db\"],\r\n  \"D\",\r\n  [\"D#\", \"Eb\"],\r\n  \"E\",\r\n  \"F\",\r\n  [\"F#\", \"Gb\"],\r\n  \"G\",\r\n  [\"G#\", \"Ab\"],\r\n];\r\n\r\nconst errorMessage = {\r\n  incorrectNote: \"Enter correct note.\",\r\n  stringNote: \"Input must be a string.\",\r\n  invalidNum: \"Input must be a number.\",\r\n  invalidArray: \"Input should be an array of two notes.\",\r\n};\r\nconst checkAnswerMessage = {\r\n  invalidInput: \"Please enter a valid number.\",\r\n  negativeInput: \"Number should be positive.\",\r\n  correctAnswer: \"Correct answer! You got it!\",\r\n  incorrectAnswer: \"Incorrect answer. Try again.\",\r\n  outOfRange: \"Input out of range\",\r\n};\r\n\r\nconst className = {\r\n  highlightedNotes: \"highlighted-note\",\r\n};\r\nmodule.exports = { notes, errorMessage, checkAnswerMessage, className };\r\n\n\n//# sourceURL=webpack://tm-novuka-199-semitone-difference-basic-algorithm-javascript/./src/helper_objects.js?");

/***/ }),

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\r\n  validateNotes,\r\n  validateNum,\r\n  validateInputType,\r\n  generateRandomIndex,\r\n  calculateAroundDistance,\r\n  calculateForwardDistance,\r\n} = __webpack_require__(/*! ./helper_functions */ \"./src/helper_functions.js\");\r\nconst { notes } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\n\r\nclass JamBuddy {\r\n  setCurrentNotes(notesArray) {\r\n    validateInputType(notesArray);\r\n\r\n    const [note1, note2] = notesArray;\r\n    validateNotes(note1, note2, notes);\r\n\r\n    this.note1 = note1;\r\n    this.note2 = note2;\r\n  }\r\n\r\n  getCurrentNotes() {\r\n    return [this.note1, this.note2];\r\n  }\r\n\r\n  checkAnswer(num) {\r\n    validateNum(num);\r\n\r\n    return (\r\n      num === calculateAroundDistance(this.note1, this.note2) ||\r\n      num === calculateForwardDistance(this.note1, this.note2)\r\n    );\r\n  }\r\n\r\n  randomizeCurrentNotes() {\r\n    for (let i = 0; i < notes.length; i++) {\r\n      let note1, note2;\r\n      const firstIndex = generateRandomIndex(notes);\r\n      const secondIndex = generateRandomIndex(notes);\r\n      if (firstIndex !== secondIndex) {\r\n        note1 = notes[firstIndex];\r\n        note2 = notes[secondIndex];\r\n        if (typeof note1 === \"object\") {\r\n          note1 = note1[generateRandomIndex(note1)];\r\n        }\r\n        if (typeof note2 === \"object\") {\r\n          note2 = note2[generateRandomIndex(note2)];\r\n        }\r\n        return this.setCurrentNotes([note1, note2]);\r\n      }\r\n    }\r\n  }\r\n}\r\nmodule.exports = { JamBuddy };\r\n\n\n//# sourceURL=webpack://tm-novuka-199-semitone-difference-basic-algorithm-javascript/./src/jam_buddy.js?");

/***/ }),

/***/ "./src/semitone_dom.js":
/*!*****************************!*\
  !*** ./src/semitone_dom.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { JamBuddy } = __webpack_require__(/*! ./jam_buddy */ \"./src/jam_buddy.js\");\r\nconst { checkAnswerMessage } = __webpack_require__(/*! ./helper_objects */ \"./src/helper_objects.js\");\r\n\r\nconst { domElements } = __webpack_require__(/*! ./dom_elements */ \"./src/dom_elements.js\");\r\nconst {\r\n  showMessage,\r\n  updateStreakDisplay,\r\n  explanation,\r\n  displayAllNotes,\r\n  handleCorrectAnswer,\r\n  handleIncorrectAnswer,\r\n  enableUserInputs,\r\n  disableUserInputs,\r\n  resetStreak,\r\n} = __webpack_require__(/*! ./dom_helper_functions */ \"./src/dom_helper_functions.js\");\r\n\r\nconst jamBuddy = new JamBuddy();\r\n\r\nfunction displayRandomNotes() {\r\n  domElements.userAnswer.value = \"\";\r\n  jamBuddy.randomizeCurrentNotes();\r\n  const [note1, note2] = jamBuddy.getCurrentNotes();\r\n  domElements.note1Element.textContent = `${note1}`;\r\n  domElements.note2Element.textContent = `${note2}`;\r\n  enableUserInputs();\r\n  domElements.giveUpButton.disabled = false;\r\n  domElements.explanation.textContent = \"\";\r\n  domElements.notesDisplay.textContent = \"\";\r\n}\r\n\r\nfunction checkUserAnswer() {\r\n  const userAnswer = parseInt(domElements.userAnswer.value);\r\n\r\n  if (userAnswer <= 0 || userAnswer > 11) {\r\n    showMessage(checkAnswerMessage.outOfRange);\r\n  } else {\r\n    if (jamBuddy.checkAnswer(userAnswer)) {\r\n      const note1 = domElements.note1Element.textContent;\r\n      const note2 = domElements.note2Element.textContent;\r\n      handleCorrectAnswer(note1, note2);\r\n    } else {\r\n      handleIncorrectAnswer();\r\n    }\r\n  }\r\n  domElements.userAnswer.value = \"\";\r\n}\r\n\r\nfunction toggleRandomizeButton(value) {\r\n  domElements.randomizeNotes.disabled = value;\r\n}\r\n\r\nfunction giveUp() {\r\n  const note1 = domElements.note1Element.textContent;\r\n  const note2 = domElements.note2Element.textContent;\r\n  disableUserInputs();\r\n  toggleRandomizeButton(true);\r\n  displayAllNotes();\r\n  domElements.explanation.textContent = explanation(note1, note2, true);\r\n}\r\nfunction restart() {\r\n  const note1 = domElements.note1Element.textContent;\r\n  const note2 = domElements.note2Element.textContent;\r\n  enableUserInputs();\r\n  toggleRandomizeButton(false);\r\n  displayRandomNotes();\r\n  resetStreak();\r\n  updateStreakDisplay();\r\n  domElements.explanation.textContent = explanation(note1, note2, false);\r\n  domElements.notesDisplay.textContent = \"\";\r\n}\r\n\r\n(() => {\r\n  displayRandomNotes();\r\n  domElements.randomizeNotes.addEventListener(\"click\", displayRandomNotes);\r\n})();\r\n(() => {\r\n  domElements.giveUpButton.addEventListener(\"click\", giveUp);\r\n})();\r\n(() => {\r\n  domElements.submitButton.addEventListener(\"click\", checkUserAnswer);\r\n})();\r\n(() => {\r\n  domElements.restartButton.addEventListener(\"click\", restart);\r\n})();\r\n\r\nmodule.exports = {\r\n  displayRandomNotes,\r\n  checkUserAnswer,\r\n  giveUp,\r\n  restart,\r\n  jamBuddy,\r\n  explanation,\r\n};\r\n\n\n//# sourceURL=webpack://tm-novuka-199-semitone-difference-basic-algorithm-javascript/./src/semitone_dom.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/semitone_dom.js");
/******/ 	
/******/ })()
;