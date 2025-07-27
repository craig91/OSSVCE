let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

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
    const selected = document.querySelector('input[name="option"]:checked');
    if(!selected) {
        alert("Please select an option before continuing. ");
        return;
    }

    userAnswers[currentQuestionIndex] = parseInt(selected.value);

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
    let score = 0;
    questions.forEach((q, index) => {
        if(userAnswers[index] === q.answerIndex) {
            score++;
        }
    });

    const container = document.getElementById('exam-container');
    container.innerHTML = `
        <h2>Exam Complete</h2>
        <p>You answered ${score} out of ${questions.length} correctly.</p>
        <p>Score: ${((score / questions.length) * 100).toFixed(1)}%</p>
    `;
}