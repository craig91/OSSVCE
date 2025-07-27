let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerSeconds = 0;
let timerInterval = null;

module.exports = {
  get questions() {
    return questions;
  },
  setQuestions: (q) => {
    questions = q;
  },

  get currentQuestionIndex() {
    return currentQuestionIndex;
  },
  setCurrentQuestionIndex: (index) => {
    currentQuestionIndex = index;
  },

  get userAnswers() {
    return userAnswers;
  },
  setUserAnswers: (arr) => {
    userAnswers = arr;
  },

  get timerSeconds() {
    return timerSeconds;
  },
  setTimerSeconds: (sec) => {
    timerSeconds = sec;
  },

  get timerInterval() {
    return timerInterval;
  },
  setTimerInterval: (id) => {
    timerInterval = id;
  },
};

