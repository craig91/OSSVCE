const state = require('./state');

function renderQuestion() {
  const q = state.questions[state.currentQuestionIndex];
if (!q) {
  console.error("renderQuestion: current question is undefined");
  return;
}

const container = document.getElementById('question-block');
if (!container) return;

container.innerHTML = `
  <h2>Question ${state.currentQuestionIndex + 1}</h2>
  <p>${q.question}</p>
  <form id="options-form">
    ${q.options.map((opt, index) => `
      <label>
        <input type="radio" name="option" value="${index}"
          ${state.userAnswers[state.currentQuestionIndex] === index ? 'checked' : ''}>
        ${opt}
      </label><br>
    `).join('')}
  </form>
`;

const prevBtn = document.getElementById('prev-btn');
if (prevBtn) prevBtn.disabled = state.currentQuestionIndex === 0;

}

module.exports = renderQuestion;
