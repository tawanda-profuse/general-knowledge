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
    question: 'What is the name of Thor’s hammer?',
    questionimage: '/assets/marvel_pics/thor_hammer.jpg',
    answers: [
      { text: 'Vanir', correct: false },
      { text: 'Mjolnir', correct: true },
      { text: 'Aesir', correct: false },
      { text: 'Norn', correct: false }
    ]
  },
  { 
    question: 'Which Avengers character was trained in the Red Room from childhood?',
    questionimage: '/assets/marvel_pics/red_room.jpg',
    answers: [
      { text: 'Wonder Woman', correct: false },
      { text: 'Black Widow', correct: true },
      { text: 'Cat Woman', correct: false },
      { text: 'Jean Gray', correct: false }
    ]
  },
  {
    question: "What metal are Wolverine claws coated with?",
    questionimage: '/assets/marvel_pics/wolverine_claws.jpg',
    answers: [
      { text: 'Gold', correct: false },
      { text: 'Cobalt', correct: false },
      { text: 'Adamantium', correct: true },
      { text: 'Titanium', correct: false }
    ]
  },
  {
    question: `Which villain did Spider-Man battle at the end of the 2014 film "The Amazing Spider-Man 2"?`,
    questionimage: '/assets/marvel_pics/spiderman_2.jpg',
    answers: [
      { text: 'Rhino', correct: true },
      { text: 'Mac Gargan', correct: false },
      { text: 'Max Dillon', correct: false },
      { text: 'Flint Marko', correct: false }
    ]
  },
  {
    question: 'In which superhero movie did Chris Hemsworth wield the magical hammer, Mjolnir?',
    questionimage: '/assets/marvel_pics/hemsworth.jpg',
    answers: [
      { text: 'Batman v Superman: Dawn of Justice', correct: false },
      { text: 'Ant-Man and the Wasp', correct: false },
      { text: 'Thor', correct: true },
      { text: 'Captain Marvel', correct: false }
    ]
  },
  {
    question: `Which hero intercepted the nuclear missile aimed at Manhattan in the 2012 superhero film "The Avengers"?`,
    questionimage: '/assets/marvel_pics/missile.jpg',
    answers: [
      { text: 'Thor', correct: false },
      { text: 'Superman', correct: false },
      { text: 'The Hulk', correct: false },
      { text: 'Iron Man', correct: true }
    ]
  },
  {
    question: `Who plays Captain America in "Captain America: The First Avenger"?`,
    questionimage: '/assets/marvel_pics/chris-evans.jpg',
    answers: [
      { text: 'Chris Evans', correct: true },
      { text: 'Sebastian Stan', correct: false },
      { text: 'Robert Downey, Jr.', correct: false },
      { text: 'Chris Hemsworth', correct: false }
    ]
  },
  {
    question: `In the series, "Marvel's Daredevil", what is the profession of the main character, Matt Murdock?`,
    questionimage: '/assets/marvel_pics/lawyer.jpg',
    answers: [
      { text: 'Mechanic', correct: false },
      { text: 'Lawyer', correct: true },
      { text: 'Accountant', correct: false },
      { text: 'Doctor', correct: false }
    ]
  },
  {
    question: 'Finish this action movie title, "Avengers: Age of _____".',
    questionimage: '/assets/marvel_pics/ultron.jpg',
    answers: [
      { text: 'Civilization', correct: false },
      { text: 'War', correct: false },
      { text: 'Ultron', correct: true },
      { text: 'Darkness', correct: false }
    ]
  },
  {
    question: 'What is the name of the army that Magneto forms in "X-Men: The Last Stand"?',
    questionimage: '/assets/marvel_pics/brotherhood.jpg',
    answers: [
      { text: 'The Invincibles', correct: false },
      { text: 'Juggernauts', correct: false },
      { text: 'The Y-Men', correct: false },
      { text: 'The Brotherhood', correct: true }
    ]
  }
];

