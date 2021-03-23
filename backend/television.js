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
    question: 'What is the capital of Westeros in Game of Thrones?',
    answers: [
      { text: 'Arkham', correct: false },
      { text: 'King’s Landing', correct: true },
      { text: 'Los Angeles', correct: false },
      { text: 'Springfield', correct: false }
    ]
  },
  {
    question: 'Who presented TV quiz Blockbusters between 1983 and 1995?',
    answers: [
      { text: 'Andy Gray', correct: false },
      { text: 'Bob Holness', correct: true },
      { text: 'Hulk Hogan', correct: false },
      { text: 'Jimmy Kimmel', correct: false }
    ]
  },
  {
    question: "In Netflix's Tiger King, what is the name of Carole Baskin's second husband who many believe she fed to the tigers?",
    answers: [
      { text: 'Idris Elba', correct: false },
      { text: 'Lewis Hamilton', correct: false },
      { text: 'Don Lewis', correct: true },
      { text: 'Kanye West', correct: false }
    ]
  },
  {
    question: "In Emmerdale, on New Year's Day in 2004, who died when The Woolpack pub's chimney came crashing down in a storm?",
    answers: [
      { text: 'Trisha Dingle', correct: true },
      { text: 'Sharlotte Flair', correct: false },
      { text: 'Trish Stratus', correct: false },
      { text: 'Sasha Banks', correct: false }
    ]
  },
  {
    question: 'In what Netflix series does actress Gillian Anderson play a sex therapist?',
    answers: [
      { text: 'Blood and Waters', correct: false },
      { text: 'The Bold Type', correct: false },
      { text: 'Sex Education', correct: true },
      { text: 'Queen of the South', correct: false }
    ]
  },
  {
    question: `Who played Queen Elizabeth II in the first two seasons of The Crown?`,
    answers: [
      { text: 'Elza Gonzalez', correct: false },
      { text: 'Rebecca Ferguson', correct: false },
      { text: 'Vannessa Kirby', correct: false },
      { text: 'Claire Foy', correct: true }
    ]
  },
  {
    question: `BBC Three series Normal People is based on a book but who is the author?`,
    answers: [
      { text: 'Sally Rooney', correct: true },
      { text: 'Paul Mescal', correct: false },
      { text: 'India Mullen', correct: false },
      { text: 'Robert Ervin Howard	', correct: false }
    ]
  },
  {
    question: 'The six main stars of Friends appeared in all 236 episodes. Who is the next most regular character to appear in the show?',
    answers: [
      { text: 'Ted (120 episodes)', correct: false },
      { text: 'Gunther (151 episodes)', correct: true },
      { text: 'Barney (50 episodes)', correct: false },
      { text: 'Lily (100 episodes)', correct: false }
    ]
  },
  {
    question: 'Who does the voiceover on Love Island?',
    answers: [
      { text: 'Bill Burr', correct: false },
      { text: 'Dave Chappelle', correct: false },
      { text: 'Iain Stirling', correct: true },
      { text: 'Jerry Seinfeld', correct: false }
    ]
  },
  {
    question: 'In what year was the first episode of Coronation Street broadcasted on ITV?',
    answers: [
      { text: '1800', correct: false },
      { text: '2006', correct: false },
      { text: '1998', correct: false },
      { text: '1960', correct: true }
    ]
  }
];

