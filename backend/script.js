const startButton = document.getElementById("start-btn"); // Button that starts the quiz
const nextButton = document.getElementById("next-btn"); // Button for next question
const questionContainerElement = document.getElementById("question-container"); // Contains the question, answers, and image
const questionElement = document.getElementById("question"); // The heading 1 that has the question
const answerButtonsElement = document.getElementById("answer-buttons"); // The optional answers for each question
const questionImageElement = document.getElementById("questionimage"); // Image that describes the question
const resultElement = document.getElementById("score"); // Display score to the user

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide"); // Hides the start button
  resultElement.classList.add("hide"); // Hides the quiz score
  shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Randomly selects a question from the array
  currentQuestionIndex = 0;
  answerScore = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  questionImageElement.src = question.questionimage;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  resultElement.innerText = `Your score: ${answerScore}/${shuffledQuestions.length}`;

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    resultElement.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Which nuts are used in marzipan?",
    questionimage: "assets/food_pics/almonds.jpg",
    answers: [
      { text: "Walnuts", correct: false },
      { text: "Almonds", correct: true },
      { text: "Cashew", correct: false },
      { text: "Pistachio", correct: false },
    ],
  },
  {
    question: "What is the most famous Mexican beer?",
    questionimage: "assets/food_pics/corona.png",
    answers: [
      { text: "Carlsberg", correct: false },
      { text: "Tequilla", correct: false },
      { text: "Corona", correct: true },
      { text: "Amsterdam", correct: false },
    ],
  },
  {
    question: "Which country is the origin of the cocktail Mojito?",
    questionimage: "assets/food_pics/mojito.jpg",
    answers: [
      { text: "Russia", correct: false },
      { text: "Zimbabwe", correct: false },
      { text: "Brazil", correct: false },
      { text: "Cuba", correct: true },
    ],
  },
  {
    question: "What is Japanese sake made from?",
    questionimage: "assets/food_pics/japan_sake.jpg",
    answers: [
      { text: "Rice", correct: true },
      { text: "Potatoes", correct: false },
      { text: "Wheat", correct: false },
      { text: "Cotton", correct: false },
    ],
  },
  {
    question: "Which vitamin is the only one that you will not find in an egg?",
    questionimage: "assets/food_pics/eggs.jpg",
    answers: [
      { text: "Vitamin D", correct: false },
      { text: "Vitamin A", correct: false },
      { text: "Vitamin C", correct: true },
      { text: "Vitamin E", correct: false },
    ],
  },
  {
    question: "What is the chemical formula for Table Salt?",
    questionimage: "assets/food_pics/salt.jpg",
    answers: [
      { text: "H20", correct: false },
      { text: "CO2", correct: false },
      { text: "E = MC2", correct: false },
      { text: "NaC1", correct: true },
    ],
  },
  {
    question: "What alcoholic consumable has the acronym IPA?",
    questionimage: "assets/food_pics/ipa-logo.png",
    answers: [
      { text: "Indian Pale Ale", correct: true },
      { text: "Ice-Cream Pie Avocadoes", correct: false },
      { text: "Intensified Pudding Apples", correct: false },
      { text: "Innovations for Poverty Action", correct: false },
    ],
  },
  {
    question: "Which meat is used in Glamorgan sausages?",
    questionimage: "assets/food_pics/glamorgan-sausages.jpg",
    answers: [
      { text: "Beef", correct: false },
      { text: "None, they are made from cheese", correct: true },
      { text: "Pork", correct: false },
      { text: "Chicken breast", correct: false },
    ],
  },
  {
    question: "What ingredient is included in food in a Florentine style?",
    questionimage: "assets/food_pics/florentine.jpeg",
    answers: [
      { text: "Bacon", correct: false },
      { text: "Cucumbers", correct: false },
      { text: "Spinach", correct: true },
      { text: "Flour", correct: false },
    ],
  },
  {
    question: "Which fish is the main ingredient of Scotch Woodcock?",
    questionimage: "assets/food_pics/scotch_woodcock.jpg",
    answers: [
      { text: "Sardines", correct: false },
      { text: "Tuna", correct: false },
      { text: "Hake", correct: false },
      { text: "Anchovy", correct: true },
    ],
  },
];
