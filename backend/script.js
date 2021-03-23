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

var questions = [ //const
  {
    question: 'Which nuts are used in marzipan?',
    questionimage: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-raw-almonds-royalty-free-image-683814187-1537885519.jpg?crop=0.66635xw:1xh;center,top&resize=480:*',
    answers: [
      { text: 'Walnuts', correct: false },
      { text: 'Almonds', correct: true },
      { text: 'Cashew', correct: false },
      { text: 'Pistachio', correct: false }
    ]
  },
  {
    question: 'What is the most famous Mexican beer?',
    questionimage: 'https://easydrinkbygroutas.com/wp-content/uploads/2020/11/0013_Corona-extra-beerx355mlbot.png',
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
      { text: 'Cotton', correct: false }
    ]
  },
  {
    question: 'Which vitamin is the only one that you will not find in an egg?',
    answers: [
      { text: 'Vitamin D', correct: false },
      { text: 'Vitamin A', correct: false },
      { text: 'Vitamin C', correct: true },
      { text: 'Vitamin E', correct: false }
    ]
  },
  {
    question: 'What is the chemical formula for Table Salt?',
    answers: [
      { text: 'H20', correct: false },
      { text: 'CO2', correct: false },
      { text: 'E = MC2', correct: false },
      { text: 'NaC1', correct: true }
    ]
  },
  {
    question: 'What does IPA stand for?',
    answers: [
      { text: 'Indian Pale Ale', correct: true },
      { text: 'Initial Public Aqcuisition', correct: false },
      { text: 'International Phonetic Alphabet', correct: false },
      { text: 'International Phonetic Association', correct: false }
    ]
  },
  {
    question: 'Which meat is used in Glamorgan sausages?',
    answers: [
      { text: 'Beef', correct: false },
      { text: 'None, they are made from cheese', correct: true },
      { text: 'Pork', correct: false },
      { text: 'Chicken breast', correct: false }
    ]
  },
  {
    question: 'What ingredient is included in food in a Florentine style?',
    answers: [
      { text: 'Parsley', correct: false },
      { text: 'Eggs, they are made from cheese', correct: false },
      { text: 'Spinach', correct: true },
      { text: 'Flour', correct: false }
    ]
  },
  {
    question: 'Which fish is the main ingredient of Scotch Woodcock?',
    answers: [
      { text: 'Sardines', correct: false },
      { text: 'Tuna', correct: false },
      { text: 'Hake', correct: false },
      { text: 'Anchovy', correct: true }
    ]
  }
];

