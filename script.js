const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which nuts are used in marzipan?',
    answers: [
      { text: 'Walnuts', correct: false },
      { text: 'Almonds', correct: true },
      { text: 'Cashew', correct: false },
      { text: 'Pistachio', correct: false }
    ]
  },
  {
    question: 'What is the most famous Mexican beer?',
    answers: [
      { text: 'Carlsberg', correct: false },
      { text: 'Tequilla', correct: false },
      { text: 'Corona', correct: true },
      { text: 'Amsterdam', correct: false }
    ]
  },
  {
    question: 'Which country is the origin of the cocktail Mojito?',
    answers: [
      { text: 'Russia', correct: false },
      { text: 'Zimbabwe', correct: false },
      { text: 'Brazil', correct: false },
      { text: 'Cuba', correct: true }
    ]
  },
  {
    question: 'What is Japanese sake made from?',
    answers: [
      { text: 'Rice', correct: true },
      { text: 'Potatoes', correct: false },
      { text: 'Wheat', correct: false },
      { text: 'Cotton', correct: false },
    ]
  }
]