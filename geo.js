const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const questionImageElement = document.getElementById('questionimage')

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

function showQuestion(question, questionimage) {
  questionElement.innerText = question.question
  questionImageElement.image = question.questionimage
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
    question: 'What is the capital of Chile?',
    questionimage: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-raw-almonds-royalty-free-image-683814187-1537885519.jpg?crop=0.66635xw:1xh;center,top&resize=480:*',
    answers: [
      { text: 'Harare', correct: false },
      { text: 'Santiago', correct: true },
      { text: 'Sydney', correct: false },
      { text: 'Moscow', correct: false }
    ]
  },
  {
    question: 'What is the highest mountain in Britain?',
    questionimage: 'https://easydrinkbygroutas.com/wp-content/uploads/2020/11/0013_Corona-extra-beerx355mlbot.png',
    answers: [
      { text: 'Everest', correct: false },
      { text: 'Kilimanjaro', correct: false },
      { text: 'Ben Nevis', correct: true },
      { text: 'Nyangani', correct: false }
    ]
  },
  {
    question: 'What is the smallest country in the world?',
    answers: [
      { text: 'China', correct: false },
      { text: 'South Africa', correct: false },
      { text: 'Russia', correct: false },
      { text: 'Vatican City', correct: true }
    ]
  },
  {
    question: 'Alberta is a province of which country?',
    answers: [
      { text: 'Canada', correct: true },
      { text: 'Malawi', correct: false },
      { text: 'Algeria', correct: false },
      { text: 'Turkey', correct: false }
    ]
  },
  {
    question: 'How many countries still have the shilling as currency?',
    answers: [
      { text: 'All countries in the EU', correct: false },
      { text: 'Two – USA, China', correct: false },
      { text: 'Four – Kenya, Uganda, Tanzania and Somalia', correct: true },
      { text: 'No countries', correct: false }
    ]
  },
  {
    question: 'Which is the only vowel not used as the first letter in a US State?',
    answers: [
      { text: 'A', correct: false },
      { text: 'O', correct: false },
      { text: 'U', correct: false },
      { text: 'E', correct: true }
    ]
  },
  {
    question: 'What is the largest country in the world?',
    answers: [
      { text: 'Russia', correct: true },
      { text: 'Australia', correct: false },
      { text: 'Ireland', correct: false },
      { text: 'Nigeria', correct: false }
    ]
  },
  {
    question: 'Where would you find the River Thames?',
    answers: [
      { text: 'Dublin, Ireland', correct: false },
      { text: 'London, UK', correct: true },
      { text: 'Istanbul, Turkey', correct: false },
      { text: 'Tokyo, Japan', correct: false }
    ]
  },
  {
    question: 'What is the hottest continent on Earth?',
    answers: [
      { text: 'North America', correct: false },
      { text: 'Asia', correct: false },
      { text: 'Africa', correct: true },
      { text: 'Europe', correct: false }
    ]
  },
  {
    question: 'What is the longest river in the world?',
    answers: [
      { text: 'Zambezi River', correct: false },
      { text: 'Congo River', correct: false },
      { text: 'Mississipi River', correct: false },
      { text: 'River Nile', correct: true }
    ]
  }
];

