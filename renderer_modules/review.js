const state = require('./state');
const restartExam = require('./restart');


function showResults(timedOut = false) {
  clearInterval(state.timerInterval);

  let score = 0;
  const reviewBlocks = [];




  state.questions.forEach((q, index) => {
    const userAnswer = state.userAnswers[index];
    const correct = userAnswer === q.answerIndex;
    if (correct) score++;

    const optionsHtml = q.options.map((opt, i) => {
      const isCorrect = i === q.answerIndex;
      const isUserPick = i === userAnswer;

      let style = '';
      if (isUserPick && isCorrect) {
        style = 'background-color: #c8f7c5'; // green
      } else if (isUserPick && !isCorrect) {
        style = 'background-color: #f7c5c5'; // red
      } else if (isCorrect) {
        style = 'background-color: #e6f7ff'; // light blue
      }

      return `<li style="${style}">${opt}</li>`;
    }).join('');

    reviewBlocks.push(`
      <div style="margin-bottom: 1.5em;">
        <h3>Question ${index + 1}</h3>
        <p>${q.question}</p>
        <ul>${optionsHtml}</ul>
      </div>
    `);
  });

const container = document.getElementById('exam-container');
  container.innerHTML = `
    <h2>Exam Complete</h2>
    ${timedOut ? '<p>Time is up!</p>' : ''}
    <p>You answered ${score} out of ${state.questions.length} correctly.</p>
    <p>Score: ${((score / state.questions.length) * 100).toFixed(1)}%</p>
    <button id="restart-btn">Restart Exam</button>
    <hr>
    <h2>Review</h2>
    ${reviewBlocks.join('')}
  `;
  document.getElementById('restart-btn').addEventListener('click', restartExam);

}

console.log("✅ review.js: typeof showResults:", typeof showResults);

module.exports = showResults;