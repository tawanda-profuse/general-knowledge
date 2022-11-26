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
    question: 'Which car goes first? Followed by which car?',
    questionimage: '../assets/driving_pics/diagram_3.png',
    answers: [
      { text: 'Car A, Car B', correct: false },
      { text: 'Car B, Car C', correct: false },
      { text: 'Car C, Car B', correct: true },
      { text: 'Any car', correct: false }
    ]
  },
  {
    question: 'How long is a certificate of competence valid for?',
    questionimage: '../assets/driving_pics/certificate.jfif',
    answers: [
      { text: '5 years', correct: false },
      { text: '2.5 years', correct: false },
      { text: '1 year', correct: true },
      { text: '10 years', correct: false }
    ]
  },
  { 
    question: 'This sign regulates that...',
    questionimage: '../assets/driving_pics/speedlimit.png',
    answers: [
      { text: 'The speed limit on this road is entirely up to the driver', correct: false },
      { text: 'The speed limit on this road is 60km/h or 80km/h', correct: false },
      { text: 'The speed on this road is 80km/h', correct: true },
      { text: 'All of these answers', correct: false }
    ]
  },
  {
    question: "When approaching this sign I should...",
    questionimage: '../assets/driving_pics/car-check.jpg',
    answers: [
      { text: 'Be expected to check my vehicle', correct: false },
      { text: 'Expect to see the road works ahead', correct: false },
      { text: 'Write a check for the oncoming vehicle', correct: false },
      { text: 'Slow down and expect to be stopped', correct: true }
    ]
  },
  {
    question: `This sign regulates that...`,
    questionimage: '../assets/driving_pics/bicycle.png',
    answers: [
      { text: 'Cyclists should stop and give way to cross traffic', correct: true },
      { text: 'Stop and give way to cyclists from the right', correct: false },
      { text: 'Vehicles should give right of way to cyclists', correct: false },
      { text: 'Cycling is prohibited on this road', correct: false }
    ]
  },
  {
    question: `Which car goes last?`,
    questionimage: '../assets/driving_pics/diagram_2.png',
    answers: [
      { text: 'Car A and Car C', correct: false },
      { text: 'Car C', correct: false },
      { text: 'Car A', correct: true },
      { text: 'Car B', correct: false }
    ]
  },
  {
    question: 'What does this sign mean?',
    questionimage: '../assets/driving_pics/about-turn.png',
    answers: [
      { text: 'Warning of a mountain along the way', correct: false },
      { text: 'This is a one way road', correct: false },
      { text: 'About turn prohibited', correct: true },
      { text: 'This is not a road sign in Zimbabwe', correct: false }
    ]
  },
  {
    question: `What is the correct sequence of a robot/traffic light?`,
    questionimage: '../assets/driving_pics/traffic_light.png',
    answers: [
      { text: 'Green, green, red', correct: false },
      { text: 'Red, green, amber', correct: true },
      { text: 'Green, red amber', correct: false },
      { text: 'Red, amber, green', correct: false }
    ]
  },
  {
    question: `What does this road sign mean?`,
    questionimage: '../assets/driving_pics/roadworks.png',
    answers: [
      { text: 'Warning to slow down because of road works ahead', correct: true },
      { text: 'There is a child playing in the road', correct: false },
      { text: 'There is a man selling a shovel', correct: false },
      { text: 'No cars allowed on this road', correct: false }
    ]
  },
  {
    question: `What do you do when seeing this sign?`,
    questionimage: '../assets/driving_pics/slippery.jpg',
    answers: [
      { text: 'Put your car in neutral', correct: false },
      { text: 'Stay off the road', correct: false },
      { text: 'Reduce your speed and exercise caution', correct: true },
      { text: 'Engage a lower gear', correct: false }
    ]
  },
  {
    question: 'What does this road sign warn the driver of?',
    questionimage: '../assets/driving_pics/narrow.jpg',
    answers: [
      { text: 'This is not a warning sign, but a regulatory sign', correct: false },
      { text: 'Warning that the road narrows to the right ahead', correct: false },
      { text: 'It warns the driver of a narrow bridge ahead', correct: true },
      { text: 'Warning that the road narrows centrally ahead', correct: false }
    ]
  },
  {
    question: 'What does this road sign warn the driver of?',
    questionimage: '../assets/driving_pics/narrowR.png',
    answers: [
      { text: 'This is not a warning sign, but a regulatory sign', correct: false },
      { text: 'Warning that the road narrows to the right ahead', correct: true },
      { text: 'It warns the driver of a narrow bridge ahead', correct: false },
      { text: 'Warning that the road narrows centrally ahead', correct: false }
    ]
  },
  {
    question: 'Which car should go last? Which car has the right of way?',
    questionimage: '../assets/driving_pics/diagram_1.png',
    answers: [
      { text: 'Car A, Car C', correct: false },
      { text: 'Car C, Car B', correct: true },
      { text: 'Any car', correct: false },
      { text: 'There is no right of way', correct: false },
      { text: 'Car C, Car A', correct: false }
    ]
  }
];

