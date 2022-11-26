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

var questions = [
  {
    question: 'Who was the only British Prime Minister to be assassinated?',
    questionimage: '../assets/politics_pics/assasin.jpg',
    answers: [
      { text: 'Spencer Perceval - May 1812', correct: true },
      { text: 'Robert Mugabe - June 2000', correct: false },
      { text: 'George Bush - January 1985', correct: false },
      { text: 'Joseph Stalin - December 2019', correct: false }
    ]
  },
  {
    question: 'How long does Prime Minister’s Questions last in the UK?',
    questionimage: '../assets/politics_pics/questions.jpg',
    answers: [
      { text: '1 week', correct: false },
      { text: '4 months', correct: false },
      { text: '30 minutes', correct: true },
      { text: '16 hours', correct: false }
    ]
  },
  {
    question: 'How many Members of Parliament (MPs) are there in the UK?',
    questionimage: '../assets/politics_pics/parliament.jpg',
    answers: [
      { text: '650', correct: true },
      { text: '300', correct: false },
      { text: '1500', correct: false },
      { text: '25', correct: false }
    ]
  },
  {
    question: 'What is the middle name of Angela Merkel?',
    questionimage: '../assets/politics_pics/merkel.jpg',
    answers: [
      { text: 'Selena', correct: false },
      { text: 'Margarette', correct: false },
      { text: 'Elizabeth', correct: false },
      { text: 'Dorothea', correct: true }
    ]
  },
  {
    question: "America's Republican Party is commonly referred to as the GOP - what does the GOP stand for?",
    questionimage: '../assets/politics_pics/republican-logo.png',
    answers: [
      { text: 'Government Over Populated', correct: false },
      { text: 'Giant Original Politicians', correct: false },
      { text: 'Grand Old Party', correct: true },
      { text: 'Great Omen Public', correct: false }
    ]
  },
  {
    question: "Who was Donald Trump's vice president?",
    questionimage: '../assets/politics_pics/mike-pence.jpg',
    answers: [
      { text: 'Ted Cruz', correct: false },
      { text: 'Trevor Noah', correct: false },
      { text: 'Joe Biden', correct: false },
      { text: 'Mike Pence', correct: true }
    ]
  },
  {
    question: 'In which year did Britain originally join the EEC, now known as the European Union?',
    questionimage: '../assets/politics_pics/europe-uk.jpg',
    answers: [
      { text: '1973', correct: true },
      { text: '2005', correct: false },
      { text: '2016', correct: false },
      { text: '1843', correct: false }
    ]
  },
  {
    question: 'Which of the following are the founding members of the European Union?',
    questionimage: '../assets/politics_pics/flags.jpg',
    answers: [
      { text: 'USA, Jamaica, Australia, China, Cuba, Russia', correct: false },
      { text: 'Belgium, France, West Germany, Italy, Luxembourg, Netherlands', correct: true },
      { text: 'South Africa, Malaysia, Nigeria', correct: false },
      { text: 'Canada & Uruguay', correct: false }
    ]
  },
  {
    question: 'What is the name given to the group of people who make sure MPs attend important votes?',
    questionimage: '../assets/politics_pics/whips.jpg',
    answers: [
      { text: 'Advocates', correct: false },
      { text: 'Commanders', correct: false },
      { text: 'Whips', correct: true },
      { text: 'Clerks', correct: false }
    ]
  },
  {
    question: 'On what subject was the first referendum in Britain?',
    questionimage: '../assets/politics_pics/vote.png',
    answers: [
      { text: 'Changing the official language (1980)', correct: false },
      { text: 'Changing the national flag colors (2000)', correct: false },
      { text: 'Assasinating the Queen (2017)', correct: false },
      { text: 'Remaining in the EEC (1975)', correct: true }
    ]
  }
];

