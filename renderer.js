let questions = [];
let currentQuestionIndex = 0;

document.getElementById('start-btn').addEventListener('click', async () => {
    console.log("start button clicked")

    const data = await fetch('./public/questions.json')
    .then(res => res.json())
    .catch(err => console.error('fetch failed', err));
    
    console.log('Loaded Data:', data)

    questions = data.questions;
    document.getElementById('exam-title').textContent = data.title;
    
    document.getElementById('intro').style.display = 'none';
    document.getElementById('exam-container').style.display = 'block';
   
    renderQuestion();
})

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
});

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const container = document.getElementById('question-block');

     container.innerHTML = `
    <h2>Question ${currentQuestionIndex + 1}</h2>
    <p>${q.question}</p>
    <form id="options-form">
      ${q.options.map((opt, index) => `
        <label>
          <input type="radio" name="option" value="${index}">
          ${opt}
        </label><br>
      `).join('')}
    </form>
  `;
}

function showResults() {
    const container = document.getElementById('exam-container');
    container.innerHTML = `
        <h2>Exam Complete</h2>
        <p>You've finished the test!</p>
    `;
}