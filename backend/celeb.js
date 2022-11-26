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
    question: `Which singer was known amongst other things as 'The King of Pop'?`,
    questionimage: '../assets/celeb_pics/pop-king.jpg',
    answers: [
      { text: 'Kanye West', correct: false },
      { text: 'Michael Jackson', correct: true },
      { text: 'Elvis Presley', correct: false },
      { text: 'Michael Buble', correct: false }
    ]
  },
  {
    question: `What is Cher's last name?`,
    questionimage: '../assets/celeb_pics/cher.jpg',
    answers: [
      { text: 'Leonardo Di Caprio', correct: false },
      { text: 'Will Smith', correct: false },
      { text: 'Sarkisian', correct: true },
      { text: 'Chris Hemsworth', correct: false }
    ]
  },
  {
    question: `What is the name of Kim Kardashian's eldest child?`,
    questionimage: '../assets/celeb_pics/north-west.png',
    answers: [
      { text: 'Blu Ivy', correct: false },
      { text: 'Stormi', correct: false },
      { text: 'South West', correct: false },
      { text: 'North West', correct: true }
    ]
  },
  {
    question: 'Who was the winner of the first ever UK series of ‘I’m A Celebrity… Get Me Out Of Here!’?',
    questionimage: '../assets/celeb_pics/im-a-celeb.jpg',
    answers: [
      { text: 'Tony Blackburn', correct: true },
      { text: 'Bill Gates', correct: false },
      { text: 'Tessa Wyatt', correct: false },
      { text: 'Boris Johnson', correct: false }
    ]
  },
  {
    question: 'Which English supermodel was born in Streatham in May 1970?',
    questionimage: '../assets/celeb_pics/naomi-campbell.jpg',
    answers: [
      { text: 'Tyra Banks', correct: false },
      { text: 'Victoria Beckham', correct: false },
      { text: 'Naomi Campbell', correct: true },
      { text: 'Emilia Clarke', correct: false }
    ]
  },
  {
    question: `Which footballer has the most Instagram followers in the world - as of 2020?`,
    questionimage: '../assets/celeb_pics/instagram.jpg',
    answers: [
      { text: 'Paul Pogba', correct: false },
      { text: 'Lebron James', correct: false },
      { text: 'Raheem Sterling', correct: false },
      { text: 'Cristiano Ronaldo', correct: true }
    ]
  },
  {
    question: `Tom Cruise is an outspoken member of which religion?`,
    questionimage: '../assets/celeb_pics/tom-cruise.jpeg',
    answers: [
      { text: 'Scientology', correct: true },
      { text: 'Judaism', correct: false },
      { text: 'Islam', correct: false },
      { text: 'Hinduism', correct: false }
    ]
  },
  {
    question: 'Who is Dolly Parton married to?',
    questionimage: '../assets/celeb_pics/dolly-parton.jpg',
    answers: [
      { text: 'Jaiden Smith', correct: false },
      { text: 'Carl Dean', correct: true },
      { text: 'Lady Gaga', correct: false },
      { text: 'Roman Reigns', correct: false }
    ]
  },
  {
    question: 'American singer Stefani Joanne Angelina Germanotta is best known by which stagename?',
    questionimage: '../assets/celeb_pics/lady-gaga.jpg',
    answers: [
      { text: 'Dua Lipa', correct: false },
      { text: 'Billie Eilish', correct: false },
      { text: 'Lady Gaga', correct: true },
      { text: 'Beyonce', correct: false }
    ]
  },
  {
    question: 'Taylor Swift grew up on what type of farm?',
    questionimage: '../assets/celeb_pics/christmas-tree-farm.jpg',
    answers: [
      { text: 'Marijuana farm', correct: false },
      { text: 'Pine Tree farm', correct: false },
      { text: 'Money Tree Farm', correct: false },
      { text: 'Christmas Tree Farm', correct: true }
    ]
  }
];

