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
  questionImageElement.image = questionimage
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
    questionimage: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/full-frame-shot-of-raw-almonds-royalty-free-image-683814187-1537885519.jpg?crop=0.66635xw:1xh;center,top&resize=480:*',
    answers: [
      { text: 'Red, green, blue, white and silver', correct: false },
      { text: 'Blue, yellow, black, green and red', correct: true },
      { text: 'Maroon, orage, green, lime and transparent', correct: false },
      { text: 'Blue, yellow, white, beige and red', correct: false }
    ]
  },
  {
    question: 'In football, which team has won the Champions League (formerly the European Cup) the most?',
    questionimage: 'https://easydrinkbygroutas.com/wp-content/uploads/2020/11/0013_Corona-extra-beerx355mlbot.png',
    answers: [
      { text: 'Everton', correct: false },
      { text: 'Bayern Munich', correct: false },
      { text: 'Real Madrid', correct: true },
      { text: 'LA Galaxy', correct: false }
    ]
  },
  {
    question: 'How many players are there in a rugby league team?',
    answers: [
      { text: '5', correct: false },
      { text: '20', correct: false },
      { text: '15', correct: false },
      { text: '13', correct: true }
    ]
  },
  {
    question: 'Which horse is the only three-time winner of the Grand National?',
    answers: [
      { text: 'Red Rum', correct: true },
      { text: 'Dug the Pug', correct: false },
      { text: 'Seabiscuit', correct: false },
      { text: 'Trigger', correct: false }
    ]
  },
  {
    question: 'Since 1977, where has the snooker World Championship taken place?',
    answers: [
      { text: 'Santiago Bernabeu', correct: false },
      { text: 'Old Trafford', correct: false },
      { text: 'Crucible Theatre', correct: true },
      { text: 'Madison Square Garden', correct: false }
    ]
  },
  {
    question: `In tennis, what piece of fruit is found at the top of the men's Wimbledon trophy?`,
    answers: [
      { text: 'Watermelon', correct: false },
      { text: 'Tomato', correct: false },
      { text: 'Eggplant', correct: false },
      { text: 'Pineapple', correct: true }
    ]
  },
  {
    question: `Who won the FIFA Women's World Cup in 2019?`,
    answers: [
      { text: 'USA', correct: true },
      { text: 'Australia', correct: false },
      { text: 'England', correct: false },
      { text: 'Nigeria', correct: false }
    ]
  },
  {
    question: 'In bowling, what is the term given for three consecutive strikes?',
    answers: [
      { text: 'A broken leg', correct: false },
      { text: 'A turkey', correct: true },
      { text: 'A hat-trick', correct: false },
      { text: 'A slam dunk', correct: false }
    ]
  },
  {
    question: 'How many world titles has Phil Talyor won in darts?',
    answers: [
      { text: '2000', correct: false },
      { text: '10', correct: false },
      { text: '16', correct: true },
      { text: '1', correct: false }
    ]
  },
  {
    question: 'In golf, where does the Masters take place?',
    answers: [
      { text: 'Trump International Golf Club', correct: false },
      { text: 'Royal Harare Golf Club', correct: false },
      { text: 'Grand Canyon', correct: false },
      { text: 'Augusta National', correct: true }
    ]
  },
  {
    question: 'Which basketball player has the most NBA championships in total?',
    answers: [
      { text: 'Carmelo Anthony (0)', correct: false },
      { text: 'Kobe Bryant (5)', correct: false },
      { text: 'Michael Jordan (6)', correct: false },
      { text: 'Bill Russell (11)', correct: true }
    ]
  }
];

