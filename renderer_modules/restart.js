const state = require('./state');
const setupNavigation = require('./navigation');
const renderQuestion = require('./renderQuestion');

function restartExam() {
  // Reset state
  state.setQuestions([]);
  state.setUserAnswers([]);
  state.setCurrentQuestionIndex(0);
  clearInterval(state.timerInterval);
  state.setTimerSeconds(0);

  // Restore intro
  document.getElementById('intro').style.display = 'block';
  document.getElementById('exam-title').textContent = 'Exam Simulator';

  // Reset exam container
  const examContainer = document.getElementById('exam-container');
  examContainer.style.display = 'none';
  examContainer.innerHTML = createExamHTML();

  // Reattach event listeners
  setupNavigation();
}

function createExamHTML() {
  return `
    <div id="timer-display">Time Remaining: --:--</div>
    <div id="question-block"></div>
    <div id="navigation">
      <button id="prev-btn">Previous Question</button>
      <button id="next-btn">Next Question</button>
    </div>
  `;

  //examContainer.style.display = 'none';
}

module.exports = restartExam;

