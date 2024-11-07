import { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const apiUrl = window.location.origin.includes("localhost")
    ? "http://localhost:8000"
    : "https://general-knowledge-eta.vercel.app";
  // States for the quiz category and category photo
  const [category, setCategory] = useState("");
  // State for holding multiple questions
  const [questions, setQuestions] = useState([
    { question: "", picture: "", answers: [] }, // Initial empty question
  ]);
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (!category) {
      toast.warn("Please enter a quiz category");
      setIsPending(false);
      return;
    }

    if (questions.length < 2) {
      toast.warn("Every quiz should have at least 2 questions");
      setIsPending(false);
      return;
    }

    if (questions.some((question) => !question.question)) {
      toast.warn("Every question should have some text");
      setIsPending(false);
      return;
    }

    if (questions.some((question) => question.answers.length < 2)) {
      toast.warn("Every question should have at least 2 answers");
      setIsPending(false);
      return;
    }

    if (
      questions.some((question) =>
        question.answers.every((answer) => !answer.correct)
      )
    ) {
      toast.warn("Every question should have 1 correct answer");
      setIsPending(false);
      return;
    }

    if (
      questions.some((question) =>
        question.answers.every((answer) => answer.correct)
      )
    ) {
      toast.warn("Question answers cannot all be correct");
      setIsPending(false);
      return;
    }

    try {
      const response = await axios.post(apiUrl + "/quiz", {
        category: category,
        quiz: questions,
      });
      console.log({
        category: category,
        quiz: questions,
      });
      toast.success(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error: ", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsPending(false);
    }
  };

  // Function to handle adding a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", picture: "", answers: [] }, // Adds a new empty question object
    ]);
  };

  // Function to handle question change
  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <Sidebar />
      {!isSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="m-auto w-[90vw] md:w-2/4 bg-[white] rounded-lg p-[1rem] overflow-y-scroll h-[80vh] flex flex-col gap-[2rem] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
        >
          <h1 className="text-center underline text-[2rem]">Create a Quiz</h1>

          {/* Input for Quiz Category */}
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter the quiz category"
            className="text-[1.2rem] outline-none rounded-md border-2 border-[black] p-[0.5rem] focus:border-[#440066]"
          />

          <h2 className="text-center underline text-[2rem]">Quiz Questions</h2>

          {/* Dynamically render multiple Question components */}
          {questions.map((questionData, index) => (
            <Question
              key={index}
              index={index}
              questionData={questionData}
              updateQuestion={updateQuestion}
            />
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="bg-[tomato] text-[white] p-[0.5rem] text-[1rem] rounded-md hover:opacity-80"
          >
            Add a Question <i className="fas fa-plus"></i>
          </button>

          <button
            type="submit"
            className="bg-[#440066] p-[0.5rem] text-[1rem] text-[white] rounded-md hover:opacity-80"
            disabled={isPending}
          >
            {isPending ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
      <div
        className={`m-auto w-[90vw] md:w-2/4 bg-[white] rounded-lg p-[1rem] overflow-y-scroll h-[60vh] ${
          isSubmitted ? "flex" : "hidden"
        } flex-col items-center gap-[2rem] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 transition-all`}
      >
        <h1 className="text-[#440066] font-bold text-[3rem] text-center">
          Thank you!
        </h1>
        <p className="text-pretty">
          Your quiz has been submitted successfully! Wait for a short while as
          it is being reviewed after which it will be available from the list of
          quizzes. Contact Tawanda via{" "}
          <a
            href="mailto:tawandamsengezi@gmail.com"
            className="text-[purple] hover:underline italic"
          >
            tawandamsengezi@gmail.com
          </a>{" "}
          to have your quiz reviewed sooner.
        </p>
        <Link to={"/"} className="btn text-center">
          Okay
        </Link>
      </div>
    </>
  );
};

// Question Component to handle individual question details
export const Question = ({ index, questionData, updateQuestion }) => {
  const { question, picture, answers } = questionData;

  // Function to handle updates to the question text
  const handleQuestionChange = (e) => {
    updateQuestion(index, { ...questionData, question: e.target.value });
  };

  // Function to handle updates to the image URL
  const handlePictureChange = (e) => {
    updateQuestion(index, { ...questionData, picture: e.target.value });
  };

  // Function to handle updates to answers
  const handleAnswerChange = (answerIndex, answerText) => {
    const updatedAnswers = answers.map((a, i) =>
      i === answerIndex ? { ...a, text: answerText } : a
    );
    updateQuestion(index, { ...questionData, answers: updatedAnswers });
  };

  // Function to handle whether answer is correct or false
  const handleAnswerCorrection = (answerIndex, correct) => {
    const updatedAnswers = answers.map((a, i) =>
      i === answerIndex ? { ...a, correct: correct } : a
    );
    updateQuestion(index, { ...questionData, answers: updatedAnswers });
  };

  // Function to handle whether answer is correct or false
  const removeAnswer = (answerText) => {
    const exists = answers.some((answer) => answer.text === answerText);
    let updatedAnswers = [];
    if (exists) {
      updatedAnswers = answers.filter((answer) => answer.text !== answerText);
    } else {
      updatedAnswers = answers.map((a) => a);
    }
    updateQuestion(index, { ...questionData, answers: updatedAnswers });
  };

  // Function to add a new empty answer
  const addAnswer = () => {
    updateQuestion(index, {
      ...questionData,
      answers: [...answers, { text: "", correct: false }],
    });
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      <h3 className="text-[2rem]">Question {index + 1}</h3>

      {/* Input for the question text */}
      <input
        type="text"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Enter the question"
        className="text-[1.2rem] outline-none rounded-md border-2 border-[black] p-[0.5rem] focus:border-[#440066]"
      />
      {/* Input for the image URL */}
      <input
        type="text"
        value={picture}
        onChange={handlePictureChange}
        placeholder="Paste an image URL for the question (optional)"
        className="text-[1.2rem] outline-none rounded-md border-2 border-[black] p-[0.5rem] focus:border-[#440066]"
      />
      {/* Display and handle multiple choice answers */}
      {answers.map((answer, i) => (
        <div className="flex items-center justify-between w-full">
          <input
            key={i}
            type="text"
            value={answer.text}
            onChange={(e) => handleAnswerChange(i, e.target.value)}
            placeholder={`Multiple choice answer ${i + 1}`}
            className="text-[1.2rem] outline-none rounded-md border-2 border-[black] p-[0.5rem] focus:border-[#440066]"
          />
          <div
            className={`flex gap-[1rem] p-[0.5rem] rounded-lg ${
              answer.correct ? "bg-[lawngreen]" : "bg-[tomato]"
            }`}
          >
            <label className="font-bold">
              {answer.correct ? "Correct" : "Incorrect"}
            </label>
            <input
              type="checkbox"
              value={answer.text}
              onChange={(e) =>
                handleAnswerCorrection(i, answer.correct ? false : true)
              }
              className="w-[2rem] focus:accent-[#440066] cursor-pointer"
            />
          </div>
          <button
            onClick={() => removeAnswer(answer.text)}
            className="bg-[red]"
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
      {/* Button to add new answer */}
      <button
        type="button"
        onClick={addAnswer}
        className="self-start bg-[lawngreen] p-[0.5rem] text-[1rem] rounded-md hover:opacity-80"
      >
        Add Answer
      </button>
    </div>
  );
};

export default Create;
