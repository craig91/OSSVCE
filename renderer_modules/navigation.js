const state = require('./state');
const renderQuestion = require('./renderQuestion');

let showResults;

setTimeout(() => {
  showResults = require('./review');
}, 0);


console.log('[DEBUG] renderQuestion is a:', typeof renderQuestion);
console.log('[DEBUG] showResults is a:', typeof showResults);
console.log('[DEBUG] showResults file resolved from:', require.resolve('./review'));
console.log('✅ navigation.js: typeof showResults:', typeof showResults);


function setupNavigation() {
    document.getElementById('next-btn').addEventListener('click', () => {
        const selected = document.querySelector('input[name="option"]:checked');

        if(!selected) {
            alert('Please select an option before continuing');
            return;
        }

        state.userAnswers[state.currentQuestionIndex] = parseInt(selected.value);

        const nextIndex = state.currentQuestionIndex + 1;
        state.setCurrentQuestionIndex(nextIndex);

        if (nextIndex < state.questions.length) {
            renderQuestion();
        } else {
            showResults();
        }
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (state.currentQuestionIndex > 0) {
            const prevIndex = state.currentQuestionIndex - 1;
            state.setCurrentQuestionIndex(prevIndex);
            renderQuestion();
        }
    });
}

module.exports = setupNavigation;