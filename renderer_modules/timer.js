const state = require('./state');
const showResults = require('./review');

function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  if (!el) return;

  const minutes = Math.floor(state.timerSeconds / 60);
  const seconds = state.timerSeconds % 60;

  el.textContent = `Time Remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  updateTimerDisplay();

  const interval = setInterval(() => {
    const newTime = state.timerSeconds - 1;
    state.setTimerSeconds(newTime);

    if (newTime <= 0) {
      clearInterval(state.interval);
      showResults(true); // Pass true to indicate time ran out
    } else {
      updateTimerDisplay();
    }
  }, 1000);

  state.setTimerInterval(interval);
}

module.exports = startTimer;
