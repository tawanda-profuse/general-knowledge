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
    question: 'Who sang with the Wailers?',
    questionimage: '/assets/music_pics/colors.jpg',
    answers: [
      { text: 'Michael Jackson', correct: false },
      { text: 'Bob Marley', correct: true },
      { text: 'Elvis Presley', correct: false },
      { text: 'The Notorious B.I.G.', correct: false }
    ]
  },
  {
    question: 'Which Drake song broke records in 2016?',
    questionimage: '/assets/music_pics/views.jpg',
    answers: [
      { text: 'Views', correct: false },
      { text: 'One Dance', correct: true },
      { text: 'Happy', correct: false },
      { text: 'Moves Like Jagger', correct: false }
    ]
  },
  {
    question: "Beyonce rose to stardom as part of which girl band?",
    questionimage: '/assets/music_pics/destiny-child.jpg',
    answers: [
      { text: 'The Shirelles', correct: false },
      { text: 'The Bangles', correct: false },
      { text: 'Destiny’s Child', correct: true },
      { text: 'The Supremes', correct: false }
    ]
  },
  {
    question: "Stormzy collaborated with Burna Boy and which other British musician on ‘Own It’?",
    questionimage: '/assets/music_pics/stormzy.jpeg',
    answers: [
      { text: 'Ed Sheeran', correct: true },
      { text: 'Justin Beiber', correct: false },
      { text: 'Shawn Mendes', correct: false },
      { text: 'Sam Smith', correct: false }
    ]
  },
  {
    question: 'In which video did Michael Jackson first perform his famous moonwalk in 1983?',
    questionimage: '/assets/music_pics/moon-walk.gif',
    answers: [
      { text: 'Hey Jude', correct: false },
      { text: 'Juicy', correct: false },
      { text: 'Billie Jean', correct: true },
      { text: 'Hit Em Up', correct: false }
    ]
  },
  {
    question: `Will.i.am is best known for being part of which hip hop group?`,
    questionimage: '/assets/music_pics/will-i-am.jpg',
    answers: [
      { text: 'YMCMB', correct: false },
      { text: 'NWA', correct: false },
      { text: 'Black Hippy', correct: false },
      { text: 'Black Eyed Peas', correct: true }
    ]
  },
  {
    question: `Who is the only singer to have ever performed more than one James Bond theme song?`,
    questionimage: '/assets/music_pics/james-bond.png',
    answers: [
      { text: 'Shirley Bassey', correct: true },
      { text: 'Tom Jones', correct: false },
      { text: 'Adele', correct: false },
      { text: 'Zayn Malik', correct: false }
    ]
  },
  {
    question: 'What was Britney Spears’ first single called?',
    questionimage: '/assets/music_pics/britneyspears.jpg',
    answers: [
      { text: 'Best I Ever Had', correct: false },
      { text: 'Baby One More Time', correct: true },
      { text: 'With You', correct: false },
      { text: 'Music to my Ears', correct: false }
    ]
  },
  {
    question: 'Which singer has the most UK Number One singles ever',
    questionimage: '/assets/music_pics/charts.jpg',
    answers: [
      { text: 'Bob Dylan', correct: false },
      { text: 'Marvin Gaye', correct: false },
      { text: 'Elvis Presley', correct: true },
      { text: 'Stevie Wonder', correct: false }
    ]
  },
  {
    question: 'One Direction is known for being the runners-up in The X Factor in 2010, but who came first?',
    questionimage: '/assets/music_pics/x_factor.jpg',
    answers: [
      { text: 'Steve Brookstein', correct: false },
      { text: 'Joe McElderry', correct: false },
      { text: 'Aiden Grimshaw', correct: false },
      { text: 'Matt Cardle', correct: true }
    ]
  }
];

