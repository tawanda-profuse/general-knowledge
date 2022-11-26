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

function showQuestion(question) {
  questionElement.innerText = question.question
  questionImageElement.src = question.questionimage
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
    question: 'What are the five colours of the Olympic rings?',
    questionimage: '../assets/sports_pics/olympic.png',
    answers: [
      { text: 'Red, green, blue, white and silver', correct: false },
      { text: 'Blue, yellow, black, green and red', correct: true },
      { text: 'Maroon, orage, green, lime and transparent', correct: false },
      { text: 'Blue, yellow, white, beige and red', correct: false }
    ]
  },
  {
    question: 'In football, which team has won the Champions League (formerly the European Cup) the most?',
    questionimage: '../assets/sports_pics/champions-league.jpg',
    answers: [
      { text: 'Everton', correct: false },
      { text: 'Bayern Munich', correct: false },
      { text: 'Real Madrid', correct: true },
      { text: 'LA Galaxy', correct: false }
    ]
  },
  {
    question: 'How many players are there in a rugby league team?',
    questionimage: '../assets/sports_pics/rugby-league.jpg',
    answers: [
      { text: '5', correct: false },
      { text: '20', correct: false },
      { text: '15', correct: false },
      { text: '13', correct: true }
    ]
  },
  {
    question: 'Which horse is the only three-time winner of the Grand National?',
    questionimage: '../assets/sports_pics/red-rum.jpg',
    answers: [
      { text: 'Red Rum', correct: true },
      { text: 'Dug the Pug', correct: false },
      { text: 'Seabiscuit', correct: false },
      { text: 'Trigger', correct: false }
    ]
  },
  {
    question: 'Since 1977, where has the snooker World Championship taken place?',
    questionimage: '../assets/sports_pics/snooker.png',
    answers: [
      { text: 'Santiago Bernabeu', correct: false },
      { text: 'Old Trafford', correct: false },
      { text: 'Crucible Theatre', correct: true },
      { text: 'Madison Square Garden', correct: false }
    ]
  },
  {
    question: `In tennis, what piece of fruit is found at the top of the men's Wimbledon trophy?`,
    questionimage: '../assets/sports_pics/wimbledon.jpg',
    answers: [
      { text: 'Watermelon', correct: false },
      { text: 'Tomato', correct: false },
      { text: 'Eggplant', correct: false },
      { text: 'Pineapple', correct: true }
    ]
  },
  {
    question: `Who won the FIFA Women's World Cup in 2019?`,
    questionimage: '../assets/sports_pics/womens-world-cup-2019.png',
    answers: [
      { text: 'USA', correct: true },
      { text: 'Australia', correct: false },
      { text: 'England', correct: false },
      { text: 'Nigeria', correct: false }
    ]
  },
  {
    question: 'In bowling, what is the term given for three consecutive strikes?',
    questionimage: '../assets/sports_pics/turkey-bowling.jpg',
    answers: [
      { text: 'A broken leg', correct: false },
      { text: 'A turkey', correct: true },
      { text: 'A hat-trick', correct: false },
      { text: 'A slam dunk', correct: false }
    ]
  },
  {
    question: 'How many world titles has Phil Talyor won in darts?',
    questionimage: '../assets/sports_pics/phil-taylor-darts.jpg',
    answers: [
      { text: '2000', correct: false },
      { text: '10', correct: false },
      { text: '16', correct: true },
      { text: '1', correct: false }
    ]
  },
  {
    question: 'In golf, where does the Masters take place?',
    questionimage: '../assets/sports_pics/golf.jpg',
    answers: [
      { text: 'Trump International Golf Club', correct: false },
      { text: 'Royal Harare Golf Club', correct: false },
      { text: 'Grand Canyon', correct: false },
      { text: 'Augusta National', correct: true }
    ]
  },
  {
    question: 'Which basketball player has the most NBA championships in total?',
    questionimage: '../assets/sports_pics/m-jordan.jpg',
    answers: [
      { text: 'Carmelo Anthony (0)', correct: false },
      { text: 'Kobe Bryant (5)', correct: false },
      { text: 'Michael Jordan (6)', correct: false },
      { text: 'Bill Russell (11)', correct: true }
    ]
  }
];

