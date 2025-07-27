const state = require('./renderer_modules/state');
const renderQuestion = require('./renderer_modules/renderQuestion');
const startTimer = require('./renderer_modules/timer');
const setupNavigation = require('./renderer_modules/navigation');
const showResults = require('./renderer_modules/review');

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-btn').addEventListener('click', async () => {
    console.log("Start button clicked");

    // Load exam data
    const data = await fetch('./public/questions.json')
      .then(res => res.json())
      .catch(err => {
        console.error("Failed to load JSON:", err);
        alert("Error loading exam file.");
        return;
      });

    console.log("Loaded Data:", data);

    // Initialize shared state
    state.setQuestions(data.questions);
    state.setUserAnswers([]);
    state.setCurrentQuestionIndex(0);
    state.setTimerSeconds(data.timeLimitMinutes * 60);

    // Update UI
    document.getElementById('intro').style.display = 'none';
    document.getElementById('exam-title').textContent = data.title;
    document.getElementById('exam-container').style.display = 'block';

    // Begin test
    startTimer();
    setupNavigation();
    renderQuestion();
  });
});
