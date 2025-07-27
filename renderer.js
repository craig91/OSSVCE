let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerSeconds = 0;
let timerInterval = null;

document.getElementById('start-btn').addEventListener('click', async () => {
    console.log("start button clicked")

    const data = await fetch('./public/questions.json')
    .then(res => res.json())
    .catch(err => console.error('fetch failed', err));
    
    console.log('Loaded Data:', data)

    questions = data.questions;
    document.getElementById('exam-title').textContent = data.title;

    timerSeconds = data.timeLimitMinutes * 60;
    startTimer();
    
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

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
})

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const container = document.getElementById('question-block');


    if(!container) {
        console.error('Error: #question-block element not found!');
        return
    }


    container.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1}</h2>
        <p>${q.question}</p>
        <form id="options-form">
            ${q.options.map((opt, index) => {
                return `
                    <label>
                        <input type="radio" name="option" value="${index}"
                            ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
                        ${opt}
                    </label><br>
                `;
            }).join('')}
        </form>
    `;
}

function showResults(timedOut = false) {
  clearInterval(timerInterval);

  let score = 0;
  const reviewBlocks = [];




  questions.forEach((q, index) => {
    const userAnswer = userAnswers[index];
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
    <p>You answered ${score} out of ${questions.length} correctly.</p>
    <p>Score: ${((score / questions.length) * 100).toFixed(1)}%</p>
    <button id="restart-btn">Restart Exam</button>
    <hr>
    <h2>Review</h2>
    ${reviewBlocks.join('')}
  `;
  document.getElementById('restart-btn').addEventListener('click', restartExam);

}





function startTimer() {
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timerSeconds--;

        if(timerSeconds <= 0) {
            clearInterval(timerInterval);
            showResults(true);
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (!el) return;

    const minutes = Math.floor(timerSeconds/60);
    const seconds = timerSeconds % 60;
    el.textContent = `Time Remaining: ${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}`;

}


function restartExam() {
    questions = [];
    userAnswers = [];
    currentQuestionIndex = 0;
    clearInterval(timerInterval);
    timerSeconds = 0;

    document.getElementById('exam-title').textContent = 'Exam Simulator';
    document.getElementById('intro').style.display = 'block';
    // document.getElementById('exam-container').style.display = 'none';

    const examContainer = document.getElementById('exam-container');

    examContainer.innerHTML = `
    <div id="timer-display">Time Remaining: --:--</div>
    <div id="question-block"></div>
    <div id="navigation">
      <button id="next-btn">Next Question</button>
    </div>
  `;

    examContainer.style.display = 'none';

    document.getElementById('next-btn').addEventListener('click', () => {
        const selected = document.querySelector('input[name="option"]:checked');
        if (!selected) {
            alert("please select an option before continuing");
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
    // const qBlock = document.getElementById('question-block');
    // if(qBlock) qBlock.innerHTML = '';

    // const timerDisplay = document.getElementById('timer-display');
    // if (timerDisplay) timerDisplay.textContent = "Time Remaining: -- : --";
}